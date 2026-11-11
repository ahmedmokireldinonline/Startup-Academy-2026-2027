import fs from "node:fs";
import path from "node:path";

const root = path.resolve("dist/public");
const origin = "https://startup-academy-2026-2027.vercel.app";
const source = fs.readFileSync(path.join(root, "index.html"), "utf8");

const pages = {
  "/": {
    title: "Startup Academy — تمويل ونمو وأنظمة للشركات الناشئة",
    description: "منصة Startup Academy تجمع برامج التمويل الموثقة، التعلم العملي، دليل المستثمرين، أدوات التحليل المالي، ومكتبة موارد المؤسسين.",
    heading: "Startup Academy: التمويل والأنظمة والنمو",
    body: "اكتشف برامج الشركات الناشئة والمنح وأرصدة السحابة، وابنِ خطة عملية من الفكرة إلى التحقق والتمويل باستخدام أدوات ومراجع قابلة للتنفيذ.",
    links: [["/programs", "دليل برامج تمويل الشركات الناشئة"], ["/investors", "دليل المستثمرين"], ["/financial-analysis", "التحليل المالي"], ["/books", "مكتبة المؤسسين"]],
  },
  "/programs": {
    title: "دليل برامج تمويل الشركات الناشئة 2026–2027 | Startup Academy",
    description: "ابحث في دليل برامج الشركات الناشئة 2026–2027: منح، مسرّعات، تمويل، أرصدة سحابية وفرص تقديم موثقة حسب الدولة والقطاع والمرحلة.",
    heading: "دليل برامج تمويل الشركات الناشئة 2026–2027",
    body: "قارن بين المنح والمسرّعات وأرصدة السحابة وبرامج الدعم، ثم استخدم المرشحات للوصول إلى الفرصة الأنسب لمرحلة شركتك ودولتك.",
    links: [["/register", "التسجيل لفتح المصادر وروابط التقديم"], ["/about", "عن Startup Academy"], ["/", "العودة إلى الرئيسية"]],
  },
  "/investors": {
    title: "دليل المستثمرين للشركات الناشئة | Startup Academy",
    description: "استكشف بيانات المستثمرين العامة للشركات الناشئة حسب الدولة والنوع والقطاع، مع تنظيم أفضل للبحث والاستعداد لجولات التمويل.",
    heading: "دليل المستثمرين للشركات الناشئة",
    body: "استخدم البحث والتصفية لبناء قائمة أولية من المستثمرين المناسبين، ثم جهّز رسالتك وملفك قبل التواصل.",
    links: [["/register", "ابدأ بخطة تمويل منظمة"], ["/programs", "استكشف برامج التمويل"], ["/", "العودة إلى الرئيسية"]],
  },
  "/books": {
    title: "مكتبة كتب المؤسسين وريادة الأعمال | Startup Academy",
    description: "مكتبة عملية لكتب ريادة الأعمال، المنتج، التسويق، الإدارة والتمويل، مرتبة لمساعدة المؤسسين على تحويل المعرفة إلى خطوات.",
    heading: "مكتبة كتب المؤسسين وريادة الأعمال",
    body: "ابحث داخل مجموعة مختارة من كتب الأعمال والمنتج والتسويق والاستراتيجية، مع وصف يوضح متى يفيد كل كتاب في رحلة الشركة.",
    links: [["/programs", "اربط التعلم بفرص التقديم"], ["/financial-model", "استخدم النموذج المالي"], ["/", "العودة إلى الرئيسية"]],
  },
  "/databases": {
    title: "منتجات بيانات B2B وأنظمة اكتساب العملاء | Startup Academy",
    description: "حلول بيانات B2B مسؤولة تشمل البحث والتنظيف والإثراء وربط CRM لمساعدة فرق المبيعات والنمو على الوصول إلى العملاء المناسبين.",
    heading: "منتجات بيانات B2B وأنظمة اكتساب العملاء",
    body: "استعرض خدمات البحث والتنظيف وربط البيانات حسب الدولة والقطاع والدور، مع تركيز على المصادر العامة أو المرخّصة والجاهزية لسير عمل CRM.",
    links: [["/register", "اطلب حزمة مخصصة"], ["/about", "استشارات أنظمة النمو"], ["/", "العودة إلى الرئيسية"]],
  },
  "/financial-model": {
    title: "نموذج SaaS المالي وقوالب التخطيط | Startup Academy",
    description: "حزمة نموذج مالي لشركات SaaS تشمل الإيرادات والتكاليف والتوظيف والتدفق النقدي وCap Table ومؤشرات الأداء والاستعداد للمستثمرين.",
    heading: "نموذج SaaS المالي للتخطيط والتمويل",
    body: "ابنِ توقعات أكثر وضوحًا للإيرادات والمصاريف والتوظيف والتدفق النقدي، واستخدم الملفات الجاهزة لمناقشة خطتك مع الفريق والمستثمرين.",
    links: [["/financial-analysis", "احسب Burn Rate وRunway"], ["/programs", "ابحث عن فرص تمويل"], ["/", "العودة إلى الرئيسية"]],
  },
  "/financial-analysis": {
    title: "حاسبة Burn Rate وRunway التفاعلية | Startup Academy",
    description: "احسب الحرق النقدي الشهري، الهامش الإجمالي، نقطة التعادل وفترة بقاء شركتك الناشئة من خلال أداة مالية تفاعلية.",
    heading: "التحليل المالي: Burn Rate وRunway",
    body: "أدخل رصيدك النقدي وإيراداتك ومصاريفك للحصول على قراءة سريعة للسيولة، ثم استخدم النتائج لبناء خطة مالية أكثر واقعية.",
    links: [["/financial-model", "افتح النموذج المالي الكامل"], ["/register", "احصل على دعم مخصص"], ["/", "العودة إلى الرئيسية"]],
  },
  "/privacy": {
    title: "سياسة الخصوصية | Startup Academy",
    description: "سياسة الخصوصية في Startup Academy: البيانات التي نجمعها، سبب استخدامها، وحقوق المستخدم في التصحيح أو الحذف.",
    heading: "سياسة الخصوصية في Startup Academy",
    body: "نوضح البيانات التي يقدمها المستخدم عند التسجيل أو طلب منتج، وطريقة استخدامها في تشغيل الموارد والرد على الاستفسارات.",
    links: [["/terms", "شروط الاستخدام"], ["/data-policy", "استخدام البيانات والترخيص"], ["/", "العودة إلى الرئيسية"]],
  },
  "/terms": {
    title: "شروط الاستخدام | Startup Academy",
    description: "شروط استخدام موقع Startup Academy والكتالوجات والحاسبات والنماذج المالية والروابط الخارجية.",
    heading: "شروط استخدام الموقع والموارد",
    body: "استخدم الموقع للمعلومات والتخطيط وطلب الخدمات. النماذج والحاسبات التعليمية ليست استشارة مهنية تلقائية.",
    links: [["/privacy", "سياسة الخصوصية"], ["/data-policy", "استخدام البيانات والترخيص"], ["/", "العودة إلى الرئيسية"]],
  },
  "/data-policy": {
    title: "استخدام البيانات والترخيص | Startup Academy",
    description: "توضيح مصادر بيانات Startup Academy والاستخدام المسموح والفرق بين البيانات العامة والمرخصة وبيانات العميل.",
    heading: "استخدام البيانات والترخيص",
    body: "نميز بين البيانات العامة والمرخصة وبيانات العميل، ونؤكد على الاستخدام المسؤول والامتثال وعدم إعادة تحديد الهوية.",
    links: [["/databases", "منتجات البيانات"], ["/privacy", "سياسة الخصوصية"], ["/", "العودة إلى الرئيسية"]],
  },
  "/about": {
    title: "عن Startup Academy — تدريب واستشارات أنظمة النمو",
    description: "تعرف على منهج Startup Academy في الجاهزية للتمويل، الأتمتة، بناء الأنظمة، وتحويل أهداف الشركات الناشئة إلى خطوات قابلة للقياس.",
    heading: "تدريب واستشارات عملية للمؤسسين",
    body: "نساعد المؤسسين على ترتيب الأولويات، تحسين الجاهزية للتمويل، بناء سير عمل قابل للتوسع، وربط التعلم بالتنفيذ.",
    links: [["/register", "ابدأ ملفك الأولي"], ["/investors", "دليل المستثمرين"], ["/", "العودة إلى الرئيسية"]],
  },
  "/register": {
    title: "التسجيل في Startup Academy وفتح دليل البرامج",
    description: "سجّل بياناتك لفتح تفاصيل البرامج وروابط التقديم الرسمية والحصول على مسار أوضح يناسب دولة شركتك ومرحلتها.",
    heading: "سجّل لفتح دليل برامج الشركات الناشئة",
    body: "أكمل بيانات البداية مرة واحدة للوصول إلى دليل البرامج ومشاركة احتياجك مع فريق Startup Academy عند اختيارك ذلك.",
    links: [["/programs", "استعرض دليل البرامج"], ["/about", "تعرف على المنهج"], ["/", "العودة إلى الرئيسية"]],
  },
  "/dashboard": {
    title: "لوحة عضوية Startup Academy — البرامج والمستثمرون",
    description: "لوحة تفاعلية لاختيار باقة الوصول المناسبة واستكشاف برامج التمويل ودليل المستثمرين وأدوات نمو الشركات الناشئة.",
    heading: "لوحة عضوية Startup Academy",
    body: "اختر مسار الوصول المناسب، ثم انتقل مباشرة إلى دليل البرامج والمستثمرين والتحليل المالي لبناء خطة نمو أكثر وضوحًا.",
    links: [["/programs", "دليل برامج التمويل"], ["/investors", "دليل المستثمرين"], ["/financial-analysis", "التحليل المالي"]],
  },
};

