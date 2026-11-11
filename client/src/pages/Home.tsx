import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  BadgeDollarSign,
  BookOpen,
  CheckCircle2,
	  ChevronLeft,
	  Cloud,
	  Database,
	  ExternalLink,
  Globe2,
  GraduationCap,
  Handshake,
  Layers3,
  LockKeyhole,
  Menu,
  Network,
  Rocket,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import type { Program } from "@/data/programs";
import type { BookCatalog, AcademyBook } from "@/data/books";
import type { DatabaseSource } from "@/data/databases";
import { learningItems, learningPhases } from "@/data/learningPath";
import { academyOffers } from "@/data/offers";



const testimonials = [
  { quoteAr: "أصبح لدينا مسار واضح للتقديم بدل التنقل بين عشرات البرامج، واستطعنا تجهيز ملف العرض والمتطلبات في وقت أقصر.", quoteEn: "We moved from browsing dozens of programs to a clear application path, with our pitch and requirements prepared much faster.", nameAr: "مؤسس شركة SaaS", nameEn: "SaaS founder", typeAr: "شركة برمجيات ناشئة", typeEn: "Early-stage software company", country: "مصر", countryEn: "Egypt", flag: "🇪🇬", avatar: "/customer-avatars/avatar-egypt.jpg" },
  { quoteAr: "أكثر ما ساعدنا هو تحويل البيانات إلى خطوات مبيعات ومتابعة يومية، وليس مجرد قائمة أسماء.", quoteEn: "What helped most was turning research into daily sales actions and follow-up—not just another list of names.", nameAr: "قائد نمو", nameEn: "Growth lead", typeAr: "منتج B2B", typeEn: "B2B product", country: "الإمارات", countryEn: "United Arab Emirates", flag: "🇦🇪", avatar: "/customer-avatars/avatar-uae.jpg" },
  { quoteAr: "المراجعة العملية لملف التقديم أوضحت لنا ما ينقصنا وما يجب أن نثبته قبل التواصل مع أي برنامج.", quoteEn: "The practical application review showed us what was missing and what to prove before approaching any program.", nameAr: "مدير شركة ناشئة", nameEn: "Startup operator", typeAr: "فريق في مرحلة مبكرة", typeEn: "Early-stage team", country: "أوكرانيا", countryEn: "Ukraine", flag: "🇺🇦", avatar: "/customer-avatars/avatar-ukraine.jpg" },
  { quoteAr: "الباقة أعطتنا نظامًا قابلًا للتنفيذ: قوالب، أولويات، ومسؤوليات واضحة داخل الفريق.", quoteEn: "The package gave us an executable system: templates, priorities, and clear ownership across the team.", nameAr: "مسؤول عمليات", nameEn: "Operations lead", typeAr: "شركة خدمات رقمية", typeEn: "Digital services company", country: "كندا", countryEn: "Canada", flag: "🇨🇦", avatar: "/customer-avatars/avatar-canada.jpg" },
];

const categoryArabic: Record<string, string> = {
  "Cloud & infrastructure credits": "أرصدة السحابة والبنية التحتية",
  "Grants & funding": "منح وتمويل",
  "Accelerators & ecosystem": "مسرّعات ومنظومة ريادة الأعمال",
  "SaaS discounts & perks": "خصومات ومزايا SaaS",
};

const providerDomains: Record<string, string> = {
  "Amazon Web Services": "aws.amazon.com", "Alibaba Cloud": "alibabacloud.com", "Ukrainian Startup Fund": "usf.com.ua", "Bpifrance": "bpifrance.com", "ClickUp": "clickup.com", "Anthropic": "anthropic.com", "SendPulse": "sendpulse.com", "Microsoft": "microsoft.com", "Google Cloud": "cloud.google.com", "GitHub": "github.com", "NVIDIA": "nvidia.com", "Tencent Cloud": "intl.cloud.tencent.com", "Huawei Cloud": "huaweicloud.com", "DigitalOcean": "digitalocean.com", "Cloudflare": "cloudflare.com", "MongoDB": "mongodb.com", "HubSpot": "hubspot.com", "Enterprise Singapore": "enterprisesg.gov.sg", "CORFO / Start-Up Chile": "corfo.cl", "OVHcloud": "ovhcloud.com", "Akamai": "akamai.com", "DPIIT / Startup India": "startupindia.gov.in", "Government of India / DPIIT / NCGTC": "startupindia.gov.in", "Government of Ontario / MaRS": "ontario.ca", "Trade Commissioner Service, Government of Canada": "international.gc.ca", "Australian Government / DISR / ATO": "business.gov.au", "BIC Innovation / UK Government business finance directory": "gov.uk", "NEDO": "nedo.go.jp", "Vercel": "vercel.com", "Miro": "miro.com", "ElevenLabs": "elevenlabs.io", "Airtable": "airtable.com", "Deepgram": "deepgram.com", "Vultr": "vultr.com", "Perplexity": "perplexity.ai"
};

