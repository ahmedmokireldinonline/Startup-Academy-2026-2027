import { createHash, randomBytes } from "node:crypto";
import { parse } from "cookie";
import { and, eq, gt } from "drizzle-orm";
import type { Request, Response } from "express";
import { getDb } from "./db";
import { registrationAccessTokens } from "../drizzle/schema";
import { ENV } from "./_core/env";

export const REGISTRATION_ACCESS_COOKIE = "startup_academy_access";
const ACCESS_TTL_MS = 180 * 24 * 60 * 60 * 1000;

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function serializeAccessCookie(token: string, maxAge: number) {
  const sameSite = ENV.isProduction ? "None; Secure" : "Lax";
  return `${REGISTRATION_ACCESS_COOKIE}=${encodeURIComponent(token)}; Max-Age=${maxAge}; Path=/; HttpOnly; SameSite=${sameSite}`;
}

export async function issueRegistrationAccess(registrationId: number, res: Response) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + ACCESS_TTL_MS);
  await db.insert(registrationAccessTokens).values({ registrationId, tokenHash: hashToken(token), expiresAt });
  res.setHeader("Set-Cookie", serializeAccessCookie(token, Math.floor(ACCESS_TTL_MS / 1000)));
}

export async function getRegistrationAccessId(req: Request) {
  const token = parse(req.headers.cookie || "")[REGISTRATION_ACCESS_COOKIE];
  if (!token) return null;
  const db = await getDb();
  if (!db) return null;
  const result = await db.select({ registrationId: registrationAccessTokens.registrationId })
    .from(registrationAccessTokens)
    .where(and(eq(registrationAccessTokens.tokenHash, hashToken(token)), gt(registrationAccessTokens.expiresAt, new Date())))
    .limit(1);
  return result[0]?.registrationId ?? null;
}
