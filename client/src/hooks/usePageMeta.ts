import { useEffect } from "react";

type PageMeta = {
  language: "ar" | "en";
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  path: string;
  type?: "WebPage" | "CollectionPage" | "ProfilePage";
};

export function usePageMeta({ language, titleAr, titleEn, descriptionAr, descriptionEn, path, type = "WebPage" }: PageMeta) {
  useEffect(() => {
    const isArabic = language === "ar";
    const title = isArabic ? titleAr : titleEn;
    const description = isArabic ? descriptionAr : descriptionEn;
    const siteOrigin = "https://startup-academy-2026-2027.vercel.app";
    const canonical = `${siteOrigin}${path}`;
    document.title = title;
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";

    const setMeta = (name: string, content: string) => {
      let node = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!node) { node = document.createElement("meta"); node.name = name; document.head.appendChild(node); }
      node.content = content;
    };
    const setProperty = (property: string, content: string) => {
      let node = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!node) { node = document.createElement("meta"); node.setAttribute("property", property); document.head.appendChild(node); }
      node.content = content;
    };
    setMeta("description", description);
    setProperty("og:title", title);
    setProperty("og:description", description);
    setProperty("og:type", "website");
    setProperty("og:url", canonical);
    setProperty("og:site_name", "Startup Academy 2026–2027");
    setProperty("og:image", `${siteOrigin}/og-image.svg`);
    setMeta("twitter:card", "summary");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", `${siteOrigin}/og-image.svg`);
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = canonical;
    let schema = document.head.querySelector<HTMLScriptElement>('script[data-page-schema="true"]');
    if (!schema) { schema = document.createElement("script"); schema.type = "application/ld+json"; schema.dataset.pageSchema = "true"; document.head.appendChild(schema); }
    schema.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": type, name: title, description, url: canonical, inLanguage: language });
  }, [language, titleAr, titleEn, descriptionAr, descriptionEn, path, type]);
}
