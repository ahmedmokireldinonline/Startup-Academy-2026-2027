import { createHash, randomBytes } from "node:crypto";
import { parse } from "cookie";
import type { Request, Response } from "express";
import { ENV } from "./_core/env";
import { createRegistration } from "./db";

export const REGISTRATION_ACCESS_COOKIE = "startup_academy_access";
const ACCESS_TTL_MS = 180 * 24 * 60 * 60 * 1000;

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function serializeAccessCookie(token: string, maxAge: number) {
  const sameSite = ENV.isProduction ? "None; Secure" : "Lax";
  return `${REGISTRATION_ACCESS_COOKIE}=${encodeURIComponent(token)}; Max-Age=${maxAge}; Path=/; HttpOnly; SameSite=${sameSite}`;
}

async function accessRequest(path: string, init: RequestInit = {}) {
  if (!ENV.supabaseUrl || !ENV.supabaseAnonKey) throw new Error("Database is not configured");
  const response = await fetch(`${ENV.supabaseUrl.replace(/\/$/, "")}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: ENV.supabaseAnonKey,
      Authorization: `Bearer ${ENV.supabaseAnonKey}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  if (!response.ok) throw new Error(`Supabase access request failed (${response.status})`);
  return response;
}

export async function issueRegistrationAccess(registrationId: number, res: Response) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + ACCESS_TTL_MS).toISOString();
  await accessRequest("registration_access_tokens", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ registrationId, tokenHash: hashToken(token), expiresAt }),
  });
  res.setHeader("Set-Cookie", serializeAccessCookie(token, Math.floor(ACCESS_TTL_MS / 1000)));
}

export async function getRegistrationAccessId(req: Request) {
  const token = parse(req.headers.cookie || "")[REGISTRATION_ACCESS_COOKIE];
  if (!token) return null;
  const response = await accessRequest(`rpc/registration_access_id`, {
    method: "POST",
    body: JSON.stringify({ p_token_hash: hashToken(token) }),
  });
  const value = await response.json();
  return value == null ? null : Number(value);
}
