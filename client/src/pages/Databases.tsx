import { type FormEvent, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Check,
  Calculator,
  CheckCircle2,
  Database,
  Download,
  Filter,
  Globe2,
  HardDrive,
  LayoutGrid,
  List,
  Mail,
  MessageCircle,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Table2,
  Truck,
  Users,
} from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { databaseSources, type DatabaseSource } from "@/data/databases";
import { trpc } from "@/lib/trpc";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import MotionTicker from "@/components/MotionTicker";

const PHONE = "201012025650";
type Language = "ar" | "en";
type ViewMode = "cards" | "table" | "bundles";
type CatalogFilter = "all" | "research" | "workflow";

const colorMap: Record<string, string> = {
  blue: "db-tone-blue",
  violet: "db-tone-violet",
  orange: "db-tone-orange",
  green: "db-tone-green",
  navy: "db-tone-navy",
  teal: "db-tone-teal",
};

const bundleData = [
  { id: "market", icon: Globe2, tone: "blue", nameAr: "بندل اكتشاف السوق", nameEn: "Market Discovery Bundle", descriptionAr: "خريطة منظمة للشركات والقطاعات والأسواق تساعدك على تقييم المنافسة واختيار نقطة الدخول.", descriptionEn: "A structured map of companies, sectors, and markets for competitive research and market entry.", includesAr: ["الشركات حسب الدولة والقطاع", "المواقع الرسمية ونموذج العمل", "ملخص المنافسة وفرص التوسع"], includesEn: ["Companies by country and sector", "Official sites and business model", "Competition and expansion summary"], bestAr: "لدراسة سوق جديد وبناء قائمة منافسين", bestEn: "For entering a new market and mapping competitors" },
  { id: "commerce", icon: BarChart3, tone: "violet", nameAr: "التجارة الإلكترونية والجمهور", nameEn: "E-commerce & Audience Bundle", descriptionAr: "بيانات المتاجر والمنصات مع مؤشرات الجمهور وسلوك الشراء المجمع لآخر ثلاث سنوات.", descriptionEn: "E-commerce companies with aggregated audience and purchase-behavior signals across three years.", includesAr: ["العملاء الجدد والمتكررون", "متوسط قيمة الطلب والنمو", "الأسواق والفئات الأعلى طلباً"], includesEn: ["New and repeat customers", "Average order value and growth", "Top markets and categories"], bestAr: "للتسويق وتطوير المنتجات والاستحواذ", bestEn: "For marketing, product, and acquisition teams" },
  { id: "beauty", icon: Sparkles, tone: "pink", nameAr: "الجمال والعناية الشخصية", nameEn: "Beauty & Personal Care Bundle", descriptionAr: "كتالوج شركات التجميل وأدوات تصفيف الشعر والصالونات والمنصات المتخصصة.", descriptionEn: "A catalog of beauty, hair-care, salon, and specialized commerce companies.", includesAr: ["العلامات والمتاجر والمنصات", "الأسواق الأعلى طلباً", "إعادة الشراء والفئات النامية"], includesEn: ["Brands, stores, and platforms", "Highest-demand markets", "Repeat purchase and growing categories"], bestAr: "لإطلاق علامة أو اختيار موزعين", bestEn: "For launching brands and selecting distributors" },
  { id: "mobility", icon: Users, tone: "orange", nameAr: "النقل الذكي واللوجستيات", nameEn: "Smart Mobility & Logistics", descriptionAr: "خريطة شركات النقل والتوصيل والشحن والتخزين في الخليج مع نطاق التغطية ونموذج العمل.", descriptionEn: "A Gulf map of mobility, delivery, shipping, and warehousing companies with coverage and business model.", includesAr: ["المدن والدول المشمولة", "نوع العملاء ونموذج الإيرادات", "مؤشرات الطلب والنمو"], includesEn: ["Cities and countries covered", "Customer type and revenue model", "Demand and growth signals"], bestAr: "للشراكات والاستثمار ودراسة المنافسة", bestEn: "For partnerships, investment, and competitive research" },
  { id: "real-estate", icon: Database, tone: "green", nameAr: "العقارات والفرص العقارية", nameEn: "Real Estate Intelligence", descriptionAr: "بيانات المطورين والمنصات والوسطاء وإدارة الممتلكات والطلب حسب المدينة ونوع العقار.", descriptionEn: "Developers, platforms, brokers, property managers, and demand signals by city and property type.", includesAr: ["سكني وتجاري وإيجار", "المناطق والمدن المستهدفة", "تحليل الجمهور واتجاهات الطلب"], includesEn: ["Residential, commercial, and rental", "Target cities and areas", "Audience and demand trends"], bestAr: "للتسويق العقاري والاستثمار", bestEn: "For real-estate marketing and investment" },
  { id: "retention", icon: ShieldCheck, tone: "navy", nameAr: "العملاء وسلوك الشراء", nameEn: "Customer & Purchase Intelligence", descriptionAr: "تحليل مجمع ومجهّل للعملاء والاحتفاظ وتكرار الشراء وقيمة العميل دون عرض أي بيانات شخصية.", descriptionEn: "Aggregated and anonymized customer, retention, repeat-purchase, and LTV analysis with no personal records.", includesAr: ["العملاء النشطون والاحتفاظ", "التوزيع الجغرافي والشرائح", "اتجاه زمني لآخر ثلاث سنوات"], includesEn: ["Active customers and retention", "Geography and segments", "Three-year trend"], bestAr: "لفرق التسويق وCRM والتحليلات", bestEn: "For marketing, CRM, and analytics teams" },
];

