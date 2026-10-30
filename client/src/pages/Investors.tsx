import { useMemo, useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Globe2, MessageCircle, RotateCcw, Search, Sparkles, X } from "lucide-react";
import investorData from "@/data/investors.json";
import { investorPlatforms } from "@/data/investorPlatforms";
import { whatsappUrl } from "@/lib/access";

type Investor = (typeof investorData)[number];

type EnrichedInvestor = Investor & { country: string; investments: string[]; image: string };

const typeLabels: Record<string, string> = {
  "Angel investor": "مستثمر ملاك",
  "Seed investor": "مستثمر Seed",
  "Active seed fund": "صندوق Seed نشط",
};

const countryByLocation: Record<string, string> = {
  "San Francisco": "United States", "Los Angeles": "United States", "California": "United States", "Cambridge": "United States", "Palo Alto": "United States", "New York City": "United States", "New York": "United States", "Chicago": "United States", "Detroit": "United States", "Houston": "United States", "Seattle": "United States", "Boston": "United States", "Phoenix": "United States", "Boulder": "United States", "Sunnyvale": "United States", "Menlo Park": "United States", "Greenwich": "United States", "Larkspur": "United States", "Vancouver": "Canada", "Toronto": "Canada", "Tokyo": "Japan", "Singapore": "Singapore", "London": "United Kingdom", "Berlin": "Germany", "Paris": "France", "Melbourne": "Australia", "Sydney": "Australia", "Tel Aviv": "Israel", "United States": "United States",
};

function countryFor(location: string) {
  return countryByLocation[location] || location || "Global";
}

function investmentsFor(item: Investor) {
  const matches = item.details.match(/@([a-z0-9][a-z0-9-]{2,})/gi) || [];
  const companies = matches.map((value) => value.slice(1).replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()));
  return Array.from(new Set(companies)).slice(0, 5);
}

function fallbackImageFor(item: Investor) {
  return `https://api.dicebear.com/9.x/initials/svg?backgroundColor=16243d&fontFamily=Arial&fontWeight=700&seed=${encodeURIComponent(item.name)}`;
}

function imageFor(item: Investor) {
  const slug = item.url.split("/").filter(Boolean).pop() || item.name.toLowerCase().replace(/\s+/g, "-");
  return `https://unavatar.io/angel.co/${slug}`;
}

const enrichedData: EnrichedInvestor[] = investorData.map((item) => ({
  ...item,
  country: countryFor(item.location),
  investments: investmentsFor(item),
  image: imageFor(item),
}));

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: Array<{ value: string; label: string }>; onChange: (value: string) => void }) {
  return <label className="investor-filter"><span>{label}</span><span className="investor-filter-control"><select value={value} onChange={(event) => onChange(event.target.value)}><option value="All">الكل</option>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><ChevronDown size={14} /></span></label>;
}

