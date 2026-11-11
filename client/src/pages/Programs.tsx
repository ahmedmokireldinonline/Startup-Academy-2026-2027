import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ExternalLink, Filter, LockKeyhole, Search, ShieldCheck, Sparkles, X } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { programs as summaryPrograms, type Program } from "@/data/programs";
import { trpc } from "@/lib/trpc";
import MotionTicker from "@/components/MotionTicker";

type Language = "ar" | "en";
type UnlockedProgram = Program & { link?: string };

const categoryArabic: Record<string, string> = {
  "Cloud & infrastructure credits": "أرصدة السحابة والبنية التحتية",
  "Grants & funding": "المنح والتمويل",
  "Accelerators & ecosystem": "المسرّعات والمنظومة",
  "SaaS discounts & perks": "خصومات ومزايا SaaS",
};

function providerDomain(provider: string) {
  const value = provider.toLowerCase();
  if (value.includes("amazon") || value.includes("aws")) return "aws.amazon.com";
  if (value.includes("microsoft")) return "microsoft.com";
  if (value.includes("google")) return "google.com";
  if (value.includes("anthropic")) return "anthropic.com";
  if (value.includes("clickup")) return "clickup.com";
  if (value.includes("hubspot")) return "hubspot.com";
  return "";
}

function providerInitials(provider: string) {
  return provider.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

function splitPoints(value: string) {
  return value.split("|").map((item) => item.trim()).filter(Boolean);
}

export default function Programs() {
  const [language, setLanguage] = useState<Language>(() => {
    try { return localStorage.getItem("startup-academy-language") === "en" ? "en" : "ar"; } catch { return "ar"; }
  });
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [selectedProgram, setSelectedProgram] = useState<UnlockedProgram | null>(null);
  const isArabic = language === "ar";
  usePageMeta({
    language,
    titleAr: "دليل برامج تمويل الشركات الناشئة",
    titleEn: "Startup Funding Programs Directory",
    descriptionAr: "استكشف المنح وأرصدة السحابة والمسرّعات وفرص التقديم الموثقة للشركات الناشئة.",
    descriptionEn: "Browse verified startup grants, cloud credits, accelerators, and application opportunities.",
    path: "/programs",
    type: "CollectionPage",
  });

  const access = trpc.registration.accessStatus.useQuery();
  const registered = access.data?.registered === true;
  const directory = trpc.directory.list.useQuery(undefined, { enabled: registered });
  const catalog: UnlockedProgram[] = registered
    ? (directory.data?.programs || []) as UnlockedProgram[]
    : summaryPrograms.map((program) => ({ ...program, link: "" }));
  const regions = useMemo(() => Array.from(new Set(catalog.map((program) => program.region))).sort(), [catalog]);
  const categories = useMemo(() => Array.from(new Set(catalog.map((program) => program.primaryCategory))).sort(), [catalog]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalog.filter((program) => {
      const text = `${program.name} ${program.provider} ${program.type} ${program.short} ${program.eligibility} ${program.benefits} ${program.steps}`.toLowerCase();
      return (!q || text.includes(q)) && (region === "All" || program.region === region) && (category === "All" || program.primaryCategory === category) && (status === "All" || program.statusKey === status);
    });
  }, [catalog, query, region, category, status]);
  const reset = () => { setQuery(""); setRegion("All"); setCategory("All"); setStatus("All"); };
  const categoryLabel = (value: string) => isArabic ? categoryArabic[value] || value : value;
  const statusLabel = (value: string) => {
    const key = value.replace(/[🔄⏳❌]\s*/g, "");
    if (!isArabic) return key;
    return ({ rolling: "تقديم مستمر", open: "مفتوح", opening: "يفتح قريبًا", closed: "مغلق" } as Record<string, string>)[key] || key;
  };
  const toggleLanguage = () => {
    const next = isArabic ? "en" : "ar";
    setLanguage(next);
    try { localStorage.setItem("startup-academy-language", next); } catch { /* storage unavailable */ }
  };
  const openProgram = (program: UnlockedProgram) => setSelectedProgram(program);
  const tickerItems = catalog.slice(0, 24).map((program) => ({ ar: `${program.name} · ${statusLabel(program.statusKey)}`, en: `${program.name} · ${statusLabel(program.statusKey)}`, href: "#program-directory" }));

  return <div className="standalone-page data-page" dir={isArabic ? "rtl" : "ltr"}>
    <header className="standalone-header">
      <a className="brand" href="/"><span className="brand-mark"><Sparkles size={16} /></span><span><strong>Startup Academy</strong><small>{isArabic ? "دليل البرامج الكامل" : "Full Programs Directory"}</small></span></a>
      <div className="header-actions"><button className="language-switch" onClick={toggleLanguage}>{isArabic ? "English" : "العربية"}</button><a className="back-link" href="/register">{isArabic ? "التسجيل" : "Register"}</a><a className="back-link" href="/"><ArrowLeft size={16} /> {isArabic ? "الرئيسية" : "Home"}</a></div>
    </header>
    <main className="data-main">
      <div className="data-hero"><div><span className="eyebrow"><ShieldCheck size={15} /> {isArabic ? "دليل البرامج الكامل" : "Complete program directory"}</span><h1>{isArabic ? <>كل فرص النمو <em>في مكان واحد.</em></> : <>Every growth opportunity <em>in one place.</em></>}</h1><p>{isArabic ? "ابحث وقارن وافتح بطاقة أي برنامج لمعرفة الأهلية والمزايا والخطوات والموعد والحالة ومصدر البيانات." : "Search, compare, and open any program to review eligibility, benefits, steps, deadline, status, and source data."}</p></div><div className="data-count"><strong>{filtered.length}</strong><span>{isArabic ? `من ${catalog.length} برنامج` : `of ${catalog.length} programs`}</span></div></div>
      {tickerItems.length ? <MotionTicker labelAr="آخر تحديثات الفرص" labelEn="Latest opportunity updates" items={tickerItems} /> : null}
      <div className="data-toolbar full-filters" id="program-directory"><label className="search-field wide"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={isArabic ? "ابحث بالاسم أو المزوّد أو الميزة أو الأهلية" : "Search by name, provider, benefit, or eligibility"} /></label><label className="select-field"><Filter size={15} /><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="All">{isArabic ? "كل الفئات" : "All categories"}</option>{categories.map((item) => <option key={item} value={item}>{categoryLabel(item)}</option>)}</select></label><label className="select-field"><select value={region} onChange={(event) => setRegion(event.target.value)}><option value="All">{isArabic ? "كل المناطق" : "All regions"}</option>{regions.map((item) => <option key={item}>{item}</option>)}</select></label><label className="select-field"><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="All">{isArabic ? "كل الحالات" : "All statuses"}</option><option value="rolling">{isArabic ? "تقديم مستمر" : "Rolling"}</option><option value="opening">{isArabic ? "يفتح قريبًا" : "Opening soon"}</option><option value="closed">{isArabic ? "مغلق" : "Closed"}</option></select></label></div>
      <div className="directory-note"><strong>{isArabic ? "المعروض للجميع:" : "Public:"}</strong> {isArabic ? "الاسم والفئة والمزايا والأهلية والحالة." : "Names, categories, benefits, eligibility, and status."} <strong>{isArabic ? "المحمي:" : "Protected:"}</strong> {isArabic ? "روابط التقديم الرسمية عند التفعيل." : "Official application links after activation."}</div>
      <div className="results-bar"><span>{isArabic ? "عرض" : "Showing"} <strong>{filtered.length}</strong> {isArabic ? "فرصة" : "opportunities"}</span><span className="results-hint"><CheckCircle2 size={14} /> {isArabic ? "انقر على أي بطاقة للتفاصيل" : "Open any card for full details"}</span></div>
      {filtered.length === 0 ? <div className="empty-state"><Search size={28} /><strong>{isArabic ? "لا توجد نتائج" : "No results found"}</strong><button onClick={reset}>{isArabic ? "إعادة ضبط البحث" : "Reset search"}</button></div> : <>
        <div className="data-table-wrap"><table className="data-table"><thead><tr><th>{isArabic ? "البرنامج والمزوّد" : "Program and provider"}</th><th>{isArabic ? "الفئة والمنطقة" : "Category and region"}</th><th>{isArabic ? "المزايا" : "Benefits"}</th><th>{isArabic ? "الأهلية" : "Eligibility"}</th><th>{isArabic ? "الحالة والموعد" : "Status and deadline"}</th><th>{isArabic ? "فتح" : "Open"}</th></tr></thead><tbody>{filtered.map((program) => <tr key={program.id} onClick={() => openProgram(program)} tabIndex={0} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") openProgram(program); }}><td><div className="program-provider-cell"><span className="program-provider-mark">{providerDomain(program.provider) ? <img src={`https://www.google.com/s2/favicons?domain=${providerDomain(program.provider)}&sz=64`} alt="" width="23" height="23" loading="lazy" /> : providerInitials(program.provider)}</span><span><strong>{program.name}</strong><small>{program.provider} · {program.type}</small></span></div></td><td><span className="directory-category">{categoryLabel(program.primaryCategory)}</span><small>{program.region}</small></td><td>{program.short}<small>{splitPoints(program.benefits)[0]}</small></td><td>{program.eligibility}<small>{isArabic ? "اضغط للتفاصيل" : "Tap for details"}</small></td><td><span className={`status-pill ${program.statusKey}`}>{statusLabel(program.statusKey)}</span><small>{program.deadline}</small></td><td><button className="row-open" onClick={(event) => { event.stopPropagation(); openProgram(program); }} aria-label={isArabic ? `فتح تفاصيل ${program.name}` : `Open ${program.name} details`}><ArrowUpRight size={14} /></button></td></tr>)}</tbody></table></div>
        <div className="program-mobile-list">{filtered.map((program) => <button className="program-mobile-card" key={`mobile-${program.id}`} onClick={() => openProgram(program)}><div className="program-mobile-top"><span className="program-provider-mark">{providerDomain(program.provider) ? <img src={`https://www.google.com/s2/favicons?domain=${providerDomain(program.provider)}&sz=64`} alt="" width="23" height="23" loading="lazy" /> : providerInitials(program.provider)}</span><span><strong>{program.name}</strong><small>{program.provider} · {program.region}</small></span><ArrowUpRight size={15} /></div><p>{program.short}</p><div><span className={`status-pill ${program.statusKey}`}>{statusLabel(program.statusKey)}</span><span className="directory-category">{categoryLabel(program.primaryCategory)}</span></div></button>)}</div>
      </>}
    </main>
    {selectedProgram ? <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProgram(null); }}><section className="program-modal" role="dialog" aria-modal="true" aria-labelledby="program-dialog-title"><div className="modal-header"><div className="program-name"><strong id="program-dialog-title">{selectedProgram.name}</strong><small>{selectedProgram.provider} · {selectedProgram.type} · {selectedProgram.region}</small></div><button className="modal-close" onClick={() => setSelectedProgram(null)} aria-label={isArabic ? "إغلاق" : "Close"}><X size={16} /></button></div><div className="modal-badges"><span className={`status-pill ${selectedProgram.statusKey}`}>{statusLabel(selectedProgram.statusKey)}</span><span className="verified-inline"><CheckCircle2 size={12} /> {isArabic ? `آخر تحقق ${selectedProgram.lastVerified}` : `Verified ${selectedProgram.lastVerified}`}</span></div><p className="modal-lead">{selectedProgram.short}</p><div className="modal-grid"><div><strong>{isArabic ? "الأهلية" : "Eligibility"}</strong><p>{selectedProgram.eligibility}</p></div><div><strong>{isArabic ? "الموعد" : "Deadline"}</strong><p>{selectedProgram.deadline}</p></div></div><div className="modal-section"><strong>{isArabic ? "المزايا" : "Benefits"}</strong><ul className="micro-list">{splitPoints(selectedProgram.benefits).map((item) => <li key={item}>{item}</li>)}</ul></div><div className="modal-section"><strong>{isArabic ? "خطوات التقديم" : "Application steps"}</strong><ul className="micro-list">{splitPoints(selectedProgram.steps).map((item) => <li key={item}>{item}</li>)}</ul></div><div className="modal-footer"><span>{selectedProgram.categorySource}</span>{registered && selectedProgram.link ? <a className="button button-primary" href={selectedProgram.link} target="_blank" rel="noreferrer">{isArabic ? "فتح التقديم الرسمي" : "Open official application"} <ExternalLink size={14} /></a> : <a className="button button-primary" href="/register">{isArabic ? "التسجيل لفتح الرابط" : "Register to unlock"} <LockKeyhole size={14} /></a>}</div></section></div> : null}
  </div>;
}