const companyCatalogs = [
  { id: "gulf-mobility", icon: Truck, tone: "orange", labelAr: "شركات النقل الذكي في الخليج", labelEn: "Gulf Smart Mobility Companies", descriptionAr: "كتالوج شركات النقل التشاركي والتوصيل وإدارة الأساطيل والشحن الذكي في السعودية والإمارات والكويت وقطر والبحرين وعُمان.", descriptionEn: "A catalog of ride-hailing, delivery, fleet, and smart-shipping companies across Saudi Arabia, the UAE, Kuwait, Qatar, Bahrain, and Oman.", marketsAr: ["السعودية", "الإمارات", "الكويت", "قطر", "البحرين", "عُمان"], marketsEn: ["Saudi Arabia", "UAE", "Kuwait", "Qatar", "Bahrain", "Oman"], fieldsAr: ["التغطية الجغرافية", "نوع الخدمة", "نموذج العمل", "نوع العميل"], fieldsEn: ["Geographic coverage", "Service type", "Business model", "Customer type"] },
  { id: "hair-commerce", icon: ShoppingBag, tone: "pink", labelAr: "متاجر أدوات تصفيف الشعر أونلاين", labelEn: "Online Hair Styling Stores", descriptionAr: "دليل متاجر ومنصات بيع أدوات تصفيف الشعر والعناية به، مع تصنيف المنتجات والأسواق والقنوات الرقمية.", descriptionEn: "An online directory of hair-styling and hair-care stores, with product, market, and digital-channel classification.", marketsAr: ["الخليج", "الشرق الأوسط", "متاجر إقليمية", "متاجر متخصصة"], marketsEn: ["Gulf", "Middle East", "Regional stores", "Specialist stores"], fieldsAr: ["فئة المنتج", "الدولة", "نطاق الأسعار", "قناة البيع"], fieldsEn: ["Product category", "Country", "Price range", "Sales channel"] },
  { id: "maroof-insights", icon: Store, tone: "blue", labelAr: "كتالوج متاجر معروف", labelEn: "Maroof Store Intelligence", descriptionAr: "تحليل مجمع للمتاجر المسجلة أو الظاهرة في مصادر معروف، مع ربطه بمؤشرات التجارة الإلكترونية والعملاء عند توفرها بإذن.", descriptionEn: "Aggregated intelligence on stores listed in public Maroof sources, connected to e-commerce and customer signals only when permission is available.", marketsAr: ["السعودية", "متاجر إلكترونية", "منشآت موثقة"], marketsEn: ["Saudi Arabia", "Online stores", "Verified businesses"], fieldsAr: ["نشاط المتجر", "المدينة", "رابط المتجر", "حالة التحقق"], fieldsEn: ["Store activity", "City", "Store URL", "Verification status"] },
  { id: "three-year-customers", icon: BarChart3, tone: "navy", labelAr: "تحليل العملاء والاشتراكات — 3 سنوات", labelEn: "Three-Year Customer & Subscription Analysis", descriptionAr: "كتالوج تحليلي للعملاء الذين اشتروا أو اشتركوا خلال آخر ثلاث سنوات، مع اتجاهات الاحتفاظ والتكرار والقيمة بصورة مجمعة ومجهّلة.", descriptionEn: "A three-year analytical catalog for customers who purchased or subscribed, with aggregated retention, repeat, and value trends.", marketsAr: ["2024", "2025", "2026", "حسب الدولة والفئة"], marketsEn: ["2024", "2025", "2026", "By market and segment"], fieldsAr: ["العملاء النشطون", "الشراء المتكرر", "الاحتفاظ", "متوسط قيمة الطلب", "LTV"], fieldsEn: ["Active customers", "Repeat purchase", "Retention", "Average order value", "LTV"] },
];

const bundlePricing = [
  { id: "market", tone: "blue", nameAr: "اكتشاف السوق", nameEn: "Market Discovery", basisAr: "عدد الدول والقطاعات", basisEn: "Countries and sectors", starter: "$150", growth: "$350", customAr: "حسب النطاق", customEn: "Scoped quote" },
  { id: "commerce", tone: "violet", nameAr: "التجارة الإلكترونية والجمهور", nameEn: "E-commerce & Audience", basisAr: "عدد المتاجر وعمق التحليل", basisEn: "Store count and analysis depth", starter: "$250", growth: "$600", customAr: "حسب الجمهور", customEn: "Audience scoped" },
  { id: "beauty", tone: "pink", nameAr: "الجمال والعناية", nameEn: "Beauty & Personal Care", basisAr: "الدول وفئات المنتجات", basisEn: "Markets and product categories", starter: "$200", growth: "$500", customAr: "حسب السوق", customEn: "Market scoped" },
  { id: "mobility", tone: "orange", nameAr: "النقل الذكي واللوجستيات", nameEn: "Smart Mobility & Logistics", basisAr: "المدن ونطاق التغطية", basisEn: "Cities and coverage", starter: "$250", growth: "$650", customAr: "حسب المدن", customEn: "City scoped" },
  { id: "real-estate", tone: "green", nameAr: "العقارات", nameEn: "Real Estate Intelligence", basisAr: "نوع العقار والمناطق", basisEn: "Property type and areas", starter: "$250", growth: "$600", customAr: "حسب المناطق", customEn: "Area scoped" },
  { id: "retention", tone: "navy", nameAr: "العملاء وسلوك الشراء", nameEn: "Customer & Purchase Intelligence", basisAr: "الفترة والشرائح ومؤشرات LTV", basisEn: "Period, segments, and LTV signals", starter: "$350", growth: "$850", customAr: "حسب البيانات", customEn: "Data scoped" },
];

const calculatorOptions = {
  sizes: { small: 1, medium: 1.45, large: 2.15, enterprise: 3.4 },
  formats: { text: 1, csv: 1.12, json: 1.18, sqlite: 1.3 },
  analysis: { basic: 1, segmented: 1.3, advanced: 1.7 },
  delivery: { standard: 1, priority: 1.22 },
} as const;

