import type { AcademyBook } from "./books";

type Description = { ar: string; en: string };

const descriptions: Array<[string[], Description]> = [
  [["business models in"], { ar: "يقارن بين نماذج الأعمال التقليدية والرقمية، مع التركيز على المنصات والبيانات والاشتراكات وكيفية اختيار نموذج قابل للتوسع.", en: "Compares traditional and digital business models, with a focus on platforms, data, subscriptions, and choosing a scalable model." }],
  [["business models sides"], { ar: "يشرح كيف تعمل النماذج متعددة الأطراف، وكيف توازن الشركة بين احتياجات العملاء والموردين والشركاء في المنصة.", en: "Explains multi-sided business models and how platforms balance the needs of customers, suppliers, and partners." }],
  [["business model testing"], { ar: "يقدم طرقًا لاختبار فرضيات نموذج العمل قبل الاستثمار الكبير، من مقابلات العملاء إلى التجارب ومؤشرات التحقق.", en: "Shows how to test business-model assumptions before major investment through customer interviews, experiments, and validation signals." }],
  [["business model evolution", "transitional business"], { ar: "يساعد الشركة على فهم تغيّر نموذج الأعمال والانتقال من نموذج حالي إلى نموذج أكثر ملاءمة للسوق.", en: "Helps a company understand business-model change and move from its current model to one that better fits the market." }],
  [["consulting"], { ar: "يشرح تصميم خدمات الاستشارات، وتغليف الخبرة، وتسعيرها، وبناء عروض قابلة للتكرار والإيراد المستمر.", en: "Covers consulting offers, packaging expertise, service pricing, and building repeatable revenue." }],
  [["fintech"], { ar: "يعرض نماذج الأعمال في التقنية المالية، ومصادر الإيراد، والثقة، والامتثال، وتحويل الخدمة المالية إلى منتج قابل للنمو.", en: "Covers fintech models, revenue streams, trust, compliance, and turning a financial service into a scalable product." }],
  [["insurtech"], { ar: "يستخدم لفهم منتجات التأمين الرقمية وتوزيعها وشراكاتها وتجربة العميل وإدارة المخاطر.", en: "Useful for designing digital insurance products, distribution, partnerships, customer experience, and risk management." }],
  [["saas"], { ar: "دليل لبناء شركة SaaS من المشكلة والمنتج إلى التسعير والاحتفاظ والمقاييس وملاءمة المنتج للسوق.", en: "A guide to building SaaS from problem and product through pricing, retention, metrics, and product-market fit." }],
  [["subscription"], { ar: "يساعد على تصميم باقات الاشتراك، وتحديد القيمة المتكررة، وتقليل الإلغاء، وبناء إيراد يمكن التنبؤ به.", en: "Helps design subscription packages, recurring value, churn reduction, and predictable revenue." }],
  [["edtech"], { ar: "يشرح بناء نموذج عمل للتقنية التعليمية، من المنتج التعليمي والتسعير إلى المؤسسات والمدارس وقنوات التوزيع.", en: "Explains EdTech business models from learning products and pricing to institutions, schools, and distribution." }],
  [["healthtech"], { ar: "يستخدم لتصميم نماذج منتجات صحية رقمية مع مراعاة الثقة والامتثال وتجربة المريض والشراكات.", en: "Useful for digital health products with attention to trust, compliance, patient experience, and partnerships." }],
  [["minimum viable", "mvp"], { ar: "يشرح كيف تختبر الفكرة بأقل منتج قابل للحياة، وتتعلم من العملاء قبل بناء منتج كامل.", en: "Shows how to test an idea with the smallest useful product and learn before building the full product." }],
  [["open-source"], { ar: "يعرض طرق تحقيق الدخل من البرمجيات مفتوحة المصدر عبر الدعم والاستضافة والخدمات والنسخ المؤسسية.", en: "Explores open-source monetization through support, hosting, services, and enterprise editions." }],
  [["pricing"], { ar: "مرجع لتحديد السعر حسب القيمة والشريحة ومرحلة المنتج والمنافسة، مع اختيار التكتيك المناسب للبيع.", en: "A reference for pricing by value, segment, product stage, and competition, with practical pricing tactics." }],
  [["revenue"], { ar: "يفكك مصادر الإيراد ويساعد على اختيار مزيج يوازن بين قيمة العميل واستدامة الشركة.", en: "Breaks down revenue streams and helps choose a mix that balances customer value and company sustainability." }],
  [["product market fit"], { ar: "يساعد الفريق على اختبار الحاجة الحقيقية وقياس إشارات التوافق مع السوق وتحسين المنتج من ملاحظات الاستخدام.", en: "Helps teams test real demand, measure market-fit signals, and improve the product from usage feedback." }],
  [["bundling", "unbundling"], { ar: "يشرح متى تجمع الخدمات في عرض واحد ومتى تفصلها، وكيف يؤثر ذلك على القيمة والتسعير والتوزيع.", en: "Explains when to bundle or unbundle services and how that changes value, pricing, and distribution." }],
  [["cost"], { ar: "يساعد على فهم هيكل التكاليف والتكاليف الثابتة والمتغيرة وخفض الإنفاق دون إضعاف النمو.", en: "Helps understand fixed and variable costs and reduce spending without weakening growth." }],
  [["metrics", "kpi", "scorecard"], { ar: "يحوّل مؤشرات الأداء إلى لوحة متابعة تساعد على قياس النمو والربحية واتخاذ قرارات أسبوعية.", en: "Turns business metrics into a dashboard for tracking growth, profitability, and weekly decisions." }],
  [["empathy map"], { ar: "أداة لفهم ما يفكر فيه العميل ويشعر به ويقوله ويفعله، ثم تحويل ذلك إلى فرص منتج ورسائل.", en: "A tool for understanding what customers think, feel, say, and do, then turning it into product and messaging opportunities." }],
  [["distribution"], { ar: "يساعد على اختيار قنوات الوصول إلى السوق، وبناء الشراكات، وتحديد الطريقة الأقل تكلفة للوصول إلى العملاء.", en: "Helps choose go-to-market channels, build partnerships, and find efficient paths to customers." }],
  [["customer relationship", "customer-success"], { ar: "يبني نظامًا للعلاقات ونجاح العملاء من التواصل والخدمة إلى الاحتفاظ والتوسع داخل الحساب.", en: "Builds a customer-relationship and success system from service and communication to retention and expansion." }],
  [["sales"], { ar: "مرجع لتطوير عملية البيع من اكتشاف الاحتياج وبناء العرض إلى معالجة الاعتراضات وإغلاق الصفقة.", en: "A sales reference covering discovery, offer design, objections, and closing." }],
  [["marketing"], { ar: "ينظم التسويق من فهم الجمهور والعرض إلى اختيار القنوات والحملات وقياس التحويل.", en: "Organizes marketing from audience and offer to channels, campaigns, and conversion measurement." }],
  [["content"], { ar: "يشرح بناء نظام محتوى يجذب الجمهور ويشرح القيمة ويحوّل الاهتمام إلى طلبات أو عملاء.", en: "Explains how to build content systems that attract audiences, communicate value, and support conversion." }],
  [["customer journey"], { ar: "يرسم انتقال العميل من الفضول إلى القرار، ويكشف نقاط الاحتكاك في التسويق والمبيعات والتجربة.", en: "Maps the customer journey from curiosity to decision and reveals friction across marketing, sales, and experience." }],
  [["brand"], { ar: "يشرح التموضع والهوية والرسائل والتجربة التي تجعل الشركة أسهل تذكرًا وأكثر ثقة.", en: "Covers positioning, identity, messaging, and experience so a company is easier to remember and trust." }],
  [["artificial intelligence"], { ar: "مقدمة عملية لاختيار حالات استخدام الذكاء الاصطناعي وربطها بعمليات قابلة للقياس بدل مطاردة المصطلحات.", en: "A practical introduction to selecting AI use cases and connecting them to measurable operations instead of chasing hype." }],
  [["machine learning"], { ar: "يشرح أساسيات التعلم الآلي وكيفية تقييم الحالات التي تستحق نموذجًا وتحديد البيانات المطلوبة.", en: "Explains machine-learning fundamentals, when a model is justified, and what data is needed." }],
  [["agile", "scrum", "kanban"], { ar: "يقدم طريقة لتنظيم العمل في دورات قصيرة، وترتيب الأولويات، وتسليم نتائج قابلة للتعلم باستمرار.", en: "Provides a practical way to organize short cycles, prioritize work, and deliver continuously learnable results." }],
  [["leadership"], { ar: "أفكار وأدوات لبناء قيادة واضحة واتخاذ قرارات أفضل وتطوير فريق قادر على التنفيذ.", en: "Ideas and tools for clear leadership, better decisions, and teams that can execute." }],
  [["strategy", "strategic management", "strategic success"], { ar: "يساعد على تحويل الرؤية إلى اختيارات وأولويات وخطة تنفيذ قابلة للقياس.", en: "Helps turn vision into choices, priorities, and a measurable execution plan." }],
  [["business plan"], { ar: "قالب عملي لتحويل الفكرة إلى خطة أعمال تشمل السوق والعرض والتشغيل والماليات ومراحل التنفيذ.", en: "A practical framework for turning an idea into a plan covering market, offer, operations, finances, and execution." }],
  [["competitive analysis"], { ar: "يوضح كيفية دراسة البدائل والمنافسين وتحديد الفجوة التي يمكن للشركة أن تربح فيها.", en: "Shows how to study alternatives and competitors and identify a winnable market gap." }],
  [["mission", "vision"], { ar: "يساعد على صياغة رسالة ورؤية واضحتين تربطان قرارات الفريق بالاتجاه الذي تريد الشركة الوصول إليه.", en: "Helps define mission and vision so team decisions stay connected to the company direction." }],
  [["mental models"], { ar: "مجموعة أدوات تفكير لتحسين تحليل المشكلات والقرارات والتخطيط في بيئة غير مؤكدة.", en: "A set of thinking tools for better problem analysis, decisions, and planning under uncertainty." }],
  [["brainstorming"], { ar: "تقنيات عملية لتوليد الأفكار وفرزها وتحويلها إلى تجارب أو حلول قابلة للاختبار.", en: "Practical techniques for generating, selecting, and turning ideas into testable experiments or solutions." }],
  [["outsourcing"], { ar: "يساعد على تحديد ما يجب تنفيذه داخليًا وما يمكن إسناده للخارج مع ضبط الجودة والتكلفة.", en: "Helps decide what to keep in-house and what to outsource while managing quality and cost." }],
  [["amazon business", "google business", "real estate business", "foodtech", "wealthtech", "web3", "decentralized"], { ar: "حالة تطبيقية لدراسة منطق نموذج عمل قطاع أو شركة محددة، ومصادر الإيراد والشركاء وقنوات النمو.", en: "A sector or company case study for examining the business model, revenue, partners, and growth channels." }],
  [["change management", "organizational management", "process improvement", "performance management", "productivity", "project management", "risk management", "talent management", "team harmony", "employee engagement", "employee retention", "human resources"], { ar: "مرجع لتحسين طريقة عمل المؤسسة، وتنظيم الفرق والعمليات، وتقليل المخاطر، ورفع جودة التنفيذ.", en: "A practical reference for improving organizational work, teams, processes, risk control, and execution quality." }],
  [["financial management", "financial crisis"], { ar: "يساعد على فهم الإدارة المالية والضغوط والأزمات واتخاذ قرارات أكثر انضباطًا بشأن السيولة والتكلفة.", en: "Helps understand financial management, pressure, and crises so teams can make disciplined liquidity and cost decisions." }],
  [["negotiation"], { ar: "يعرض طرق إعداد التفاوض وفهم المصالح وبناء اتفاقات أفضل مع العملاء والشركاء والموردين.", en: "Covers negotiation preparation, interests, and better agreements with customers, partners, and suppliers." }],
  [["cyber security"], { ar: "يوضح أساسيات حماية الأنظمة والبيانات وتقليل المخاطر الأمنية أثناء بناء المنتج وتشغيله.", en: "Explains the fundamentals of protecting systems and data while building and operating a product." }],
  [["soft skills"], { ar: "مهارات عملية للتواصل والتعاون وحل المشكلات التي يحتاجها الفريق أثناء التنفيذ والتعامل مع العملاء.", en: "Practical communication, collaboration, and problem-solving skills for teams and customer work." }],
];

export function getBookDescription(book: AcademyBook, isArabic: boolean): string {
  const title = book.title.toLowerCase();
  const match = descriptions.find(([keywords]) => keywords.some((keyword) => title.includes(keyword)));
  if (match) return isArabic ? match[1].ar : match[1].en;
  return isArabic
    ? `مرجع تطبيقي عن ${book.title} يساعد الفريق على تحويل المفاهيم إلى قرارات وخطوات قابلة للتنفيذ داخل الشركة.`
    : `A practical reference on ${book.title} for turning the topic into decisions and executable steps inside a company.`;
}
