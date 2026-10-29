import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, ClipboardList, Mail, MapPin, MessageCircle, Sparkles } from "lucide-react";
import { countries, countryByCode } from "@/data/countries";
import { emailUrl, registrationMessage, whatsappUrl } from "@/lib/access";
import { trpc } from "@/lib/trpc";

const initialForm = { name: "", email: "", phone: "", country: "EG", dialCode: "+20", stage: "", goal: "", language: "ar" as "ar" | "en" };

export default function Register() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [detecting, setDetecting] = useState(true);
  const [detected, setDetected] = useState(false);
  const createRegistration = trpc.registration.create.useMutation();
  const update = (key: keyof typeof initialForm, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const selectedCountry = countryByCode[form.country] || countryByCode.EG;
  const sortedCountries = useMemo(() => [...countries].sort((a, b) => a.nameAr.localeCompare(b.nameAr, "ar")), []);
  const savedData = { الاسم: form.name, البريد: form.email, الهاتف: form.phone, الدولة: selectedCountry.nameAr, المرحلة: form.stage, الهدف: form.goal };
  const message = registrationMessage(savedData);

  useEffect(() => {
    let cancelled = false;
    const saved = localStorage.getItem("startup-academy-registration");
    if (saved) {
      try { const previous = JSON.parse(saved); if (previous.country && previous.dialCode) setForm((current) => ({ ...current, ...previous })); } catch { /* ignore invalid local data */ }
    }
    fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(4500) })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("IP lookup failed")))
      .then((data: { country_code?: string }) => {
        if (cancelled || !data.country_code || localStorage.getItem("startup-academy-registration")) return;
        const country = countryByCode[data.country_code.toUpperCase()];
        if (country) { setForm((current) => ({ ...current, country: country.code, dialCode: country.dialCode })); setDetected(true); }
      }).catch(() => undefined).finally(() => { if (!cancelled) setDetecting(false); });
    return () => { cancelled = true; };
  }, []);

  const chooseCountry = (code: string) => { const country = countryByCode[code]; if (country) setForm((current) => ({ ...current, country: country.code, dialCode: country.dialCode })); };
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitError("");
    const normalizedPhone = `${form.dialCode} ${form.phone.replace(/^\+?\d+\s*/, "")}`.trim();
    try {
      await createRegistration.mutateAsync({ ...form, phone: normalizedPhone });
      localStorage.setItem("startup-academy-registration", JSON.stringify({ ...form, phone: normalizedPhone, createdAt: new Date().toISOString() }));
      setForm((current) => ({ ...current, phone: normalizedPhone }));
      setSubmitted(true);
    } catch {
      setSubmitError("تعذر حفظ التسجيل الآن. تأكد من إعداد قاعدة البيانات ثم حاول مرة أخرى.");
    }
  };

  return <div className="standalone-page" dir="rtl">
    <header className="standalone-header"><a className="brand" href="/"><span className="brand-mark"><Sparkles size={16} /></span><span><strong>Startup Academy</strong><small>2026—2027</small></span></a><a className="back-link" href="/"><ArrowLeft size={16} /> العودة للموقع</a></header>
    <main className="registration-layout">
      <section className="registration-intro"><span className="eyebrow"><ClipboardList size={15} /> التسجيل في الأكاديمية</span><h1>حوّل فكرتك إلى <em>خطوة قابلة للقياس.</em></h1><p>بعد التسجيل تحصل على الوصول إلى تفاصيل البرامج وروابط التقديم الرسمية، ويمكنك إرسال بياناتك مباشرة لفريق الأكاديمية للتواصل معك.</p><div className="registration-points"><span><CheckCircle2 size={17} /> دليل برامج موثّق</span><span><CheckCircle2 size={17} /> مطابقة حسب الدولة والمرحلة</span><span><CheckCircle2 size={17} /> وصول إلى روابط التقديم</span><span><CheckCircle2 size={17} /> تواصل مباشر عند الحاجة</span></div></section>
      <section className="registration-card">{submitted ? <div className="success-state"><CheckCircle2 size={44} /><h2>تم فتح وصولك إلى الدليل</h2><p>تم حفظ تسجيلك في قاعدة البيانات. أرسل الملخص إلى فريق الأكاديمية عبر القناة التي تفضلها، ثم افتح دليل البرامج.</p><div className="contact-actions"><a className="button button-primary" href={whatsappUrl(message)} target="_blank" rel="noreferrer"><MessageCircle size={17} /> إرسال عبر WhatsApp</a><a className="button button-secondary" href={emailUrl("تسجيل جديد في Startup Academy", message)}><Mail size={17} /> إرسال عبر البريد</a></div><a className="button button-secondary" href="/programs">فتح دليل البرامج <ArrowLeft size={17} /></a><small className="privacy-note">سيتم فتح رسالة جاهزة للمراجعة والإرسال. المتصفح لا يرسل رسائل WhatsApp أو البريد تلقائيًا دون موافقتك.</small></div> : <form onSubmit={submit}><div className="form-heading"><span className="eyebrow">بيانات البداية</span><h2>أنشئ ملفك الأولي</h2><p>التسجيل مطلوب قبل فتح المصادر وروابط التقديم.</p></div><label>الاسم الكامل<input required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="اكتب اسمك" /></label><label>البريد الإلكتروني<input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" /></label><label>الدولة {detecting ? <span className="field-hint"><MapPin size={12} /> جارٍ التحديد من موقعك التقريبي...</span> : detected ? <span className="field-hint"><MapPin size={12} /> تم التحديد تلقائيًا ويمكنك تغييره</span> : null}<select required value={form.country} onChange={(e) => chooseCountry(e.target.value)}>{sortedCountries.map((country) => <option key={country.code} value={country.code}>{country.nameAr} — {country.nameEn}</option>)}</select></label><label>رقم الهاتف <span className="field-hint">ضروري للتواصل · مفتاح {selectedCountry.dialCode}</span><div className="phone-input"><span>{selectedCountry.dialCode}</span><input required type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="10 1234 5678" pattern="[0-9٠-٩ ()-]{6,20}" title="أدخل رقم الهاتف بدون مفتاح الدولة" /></div></label><div className="form-row"><label>اللغة<select value={form.language} onChange={(e) => update("language", e.target.value as "ar" | "en")}><option value="ar">العربية</option><option value="en">English</option></select></label><label>مرحلة مشروعك<select required value={form.stage} onChange={(e) => update("stage", e.target.value)}><option value="">اختر المرحلة</option><option>فكرة أولية</option><option>تحقق من المشكلة</option><option>MVP / منتج أولي</option><option>منتج قائم ومبيعات</option><option>نمو أو استعداد للتمويل</option></select></label></div><label>ما الهدف الأهم الآن؟<textarea required value={form.goal} onChange={(e) => update("goal", e.target.value)} placeholder="مثال: أريد التحقق من احتياج العملاء وبناء MVP" rows={4} /></label>{submitError ? <p className="form-error" role="alert">{submitError}</p> : null}<button className="button button-primary submit-button" type="submit" disabled={createRegistration.isPending}>{createRegistration.isPending ? "جارٍ حفظ التسجيل..." : "حفظ التسجيل وفتح الدليل"} <ArrowLeft size={17} /></button><small className="privacy-note">نستخدم بياناتك لفتح الدليل والتواصل معك. لن نرسل رسالة خارجية قبل أن تختار القناة وتضغط إرسال.</small></form>}</section>
    </main>
  </div>;
}