const calculatorBasePrices: Record<string, number> = { market: 150, commerce: 250, beauty: 200, mobility: 250, "real-estate": 250, retention: 350 };

function inquiryUrl(label: string, isArabic: boolean) {
  const message = isArabic ? `مرحبًا، أريد طلب تفاصيل «${label}». أرجو توضيح الحقول، المصدر، النطاق، السعر، ومدة التسليم.` : `Hello, I would like details for “${label}”. Please share the fields, source, scope, pricing, and delivery time.`;
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}

function sourceKind(source: DatabaseSource) {
  return source.id.includes("workflow") ? "workflow" : "research";
}

function SourceCard({ source, isArabic }: { source: DatabaseSource; isArabic: boolean }) {
  const fields = isArabic ? source.fieldsAr : source.fieldsEn;
  const useCases = isArabic ? source.useCasesAr : source.useCasesEn;
  const label = isArabic ? source.labelAr : source.labelEn;
  return (
    <article className={`database-card ${colorMap[source.tone] || "db-tone-blue"}`}>
      <div className="database-card-top">
        <a className="database-icon" href={source.officialUrl} target="_blank" rel="noreferrer" aria-label={isArabic ? `الموقع الرسمي لـ ${source.name}` : `${source.name} official website`}>
          <img src={source.iconPath} alt="" />
        </a>
        <span className="database-status">{isArabic ? source.statusAr : source.statusEn}</span>
      </div>
      <h3>{label}</h3>
      <p className="database-description">{isArabic ? source.descriptionAr : source.descriptionEn}</p>
      <div className="database-meta-row"><strong>{isArabic ? source.priceAr : source.priceEn}</strong><span>{isArabic ? source.deliveryAr : source.deliveryEn}</span></div>
      {(source.coverageAr || source.formatVariantsAr) && <div className="database-coverage-box"><strong>{isArabic ? "النطاق والصيغ" : "Coverage & formats"}</strong>{source.coverageAr && <span>{isArabic ? source.coverageAr : source.coverageEn}</span>}<div>{(isArabic ? source.formatVariantsAr : source.formatVariantsEn)?.map((variant) => <small key={variant}>{variant}</small>)}</div></div>}
      <div className="database-section-block"><strong>{isArabic ? "ماذا تحصل عليه" : "What you get"}</strong><div className="database-chip-list">{useCases.map((item) => <span key={item}><Check size={12} />{item}</span>)}</div></div>
      <div className="database-section-block"><strong>{isArabic ? "حقول نموذجية" : "Typical fields"}</strong><div className="database-field-list">{fields.map((field) => <span key={field}>{field}</span>)}</div></div>
      <div className="database-card-bottom"><span className="database-source-note"><ShieldCheck size={13} />{isArabic ? "مصدر عام أو مرخّص" : "Public or licensed source"}</span><a className="database-card-cta" href={inquiryUrl(label, isArabic)} target="_blank" rel="noreferrer"><MessageCircle size={14} />{isArabic ? "اطلب التفاصيل" : "Request details"}<ArrowUpRight size={14} /></a></div>
    </article>
  );
}

function CompanyCatalogCard({ catalog, isArabic }: { catalog: (typeof companyCatalogs)[number]; isArabic: boolean }) {
  const Icon = catalog.icon;
  const label = isArabic ? catalog.labelAr : catalog.labelEn;
  const markets = isArabic ? catalog.marketsAr : catalog.marketsEn;
  const fields = isArabic ? catalog.fieldsAr : catalog.fieldsEn;
  return <article className={`company-catalog-card company-catalog-${catalog.tone}`}>
    <div className="company-catalog-icon"><Icon size={22} /></div>
    <div className="company-catalog-heading"><span>{isArabic ? "كتالوج شركات وأسواق" : "Company & market catalog"}</span><ShieldCheck size={15} /></div>
    <h3>{label}</h3>
    <p>{isArabic ? catalog.descriptionAr : catalog.descriptionEn}</p>
    <div className="company-catalog-row"><strong>{isArabic ? "الأسواق" : "Markets"}</strong><div>{markets.map((market) => <span key={market}>{market}</span>)}</div></div>
    <div className="company-catalog-row"><strong>{isArabic ? "الحقول" : "Fields"}</strong><div>{fields.map((field) => <span key={field}>{field}</span>)}</div></div>
    {catalog.id === "three-year-customers" && <div className="company-catalog-timeline"><span>2024</span><i /><span>2025</span><i /><span>2026</span><b>{isArabic ? "شراء واشتراك مجمع" : "Aggregated purchase & subscription"}</b></div>}
    <a className="database-card-cta" href={inquiryUrl(label, isArabic)} target="_blank" rel="noreferrer"><MessageCircle size={14} />{isArabic ? "اطلب الكتالوج" : "Request catalog"}<ArrowUpRight size={14} /></a>
  </article>;
}

type CalculatorSize = keyof typeof calculatorOptions.sizes;
type CalculatorFormat = keyof typeof calculatorOptions.formats;
type CalculatorAnalysis = keyof typeof calculatorOptions.analysis;
type CalculatorDelivery = keyof typeof calculatorOptions.delivery;

