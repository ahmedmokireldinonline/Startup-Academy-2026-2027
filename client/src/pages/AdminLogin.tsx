import { useEffect } from "react";
import { ArrowLeft, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const { user, loading } = useAuth();
  useEffect(() => {
    if (!loading && user?.role === "admin") navigate("/admin");
  }, [loading, navigate, user]);

  return <div className="standalone-page admin-auth-page" dir="rtl"><header className="standalone-header"><a className="brand" href="/"><span className="brand-mark"><Sparkles size={16} /></span><span><strong>Startup Academy</strong><small>Secure admin area</small></span></a><a className="back-link" href="/"><ArrowLeft size={16} /> الرئيسية</a></header><main className="admin-auth-main"><section className="admin-auth-card"><span className="admin-lock"><LockKeyhole size={24} /></span><span className="eyebrow"><ShieldCheck size={15} /> Admin access</span><h1>دخول لوحة الإدارة</h1><p>هذه المنطقة مخصصة لإدارة Startup Academy. استخدم تسجيل الدخول الرسمي المرتبط بحسابك، ولن يتم إنشاء كلمة مرور أو تخزينها داخل الموقع.</p>{user && user.role !== "admin" && <div className="admin-warning">تم تسجيل الدخول، لكن هذا الحساب ليس لديه صلاحية Admin.</div>}<button className="button button-primary admin-login-button" onClick={() => startLogin()} disabled={loading}>{loading ? "جاري التحقق..." : user ? "تسجيل الدخول بحساب Admin آخر" : "تسجيل الدخول الآمن"} <LockKeyhole size={16} /></button><small>صلاحية Admin يتم التحقق منها من الخادم، وليس من المتصفح.</small></section></main></div>;
}
