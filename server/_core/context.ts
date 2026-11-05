import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { parse as parseCookies } from "cookie";
import type { User } from "../../drizzle/schema";
import { sdk } from "./sdk";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "./adminPassword";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    // Authentication is optional for public procedures.
    user = null;
  }

  if (!user) {
    const cookieHeader = opts.req.headers.cookie || "";
    const token = parseCookies(cookieHeader)[ADMIN_SESSION_COOKIE];
    const customToken = opts.req.headers["x-admin-session-token"];
    const queryToken = typeof opts.req.query?.admin_session === "string" ? opts.req.query.admin_session : undefined;
    const adminSession = verifyAdminSession(token) || verifyAdminSession(typeof customToken === "string" ? customToken : undefined) || verifyAdminSession(queryToken);
    if (adminSession) {
      user = {
        id: 0,
        openId: `admin-session:${adminSession.email}`,
        name: "Startup Academy Super Admin",
        email: adminSession.email,
        loginMethod: "admin_password",
        role: "super_admin",
        createdAt: new Date(0),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      } as User;
    }
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
