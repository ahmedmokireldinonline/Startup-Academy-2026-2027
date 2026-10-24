import { useMemo, useState } from "react";
import { ArrowLeft, ExternalLink, Filter, Search, ShieldCheck, Sparkles, Cloud, Brain, Rocket, Handshake } from "lucide-react";
import { programs } from "@/data/programs";

const amazonPrograms = [
  { icon: Cloud, name: "AWS Activate Credits", label: "أرصدة البنية السحابية", body: "أرصدة Founders وPortfolio للبنية التحتية والبيانات وخدمات الذكاء الاصطناعي، حتى $200,000 حسب الأهلية.", link: "https://aws.amazon.com/startups/credits/", tone: "blue" },
  { icon: Brain, name: "AWS Generative AI Accelerator", label: "تسريع شركات الذكاء الاصطناعي", body: "برنامج إرشاد وتقنية وشبكات لشركات الذكاء الاصطناعي التوليدي، مع فرص وصول إلى موارد AWS وActivate.", link: "https://aws.amazon.com/startups/programs/generative-ai-accelerator/", tone: "violet" },
  { icon: Rocket, name: "AWS Build Accelerator", label: "تسريع مرحلة البناء", body: "مسار عملي للشركات الناشئة لبناء المنتج، التحقق من السوق، والحصول على دعم تقني وتجاري من منظومة AWS.", link: "https://aws.amazon.com/startups/programs/", tone: "coral" },
  { icon: Handshake, name: "AWS Startup Programs & Partners", label: "برامج الشركاء والمنظومة", body: "شبكة برامج إقليمية وشركاء ومسرّعات تربط الشركة بمزايا إضافية، وإحالات Activate، ودعم go-to-market.", link: "https://aws.amazon.com/startups/programs/", tone: "mint" },
];

export default function Programs() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const filtered = useMemo(() => programs.filter((program) => {
    const text = `${program.name} ${program.provider} ${program.short} ${program.eligibility} ${program.primaryCategory}`.toLowerCase();
    return (!query || text.includes(query.toLowerCase())) && (region === "All" || program.region === region);
  }), [query, region]);
  const regions = Array.from(new Set(programs.map((program) => program.region))).sort();
  return <div className="standalone-page data-page" dir="rtl">
    <header className="standalone-header"><a className="brand" href="/"><span className="brand-mark"><Sparkles size={16} /></span><span><strong>Startup Academy</strong><small>Data Directory</small></span></a><div className="header-actions"><a className="back-link" href="/register">التسجيل</a><a className="back-link" href="/"><ArrowLeft size={16} /> الرئيسية</a></div></header>
    <main className="data-main"><div className="data-hero"><div><span className="eyebrow"><ShieldCheck size={15} /> دليل البيانات الموثّق</span><h1>كل البرامج المتاحة <em>في مكان واحد.</em></h1><p>ابحث في البرامج، راجع الأهلية والمزايا، ثم افتح المصدر الرسمي قبل التقديم. صنّفنا برامج Amazon بوضوح لأن كل مسار له هدف وأهلية مختلفة.</p></div><div className="data-count"><strong>{filtered.length}</strong><span>من {programs.length} برنامجًا</span></div></div>
      <section className="amazon-section"><div className="amazon-heading"><div><span className="eyebrow"><Cloud size={15} /> Amazon / AWS</span><h2>أربعة مسارات مختلفة — لا تخلط بينها</h2><p>ابدأ من نوع الدعم الذي تحتاجه: رصيد سحابي، تسريع AI، بناء المنتج، أو شبكة الشركاء والبرامج الإقليمية.</p></div><span className="amazon-badge">4 برامج</span></div><div className="amazon-grid">{amazonPrograms.map(({ icon: Icon, name, label, body, link, tone }) => <a className={`amazon-card ${tone}`} href={link} target="_blank" rel="noreferrer" key={name}><span className="amazon-icon"><Icon size={20} /></span><span className="amazon-card-copy"><strong>{name}</strong><small>{label}</small><p>{body}</p><b>المصدر الرسمي <ExternalLink size={13} /></b></span></a>)}</div></section>
      <div className="data-toolbar"><label className="search-field wide"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحث باسم البرنامج أو المزوّد أو الأهلية" /></label><label className="select-field"><Filter size={15} /><select value={region} onChange={(e) => setRegion(e.target.value)}><option value="All">كل المناطق</option>{regions.map((item) => <option value={item} key={item}>{item}</option>)}</select></label></div><div className="directory-note"><strong>دليل كامل قابل للبحث</strong><span>الأرقام والمزايا تتغير حسب المرحلة، الدولة، التمويل، وشروط البرنامج. راجع دائمًا الرابط الرسمي قبل التقديم.</span></div><div className="data-table-wrap"><table className="data-table"><thead><tr><th>البرنامج والمزوّد</th><th>المزايا</th><th>الأهلية والمتطلبات</th><th>الحالة</th><th>المصدر</th></tr></thead><tbody>{filtered.map((program) => <tr key={program.id}><td><strong>{program.name}</strong><small>{program.provider} · {program.region}</small></td><td>{program.short}</td><td>{program.eligibility}</td><td><span className={`status-pill ${program.statusKey}`}>{program.status.replace("🔄 ", "").replace("⏳ ", "").replace("❌ ", "")}</span><small>تحقق: {program.lastVerified}</small></td><td><a className="source-button" href={program.link} target="_blank" rel="noreferrer">المصدر <ExternalLink size={14} /></a></td></tr>)}</tbody></table></div>{filtered.length === 0 && <div className="empty-state"><Search size={28} /><strong>لا توجد نتائج</strong><button onClick={() => { setQuery(""); setRegion("All"); }}>إعادة ضبط البحث</button></div>}</main>
  </div>;
}
