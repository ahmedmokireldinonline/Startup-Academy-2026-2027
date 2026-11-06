import type { InsertRegistration, Registration, User } from "../drizzle/schema";
import { ENV } from "./_core/env";

type RegistrationFilter = { query?: string; country?: string; stage?: string; status?: Registration["status"] | "All" };

type SupabaseRow = Record<string, unknown>;

function assertSupabase() {
  if (!ENV.supabaseUrl || !ENV.supabaseAnonKey) throw new Error("Database is not configured");
}

async function supabaseRequest(path: string, init: RequestInit = {}) {
  assertSupabase();
  const response = await fetch(`${ENV.supabaseUrl.replace(/\/$/, "")}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: ENV.supabaseAnonKey,
      Authorization: `Bearer ${ENV.supabaseAnonKey}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  if (!response.ok) throw new Error(`Supabase request failed (${response.status})`);
  return response;
}

async function rpc<T>(name: string, body: Record<string, unknown>): Promise<T> {
  const response = await supabaseRequest(`rpc/${name}`, { method: "POST", body: JSON.stringify(body) });
  return response.json() as Promise<T>;
}

export async function getDb() {
  return Boolean(ENV.supabaseUrl && ENV.supabaseAnonKey);
}

export async function getUserByOpenId(openId: string) {
  const response = await supabaseRequest(`users?select=*&openId=eq.${encodeURIComponent(openId)}&limit=1`);
  const rows = await response.json() as SupabaseRow[];
  return rows[0] as User | undefined;
}

export async function upsertUser(user: { openId: string; name?: string | null; email?: string | null; loginMethod?: string | null; role?: "user" | "admin" | "super_admin"; lastSignedIn?: Date }) {
  await supabaseRequest("users", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({
      openId: user.openId, name: user.name ?? null, email: user.email ?? null,
      loginMethod: user.loginMethod ?? null, role: user.role ?? "user",
      lastSignedIn: (user.lastSignedIn ?? new Date()).toISOString(),
    }),
  });
}

export async function createRegistration(input: InsertRegistration) {
  const response = await supabaseRequest("registrations?select=id", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({
      name: input.name,
      email: input.email,
      phone: input.phone,
      country: input.country,
      dialCode: input.dialCode,
      stage: input.stage,
      goal: input.goal,
      language: input.language ?? "ar",
      status: input.status ?? "new",
      notes: input.notes ?? null,
    }),
  });
  if (!response.ok) throw new Error(`Supabase registration request failed (HTTP ${response.status})`);
  const rows = await response.json() as Array<{ id: number }>;
  if (!rows[0]?.id) throw new Error("Registration was not created");
  return String(rows[0].id);
}

export async function bulkCreateRegistrations(input: InsertRegistration[]) {
  if (!input.length) return { inserted: 0 } as const;
  await supabaseRequest("registrations", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(input.map((item) => ({ ...item, language: item.language ?? "ar", status: item.status ?? "new" }))),
  });
  return { inserted: input.length } as const;
}

function mapRegistration(row: SupabaseRow): Registration {
  return {
    id: Number(row.id), name: String(row.name ?? ""), email: String(row.email ?? ""), phone: String(row.phone ?? ""),
    country: String(row.country ?? ""), dialCode: String(row.dialCode ?? ""), stage: String(row.stage ?? ""),
    goal: String(row.goal ?? ""), language: String(row.language ?? "ar"), status: row.status as Registration["status"],
    notes: row.notes == null ? null : String(row.notes), createdAt: new Date(String(row.createdAt ?? "")),
    updatedAt: new Date(String(row.updatedAt ?? "")), lastContactedAt: row.lastContactedAt == null ? null : new Date(String(row.lastContactedAt)),
  };
}

export async function listRegistrations(filters?: RegistrationFilter) {
  const rows = await rpc<SupabaseRow[]>("admin_registrations", {
    p_secret: ENV.supabaseAdminSecret, p_query: filters?.query || null, p_country: filters?.country || null,
    p_stage: filters?.stage || null, p_status: filters?.status || null,
  });
  return rows.map(mapRegistration);
}

export async function getRegistrationStats() {
  return rpc<{ all: number; new: number; contacted: number; qualified: number; archived: number }>("admin_stats", { p_secret: ENV.supabaseAdminSecret });
}

export async function updateRegistrationStatus(id: number, status: Registration["status"], notes?: string) {
  return rpc<{ success: boolean }>("admin_update_registration", { p_secret: ENV.supabaseAdminSecret, p_id: id, p_status: status, p_notes: notes ?? null });
}
