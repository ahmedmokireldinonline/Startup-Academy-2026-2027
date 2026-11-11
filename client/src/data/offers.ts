export const ACADEMY_WHATSAPP = "201012025650";

export type AcademyOffer = {
  id: "standard" | "vip";
  name: string;
  nameAr: string;
  price: string;
  priceNumber: number;
  label: string;
  labelAr: string;
  summary: string;
  summaryAr: string;
  benefits: string[];
  benefitsAr: string[];
  featured?: boolean;
};

export const academyOffers: AcademyOffer[] = [
  {
    id: "standard",
    name: "Standard Access",
    nameAr: "الدخول الأساسي",
    price: "$3,000",
    priceNumber: 3000,
    label: "CORE ACCESS",
    labelAr: "البداية المركّزة",
    summary: "A practical starting point for core programs and an organized application path.",
    summaryAr: "بداية عملية للوصول إلى البرامج الأساسية وبناء مسار تقديم منظم.",
    benefits: ["Core grants and Cloud Credits directory", "Program matching by country and project stage", "Personal opportunity list and application plan", "Core program and application updates", "Lifetime access with no automatic renewal"],
    benefitsAr: ["دليل المنح وCloud Credits الأساسي", "ترشيح البرامج حسب الدولة ومرحلة المشروع", "قائمة فرص شخصية وخطة تقديم واضحة", "تحديثات أساسية للبرامج وحالات التقديم", "وصول مدى الحياة دون تجديد تلقائي"],
  },
  {
    id: "vip",
    name: "VIP Full Access",
    nameAr: "الوصول الكامل VIP",
    price: "$7,000",
    priceNumber: 7000,
    label: "FULL ACCESS",
    labelAr: "الوصول الشامل",
    summary: "Comprehensive access with priority review and guidance for founders ready to grow.",
    summaryAr: "وصول شامل مع أولوية المراجعة والتوجيه للمؤسسين والشركات الجاهزة للنمو.",
    benefits: ["Everything in Standard Access", "Regional and global grants and credits", "Official sources and protected application links", "Investor, network, and relationship directory", "Priority company profile and Pitch Deck review", "Cloud and AI Infrastructure growth map", "Lifetime access with no automatic renewal"],
    benefitsAr: ["كل مزايا الدخول الأساسي", "كل المنح والـ credits الإقليمية والعالمية", "المصادر الرسمية وروابط التقديم المحمية", "دليل المستثمرين والشبكات والعلاقات", "أولوية مراجعة ملف الشركة والـ Pitch Deck", "خريطة Cloud وAI Infrastructure للنمو", "وصول مدى الحياة دون تجديد تلقائي"],
    featured: true,
  },
];

export function offerWhatsAppUrl(offer: AcademyOffer) {
  const message = [`مرحبًا، أريد حجز باقة ${offer.nameAr} في Startup Academy 2026–2027.`, `السعر: ${offer.price} — دفع لمرة واحدة.`, `المزايا المطلوبة: ${offer.benefitsAr.slice(0, 4).join(" | ")}.`, "أرغب في معرفة خطوات الحجز وبدء التفعيل عبر WhatsApp."].join("\n");
  return `https://wa.me/${ACADEMY_WHATSAPP}?text=${encodeURIComponent(message)}`;
}
