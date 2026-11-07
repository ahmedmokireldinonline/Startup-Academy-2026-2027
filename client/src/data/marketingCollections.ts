export type MarketingCollection = {
  id: string;
  image: string;
  eyebrowAr: string;
  eyebrowEn: string;
  titleAr: string;
  titleEn: string;
  bodyAr: string;
  bodyEn: string;
  proofAr: string;
  proofEn: string;
  benefitsAr: string[];
  benefitsEn: string[];
};

export const marketingCollections: MarketingCollection[] = [
  {
    id: "business-models",
    image: "/marketing/business-models-collection.jpg",
    eyebrowAr: "للمؤسسين وبناة المنتجات",
    eyebrowEn: "For founders and product builders",
    titleAr: "حوّل فكرة مشروعك إلى نموذج قابل للاختبار",
    titleEn: "Turn your idea into a testable business model",
    bodyAr: "مجموعة Business Models & Product Building تمنحك مرجعًا عمليًا لبناء النموذج، اختبار المشكلة والسوق، ضبط التسعير، فهم المقاييس، ثم الانتقال من الـMVP إلى ملاءمة المنتج للسوق والتوسع.",
    bodyEn: "Business Models & Product Building gives you a practical reference shelf for designing the model, testing the problem and market, shaping pricing, understanding metrics, and moving from MVP to product-market fit and scale.",
    proofAr: "91 دليلًا متخصصًا داخل المجموعة",
    proofEn: "91 specialist guides in the collection",
    benefitsAr: ["نماذج أعمال متعددة من SaaS والاشتراكات إلى Web3 وHealthTech", "أدوات لاختبار الفكرة وقياس ملاءمة المنتج للسوق", "مراجع للتسعير، التكاليف، المقاييس، والتوسع"],
    benefitsEn: ["Business models from SaaS and subscriptions to Web3 and HealthTech", "Tools for idea testing and product-market-fit thinking", "References for pricing, costs, metrics, and scaling"],
  },
  {
    id: "management-ai",
    image: "/marketing/management-ai-collection.jpg",
    eyebrowAr: "للفرق التي تريد تنفيذًا أفضل",
    eyebrowEn: "For teams that want better execution",
    titleAr: "ابنِ نظام تشغيل أقوى لفريقك وشركتك",
    titleEn: "Build a stronger operating system for your team",
    bodyAr: "مجموعة Management, AI & Execution تجمع مراجع الإدارة، الذكاء الاصطناعي، التسويق، العمليات، تجربة العميل، التفاوض، والقيادة في مسار واحد يساعدك على تحويل المعرفة إلى قرارات وعادات تنفيذ.",
    bodyEn: "Management, AI & Execution brings together management, AI, marketing, operations, customer experience, negotiation, and leadership references in one path for turning knowledge into decisions and execution habits.",
    proofAr: "37 مرجعًا عمليًا للإدارة والتنفيذ",
    proofEn: "37 practical management and execution references",
    benefitsAr: ["تطوير الإدارة والقيادة والعمل الجماعي", "تطبيقات الذكاء الاصطناعي والأتمتة داخل العمل", "التسويق، المبيعات، تجربة العميل، والعمليات"],
    benefitsEn: ["Management, leadership, and team collaboration", "Practical AI and automation applications", "Marketing, sales, customer experience, and operations"],
  },
  {
    id: "saas-investor-toolkit",
    image: "/marketing/saas-investor-toolkit.jpg",
    eyebrowAr: "لشركات SaaS الباحثة عن النمو والتمويل",
    eyebrowEn: "For SaaS teams seeking growth and capital",
    titleAr: "من بناء SaaS إلى الوصول للمستثمر المناسب",
    titleEn: "From building SaaS to reaching the right investor",
    bodyAr: "SaaS Investor Toolkit هو صندوق عمل للمؤسس: قوائم مستثمري SaaS في مراحل Angel وSeed، نموذج تشغيل وتدفق نقدي، تحليلات CAC وCMRR وNDR، قوالب المبيعات والبريد، وأدوات التسويق والتحليل.",
    bodyEn: "SaaS Investor Toolkit is a working capital-and-growth desk for founders: Angel and Seed SaaS investor lists, operating and cash-flow models, CAC/CMRR/NDR analysis, sales and email templates, plus marketing and analytics tools.",
    proofAr: "أكثر من 2,100 جهة Angel وSeed مع أدوات التشغيل",
    proofEn: "2,100+ Angel and Seed contacts plus operating tools",
    benefitsAr: ["+1,200 مستثمر SaaS في مرحلة Angel و+900 في مرحلة Seed", "نماذج CAC، التدفق النقدي، التشغيل، وCohort Analysis", "قوالب Pitch Deck، البريد، المبيعات، والتسويق"],
    benefitsEn: ["1,200+ SaaS Angel investors and 900+ SaaS Seed investors", "CAC, cash-flow, operating, and cohort-analysis models", "Pitch deck, email, sales, and marketing templates"],
  },
];
