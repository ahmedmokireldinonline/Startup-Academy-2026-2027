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
  icon: "linkedin" | "facebook" | "reddit" | "phone" | "zoominfo" | "apollo";
  statusAr: string;
  statusEn: string;
};

export const databaseSources: DatabaseSource[] = [
  {
    id: "linkedin-b2b",
    name: "LinkedIn B2B Intelligence",
    labelAr: "بيانات LinkedIn للشركات B2B",
    labelEn: "LinkedIn B2B intelligence",
    descriptionAr: "حزم بحث وتحديد للشركات وصنّاع القرار، مبنية على معلومات مهنية عامة أو مصادر مرخّصة، مع تقسيم حسب القطاع والدور وحجم الشركة.",
    descriptionEn: "Company and decision-maker research packs built from public professional signals or licensed sources, segmented by sector, role, and company size.",
    useCasesAr: ["تحديد الحسابات المستهدفة", "بناء قوائم ABM", "تخصيص رسائل التواصل"],
    useCasesEn: ["Target-account research", "ABM list building", "Personalized outreach"],
    fieldsAr: ["القطاع", "المسمى الوظيفي", "حجم الشركة", "الدولة", "رابط المصدر"],
    fieldsEn: ["Industry", "Job title", "Company size", "Country", "Source URL"],
    tone: "blue", icon: "linkedin", statusAr: "حسب الطلب", statusEn: "Built to brief",
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
    tone: "violet", icon: "facebook", statusAr: "بحث عام", statusEn: "Public research",
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
    tone: "orange", icon: "reddit", statusAr: "مصادر عامة", statusEn: "Public signals",
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
    tone: "green", icon: "phone", statusAr: "يتطلب مصدرًا مصرحًا", statusEn: "Permission required",
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
    tone: "navy", icon: "zoominfo", statusAr: "خدمة تنفيذ", statusEn: "Implementation service",
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
    tone: "teal", icon: "apollo", statusAr: "تنفيذ داخل حسابك", statusEn: "Built in your account",
  },
];
