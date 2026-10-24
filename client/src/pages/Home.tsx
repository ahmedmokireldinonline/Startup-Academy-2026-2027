import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  Cloud,
  ExternalLink,
  Globe2,
  GraduationCap,
  Handshake,
  Building2,
  Bot,
  Layers3,
  Menu,
  Network,
  Rocket,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { programs, type Program } from "@/data/programs";
import pitchDecks from "@/data/pitchDecks.json";
import { learningItems, learningPhases } from "@/data/learningPath";

const sourcePrograms = "https://github.com/ahmedmokireldinonline/Startup-Academy-2026-2027/tree/main/data";
const sourceFunding = "https://github.com/ahmedmokireldinonline/Startup-Academy-2026-2027/tree/main/Business%20Models%20-%20Super%20Guides%20Bundle";

const categoryArabic: Record<string, string> = {
  "Cloud & infrastructure credits": "أرصدة السحابة والبنية التحتية",
  "Grants & funding": "منح وتمويل",
  "Accelerators & ecosystem": "مسرّعات ومنظومة ريادة الأعمال",
  "SaaS discounts & perks": "خصومات ومزايا SaaS",
};

function providerIconUrl(link: string) {
  try {
    return `https://www.google.com/s2/favicons?domain=${new URL(link).hostname}&sz=64`;
  } catch {
    return "";
  }
}

