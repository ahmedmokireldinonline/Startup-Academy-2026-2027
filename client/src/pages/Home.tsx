import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BookOpen,
  Check,
  ChevronDown,
  CircleCheck,
  Clock3,
  Cloud,
  ExternalLink,
  Filter,
  Github,
  Globe2,
  GraduationCap,
  Landmark,
  Layers3,
  ListChecks,
  Menu,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { programs, type Program, type ProgramStatus } from "@/data/programs";
import {
  learningItems,
  learningPhases,
  referenceUrl,
  type LearningItem,
  type LearningPhase,
} from "@/data/learningPath";

const sourcePrograms = "https://github.com/ahmedmokireldinonline/startup-programs-2026-2027";
const sourceFunding = "https://github.com/ahmedmokireldinonline/Startup-Funding-2025";

const categoryArabic: Record<string, string> = {
  "Cloud & infrastructure credits": "أرصدة السحابة والبنية التحتية",
  "Grants & funding": "منح وتمويل",
  "Accelerators & ecosystem": "مسرّعات ومنظومة ريادة الأعمال",
  "SaaS discounts & perks": "خصومات ومزايا SaaS",
};

const statusArabic: Record<ProgramStatus, string> = {
  open: "مفتوح",
  rolling: "تقديم مستمر",
  opening: "يفتح قريبًا",
  closed: "مغلق",
};

function providerIconUrl(link: string) {
  try {
    return `https://www.google.com/s2/favicons?domain=${new URL(link).hostname}&sz=64`;
  } catch {
    return "";
  }
}