function DynamicPriceCalculator({ isArabic }: { isArabic: boolean }) {
  const [bundleId, setBundleId] = useState("market");
  const [countries, setCountries] = useState(3);
  const [size, setSize] = useState<CalculatorSize>("medium");
  const [format, setFormat] = useState<CalculatorFormat>("csv");
  const [analysis, setAnalysis] = useState<CalculatorAnalysis>("segmented");
  const [delivery, setDelivery] = useState<CalculatorDelivery>("standard");
  const selectedBundle = bundlePricing.find((bundle) => bundle.id === bundleId) || bundlePricing[0];
  const estimatedPrice = useMemo(() => {
    const countryFactor = 1 + Math.max(0, countries - 1) * 0.16;
    const raw = calculatorBasePrices[bundleId] * countryFactor * calculatorOptions.sizes[size] * calculatorOptions.formats[format] * calculatorOptions.analysis[analysis] * calculatorOptions.delivery[delivery];
    return Math.max(100, Math.round(raw / 10) * 10);
  }, [analysis, bundleId, countries, delivery, format, size]);
  const calculatorLabel = isArabic ? selectedBundle.nameAr : selectedBundle.nameEn;
  const quoteUrl = inquiryUrl(`${calculatorLabel} — ${estimatedPrice} USD`, isArabic);
  const [booking, setBooking] = useState({ name: "", email: "", phone: "", company: "", country: "" });
  const [bookingResult, setBookingResult] = useState<string | null>(null);
  const [emailStatus, setEmailStatus] = useState<"sending" | "sent" | "failed" | null>(null);
  const createBooking = trpc.registration.create.useMutation();
  const sendConfirmation = trpc.registration.sendConfirmation.useMutation();
  const updateBooking = (key: keyof typeof booking, value: string) => setBooking((current) => ({ ...current, [key]: value }));
  const labels = {
    size: isArabic ? { small: "صغير", medium: "متوسط", large: "كبير", enterprise: "مؤسسي" } : { small: "Small", medium: "Medium", large: "Large", enterprise: "Enterprise" },
    format: isArabic ? { text: "Text", csv: "CSV", json: "JSON", sqlite: "SQLite" } : { text: "Text", csv: "CSV", json: "JSON", sqlite: "SQLite" },
    analysis: isArabic ? { basic: "أساسي", segmented: "مقسّم", advanced: "متقدم" } : { basic: "Basic", segmented: "Segmented", advanced: "Advanced" },
    delivery: isArabic ? { standard: "عادي", priority: "أولوية" } : { standard: "Standard", priority: "Priority" },
  };
  const buildOrderPdf = async (orderId: string) => {
    const pdf = await PDFDocument.create();
    const page = pdf.addPage([595, 842]);
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
    const ink = rgb(0.11, 0.22, 0.18);
    const muted = rgb(0.35, 0.44, 0.39);
    page.drawText("STARTUP ACADEMY", { x: 48, y: 790, size: 11, font: bold, color: rgb(0.18, 0.47, 0.31) });
    page.drawText("Bundle Order Summary", { x: 48, y: 752, size: 25, font: bold, color: ink });
    page.drawText(`Order ID: ${orderId}`, { x: 48, y: 730, size: 10, font, color: muted });
    page.drawText(`Created: ${new Date().toISOString().slice(0, 10)}`, { x: 380, y: 730, size: 10, font, color: muted });
    page.drawLine({ start: { x: 48, y: 708 }, end: { x: 547, y: 708 }, thickness: 1, color: rgb(0.82, 0.88, 0.84) });
    const rows = [["Bundle", calculatorLabel], ["Estimated price", `$${estimatedPrice.toLocaleString()} USD`], ["Countries", String(countries)], ["Data volume", String(labels.size[size])], ["Format", String(labels.format[format])], ["Analysis", String(labels.analysis[analysis])], ["Delivery", String(labels.delivery[delivery])], ["Company", booking.company], ["Contact", `${booking.name} · ${booking.email}`]];
    let y = 670;
    rows.forEach(([label, value]) => { page.drawText(label, { x: 52, y, size: 10, font: bold, color: muted }); page.drawText(value.slice(0, 78), { x: 190, y, size: 11, font, color: ink }); y -= 31; });
    page.drawRectangle({ x: 48, y: 205, width: 499, height: 92, color: rgb(0.93, 0.97, 0.94), borderColor: rgb(0.76, 0.86, 0.79), borderWidth: 1 });
    page.drawText("Important notice", { x: 64, y: 272, size: 11, font: bold, color: rgb(0.18, 0.42, 0.28) });
    page.drawText("This is an indicative, non-binding estimate. Final delivery is subject", { x: 64, y: 250, size: 10, font, color: muted });
    page.drawText("to source verification, licensing, privacy review, and scope confirmation.", { x: 64, y: 233, size: 10, font, color: muted });
    page.drawText("No individual personal records are included in this summary.", { x: 64, y: 216, size: 10, font, color: muted });
    page.drawText("startup-academy-2026-2027.vercel.app/databases", { x: 48, y: 58, size: 9, font, color: muted });
    return new Uint8Array(await pdf.save());
  };
  const pdfToBase64 = (bytes: Uint8Array) => { let binary = ""; const chunkSize = 0x8000; for (let index = 0; index < bytes.length; index += chunkSize) binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize)); return btoa(binary); };
  const submitBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBookingResult(null); setEmailStatus("sending");
    const goal = `Data bundle booking | Bundle: ${calculatorLabel} | Estimate: $${estimatedPrice} USD | Countries: ${countries} | Size: ${labels.size[size]} | Format: ${labels.format[format]} | Analysis: ${labels.analysis[analysis]} | Delivery: ${labels.delivery[delivery]} | Company: ${booking.company}`;
    const result = await createBooking.mutateAsync({ name: booking.name, email: booking.email, phone: booking.phone, country: booking.country, dialCode: "N/A", stage: "Data bundle booking", goal, language: isArabic ? "ar" : "en" });
    setBookingResult(result.registrationId);
    try {
      const pdfBytes = await buildOrderPdf(result.registrationId);
      const emailResult = await sendConfirmation.mutateAsync({ registrationId: result.registrationId, name: booking.name, email: booking.email, company: booking.company, language: isArabic ? "ar" : "en", bundle: calculatorLabel, estimate: `$${estimatedPrice.toLocaleString()} USD`, countries: String(countries), size: labels.size[size], format: labels.format[format], analysis: labels.analysis[analysis], delivery: labels.delivery[delivery], pdfBase64: pdfToBase64(pdfBytes), pdfFileName: `startup-academy-order-${result.registrationId}.pdf` });
      setEmailStatus(emailResult.sent ? "sent" : "failed");
    } catch { setEmailStatus("failed"); }
  };
  const downloadOrderPdf = async () => {
    if (!bookingResult) return;
    const pdfBytes = await buildOrderPdf(bookingResult);
    const url = URL.createObjectURL(new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" }));
    const link = document.createElement("a"); link.href = url; link.download = `startup-academy-order-${bookingResult}.pdf`; link.click(); URL.revokeObjectURL(url);
  };
  return <section className="dynamic-calculator" id="price-calculator"><div className="dynamic-calculator-heading"><div><span className="eyebrow"><Calculator size={14} />{isArabic ? "احسب السعر الإرشادي" : "Calculate an indicative price"}</span><h3>{isArabic ? "خصص البندل حسب احتياجك" : "Customize the bundle to your scope"}</h3><p>{isArabic ? "حرّك الخيارات لترى تقديراً فورياً. السعر النهائي يعتمد على الترخيص ونطاق البيانات والتجهيز الفعلي." : "Adjust the options for an instant estimate. The final quote depends on licensing, data scope, and actual preparation."}</p></div><div className="calculator-result"><small>{isArabic ? "التقدير المبدئي" : "Indicative estimate"}</small><strong>${estimatedPrice.toLocaleString()}</strong><span>USD</span></div></div><div className="calculator-layout"><div className="calculator-controls"><label>{isArabic ? "نوع البندل" : "Bundle type"}<select value={bundleId} onChange={(event) => setBundleId(event.target.value)}>{bundlePricing.map((bundle) => <option value={bundle.id} key={bundle.id}>{isArabic ? bundle.nameAr : bundle.nameEn}</option>)}</select></label><label>{isArabic ? "عدد الدول" : "Countries"}<div className="calculator-range-row"><input type="range" min="1" max="15" value={countries} onChange={(event) => setCountries(Number(event.target.value))} /><output>{countries}</output></div></label><label>{isArabic ? "حجم البيانات" : "Data volume"}<select value={size} onChange={(event) => setSize(event.target.value as CalculatorSize)}>{Object.entries(labels.size).map(([value, text]) => <option value={value} key={value}>{text}</option>)}</select></label><label>{isArabic ? "الصيغة المطلوبة" : "Required format"}<select value={format} onChange={(event) => setFormat(event.target.value as CalculatorFormat)}>{Object.entries(labels.format).map(([value, text]) => <option value={value} key={value}>{text}</option>)}</select></label><label>{isArabic ? "عمق التحليل" : "Analysis depth"}<select value={analysis} onChange={(event) => setAnalysis(event.target.value as CalculatorAnalysis)}>{Object.entries(labels.analysis).map(([value, text]) => <option value={value} key={value}>{text}</option>)}</select></label><label>{isArabic ? "سرعة التسليم" : "Delivery speed"}<select value={delivery} onChange={(event) => setDelivery(event.target.value as CalculatorDelivery)}>{Object.entries(labels.delivery).map(([value, text]) => <option value={value} key={value}>{text}</option>)}</select></label></div><div className="calculator-summary"><div className="calculator-summary-icon"><HardDrive size={23} /></div><strong>{calculatorLabel}</strong><ul><li>{countries} {isArabic ? "دول" : "countries"}</li><li>{labels.size[size]} · {labels.format[format]}</li><li>{labels.analysis[analysis]} · {labels.delivery[delivery]}</li></ul><a className="database-card-cta" href={quoteUrl} target="_blank" rel="noreferrer"><MessageCircle size={14} />{isArabic ? "اطلب عرضاً بهذا النطاق" : "Request this scoped quote"}<ArrowUpRight size={14} /></a><small className="calculator-disclaimer"><ShieldCheck size={13} />{isArabic ? "تقدير غير ملزم، ويخضع لمراجعة المصدر والترخيص والخصوصية." : "Non-binding estimate subject to source, licensing, and privacy review."}</small></div></div><div className="booking-panel"><div className="booking-panel-heading"><div><span className="eyebrow"><Mail size={14} />{isArabic ? "حجز مباشر وربط CRM" : "Direct booking & CRM handoff"}</span><h4>{isArabic ? "أرسل تفاصيل النطاق إلى فريق المبيعات" : "Send this scope to the sales team"}</h4><p>{isArabic ? "سيتم حفظ الطلب في سجل العملاء بحالة جديدة، مع السعر والاختيارات التي حددتها في الحاسبة." : "Your request is saved in the customer pipeline as new, including the estimate and calculator choices."}</p></div>{bookingResult ? <div className="booking-success"><CheckCircle2 size={18} /><strong>{isArabic ? "تم تسجيل الطلب" : "Request saved"}</strong><span>{bookingResult}</span></div> : null}</div>{bookingResult ? <div className="booking-success-message"><CheckCircle2 size={22} /><span>{isArabic ? "تم حفظ طلبك بنجاح. سيتواصل معك الفريق بعد مراجعة النطاق والترخيص." : "Your request was saved. The team will contact you after reviewing scope and licensing."}</span>{emailStatus === "sending" ? <small className="email-status pending">{isArabic ? "جارٍ إرسال التأكيد بالبريد..." : "Sending email confirmation..."}</small> : emailStatus === "sent" ? <small className="email-status sent">{isArabic ? "تم إرسال التأكيد والمرفق إلى بريدك." : "Confirmation and PDF sent to your email."}</small> : emailStatus === "failed" ? <small className="email-status failed">{isArabic ? "تم الحجز، لكن تعذر إرسال البريد تلقائياً." : "Booking saved, but automatic email could not be sent."}</small> : null}<button className="pdf-download-button" type="button" onClick={downloadOrderPdf}><Download size={15} />{isArabic ? "تنزيل ملخص PDF" : "Download PDF summary"}</button></div> : <form className="booking-form" onSubmit={submitBooking}><label>{isArabic ? "الاسم" : "Name"}<input required value={booking.name} onChange={(event) => updateBooking("name", event.target.value)} placeholder={isArabic ? "اسمك الكامل" : "Your full name"} /></label><label>{isArabic ? "البريد الإلكتروني" : "Email"}<input required type="email" value={booking.email} onChange={(event) => updateBooking("email", event.target.value)} placeholder="you@company.com" /></label><label>{isArabic ? "الهاتف" : "Phone"}<input required type="tel" value={booking.phone} onChange={(event) => updateBooking("phone", event.target.value)} placeholder={isArabic ? "رقم التواصل" : "Phone number"} /></label><label>{isArabic ? "الشركة" : "Company"}<input required value={booking.company} onChange={(event) => updateBooking("company", event.target.value)} placeholder={isArabic ? "اسم الشركة" : "Company name"} /></label><label>{isArabic ? "الدولة" : "Country"}<input required value={booking.country} onChange={(event) => updateBooking("country", event.target.value)} placeholder={isArabic ? "الدولة" : "Country"} /></label><div className="booking-form-scope"><strong>{isArabic ? "النطاق الذي سيتم حفظه" : "Scope to be saved"}</strong><span>{calculatorLabel} · {countries} {isArabic ? "دول" : "countries"} · {labels.format[format]} · ${estimatedPrice}</span></div><button className="database-card-cta" type="submit" disabled={createBooking.isPending}><Mail size={14} />{createBooking.isPending ? (isArabic ? "جارٍ حفظ الطلب..." : "Saving request...") : (isArabic ? "حجز وإرسال إلى CRM" : "Book & send to CRM")}<ArrowUpRight size={14} /></button></form>}</div></section>;
}