function initials(value: string) {
  return value.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

function ProviderIcon({ program }: { program: Program }) {
  const [failed, setFailed] = useState(false);
  const fallback = initials(program.provider);
  return (
    <span className="provider-icon" aria-hidden="true">
      {!failed && providerIconUrl(program.link) ? <img src={providerIconUrl(program.link)} alt="" onError={() => setFailed(true)} /> : null}
      {failed || !providerIconUrl(program.link) ? <span>{fallback}</span> : null}
    </span>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<"ar" | "en">(() => {
    try { return (localStorage.getItem("startup-academy-language") as "ar" | "en") || "ar"; } catch { return "ar"; }
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const isArabic = language === "ar";
  const progress = (() => {
    try {
      const completed = JSON.parse(localStorage.getItem("startup-academy-progress") || "[]") as string[];
      return Math.round((completed.length / learningItems.length) * 100);
    } catch { return 0; }
  })();
  const categoryCounts = useMemo(() => Object.entries(programs.reduce<Record<string, number>>((acc, program) => {
    acc[program.primaryCategory] = (acc[program.primaryCategory] || 0) + 1;
    return acc;
  }, {})), []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const setLanguageAndRemember = (next: "ar" | "en") => {
    setLanguage(next);
    localStorage.setItem("startup-academy-language", next);
  };

  const copy = isArabic ? {
    eyebrow: "منصة وصول للشركات الناشئة",
    title: "نوصلك إلى الفرصة التالية.",
    accent: "تعلّم، جهّز، قدّم.",
    body: "أكاديمية عملية تساعد شركتك على الوصول إلى المسرّعات، شبكات العلاقات، برامج التقديم، أرصدة الـ credits، والمنح — بخطوات واضحة وأدلة قابلة للمراجعة.",
    start: "ابدأ رحلة شركتك",
    opportunities: "استكشف كل الفرص",
    partners: "شركاء وفرص في الدليل",
    routesEyebrow: "مسارات الوصول",
    routesTitle: "من نساعدك على الوصول إليهم؟",
    routesBody: "لا نكتفي بعرض الروابط؛ نجهزك للمسار المناسب ونوضح الأهلية والخطوة التالية.",
    servicesEyebrow: "دعم النمو المؤسسي",
    servicesTitle: "نضع أساسًا تقنيًا يسرّع النمو.",
    servicesBody: "نساعد الشركات والمؤسسات التعليمية والشركات المتوسطة على بدء بنية Cloud مناسبة، وتأمين أرصدة الأتمتة ونماذج AI، وتحويل التجربة التقنية إلى قدرة تشغيلية قابلة للنمو.",
    servicesCloud: "بداية Cloud Infrastructure",
    servicesCloudBody: "تصميم الحسابات، البيئات، الأمن، المراقبة، وخطة تشغيل أولى بدون تعقيد زائد.",
    servicesAI: "Automation & AI Credits",
    servicesAIBody: "مطابقة البرامج وائتمانات النماذج والأتمتة مع حالات الاستخدام، خصوصًا في التعليم.",
    learningEyebrow: "المسار العملي",
    learningTitle: "سبع مراحل من الفكرة إلى التقديم",
    learningBody: "كل مرحلة تنتج دليلًا عمليًا يساعدك على التقدم إلى البرنامج الأنسب.",
    directoryEyebrow: "دليل الفرص",
    directoryTitle: "كل البرامج المتاحة، في مكان واحد",
    directoryBody: "برامج موثقة من مصادر رسمية: credits، grants، مسرّعات، خصومات وشبكات دعم.",
    viewAll: "عرض الدليل الكامل",
    register: "سجّل بياناتك",
    sources: "المصادر والمنهجية",
    sourceBody: "نحدّث البرامج من مصادرها الرسمية ونحتفظ بتاريخ التحقق والرابط الأصلي.",
    footer: "Startup Academy 2026–2027 · من المعرفة إلى الوصول",
    language: "English",
  } : {
    eyebrow: "A founder access platform",
    title: "We connect you to the next opportunity.",
    accent: "Learn. Prepare. Apply.",
    body: "A practical academy helping startups reach accelerators, founder networks, application programs, cloud credits, and grants — with clear steps and reviewable evidence.",
    start: "Start your journey",
    opportunities: "Explore all opportunities",
    partners: "Partners & opportunities",
    routesEyebrow: "Access routes",
    routesTitle: "Who can we help you reach?",
    routesBody: "We do more than list links: we prepare the right path and clarify eligibility and next action.",
    servicesEyebrow: "Institutional growth support",
    servicesTitle: "Build the technical foundation for growth.",
    servicesBody: "We help companies, educational institutions, and mid-market teams start with the right cloud infrastructure and secure automation and AI model credits.",
    servicesCloud: "Cloud infrastructure start",
    servicesCloudBody: "Accounts, environments, security, observability, and an operating baseline without unnecessary complexity.",
    servicesAI: "Automation & AI credits",
    servicesAIBody: "Match programs and model credits to real use cases, with a special focus on education.",
    learningEyebrow: "Practical path",
    learningTitle: "Seven stages from idea to application",
    learningBody: "Every stage creates evidence that helps you move toward the right program.",
    directoryEyebrow: "Opportunity directory",
    directoryTitle: "Every available program, in one place",
    directoryBody: "Verified programs from official sources: credits, grants, accelerators, discounts, and support networks.",
    viewAll: "Open full directory",
    register: "Register your details",
    sources: "Sources & methodology",
    sourceBody: "We update programs from official sources and keep the verification date and original link.",
    footer: "Startup Academy 2026–2027 · From knowledge to access",
    language: "العربية",
  };

  const routes = isArabic ? [
    { icon: Rocket, title: "المسرّعات", body: "جهّز ملفك وPitch Deck وتقدم إلى المسرّعات المناسبة لمرحلتك." },
    { icon: Network, title: "شبكات العلاقات", body: "اكتشف الشركاء والمجتمعات والمستثمرين ومسارات التعارف الدافئ." },
    { icon: Target, title: "التقديم الذكي", body: "طابق أهليتك مع المتطلبات ورتّب أولويات التقديم بدل التقديم العشوائي." },
    { icon: Cloud, title: "Credits & Grants", body: "الوصول إلى أرصدة السحابة، منح التمويل، والامتيازات المنشورة رسميًا." },
  ] : [
    { icon: Rocket, title: "Accelerators", body: "Prepare your profile and pitch deck for stage-fit accelerator applications." },
    { icon: Network, title: "Founder networks", body: "Find communities, partners, investors, and warm-introduction paths." },
    { icon: Target, title: "Smarter applications", body: "Match eligibility and prioritize applications instead of applying blindly." },
    { icon: Cloud, title: "Credits & grants", body: "Reach verified cloud credits, funding grants, and published startup perks." },
  ];

  return (
    <div className={`academy-shell compact-home ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      <header className="site-header">
        <div className="header-inner">
          <button className="brand" onClick={() => scrollTo("top")} aria-label="Startup Academy home"><span className="brand-mark"><Sparkles size={16} /></span><span><strong>Startup Academy</strong><small>2026—2027</small></span></button>
          <button className="mobile-menu" onClick={() => setMobileOpen((value) => !value)} aria-label="Open menu"><Menu size={21} /></button>
          <nav className={`main-nav ${mobileOpen ? "is-open" : ""}`}>
            <button onClick={() => scrollTo("journey")}>{isArabic ? "المسار" : "Journey"}</button>
            <button onClick={() => scrollTo("opportunities")}>{isArabic ? "الفرص" : "Opportunities"}</button>
            <a className="main-nav-link" href="/programs">{isArabic ? "كل البرامج" : "All programs"}</a>
            <a className="main-nav-link" href="/register">{isArabic ? "التسجيل" : "Register"}</a>
            <a className="main-nav-link nav-investors" href="/investors">{isArabic ? "دليل المستثمرين" : "Investor desk"}</a>
            <button className="language-switch" onClick={() => setLanguageAndRemember(isArabic ? "en" : "ar")}>{copy.language}</button>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="compact-hero page-container">
          <div className="compact-hero-copy">
            <span className="eyebrow hero-eyebrow"><span className="live-dot" /> {copy.eyebrow}</span>
            <h1>{copy.title}<br /><em>{copy.accent}</em></h1>
            <p>{copy.body}</p>
            <div className="hero-actions"><button className="button button-primary" onClick={() => scrollTo("journey")}>{copy.start} <ArrowLeft size={16} /></button><a className="button button-secondary" href="/programs">{copy.opportunities} <ArrowUpRight size={16} /></a></div>
            <div className="compact-proof"><span><strong>{programs.length}</strong> {isArabic ? "برنامج" : "programs"}</span><span><strong>{learningPhases.length}</strong> {isArabic ? "مراحل" : "stages"}</span><span><strong>132+</strong> {isArabic ? "مورد" : "resources"}</span></div>
          </div>
          <div className="compact-hero-visual"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-visual-core"><GraduationCap size={32} /><strong>{progress}%</strong><span>{isArabic ? "جاهزية المسار" : "path readiness"}</span></div><div className="hero-visual-badge badge-top"><CheckCircle2 size={15} /> {isArabic ? "مصدر رسمي" : "Official source"}</div><div className="hero-visual-badge badge-bottom"><Trophy size={15} /> {isArabic ? "فرصة مناسبة" : "Fit opportunity"}</div></div>
        </section>

        <section className="program-marquee" aria-label={copy.partners}>
          <div className="marquee-label"><Handshake size={16} /> {copy.partners}</div>
          <div className="marquee-window"><div className="program-marquee-track">{[...programs, ...programs].map((program, index) => <span className="marquee-program" key={`${program.id}-${index}`}><ProviderIcon program={program} /><b>{program.provider}</b><small>{program.name}</small></span>)}</div></div>
        </section>

        <section id="opportunities" className="routes-section section-container">
          <div className="section-heading compact-heading"><div><span className="eyebrow">{copy.routesEyebrow}</span><h2>{copy.routesTitle}</h2><p>{copy.routesBody}</p></div><span className="route-count">{programs.length}<small>{isArabic ? "فرصة موثقة" : "verified opportunities"}</small></span></div>
          <div className="routes-grid">{routes.map(({ icon: Icon, title, body }) => <article className="route-item" key={title}><span className="route-icon"><Icon size={23} /></span><div><h3>{title}</h3><p>{body}</p></div><ChevronLeft size={18} /></article>)}</div>
        </section>

        <section className="services-section section-container"><div className="services-intro"><span className="eyebrow"><Building2 size={15} /> {copy.servicesEyebrow}</span><h2>{copy.servicesTitle}</h2><p>{copy.servicesBody}</p><a className="button button-primary" href="/register">{copy.register} <ArrowUpRight size={16} /></a></div><div className="services-grid"><article className="service-card"><span className="service-icon"><Cloud size={22} /></span><div><h3>{copy.servicesCloud}</h3><p>{copy.servicesCloudBody}</p></div><span className="service-number">01</span></article><article className="service-card"><span className="service-icon violet"><Bot size={22} /></span><div><h3>{copy.servicesAI}</h3><p>{copy.servicesAIBody}</p></div><span className="service-number">02</span></article></div></section>

        <section id="journey" className="journey-section">
          <div className="section-container"><div className="section-heading compact-heading"><div><span className="eyebrow">{copy.learningEyebrow}</span><h2>{copy.learningTitle}</h2><p>{copy.learningBody}</p></div><a className="text-link" href="/register">{copy.register} <ArrowUpRight size={15} /></a></div><div className="journey-strip">{learningPhases.map((phase, index) => <div className={`journey-step ${phase.color}`} key={phase.id}><span>{String(index + 1).padStart(2, "0")}</span><strong>{isArabic ? phase.labelAr : phase.label}</strong><small>{isArabic ? phase.outcomeAr : phase.outcome}</small></div>)}</div></div>
        </section>

        <section id="programs" className="spotlight-section section-container">
          <div className="section-heading compact-heading"><div><span className="eyebrow">{copy.directoryEyebrow}</span><h2>{copy.directoryTitle}</h2><p>{copy.directoryBody}</p></div><a className="button button-primary" href="/programs">{copy.viewAll} <ArrowUpRight size={16} /></a></div>
          <div className="category-summary">{categoryCounts.map(([category, count]) => <div className="category-summary-item" key={category}><span>{isArabic ? categoryArabic[category] || category : category}</span><strong>{count}</strong></div>)}</div>
          <div className="spotlight-grid">{programs.slice(0, 6).map((program) => <a className="spotlight-program" href={program.link} target="_blank" rel="noreferrer" key={program.id}><div className="spotlight-top"><ProviderIcon program={program} /><span><strong>{program.name}</strong><small>{program.provider} · {program.region}</small></span><ExternalLink size={15} /></div><p>{program.short}</p><span className="spotlight-status">{program.status.replace("🔄 ", "").replace("⏳ ", "").replace("❌ ", "")}</span></a>)}</div>
        </section>

        <section className="program-ticker" aria-label={isArabic ? "كل البرامج" : "All programs"}>
          <div className="ticker-track">{[...programs, ...programs].map((program, index) => <a href={program.link} target="_blank" rel="noreferrer" key={`${program.id}-${index}`}><ProviderIcon program={program} /><span>{program.provider}</span><small>{program.primaryCategory}</small></a>)}</div>
        </section>
        <section id="resources" className="resources-section section-container">
          <div className="resources-intro"><span className="eyebrow">{isArabic ? "عدة التقديم" : "Fundraising toolkit"}</span><h2>{isArabic ? "Pitch Deck قوي. Template واضح. تقديم أكثر احترافية." : "A sharper pitch deck. A clearer template. A stronger application."}</h2><p>{isArabic ? "لا تبدأ التقديم من صفحة بيضاء. استخدم نماذج Pitch Deck حقيقية لشركات أصبحت مليارية، وقوالب SaaS تساعدك على ترتيب القصة، الأرقام، ونظام المتابعة قبل التواصل مع المستثمرين." : "Do not start from a blank page. Study real decks from billion-dollar companies and use SaaS templates to structure the story, metrics, and follow-up system before reaching investors."}</p><div className="resource-actions"><a className="button button-primary" href="/investors">{isArabic ? "ابحث عن المستثمرين" : "Find investors"} <ArrowUpRight size={15} /></a><a className="button button-secondary" href="https://github.com/ahmedmokireldinonline/startup-programs-2026-2027/tree/main/SAAS%20Toolkit" target="_blank" rel="noreferrer">{isArabic ? "افتح كل الـ Toolkit" : "Open full toolkit"} <ExternalLink size={15} /></a></div></div>
          <div className="deck-rail"><div className="deck-rail-head"><span>{isArabic ? "نماذج Pitch Deck" : "Pitch Deck references"}</span><small>46 startup decks</small></div><div className="deck-grid">{pitchDecks.slice(0, 8).map((deck) => <a href={deck.url} target="_blank" rel="noreferrer" key={deck.name}><strong>{deck.name}</strong><span>{deck.valuation}</span><ArrowUpRight size={14} /></a>)}</div></div>
        </section>
        <section id="about" className="about-section section-container"><div className="about-mark"><Sparkles size={22} /></div><div><span className="eyebrow">{isArabic ? "عن المدرب" : "About the mentor"}</span><h2>{isArabic ? "أساعد الشركات الناشئة على تحويل الفكرة إلى نظام قابل للتمويل." : "I help startups turn a promising idea into a fundable operating system."}</h2><p>{isArabic ? "أنا أحمد، مدرب ومستشار أعمل على Flow Automation Marketing وGrowth Marketing Automation. أساعد المؤسسين على بناء الأنظمة والـ Solutions، تجهيز Pitch Deck وملفات التقديم، وفهم أهم خطوات الـ Funding والتمويلات بطريقة عملية قابلة للتنفيذ." : "I am Ahmed, a trainer and consultant focused on Flow Automation Marketing and Growth Marketing Automation. I help founders build systems and solutions, prepare pitch decks and applications, and navigate the practical steps behind funding."}</p></div><div className="about-points"><span>01 · Funding readiness</span><span>02 · Systems & solutions</span><span>03 · Growth automation</span></div></section>
        <section className="sources-section compact-sources section-container"><div className="sources-copy"><span className="eyebrow"><Layers3 size={14} /> {copy.sources}</span><h2>{isArabic ? "كل توصية تبدأ من مصدر يمكن مراجعته." : "Every recommendation starts with a reviewable source."}</h2><p>{copy.sourceBody}</p></div><div className="source-links"><a href={sourceFunding} target="_blank" rel="noreferrer"><span className="source-icon"><BookOpen size={17} /></span><span><strong>{isArabic ? "مكتبة التمويل والأدوات" : "Funding & tools library"}</strong><small>Startup Academy / Founder resources</small></span><ArrowUpRight size={16} /></a><a href={sourcePrograms} target="_blank" rel="noreferrer"><span className="source-icon coral"><Award size={17} /></span><span><strong>{isArabic ? "دليل البرامج والبيانات" : "Programs & data directory"}</strong><small>Startup Academy / Programs & data</small></span><ArrowUpRight size={16} /></a></div></section>
      </main>
      <footer className="site-footer"><div className="footer-brand"><span className="brand-mark small"><Sparkles size={14} /></span><span><strong>Startup Academy</strong><small>{copy.footer}</small></span></div><div className="footer-meta"><span><CheckCircle2 size={14} /> {isArabic ? "مصادر رسمية" : "Official sources"}</span><span><Globe2 size={14} /> {isArabic ? "عربي / English" : "Arabic / English"}</span></div></footer>
    </div>
  );
}
