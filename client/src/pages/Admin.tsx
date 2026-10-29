import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { BarChart3, CheckCircle2, Filter, LockKeyhole, LogIn, MessageCircle, RefreshCw, Search, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { startLogin } from "@/const";

type Status = "new" | "contacted" | "qualified" | "archived";
const statusLabel: Record<Status, string> = { new: "جديد", contacted: "تم التواصل", qualified: "مؤهل", archived: "مؤرشف" };

export default function Admin() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("All");
  const [stage, setStage] = useState("All");
  const [status, setStatus] = useState<Status | "All">("All");
  const me = trpc.auth.me.useQuery();
  const stats = trpc.admin.stats.useQuery(undefined, { enabled: me.data?.role === "admin" });
  const leads = trpc.admin.registrations.useQuery({ query, country, stage, status }, { enabled: me.data?.role === "admin" });
  const update = trpc.admin.updateRegistration.useMutation({ onSuccess: () => { void leads.refetch(); void stats.refetch(); } });
  const countries = useMemo(() => Array.from(new Set((leads.data || []).map((lead) => lead.country))).sort(), [leads.data]);
  const stages = useMemo(() => Array.from(new Set((leads.data || []).map((lead) => lead.stage))).sort(), [leads.data]);

  if (me.isLoading) return <AdminShell><div className="admin-empty"><RefreshCw className="spin" /> جارٍ التحقق من صلاحيات الإدارة...</div></AdminShell>;
  if (!me.data) return <AdminShell><div className="admin-gate"><LockKeyhole size={30} /><h1>لوحة الإدارة خاصة</h1><p>سجّل الدخول بحساب المالك لعرض بيانات العملاء المسجلين.</p><button className="button button-primary" onClick={startLogin}><LogIn size={17} /> تسجيل الدخول</button></div></AdminShell>;
  if (me.data.role !== "admin") return <AdminShell><div className="admin-gate"><ShieldCheck size={30} /><h1>لا توجد صلاحية كافية</h1><p>هذه الصفحة متاحة للحساب الإداري فقط. إذا كنت المالك، تأكد من أن حسابك مضبوط بدور admin في قاعدة البيانات.</p></div></AdminShell>;

  return <AdminShell><main className="admin-main"><div className="admin-topline"><div><span className="eyebrow"><BarChart3 size={15} /> لوحة المتابعة</span><h1>عملاء جدد، <em>خطوات أوضح.</em></h1><p>تابع طلبات الوصول إلى دليل البرامج، وسجّل الخطوة التالية لكل شركة أو مؤسسة.</p></div><a className="button button-secondary" href="/"><Sparkles size={16} /> الموقع العام</a></div><section className="admin-stats">{([['all', 'إجمالي التسجيلات'], ['new', 'جديد'], ['contacted', 'تم التواصل'], ['qualified', 'مؤهل'], ['archived', 'مؤرشف']] as const).map(([key, label]) => <article key={key}><span>{label}</span><strong>{stats.data?.[key] ?? "—"}</strong></article>)}</section><section className="admin-panel"><div className="admin-toolbar"><label className="search-field"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحث بالاسم أو البريد أو الهاتف" /></label><label className="select-field"><Filter size={15} /><select value={country} onChange={(e) => setCountry(e.target.value)}><option value="All">كل الدول</option>{countries.map((item) => <option key={item}>{item}</option>)}</select></label><label className="select-field"><select value={stage} onChange={(e) => setStage(e.target.value)}><option value="All">كل المراحل</option>{stages.map((item) => <option key={item}>{item}</option>)}</select></label><label className="select-field"><select value={status} onChange={(e) => setStatus(e.target.value as Status | "All")}><option value="All">كل الحالات</option>{Object.entries(statusLabel).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label></div>{leads.isLoading ? <div className="admin-empty"><RefreshCw className="spin" /> جارٍ تحميل التسجيلات...</div> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>العميل</th><th>التواصل</th><th>الدولة / المرحلة</th><th>الهدف</th><th>الحالة</th><th>التسجيل</th></tr></thead><tbody>{(leads.data || []).map((lead) => <tr key={lead.id}><td><strong>{lead.name}</strong><small>{lead.email}</small></td><td><a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer"><MessageCircle size={14} /> {lead.phone}</a></td><td><span>{lead.country}</span><small>{lead.stage}</small></td><td className="admin-goal">{lead.goal}</td><td><select className={`admin-status status-${lead.status}`} value={lead.status} disabled={update.isPending} onChange={(e) => update.mutate({ id: lead.id, status: e.target.value as Status })}>{Object.entries(statusLabel).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></td><td><small>{new Date(lead.createdAt).toLocaleString("ar-EG")}</small></td></tr>)}</tbody></table>{!leads.data?.length && <div className="admin-empty"><UserRound size={26} /> لا توجد تسجيلات مطابقة للفلاتر الحالية.</div>}</div>}</section></main></AdminShell>;
}

function AdminShell({ children }: { children: ReactNode }) {
  return <div className="admin-page" dir="rtl"><header className="standalone-header"><a className="brand" href="/"><span className="brand-mark"><Sparkles size={16} /></span><span><strong>Startup Academy</strong><small>Admin Console</small></span></a><span className="admin-secure"><CheckCircle2 size={14} /> اتصال محمي</span></header>{children}</div>;
}
