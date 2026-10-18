import { useMemo, useState } from "react";
import { ArrowLeft, ExternalLink, Filter, Search, ShieldCheck, Sparkles } from "lucide-react";
import { programs } from "@/data/programs";

export default function Programs() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const filtered = useMemo(() => programs.filter((program) => {
    const text = `${program.name} ${program.provider} ${program.short} ${program.eligibility}`.toLowerCase();
    return (!query || text.includes(query.toLowerCase())) && (region === "All" || program.region === region);
  }), [query, region]);
  const regions = Array.from(new Set(programs.map((program) => program.region))).sort();
  return <div className="standalone-page data-page" dir="rtl">
    <header className="standalone-header"><a className="brand" href="/"><span className="brand-mark"><Sparkles size={16} /></span><span><strong>Startup Academy</strong><small>Data Directory</small></span></a><div className="header-actions"><a className="back-link" href="/register">التسجيل</a><a className="back-link" href="/"><ArrowLeft size={16} /> الرئيسية</a></div></header>
    <main className="data-main"><div className="data-hero"><div><span className="eyebrow"><ShieldCheck size={15} /> دليل البيانات الموثّق</span><h1>برامج التمويل والدعم <em>في مكان واحد.</em></h1><p>ابحث في البرامج، راجع الأهلية والمزايا، ثم افتح المصدر الرسمي قبل التقديم.</p></div><div className="data-count"><strong>{filtered.length}</strong><span>من {programs.length} برنامج</span></div></div><div className="data-toolbar"><label className="search-field wide"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحث باسم البرنامج أو المزوّد أو الأهلية" /></label><label className="select-field"><Filter size={15} /><select value={region} onChange={(e) => setRegion(e.target.value)}><option value="All">كل المناطق</option>{regions.map((item) => <option key={item}>{item}</option>)}</select></label></div><div className="data-table-wrap"><table className="data-table"><thead><tr><th>البرنامج والمزوّد</th><th>المزايا</th><th>الأهلية والمتطلبات</th><th>الحالة</th><th>المصدر</th></tr></thead><tbody>{filtered.map((program) => <tr key={program.id}><td><strong>{program.name}</strong><small>{program.provider} · {program.region}</small></td><td>{program.short}</td><td>{program.eligibility}</td><td><span className={`status-pill ${program.statusKey}`}>{program.status.replace("🔄 ", "").replace("⏳ ", "").replace("❌ ", "")}</span><small>تحقق: {program.lastVerified}</small></td><td><a className="source-button" href={program.link} target="_blank" rel="noreferrer">المصدر <ExternalLink size={14} /></a></td></tr>)}</tbody></table></div>{filtered.length === 0 && <div className="empty-state"><Search size={28} /><strong>لا توجد نتائج</strong><button onClick={() => { setQuery(""); setRegion("All"); }}>إعادة ضبط البحث</button></div>}</main>
  </div>;
}
