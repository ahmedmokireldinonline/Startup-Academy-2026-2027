import { useState } from "react";
import { BarChart3, CheckCircle2, Database, FileLock2, Settings2, ShieldCheck, Sparkles, Users, WalletCards } from "lucide-react";
import { trpc } from "@/lib/trpc";
import AdminLogin from "./AdminLogin";

const initialTiers = [
  { id: "standard", name: "Standard Access", price: 3000, description: "المكتبة الأساسية والبرامج القياسية", active: true },
  { id: "vip", name: "VIP Full Access", price: 7000, description: "كل المنح والمصادر والمستثمرين", active: true },
];

export default function AdminDashboard() {
  const me = trpc.auth.me.useQuery();
  const stats = trpc.admin.stats.useQuery(undefined, { enabled: Boolean(me.data && ["admin", "super_admin"].includes(me.data.role)) });
  const registrations = trpc.admin.registrations.useQuery(undefined, { enabled: Boolean(me.data && ["admin", "super_admin"].includes(me.data.role)) });
  const updateRegistration = trpc.admin.updateRegistration.useMutation({ onSuccess: () => registrations.refetch() });
  const [tiers, setTiers] = useState(initialTiers);
  const [saved, setSaved] = useState(false);
  const updateTier = (id: string, field: "name" | "price" | "description", value: string) => setTiers((items) => items.map((item) => item.id === id ? { ...item, [field]: field === "price" ? Number(value) : value } : item));
  if (me.isLoading) return <div className="admin-login-shell" dir="rtl"><main className="admin-login-main"><section className="admin-login-card"><span className="eyebrow">جارٍ التحقق</span><h1>نجهز مساحة الإدارة.</h1><p>يتم التحقق من صلاحية Admin أو Super Admin من الخادم.</p></section></main></div>;
  if (!me.data || !["admin", "super_admin"].includes(me.data.role)) return <AdminLogin />;
  const totalRegistrations = stats.data?.all ?? 0;
  return <div className="admin-shell" dir="rtl">
    <header className="dashboard-header admin-header"><a className="brand" href="/"><span className="brand-mark"><Sparkles size={16} /></span><span><strong>Startup Academy</strong><small>Super Admin Control Center</small></span></a><div className="admin-identity"><ShieldCheck size={16} /> {me.data.email || "admin@startupacademy.com"} <a href="/admin/login">خروج</a></div></header>
    <main className="admin-main">
      <section className="admin-hero"><div><span className="eyebrow"><Settings2 size={14} /> إدارة المنصة</span><h1>تحكم كامل في <em>الوصول المدفوع.</em></h1><p>إدارة الباقات، طلبات التسجيل، حالة العملاء، والمصادر المحمية من مساحة Super Admin واحدة.</p></div><span className="admin-ready"><span className="status-dot" /> {me.data.role === "super_admin" ? "Super Admin" : "Admin"}</span></section>
      <section className="admin-metrics"><article><span><Users size={17} /> طلبات التسجيل</span><strong>{totalRegistrations}</strong><small>{stats.isLoading ? "جارٍ التحميل" : `${stats.data?.new ?? 0} طلبات جديدة`}</small></article><article><span><WalletCards size={17} /> إيرادات محتملة</span><strong>${(totalRegistrations * 3000).toLocaleString()}</strong><small>تقدير على أساس Standard Access</small></article><article><span><FileLock2 size={17} /> برامج متاحة</span><strong>42</strong><small>التقديم محمي فقط</small></article><article><span><BarChart3 size={17} /> مؤهلون</span><strong>{stats.data?.qualified ?? 0}</strong><small>من سجل الطلبات</small></article></section>
      <section className="admin-card"><div className="admin-card-heading"><div><span className="eyebrow"><WalletCards size={14} /> Tier management</span><h2>إدارة الباقات</h2></div><span className="admin-lock"><Database size={14} /> Super Admin only</span></div><div className="admin-tier-table"><div className="admin-tier-row admin-tier-head"><span>الباقة</span><span>السعر لمرة واحدة</span><span>الوصف</span><span>الحالة</span></div>{tiers.map((tier) => <div className="admin-tier-row" key={tier.id}><label><input value={tier.name} onChange={(e) => updateTier(tier.id, "name", e.target.value)} /></label><label className="price-input"><span>$</span><input type="number" min="1" value={tier.price} onChange={(e) => updateTier(tier.id, "price", e.target.value)} /></label><label><input value={tier.description} onChange={(e) => updateTier(tier.id, "description", e.target.value)} /></label><span className="active-pill"><CheckCircle2 size={14} /> فعال</span></div>)}</div><div className="admin-card-footer"><small>Lifetime Access: Standard $3,000 · VIP Full Access $7,000.</small><button className="dashboard-cta" onClick={() => { setSaved(true); window.setTimeout(() => setSaved(false), 2200); }}>{saved ? "تم الحفظ" : "حفظ تغييرات الباقات"}</button></div></section>
      <section className="admin-card"><div className="admin-card-heading"><div><span className="eyebrow"><Users size={14} /> Registration pipeline</span><h2>آخر طلبات التسجيل</h2></div><span className="soft-badge">{registrations.data?.length ?? 0} معروض</span></div><div className="admin-registration-table">{registrations.isLoading ? <p>جارٍ تحميل الطلبات...</p> : registrations.data?.length ? registrations.data.slice(0, 20).map((item) => <div className="admin-registration-row" key={item.id}><div><strong>{item.name}</strong><small>{item.email} · {item.country} · {item.stage}</small></div><select value={item.status} onChange={(event) => updateRegistration.mutate({ id: item.id, status: event.target.value as "new" | "contacted" | "qualified" | "archived" })}><option value="new">جديد</option><option value="contacted">تم التواصل</option><option value="qualified">مؤهل</option><option value="archived">مؤرشف</option></select></div>) : <p>لا توجد تسجيلات بعد.</p>}</div></section>
      <section className="admin-two-col"><article className="admin-card compact"><div className="admin-card-heading"><h2>المستخدمون والتسجيلات</h2><span className="soft-badge">قاعدة البيانات متصلة</span></div><p>تتم إدارة حالة كل طلب من نفس اللوحة مع تحديث مباشر للإحصائيات.</p></article><article className="admin-card compact"><div className="admin-card-heading"><h2>المصادر المحمية</h2><span className="soft-badge locked">Server only</span></div><p>المستخدم يرى البرنامج والمزايا والأهلية، بينما رابط التقديم الرسمي فقط يحتاج تسجيلًا وصلاحية وصول.</p></article></section>
    </main>
  </div>;
}
