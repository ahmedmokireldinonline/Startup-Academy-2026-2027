import { parse } from "cookie";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "../../server/_core/adminPassword.js";

export default function handler(req: any, res: any) {
  const cookies = parse(req.headers.cookie || "");
  const authorization = typeof req.headers.authorization === "string" ? req.headers.authorization : "";
  const bearer = authorization.startsWith("Bearer ") ? authorization.slice(7) : undefined;
  const session = verifyAdminSession(cookies[ADMIN_SESSION_COOKIE]) || verifyAdminSession(bearer);
  return res.status(200).json({ authenticated: Boolean(session), email: session?.email ?? null });
}
