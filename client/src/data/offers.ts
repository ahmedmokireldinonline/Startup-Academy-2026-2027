export const ACADEMY_WHATSAPP = "201012025650";

export type AcademyOffer = {
  id: "standard" | "vip";
  name: string;
  price: string;
  priceNumber: number;
  label: string;
  summary: string;
  benefits: string[];
};

export const academyOffers: AcademyOffer[] = [
  {
    id: "standard",
    name: "Standard Access",
    price: "$3,000",
    priceNumber: 3000,
    label: "CORE ACCESS",
    summary: "بداية عملية للوصول إلى البرامج القياسية وبناء مسار تقديم منظم.",
    benefits: [
      "دليل المنح وCloud Credits الأساسي",
      "ترشيح البرامج حسب الدولة ومرحلة المشروع",
      "قائمة فرص شخصية وخطة تقديم واضحة",
      "تحديثات أساسية للبرامج وحالات التقديم",
      "وصول مدى الحياة دون تجديد تلقائي",
    ],
  },
  {
    id: "vip",
    name: "VIP Full Access",
    price: "$7,000",
    priceNumber: 7000,
    label: "FULL ACCESS",
    summary: "وصول شامل مع أولوية المراجعة والتوجيه للمؤسسين والشركات الجاهزة للنمو.",
    benefits: [
      "كل مزايا Standard Access",
      "كل المنح والـ credits الإقليمية والعالمية",
      "المصادر الرسمية وروابط التقديم المحمية",
      "دليل المستثمرين والشبكات والعلاقات",
      "أولوية مراجعة ملف الشركة والـ Pitch Deck",
      "خريطة Cloud وAI Infrastructure للنمو",
      "وصول مدى الحياة دون تجديد تلقائي",
    ],
  },
];

export function offerWhatsAppUrl(offer: AcademyOffer) {
  const message = [
    `مرحبًا، أريد حجز باقة ${offer.name} في Startup Academy 2026–2027.`,
    `السعر: ${offer.price} — دفع لمرة واحدة.`,
    `المزايا المطلوبة: ${offer.benefits.slice(0, 4).join(" | ")}.`,
    "أرغب في معرفة خطوات الحجز وبدء التفعيل عبر WhatsApp.",
  ].join("\n");
  return `https://wa.me/${ACADEMY_WHATSAPP}?text=${encodeURIComponent(message)}`;
}