const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const escapeJson = (value) => JSON.stringify(value).replaceAll("</", "<\\/");

for (const [route, page] of Object.entries(pages)) {
  const canonical = `${origin}${route === "/" ? "/" : route}`;
  const links = page.links.map(([href, label]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`).join("");
  const schema = {
    "@context": "https://schema.org",
    "@type": route === "/" ? "WebSite" : "CollectionPage",
    name: page.title,
    description: page.description,
    url: canonical,
    inLanguage: ["ar", "en"],
    isPartOf: { "@type": "WebSite", name: "Startup Academy 2026–2027", url: origin },
  };
  const html = source
    .replace(/<html lang="[^"]*" dir="[^"]*">/, '<html lang="ar" dir="rtl">')
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(page.description)}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeHtml(page.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escapeHtml(page.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace('</head>', `<link rel="alternate" hreflang="ar" href="${canonical}" /><link rel="alternate" hreflang="en" href="${canonical}" /><link rel="alternate" hreflang="x-default" href="${canonical}" /><script type="application/ld+json">${escapeJson(schema)}</script></head>`)
    .replace('<div id="root"></div>', `<main id="seo-content" dir="rtl"><article><p class="seo-eyebrow">Startup Academy 2026–2027</p><h1>${escapeHtml(page.heading)}</h1><p>${escapeHtml(page.body)}</p><nav aria-label="روابط ذات صلة"><ul>${links}</ul></nav></article></main><div id="root"></div>`);
  const outputDir = route === "/" ? root : path.join(root, route.slice(1));
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, "index.html"), html);
}

// Keep private SPA routes addressable even when the hosting project does not
// apply its rewrite rules. React still owns the final screen after boot.
for (const route of ["/admin/login", "/admin", "/admin/control"]) {
  const outputDir = path.join(root, route.slice(1));
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, "index.html"), source);
}

console.log(`Generated SEO-ready HTML for ${Object.keys(pages).length} public routes and ${3} private SPA routes.`);
