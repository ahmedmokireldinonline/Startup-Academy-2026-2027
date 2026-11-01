import { serialize } from "cookie";
import { ADMIN_SESSION_COOKIE } from "../../server/_core/adminPassword";

export default function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  res.setHeader("Set-Cookie", serialize(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 0,
  }));
  return res.status(200).json({ ok: true });
}
