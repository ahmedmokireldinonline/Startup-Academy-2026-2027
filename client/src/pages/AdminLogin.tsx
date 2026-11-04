import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { ArrowLeft, Eye, EyeOff, KeyRound, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && (user?.role === "admin" || user?.role === "super_admin")) navigate("/admin/control");
  }, [loading, navigate, user]);

  async function submitPasswordLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || "تعذر تسجيل الدخول.");
      if (result.token) sessionStorage.setItem("admin-session-token", result.token);
      navigate("/admin/control");
      window.setTimeout(() => window.location.reload(), 50);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "تعذر تسجيل الدخول.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="standalone-page admin-auth-page" dir="rtl">
      <header className="standalone-header">
        <a className="brand" href="/"><span className="brand-mark"><Sparkles size={16} /></span><span><strong>Startup Academy</strong><small>Secure admin area</small></span></a>
        <a className="back-link" href="/"><ArrowLeft size={16} /> الرئيسية</a>
      </header>
      <main className="admin-auth-main">
        <section className="admin-auth-card">
          <span className="admin-lock"><LockKeyhole size={24} /></span>
          <span className="eyebrow"><ShieldCheck size={15} /> Admin access</span>
          <h1>دخول لوحة الإدارة</h1>
          <p>أدخل بيانات حساب المشرف التي تم إعدادها في إعدادات البيئة. لا يتم عرض كلمة المرور أو تخزينها في الواجهة.</p>
          <form className="admin-password-form" onSubmit={submitPasswordLogin}>
            <label>البريد الإلكتروني للمشرف<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="username" placeholder="admin@example.com" required /></label>
            <label>كلمة المرور<div className="password-input-wrap"><input type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" placeholder="أدخل كلمة المرور" required /><button type="button" className="password-visibility" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"} title={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></label>
            {error ? <div className="admin-login-error" role="alert">{error}</div> : null}
            <button className="button button-primary admin-login-button" type="submit" disabled={submitting}>{submitting ? "جارٍ تسجيل الدخول..." : "دخول بالبريد وكلمة المرور"} <KeyRound size={16} /></button>
          </form>
          {user && user.role !== "admin" && user.role !== "super_admin" && <div className="admin-warning">تم تسجيل الدخول، لكن هذا الحساب ليس لديه صلاحية Admin.</div>}
          <div className="admin-login-divider"><span>أو</span></div>
          <button className="button button-secondary admin-login-button" onClick={() => startLogin()} disabled={loading}>{loading ? "جاري التحقق..." : "الدخول الرسمي بالحساب"} <LockKeyhole size={16} /></button>
          <small>يتم التحقق من صلاحية Admin من الخادم، وليس من المتصفح.</small>
        </section>
      </main>
    </div>
  );
}