export default function Databases() {
  const [language, setLanguage] = useState<Language>(() => { try { return localStorage.getItem("startup-academy-language") === "en" ? "en" : "ar"; } catch { return "ar"; } });
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<CatalogFilter>("all");
  const [view, setView] = useState<ViewMode>("cards");
  const isArabic = language === "ar";
  const allUrl = inquiryUrl(isArabic ? "حزمة بيانات B2B مخصصة" : "custom B2B data package", isArabic);
  usePageMeta({ language, titleAr: "كتالوج بيانات الشركات والأسواق", titleEn: "Company & Market Data Catalog", descriptionAr: "كتالوج تفاعلي لبيانات الشركات وتحليلات الجمهور والبندلات التجارية في الشرق الأوسط.", descriptionEn: "An interactive catalog of company data, audience intelligence, and commercial bundles for the Middle East.", path: "/databases", type: "CollectionPage" });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return databaseSources.filter((source) => {
      const haystack = `${source.name} ${source.labelAr} ${source.labelEn} ${source.descriptionAr} ${source.descriptionEn} ${source.fieldsAr.join(" ")} ${source.fieldsEn.join(" ")}`.toLowerCase();
      return (!q || haystack.includes(q)) && (filter === "all" || sourceKind(source) === filter);
    });
  }, [filter, query]);
  const toggleLanguage = () => { const next = isArabic ? "en" : "ar"; setLanguage(next); try { localStorage.setItem("startup-academy-language", next); } catch {} };
  const tickerItems = databaseSources.map((source) => ({ ar: source.labelAr, en: source.labelEn, href: "#catalog" }));

  return <div className="databases-page" dir={isArabic ? "rtl" : "ltr"}>
    <header className="directory-header"><a className="brand" href="/"><span className="brand-mark"><Sparkles size={16} /></span><span><strong>Startup Academy</strong><small>{isArabic ? "كتالوج البيانات والأنظمة" : "Data Products & Systems"}</small></span></a><div className="databases-header-actions"><button className="language-switch" onClick={toggleLanguage}>{isArabic ? "English" : "العربية"}</button><a className="directory-back" href="/">{isArabic ? "العودة للرئيسية" : "Back home"}<ArrowUpRight size={15} /></a></div></header>
    <main className="databases-main">
      <section className="databases-hero"><div><span className="eyebrow"><Database size={14} />{isArabic ? "كتالوج بيانات الشرق الأوسط" : "Middle East data catalog"}</span><h1>{isArabic ? <>بيانات منظمة.<br /><em>قرارات أقوى.</em></> : <>Structured data.<br /><em>Stronger decisions.</em></>}</h1><p>{isArabic ? "كتالوج عملي للشركات والأسواق وتحليلات الجمهور في الخليج والشرق الأوسط. اكتشف البيانات، قارن الخيارات، واطلب البندل المناسب لنمو عملك." : "A practical catalog of companies, markets, and audience intelligence across the Gulf and Middle East. Discover, compare, and request the right bundle."}</p><div className="databases-hero-actions"><a className="button button-primary" href={allUrl} target="_blank" rel="noreferrer"><MessageCircle size={16} />{isArabic ? "اطلب حزمة مخصصة" : "Request a custom pack"}</a><a className="button button-secondary" href="#catalog">{isArabic ? "استكشف الكتالوج" : "Explore catalog"}<ArrowUpRight size={15} /></a></div></div><div className="database-hero-card"><div className="database-hero-orbit"><BarChart3 size={30} /></div><span><Users size={14} />{isArabic ? "ذكاء سوقي قابل للتنفيذ" : "Actionable market intelligence"}</span><strong>{isArabic ? "اكتشف ← قارن ← نمُ" : "Discover → Compare → Grow"}</strong><small>{isArabic ? "بيانات مجمعة ومجهّلة، مصممة للاستخدام التجاري المسؤول." : "Aggregated, anonymized data designed for responsible commercial use."}</small></div></section>
      <section className="database-stat-strip"><div><strong>9+</strong><span>{isArabic ? "منتجات بيانات" : "data products"}</span></div><div><strong>6</strong><span>{isArabic ? "بندلات جاهزة" : "ready bundles"}</span></div><div><strong>3</strong><span>{isArabic ? "سنوات تحليل" : "years of analysis"}</span></div><div><strong>100%</strong><span>{isArabic ? "بيانات مجمعة" : "aggregated data"}</span></div></section>
      <section className="database-trust"><div><ShieldCheck size={19} /><strong>{isArabic ? "مصادر عامة أو مرخّصة" : "Public or licensed sources"}</strong><span>{isArabic ? "نحدد المصدر ونطاق الاستخدام قبل التسليم." : "Source and permitted use are defined before delivery."}</span></div><div><Globe2 size={19} /><strong>{isArabic ? "مقسمة حسب السوق" : "Segmented by market"}</strong><span>{isArabic ? "الدولة والقطاع والجمهور في طبقات واضحة." : "Country, sector, and audience in clear layers."}</span></div><div><Database size={19} /><strong>{isArabic ? "جاهزة للـ CRM" : "CRM-ready"}</strong><span>{isArabic ? "تنظيف وتوحيد وربط مع سير العمل." : "Cleaned, normalized, and mapped to workflows."}</span></div></section>
      <MotionTicker labelAr="استخدامات البيانات" labelEn="Data use cases" items={tickerItems} />
      <section className="company-catalog-section"><div className="database-heading-row"><div><span className="eyebrow"><Globe2 size={14} />{isArabic ? "كتالوجات الشركات المتاحة" : "Available company catalogs"}</span><h2>{isArabic ? "شركات وأسواق قابلة للتحليل" : "Companies and markets ready to analyze"}</h2><p>{isArabic ? "اختر مجالاً محدداً، ثم اطلب نطاق البيانات والحقول المتاحة قبل التسليم. الأيقونات تعريفية للقطاع وليست ادعاءً بملكية الشعارات." : "Choose a focused market, then request the available scope and fields before delivery. Icons identify the sector and do not imply logo ownership."}</p></div><div className="database-count"><strong>{companyCatalogs.length}</strong><span>{isArabic ? "كتالوجات إضافية" : "additional catalogs"}</span></div></div><div className="company-catalog-grid">{companyCatalogs.map((catalog) => <CompanyCatalogCard key={catalog.id} catalog={catalog} isArabic={isArabic} />)}</div></section>
      <section className="bundle-pricing-section"><div className="database-heading-row"><div><span className="eyebrow"><Sparkles size={14} />{isArabic ? "بندلات مميزة للشركات" : "Featured company bundles"}</span><h2>{isArabic ? "سعّر نطاقك، لا تدفع مقابل الزائد" : "Price the scope, not the excess"}</h2><p>{isArabic ? "اختر مستوى البداية أو النمو، ثم نضبط العرض النهائي حسب عدد الدول والسجلات والصيغة وعمق التحليل ومدة التسليم." : "Choose a starter or growth level, then we fine-tune the final quote by country count, records, format, analysis depth, and delivery time."}</p></div><div className="smart-pricing-note"><BarChart3 size={16} /><span>{isArabic ? "تسعير إرشادي قابل للتخصيص" : "Indicative, configurable pricing"}</span></div></div><div className="bundle-pricing-grid">{bundlePricing.map((bundle) => { const label = isArabic ? bundle.nameAr : bundle.nameEn; return <article className={`bundle-pricing-card bundle-${bundle.tone}`} key={bundle.id}><div className="bundle-pricing-top"><span>{label}</span><ShieldCheck size={14} /></div><p>{isArabic ? "يتغير السعر حسب" : "Price adapts to"}: {isArabic ? bundle.basisAr : bundle.basisEn}</p><div className="bundle-price-options"><div><small>{isArabic ? "بداية" : "Starter"}</small><strong>{bundle.starter}</strong></div><div className="bundle-price-featured"><small>{isArabic ? "نمو" : "Growth"}</small><strong>{bundle.growth}</strong></div><div><small>{isArabic ? "مخصص" : "Custom"}</small><strong>{isArabic ? bundle.customAr : bundle.customEn}</strong></div></div><a className="database-card-cta" href={inquiryUrl(label, isArabic)} target="_blank" rel="noreferrer"><MessageCircle size={14} />{isArabic ? "اطلب عرضاً ذكياً" : "Request smart quote"}<ArrowUpRight size={14} /></a></article>; })}</div><div className="smart-pricing-factors"><strong>{isArabic ? "عوامل التسعير" : "Pricing factors"}</strong><span>{isArabic ? "عدد الدول" : "Countries"}</span><span>{isArabic ? "حجم السجلات" : "Record volume"}</span><span>{isArabic ? "Text / SQLite / CSV / JSON" : "Text / SQLite / CSV / JSON"}</span><span>{isArabic ? "التحليل والتقسيم" : "Analysis and segmentation"}</span><span>{isArabic ? "النقل والتخزين" : "Transfer and storage"}</span></div></section>
      <DynamicPriceCalculator isArabic={isArabic} />
      <section className="database-catalog" id="catalog"><div className="database-heading-row"><div><span className="eyebrow"><Search size={14} />{isArabic ? "ابحث واختر نقطة البداية" : "Search and choose a starting point"}</span><h2>{isArabic ? "كتالوج البيانات" : "Data catalog"}</h2><p>{isArabic ? "استكشف خدمات البحث والتحقق والربط، ثم انتقل إلى البندلات المصممة لهدفك التجاري." : "Explore research, verification, and workflow services, then move to bundles built for your commercial goal."}</p></div><div className="database-count"><strong>{filtered.length}</strong><span>{isArabic ? "منتجات ظاهرة" : "visible offers"}</span></div></div>
        <div className="database-toolbar"><label className="database-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={isArabic ? "ابحث عن LinkedIn أو CRM أو قطاع..." : "Search LinkedIn, CRM, or a sector..."} /></label><div className="database-filters"><Filter size={15} /><button className={filter === "all" ? "is-active" : ""} onClick={() => setFilter("all")}>{isArabic ? "الكل" : "All"}</button><button className={filter === "research" ? "is-active" : ""} onClick={() => setFilter("research")}>{isArabic ? "بحث ومصادر" : "Research"}</button><button className={filter === "workflow" ? "is-active" : ""} onClick={() => setFilter("workflow")}>{isArabic ? "تنفيذ وربط" : "Workflows"}</button></div><div className="database-view-switcher"><button className={view === "cards" ? "is-active" : ""} onClick={() => setView("cards")} title={isArabic ? "بطاقات" : "Cards"}><LayoutGrid size={16} /><span>{isArabic ? "بطاقات" : "Cards"}</span></button><button className={view === "table" ? "is-active" : ""} onClick={() => setView("table")} title={isArabic ? "جدول" : "Table"}><Table2 size={16} /><span>{isArabic ? "جدول" : "Table"}</span></button><button className={view === "bundles" ? "is-active" : ""} onClick={() => setView("bundles")} title={isArabic ? "بندلات" : "Bundles"}><List size={16} /><span>{isArabic ? "بندلات" : "Bundles"}</span></button></div></div>
        {view === "cards" && <div className="database-grid">{filtered.map((source) => <SourceCard key={source.id} source={source} isArabic={isArabic} />)}</div>}
        {view === "table" && <div className="database-table-wrap"><table className="database-table"><thead><tr><th>{isArabic ? "المنتج" : "Product"}</th><th>{isArabic ? "النوع" : "Type"}</th><th>{isArabic ? "الحالة" : "Status"}</th><th>{isArabic ? "السعر" : "Starting"}</th><th>{isArabic ? "التسليم" : "Delivery"}</th><th></th></tr></thead><tbody>{filtered.map((source) => <tr key={source.id}><td><div className="table-product"><span className="database-table-icon"><img src={source.iconPath} alt="" /></span><strong>{isArabic ? source.labelAr : source.labelEn}</strong></div></td><td>{sourceKind(source) === "workflow" ? (isArabic ? "تنفيذ وربط" : "Workflow") : (isArabic ? "بحث ومصادر" : "Research")}</td><td><span className="table-status">{isArabic ? source.statusAr : source.statusEn}</span></td><td>{isArabic ? source.priceAr : source.priceEn}</td><td>{isArabic ? source.deliveryAr : source.deliveryEn}</td><td><a className="table-action" href={inquiryUrl(isArabic ? source.labelAr : source.labelEn, isArabic)} target="_blank" rel="noreferrer">{isArabic ? "اطلب" : "Request"}<ArrowUpRight size={13} /></a></td></tr>)}</tbody></table></div>}
        {view === "bundles" && <div className="bundle-grid">{bundleData.map((bundle) => { const Icon = bundle.icon; const name = isArabic ? bundle.nameAr : bundle.nameEn; const includes = isArabic ? bundle.includesAr : bundle.includesEn; return <article className={`bundle-card bundle-${bundle.tone}`} key={bundle.id}><div className="bundle-icon"><Icon size={22} /></div><span className="bundle-kicker">{isArabic ? "بندل جاهز للطلب" : "Ready-to-request bundle"}</span><h3>{name}</h3><p>{isArabic ? bundle.descriptionAr : bundle.descriptionEn}</p><ul>{includes.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul><div className="bundle-best"><strong>{isArabic ? "مناسب لـ" : "Best for"}</strong><span>{isArabic ? bundle.bestAr : bundle.bestEn}</span></div><a className="database-card-cta" href={inquiryUrl(name, isArabic)} target="_blank" rel="noreferrer"><MessageCircle size={14} />{isArabic ? "اطلب هذا البندل" : "Request this bundle"}<ArrowUpRight size={14} /></a></article>; })}</div>}
        {!filtered.length && view !== "bundles" && <div className="database-empty"><Search size={25} /><strong>{isArabic ? "لا توجد نتائج مطابقة" : "No matching results"}</strong><span>{isArabic ? "جرّب كلمة أخرى أو اطلب حزمة مخصصة." : "Try another search or request a custom pack."}</span></div>}
      </section>
      <section className="database-compliance"><div className="database-compliance-icon"><ShieldCheck size={25} /></div><div><span className="eyebrow">{isArabic ? "البيانات المسؤولة أولاً" : "Responsible data first"}</span><h2>{isArabic ? "تحليلات قوية دون كشف بيانات شخصية" : "Strong analytics without exposing personal data"}</h2><p>{isArabic ? "نعرض تحليلات الجمهور والعملاء بصورة مجمعة ومجهّلة فقط، ولا نعرض أسماء أو أرقام هواتف أو بريدًا إلكترونيًا أو سجلات شراء فردية." : "Audience and customer intelligence is shown only in aggregated, anonymized form. We do not expose names, phone numbers, emails, or individual purchase records."}</p></div></section>
    </main>
  </div>;
}
