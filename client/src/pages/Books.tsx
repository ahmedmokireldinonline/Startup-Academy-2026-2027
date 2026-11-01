import { ArrowLeft, ArrowUpRight, BookOpen, ChevronLeft, ChevronRight, ExternalLink, MessageCircle, Search, Sparkles } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { bookCatalogs, type AcademyBook, type BookCatalog } from "@/data/books";

const BOOKING_PHONE = "201012025650";

function whatsappUrl(book: AcademyBook, catalog: BookCatalog, isArabic: boolean) {
  const message = isArabic
    ? `مرحبًا، أريد حجز كتاب «${book.title}» من مجموعة «${catalog.name}». أرجو إرسال التفاصيل والسعر وطريقة التسليم.`
    : `Hello, I would like to reserve “${book.title}” from the “${catalog.name}” collection. Please send me the price and delivery details.`;
  return `https://wa.me/${BOOKING_PHONE}?text=${encodeURIComponent(message)}`;
}

function descriptionFor(book: AcademyBook, isArabic: boolean) {
  const title = book.title.toLowerCase();
  const ar: Array<[string, string]> = [
    ["business models in", "يقارن هذا الدليل بين منطق النماذج التجارية في القرن العشرين والقرن الحادي والعشرين، ويساعد المؤسس على فهم التحول نحو المنصات والبيانات والاشتراكات."],
    ["consulting", "يشرح كيف تُبنى أعمال الاستشارات من تحديد المشكلة وتسعير الخبرة إلى تصميم عروض قابلة للتكرار وتحقيق إيراد مستمر."],
    ["fintech", "يركز على نماذج الأعمال في التقنية المالية، ومصادر الإيراد، والثقة، والامتثال، وكيفية تحويل الخدمة المالية إلى منتج قابل للنمو."],
    ["insurtech", "يعرض فرص بناء منتجات التأمين الرقمية، من تجربة العميل وتوزيع المنتج إلى الشراكات وإدارة المخاطر."],
    ["saas", "دليل عملي لبناء شركة SaaS: المشكلة، المنتج، التسعير، الاحتفاظ بالعملاء، المقاييس، ومسار الوصول إلى ملاءمة المنتج للسوق."],
    ["subscription", "يوضح كيف تصمم نموذج الاشتراك، تختار الباقات، تقلل الإلغاء، وتبني إيرادًا متكررًا يمكن التنبؤ به."],
    ["minimum viable", "يشرح كيف تختبر الفكرة بأقل منتج قابل للحياة، وتتعلم من العملاء قبل الاستثمار في بناء منتج كامل."],
    ["open source", "يستعرض طرق تحقيق الدخل من المنتجات مفتوحة المصدر عبر الدعم، الاستضافة، الخدمات المدفوعة، والنسخ المؤسسية."],
    ["pricing", "مرجع لتصميم استراتيجية التسعير واختيار التكتيك المناسب للقيمة، الشريحة المستهدفة، مرحلة المنتج، والمنافسة."],
    ["revenue", "يفكك مصادر الإيراد المختلفة وكيفية اختيار النموذج الذي يوازن بين القيمة للعميل واستدامة الشركة."],
    ["product market fit", "يساعد الفريق على اختبار الحاجة الحقيقية، قياس إشارات التوافق مع السوق، وتحسين المنتج بناءً على الاستخدام لا الافتراضات."],
    ["cost", "يقدم إطارًا لفهم هيكل التكاليف، التكاليف الثابتة والمتغيرة، ونقاط خفض الإنفاق دون إضعاف النمو."],
    ["metrics", "يحول مؤشرات نموذج الأعمال إلى لوحة قياس تساعد المؤسس على متابعة النمو، الربحية، والقرارات الأسبوعية."],
    ["empathy map", "أداة لفهم ما يفكر فيه العميل ويشعر به ويقوله ويفعله، ثم تحويل هذه الملاحظات إلى فرص منتج ورسائل تسويقية."],
    ["artificial intelligence", "مقدمة عملية لفهم الذكاء الاصطناعي وتطبيقاته التجارية، وكيفية اختيار حالات استخدام واقعية بدل مطاردة المصطلحات."],
    ["agile", "دليل لتطبيق العمل الرشيق في فرق المنتجات عبر دورات قصيرة، أولويات واضحة، وتسليم متكرر قابل للتعلم."],
    ["brand", "يشرح بناء العلامة التجارية من التموضع والهوية إلى الرسائل والتجربة التي تجعل الشركة أسهل تذكرًا وثقة."],
    ["content", "مرجع لتصميم محتوى يجذب الجمهور، يشرح القيمة، ويحوله من متابع إلى عميل عبر نظام إنتاج وتوزيع واضح."],
    ["customer journey", "يرسم انتقال العميل من الفضول إلى القرار، ويكشف نقاط الاحتكاك التي يجب تحسينها في التسويق والمبيعات والتجربة."],
    ["customer relationship", "يساعد الشركة على بناء علاقات طويلة مع العملاء عبر التواصل، الخدمة، الاحتفاظ، وبرامج النجاح."],
    ["marketing", "خطة عملية لتنظيم التسويق من تحديد الجمهور والعرض إلى القنوات والحملات وقياس التحويل."],
    ["sales", "مرجع لتحسين عملية البيع، من اكتشاف الاحتياج وبناء العرض إلى التعامل مع الاعتراضات وإغلاق الصفقة."],
    ["leadership", "أفكار وأدوات لبناء قيادة واضحة، اتخاذ قرارات أفضل، وتطوير فريق قادر على التنفيذ في بيئة متغيرة."],
    ["strategy", "يساعد الفريق على تحويل الرؤية إلى خيارات وأولويات وخطة تنفيذ قابلة للقياس."],
  ];
  const match = ar.find(([keyword]) => title.includes(keyword));
  if (isArabic) return match?.[1] || book.importance.replace("دليل عملي لفهم", "مرجع تطبيقي يشرح").replace("وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.", "ويحوّله إلى خطوات يمكن تطبيقها داخل الشركة.");
  const en: Array<[string, string]> = [
    ["business models in", "A practical comparison of twentieth- and twenty-first-century business models, including platforms, data, subscriptions, and scalable digital value."],
    ["consulting", "A guide to building consulting offers, packaging expertise, pricing services, and creating repeatable revenue."],
    ["fintech", "Explores fintech business models, revenue streams, trust, compliance, and the path from financial service to scalable product."],
    ["insurtech", "Covers digital insurance opportunities, customer experience, distribution, partnerships, and risk management."],
    ["saas", "A practical SaaS playbook covering the problem, product, pricing, retention, metrics, and product-market fit."],
    ["subscription", "Explains subscription design, packaging, retention, churn reduction, and predictable recurring revenue."],
    ["minimum viable", "Shows how to test an idea with the smallest useful product and learn from customers before overbuilding."],
    ["open source", "Explores monetization paths for open-source products through support, hosting, services, and enterprise editions."],
    ["pricing", "A reference for pricing strategy and tactics based on value, segment, product stage, and competition."],
    ["product market fit", "Helps teams test real demand, measure market signals, and improve the product from usage evidence."],
    ["artificial intelligence", "An accessible guide to AI concepts and practical business use cases without chasing hype."],
    ["agile", "A guide to short delivery cycles, clear priorities, and continuous learning in product teams."],
    ["brand", "Explains positioning, identity, messaging, and experience so a company becomes easier to remember and trust."],
    ["content", "A practical reference for content that attracts an audience, communicates value, and supports conversion."],
    ["customer journey", "Maps the journey from curiosity to decision and reveals friction across marketing, sales, and experience."],
    ["marketing", "A structured marketing guide covering audience, offer, channels, campaigns, and conversion measurement."],
    ["sales", "A practical sales reference from discovery and offer design to objections and closing."],
  ];
  const matchEn = en.find(([keyword]) => title.includes(keyword));
  return matchEn?.[1] || `A practical reference on ${book.title}, with frameworks that founders and teams can apply to planning, execution, and growth.`;
}

