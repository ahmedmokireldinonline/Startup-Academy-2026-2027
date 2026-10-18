import { FormEvent, useState } from "react";
import { ArrowLeft, CheckCircle2, ClipboardList, Sparkles } from "lucide-react";

const initialForm = { name: "", email: "", country: "", stage: "", goal: "", language: "ar" };

export default function Register() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const update = (key: keyof typeof initialForm, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: FormEvent) => {
    event.preventDefault();
    localStorage.setItem("startup-academy-registration", JSON.stringify({ ...form, createdAt: new Date().toISOString() }));
    setSubmitted(true);
  };
  return <div className="standalone-page" dir="rtl">
    <header className="standalone-header"><a className="brand" href="/"><span className="brand-mark"><Sparkles size={16} /></span><span><strong>Startup Academy</strong><small>2026—2027</small></span></a><a className="back-link" href="/"><ArrowLeft size={16} /> العودة للموقع</a></header>
    <main className="registration-layout">
      <section className="registration-intro"><span className="eyebrow"><ClipboardList size={15} /> التسجيل في الأكاديمية</span><h1>حوّل فكرتك إلى <em>خطوة قابلة للقياس.</em></h1><p>سجّل بياناتك الأولية لنقترح عليك نقطة البداية والمسار والبرامج التمويلية الأنسب. لا نطلب كلمة مرور، وتبقى هذه النسخة محفوظة على جهازك.</p><div className="registration-points"><span><CheckCircle2 size={17} /> مسار تعلّم واضح</span><span><CheckCircle2 size={17} /> دليل برامج موثّق</span><span><CheckCircle2 size={17} /> متابعة التقدم محليًا</span></div></section>
      <section className="registration-card">{submitted ? <div className="success-state"><CheckCircle2 size={44} /><h2>تم حفظ طلب التسجيل</h2><p>تم حفظ بياناتك على هذا الجهاز. يمكنك العودة إلى الموقع وبدء المرحلة المناسبة لك.</p><a className="button button-primary" href="/">ابدأ المسار</a></div> : <form onSubmit={submit}><div className="form-heading"><span className="eyebrow">بيانات البداية</span><h2>أنشئ ملفك الأولي</h2><p>الحقول الأساسية تساعدنا على تخصيص التجربة.</p></div><label>الاسم الكامل<input required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="اكتب اسمك" /></label><label>البريد الإلكتروني<input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" /></label><div className="form-row"><label>الدولة<input required value={form.country} onChange={(e) => update("country", e.target.value)} placeholder="الدولة أو المنطقة" /></label><label>اللغة<select value={form.language} onChange={(e) => update("language", e.target.value)}><option value="ar">العربية</option><option value="en">English</option></select></label></div><label>مرحلة مشروعك<select required value={form.stage} onChange={(e) => update("stage", e.target.value)}><option value="">اختر المرحلة</option><option>فكرة أولية</option><option>تحقق من المشكلة</option><option>MVP / منتج أولي</option><option>منتج قائم ومبيعات</option><option>نمو أو استعداد للتمويل</option></select></label><label>ما الهدف الأهم الآن؟<textarea required value={form.goal} onChange={(e) => update("goal", e.target.value)} placeholder="مثال: أريد التحقق من احتياج العملاء وبناء MVP" rows={4} /></label><button className="button button-primary submit-button" type="submit">حفظ التسجيل والبدء <ArrowLeft size={17} /></button><small className="privacy-note">لن نطلب كلمة مرور أو بيانات دفع في نموذج التسجيل.</small></form>}</section>
    </main>
  </div>;
}