export default function Investors() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [country, setCountry] = useState("All");
  const [focus, setFocus] = useState("All");
  const [visibleCount, setVisibleCount] = useState(60);
  const types = useMemo(() => Array.from(new Set(enrichedData.map((item) => item.type))).sort(), []);
  const countries = useMemo(() => Array.from(new Set(enrichedData.map((item) => item.country))).sort(), []);
  const focuses = useMemo(() => Array.from(new Set(enrichedData.map((item) => item.focus).filter(Boolean))).sort(), []);
  const activeFilters = [type, country, focus].filter((item) => item !== "All").length + (query.trim() ? 1 : 0);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return enrichedData.filter((item) => {
      const searchable = [item.name, item.country, item.focus, item.type, ...item.investments].join(" ").toLowerCase();
      return (!q || searchable.includes(q)) && (type === "All" || item.type === type) && (country === "All" || item.country === country) && (focus === "All" || item.focus === focus);
    });
  }, [country, focus, query, type]);
  const reset = () => { setQuery(""); setType("All"); setCountry("All"); setFocus("All"); setVisibleCount(60); };
  return (
    <div className="directory-shell" dir="rtl">
      <header className="directory-header"><a className="brand" href="/"><span className="brand-mark"><Sparkles size={16} /></span><span><strong>Startup Academy</strong><small>2026—2027</small></span></a><a className="directory-back" href="/">العودة إلى الدليل <ArrowUpRight size={15} /></a></header>
      <main className="directory-main">
        <section className="directory-hero"><span className="eyebrow"><span className="live-dot" /> SaaS Stock / Investor Desk</span><h1>اعثر على المستثمر المناسب<br /><em>لجولة التمويل القادمة.</em></h1><p>دليل منظم لمستثمري SaaS. ابحث بالاسم أو الدولة أو الشركات التي استثمروا فيها، ثم استخدم الفلاتر للوصول إلى مجموعة مناسبة بدل النتائج العشوائية.</p><div className="directory-hero-actions"><a className="button button-primary" href={whatsappUrl("أريد حجز نسخة دليل المستثمرين الكاملة")} target="_blank" rel="noreferrer"><MessageCircle size={16} /> احجز النسخة الكاملة عبر WhatsApp</a></div><div className="directory-stats"><strong>{enrichedData.length.toLocaleString("en-US")}+</strong><span>مستثمر وسجل استثماري</span><strong>{countries.length}</strong><span>دولة وموقع استثماري</span></div></section>
        <section className="investor-directory">
          <div className="investor-search-row"><label className="investor-search"><Search size={18} /><input value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(60); }} placeholder="ابحث بالاسم، الشركة، الدولة أو المجال..." />{query ? <button onClick={() => setQuery("")} aria-label="مسح البحث"><X size={15} /></button> : null}</label><button className="reset-filters" onClick={reset}><RotateCcw size={14} /> إعادة ضبط</button></div>
          <div className="filter-panel"><div className="filter-panel-heading"><div><strong>فلترة المستثمرين</strong><small>اختر معايير واضحة لتضييق النتائج</small></div>{activeFilters ? <span>{activeFilters} فلاتر مفعلة</span> : <span>كل السجلات</span>}</div><div className="filter-grid"><FilterSelect label="نوع المستثمر" value={type} options={types.map((item) => ({ value: item, label: typeLabels[item] || item }))} onChange={(value) => { setType(value); setVisibleCount(60); }} /><FilterSelect label="الدولة" value={country} options={countries.map((item) => ({ value: item, label: item }))} onChange={(value) => { setCountry(value); setVisibleCount(60); }} /><FilterSelect label="المجال" value={focus} options={focuses.map((item) => ({ value: item, label: item }))} onChange={(value) => { setFocus(value); setVisibleCount(60); }} /></div><div className="quick-filters"><span>الأكثر بحثًا:</span>{["SaaS", "B2B", "AI", "Fintech", "United States"].map((item) => <button key={item} className={query === item ? "is-active" : ""} onClick={() => { setQuery(item); setVisibleCount(60); }}>{item}</button>)}</div></div>
          <div className="results-bar"><span>عرض <strong>{Math.min(visibleCount, filtered.length).toLocaleString("en-US")}</strong> من {filtered.length.toLocaleString("en-US")} نتيجة</span><span className="results-hint"><Check size={14} /> بدون روابط خارجية للمستثمرين</span></div>
          <div className="investor-grid">{filtered.slice(0, visibleCount).map((item) => <article className="investor-card investor-card-clean" key={item.id}><div className="investor-card-top"><img className="investor-photo" src={item.image} alt={`${item.name} profile`} loading="lazy" onError={(event) => { if (!event.currentTarget.dataset.fallbackApplied) { event.currentTarget.dataset.fallbackApplied = "true"; event.currentTarget.src = fallbackImageFor(item); } }} /><div><h3>{item.name}</h3><span>{typeLabels[item.type] || item.type}</span></div></div><div className="investor-meta-row"><span><Globe2 size={12} /> {item.country}</span><span>{item.focus || "SaaS"}</span></div><div className="investor-companies"><small>شركات استثمر فيها</small><div>{item.investments.length ? item.investments.map((company) => <span key={company}>{company}</span>) : <span>{item.focus || "SaaS portfolio"}</span>}</div></div><a className="investor-copy-cta" href={whatsappUrl(`أريد حجز النسخة الكاملة من ملف ${item.name}`)} target="_blank" rel="noreferrer"><MessageCircle size={13} /> اطلب الملف الكامل عبر WhatsApp</a></article>)}</div>
          {filtered.length > visibleCount ? <button className="load-more-investors" onClick={() => setVisibleCount((count) => count + 60)}>عرض 60 مستثمرًا إضافيًا <ArrowUpRight size={15} /></button> : null}
          {filtered.length === 0 ? <div className="empty-state"><Search size={27} /><strong>لا توجد نتائج مطابقة.</strong><button onClick={reset}>إعادة ضبط الفلاتر</button></div> : null}
        </section>
        <section className="investor-platforms-section">
          <div className="investor-platforms-heading"><div><span className="eyebrow"><Sparkles size={14} /> مصادر التوسعة</span><h2>منصات إضافية نستخدمها لتوسيع قائمة الأسماء</h2><p>تظهر هنا أسماء المنصات ونطاق تغطيتها فقط. روابط الوصول وملفات المصدر تبقى ضمن طبقة الإدارة والاشتراك المدفوع.</p></div><span className="platform-count">{investorPlatforms.length} منصات</span></div>
          <div className="investor-platforms-grid">{investorPlatforms.map((platform) => <article className="investor-platform-card" key={platform.id}><div className="platform-card-top"><span className="platform-index">{String(investorPlatforms.indexOf(platform) + 1).padStart(2, "0")}</span><span className="platform-category">{platform.category}</span></div><h3>{platform.name}</h3><p>{platform.coverage}</p><small>{platform.use} · تحقق {platform.verifiedOn}</small></article>)}</div>
        </section>
      </main>
    </div>
  );
}
