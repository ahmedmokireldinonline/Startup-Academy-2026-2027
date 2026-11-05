import { parse } from "cookie";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "../../server/_core/adminPassword.js";

export default function handler(req: any, res: any) {
  res.setHeader("Cache-Control", "no-store, private");
  res.setHeader("Vary", "Cookie, Authorization, X-Admin-Session-Token");
  const cookies = parse(req.headers.cookie || "");
  const authorization = typeof req.headers.authorization === "string" ? req.headers.authorization : "";
  const bearer = authorization.startsWith("Bearer ") ? authorization.slice(7) : undefined;
  const customToken = typeof req.headers["x-admin-session-token"] === "string" ? req.headers["x-admin-session-token"] : undefined;
  const session = verifyAdminSession(cookies[ADMIN_SESSION_COOKIE]) || verifyAdminSession(bearer) || verifyAdminSession(customToken);
  return res.status(200).json({ authenticated: Boolean(session), email: session?.email ?? null });
}
