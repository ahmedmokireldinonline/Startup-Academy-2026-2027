import { parse } from "cookie";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "../../server/_core/adminPassword.js";

export default function handler(req: any, res: any) {
  const cookies = parse(req.headers.cookie || "");
  const session = verifyAdminSession(cookies[ADMIN_SESSION_COOKIE]);
  return res.status(200).json({ authenticated: Boolean(session), email: session?.email ?? null });
}
