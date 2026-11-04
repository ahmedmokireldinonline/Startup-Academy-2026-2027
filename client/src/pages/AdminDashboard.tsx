import { ChangeEvent, useMemo, useRef, useState } from "react";
import { BarChart3, CheckCircle2, Database, Download, FileLock2, Search, Settings2, ShieldCheck, Sparkles, Upload, Users, WalletCards } from "lucide-react";
import { trpc } from "@/lib/trpc";
import AdminLogin from "./AdminLogin";

const initialTiers = [
  { id: "standard", name: "Standard Access", price: 3000, description: "المكتبة الأساسية والبرامج القياسية", active: true },
  { id: "vip", name: "VIP Full Access", price: 7000, description: "كل المنح والمصادر والمستثمرين", active: true },
];

const csvFields = ["id", "name", "email", "phone", "country", "dialCode", "stage", "goal", "language", "status", "notes", "createdAt", "updatedAt", "lastContactedAt"] as const;

type Registration = {
  id: number; name: string; email: string; phone: string; country: string; dialCode: string;
  stage: string; goal: string; language: string; status: "new" | "contacted" | "qualified" | "archived";
  notes?: string | null; createdAt: Date | string; updatedAt: Date | string; lastContactedAt?: Date | string | null;
};

function csvEscape(value: unknown) {
  const text = value == null ? "" : value instanceof Date ? value.toISOString() : String(value);
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function downloadCsv(rows: Registration[]) {
  const csv = [csvFields.join(","), ...rows.map((row) => csvFields.map((field) => csvEscape(row[field])).join(","))].join("\r\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url; anchor.download = `startup-academy-registrations-${new Date().toISOString().slice(0, 10)}.csv`; anchor.click();
  URL.revokeObjectURL(url);
}

function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = []; let row: string[] = []; let cell = ""; let quoted = false;
  for (let i = 0; i < text.length; i++) { const char = text[i]; const next = text[i + 1];
    if (char === '"' && quoted && next === '"') { cell += '"'; i++; }
    else if (char === '"') quoted = !quoted;
    else if (char === "," && !quoted) { row.push(cell); cell = ""; }
    else if ((char === "\n" || char === "\r") && !quoted) { if (char === "\r" && next === "\n") i++; row.push(cell); if (row.some(Boolean)) rows.push(row); row = []; cell = ""; }
    else cell += char;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const headers = (rows.shift() ?? []).map((header) => header.trim());
  return rows.map((values) => Object.fromEntries(headers.map((header, index) => [header, (values[index] ?? "").trim()])));
}

export default function AdminDashboard() {
  const me = trpc.auth.me.useQuery();
  const isAdmin = Boolean(me.data && ["admin", "super_admin"].includes(me.data.role));
  const stats = trpc.admin.stats.useQuery(undefined, { enabled: isAdmin });
  const [filters, setFilters] = useState({ query: "", country: "All", stage: "All", status: "All" as "All" | Registration["status"] });
  const registrations = trpc.admin.registrations.useQuery(filters, { enabled: isAdmin });
  const updateRegistration = trpc.admin.updateRegistration.useMutation({ onSuccess: () => { registrations.refetch(); stats.refetch(); } });
  const importRegistrations = trpc.admin.importRegistrations.useMutation({ onSuccess: () => { registrations.refetch(); stats.refetch(); } });
  const fileInput = useRef<HTMLInputElement>(null);
  const [tiers, setTiers] = useState(initialTiers); const [saved, setSaved] = useState(false); const [importMessage, setImportMessage] = useState("");
  const rows = (registrations.data ?? []) as Registration[];
  const countries = useMemo(() => Array.from(new Set(rows.map((row) => row.country).filter(Boolean))), [rows]);
  const stages = useMemo(() => Array.from(new Set(rows.map((row) => row.stage).filter(Boolean))), [rows]);
  const updateTier = (id: string, field: "name" | "price" | "description", value: string) => setTiers((items) => items.map((item) => item.id === id ? { ...item, [field]: field === "price" ? Number(value) : value } : item));

  const importCsv = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; if (!file) return;
    try {
      const parsed = parseCsv(await file.text());
      const valid = parsed.map((item) => ({ name: item.name, email: item.email, phone: item.phone, country: item.country || "Unknown", dialCode: item.dialCode || "+", stage: item.stage || "Unknown", goal: item.goal || "Imported from CSV", language: item.language === "en" ? "en" as const : "ar" as const, status: ["new", "contacted", "qualified", "archived"].includes(item.status) ? item.status as Registration["status"] : "new" as const, notes: item.notes || undefined })).filter((item) => item.name && item.email && item.phone);
      if (!valid.length) throw new Error("لم يتم العثور على صفوف صالحة. تأكد من الأعمدة: name,email,phone");
      const result = await importRegistrations.mutateAsync({ rows: valid });
      setImportMessage(`تم استيراد ${result.inserted} تسجيل بنجاح`);
    } catch (error) { setImportMessage(error instanceof Error ? error.message : "تعذر استيراد الملف"); }
    event.target.value = "";
  };

  if (me.isLoading) return <div className="admin-login-shell" dir="rtl"><main className="admin-login-main"><section className="admin-login-card"><span className="eyebrow">جارٍ التحقق</span><h1>نجهز مساحة الإدارة.</h1><p>يتم التحقق من صلاحية Admin أو Super Admin من الخادم.</p></section></main></div>;
  if (!me.data || !isAdmin) return <AdminLogin />;
  const adminUser = me.data;
  const totalRegistrations = stats.data?.all ?? 0;
  return <div className="admin-shell" dir="rtl">
    <header className="dashboard-header admin-header"><a className="brand" href="/"><span className="brand-mark"><Sparkles size={16} /></span><span><strong>Startup Academy</strong><small>Super Admin Control Center</small></span></a><div className="admin-identity"><ShieldCheck size={16} /> {adminUser.email || "admin@startupacademy.com"} <a href="/admin/login">خروج</a></div></header>
    <main className="admin-main">
      <section className="admin-hero"><div><span className="eyebrow"><Settings2 size={14} /> إدارة المنصة</span><h1>تحكم كامل في <em>بيانات العملاء.</em></h1><p>راجع كل التسجيلات، حدّث حالتها، واستورد أو حمّل القائمة بصيغة CSV.</p></div><span className="admin-ready"><span className="status-dot" /> {adminUser.role === "super_admin" ? "Super Admin" : "Admin"}</span></section>
      <section className="admin-metrics"><article><span><Users size={17} /> طلبات التسجيل</span><strong>{totalRegistrations}</strong><small>{stats.isLoading ? "جارٍ التحميل" : `${stats.data?.new ?? 0} طلبات جديدة`}</small></article><article><span><WalletCards size={17} /> إيرادات محتملة</span><strong>${(totalRegistrations * 3000).toLocaleString()}</strong><small>تقدير على أساس Standard Access</small></article><article><span><FileLock2 size={17} /> برامج متاحة</span><strong>42</strong><small>التقديم محمي فقط</small></article><article><span><BarChart3 size={17} /> مؤهلون</span><strong>{stats.data?.qualified ?? 0}</strong><small>من سجل الطلبات</small></article></section>
      <section className="admin-card"><div className="admin-card-heading"><div><span className="eyebrow"><WalletCards size={14} /> Tier management</span><h2>إدارة الباقات</h2></div><span className="admin-lock"><Database size={14} /> Super Admin only</span></div><div className="admin-tier-table"><div className="admin-tier-row admin-tier-head"><span>الباقة</span><span>السعر لمرة واحدة</span><span>الوصف</span><span>الحالة</span></div>{tiers.map((tier) => <div className="admin-tier-row" key={tier.id}><label><input value={tier.name} onChange={(e) => updateTier(tier.id, "name", e.target.value)} /></label><label className="price-input"><span>$</span><input type="number" min="1" value={tier.price} onChange={(e) => updateTier(tier.id, "price", e.target.value)} /></label><label><input value={tier.description} onChange={(e) => updateTier(tier.id, "description", e.target.value)} /></label><span className="active-pill"><CheckCircle2 size={14} /> فعال</span></div>)}</div><div className="admin-card-footer"><small>Lifetime Access: Standard $3,000 · VIP Full Access $7,000.</small><button className="dashboard-cta" onClick={() => { setSaved(true); window.setTimeout(() => setSaved(false), 2200); }}>{saved ? "تم الحفظ" : "حفظ تغييرات الباقات"}</button></div></section>
      <section className="admin-card registrations-card"><div className="admin-card-heading"><div><span className="eyebrow"><Users size={14} /> Registration CRM</span><h2>كل الأشخاص الذين سجلوا بياناتهم</h2><p className="admin-section-note">القائمة متصلة بقاعدة البيانات ويمكن تصفيتها أو تنزيلها أو استيراد نسخة جديدة.</p></div><div className="registration-actions"><button className="dashboard-cta secondary" onClick={() => downloadCsv(rows)} disabled={!rows.length}><Download size={16} /> تحميل CSV</button><button className="dashboard-cta" onClick={() => fileInput.current?.click()}><Upload size={16} /> استيراد CSV</button><input ref={fileInput} type="file" accept=".csv,text/csv" hidden onChange={importCsv} /></div></div>
        <div className="registration-filters"><label><Search size={16} /><input placeholder="بحث بالاسم أو البريد أو الهاتف" value={filters.query} onChange={(event) => setFilters({ ...filters, query: event.target.value })} /></label><select value={filters.country} onChange={(event) => setFilters({ ...filters, country: event.target.value })}><option>All</option>{countries.map((country) => <option key={country}>{country}</option>)}</select><select value={filters.stage} onChange={(event) => setFilters({ ...filters, stage: event.target.value })}><option>All</option>{stages.map((stage) => <option key={stage}>{stage}</option>)}</select><select value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value as typeof filters.status })}><option value="All">كل الحالات</option><option value="new">جديد</option><option value="contacted">تم التواصل</option><option value="qualified">مؤهل</option><option value="archived">مؤرشف</option></select></div>
        {importMessage && <p className="import-message">{importMessage}</p>}
        <div className="admin-registration-table admin-registration-grid"><div className="admin-registration-row admin-registration-head"><span>الشخص</span><span>التواصل</span><span>الدولة / المرحلة</span><span>الهدف</span><span>الحالة</span><span>التاريخ</span></div>{registrations.isLoading ? <p>جارٍ تحميل الطلبات...</p> : rows.length ? rows.map((item) => <div className="admin-registration-row" key={item.id}><div><strong>{item.name}</strong><small>#{item.id} · {item.language === "en" ? "English" : "العربية"}</small></div><div><strong>{item.email}</strong><small>{item.phone}</small></div><div><strong>{item.country}</strong><small>{item.stage}</small></div><div className="goal-cell" title={item.goal}>{item.goal}</div><select value={item.status} onChange={(event) => updateRegistration.mutate({ id: item.id, status: event.target.value as Registration["status"] })}><option value="new">جديد</option><option value="contacted">تم التواصل</option><option value="qualified">مؤهل</option><option value="archived">مؤرشف</option></select><small>{new Date(item.createdAt).toLocaleDateString("ar-EG")}</small></div>) : <p>لا توجد تسجيلات تطابق الفلاتر الحالية.</p>}</div>
      </section>
      <section className="admin-two-col"><article className="admin-card compact"><div className="admin-card-heading"><h2>استيراد CSV</h2><span className="soft-badge">حتى 1000 صف</span></div><p>استخدم الأعمدة: <code>name,email,phone,country,dialCode,stage,goal,language,status,notes</code>. الصفوف التي لا تحتوي الاسم والبريد والهاتف يتم تجاهلها.</p></article><article className="admin-card compact"><div className="admin-card-heading"><h2>المصادر المحمية</h2><span className="soft-badge locked">Server only</span></div><p>تظل بيانات التسجيلات متاحة للمشرف فقط من خلال جلسة Admin الآمنة.</p></article></section>
    </main>
  </div>;
}
