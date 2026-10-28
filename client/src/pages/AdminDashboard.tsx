import { useState } from "react";
import { BarChart3, CheckCircle2, Database, FileLock2, Settings2, ShieldCheck, Sparkles, Users, WalletCards } from "lucide-react";

const initialTiers = [
  { id: "standard", name: "Standard Access", price: 3000, description: "المكتبة الأساسية والبرامج القياسية", active: true, members: 0 },
  { id: "vip", name: "VIP Full Access", price: 7000, description: "كل المنح والمصادر والمستثمرين", active: true, members: 0 },
];

export default function AdminDashboard() {
  const [tiers, setTiers] = useState(initialTiers);
  const [saved, setSaved] = useState(false);
  const updateTier = (id: string, field: "name" | "price" | "description", value: string) => setTiers((items) => items.map((item) => item.id === id ? { ...item, [field]: field === "price" ? Number(value) : value } : item));
  return <div className="admin-shell" dir="rtl">
    <header className="dashboard-header admin-header"><a className="brand" href="/"><span className="brand-mark"><Sparkles size={16} /></span><span><strong>Startup Academy</strong><small>Admin Control Center</small></span></a><div className="admin-identity"><ShieldCheck size={16} /> admin@startupacademy.com <a href="/">خروج</a></div></header>
    <main className="admin-main">
      <section className="admin-hero"><div><span className="eyebrow"><Settings2 size={14} /> إدارة المنصة</span><h1>تحكم كامل في <em>الوصول المدفوع.</em></h1><p>إدارة الباقات، المستخدمين، مصادر المستثمرين والروابط المحمية من لوحة واحدة. صلاحيات الإدارة يجب أن تُفرض على الخادم قبل الإنتاج.</p></div><span className="admin-ready"><span className="status-dot" /> Admin workspace</span></section>
      <section className="admin-metrics"><article><span><Users size={17} /> المستخدمون</span><strong>0</strong><small>بانتظار ربط قاعدة البيانات</small></article><article><span><WalletCards size={17} /> إيرادات Lifetime</span><strong>$0</strong><small>يتم تحديثها من Stripe Webhook</small></article><article><span><FileLock2 size={17} /> مصادر محمية</span><strong>0</strong><small>روابط تُدار من الخادم</small></article><article><span><BarChart3 size={17} /> عمليات الوصول</span><strong>0</strong><small>يتم تسجيلها في Audit Log</small></article></section>
      <section className="admin-card"><div className="admin-card-heading"><div><span className="eyebrow"><WalletCards size={14} /> Tier management</span><h2>إدارة الباقات</h2></div><span className="admin-lock"><Database size={14} /> Supabase-backed</span></div><div className="admin-tier-table"><div className="admin-tier-row admin-tier-head"><span>الباقة</span><span>السعر لمرة واحدة</span><span>الوصف</span><span>الحالة</span></div>{tiers.map((tier) => <div className="admin-tier-row" key={tier.id}><label><input value={tier.name} onChange={(e) => updateTier(tier.id, "name", e.target.value)} /></label><label className="price-input"><span>$</span><input type="number" min="1" value={tier.price} onChange={(e) => updateTier(tier.id, "price", e.target.value)} /></label><label><input value={tier.description} onChange={(e) => updateTier(tier.id, "description", e.target.value)} /></label><span className="active-pill"><CheckCircle2 size={14} /> فعال</span></div>)}</div><div className="admin-card-footer"><small>لا يتم حذف الباقة من السجلات السابقة؛ يمكن إيقاف البيع مع الحفاظ على وصول العملاء الحاليين.</small><button className="dashboard-cta" onClick={() => { setSaved(true); window.setTimeout(() => setSaved(false), 2200); }}>{saved ? "تم الحفظ" : "حفظ تغييرات الباقات"}</button></div></section>
      <section className="admin-two-col"><article className="admin-card compact"><div className="admin-card-heading"><h2>المستخدمون والتسجيلات</h2><span className="soft-badge">0 جديد</span></div><p>ستظهر هنا طلبات التسجيل، الشركة، الدولة، المرحلة، حالة التواصل، والباقات المرتبطة.</p><button className="outline-cta"><Users size={15} /> فتح سجل المستخدمين</button></article><article className="admin-card compact"><div className="admin-card-heading"><h2>المصادر المحمية</h2><span className="soft-badge locked">Server only</span></div><p>أضف اسم المستثمر أو البرنامج، حدّد الحد الأدنى للباقة، واترك الرابط الأصلي في قاعدة البيانات فقط.</p><button className="outline-cta"><FileLock2 size={15} /> إدارة المصادر</button></article></section>
    </main>
  </div>;
}