function initials(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function ProviderIcon({ program, large = false }: { program: Program; large?: boolean }) {
  const [failed, setFailed] = useState(false);
  const fallback = initials(program.provider);
  return (
    <span className={`provider-icon ${large ? "provider-icon-large" : ""}`} aria-hidden={failed}>
      {!failed && providerIconUrl(program.link) ? (
        <img
          src={providerIconUrl(program.link)}
          alt={`${program.provider} icon`}
          onError={() => setFailed(true)}
        />
      ) : null}
      {failed || !providerIconUrl(program.link) ? <span>{fallback}</span> : null}
    </span>
  );
}

function SplitList({ value }: { value: string }) {
  return (
    <ul className="micro-list">
      {value
        .split("|")
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, 4)
        .map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

function SectionHeading({ eyebrow, title, body, action }: { eyebrow: string; title: string; body?: string; action?: ReactNode }) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {body ? <p>{body}</p> : null}
      </div>
      {action}
    </div>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<"ar" | "en">(() => {
    try {
      return (localStorage.getItem("startup-academy-language") as "ar" | "en") || "ar";
    } catch {
      return "ar";
    }
  });
  const isArabic = language === "ar";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState("all");
  const [learningQuery, setLearningQuery] = useState("");
  const [learningStatus, setLearningStatus] = useState<"all" | "open" | "done">("all");
  const [programQuery, setProgramQuery] = useState("");
  const [programCategory, setProgramCategory] = useState("All");
  const [programRegion, setProgramRegion] = useState("All");
  const [programStatus, setProgramStatus] = useState<"all" | ProgramStatus>("all");
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [completed, setCompleted] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("startup-academy-progress") || "[]");
    } catch {
      return [];
    }
  });

  const copy = isArabic
    ? {
        navPath: "مسار التعلم",
        navPrograms: "دليل البرامج",
        navSources: "المصادر",
        switch: "English",
        eyebrow: "أكاديمية عملية للطلبة ورواد الأعمال",
        title: "من الفكرة إلى أول تمويل،",
        titleAccent: "بخطوات يمكن تنفيذها.",
        heroBody: "مساحة تعليمية واحدة تجمع مسار بناء الشركة مع دليل برامج الدعم والمنح والاعتمادات. ادرس، طبّق، واحفظ الدليل الذي يجهّزك للخطوة التالية.",
        startLearning: "ابدأ مسار التعلم",
        browsePrograms: "تصفح البرامج",
        activePrograms: "برنامج موثق",
        learningStages: "مراحل عملية",
        referenceLibrary: "مورد مرجعي",
        verifiedOn: "آخر تحقق",
        sourceNote: "البرامج النشطة أدناه مأخوذة من المصدر الرسمي للمشروع الأول، وتُراجع قبل إضافتها إلى الدليل.",
        learningEyebrow: "المسار التنفيذي",
        learningTitle: "ابنِ مشروعك على مراحل واضحة",
        learningBody: "كل بطاقة تحول فكرة نظرية إلى مخرج عملي ومقياس تستطيع مشاركته مع فريقك أو مرشدك.",
        allStages: "كل المراحل",
        openWork: "المفتوح",
        doneWork: "المكتمل",
        searchLearning: "ابحث في المخرجات أو المراجع...",
        nextAction: "الخطوة التالية",
        deliverable: "المخرج",
        measure: "مقياس الإنجاز",
        references: "مراجع المرحلة",
        markDone: "وضع كمكتمل",
        markOpen: "إعادة فتح المهمة",
        noLearning: "لا توجد مهام بهذا البحث أو الفلتر.",
        programsEyebrow: "دليل الفرص",
        programsTitle: "برامج الدعم والمنح والاعتمادات",
        programsBody: "جدول قابل للبحث والتصفية يضع البرنامج المناسب أمامك مع الأهلية والمزايا والرابط الرسمي وتاريخ التحقق.",
        searchPrograms: "ابحث باسم البرنامج أو المزوّد أو الميزة...",
        allCategories: "كل الفئات",
        allRegions: "كل المناطق",
        allStatuses: "كل الحالات",
        showing: "عرض",
        of: "من",
        program: "البرنامج",
        provider: "المزوّد",
        category: "الفئة",
        region: "المنطقة",
        benefit: "المزايا الرئيسية",
        eligibility: "الأهلية",
        status: "الحالة",
        official: "مصدر رسمي",
        details: "عرض التفاصيل",
        apply: "فتح صفحة التقديم",
        lastVerified: "تم التحقق في",
        programDetails: "تفاصيل البرنامج",
        applicationSteps: "خطوات التقديم المنشورة",
        sourceFile: "ملف الفهرس",
        close: "إغلاق",
        updateNote: "ملاحظة التحديث",
        updateBody: "عند تحديث الدليل، عدّل ملف البيانات المنظم بدل إعادة بناء البطاقات يدويًا. احتفظ بتاريخ التحقق والرابط الرسمي لكل صف.",
        readme: "دليل التحديث على GitHub",
        sourcesEyebrow: "مصادر موحدة",
        sourcesTitle: "مشروعان، تجربة تعلم واحدة",
        sourcesBody: "تم جمع مكتبة الأدلة ومسار التمويل في تجربة واحدة. تبقى المستودعات الأصلية هي المرجع القابل للمراجعة والتطوير.",
        openFunding: "مكتبة التمويل والأدوات",
        openPrograms: "دليل البرامج والبيانات",
        footer: "Startup Academy 2026–2027 · دليل تعلم قابل للتحديث",
        noResults: "لم نجد نتائج مطابقة.",
        reset: "إعادة ضبط التقدم",
      }
    : {
        navPath: "Learning path",
        navPrograms: "Programs directory",
        navSources: "Sources",
        switch: "العربية",
        eyebrow: "A practical academy for students and founders",
        title: "From first idea to first funding,",
        titleAccent: "one executable step at a time.",
        heroBody: "One learning workspace that combines a founder-building path with a source-first directory of startup grants, credits, and support programs. Study, apply, and keep the evidence.",
        startLearning: "Start learning path",
        browsePrograms: "Browse programs",
        activePrograms: "verified programs",
        learningStages: "practical stages",
        referenceLibrary: "reference assets",
        verifiedOn: "last verified",
        sourceNote: "Active programs below come from the first repository’s official-source catalog and are reviewed before being promoted into the directory.",
        learningEyebrow: "Execution path",
        learningTitle: "Build the company in clear stages",
        learningBody: "Each card turns a concept into a practical deliverable and a measure you can share with a team or mentor.",
        allStages: "All stages",
        openWork: "Open",
        doneWork: "Completed",
        searchLearning: "Search outcomes or references...",
        nextAction: "Next action",
        deliverable: "Deliverable",
        measure: "Success measure",
        references: "Stage references",
        markDone: "Mark as complete",
        markOpen: "Re-open task",
        noLearning: "No tasks match this search or filter.",
        programsEyebrow: "Opportunity directory",
        programsTitle: "Startup grants, credits & support",
        programsBody: "A searchable directory that brings the right program forward with eligibility, benefits, official source, and verification date.",
        searchPrograms: "Search program, provider, or benefit...",
        allCategories: "All categories",
        allRegions: "All regions",
        allStatuses: "All statuses",
        showing: "Showing",
        of: "of",
        program: "Program",
        provider: "Provider",
        category: "Category",
        region: "Region",
        benefit: "Key benefit",
        eligibility: "Eligibility",
        status: "Status",
        official: "Official source",
        details: "View details",
        apply: "Open application page",
        lastVerified: "Verified",
        programDetails: "Program details",
        applicationSteps: "Published application steps",
        sourceFile: "Catalog file",
        close: "Close",
        updateNote: "Maintenance note",
        updateBody: "When the directory changes, update the structured data file instead of rebuilding cards by hand. Keep the verification date and official link for every row.",
        readme: "Open update guide on GitHub",
        sourcesEyebrow: "Unified sources",
        sourcesTitle: "Two projects, one learning experience",
        sourcesBody: "The evidence library and the funding path now live in one experience. The original repositories remain the reviewable sources for future updates.",
        openFunding: "Funding & tools library",
        openPrograms: "Programs directory & data",
        footer: "Startup Academy 2026–2027 · A maintainable learning directory",
        noResults: "No matching results found.",
        reset: "Reset progress",
      };

  const activePhase: LearningPhase = learningPhases.find((phase) => phase.id === selectedPhase) || learningPhases[0];
  const phaseItems = useMemo(() => {
    const query = learningQuery.trim().toLowerCase();
    return learningItems.filter((item) => {
      const phaseMatch = selectedPhase === "all" || item.phase === selectedPhase;
      const statusMatch = learningStatus === "all" || (learningStatus === "done" ? completed.includes(item.id) : !completed.includes(item.id));
      const text = `${item.outcome} ${item.outcomeAr} ${item.action} ${item.actionAr} ${item.deliverable} ${item.references.map((reference) => reference.label).join(" ")}`.toLowerCase();
      return phaseMatch && statusMatch && (!query || text.includes(query));
    });
  }, [completed, learningQuery, learningStatus, selectedPhase]);

  const programCategories = useMemo(() => Array.from(new Set(programs.map((program) => program.primaryCategory))), []);
  const programRegions = useMemo(() => Array.from(new Set(programs.map((program) => program.region))), []);
  const filteredPrograms = useMemo(() => {
    const query = programQuery.trim().toLowerCase();
    return programs.filter((program) => {
      const text = `${program.name} ${program.provider} ${program.region} ${program.type} ${program.short} ${program.benefits} ${program.eligibility}`.toLowerCase();
      return (
        (!query || text.includes(query)) &&
        (programCategory === "All" || program.primaryCategory === programCategory) &&
        (programRegion === "All" || program.region === programRegion) &&
        (programStatus === "all" || program.statusKey === programStatus)
      );
    });
  }, [programCategory, programQuery, programRegion, programStatus]);

  const setLanguageAndRemember = (next: "ar" | "en") => {
    setLanguage(next);
    localStorage.setItem("startup-academy-language", next);
  };

  const toggleComplete = (id: string) => {
    const next = completed.includes(id) ? completed.filter((item) => item !== id) : [...completed, id];
    setCompleted(next);
    localStorage.setItem("startup-academy-progress", JSON.stringify(next));
  };

  const resetProgress = () => {
    setCompleted([]);
    localStorage.removeItem("startup-academy-progress");
  };

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const progress = Math.round((completed.length / learningItems.length) * 100);
  const categoryOptions = ["All", ...programCategories];
  const regionOptions = ["All", ...programRegions];

  return (
    <div className={`academy-shell ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      <header className="site-header">
        <div className="header-inner">
          <button className="brand" onClick={() => scrollTo("top")} aria-label="Startup Academy home">
            <span className="brand-mark"><Sparkles size={16} /></span>
            <span><strong>Startup Academy</strong><small>2026—2027</small></span>
          </button>
          <button className="mobile-menu" onClick={() => setMobileOpen((value) => !value)} aria-label="Open menu"><Menu size={21} /></button>
          <nav className={`main-nav ${mobileOpen ? "is-open" : ""}`}>
            <button onClick={() => scrollTo("learning-path")}>{copy.navPath}</button>
            <button onClick={() => scrollTo("programs")}>{copy.navPrograms}</button>
            <a className="main-nav-link" href="/register">{isArabic ? "التسجيل" : "Register"}</a>
            <a className="main-nav-link" href="/programs">{isArabic ? "دليل البيانات" : "Data directory"}</a>
            <button onClick={() => scrollTo("sources")}>{copy.navSources}</button>
            <button className="language-switch" onClick={() => setLanguageAndRemember(isArabic ? "en" : "ar")}>{copy.switch}</button>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero-section page-container">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow"><span className="live-dot" /> {copy.eyebrow}</div>
            <h1>{copy.title}<br /><em>{copy.titleAccent}</em></h1>
            <p>{copy.heroBody}</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => scrollTo("learning-path")}>{copy.startLearning} <ArrowDown size={16} /></button>
              <button className="button button-secondary" onClick={() => scrollTo("programs")}>{copy.browsePrograms} <ArrowUpRight size={16} /></button>
              <a className="button button-secondary" href="/register">{isArabic ? "سجّل الآن" : "Register now"} <ArrowUpRight size={16} /></a>
            </div>
            <div className="hero-stats">
              <div><strong>{programs.length}</strong><span>{copy.activePrograms}</span></div>
              <div><strong>{learningPhases.length}</strong><span>{copy.learningStages}</span></div>
              <div><strong>132+</strong><span>{copy.referenceLibrary}</span></div>
            </div>
          </div>
          <div className="hero-panel">
            <div className="panel-topline"><span>{isArabic ? "مؤشر التقدم" : "Learning progress"}</span><span className="panel-tag"><CircleCheck size={14} /> {isArabic ? "محفوظ محليًا" : "Saved locally"}</span></div>
            <div className="progress-visual" style={{ "--progress": `${progress * 3.6}deg` } as CSSProperties}><div><strong>{progress}%</strong><span>{isArabic ? "مكتمل" : "complete"}</span></div></div>
            <div className="panel-copy"><span className="panel-number">{String(completed.length).padStart(2, "0")}</span><p>{isArabic ? `من ${learningItems.length} مخرجًا عمليًا في المسار` : `of ${learningItems.length} practical outcomes in the path`}</p></div>
            <div className="panel-rule" />
            <p className="panel-note">{isArabic ? "لا تحتاج إلى حساب. تقدمك محفوظ على هذا الجهاز، ويمكنك الرجوع إلى أي مرحلة عندما تتغير الأدلة." : "No account needed. Your progress stays on this device, and you can revisit any stage when the evidence changes."}</p>
            <button className="panel-link" onClick={() => scrollTo("learning-path")}>{isArabic ? "تابع من حيث توقفت" : "Continue where you left off"} <ArrowUpRight size={16} /></button>
          </div>
        </section>

        <section id="learning-path" className="learning-section section-container">
          <SectionHeading eyebrow={copy.learningEyebrow} title={copy.learningTitle} body={copy.learningBody} action={<div className="progress-label"><span>{progress}%</span><small>{isArabic ? "منجز" : "complete"}</small></div>} />
          <div className="phase-tabs" role="tablist" aria-label={copy.learningTitle}>
            <button className={selectedPhase === "all" ? "phase-tab active" : "phase-tab"} onClick={() => setSelectedPhase("all")}><span>00</span><strong>{copy.allStages}</strong></button>
            {learningPhases.map((phase) => <button key={phase.id} className={`phase-tab ${phase.color} ${selectedPhase === phase.id ? "active" : ""}`} onClick={() => setSelectedPhase(phase.id)}><span>{phase.number}</span><strong>{isArabic ? phase.labelAr : phase.label}</strong></button>)}
          </div>
          <div className="path-context">
            <div><span className="eyebrow">{selectedPhase === "all" ? (isArabic ? "ابدأ هنا" : "Start here") : isArabic ? activePhase.labelAr : activePhase.label}</span><h3>{selectedPhase === "all" ? (isArabic ? "رحلة المؤسس، خطوة قابلة للتنفيذ" : "The founder journey, made executable") : isArabic ? activePhase.titleAr : activePhase.title}</h3><p>{selectedPhase === "all" ? (isArabic ? "اربط كل درس بإجراء ومخرج ومقياس. لا تنتقل إلى الخطوة التالية قبل أن تملك دليلًا من الخطوة الحالية." : "Connect every lesson to an action, deliverable, and measure. Do not rush forward without evidence from the current step.") : isArabic ? activePhase.summaryAr : activePhase.summary}</p></div>
            <div className={`outcome-note ${activePhase.color}`}><span>{isArabic ? "نتيجة المرحلة" : "Stage outcome"}</span><strong>{selectedPhase === "all" ? (isArabic ? "نظام تشغيل جاهز للتعلم والتمويل" : "A learning and funding-ready operating system") : isArabic ? activePhase.outcomeAr : activePhase.outcome}</strong></div>
          </div>
          <div className="table-toolbar">
            <label className="search-field"><Search size={17} /><input value={learningQuery} onChange={(event) => setLearningQuery(event.target.value)} placeholder={copy.searchLearning} /></label>
            <div className="filter-pills"><button className={learningStatus === "all" ? "active" : ""} onClick={() => setLearningStatus("all")}>{copy.allStages}</button><button className={learningStatus === "open" ? "active" : ""} onClick={() => setLearningStatus("open")}>{copy.openWork}</button><button className={learningStatus === "done" ? "active" : ""} onClick={() => setLearningStatus("done")}>{copy.doneWork}</button></div>
          </div>
          <div className="learning-grid">
            {phaseItems.map((item) => {
              const phase = learningPhases.find((candidate) => candidate.id === item.phase) || learningPhases[0];
              const done = completed.includes(item.id);
              return <article key={item.id} className={`learning-card ${done ? "is-done" : ""}`}>
                <div className="learning-card-top"><button className="task-check" onClick={() => toggleComplete(item.id)} aria-label={done ? copy.markOpen : copy.markDone}>{done ? <Check size={17} /> : item.id.replace("w", "")}</button><span className={`phase-chip ${phase.color}`}>{phase.number} · {isArabic ? phase.labelAr : phase.label}</span>{done ? <span className="done-chip"><Check size={12} /> {copy.doneWork}</span> : null}</div>
                <h4>{isArabic ? item.outcomeAr : item.outcome}</h4>
                <p className="card-action">{isArabic ? item.actionAr : item.action}</p>
                <div className="card-details"><div><span>{copy.deliverable}</span><strong>{isArabic ? item.deliverableAr : item.deliverable}</strong></div><div><span>{copy.measure}</span><strong>{isArabic ? item.metricAr : item.metric}</strong></div></div>
                <div className="card-references"><span>{copy.references}</span><div>{item.references.map((reference) => <a key={reference.path} href={referenceUrl(reference.path)} target="_blank" rel="noreferrer">{reference.label}<ExternalLink size={12} /></a>)}</div></div>
              </article>;
            })}
          </div>
          {phaseItems.length === 0 ? <div className="empty-state"><ListChecks size={27} /><strong>{copy.noLearning}</strong><button onClick={() => { setLearningQuery(""); setLearningStatus("all"); setSelectedPhase("all"); }}>{copy.reset}</button></div> : null}
        </section>

        <section id="programs" className="programs-section">
          <div className="section-container">
            <SectionHeading eyebrow={copy.programsEyebrow} title={copy.programsTitle} body={copy.programsBody} action={<div className="verified-stamp"><ShieldCheck size={18} /><span>{copy.official}<small> · 2026–2027</small></span></div>} />
            <div className="source-note"><ShieldCheck size={16} /><span>{copy.sourceNote}</span><span className="source-date">{copy.verifiedOn}: 12 Oct 2026</span></div>
            <div className="program-toolbar">
              <label className="search-field wide"><Search size={17} /><input value={programQuery} onChange={(event) => setProgramQuery(event.target.value)} placeholder={copy.searchPrograms} /></label>
              <label className="select-field"><Filter size={15} /><select value={programCategory} onChange={(event) => setProgramCategory(event.target.value)}><option value="All">{copy.allCategories}</option>{categoryOptions.filter((value) => value !== "All").map((value) => <option key={value} value={value}>{isArabic ? categoryArabic[value] || value : value}</option>)}</select><ChevronDown size={15} /></label>
              <label className="select-field"><Globe2 size={15} /><select value={programRegion} onChange={(event) => setProgramRegion(event.target.value)}><option value="All">{copy.allRegions}</option>{regionOptions.filter((value) => value !== "All").map((value) => <option key={value} value={value}>{value}</option>)}</select><ChevronDown size={15} /></label>
              <label className="select-field"><Clock3 size={15} /><select value={programStatus} onChange={(event) => setProgramStatus(event.target.value as "all" | ProgramStatus)}><option value="all">{copy.allStatuses}</option><option value="rolling">{isArabic ? statusArabic.rolling : "Rolling"}</option><option value="opening">{isArabic ? statusArabic.opening : "Opening soon"}</option><option value="open">{isArabic ? statusArabic.open : "Open"}</option></select><ChevronDown size={15} /></label>
            </div>
            <div className="results-bar"><span>{copy.showing} <strong>{filteredPrograms.length}</strong> {copy.of} {programs.length} {isArabic ? "برنامج" : "programs"}</span><span className="results-hint"><Sparkles size={14} /> {isArabic ? "كل صف مرتبط بالمصدر الرسمي" : "Every row links to an official source"}</span></div>
            <div className="program-table-wrap"><table className="program-table"><thead><tr><th>{copy.program}</th><th>{copy.category}</th><th>{copy.region}</th><th>{copy.benefit}</th><th>{copy.eligibility}</th><th>{copy.status}</th><th /></tr></thead><tbody>{filteredPrograms.map((program) => <tr key={program.id} onClick={() => setSelectedProgram(program)}><td><div className="program-name"><ProviderIcon program={program} /><span><strong>{program.name}</strong><small>{program.provider}</small></span></div></td><td><span className="category-pill">{isArabic ? categoryArabic[program.primaryCategory] || program.primaryCategory : program.primaryCategory}</span></td><td><span className="region-text"><Globe2 size={13} /> {program.region}</span></td><td><p className="table-short">{program.short}</p></td><td><p className="table-eligibility">{program.eligibility}</p></td><td><span className={`status-pill ${program.statusKey}`}>{program.statusKey === "rolling" ? <Clock3 size={13} /> : <CircleCheck size={13} />}{isArabic ? statusArabic[program.statusKey] : program.status.replace("🔄 ", "").replace("⏳ ", "").replace("❌ ", "")}</span></td><td><button className="row-open" aria-label={`${copy.details}: ${program.name}`}><ArrowUpRight size={16} /></button></td></tr>)}</tbody></table></div>
            {filteredPrograms.length === 0 ? <div className="empty-state program-empty"><Search size={27} /><strong>{copy.noResults}</strong><button onClick={() => { setProgramQuery(""); setProgramCategory("All"); setProgramRegion("All"); setProgramStatus("all"); }}>{copy.reset}</button></div> : null}
            <div className="program-mobile-list">{filteredPrograms.map((program) => <button className="program-mobile-card" key={program.id} onClick={() => setSelectedProgram(program)}><div className="program-mobile-top"><ProviderIcon program={program} /><span><strong>{program.name}</strong><small>{program.provider}</small></span><ArrowUpRight size={16} /></div><p>{program.short}</p><div><span className="category-pill">{isArabic ? categoryArabic[program.primaryCategory] || program.primaryCategory : program.primaryCategory}</span><span className="status-pill rolling">{isArabic ? statusArabic[program.statusKey] : program.status.replace("🔄 ", "")}</span></div></button>)}</div>
          </div>
        </section>

        <section id="sources" className="sources-section section-container">
          <div className="sources-copy"><span className="eyebrow">{copy.sourcesEyebrow}</span><h2>{copy.sourcesTitle}</h2><p>{copy.sourcesBody}</p><div className="source-links"><a href={sourceFunding} target="_blank" rel="noreferrer"><span className="source-icon"><BookOpen size={17} /></span><span><strong>{copy.openFunding}</strong><small>Startup-Funding-2025</small></span><ArrowUpRight size={16} /></a><a href={sourcePrograms} target="_blank" rel="noreferrer"><span className="source-icon coral"><Layers3 size={17} /></span><span><strong>{copy.openPrograms}</strong><small>startup-programs-2026-2027</small></span><ArrowUpRight size={16} /></a></div></div>
          <div className="maintenance-card"><div className="maintenance-icon"><Award size={20} /></div><span className="eyebrow">{copy.updateNote}</span><h3>{copy.updateBody}</h3><a href={`${sourcePrograms}#maintenance`} target="_blank" rel="noreferrer">{copy.readme} <ArrowUpRight size={15} /></a></div>
        </section>
      </main>

      <footer className="site-footer"><div className="footer-brand"><span className="brand-mark small"><Sparkles size={14} /></span><span><strong>Startup Academy</strong><small>{copy.footer}</small></span></div><div className="footer-meta"><span><ShieldCheck size={14} /> {isArabic ? "مصادر قابلة للمراجعة" : "Reviewable sources"}</span><span><Globe2 size={14} /> {isArabic ? "عربي / English" : "Arabic / English"}</span></div></footer>

      {selectedProgram ? <div className="modal-backdrop" role="presentation" onClick={() => setSelectedProgram(null)}><aside className="program-modal" role="dialog" aria-modal="true" aria-label={selectedProgram.name} onClick={(event) => event.stopPropagation()}><div className="modal-header"><div className="program-name"><ProviderIcon program={selectedProgram} large /><span><strong>{selectedProgram.name}</strong><small>{selectedProgram.provider}</small></span></div><button className="modal-close" onClick={() => setSelectedProgram(null)} aria-label={copy.close}><X size={19} /></button></div><div className="modal-badges"><span className="category-pill">{isArabic ? categoryArabic[selectedProgram.primaryCategory] || selectedProgram.primaryCategory : selectedProgram.primaryCategory}</span><span className={`status-pill ${selectedProgram.statusKey}`}>{isArabic ? statusArabic[selectedProgram.statusKey] : selectedProgram.status.replace("🔄 ", "").replace("⏳ ", "")}</span><span className="verified-inline"><ShieldCheck size={13} /> {copy.official}</span></div><p className="modal-lead">{selectedProgram.short}</p><div className="modal-grid"><div><span>{copy.eligibility}</span><p>{selectedProgram.eligibility}</p></div><div><span>{copy.lastVerified}</span><p>{selectedProgram.lastVerified}</p></div></div><div className="modal-section"><span>{copy.applicationSteps}</span><SplitList value={selectedProgram.steps} /></div><div className="modal-section"><span>{copy.benefit}</span><SplitList value={selectedProgram.benefits} /></div><div className="modal-footer"><a className="button button-primary" href={selectedProgram.link} target="_blank" rel="noreferrer">{copy.apply} <ExternalLink size={15} /></a><span>{copy.sourceFile}: {selectedProgram.categorySource}</span></div></aside></div> : null}
    </div>
  );
}
