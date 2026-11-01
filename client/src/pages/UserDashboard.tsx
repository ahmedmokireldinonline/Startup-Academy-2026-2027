import { ArrowUpRight, CheckCircle2, Clock3, Crown, LockKeyhole, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { academyOffers, offerWhatsAppUrl } from "@/data/offers";

const outcomes = [
  { title: "مطابقة الفرص", text: "نحدد البرامج والمنح والـ credits الأقرب لمرحلة شركتك ودولتك." },
  { title: "تجهيز التقديم", text: "نرتب المعلومات، الـ Pitch Deck، والرسائل المطلوبة قبل إرسال الطلب." },
  { title: "Cloud وAI Infrastructure", text: "نساعدك على اختيار مسار Cloud Credits وأدوات Automation وAI المناسبة." },
  { title: "شبكات ومسرعات", text: "نوجهك إلى المسرعات وشبكات المؤسسين والمستثمرين ذات الصلة." },
];

export default function UserDashboard() {
  return <div className="dashboard-shell" dir="rtl">
    <header className="dashboard-header"><a className="brand" href="/"><span className="brand-mark"><Sparkles size={16} /></span><span><strong>Startup Academy</strong><small>Member Dashboard</small></span></a><div className="dashboard-header-actions"><span className="dashboard-status"><span className="status-dot" /> الحجز عبر WhatsApp</span><a className="dashboard-link" href="/">الرئيسية</a></div></header>
    <main className="dashboard-main">
      <section className="dashboard-welcome"><div><span className="eyebrow"><Crown size={14} /> بوابة العضو</span><h1>مساحتك للوصول إلى <em>المنح والمستثمرين.</em></h1><p>اختر الباقة المناسبة، ثم اضغط الحجز لفتح محادثة WhatsApp مباشرة مع فريق Startup Academy. لا يوجد دفع آلي أو تجديد تلقائي من الموقع.</p></div><div className="dashboard-security"><ShieldCheck size={22} /><strong>Lifetime Access</strong><span>اشتراك لمرة واحدة — التفعيل بعد التواصل</span></div></section>
      <section className="dashboard-section"><div className="section-heading-row"><div><span className="eyebrow">الأسعار والمزايا</span><h2>الباقات المتاحة</h2></div><span className="section-note">الحجز عبر WhatsApp فقط</span></div><div className="tier-grid">{academyOffers.map((offer) => <article className={`tier-card ${offer.id}`} key={offer.id}><div className="tier-top"><span className="tier-label">{offer.label}</span>{offer.id === "vip" ? <Crown size={18} /> : <ShieldCheck size={18} />}</div><h3>{offer.name}</h3><strong className="tier-price">{offer.price}</strong><p>{offer.summary}</p><ul>{offer.benefits.map((item) => <li key={item}><CheckCircle2 size={15} /> {item}</li>)}</ul><a className="dashboard-cta" href={offerWhatsAppUrl(offer)} target="_blank" rel="noreferrer"><MessageCircle size={16} /> احجز عبر WhatsApp <ArrowUpRight size={16} /></a></article>)}</div></section>
      <section className="dashboard-section"><div className="section-heading-row"><div><span className="eyebrow">ماذا ستحصل عليه؟</span><h2>نتيجة الاشتراك معنا</h2></div></div><div className="outcomes-grid">{outcomes.map((outcome, index) => <article className="outcome-card" key={outcome.title}><span>0{index + 1}</span><h3>{outcome.title}</h3><p>{outcome.text}</p></article>)}</div></section>
      <section className="dashboard-section dashboard-lower-grid"><article className="dashboard-panel"><div className="panel-title"><span><Clock3 size={17} /> خطوات البدء</span><span className="soft-badge">3 خطوات</span></div><h3>من WhatsApp إلى خطة تقديم</h3><p>أرسل اسم الشركة والبلد والمرحلة والباقة المطلوبة. سيعود إليك الفريق لتأكيد الحجز، جمع البيانات، ثم تفعيل المسار المناسب.</p><div className="progress-track"><span style={{ width: "33%" }} /></div><small>1. حجز الباقة → 2. تجهيز الملف → 3. فتح الوصول</small><a className="text-link" href="/register">افتح نموذج الشركة <ArrowUpRight size={14} /></a></article><article className="dashboard-panel protected-panel"><div className="panel-title"><span><LockKeyhole size={17} /> المصادر المحمية</span><span className="soft-badge locked">تُفتح بعد التفعيل</span></div><h3>روابط التقديم الرسمية</h3><p>لا تظهر الروابط الأصلية في الصفحة العامة. بعد تأكيد الحجز والتفعيل، تحصل على وصول مناسب للباقة من الخادم.</p><div className="protected-placeholder"><LockKeyhole size={21} /><span>ابدأ برسالة WhatsApp لتفعيل الوصول</span></div></article></section>
    </main>
  </div>;
}
