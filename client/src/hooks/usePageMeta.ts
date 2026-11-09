import { useEffect } from "react";

type PageMeta = {
  language: "ar" | "en";
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  path: string;
  type?: "WebPage" | "CollectionPage" | "ProfilePage";
  keywordsAr?: string;
  keywordsEn?: string;
};

const SITE_ORIGIN = "https://startup-academy-2026-2027.vercel.app";
const SITE_NAME = "Startup Academy 2026–2027";

export function usePageMeta({ language, titleAr, titleEn, descriptionAr, descriptionEn, path, type = "WebPage", keywordsAr, keywordsEn }: PageMeta) {
  useEffect(() => {
    const isArabic = language === "ar";
    const title = isArabic ? titleAr : titleEn;
    const description = isArabic ? descriptionAr : descriptionEn;
    const keywords = isArabic ? keywordsAr : keywordsEn;
    const canonical = `${SITE_ORIGIN}${path}`;
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
    const setLink = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
      let node = document.head.querySelector<HTMLLinkElement>(selector);
      if (!node) { node = document.createElement("link"); node.rel = rel; if (hreflang) node.hreflang = hreflang; document.head.appendChild(node); }
      node.href = href;
    };
    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    setMeta("robots", "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
    setProperty("og:title", title);
    setProperty("og:description", description);
    setProperty("og:type", type === "ProfilePage" ? "profile" : "website");
    setProperty("og:url", canonical);
    setProperty("og:site_name", SITE_NAME);
    setProperty("og:locale", isArabic ? "ar_AR" : "en_US");
    setProperty("og:image", `${SITE_ORIGIN}/og-image.svg`);
    setProperty("og:image:alt", `${SITE_NAME} — ${title}`);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", `${SITE_ORIGIN}/og-image.svg`);
    setMeta("twitter:image:alt", title);
    setLink("canonical", canonical);
    setLink("alternate", canonical, "ar");
    setLink("alternate", canonical, "en");
    setLink("alternate", canonical, "x-default");
    let schema = document.head.querySelector<HTMLScriptElement>('script[data-page-schema="true"]');
    if (!schema) { schema = document.createElement("script"); schema.type = "application/ld+json"; schema.dataset.pageSchema = "true"; document.head.appendChild(schema); }
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": type,
      name: title,
      description,
      url: canonical,
      inLanguage: language,
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_ORIGIN },
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_ORIGIN },
    });
  }, [language, titleAr, titleEn, descriptionAr, descriptionEn, path, type, keywordsAr, keywordsEn]);
}
