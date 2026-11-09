import { BookOpen, Database, Facebook, FileSpreadsheet, Github, Globe2, Gauge, Home, Languages, MessageCircle, Share2, UserPlus, Users } from "lucide-react";
import { useState } from "react";

const SITE_URL = "https://startup-academy-2026-2027.vercel.app";
const WHATSAPP = "https://wa.me/201012025650?text=مرحبًا، أريد معرفة تفاصيل Startup Academy";
const WHATSAPP_CHANNEL = "https://whatsapp.com/channel/0029VbDooCVB4hdLbJFCgW0L";

type Language = "ar" | "en";

export default function GlobalChrome() {
  const [language, setLanguage] = useState<Language>(() => { try { return localStorage.getItem("startup-academy-language") === "en" ? "en" : "ar"; } catch { return "ar"; } });
  const isArabic = language === "ar";
  const shareUrl = encodeURIComponent(SITE_URL);
  const navItems = [
    { href: "/", icon: Home, ar: "الرئيسية", en: "Home" },
    { href: "/programs", icon: Globe2, ar: "البرامج", en: "Programs" },
    { href: "/investors", icon: Users, ar: "المستثمرون", en: "Investors" },
    { href: "/books", icon: BookOpen, ar: "المكتبة", en: "Library" },
    { href: "/financial-model", icon: FileSpreadsheet, ar: "النموذج المالي", en: "Financial model" },
    { href: "/financial-analysis", icon: Gauge, ar: "التحليل المالي", en: "Analysis" },
    { href: "/databases", icon: Database, ar: "البيانات", en: "Data" },
    { href: "/dashboard", icon: Users, ar: "الحساب", en: "Dashboard" },
    { href: "/register", icon: UserPlus, ar: "التسجيل", en: "Register" },
  ];
  const toggleLanguage = () => { const next = isArabic ? "en" : "ar"; setLanguage(next); try { localStorage.setItem("startup-academy-language", next); } catch {} window.location.reload(); };
  return <>
    <nav className="global-toolbar" aria-label={isArabic ? "شريط التنقل العام" : "Global navigation"} dir={isArabic ? "rtl" : "ltr"}>
      <div className="global-toolbar-links">{navItems.map(({ href, icon: Icon, ar, en }) => <a href={href} key={href} aria-label={isArabic ? ar : en} title={isArabic ? ar : en}><Icon size={15} /><span>{isArabic ? ar : en}</span></a>)}</div>
      <div className="global-toolbar-socials">
        <button className="toolbar-language" onClick={toggleLanguage} aria-label={isArabic ? "التبديل إلى الإنجليزية" : "Switch to Arabic"} title={isArabic ? "English" : "العربية"}><Languages size={15} /><span>{isArabic ? "English" : "العربية"}</span></button>
        <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp" title="WhatsApp"><MessageCircle size={15} /></a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn" title="LinkedIn"><Share2 size={15} /></a>
        <a href={WHATSAPP_CHANNEL} target="_blank" rel="noreferrer" aria-label="WhatsApp channel" title="WhatsApp channel"><MessageCircle size={15} /></a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook" title="Facebook"><Facebook size={15} /></a>
        <a href="https://github.com/ahmedmokireldinonline/Startup-Academy-2026-2027" target="_blank" rel="noreferrer" aria-label="GitHub repository" title="GitHub"><Github size={15} /></a>
      </div>
    </nav>
    <div className="contact-float" aria-label={isArabic ? "التواصل مع Startup Academy" : "Contact Startup Academy"}>
      <a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={17} /> <span>WhatsApp</span></a>
    </div>
  </>;
}
