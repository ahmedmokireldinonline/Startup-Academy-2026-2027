import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, ClipboardList, MapPin, Sparkles } from "lucide-react";
import { countries, countryByCode } from "@/data/countries";

const initialForm = { name: "", email: "", phone: "", country: "EG", dialCode: "+20", stage: "", goal: "", language: "ar" };

export default function Register() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [detecting, setDetecting] = useState(true);
  const [detected, setDetected] = useState(false);
  const update = (key: keyof typeof initialForm, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const selectedCountry = countryByCode[form.country] || countryByCode.EG;
  const sortedCountries = useMemo(() => [...countries].sort((a, b) => a.nameAr.localeCompare(b.nameAr, "ar")), []);

  useEffect(() => {
    let cancelled = false;
    const saved = localStorage.getItem("startup-academy-registration");
    if (saved) {
      try {
        const previous = JSON.parse(saved);
        if (previous.country && previous.dialCode) setForm((current) => ({ ...current, ...previous }));
      } catch { /* ignore invalid local data */ }
    }
    fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(4500) })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("IP lookup failed")))
      .then((data: { country_code?: string }) => {
        if (cancelled || !data.country_code || localStorage.getItem("startup-academy-registration")) return;
        const country = countryByCode[data.country_code.toUpperCase()];
        if (country) {
          setForm((current) => ({ ...current, country: country.code, dialCode: country.dialCode }));
          setDetected(true);
        }
      })
      .catch(() => undefined)
      .finally(() => { if (!cancelled) setDetecting(false); });
    return () => { cancelled = true; };
  }, []);

  const chooseCountry = (code: string) => {
    const country = countryByCode[code];
    if (country) setForm((current) => ({ ...current, country: country.code, dialCode: country.dialCode }));
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const normalizedPhone = `${form.dialCode} ${form.phone.replace(/^\+?\d+\s*/, "")}`.trim();
    localStorage.setItem("startup-academy-registration", JSON.stringify({ ...form, phone: normalizedPhone, createdAt: new Date().toISOString() }));
    setSubmitted(true);
  };

  return <div className="standalone-page" dir="rtl">
    <header className="standalone-header"><a className="brand" href="/"><span className="brand-mark"><Sparkles size={16} /></span><span><strong>Startup Academy</strong><small>2026—2027</small></span></a><a className="back-link" href="/"><ArrowLeft size={16} /> العودة للموقع</a></header>
    <main className="registration-layout">
      <section className="registration-intro"><span className="eyebrow"><ClipboardList size={15} /> التسجيل في الأكاديمية</span><h1>حوّل فكرتك إلى <em>خطوة قابلة للقياس.</em></h1><p>سجّل بياناتك الأولية لنقترح عليك نقطة البداية والمسار والبرامج التمويلية الأنسب. لا نطلب كلمة مرور، وتبقى هذه النسخة محفوظة على جهازك.</p><div className="registration-points"><span><CheckCircle2 size={17} /> مسار تعلّم واضح</span><span><CheckCircle2 size={17} /> دليل برامج موثّق</span><span><CheckCircle2 size={17} /> متابعة التقدم محليًا</span><span><CheckCircle2 size={17} /> تواصل مباشر عند الحاجة</span></div></section>
      <section className="registration-card">{submitted ? <div className="success-state"><CheckCircle2 size={44} /><h2>تم حفظ طلب التسجيل</h2><p>تم حفظ بياناتك على هذا الجهاز. يمكنك العودة إلى الموقع وبدء المرحلة المناسبة لك.</p><a className="button button-primary" href="/">ابدأ المسار</a></div> : <form onSubmit={submit}><div className="form-heading"><span className="eyebrow">بيانات البداية</span><h2>أنشئ ملفك الأولي</h2><p>الحقول الأساسية تساعدنا على تخصيص التجربة.</p></div><label>الاسم الكامل<input required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="اكتب اسمك" /></label><label>البريد الإلكتروني<input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" /></label><label>الدولة {detecting ? <span className="field-hint"><MapPin size={12} /> جارٍ التحديد من موقعك التقريبي...</span> : detected ? <span className="field-hint"><MapPin size={12} /> تم التحديد تلقائيًا ويمكنك تغييره</span> : null}<select required value={form.country} onChange={(e) => chooseCountry(e.target.value)}>{sortedCountries.map((country) => <option key={country.code} value={country.code}>{country.nameAr} — {country.nameEn}</option>)}</select></label><label>رقم الهاتف <span className="field-hint">ضروري للتواصل · مفتاح {selectedCountry.dialCode}</span><div className="phone-input"><span>{selectedCountry.dialCode}</span><input required type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="10 1234 5678" pattern="[0-9٠-٩ ()-]{6,20}" title="أدخل رقم الهاتف بدون مفتاح الدولة" /></div></label><div className="form-row"><label>اللغة<select value={form.language} onChange={(e) => update("language", e.target.value)}><option value="ar">العربية</option><option value="en">English</option></select></label><label>مرحلة مشروعك<select required value={form.stage} onChange={(e) => update("stage", e.target.value)}><option value="">اختر المرحلة</option><option>فكرة أولية</option><option>تحقق من المشكلة</option><option>MVP / منتج أولي</option><option>منتج قائم ومبيعات</option><option>نمو أو استعداد للتمويل</option></select></label></div><label>ما الهدف الأهم الآن؟<textarea required value={form.goal} onChange={(e) => update("goal", e.target.value)} placeholder="مثال: أريد التحقق من احتياج العملاء وبناء MVP" rows={4} /></label><button className="button button-primary submit-button" type="submit">حفظ التسجيل والبدء <ArrowLeft size={17} /></button><small className="privacy-note">يُستخدم تحديد الدولة لتسهيل مفتاح الاتصال فقط. سنستخدم رقم الهاتف للتواصل المتعلق بالأكاديمية.</small></form>}</section>
    </main>
  </div>;
}
