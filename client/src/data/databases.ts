export type DatabaseSource = {
  id: string;
  name: string;
  labelAr: string;
  labelEn: string;
  descriptionAr: string;
  descriptionEn: string;
  useCasesAr: string[];
  useCasesEn: string[];
  fieldsAr: string[];
  fieldsEn: string[];
  tone: string;
  icon: "linkedin" | "facebook" | "reddit" | "phone" | "zoominfo" | "apollo" | "hubspot" | "clickup" | "googlemaps";
  statusAr: string;
  statusEn: string;
  priceAr: string;
  priceEn: string;
  deliveryAr: string;
  deliveryEn: string;
  customerPlayAr: string;
  customerPlayEn: string;
  iconPath: string;
  officialUrl: string;
  coverageAr?: string;
  coverageEn?: string;
  formatVariantsAr?: string[];
  formatVariantsEn?: string[];
};

export const databaseSources: DatabaseSource[] = [
  {
    id: "linkedin-b2b",
    name: "LinkedIn B2B Intelligence",
    labelAr: "بيانات LinkedIn للأفراد والشركات",
    labelEn: "LinkedIn people & company intelligence",
    descriptionAr: "بيانات مهنية للأفراد والشركات مع تقسيم حسب الدولة والقطاع والدور وحجم الشركة، ولا تُسلّم إلا ضمن مصدر مرخّص أو أساس قانوني صالح.",
    descriptionEn: "Professional data for people and companies segmented by country, sector, role, and company size, delivered only with a licensed source or lawful basis.",
    useCasesAr: ["تحديد الحسابات المستهدفة", "بناء قوائم ABM", "تخصيص رسائل التواصل"],
    useCasesEn: ["Target-account research", "ABM list building", "Personalized outreach"],
    fieldsAr: ["القطاع", "المسمى الوظيفي", "حجم الشركة", "الدولة", "رابط المصدر"],
    fieldsEn: ["Industry", "Job title", "Company size", "Country", "Source URL"],
    tone: "blue", icon: "linkedin", statusAr: "أفراد وشركات · حسب الطلب", statusEn: "People & companies · built to brief", priceAr: "يبدأ من 600$", priceEn: "From $600", deliveryAr: "3–5 أيام عمل", deliveryEn: "3–5 business days", customerPlayAr: "استخدمها لبناء قائمة حسابات وأدوار شراء، مع الالتزام بالإشعار والخصوصية وشروط المصدر قبل أي تواصل.", customerPlayEn: "Use it to map accounts and buying roles while respecting notice, privacy, and source terms before outreach.", iconPath: "/platform-logos/linkedin.svg", officialUrl: "https://www.linkedin.com/", coverageAr: "أفراد وشركات · حسب الدولة والقطاع · حجم يقارب 1.4TB", coverageEn: "People and companies · by country and sector · about 1.4TB", formatVariantsAr: ["CSV", "JSON", "للنقل: Hard بسعة 2TB", "يفضل SSD"], formatVariantsEn: ["CSV", "JSON", "Transfer: 2TB drive", "SSD preferred"],
  },
  {
    id: "facebook-business",
    name: "Facebook Business Signals",
    labelAr: "بيانات Facebook للصفحات والمجتمعات",
    labelEn: "Facebook pages & community signals",
    descriptionAr: "رصد منظم للصفحات والمجتمعات التجارية العامة، يساعد فرق التسويق على فهم الجمهور والقنوات والفرص، دون بيع حسابات أو بيانات أعضاء خاصة.",
    descriptionEn: "Structured research on public business pages and communities to understand audiences, channels, and opportunities—never private member accounts or hidden data.",
    useCasesAr: ["تحليل المنافسين", "رصد المجتمعات", "اكتشاف قنوات التوزيع"],
    useCasesEn: ["Competitor research", "Community mapping", "Distribution discovery"],
    fieldsAr: ["اسم الصفحة", "الرابط العام", "المجال", "الدولة", "ملاحظات الجمهور"],
    fieldsEn: ["Page name", "Public URL", "Category", "Country", "Audience notes"],
    tone: "violet", icon: "facebook", statusAr: "بيانات أفراد · تحتاج ترخيصاً", statusEn: "People data · licensing required", priceAr: "Text يبدأ من 150$", priceEn: "Text from $150", deliveryAr: "3–5 أيام عمل", deliveryEn: "3–5 business days", customerPlayAr: "تغطية معلنة تبلغ 553 مليون سجل من 106 دول بصيغة Text، مع استخدام قانوني ومصدر مرخّص فقط. لا نعرض سجلات أفراد أو نبيعها دون أساس قانوني.", customerPlayEn: "Advertised coverage is 553M records across 106 countries in Text format, subject to lawful use and licensed sourcing. No individual records are displayed or sold without a legal basis.", iconPath: "/platform-logos/facebook.svg", officialUrl: "https://www.facebook.com/", coverageAr: "553 مليون سجل · 106 دول · النسخة Text", coverageEn: "553M records · 106 countries · Text edition", formatVariantsAr: ["Text: يبدأ من 150$", "SQLite: 150$–600$ حسب عدد الدول", "106 دول: 600$"], formatVariantsEn: ["Text: from $150", "SQLite: $150–$600 by country count", "106 countries: $600"],
  },
  {
    id: "reddit-communities",
    name: "Reddit Community Intelligence",
    labelAr: "بيانات مجتمعات Reddit",
    labelEn: "Reddit community intelligence",
    descriptionAr: "خريطة للمجتمعات والموضوعات والأسئلة المتكررة المناسبة للمنتج، لتحويل صوت المجتمع إلى محتوى ورسائل وفرص منتج.",
    descriptionEn: "A map of communities, topics, and recurring questions that can turn community voice into content, messaging, and product opportunities.",
    useCasesAr: ["اكتشاف احتياجات السوق", "أبحاث المحتوى", "اختبار الرسائل"],
    useCasesEn: ["Market discovery", "Content research", "Messaging tests"],
    fieldsAr: ["اسم المجتمع", "الموضوعات", "لغة النقاش", "حجم المجتمع", "أمثلة عامة"],
    fieldsEn: ["Subreddit", "Topics", "Discussion language", "Community size", "Public examples"],
    tone: "orange", icon: "reddit", statusAr: "مصادر عامة", statusEn: "Public signals", priceAr: "يبدأ من 300$", priceEn: "From $300", deliveryAr: "3–5 أيام عمل", deliveryEn: "3–5 business days", customerPlayAr: "حلّل الأسئلة المتكررة ونقاط الألم، ثم أنشئ محتوى تعليميًا وحالات استخدام تساعدك على جذب عملاء لديهم مشكلة واضحة.", customerPlayEn: "Analyze recurring questions and pain points, then create educational content and use cases that attract customers with a clear problem.", iconPath: "/platform-logos/reddit.svg", officialUrl: "https://www.reddit.com/",
  },
  {
    id: "truecaller-business",
    name: "Business Contact Verification",
    labelAr: "تحقق من بيانات التواصل التجارية",
    labelEn: "Business contact verification",
    descriptionAr: "خدمة تحقق وتنظيف لبيانات التواصل التجارية التي يملكها العميل أو حصل عليها بإذن، مع إزالة التكرار وتحسين الصيغة وتصنيف الاستخدام.",
    descriptionEn: "A verification and hygiene service for business contact data owned by the client or collected with permission, including deduplication, formatting, and use classification.",
    useCasesAr: ["تنظيف CRM", "تقليل التكرار", "تحسين جودة البيانات"],
    useCasesEn: ["CRM hygiene", "Deduplication", "Data quality improvement"],
    fieldsAr: ["حالة الرقم", "البلد", "نوع النشاط", "مصدر الإدخال", "درجة الثقة"],
    fieldsEn: ["Number status", "Country", "Business type", "Input source", "Confidence score"],
    tone: "green", icon: "phone", statusAr: "يتطلب مصدرًا مصرحًا", statusEn: "Permission required", priceAr: "يبدأ من 250$", priceEn: "From $250", deliveryAr: "2–4 أيام عمل", deliveryEn: "2–4 business days", customerPlayAr: "نظّف بيانات العملاء التجاريين التي تملكها بإذن، وقلّل الأرقام المكررة والأخطاء قبل تشغيل حملات متابعة أو خدمة عملاء.", customerPlayEn: "Clean business contacts you own or have permission to use, reducing duplicates and errors before follow-up or customer-success campaigns.", iconPath: "/platform-logos/truecaller.png", officialUrl: "https://www.truecaller.com/",
  },
  {
    id: "zoominfo-workflow",
    name: "ZoomInfo-Ready Enrichment",
    labelAr: "Enrichment جاهز لسير عمل ZoomInfo",
    labelEn: "ZoomInfo-ready enrichment workflow",
    descriptionAr: "إعداد خرائط حقول وقواعد enrichment وربط CRM باستخدام اشتراك العميل المرخّص، دون نسخ أو إعادة بيع قاعدة ZoomInfo.",
    descriptionEn: "Field mapping, enrichment rules, and CRM workflows using the client’s licensed subscription—without copying or reselling the ZoomInfo database.",
    useCasesAr: ["توحيد الحقول", "تشغيل CRM", "تأهيل الحسابات"],
    useCasesEn: ["Field normalization", "CRM workflows", "Account qualification"],
    fieldsAr: ["حقل الشركة", "حقل الدور", "قواعد المطابقة", "حالة السجل", "وجهة التصدير"],
    fieldsEn: ["Company field", "Role field", "Match rules", "Record status", "Export destination"],
    tone: "navy", icon: "zoominfo", statusAr: "خدمة تنفيذ", statusEn: "Implementation service", priceAr: "يبدأ من 250$", priceEn: "From $250", deliveryAr: "5–10 أيام عمل", deliveryEn: "5–10 business days", customerPlayAr: "حوّل اشتراكك المرخّص إلى شرائح حسابات، إشارات نية شراء، وقواعد CRM تساعد المبيعات على ترتيب العملاء المحتملين لا المستثمرين.", customerPlayEn: "Turn your licensed subscription into account segments, intent signals, and CRM rules that prioritize prospects—not investors.", iconPath: "/platform-logos/zoominfo.ico", officialUrl: "https://www.zoominfo.com/",
  },
  {
    id: "apollo-workflow",
    name: "Apollo Prospecting Workflow",
    labelAr: "سير عمل Apollo للمبيعات",
    labelEn: "Apollo prospecting workflow",
    descriptionAr: "تصميم شرائح البحث، قوائم الحسابات، وقواعد التصدير والتواصل باستخدام مساحة عمل Apollo المرخّصة الخاصة بالعميل.",
    descriptionEn: "Design of search segments, account lists, export rules, and outreach workflows inside the client’s licensed Apollo workspace.",
    useCasesAr: ["قوائم مبيعات B2B", "تقسيم العملاء", "أتمتة المتابعة"],
    useCasesEn: ["B2B sales lists", "Lead segmentation", "Follow-up automation"],
    fieldsAr: ["الشريحة", "الدور", "المنطقة", "مرحلة الحساب", "حالة التواصل"],
    fieldsEn: ["Segment", "Role", "Region", "Account stage", "Outreach status"],
    tone: "teal", icon: "apollo", statusAr: "أفراد وشركات · CSV/JSON", statusEn: "People & companies · CSV/JSON", priceAr: "يبدأ من 150$", priceEn: "From $150", deliveryAr: "3–7 أيام عمل", deliveryEn: "3–7 business days", customerPlayAr: "بيانات أفراد وشركات بحجم ملف معلن يقارب 60GB بصيغ CSV وJSON، وتُسلّم فقط عند ثبوت الترخيص ونطاق الاستخدام المسموح.", customerPlayEn: "People and company data with an advertised file size of about 60GB in CSV and JSON, delivered only after license and permitted-use checks.", iconPath: "/platform-logos/apollo.ico", officialUrl: "https://www.apollo.io/", coverageAr: "أفراد وشركات · ملف يقارب 60GB", coverageEn: "People and companies · about 60GB", formatVariantsAr: ["CSV", "JSON", "يتطلب فحص الترخيص"], formatVariantsEn: ["CSV", "JSON", "License review required"],
  },
  {
    id: "hubspot-enrichment", name: "HubSpot CRM Enrichment", labelAr: "إثراء بيانات HubSpot CRM", labelEn: "HubSpot CRM enrichment",
    descriptionAr: "توحيد حقول CRM وتقسيم العملاء المحتملين وربط مصادر البحث بسير عمل المبيعات داخل HubSpot.", descriptionEn: "Normalize CRM fields, segment prospects, and connect research inputs to sales workflows inside HubSpot.",
    useCasesAr: ["تنظيف CRM", "تقسيم العملاء", "متابعة المبيعات"], useCasesEn: ["CRM hygiene", "Prospect segmentation", "Sales follow-up"],
    fieldsAr: ["الشركة", "القطاع", "مرحلة الصفقة", "مالك الحساب"], fieldsEn: ["Company", "Industry", "Deal stage", "Account owner"],
    tone: "orange", icon: "hubspot", statusAr: "تنفيذ داخل CRM", statusEn: "CRM implementation", priceAr: "يبدأ من 200$", priceEn: "From $200", deliveryAr: "4–7 أيام عمل", deliveryEn: "4–7 business days", customerPlayAr: "حوّل بيانات البحث إلى مراحل واضحة داخل CRM، ووزّع المتابعة على الفريق بدل فقدان العملاء المحتملين في ملفات منفصلة.", customerPlayEn: "Turn research inputs into clear CRM stages and team follow-up instead of losing prospects in separate files.", iconPath: "/platform-logos/hubspot.svg", officialUrl: "https://www.hubspot.com/",
  },
  {
    id: "clickup-workspace", name: "ClickUp Growth Workspace", labelAr: "بيانات وسير عمل ClickUp للنمو", labelEn: "ClickUp growth workspace",
    descriptionAr: "بناء مساحة عمل تربط العملاء المحتملين بالمهام والحملات والمحتوى ومراحل التسليم للفريق.", descriptionEn: "A growth workspace connecting prospects to tasks, campaigns, content, and delivery stages for the team.",
    useCasesAr: ["إدارة العملاء", "توزيع المهام", "لوحة متابعة النمو"], useCasesEn: ["Lead operations", "Task assignment", "Growth dashboard"],
    fieldsAr: ["الحساب", "المهمة التالية", "الأولوية", "حالة التنفيذ"], fieldsEn: ["Account", "Next task", "Priority", "Execution status"],
    tone: "teal", icon: "clickup", statusAr: "تصميم نظام", statusEn: "System design", priceAr: "يبدأ من 200$", priceEn: "From $200", deliveryAr: "4–7 أيام عمل", deliveryEn: "4–7 business days", customerPlayAr: "حوّل كل فرصة عميل إلى مهمة ومسؤول وموعد نهائي، مع متابعة ما بعد الاجتماع حتى الإغلاق أو التعلم.", customerPlayEn: "Turn every customer opportunity into an owner, task, and due date, with follow-up through close or learning.", iconPath: "/platform-logos/clickup.svg", officialUrl: "https://clickup.com/",
  },
  {
    id: "google-maps-business", name: "Google Maps Business Discovery", labelAr: "اكتشاف الشركات المحلية عبر Google Maps", labelEn: "Google Maps business discovery",
    descriptionAr: "خريطة للشركات المحلية والفئات والمناطق المستهدفة لبناء شراكات وتوزيع وعروض B2B، باستخدام البيانات العامة فقط.", descriptionEn: "A map of local businesses, categories, and target areas for B2B partnerships, distribution, and offers using public business information only.",
    useCasesAr: ["اكتشاف شركاء محليين", "تحديد المناطق", "بناء قوائم B2B"], useCasesEn: ["Local partner discovery", "Territory mapping", "B2B list building"],
    fieldsAr: ["اسم النشاط", "الفئة", "المدينة", "الرابط العام"], fieldsEn: ["Business name", "Category", "City", "Public URL"],
    tone: "blue", icon: "googlemaps", statusAr: "معلومات عامة", statusEn: "Public business data", priceAr: "يبدأ من 150$", priceEn: "From $150", deliveryAr: "3–5 أيام عمل", deliveryEn: "3–5 business days", customerPlayAr: "ابدأ من المناطق التي يوجد فيها العميل المناسب، وابنِ قائمة شراكات وتوزيع بدل إنفاق الميزانية على جمهور عام.", customerPlayEn: "Start with territories where the right customer exists and build partnership and distribution lists instead of buying a broad audience.", iconPath: "/platform-logos/googlemaps.svg", officialUrl: "https://www.google.com/maps/",
  },
];
