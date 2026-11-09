import { BookOpen, Facebook, FileSpreadsheet, Github, Home, MessageCircle, Share2 } from "lucide-react";

const SITE_URL = "https://startup-academy-2026-2027.vercel.app";
const WHATSAPP = "https://wa.me/201012025650?text=مرحبًا، أريد معرفة تفاصيل Startup Academy";
const WHATSAPP_CHANNEL = "https://whatsapp.com/channel/0029VbDooCVB4hdLbJFCgW0L";

export default function GlobalChrome() {
  const shareUrl = encodeURIComponent(SITE_URL);
  return <>
    <nav className="global-toolbar" aria-label="Quick navigation">
      <a href="/" aria-label="Home" title="Home"><Home size={16} /></a>
      <a href="/books" aria-label="Knowledge library" title="Knowledge library"><BookOpen size={16} /></a>
      <a href="/financial-model" aria-label="SaaS financial model" title="SaaS financial model"><FileSpreadsheet size={16} /></a>
      <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="Contact us on WhatsApp" title="WhatsApp"><MessageCircle size={16} /></a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn" title="LinkedIn"><Share2 size={16} /></a>
      <a href={WHATSAPP_CHANNEL} target="_blank" rel="noreferrer" aria-label="Open WhatsApp channel" title="WhatsApp channel"><MessageCircle size={16} /></a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook" title="Facebook"><Facebook size={16} /></a>
      <a href="https://github.com/ahmedmokireldinonline/Startup-Academy-2026-2027" target="_blank" rel="noreferrer" aria-label="Open GitHub repository" title="GitHub"><Github size={16} /></a>
    </nav>
    <div className="contact-float" aria-label="Contact Startup Academy">
      <a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={17} /> <span>WhatsApp</span></a>
    </div>
  </>;
}
