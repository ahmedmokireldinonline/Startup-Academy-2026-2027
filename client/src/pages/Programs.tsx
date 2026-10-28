import { useMemo, useState } from "react";
import { ArrowLeft, ExternalLink, Filter, LockKeyhole, Search, ShieldCheck, Sparkles } from "lucide-react";
import { programs } from "@/data/programs";
import { hasRegistrationAccess } from "@/lib/access";

const categoryArabic: Record<string, string> = {
  "Cloud & infrastructure credits": "Cloud وInfrastructure Credits",
  "Grants & funding": "المنح والتمويل",
  "Accelerators & ecosystem": "المسرّعات والشبكات",
  "SaaS discounts & perks": "خصومات ومزايا SaaS",
};

export default function Programs() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [registered] = useState(hasRegistrationAccess);
  const regions = useMemo(() => Array.from(new Set(programs.map((program) => program.region))).sort(), []);
  const categories = useMemo(() => Array.from(new Set(programs.map((program) => program.primaryCategory))).sort(), []);
  const filtered = useMemo(() => programs.filter((program) => {
    const text = `${program.name} ${program.provider} ${program.type} ${program.short} ${program.eligibility} ${program.benefits}`.toLowerCase();
    return (!query || text.includes(query.toLowerCase())) && (region === "All" || program.region === region) && (category === "All" || program.primaryCategory === category) && (status === "All" || program.statusKey === status);
  }), [query, region, category, status]);
  const reset = () => { setQuery(""); setRegion("All"); setCategory("All"); setStatus("All"); };
  return <div className="standalone-page data-page" dir="rtl">
    <header className="standalone-header"><a className="brand" href="/"><span className="brand-mark"><Sparkles size={16} /></span><span><strong>Startup Academy</strong><small>Full Programs Directory</small></span></a><div className="header-actions"><a className="back-link" href="/register">التسجيل</a><a className="back-link" href="/"><ArrowLeft size={16} /> الرئيسية</a></div></header>
    <main className="data-main"><div className="data-hero"><div><span className="eyebrow"><ShieldCheck size={15} /> دليل البرامج الكامل</span><h1>كل فرص النمو <em>في مكان واحد.</em></h1><p>استكشف البرامج حسب الفئة والمنطقة والحالة. التفاصيل وروابط المصدر الرسمي تظهر بعد التسجيل المجاني.</p></div><div className="data-count"><strong>{filtered.length}</strong><span>من {programs.length} برنامج</span></div></div>{!registered ? <section className="directory-gate"><div className="gate-icon"><LockKeyhole size={27} /></div><h2>سجّل أولًا لفتح المصادر وروابط التقديم</h2><p>يمكنك رؤية خريطة الفرص والفئات الآن. بعد التسجيل نفتح الأهلية التفصيلية، المصدر الرسمي، وخطوة التقديم لكل برنامج.</p><a className="button button-primary" href="/register">التسجيل وفتح الدليل <ArrowLeft size={17} /></a></section> : <><div className="data-toolbar full-filters"><label className="search-field wide"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحث باسم البرنامج أو المزوّد أو الميزة" /></label><label className="select-field"><Filter size={15} /><select value={category} onChange={(e) => setCategory(e.target.value)}><option value="All">كل الفئات</option>{categories.map((item) => <option key={item} value={item}>{categoryArabic[item] || item}</option>)}</select></label><label className="select-field"><select value={region} onChange={(e) => setRegion(e.target.value)}><option value="All">كل المناطق</option>{regions.map((item) => <option key={item}>{item}</option>)}</select></label><label className="select-field"><select value={status} onChange={(e) => setStatus(e.target.value)}><option value="All">كل الحالات</option><option value="rolling">تقديم مستمر</option><option value="open">مفتوح</option><option value="opening">يفتح قريبًا</option><option value="closed">مغلق</option></select></label></div><div className="directory-note"><strong>نقطة البداية:</strong> نساعدك على اختيار المسار الأنسب بين المسرّعات، الشبكات، المنح، وCloud/AI Credits. عدد النتائج الحالية: {filtered.length}.</div><div className="data-table-wrap"><table className="data-table"><thead><tr><th>البرنامج والمزوّد</th><th>الفئة والمنطقة</th><th>المزايا</th><th>الأهلية والمتطلبات</th><th>الحالة</th><th>المصدر</th></tr></thead><tbody>{filtered.map((program) => <tr key={program.id}><td><strong>{program.name}</strong><small>{program.provider} · {program.type}</small></td><td><span className="directory-category">{categoryArabic[program.primaryCategory] || program.primaryCategory}</span><small>{program.region}</small></td><td>{program.short}</td><td>{program.eligibility}</td><td><span className={`status-pill ${program.statusKey}`}>{program.status.replace("🔄 ", "").replace("⏳ ", "").replace("❌ ", "")}</span><small>تحقق: {program.lastVerified}</small></td><td><a className="source-button" href={program.link} target="_blank" rel="noreferrer">التقديم الرسمي <ExternalLink size={14} /></a></td></tr>)}</tbody></table></div>{filtered.length === 0 && <div className="empty-state"><Search size={28} /><strong>لا توجد نتائج</strong><button onClick={reset}>إعادة ضبط البحث</button></div>}</>}</main>
  </div>;
}