const providerIconPaths: Record<string, string> = {
  "Amazon Web Services": "/provider-logos/amazonwebservices.svg", "Alibaba Cloud": "/provider-logos/alibabacloud.svg", "Ukrainian Startup Fund": "/provider-logos/usf.svg", "Bpifrance": "/provider-logos/bpifrance.ico", "ClickUp": "/provider-logos/clickup.svg", "Anthropic": "/provider-logos/anthropic.svg", "SendPulse": "/provider-logos/sendpulse.ico", "Microsoft": "/provider-logos/microsoft.svg", "Google Cloud": "/provider-logos/googlecloud.svg", "GitHub": "/provider-logos/github.svg", "NVIDIA": "/provider-logos/nvidia.svg", "Tencent Cloud": "/provider-logos/tencentcloud.ico", "Huawei Cloud": "/provider-logos/huaweicloud.ico", "DigitalOcean": "/provider-logos/digitalocean.svg", "Cloudflare": "/provider-logos/cloudflare.svg", "MongoDB": "/provider-logos/mongodb.svg", "HubSpot": "/provider-logos/hubspot.svg", "Enterprise Singapore": "/provider-logos/enterprisesg.ico", "CORFO / Start-Up Chile": "/provider-logos/corfo.png", "OVHcloud": "/provider-logos/ovh.svg", "Akamai": "/provider-logos/akamai.svg", "DPIIT / Startup India": "/provider-logos/dpiit.png", "Government of India / DPIIT / NCGTC": "/provider-logos/dpiit.png", "Government of Ontario / MaRS": "/provider-logos/ontario.svg", "Trade Commissioner Service, Government of Canada": "/provider-logos/canada.ico", "Australian Government / DISR / ATO": "/provider-logos/australia.ico", "BIC Innovation / UK Government business finance directory": "/provider-logos/govuk.ico", "NEDO": "/provider-logos/nedo.svg", "Vercel": "/provider-logos/vercel.svg", "Miro": "/provider-logos/miro.svg", "ElevenLabs": "/provider-logos/elevenlabs.svg", "Airtable": "/provider-logos/airtable.svg", "Deepgram": "/provider-logos/deepgram.svg", "Vultr": "/provider-logos/vultr.svg", "Perplexity": "/provider-logos/perplexity.svg"
};

const credibilityLogos = [
  { name: "Amazon Web Services", short: "AWS" },
  { name: "Microsoft", short: "Microsoft" },
  { name: "Google Cloud", short: "Google Cloud" },
  { name: "GitHub", short: "GitHub" },
  { name: "NVIDIA", short: "NVIDIA" },
  { name: "Cloudflare", short: "Cloudflare" },
  { name: "MongoDB", short: "MongoDB" },
  { name: "HubSpot", short: "HubSpot" },
  { name: "Vercel", short: "Vercel" },
  { name: "Perplexity", short: "Perplexity" },
  { name: "ClickUp", short: "ClickUp" },
  { name: "Miro", short: "Miro" },
];