function BookCard({ book, catalog, isArabic }: { book: AcademyBook; catalog: BookCatalog; isArabic: boolean }) {
  return <article className="book-card">
    <div className="book-cover-wrap"><img src={book.image} alt={isArabic ? `غلاف كتاب ${book.title}` : `${book.title} cover`} loading="lazy" onError={(event) => { event.currentTarget.style.visibility = "hidden"; }} /><span className="book-cover-fallback"><BookOpen size={23} /></span></div>
    <div className="book-card-body"><div className="book-tags">{book.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><h3>{book.title}</h3><small>{book.author}</small><p>{descriptionFor(book, isArabic)}</p><div className="book-projects"><strong>{isArabic ? "يناسب:" : "Best for:"}</strong> {book.projects}</div><div className="book-card-actions"><a className="book-preview" href={book.pdfPath} target="_blank" rel="noreferrer"><ExternalLink size={13} /> {isArabic ? "عرض الكتاب" : "Preview"}</a><a className="book-reserve" href={whatsappUrl(book, catalog, isArabic)} target="_blank" rel="noreferrer"><MessageCircle size={14} /> {isArabic ? "احجز عبر واتساب" : "Reserve on WhatsApp"}</a></div></div>
  </article>;
}

function Catalog({ catalog, reverse = false, isArabic }: { catalog: BookCatalog; reverse?: boolean; isArabic: boolean }) {
  const track = useRef<HTMLDivElement>(null); const move = (direction: number) => track.current?.scrollBy({ left: direction * 340, behavior: "smooth" }); const loop = [...catalog.books, ...catalog.books];
  return <section className="book-catalog"><div className="book-catalog-heading"><div><span className="eyebrow"><BookOpen size={14} /> {isArabic ? `مجموعة ${catalog.books.length} كتابًا` : `${catalog.books.length}-book collection`}</span><h2>{catalog.name}</h2><p>{catalog.subtitle}</p></div><div className="book-slider-controls"><button onClick={() => move(-1)} aria-label={isArabic ? "الكتب السابقة" : "Previous books"}><ChevronRight size={18} /></button><button onClick={() => move(1)} aria-label={isArabic ? "الكتب التالية" : "Next books"}><ChevronLeft size={18} /></button></div></div><div className="book-slider book-auto-slider" ref={track}><div className={`book-auto-track ${reverse ? "book-auto-track-reverse" : ""}`}>{loop.map((book, index) => <BookCard key={`${book.id}-${index}`} book={book} catalog={catalog} isArabic={isArabic} />)}</div></div><a className="catalog-reserve-all" href={whatsappUrl(catalog.books[0], catalog, isArabic)} target="_blank" rel="noreferrer"><MessageCircle size={15} /> {isArabic ? `احجز مجموعة ${catalog.name} عبر واتساب` : `Reserve the ${catalog.name} collection`}</a></section>;
}

export default function Books() {
  const [language, setLanguage] = useState<"ar" | "en">(() => { try { return localStorage.getItem("startup-academy-language") === "en" ? "en" : "ar"; } catch { return "ar"; } }); const [query, setQuery] = useState(""); const isArabic = language === "ar";
  const allBooks = useMemo(() => bookCatalogs.flatMap((catalog) => catalog.books.map((book) => ({ book, catalog }))), []); const visible = useMemo(() => { const q = query.trim().toLowerCase(); return allBooks.filter(({ book, catalog }) => !q || `${book.title} ${book.author} ${book.tags.join(" ")} ${catalog.name}`.toLowerCase().includes(q)); }, [allBooks, query]);
  const toggleLanguage = () => { const next = isArabic ? "en" : "ar"; setLanguage(next); try { localStorage.setItem("startup-academy-language", next); } catch {} };
  return <div className="books-page" dir={isArabic ? "rtl" : "ltr"}><header className="directory-header"><a className="brand" href="/"><span className="brand-mark"><Sparkles size={16} /></span><span><strong>Startup Academy</strong><small>Knowledge Library</small></span></a><div className="books-header-actions"><button className="language-switch" onClick={toggleLanguage}>{isArabic ? "English" : "العربية"}</button><a className="directory-back" href="/">{isArabic ? "العودة للرئيسية" : "Back home"} <ArrowUpRight size={15} /></a></div></header><main className="books-main"><section className="books-hero"><span className="eyebrow"><Sparkles size={14} /> {isArabic ? "مكتبة المؤسسين" : "Founder reading room"}</span><h1>{isArabic ? <>كتب عملية<br /><em>تحول المعرفة إلى تنفيذ.</em></> : <>Curated catalogs<br /><em>turn reading into action.</em></>}</h1><p>{isArabic ? "مكتبة عملية للمؤسسين وفرق النمو والمنتجات. كل بطاقة تعرض صورة الغلاف، وصفًا حقيقيًا لموضوع الكتاب، نوع الشركات المستفيدة، وزرًا مباشرًا لحجز الكتاب عبر واتساب." : "A practical library for founders, growth teams, and product leaders. Every card includes a real topic description, a cover image, the teams it helps, and a direct WhatsApp reservation button."}</p><div className="books-hero-actions"><a className="button button-primary" href={`https://wa.me/${BOOKING_PHONE}?text=${encodeURIComponent(isArabic ? "مرحبًا، أريد معرفة باقات مكتبة Startup Academy." : "Hello, I would like to learn about the Startup Academy library bundles.")}`} target="_blank" rel="noreferrer"><MessageCircle size={16} /> {isArabic ? "اسأل عن الباقات" : "Ask about bundles"}</a><label className="books-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={isArabic ? "ابحث عن كتاب أو مجال..." : "Search a book or topic..."} /></label></div><div className="books-proof"><strong>{visible.length}</strong> {isArabic ? "كتابًا قابلًا للحجز" : "books available to reserve"} · <strong>{bookCatalogs.length}</strong> {isArabic ? "مجموعات" : "collections"}</div></section>{query ? <section className="book-search-results"><div className="book-search-heading"><strong>{isArabic ? `نتائج البحث عن «${query}»` : `Search results for “${query}”`}</strong><span>{visible.length}</span></div><div className="book-search-grid">{visible.map(({ book, catalog }) => <BookCard key={book.id} book={book} catalog={catalog} isArabic={isArabic} />)}</div></section> : bookCatalogs.map((catalog, index) => <Catalog key={catalog.id} catalog={catalog} reverse={index % 2 === 1} isArabic={isArabic} />)}</main></div>;
}
