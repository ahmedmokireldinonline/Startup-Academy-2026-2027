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
  Star,
} from "lucide-react";
import { programs, type Program } from "@/data/programs";
import { learningItems, learningPhases } from "@/data/learningPath";

const reviews = [
  { quote: "أصبح لدينا مسار واضح بدل البحث العشوائي عن برامج الدعم والـ credits.", name: "مؤسس شركة EdTech", country: "مصر", flag: "🇪🇬", image: "https://randomuser.me/api/portraits/men/32.jpg" },
  { quote: "ساعدتنا المطابقة على فهم أي برنامج يناسب مرحلة المنتج قبل تجهيز التقديم.", name: "Founder · AI SaaS", country: "السعودية", flag: "🇸🇦", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { quote: "الجزء الأقوى هو تحويل الوصول إلى Cloud Credits إلى خطة بنية قابلة للتنفيذ.", name: "مدير ابتكار مؤسسي", country: "الإمارات", flag: "🇦🇪", image: "https://randomuser.me/api/portraits/men/46.jpg" },
];
const plans = [
  { name: "Access", price: "$3,000", label: "البداية المركّزة", body: "للوصول المنظم إلى الموارد الأساسية وبناء أول مسار تقديم واضح.", featured: false, items: ["الوصول الكامل إلى الموارد المناسبة", "مطابقة البرامج حسب الدولة والمرحلة", "استشارة لكل مورد تمويلي يتم اختياره", "نماذج التقديم والتمويل الأساسية"] },
  { name: "Growth", price: "$5,000", label: "الأكثر طلبًا", body: "لشركة تريد تنفيذ التقديمات مع مراجعة عملية وقرارات أسرع.", featured: true, items: ["كل ما في باقة Access", "الوصول الكامل لكل موارد التمويل والتقديم", "جلسات استشارة ومراجعة لكل مورد", "نماذج Pitch Deck وApplication وFollow-up", "خطة تنفيذ ومتابعة للتقديمات"] },
  { name: "Scale", price: "$7,000", label: "للشركات والمؤسسات", body: "للشركات المتوسطة والمؤسسات التعليمية التي تحتاج نظام نمو متكامل.", featured: false, items: ["كل ما في باقة Growth", "تصميم Cloud وAI/Automation foundation", "نماذج مخصصة للمنح والائتمان والبرامج", "استشارة استراتيجية لكل فرصة", "دعم تجهيز ملف المؤسسة بالكامل"] },
];

const categoryArabic: Record<string, string> = {
  "Cloud & infrastructure credits": "أرصدة السحابة والبنية التحتية",
  "Grants & funding": "منح وتمويل",
  "Accelerators & ecosystem": "مسرّعات ومنظومة ريادة الأعمال",
  "SaaS discounts & perks": "خصومات ومزايا SaaS",
};

const providerDomains: Record<string, string> = {
  "Amazon Web Services": "aws.amazon.com",
  "Google Cloud": "cloud.google.com",
  "Microsoft": "microsoft.com",
  "Anthropic": "anthropic.com",
  "GitHub": "github.com",
  "NVIDIA": "nvidia.com",
};

function providerIconUrl(provider: string) {
  try {
    const domain = providerDomains[provider];
    return domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` : "";
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
      {!failed && providerIconUrl(program.provider) ? <img src={providerIconUrl(program.provider)} alt="" onError={() => setFailed(true)} /> : null}
      {failed || !providerIconUrl(program.provider) ? <span>{fallback}</span> : null}
    </span>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<"ar" | "en">(() => {
    try { return (localStorage.getItem("startup-academy-language") as "ar" | "en") || "ar"; } catch { return "ar"; }
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
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
  useEffect(() => {
    const timer = window.setInterval(() => setReviewIndex((value) => (value + 1) % reviews.length), 5200);
    return () => window.clearInterval(timer);
  }, []);

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
            <a className="main-nav-link" href="/investors">{isArabic ? "المستثمرون" : "Investors"}</a>
            <a className="main-nav-link" href="/dashboard">{isArabic ? "لوحة الحساب" : "Dashboard"}</a>
            <a className="main-nav-link" href="/register">{isArabic ? "التسجيل" : "Register"}</a>
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

        <section id="journey" className="journey-section">
          <div className="section-container"><div className="section-heading compact-heading"><div><span className="eyebrow">{copy.learningEyebrow}</span><h2>{copy.learningTitle}</h2><p>{copy.learningBody}</p></div><a className="text-link" href="/register">{copy.register} <ArrowUpRight size={15} /></a></div><div className="journey-strip">{learningPhases.map((phase, index) => <div className={`journey-step ${phase.color}`} key={phase.id}><span>{String(index + 1).padStart(2, "0")}</span><strong>{isArabic ? phase.labelAr : phase.label}</strong><small>{isArabic ? phase.outcomeAr : phase.outcome}</small></div>)}</div></div>
        </section>

        <section id="programs" className="spotlight-section section-container">
          <div className="section-heading compact-heading"><div><span className="eyebrow">{copy.directoryEyebrow}</span><h2>{copy.directoryTitle}</h2><p>{copy.directoryBody}</p></div><a className="button button-primary" href="/programs">{copy.viewAll} <ArrowUpRight size={16} /></a></div>
          <div className="category-summary">{categoryCounts.map(([category, count]) => <div className="category-summary-item" key={category}><span>{isArabic ? categoryArabic[category] || category : category}</span><strong>{count}</strong></div>)}</div>
          <div className="program-lanes" aria-label={isArabic ? "كل البرامج في شرائط متحركة" : "All programs in moving lanes"}>{Object.entries(categoryCounts).map(([category], laneIndex) => { const lanePrograms = programs.filter((program) => program.primaryCategory === category); const loop = [...lanePrograms, ...lanePrograms]; return <div className={`program-lane ${laneIndex % 2 ? "program-lane-reverse" : ""}`} key={category}><div className="program-lane-label"><span>{isArabic ? categoryArabic[category] || category : category}</span><strong>{lanePrograms.length}</strong></div><div className="program-lane-window"><div className="program-lane-track">{loop.map((program, index) => <a className="program-lane-card" href="/register" key={`${program.id}-${index}`}><ProviderIcon program={program} /><span><strong>{program.name}</strong><small>{program.provider} · {program.region}</small></span><LockKeyhole size={14} /></a>)}</div></div></div>; })}</div>
        </section>

        <section className="reviews-section section-container"><div className="reviews-heading"><span className="eyebrow"><Star size={14} /> {isArabic ? "تجارب من المسار" : "Founder voices"}</span><h2>{isArabic ? "من التخبط إلى خطوة تالية واضحة." : "From uncertainty to a clear next step."}</h2></div><div className="review-stage"><div className="review-orbit review-orbit-a" /><div className="review-orbit review-orbit-b" /><article className="review-card" key={reviews[reviewIndex].name}><div className="review-stars">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={15} fill="currentColor" />)}</div><p>“{reviews[reviewIndex].quote}”</p><div className="review-person"><img src={reviews[reviewIndex].image} alt="" /><span><strong>{reviews[reviewIndex].name}</strong><small>{reviews[reviewIndex].flag} {reviews[reviewIndex].country}</small></span></div></article><div className="review-dots">{reviews.map((review, index) => <button key={review.name} className={index === reviewIndex ? "active" : ""} onClick={() => setReviewIndex(index)} aria-label={`Review ${index + 1}`} />)}</div></div></section>

        <section className="plans-section section-container"><div className="section-heading compact-heading"><div><span className="eyebrow"><BadgeDollarSign size={15} /> باقات الوصول والاستشارة</span><h2>اختر مستوى الدعم الذي يناسب مرحلة شركتك.</h2><p>كل باقة تشمل الوصول الكامل إلى الموارد والتقديم عليها، استشارة لكل مورد تمويلي، ونماذج جاهزة يتم تخصيصها معك.</p></div><a className="text-link" href="/register">ابدأ طلبك <ArrowUpRight size={15} /></a></div><div className="plans-grid">{plans.map((plan) => <article className={`plan-card ${plan.featured ? "is-featured" : ""}`} key={plan.name}>{plan.featured && <span className="plan-ribbon">الأكثر طلبًا</span>}<span className="plan-label">{plan.label}</span><h3>{plan.name}</h3><strong className="plan-price">{plan.price}</strong><p>{plan.body}</p><ul>{plan.items.map((item) => <li key={item}><CheckCircle2 size={15} /> {item}</li>)}</ul><a className={`button ${plan.featured ? "button-primary" : "button-secondary"}`} href="/register">احجز استشارة الباقة <ArrowUpRight size={15} /></a></article>)}</div></section>
        <section className="testimonial-marquee-section" aria-label={isArabic ? "تقييمات العملاء" : "Client testimonials"}><div className="testimonial-marquee-heading section-container"><span className="eyebrow"><Star size={14} /> {isArabic ? "تقييمات العملاء" : "Client testimonials"}</span><span>{isArabic ? "شريط دوّار في اتجاه عكسي" : "Reverse-moving client voices"}</span></div><div className="testimonial-marquee-window"><div className="testimonial-marquee-track">{[...reviews, ...reviews].map((review, index) => <article className="testimonial-chip" key={`${review.name}-${index}`}><div className="review-stars">{Array.from({ length: 5 }).map((_, starIndex) => <Star key={starIndex} size={11} fill="currentColor" />)}</div><p>“{review.quote}”</p><strong>{review.name}</strong><small>{review.flag} {review.country}</small></article>)}</div></div></section>
        <section className="infrastructure-section section-container"><div className="infrastructure-copy"><span className="eyebrow"><Cloud size={14} /> {isArabic ? "حلول البنية التحتية والنمو" : "Infrastructure & growth enablement"}</span><h2>{isArabic ? "نساعد المؤسسات على بدء البنية الصحيحة للنمو." : "We help organizations start with the right growth infrastructure."}</h2><p>{isArabic ? "نساعد الشركات الناشئة، المؤسسات التعليمية، والشركات المتوسطة على تخفيض تكلفة البداية والوصول إلى Cloud Infrastructure وAI/Automation Credits، ثم تحويلها إلى خطوات تنفيذية قابلة للقياس." : "We help startups, educational institutions, and mid-sized companies reduce the cost of getting started with cloud infrastructure and AI/automation credits, then turn access into measurable execution."}</p><a className="button button-primary" href="/register">{isArabic ? "ناقش احتياج مؤسستك" : "Discuss your organization"} <ArrowUpRight size={16} /></a></div><div className="infrastructure-grid"><article><span><Cloud size={19} /></span><h3>{isArabic ? "Cloud Foundation" : "Cloud Foundation"}</h3><p>{isArabic ? "اختيار البداية المناسبة، الحسابات، البنية الآمنة، وخطة الاستخدام." : "Choose the right starting tier, accounts, secure architecture, and usage plan."}</p></article><article><span><Sparkles size={19} /></span><h3>{isArabic ? "AI & Automation Credits" : "AI & Automation Credits"}</h3><p>{isArabic ? "الوصول إلى أرصدة نماذج الذكاء الاصطناعي وأدوات الأتمتة لتسريع التجربة." : "Reach AI model and automation credits to accelerate experimentation and delivery."}</p></article><article><span><GraduationCap size={19} /></span><h3>{isArabic ? "Education Enablement" : "Education Enablement"}</h3><p>{isArabic ? "مسار خاص للمؤسسات التعليمية وEdTech لبناء حلول قابلة للتوسع." : "A dedicated path for educational institutions and EdTech teams building scalable solutions."}</p></article></div></section>
        <section className="sources-section compact-sources section-container"><div className="sources-copy"><span className="eyebrow"><Layers3 size={14} /> {copy.sources}</span><h2>{isArabic ? "سجّل أولًا، ثم نفتح لك المصدر المناسب." : "Register first, then we open the right source."}</h2><p>{isArabic ? "نحافظ على روابط المصدر والتقديم داخل الدليل المحمي، حتى نتمكن من فهم احتياجك وتوجيهك إلى المسار المناسب." : "Official source and application links stay inside the protected directory so we can understand your need and guide you to the right path."}</p></div><div className="source-links"><a href="/register"><span className="source-icon"><BookOpen size={17} /></span><span><strong>{isArabic ? "سجّل لفتح المكتبة" : "Register to unlock library"}</strong><small>بعد التسجيل تظهر المصادر</small></span><LockKeyhole size={16} /></a><a href="/register"><span className="source-icon coral"><Award size={17} /></span><span><strong>{isArabic ? "افتح دليل البرامج" : "Unlock program directory"}</strong><small>روابط التقديم الرسمية</small></span><LockKeyhole size={16} /></a></div></section>
      </main>
      <footer className="site-footer"><div className="footer-brand"><span className="brand-mark small"><Sparkles size={14} /></span><span><strong>Startup Academy</strong><small>{copy.footer}</small></span></div><div className="footer-meta"><span><CheckCircle2 size={14} /> {isArabic ? "مصادر رسمية" : "Official sources"}</span><span><Globe2 size={14} /> {isArabic ? "عربي / English" : "Arabic / English"}</span></div></footer>
    </div>
  );
}
