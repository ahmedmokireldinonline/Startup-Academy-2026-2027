export type AcademyBook = {
  id: string;
  title: string;
  author: string;
  image: string;
  pdfPath: string;
  importance: string;
  projects: string;
  tags: string[];
};

export type BookCatalog = {
  id: string;
  name: string;
  subtitle: string;
  books: AcademyBook[];
};

const pdf = (path: string) => `/pdf-library/${path}`;

export const bookCatalogs: BookCatalog[] = [
  {
    id: "business-models",
    name: "كتالوج نماذج الأعمال وبناء المنتج",
    subtitle: "أغلفة أصلية من مجموعة Business Models - Super Guides Bundle الموجودة في المستودع.",
    books: [
      { id: "mvp", title: "Minimum Viable Product (MVP)", author: "Business Models Super Guides", image: "/book-covers/mvp.jpg", pdfPath: pdf("Business%20Models%20-%20Super%20Guides%20Bundle/17.%20Minimum-Viable-Product-MVP-txseve.pdf"), importance: "يساعد الفريق على تحديد أصغر منتج يثبت القيمة قبل بناء منظومة كبيرة.", projects: "MVP، SaaS، EdTech، ومنتجات AI في مرحلة التحقق.", tags: ["MVP", "Validation"] },
      { id: "business-model-canvas", title: "Business Model Canvas Explained", author: "Business Models Super Guides", image: "/book-covers/business-model-canvas.jpg", pdfPath: pdf("Business%20Models%20-%20Super%20Guides%20Bundle/52.%20Business_Model_Canvas_Explained-bhmuli.pdf"), importance: "يحول فكرة الشركة إلى نموذج واضح للقيمة والعملاء والقنوات والتكاليف.", projects: "تخطيط الشركات، المنصات، والخدمات المؤسسية.", tags: ["Strategy", "Canvas"] },
      { id: "product-market-fit", title: "Super Guide: Product-Market Fit", author: "Business Models Super Guides", image: "/book-covers/product-market-fit.jpg", pdfPath: pdf("Business%20Models%20-%20Super%20Guides%20Bundle/27.%20Super_Guide_Product_Market_Fit-javh8c.pdf"), importance: "يضع إطارًا لاختبار التوافق بين المشكلة والحل والسوق قبل التوسع.", projects: "SaaS، التطبيقات، وفرق اكتشاف المنتج.", tags: ["PMF", "Customers"] },
      { id: "go-to-market", title: "Go-to-Market Strategies", author: "Business Models Super Guides", image: "/book-covers/go-to-market.jpg", pdfPath: pdf("Business%20Models%20-%20Super%20Guides%20Bundle/54.%20Go-to-Market_Strategies-px4w6a.pdf"), importance: "يساعدك على اختيار العميل المثالي والرسالة والقناة وخطة الإطلاق.", projects: "B2B SaaS، Cloud، ومشاريع التوسع التجاري.", tags: ["GTM", "Growth"] },
      { id: "saas-business-model", title: "Super Guide: SaaS Business Model", author: "Business Models Super Guides", image: "/book-covers/saas-business-model.jpg", pdfPath: pdf("Business%20Models%20-%20Super%20Guides%20Bundle/13.%20Super-Guide-SaaS-Business-Model-4-xnexrn.pdf"), importance: "يشرح عناصر نموذج SaaS ومؤشرات الإيراد والاحتفاظ والتوسع.", projects: "SaaS، اشتراكات B2B، ومنتجات Cloud.", tags: ["SaaS", "Metrics"] },
      { id: "edtech-business-model", title: "EdTech Business Model", author: "Business Models Super Guides", image: "/book-covers/edtech-business-model.jpg", pdfPath: pdf("Business%20Models%20-%20Super%20Guides%20Bundle/15.%20EdTech_Business_Model-q5nnpi.pdf"), importance: "يربط نموذج الإيراد بتجربة المتعلم والمؤسسة والنتيجة التعليمية.", projects: "EdTech، الجامعات، التدريب، ومنصات التعلم.", tags: ["EdTech", "Education"] },
    ],
  },
  {
    id: "business-explained",
    name: "كتالوج الإدارة والـ AI والتنفيذ",
    subtitle: "أغلفة أصلية من مجلد Business Explained داخل المستودع، مناسبة لفرق التنفيذ والنمو.",
    books: [
      { id: "artificial-intelligence", title: "Artificial Intelligence Explained", author: "Business Explained", image: "/book-covers/artificial-intelligence.jpg", pdfPath: pdf("Business%20Explained/Artificial-Intelligence-EXPLAINED-by-Business-Explained-v6.pdf"), importance: "مدخل عملي لفهم فرص الذكاء الاصطناعي واختيار حالات استخدام قابلة للتطبيق.", projects: "AI SaaS، الأتمتة، التعليم، وتحول المؤسسات.", tags: ["AI", "Automation"] },
      { id: "machine-learning", title: "Machine Learning Explained", author: "Business Explained", image: "/book-covers/machine-learning.jpg", pdfPath: pdf("Business%20Explained/Machine-Learning-EXPLAINED-by-Business-Explained-v2.pdf"), importance: "يبني لغة مشتركة بين الفرق التجارية والتقنية حول النماذج والبيانات.", projects: "تحليلات، تنبؤ، توصيات، ومنتجات تعتمد على البيانات.", tags: ["ML", "Data"] },
      { id: "agile-manual", title: "Agile Manual", author: "Business Explained", image: "/book-covers/agile-manual.jpg", pdfPath: pdf("Business%20Explained/Agile-Manual-by-Business-Explained-v2.pdf"), importance: "يحول العمل إلى دورات قصيرة بتغذية راجعة وتسليم مستمر.", projects: "فرق البرمجيات، MVP، وفرق المنتجات متعددة التخصصات.", tags: ["Agile", "Delivery"] },
      { id: "strategic-management", title: "Strategic Management Explained", author: "Business Explained", image: "/book-covers/strategic-management.jpg", pdfPath: pdf("Business%20Explained/Strategic-Management-Explained-by-Business-Explained-v3.pdf"), importance: "يساعد القيادة على ربط الرؤية بالأهداف والقرارات والموارد.", projects: "الشركات المتوسطة، المؤسسات التعليمية، والتوسع.", tags: ["Strategy", "Leadership"] },
      { id: "financial-management", title: "Financial Management Explained", author: "Business Explained", image: "/book-covers/financial-management.jpg", pdfPath: pdf("Business%20Explained/Financial-Management-EXPLAINED-by-Business-Explained-v5.pdf"), importance: "يمنح الفريق أساسًا لفهم التدفق النقدي والتكاليف والقرارات المالية.", projects: "النماذج المالية، التسعير، والاستعداد للاستثمار.", tags: ["Finance", "Runway"] },
      { id: "project-management", title: "Project Management Explained", author: "Business Explained", image: "/book-covers/project-management.jpg", pdfPath: pdf("Business%20Explained/Project-Management-Explained-by-Business-Explained-v4.pdf"), importance: "ينظم النطاق والمسؤوليات والمخاطر والتسليم من البداية إلى النهاية.", projects: "تنفيذ Cloud، التحول الرقمي، ومشاريع المؤسسات.", tags: ["Projects", "Operations"] },
    ],
  },
];
