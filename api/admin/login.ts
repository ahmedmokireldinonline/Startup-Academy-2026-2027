import cookie from "cookie";
import { ADMIN_SESSION_COOKIE, createAdminSession, verifyAdminCredentials } from "../../server/_core/adminPassword.js";

export default function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const email = typeof req.body?.email === "string" ? req.body.email : "";
  const password = typeof req.body?.password === "string" ? req.body.password : "";
  if (!verifyAdminCredentials(email, password)) {
    return res.status(401).json({ ok: false, message: "بيانات دخول المشرف غير صحيحة أو غير مهيأة." });
  }

  const token = createAdminSession(email);
  res.setHeader("Set-Cookie", cookie.serialize(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 8,
  }));
  return res.status(200).json({ ok: true, token });
}
