import { createHmac, timingSafeEqual } from "node:crypto";
import { parse } from "cookie";
import type { Request, Response } from "express";
import { ENV } from "./_core/env";

export const REGISTRATION_ACCESS_COOKIE = "startup_academy_access";
const ACCESS_TTL_MS = 180 * 24 * 60 * 60 * 1000;

function signingSecret() { return ENV.adminSessionSecret || ENV.supabaseAdminSecret || ENV.supabaseAnonKey; }
function sign(value: string) { return createHmac("sha256", signingSecret()).update(value).digest("base64url"); }

function serializeAccessCookie(token: string, maxAge: number) {
  const sameSite = ENV.isProduction ? "None; Secure" : "Lax";
  return `${REGISTRATION_ACCESS_COOKIE}=${encodeURIComponent(token)}; Max-Age=${maxAge}; Path=/; HttpOnly; SameSite=${sameSite}`;
}

export async function issueRegistrationAccess(registrationId: string, res: Response) {
  if (!signingSecret()) throw new Error("Access signing secret is not configured");
  const expiresAt = Date.now() + ACCESS_TTL_MS;
  const payload = `${registrationId}.${expiresAt}`;
  const token = `${payload}.${sign(payload)}`;
  res.setHeader("Set-Cookie", serializeAccessCookie(token, Math.floor(ACCESS_TTL_MS / 1000)));
}

export async function getRegistrationAccessId(req: Request) {
  const token = parse(req.headers.cookie || "")[REGISTRATION_ACCESS_COOKIE];
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [registrationId, expiresAtText, signature] = parts;
  const payload = `${registrationId}.${expiresAtText}`;
  if (!signingSecret() || Number(expiresAtText) < Date.now()) return null;
  const expected = sign(payload);
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  return registrationId;
}
