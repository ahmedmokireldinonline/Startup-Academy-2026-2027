export type AcademyBook = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  image: string;
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

const cover = (isbn: string) => `https://covers.openlibrary.org/isbn/${isbn}-L.jpg`;

export const bookCatalogs: BookCatalog[] = [
  {
    id: "founder-core",
    name: "كتالوج المؤسس وبناء المنتج",
    subtitle: "كتب تساعدك على فهم المشكلة، اختبار السوق، وبناء منتج قابل للنمو.",
    books: [
      { id: "lean-startup", title: "The Lean Startup", author: "Eric Ries", isbn: "9780307887894", image: cover("9780307887894"), importance: "يحول بناء الشركة إلى تجارب صغيرة وقياس مستمر بدل الإنفاق قبل التحقق.", projects: "MVP، SaaS، EdTech، ومنتجات AI في مرحلة التحقق.", tags: ["MVP", "Validation"] },
      { id: "zero-to-one", title: "Zero to One", author: "Peter Thiel", isbn: "9780804139298", image: cover("9780804139298"), importance: "يساعدك على التفكير في ميزة تنافسية حقيقية بدل تكرار الموجود.", projects: "DeepTech، منصات B2B، والمنتجات التي تستهدف سوقًا جديدًا.", tags: ["Strategy", "Moat"] },
      { id: "mom-test", title: "The Mom Test", author: "Rob Fitzpatrick", isbn: "9781492180746", image: cover("9781492180746"), importance: "دليل عملي لإجراء مقابلات عملاء تكشف المشكلة الحقيقية دون أسئلة منحازة.", projects: "أبحاث العملاء، حلول المؤسسات، وتحقق أفكار الشركات الناشئة.", tags: ["Customers", "Research"] },
      { id: "inspired", title: "Inspired", author: "Marty Cagan", isbn: "9781119387503", image: cover("9781119387503"), importance: "يبني طريقة عمل فرق المنتج وتحويل احتياجات المستخدم إلى قرارات واضحة.", projects: "SaaS، تطبيقات المؤسسات، ومنتجات التعليم الرقمية.", tags: ["Product", "Teams"] },
      { id: "crossing-chasm", title: "Crossing the Chasm", author: "Geoffrey A. Moore", isbn: "9780062292988", image: cover("9780062292988"), importance: "يفسر الانتقال من المستخدمين الأوائل إلى سوق واسع قابل للتوسع.", projects: "B2B SaaS، حلول Cloud، وتقنيات المؤسسات.", tags: ["Go-to-market", "B2B"] },
      { id: "hooked", title: "Hooked", author: "Nir Eyal", isbn: "9781591847786", image: cover("9781591847786"), importance: "يساعدك على تصميم حلقات استخدام مفيدة وأخلاقية تزيد العودة للمنتج.", projects: "تطبيقات المستهلك، المنصات التعليمية، والمنتجات ذات الاستخدام المتكرر.", tags: ["Retention", "UX"] },
    ],
  },
  {
    id: "ai-growth",
    name: "كتالوج AI والنمو والتوسع",
    subtitle: "كتب مناسبة للشركات التي تبني أتمتة وAI وCloud أو تقود تحولًا داخل مؤسسة.",
    books: [
      { id: "ai-superpowers", title: "AI Superpowers", author: "Kai-Fu Lee", isbn: "9781328543967", image: cover("9781328543967"), importance: "يقدم منظورًا عمليًا لتأثير الذكاء الاصطناعي على الأعمال والمهارات والأسواق.", projects: "AI SaaS، التعليم، وخدمات الأتمتة للمؤسسات.", tags: ["AI", "Markets"] },
      { id: "coming-wave", title: "The Coming Wave", author: "Mustafa Suleyman", isbn: "9780593593950", image: cover("9780593593950"), importance: "يساعد فرق القيادة على فهم فرص ومخاطر موجة النماذج والأنظمة الذكية.", projects: "حوكمة AI، منتجات المؤسسات، واستراتيجية الابتكار.", tags: ["AI strategy", "Risk"] },
      { id: "prediction-machines", title: "Prediction Machines", author: "Ajay Agrawal et al.", isbn: "9781633695672", image: cover("9781633695672"), importance: "يبسط اقتصاديات الذكاء الاصطناعي وكيفية اختيار حالات الاستخدام ذات العائد.", projects: "تحليلات، FinTech، لوجستيات، وأتمتة القرار.", tags: ["Economics", "Use cases"] },
      { id: "fourth-revolution", title: "The Fourth Education Revolution", author: "Sir Anthony Seldon", isbn: "9781472926032", image: cover("9781472926032"), importance: "يفتح نقاشًا عمليًا حول دور التقنية والذكاء الاصطناعي في مستقبل التعليم.", projects: "EdTech، الجامعات، التدريب المؤسسي، ومنصات التعلم.", tags: ["Education", "Future"] },
      { id: "measure-what-matters", title: "Measure What Matters", author: "John Doerr", isbn: "9780525536222", image: cover("9780525536222"), importance: "يحول الرؤية إلى أهداف ونتائج قابلة للقياس داخل الفريق.", projects: "شركات النمو، برامج التحول، والفرق متعددة التخصصات.", tags: ["OKRs", "Growth"] },
      { id: "platform-revolution", title: "Platform Revolution", author: "Geoffrey Parker et al.", isbn: "9780393249132", image: cover("9780393249132"), importance: "يشرح بناء المنصات والأسواق متعددة الأطراف وتأثير الشبكة.", projects: "Marketplaces، شبكات التعليم، ومنصات الخدمات الرقمية.", tags: ["Platforms", "Network"] },
    ],
  },
];
