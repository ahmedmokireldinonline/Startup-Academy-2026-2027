import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import type { Response } from "express";
import { ENV } from "./env";

export const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

type AdminSession = { email: string; expiresAt: number };

function secret() {
  return ENV.adminSessionSecret || ENV.cookieSecret;
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

export function createAdminPasswordHash(password: string) {
  const salt = randomBytes(16);
  const derived = scryptSync(password, salt, 64);
  return `scrypt$${salt.toString("base64url")}$${derived.toString("base64url")}`;
}

function verifyPassword(password: string, encoded: string) {
  const [algorithm, saltValue, hashValue] = encoded.split("$");
  if (algorithm !== "scrypt" || !saltValue || !hashValue) return false;
  try {
    const expected = Buffer.from(hashValue, "base64url");
    const actual = scryptSync(password, Buffer.from(saltValue, "base64url"), expected.length);
    return expected.length === actual.length && timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

export function verifyAdminCredentials(email: string, password: string) {
  if (!ENV.adminEmail || !ENV.adminPasswordHash || !secret()) return false;
  return email.trim().toLowerCase() === ENV.adminEmail.trim().toLowerCase() && verifyPassword(password, ENV.adminPasswordHash);
}

export function createAdminSession(email: string) {
  const payload = `${email.trim().toLowerCase()}.${Date.now() + SESSION_TTL_SECONDS * 1000}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSession(token?: string | null): AdminSession | null {
  if (!token || !secret()) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [email, expiresValue, signature] = parts;
  const payload = `${email}.${expiresValue}`;
  const expected = sign(payload);
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  const expiresAt = Number(expiresValue);
  if (!email || !Number.isFinite(expiresAt) || expiresAt <= Date.now()) return null;
  if (ENV.adminEmail && email !== ENV.adminEmail.trim().toLowerCase()) return null;
  return { email, expiresAt };
}

export function setAdminSessionCookie(res: Response, token: string) {
  res.cookie(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: SESSION_TTL_SECONDS * 1000,
  });
}

export function clearAdminSessionCookie(res: Response) {
  res.clearCookie(ADMIN_SESSION_COOKIE, { httpOnly: true, secure: true, sameSite: "none", path: "/" });
}