function providerIconUrl(provider: string) {
  try {
    if (providerIconPaths[provider]) return providerIconPaths[provider];
    const domain = providerDomains[provider];
    return domain ? `https://${domain}/favicon.ico` : "";
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
  const iconUrl = providerIconUrl(program.provider);
  return (
    <span className="provider-icon" aria-hidden="true">
      {!failed && iconUrl ? <img src={iconUrl} alt="" onError={() => setFailed(true)} /> : null}
      {failed || !iconUrl ? <span>{fallback}</span> : null}
    </span>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<"ar" | "en">(() => {
    try { return (localStorage.getItem("startup-academy-language") as "ar" | "en") || "ar"; } catch { return "ar"; }
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [bookCatalogs, setBookCatalogs] = useState<BookCatalog[]>([]);
  const [databaseSources, setDatabaseSources] = useState<DatabaseSource[]>([]);
  const [getBookDescription, setGetBookDescription] = useState<(book: AcademyBook, arabic: boolean) => string>(() => (book: AcademyBook) => book.importance);
  const isArabic = language === "ar";
  usePageMeta({ language, titleAr: "Startup Academy — التمويل والأنظمة والنمو", titleEn: "Startup Academy — Funding, systems & growth", descriptionAr: "برامج تمويل موثقة، تعلم عملي، دليل مستثمرين، مكتبة كتب، وأنظمة نمو للشركات الناشئة.", descriptionEn: "Verified startup funding programs, practical learning, investor research, books, and growth systems.", path: "/", type: "CollectionPage" });
  useEffect(() => {
    let active = true;
    Promise.all([import("@/data/programs"), import("@/data/books"), import("@/data/databases"), import("@/data/bookDescriptions")]).then(([programModule, bookModule, databaseModule, descriptionsModule]) => {
      if (!active) return;
      setPrograms(programModule.programs);
      setBookCatalogs(bookModule.bookCatalogs);
      setDatabaseSources(databaseModule.databaseSources);
      setGetBookDescription(() => descriptionsModule.getBookDescription);
    }).catch(() => undefined);
    return () => { active = false; };
  }, []);
  useEffect(() => {
    const tracks = Array.from(document.querySelectorAll<HTMLElement>(".program-marquee-track, .program-lane-track, .home-book-track, .home-data-marquee-track"));
    if (!tracks.length || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle("is-offscreen", !entry.isIntersecting)), { rootMargin: "120px 0px" });
    tracks.forEach((track) => observer.observe(track));
    return () => observer.disconnect();
  }, [programs.length, bookCatalogs.length, databaseSources.length]);
  const progress = (() => {
    try {
      const completed = JSON.parse(localStorage.getItem("startup-academy-progress") || "[]") as string[];
      return Math.round((completed.length / learningItems.length) * 100);
    } catch { return 0; }
  })();
  const categoryCounts = useMemo(() => Object.entries(programs.reduce<Record<string, number>>((acc, program) => {
    acc[program.primaryCategory] = (acc[program.primaryCategory] || 0) + 1;
    return acc;
  }, {})), [programs]);
  const resourceCount = programs.length + bookCatalogs.reduce((total, catalog) => total + catalog.books.length, 0) + databaseSources.length;

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
    learningEyebrow: "المسار العملي",
    learningTitle: "سبع مراحل من الفكرة إلى التقديم",
    learningBody: "كل مرحلة تنتج دليلًا عمليًا يساعدك على التقدم إلى البرنامج الأنسب.",
    directoryEyebrow: "دليل الفرص",
    directoryTitle: "كل البرامج المتاحة، في مكان واحد",
    directoryBody: "برامج موثقة من مصادر رسمية: أرصدة، منح، مسرّعات، خصومات وشبكات دعم.",
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
    { icon: Rocket, title: "المسرّعات", body: "جهّز ملفك وملف العرض وتقدّم إلى المسرّعات المناسبة لمرحلتك." },
    { icon: Network, title: "شبكات العلاقات", body: "اكتشف الشركاء والمجتمعات ومسارات التعارف الدافئ." },
    { icon: Target, title: "التقديم الذكي", body: "طابق أهليتك مع المتطلبات ورتّب أولويات التقديم بدل التقديم العشوائي." },
    { icon: Cloud, title: "Credits & Grants", body: "الوصول إلى أرصدة السحابة، منح التمويل، والامتيازات الرسمية." },
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
            <a className="main-nav-link" href="/investors">{isArabic ? "المستثمرون" : "Investors"}</a>
            <a className="main-nav-link" href="/books">{isArabic ? "مكتبة الكتب" : "Book library"}</a>
            <a className="main-nav-link product-nav-link" href="/financial-model">{isArabic ? "النموذج المالي" : "Financial model"}</a>
            <a className="main-nav-link" href="/databases">{isArabic ? "قواعد البيانات" : "Data catalog"}</a>
            <a className="main-nav-link" href="/dashboard">{isArabic ? "لوحة الحساب" : "Dashboard"}</a>
            <a className="main-nav-link" href="/register">{isArabic ? "التسجيل" : "Register"}</a>
            <a className="main-nav-link admin-nav-link" href="/admin/login"><LockKeyhole size={13} /> {isArabic ? "دخول الإدارة" : "Admin login"}</a>
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
            <div className="hero-actions"><button className="button button-primary" onClick={() => scrollTo("journey")}>{copy.start} <ArrowLeft size={16} /></button><a className="button button-secondary" href="/programs">{copy.opportunities} <ArrowUpRight size={16} /></a><a className="button button-secondary" href="/dashboard">{isArabic ? "الباقات والحجز" : "Plans & booking"} <ArrowUpRight size={16} /></a></div>
            <div className="compact-proof"><span><strong>{programs.length || "—"}</strong> {isArabic ? "برنامج" : "programs"}</span><span><strong>{learningPhases.length}</strong> {isArabic ? "مراحل" : "stages"}</span><span><strong>{resourceCount || "—"}</strong> {isArabic ? "مورد" : "resources"}</span></div>
          </div>
          <div className="compact-hero-visual"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-visual-core"><GraduationCap size={32} /><strong>{progress}%</strong><span>{isArabic ? "جاهزية المسار" : "path readiness"}</span></div><div className="hero-visual-badge badge-top"><CheckCircle2 size={15} /> {isArabic ? "مصدر رسمي" : "Official source"}</div><div className="hero-visual-badge badge-bottom"><Trophy size={15} /> {isArabic ? "فرصة مناسبة" : "Fit opportunity"}</div></div>
        </section>

        <section className="credibility-logos" aria-label={isArabic ? "مصادر وبرامج موثوقة" : "Trusted program sources"}>
          <div className="credibility-logos-inner">
            <div className="credibility-logos-heading"><span className="eyebrow">{isArabic ? "منظومة الوصول" : "Access ecosystem"}</span><strong>{isArabic ? "مصادر وبرامج موثوقة في الدليل" : "Trusted sources in our directory"}</strong><small>{isArabic ? "شعارات الجهات الظاهرة تمثل مصادر البرامج والخدمات التي نساعدك على الوصول إليها." : "Shown logos represent program and service sources we help founders access."}</small></div>
            <div className="credibility-logos-window"><div className="credibility-logos-track">{[...credibilityLogos, ...credibilityLogos].map((logo, index) => <span className="credibility-logo" key={`${logo.name}-${index}`}><span className="credibility-logo-mark"><img src={providerIconPaths[logo.name]} alt="" loading="lazy" decoding="async" /></span><span>{logo.short}</span></span>)}</div></div>
          </div>
        </section>

        <section className="program-marquee" aria-label={copy.partners}>
          <div className="marquee-label"><Handshake size={16} /> {copy.partners}</div>
          <div className="marquee-window">{programs.length ? <div className="program-marquee-track">{[...programs, ...programs].map((program, index) => <span className="marquee-program" key={`${program.id}-${index}`}><ProviderIcon program={program} /><b>{program.provider}</b><small>{program.name}</small></span>)}</div> : <div className="catalog-loading">{isArabic ? "جارٍ تحميل البرامج..." : "Loading programs..."}</div>}</div>
        </section>

        <section id="opportunities" className="routes-section section-container">
          <div className="section-heading compact-heading"><div><span className="eyebrow">{copy.routesEyebrow}</span><h2>{copy.routesTitle}</h2><p>{copy.routesBody}</p></div><span className="route-count">{programs.length}<small>{isArabic ? "فرصة موثقة" : "verified opportunities"}</small></span></div>
          <div className="routes-grid">{routes.map(({ icon: Icon, title, body }) => <article className="route-item" key={title}><span className="route-icon"><Icon size={23} /></span><div><h3>{title}</h3><p>{body}</p></div><ChevronLeft size={18} /></article>)}</div>
        </section>

        <section id="journey" className="journey-section">
          <div className="section-container"><div className="section-heading compact-heading"><div><span className="eyebrow">{copy.learningEyebrow}</span><h2>{copy.learningTitle}</h2><p>{copy.learningBody}</p></div><a className="text-link" href="/register">{copy.register} <ArrowUpRight size={15} /></a></div><div className="journey-strip">{learningPhases.map((phase, index) => <div className={`journey-step ${phase.color}`} key={phase.id}><span>{String(index + 1).padStart(2, "0")}</span><strong>{isArabic ? phase.labelAr : phase.label}</strong><small>{isArabic ? phase.outcomeAr : phase.outcome}</small></div>)}</div></div>
        </section>

        <section id="programs" className="spotlight-section section-container">
          <div className="section-heading compact-heading"><div><span className="eyebrow">{copy.directoryEyebrow}</span><h2>{copy.directoryTitle}</h2><p>{copy.directoryBody}</p></div><a className="button button-primary" href="/programs">{copy.viewAll} <ArrowUpRight size={16} /></a></div>
          <div className="category-summary">{categoryCounts.map(([category, count]) => <div className="category-summary-item" key={category}><span>{isArabic ? categoryArabic[category] || category : category}</span><strong>{count}</strong></div>)}</div>
          <div className="program-lanes" aria-label={isArabic ? "كل البرامج في شرائط متحركة" : "All programs in moving lanes"}>{programs.length ? Object.entries(categoryCounts).map(([category], laneIndex) => { const lanePrograms = programs.filter((program) => program.primaryCategory === category); const loop = [...lanePrograms, ...lanePrograms]; return <div className={`program-lane ${laneIndex % 2 ? "program-lane-reverse" : ""}`} key={category}><div className="program-lane-label"><span>{isArabic ? categoryArabic[category] || category : category}</span><strong>{lanePrograms.length}</strong></div><div className="program-lane-window"><div className="program-lane-track">{loop.map((program, index) => <a className="program-lane-card" href="/register" key={`${program.id}-${index}`}><ProviderIcon program={program} /><span><strong>{program.name}</strong><small>{program.provider} · {program.region}</small></span><LockKeyhole size={14} /></a>)}</div></div></div>; }) : <div className="catalog-loading">{isArabic ? "جارٍ تحميل دليل البرامج..." : "Loading program directory..."}</div>}</div>
        </section>

        <section className="home-book-library section-container"><div className="section-heading compact-heading"><div><span className="eyebrow"><BookOpen size={14} /> {isArabic ? "مكتبة الكتب الأصلية" : "Original book library"}</span><h2>{isArabic ? "اقرأ، تعلّم، وطبّق على مشروعك." : "Read, learn, and apply it to your project."}</h2><p>{isArabic ? "تتحرك أغلفة الكتب تلقائيًا في شريط مستمر، ويمكنك إيقافه أو سحبه من الهاتف." : "Book covers now move in a continuous auto-scrolling shelf that you can pause or swipe on mobile."}</p></div><a className="button button-secondary" href="/books">{isArabic ? "فتح المكتبة" : "Open library"} <ArrowUpRight size={16} /></a></div>{bookCatalogs.length ? bookCatalogs.map((catalog) => { const loop = [...catalog.books, ...catalog.books]; return <div className="home-book-catalog" key={catalog.id}><div className="home-book-catalog-title"><strong>{catalog.name}</strong><span>{catalog.books.length} {isArabic ? "كتابًا أصليًا" : "original books"}</span></div><div className="book-slider home-book-slider home-auto-slider"><div className="home-book-track">{loop.map((book, index) => <a className="home-book-card" href="/books" key={`${book.id}-${index}`}><div className="home-book-cover"><img src={book.image} alt={isArabic ? `غلاف ${book.title}` : `${book.title} cover`} loading="lazy" decoding="async" /></div><div><strong>{book.title}</strong><small>{getBookDescription(book, isArabic)}</small></div></a>)}</div></div></div>; }) : <div className="catalog-loading">{isArabic ? "جارٍ تحميل مكتبة الكتب..." : "Loading book library..."}</div>}</section>

<section className="home-data-library section-container"><div className="section-heading compact-heading"><div><span className="eyebrow"><Database size={14} /> {isArabic ? "شريط قواعد البيانات" : "Data catalog marquee"}</span><h2>{isArabic ? "مصادر إضافية للعملاء والعمليات." : "More sources for customers and operations."}</h2><p>{isArabic ? "استكشف LinkedIn وFacebook وReddit وHubSpot وClickUp وGoogle Maps وغيرها لبناء عملاء وشراكات، لا قوائم مستثمرين." : "Explore LinkedIn, Facebook, Reddit, HubSpot, ClickUp, Google Maps, and more to build customer and partner pipelines—not investor lists."}</p></div><a className="button button-secondary" href="/databases">{isArabic ? "عرض قواعد البيانات" : "View data catalog"} <ArrowUpRight size={16} /></a></div><div className="home-data-marquee-window"><div className="home-data-marquee-track">{databaseSources.length ? [...databaseSources, ...databaseSources].map((source, index) => <a className="home-data-card" href="/databases" key={`${source.id}-${index}`}><span className="home-data-icon"><img src={source.iconPath} alt="" /></span><span><strong>{isArabic ? source.labelAr : source.labelEn}</strong><small>{isArabic ? source.priceAr : source.priceEn} · {isArabic ? "اكتساب العملاء" : "Customer acquisition"}</small></span><ArrowUpRight size={14} /></a>) : <div className="catalog-loading">{isArabic ? "جارٍ تحميل قواعد البيانات..." : "Loading data catalog..."}</div>}</div></div></section>

        <section className="plans-section section-container"><div className="section-heading compact-heading"><div><span className="eyebrow"><BadgeDollarSign size={15} /> {isArabic ? "باقات الوصول والاستشارة" : "Access and consulting plans"}</span><h2>{isArabic ? "اختر مستوى الدعم الذي يناسب مرحلة شركتك." : "Choose the support level that fits your stage."}</h2><p>{isArabic ? "كل باقة تشمل الوصول إلى الموارد، والاستشارة، والنماذج الجاهزة التي يتم تخصيصها معك." : "Every plan includes resource access, consultation, and templates customized for your company."}</p></div><a className="text-link" href="/register">{isArabic ? "ابدأ طلبك" : "Start your request"} <ArrowUpRight size={15} /></a></div><div className="plans-grid">{academyOffers.map((plan) => <article className={`plan-card ${plan.featured ? "is-featured" : ""}`} key={plan.id}>{plan.featured && <span className="plan-ribbon">{isArabic ? plan.labelAr : plan.label}</span>}<span className="plan-label">{isArabic ? plan.labelAr : plan.label}</span><h3>{isArabic ? plan.nameAr : plan.name}</h3><strong className="plan-price">{plan.price}</strong><span className="plan-price-note">{isArabic ? "باقة تنفيذ واستشارة لمرة واحدة" : "One-time implementation and consulting package"}</span><p>{isArabic ? plan.summaryAr : plan.summary}</p><div className="plan-details-label">{isArabic ? "ماذا تشمل الباقة" : "What is included"}</div><ul>{(isArabic ? plan.benefitsAr : plan.benefits).map((item) => <li key={item}><CheckCircle2 size={15} /> {item}</li>)}</ul><a className={`button ${plan.featured ? "button-primary" : "button-secondary"}`} href="/register">{isArabic ? "احجز استشارة الباقة" : "Book plan consultation"} <ArrowUpRight size={15} /></a></article>)}</div></section>
        <section className="testimonials-section section-container" aria-label={isArabic ? "آراء وتجارب العملاء" : "Client testimonials"}>
          <div className="testimonials-heading"><div><span className="eyebrow"><span className="testimonials-stars" aria-hidden="true">★★★★★</span> {isArabic ? "آراء وتجارب العملاء" : "Client experiences"}</span><h2>{isArabic ? "نتائج أوضح تبدأ من قرار دعم مناسب." : "Clearer outcomes start with the right support."}</h2><p>{isArabic ? "تجارب مجهّلة تركز على ما يهم: وضوح المسار، جودة التنفيذ، وتحويل الموارد إلى خطوات عملية." : "Anonymized experiences focused on what matters: clarity, execution quality, and turning resources into practical next steps."}</p></div><a className="button button-primary" href="/register">{isArabic ? "ابدأ تجربتك" : "Start your journey"} <ArrowUpRight size={16} /></a></div>
          <div className="testimonials-marquee-window"><div className="testimonials-marquee-track">{[...testimonials, ...testimonials].map((item, index) => <article className="testimonial-card" key={`${item.nameEn}-${index}`}><div className="testimonial-card-top"><span className="testimonial-stars" aria-label={isArabic ? "تقييم خمس نجوم" : "5 out of 5"}>★★★★★</span><span className="testimonial-index">{item.flag} {isArabic ? item.country : item.countryEn}</span></div><blockquote>“{isArabic ? item.quoteAr : item.quoteEn}”</blockquote><div className="testimonial-author"><img className="testimonial-avatar-image" src={item.avatar} alt={isArabic ? `صورة رمزية لعميل من ${item.country}` : `Avatar for a customer from ${item.countryEn}`} loading="lazy" /><span><strong>{isArabic ? item.nameAr : item.nameEn}</strong><small>{isArabic ? item.typeAr : item.typeEn}</small></span></div></article>)}</div></div>
        </section>
        <section className="infrastructure-section section-container"><div className="infrastructure-copy"><span className="eyebrow"><Cloud size={14} /> {isArabic ? "حلول البنية التحتية والنمو" : "Infrastructure & growth enablement"}</span><h2>{isArabic ? "نساعد المؤسسات على بدء البنية الصحيحة للنمو." : "We help organizations start with the right growth infrastructure."}</h2><p>{isArabic ? "نساعد الشركات الناشئة، المؤسسات التعليمية، والشركات المتوسطة على تخفيض تكلفة البداية والوصول إلى البنية السحابية وأرصدة الذكاء الاصطناعي والأتمتة، ثم تحويلها إلى خطوات تنفيذية قابلة للقياس." : "We help startups, educational institutions, and mid-sized companies reduce the cost of getting started with cloud infrastructure and AI/automation credits, then turn access into measurable execution."}</p><a className="button button-primary" href="/register">{isArabic ? "ناقش احتياج مؤسستك" : "Discuss your organization"} <ArrowUpRight size={16} /></a></div><div className="infrastructure-grid"><article><span><Cloud size={19} /></span><h3>{isArabic ? "أساس البنية السحابية" : "Cloud foundation"}</h3><p>{isArabic ? "اختيار البداية المناسبة، الحسابات، البنية الآمنة، وخطة الاستخدام." : "Choose the right starting tier, accounts, secure architecture, and usage plan."}</p></article><article><span><Sparkles size={19} /></span><h3>{isArabic ? "أرصدة الذكاء الاصطناعي والأتمتة" : "AI and automation credits"}</h3><p>{isArabic ? "الوصول إلى أرصدة نماذج الذكاء الاصطناعي وأدوات الأتمتة لتسريع التجربة." : "Reach AI model and automation credits to accelerate experimentation and delivery."}</p></article><article><span><GraduationCap size={19} /></span><h3>{isArabic ? "تمكين التعليم" : "Education enablement"}</h3><p>{isArabic ? "مسار خاص للمؤسسات التعليمية والتقنية التعليمية لبناء حلول قابلة للتوسع." : "A dedicated path for educational institutions and EdTech teams building scalable solutions."}</p></article></div></section>
        <section className="sources-section compact-sources section-container"><div className="sources-copy"><span className="eyebrow"><Layers3 size={14} /> {copy.sources}</span><h2>{isArabic ? "سجّل أولًا، ثم نفتح لك المصدر المناسب." : "Register first, then we open the right source."}</h2><p>{isArabic ? "نحافظ على روابط المصدر والتقديم داخل الدليل المحمي، حتى نتمكن من فهم احتياجك وتوجيهك إلى المسار المناسب." : "Official source and application links stay inside the protected directory so we can understand your need and guide you to the right path."}</p></div><div className="source-links"><a href="/register"><span className="source-icon"><BookOpen size={17} /></span><span><strong>{isArabic ? "سجّل لفتح المكتبة" : "Register to unlock library"}</strong><small>{isArabic ? "بعد التسجيل تظهر المصادر" : "Sources appear after registration"}</small></span><LockKeyhole size={16} /></a><a href="/register"><span className="source-icon coral"><Award size={17} /></span><span><strong>{isArabic ? "افتح دليل البرامج" : "Unlock program directory"}</strong><small>{isArabic ? "روابط التقديم الرسمية" : "Official application links"}</small></span><LockKeyhole size={16} /></a></div></section>
      </main>
      <footer className="site-footer"><div className="footer-brand"><span className="brand-mark small"><Sparkles size={14} /></span><span><strong>Startup Academy</strong><small>{copy.footer}</small></span></div><div className="home-footer-policies"><a href="/privacy">{isArabic ? "الخصوصية" : "Privacy"}</a><a href="/terms">{isArabic ? "الشروط" : "Terms"}</a><a href="/data-policy">{isArabic ? "استخدام البيانات" : "Data use"}</a></div><div className="footer-meta"><span><CheckCircle2 size={14} /> {isArabic ? "مصادر رسمية" : "Official sources"}</span><span><Globe2 size={14} /> {isArabic ? "العربية" : "English"}</span><a className="admin-footer-link" href="/admin/login"><LockKeyhole size={13} /> {isArabic ? "دخول الإدارة" : "Admin login"}</a></div></footer>
    </div>
  );
}
