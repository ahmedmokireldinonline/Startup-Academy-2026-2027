import { useMemo, useState } from "react";
import { ArrowUpRight, Filter, Globe2, Search, Sparkles } from "lucide-react";
import investorData from "@/data/investors.json";

type Investor = (typeof investorData)[number];

const typeLabels: Record<string, string> = {
  "Angel investor": "مستثمر ملاك",
  "Seed investor": "مستثمر Seed",
  "Active seed fund": "صندوق Seed نشط",
};

export default function Investors() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [location, setLocation] = useState("All");
  const [focus, setFocus] = useState("All");
  const types = useMemo(() => Array.from(new Set(investorData.map((item) => item.type))), []);
  const locations = useMemo(() => Array.from(new Set(investorData.map((item) => item.location).filter(Boolean))).sort().slice(0, 80), []);
  const focuses = useMemo(() => Array.from(new Set(investorData.map((item) => item.focus).filter(Boolean))).sort().slice(0, 80), []);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return investorData.filter((item) => {
      const text = `${item.name} ${item.type} ${item.location} ${item.focus} ${item.role} ${item.details}`.toLowerCase();
      return (!q || text.includes(q)) && (type === "All" || item.type === type) && (location === "All" || item.location === location) && (focus === "All" || item.focus === focus);
    });
  }, [focus, location, query, type]);
  return (
    <div className="directory-shell" dir="rtl">
      <header className="directory-header"><a className="brand" href="/"><span className="brand-mark"><Sparkles size={16} /></span><span><strong>Startup Academy</strong><small>2026—2027</small></span></a><a className="directory-back" href="/">العودة إلى الدليل <ArrowUpRight size={15} /></a></header>
      <main className="directory-main">
        <section className="directory-hero"><span className="eyebrow"><span className="live-dot" /> SaaS Stock / Investor Desk</span><h1>اعثر على المستثمر المناسب<br /><em>لجولة التمويل القادمة.</em></h1><p>دليل عملي مبني على ملفات SaaS Toolkit الأصلية: أكثر من ألفي مستثمر ملاك وصناديق Seed نشطة، مع البحث في الموقع، المرحلة، المجال، والدور.</p><div className="directory-stats"><strong>{investorData.length.toLocaleString("en-US")}+</strong><span>سجل مستثمر وفريق استثماري</span><strong>3</strong><span>مصادر SaaS موثقة</span></div></section>
        <section className="investor-directory">
          <div className="directory-toolbar"><label className="search-field wide"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث باسم المستثمر أو المجال أو الموقع..." /></label><label className="select-field"><Filter size={15} /><select value={type} onChange={(event) => setType(event.target.value)}><option value="All">كل أنواع المستثمرين</option>{types.map((item) => <option key={item} value={item}>{typeLabels[item] || item}</option>)}</select></label><label className="select-field"><Globe2 size={15} /><select value={location} onChange={(event) => setLocation(event.target.value)}><option value="All">كل المواقع</option>{locations.map((item) => <option key={item} value={item}>{item}</option>)}</select></label><label className="select-field"><select value={focus} onChange={(event) => setFocus(event.target.value)}><option value="All">كل المجالات</option>{focuses.map((item) => <option key={item} value={item}>{item}</option>)}</select></label></div>
          <div className="results-bar"><span>عرض <strong>{filtered.length.toLocaleString("en-US")}</strong> من {investorData.length.toLocaleString("en-US")} سجل</span><span className="results-hint"><Sparkles size={14} /> البيانات مستخرجة من SaaS Toolkit</span></div>
          <div className="investor-grid">{filtered.slice(0, 240).map((item: Investor) => <article className="investor-card" key={item.id}><div className="investor-card-top"><span className="investor-avatar">{item.name.slice(0, 2).toUpperCase()}</span><div><h3>{item.name}</h3><span>{typeLabels[item.type] || item.type} · {item.role}</span></div></div><div className="investor-tags"><span>{item.focus || "SaaS"}</span><span>{item.location || "Global"}</span></div><p>{item.details || "Investor profile from the SaaS Stock collection."}</p><div className="investor-footer"><small>{item.source}</small><a href={item.url} target="_blank" rel="noreferrer">فتح الملف <ArrowUpRight size={14} /></a></div></article>)}</div>
          {filtered.length > 240 ? <p className="directory-note">يتم عرض أول 240 نتيجة لحفاظ الصفحة على سرعة التصفح. استخدم البحث أو الفلاتر للوصول إلى سجل محدد.</p> : null}
          {filtered.length === 0 ? <div className="empty-state"><Search size={27} /><strong>لا توجد نتائج مطابقة.</strong><button onClick={() => { setQuery(""); setType("All"); setLocation("All"); setFocus("All"); }}>إعادة ضبط الفلاتر</button></div> : null}
        </section>
      </main>
    </div>
  );
}
