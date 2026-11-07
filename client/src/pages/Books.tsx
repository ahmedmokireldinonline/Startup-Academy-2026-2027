import { ArrowLeft, ArrowUpRight, BookOpen, ChevronLeft, ChevronRight, ExternalLink, MessageCircle, Search, Sparkles } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useMemo, useRef, useState } from "react";
import { bookCatalogs, type AcademyBook, type BookCatalog } from "@/data/books";
import { getBookDescription } from "@/data/bookDescriptions";
import { marketingCollections, type MarketingCollection } from "@/data/marketingCollections";

const BOOKING_PHONE = "201012025650";

function whatsappUrl(book: AcademyBook, catalog: BookCatalog, isArabic: boolean) {
  const message = isArabic
    ? `مرحبًا، أريد حجز كتاب «${book.title}» من مجموعة «${catalog.name}». أرجو إرسال التفاصيل والسعر وطريقة التسليم.`
    : `Hello, I would like to reserve “${book.title}” from the “${catalog.name}” collection. Please send me the price and delivery details.`;
  return `https://wa.me/${BOOKING_PHONE}?text=${encodeURIComponent(message)}`;
}

function descriptionFor(book: AcademyBook, isArabic: boolean) {
  return getBookDescription(book, isArabic);
}

function collectionWhatsappUrl(collection: MarketingCollection, isArabic: boolean) {
  const message = isArabic
    ? `مرحبًا، أريد معرفة سعر وحجز مجموعة «${collection.titleAr}» من Startup Academy.`
    : `Hello, I would like to learn the price and reserve “${collection.titleEn}” from Startup Academy.`;
  return `https://wa.me/${BOOKING_PHONE}?text=${encodeURIComponent(message)}`;
}

function MarketingCollectionCard({ collection, isArabic }: { collection: MarketingCollection; isArabic: boolean }) {
  return <article className="marketing-collection-card"><div className="marketing-collection-image"><img src={collection.image} alt={isArabic ? `صورة مجموعة ${collection.titleAr}` : `${collection.titleEn} collection`} loading="lazy" /></div><div className="marketing-collection-content"><span className="eyebrow">{isArabic ? collection.eyebrowAr : collection.eyebrowEn}</span><h2>{isArabic ? collection.titleAr : collection.titleEn}</h2><p>{isArabic ? collection.bodyAr : collection.bodyEn}</p><strong className="marketing-collection-proof">{isArabic ? collection.proofAr : collection.proofEn}</strong><ul>{(isArabic ? collection.benefitsAr : collection.benefitsEn).map((benefit) => <li key={benefit}>{benefit}</li>)}</ul><a className="button button-primary" href={collectionWhatsappUrl(collection, isArabic)} target="_blank" rel="noreferrer"><MessageCircle size={15} /> {isArabic ? "اطلب تفاصيل المجموعة" : "Request collection details"} <ArrowUpRight size={14} /></a></div></article>;
}

