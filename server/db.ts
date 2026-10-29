import { and, count, desc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, registrations, Registration, InsertRegistration, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try { _db = drizzle(process.env.DATABASE_URL); }
    catch (error) { console.warn("[Database] Failed to connect:", error); _db = null; }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;
  for (const field of textFields) {
    if (user[field] !== undefined) { values[field] = user[field] ?? null; updateSet[field] = user[field] ?? null; }
  }
  if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
  if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
  else if (user.openId === ENV.ownerOpenId) { values.role = 'admin'; updateSet.role = 'admin'; }
  values.lastSignedIn ??= new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function createRegistration(input: InsertRegistration) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const result = await db.insert(registrations).values(input);
  return Number(result[0].insertId);
}

export async function listRegistrations(filters?: { query?: string; country?: string; stage?: string; status?: Registration["status"] | "All" }) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const conditions = [];
  if (filters?.country && filters.country !== "All") conditions.push(eq(registrations.country, filters.country));
  if (filters?.stage && filters.stage !== "All") conditions.push(eq(registrations.stage, filters.stage));
  if (filters?.status && filters.status !== "All") conditions.push(eq(registrations.status, filters.status));
  if (filters?.query) {
    const q = `%${filters.query}%`;
    conditions.push(sql`(${registrations.name} like ${q} or ${registrations.email} like ${q} or ${registrations.phone} like ${q})`);
  }
  return db.select().from(registrations).where(conditions.length ? and(...conditions) : undefined).orderBy(desc(registrations.createdAt));
}

export async function getRegistrationStats() {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const rows = await db.select({ status: registrations.status, total: count() }).from(registrations).groupBy(registrations.status);
  const totals = { all: 0, new: 0, contacted: 0, qualified: 0, archived: 0 };
  for (const row of rows) { totals[row.status] = Number(row.total); totals.all += Number(row.total); }
  return totals;
}

export async function updateRegistrationStatus(id: number, status: Registration["status"], notes?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.update(registrations).set({ status, notes, lastContactedAt: status === "contacted" ? new Date() : undefined }).where(eq(registrations.id, id));
  return { success: true } as const;
}
