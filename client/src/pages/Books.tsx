import { ArrowLeft, ArrowUpRight, BookOpen, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useRef } from "react";
import { bookCatalogs, type AcademyBook, type BookCatalog } from "@/data/books";

function BookCard({ book }: { book: AcademyBook }) {
  return <article className="book-card">
    <div className="book-cover-wrap"><img src={book.image} alt={`غلاف كتاب ${book.title}`} loading="lazy" onError={(event) => { event.currentTarget.style.visibility = "hidden"; }} /><span className="book-cover-fallback"><BookOpen size={23} /></span></div>
    <div className="book-card-body"><div className="book-tags">{book.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><h3>{book.title}</h3><small>{book.author}</small><p>{book.importance}</p><div className="book-projects"><strong>يناسب:</strong> {book.projects}</div></div>
  </article>;
}

function Catalog({ catalog }: { catalog: BookCatalog }) {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: number) => track.current?.scrollBy({ left: direction * 340, behavior: "smooth" });
  const loop = [...catalog.books, ...catalog.books];
  return <section className="book-catalog">
    <div className="book-catalog-heading"><div><span className="eyebrow"><BookOpen size={14} /> مجموعة {catalog.books.length} كتب</span><h2>{catalog.name}</h2><p>{catalog.subtitle}</p></div><div className="book-slider-controls"><button onClick={() => move(-1)} aria-label="الكتب السابقة"><ChevronRight size={18} /></button><button onClick={() => move(1)} aria-label="الكتب التالية"><ChevronLeft size={18} /></button></div></div>
    <div className="book-slider book-auto-slider" ref={track}><div className="book-auto-track">{loop.map((book, index) => <BookCard key={`${book.id}-${index}`} book={book} />)}</div></div>
  </section>;
}

export default function Books() {
  return <div className="books-page" dir="rtl">
    <header className="directory-header"><a className="brand" href="/"><span className="brand-mark"><Sparkles size={16} /></span><span><strong>Startup Academy</strong><small>Knowledge Library</small></span></a><a className="directory-back" href="/">العودة للرئيسية <ArrowUpRight size={15} /></a></header>
    <main className="books-main"><section className="books-hero"><span className="eyebrow"><Sparkles size={14} /> Founder reading room</span><h1>كتالوجات مختارة<br /><em>تحول القراءة إلى تطبيق.</em></h1><p>مجموعتان عمليتان للمؤسسين وفرق AI والتعليم والنمو. كل بطاقة توضح لماذا يهم الكتاب وأي نوع من المشاريع يمكن تطبيق أفكاره عليه.</p><a className="button button-primary" href="/dashboard">استكشف الباقات <ArrowLeft size={16} /></a></section>{bookCatalogs.map((catalog) => <Catalog key={catalog.id} catalog={catalog} />)}</main>
  </div>;
}