function BookCard({ book, catalog, isArabic }: { book: AcademyBook; catalog: BookCatalog; isArabic: boolean }) {
  return <article className="book-card">
    <div className="book-cover-wrap"><img src={book.image} alt={isArabic ? `غلاف كتاب ${book.title}` : `${book.title} cover`} loading="lazy" decoding="async" onError={(event) => { event.currentTarget.style.visibility = "hidden"; }} /><span className="book-cover-fallback"><BookOpen size={23} /></span></div>
    <div className="book-card-body"><div className="book-tags">{book.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><h3>{book.title}</h3><small>{book.author}</small><p><strong className="book-description-label">{isArabic ? "عن الكتاب والاستخدام:" : "About and practical use:"}</strong> {descriptionFor(book, isArabic)}</p><div className="book-card-actions"><a className="book-preview" href={book.pdfPath} target="_blank" rel="noreferrer"><ExternalLink size={13} /> {isArabic ? "عرض الكتاب" : "Preview"}</a><a className="book-reserve" href={whatsappUrl(book, catalog, isArabic)} target="_blank" rel="noreferrer"><MessageCircle size={14} /> {isArabic ? "احجز عبر واتساب" : "Reserve on WhatsApp"}</a></div></div>
  </article>;
}

function Catalog({ catalog, reverse = false, isArabic }: { catalog: BookCatalog; reverse?: boolean; isArabic: boolean }) {
  const track = useRef<HTMLDivElement>(null); const move = (direction: number) => track.current?.scrollBy({ left: direction * 340, behavior: "smooth" }); const loop = [...catalog.books, ...catalog.books];
  return <section className="book-catalog"><div className="book-catalog-heading"><div><span className="eyebrow"><BookOpen size={14} /> {isArabic ? `مجموعة ${catalog.books.length} كتابًا` : `${catalog.books.length}-book collection`}</span><h2>{catalog.name}</h2><p>{catalog.subtitle}</p></div><div className="book-slider-controls"><button onClick={() => move(-1)} aria-label={isArabic ? "الكتب السابقة" : "Previous books"}><ChevronRight size={18} /></button><button onClick={() => move(1)} aria-label={isArabic ? "الكتب التالية" : "Next books"}><ChevronLeft size={18} /></button></div></div><div className="book-slider book-auto-slider" ref={track}><div className={`book-auto-track ${reverse ? "book-auto-track-reverse" : ""}`}>{loop.map((book, index) => <BookCard key={`${book.id}-${index}`} book={book} catalog={catalog} isArabic={isArabic} />)}</div></div><a className="catalog-reserve-all" href={whatsappUrl(catalog.books[0], catalog, isArabic)} target="_blank" rel="noreferrer"><MessageCircle size={15} /> {isArabic ? `احجز مجموعة ${catalog.name} عبر واتساب` : `Reserve the ${catalog.name} collection`}</a></section>;
}

export default function Books() {
  const [language, setLanguage] = useState<"ar" | "en">(() => { try { return localStorage.getItem("startup-academy-language") === "en" ? "en" : "ar"; } catch { return "ar"; } }); const [query, setQuery] = useState(""); const isArabic = language === "ar";
  usePageMeta({ language, titleAr: "مكتبة كتب المؤسسين", titleEn: "Founder Book Library", descriptionAr: "مكتبة عملية لكتب الأعمال والمنتج والتسويق والشركات الناشئة مع استخدامات واضحة.", descriptionEn: "Practical business, product, marketing, and startup books with real use cases.", path: "/books", type: "CollectionPage" });
  const allBooks = useMemo(() => bookCatalogs.flatMap((catalog) => catalog.books.map((book) => ({ book, catalog }))), []); const visible = useMemo(() => { const q = query.trim().toLowerCase(); return allBooks.filter(({ book, catalog }) => !q || `${book.title} ${book.author} ${book.tags.join(" ")} ${catalog.name}`.toLowerCase().includes(q)); }, [allBooks, query]);
  const toggleLanguage = () => { const next = isArabic ? "en" : "ar"; setLanguage(next); try { localStorage.setItem("startup-academy-language", next); } catch {} };
  return <div className="books-page" dir={isArabic ? "rtl" : "ltr"}><header className="directory-header"><a className="brand" href="/"><span className="brand-mark"><Sparkles size={16} /></span><span><strong>Startup Academy</strong><small>Knowledge Library</small></span></a><div className="books-header-actions"><button className="language-switch" onClick={toggleLanguage}>{isArabic ? "English" : "العربية"}</button><a className="directory-back" href="/">{isArabic ? "العودة للرئيسية" : "Back home"} <ArrowUpRight size={15} /></a></div></header><main className="books-main"><section className="books-hero"><span className="eyebrow"><Sparkles size={14} /> {isArabic ? "مكتبة المؤسسين" : "Founder reading room"}</span><h1>{isArabic ? <>كتب عملية<br /><em>تحول المعرفة إلى تنفيذ.</em></> : <>Curated catalogs<br /><em>turn reading into action.</em></>}</h1><p>{isArabic ? "مكتبة عملية للمؤسسين وفرق النمو والمنتجات. كل بطاقة تعرض صورة الغلاف، وصفًا حقيقيًا لموضوع الكتاب، نوع الشركات المستفيدة، وزرًا مباشرًا لحجز الكتاب عبر واتساب." : "A practical library for founders, growth teams, and product leaders. Every card includes a real topic description, a cover image, the teams it helps, and a direct WhatsApp reservation button."}</p><div className="books-hero-actions"><a className="button button-primary" href={`https://wa.me/${BOOKING_PHONE}?text=${encodeURIComponent(isArabic ? "مرحبًا، أريد معرفة باقات مكتبة Startup Academy." : "Hello, I would like to learn about the Startup Academy library bundles.")}`} target="_blank" rel="noreferrer"><MessageCircle size={16} /> {isArabic ? "اسأل عن الباقات" : "Ask about bundles"}</a><label className="books-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={isArabic ? "ابحث عن كتاب أو مجال..." : "Search a book or topic..."} /></label></div><div className="books-proof"><strong>{visible.length}</strong> {isArabic ? "كتابًا قابلًا للحجز" : "books available to reserve"} · <strong>{marketingCollections.length}</strong> {isArabic ? "عروض ومجموعات" : "featured collections"}</div></section>{!query && <section className="marketing-collections"><div className="marketing-collections-heading"><span className="eyebrow"><Sparkles size={14} /> {isArabic ? "اختيارات المؤسسين" : "Founder picks"}</span><h2>{isArabic ? "اختر المجموعة التي تناسب المرحلة التي أنت فيها." : "Choose the collection that fits your next stage."}</h2><p>{isArabic ? "ليست مجرد ملفات PDF؛ إنها مراجع وأدوات تساعدك على التفكير، التنفيذ، والاقتراب من السوق والمستثمرين بثقة أكبر." : "Not just PDF files—these are references and tools to help you think, execute, and approach markets and investors with more confidence."}</p></div><div className="marketing-collections-grid">{marketingCollections.map((collection) => <MarketingCollectionCard key={collection.id} collection={collection} isArabic={isArabic} />)}</div></section>}{query ? <section className="book-search-results"><div className="book-search-heading"><strong>{isArabic ? `نتائج البحث عن «${query}»` : `Search results for “${query}”`}</strong><span>{visible.length}</span></div><div className="book-search-grid">{visible.map(({ book, catalog }) => <BookCard key={book.id} book={book} catalog={catalog} isArabic={isArabic} />)}</div></section> : bookCatalogs.map((catalog, index) => <Catalog key={catalog.id} catalog={catalog} reverse={index % 2 === 1} isArabic={isArabic} />)}</main></div>;
}
