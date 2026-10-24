import { FormEvent, useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, ClipboardList, Globe2, Sparkles } from "lucide-react";

type Country = { name: string; code: string; dial: string };

const countries: Country[] = [
  { name: "مصر", code: "EG", dial: "+20" }, { name: "السعودية", code: "SA", dial: "+966" },
  { name: "الإمارات", code: "AE", dial: "+971" }, { name: "الأردن", code: "JO", dial: "+962" },
  { name: "قطر", code: "QA", dial: "+974" }, { name: "الكويت", code: "KW", dial: "+965" },
  { name: "البحرين", code: "BH", dial: "+973" }, { name: "عُمان", code: "OM", dial: "+968" },
  { name: "المغرب", code: "MA", dial: "+212" }, { name: "الجزائر", code: "DZ", dial: "+213" },
  { name: "تونس", code: "TN", dial: "+216" }, { name: "ليبيا", code: "LY", dial: "+218" },
  { name: "السودان", code: "SD", dial: "+249" }, { name: "تركيا", code: "TR", dial: "+90" },
  { name: "المملكة المتحدة", code: "GB", dial: "+44" }, { name: "الولايات المتحدة", code: "US", dial: "+1" },
  { name: "كندا", code: "CA", dial: "+1" }, { name: "ألمانيا", code: "DE", dial: "+49" },
  { name: "فرنسا", code: "FR", dial: "+33" }, { name: "الهند", code: "IN", dial: "+91" },
  { name: "باكستان", code: "PK", dial: "+92" }, { name: "نيجيريا", code: "NG", dial: "+234" },
  { name: "جنوب أفريقيا", code: "ZA", dial: "+27" }, { name: "أستراليا", code: "AU", dial: "+61" },
  { name: "أخرى", code: "OTHER", dial: "+" },
];

const initialForm = { name: "", email: "", phone: "", country: "", countryCode: "", stage: "", goal: "", language: "ar" };

export default function Register() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [locationHint, setLocationHint] = useState("جاري اقتراح الدولة من موقعك...");
  const update = (key: keyof typeof initialForm, value: string) => setForm((current) => ({ ...current, [key]: value }));

  useEffect(() => {
    let active = true;
    fetch("https://ipapi.co/json/")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("location unavailable")))
      .then((data: { country_code?: string }) => {
        if (!active || form.country) return;
        const match = countries.find((country) => country.code === data.country_code);
        if (match) {
          setForm((current) => ({ ...current, country: match.code, countryCode: match.dial }));
          setLocationHint(`تم اقتراح ${match.name} بناءً على موقع الاتصال — يمكنك تغييره.`);
        } else setLocationHint("اختر دولتك يدويًا لإظهار مفتاح الاتصال الصحيح.");
      })
      .catch(() => active && setLocationHint("اختر دولتك يدويًا لإظهار مفتاح الاتصال الصحيح."));
    return () => { active = false; };
  }, [form.country]);

  const selectedCountry = countries.find((country) => country.code === form.country);
  const selectCountry = (value: string) => {
    const country = countries.find((item) => item.code === value);
    setForm((current) => ({ ...current, country: value, countryCode: country?.dial || "" }));
    setLocationHint(country ? `مفتاح ${country.name} مضاف تلقائيًا.` : "");
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    localStorage.setItem("startup-academy-registration", JSON.stringify({ ...form, countryName: selectedCountry?.name, createdAt: new Date().toISOString() }));
    setSubmitted(true);
  };

  return <div className="standalone-page" dir="rtl">
    <header className="standalone-header"><a className="brand" href="/"><span className="brand-mark"><Sparkles size={16} /></span><span><strong>Startup Academy</strong><small>2026—2027</small></span></a><a className="back-link" href="/"><ArrowLeft size={16} /> العودة للموقع</a></header>
    <main className="registration-layout">
      <section className="registration-intro"><span className="eyebrow"><ClipboardList size={15} /> التسجيل في الأكاديمية</span><h1>حوّل فكرتك إلى <em>خطوة قابلة للقياس.</em></h1><p>سجّل بياناتك الأولية لنقترح عليك نقطة البداية والمسار والبرامج التمويلية الأنسب. نستخدم الدولة ومرحلة المشروع لمطابقة فرص أكثر دقة.</p><div className="registration-points"><span><CheckCircle2 size={17} /> مسار تعلّم واضح</span><span><CheckCircle2 size={17} /> دليل برامج موثّق</span><span><CheckCircle2 size={17} /> مفتاح اتصال مناسب لدولتك</span><span><CheckCircle2 size={17} /> متابعة التقدم محليًا</span></div></section>
      <section className="registration-card">{submitted ? <div className="success-state"><CheckCircle2 size={44} /><h2>تم حفظ طلب التسجيل</h2><p>تم حفظ بياناتك على هذا الجهاز. يمكنك العودة إلى الموقع وبدء المرحلة المناسبة لك.</p><a className="button button-primary" href="/">ابدأ المسار</a></div> : <form onSubmit={submit}><div className="form-heading"><span className="eyebrow">بيانات البداية</span><h2>أنشئ ملفك الأولي</h2><p>الحقول الأساسية تساعدنا على تخصيص التجربة.</p></div><label>الاسم الكامل<input required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="اكتب اسمك" /></label><label>البريد الإلكتروني<input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" /></label><div className="form-row"><label>الدولة<select required value={form.country} onChange={(e) => selectCountry(e.target.value)}><option value="">اختر الدولة</option>{countries.map((country) => <option value={country.code} key={country.code}>{country.name}</option>)}</select></label><label>اللغة<select value={form.language} onChange={(e) => update("language", e.target.value)}><option value="ar">العربية</option><option value="en">English</option></select></label></div><label>رقم الهاتف <span className="field-hint">ضروري للتواصل</span><div className="phone-input"><select aria-label="مفتاح الدولة" value={form.countryCode} onChange={(e) => update("countryCode", e.target.value)}><option value="">مفتاح</option>{countries.filter((country) => country.dial !== "+").map((country) => <option value={country.dial} key={`${country.code}-dial`}>{country.dial} · {country.code}</option>)}</select><input required type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="10 1234 5678" pattern="[0-9٠-٩+() .-]{7,24}" title="أدخل رقم هاتف صحيحًا" /></div><small className="location-hint"><Globe2 size={13} /> {locationHint}</small></label><label>مرحلة مشروعك<select required value={form.stage} onChange={(e) => update("stage", e.target.value)}><option value="">اختر المرحلة</option><option>فكرة أولية</option><option>تحقق من المشكلة</option><option>MVP / منتج أولي</option><option>منتج قائم ومبيعات</option><option>نمو أو استعداد للتمويل</option></select></label><label>ما الهدف الأهم الآن؟<textarea required value={form.goal} onChange={(e) => update("goal", e.target.value)} placeholder="مثال: أريد التحقق من احتياج العملاء وبناء MVP" rows={4} /></label><button className="button button-primary submit-button" type="submit">حفظ التسجيل والبدء <ArrowLeft size={17} /></button><small className="privacy-note">لن نطلب كلمة مرور أو بيانات دفع. سنستخدم رقم الهاتف فقط للتواصل المتعلق بالأكاديمية.</small></form>}</section>
    </main>
  </div>;
}
