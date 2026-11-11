import { Pause, Play, Sparkles } from "lucide-react";
import { useState } from "react";

type TickerItem = {
  ar: string;
  en: string;
  href?: string;
};

type MotionTickerProps = {
  labelAr: string;
  labelEn: string;
  items: TickerItem[];
  className?: string;
};

export default function MotionTicker({ labelAr, labelEn, items, className = "" }: MotionTickerProps) {
  const [paused, setPaused] = useState(false);
  const language = (() => {
    try { return localStorage.getItem("startup-academy-language") === "en" ? "en" : "ar"; } catch { return "ar"; }
  })();
  const isArabic = language === "ar";
  const loop = items.length > 1 ? [...items, ...items] : items;
  if (!items.length) return null;

  return (
    <section className={`motion-ticker ${paused ? "is-paused" : ""} ${className}`} dir={isArabic ? "rtl" : "ltr"} aria-label={isArabic ? labelAr : labelEn}>
      <div className="motion-ticker-label"><Sparkles size={15} /><span>{isArabic ? labelAr : labelEn}</span></div>
      <div className="motion-ticker-window">
        <div className="motion-ticker-track">
          {loop.map((item, index) => {
            const content = <span className="motion-ticker-item"><span className="motion-ticker-dot" /><strong>{isArabic ? item.ar : item.en}</strong></span>;
            return item.href ? <a href={item.href} key={`${item.en}-${index}`}>{content}</a> : <span key={`${item.en}-${index}`}>{content}</span>;
          })}
        </div>
      </div>
      <button className="motion-ticker-control" type="button" onClick={() => setPaused((value) => !value)} aria-pressed={paused} aria-label={isArabic ? (paused ? "تشغيل الشريط" : "إيقاف الشريط") : (paused ? "Play ticker" : "Pause ticker")} title={isArabic ? (paused ? "تشغيل" : "إيقاف") : (paused ? "Play" : "Pause")}>
        {paused ? <Play size={14} /> : <Pause size={14} />}
        <span>{isArabic ? (paused ? "تشغيل" : "إيقاف") : (paused ? "Play" : "Pause")}</span>
      </button>
    </section>
  );
}
