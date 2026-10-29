// server-runtime/trpc-entry.ts
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// server/routers.ts
import { TRPCError as TRPCError3 } from "@trpc/server";
import { z as z2 } from "zod";

// shared/const.ts
var COOKIE_NAME = "webdev_app_session";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var AXIOS_TIMEOUT_MS = 3e4;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";
var decodeOAuthState = (state) => {
  let decoded;
  try {
    decoded = atob(state);
  } catch {
    return { redirectUri: "" };
  }
  try {
    const parsed = JSON.parse(decoded);
    if (parsed && typeof parsed.redirectUri === "string") return parsed;
  } catch {
  }
  return { redirectUri: decoded };
};

// server/_core/trpc.ts
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
import { TRPCError as TRPCError2 } from "@trpc/server";

// server/_core/env.ts
var ENV = {
  get appId() {
    return process.env.MANUS_PROJECT_ID ?? "";
  },
  get cookieSecret() {
    return process.env.MANUS_JWT_SECRET ?? "";
  },
  get databaseUrl() {
    return process.env.DATABASE_URL ?? "";
  },
  get oAuthServerUrl() {
    return process.env.MANUS_OAUTH_API_URL ?? "";
  },
  // Preserve the legacy hint when supplied; otherwise roles remain application data.
  get ownerOpenId() {
    return process.env.OWNER_OPEN_ID ?? "";
  },
  get isProduction() {
    return process.env.NODE_ENV === "production";
  },
  get forgeApiUrl() {
    return process.env.MANUS_API_URL ?? "";
  },
  get forgeApiKey() {
    return process.env.MANUS_API_KEY ?? "";
  }
};

// server/_core/notification.ts
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString(input.title)) {
    throw new TRPCError2({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString(input.content)) {
    throw new TRPCError2({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError2({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError2({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError2({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError2({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/_core/cookies.ts
function getSessionCookieOptions(_req) {
  return { httpOnly: true, path: "/", sameSite: "none", secure: true };
}

// server/db.ts
import { and, count, desc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";

// drizzle/schema.ts
import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
var users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
});
var registrations = mysqlTable("registrations", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  country: varchar("country", { length: 8 }).notNull(),
  dialCode: varchar("dialCode", { length: 12 }).notNull(),
  stage: varchar("stage", { length: 100 }).notNull(),
  goal: text("goal").notNull(),
  language: varchar("language", { length: 8 }).default("ar").notNull(),
  status: mysqlEnum("status", ["new", "contacted", "qualified", "archived"]).default("new").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastContactedAt: timestamp("lastContactedAt")
});
var registrationAccessTokens = mysqlTable("registration_access_tokens", {
  id: int("id").autoincrement().primaryKey(),
  registrationId: int("registrationId").notNull().references(() => registrations.id, { onDelete: "cascade" }),
  tokenHash: varchar("tokenHash", { length: 128 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  expiresAt: timestamp("expiresAt").notNull()
});

// server/db.ts
var _db = null;
async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}
async function upsertUser(user) {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const values = { openId: user.openId };
  const updateSet = {};
  const textFields = ["name", "email", "loginMethod"];
  for (const field of textFields) {
    if (user[field] !== void 0) {
      values[field] = user[field] ?? null;
      updateSet[field] = user[field] ?? null;
    }
  }
  if (user.lastSignedIn !== void 0) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== void 0) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }
  values.lastSignedIn ??= /* @__PURE__ */ new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = /* @__PURE__ */ new Date();
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}
async function createRegistration(input) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const result = await db.insert(registrations).values(input);
  return Number(result[0].insertId);
}
async function listRegistrations(filters) {
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
  return db.select().from(registrations).where(conditions.length ? and(...conditions) : void 0).orderBy(desc(registrations.createdAt));
}
async function getRegistrationStats() {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const rows = await db.select({ status: registrations.status, total: count() }).from(registrations).groupBy(registrations.status);
  const totals = { all: 0, new: 0, contacted: 0, qualified: 0, archived: 0 };
  for (const row of rows) {
    totals[row.status] = Number(row.total);
    totals.all += Number(row.total);
  }
  return totals;
}
async function updateRegistrationStatus(id, status, notes) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.update(registrations).set({ status, notes, lastContactedAt: status === "contacted" ? /* @__PURE__ */ new Date() : void 0 }).where(eq(registrations.id, id));
  return { success: true };
}

// server/access.ts
import { createHash, randomBytes } from "node:crypto";
import { parse } from "cookie";
import { and as and2, eq as eq2, gt } from "drizzle-orm";
var REGISTRATION_ACCESS_COOKIE = "startup_academy_access";
var ACCESS_TTL_MS = 180 * 24 * 60 * 60 * 1e3;
function hashToken(token) {
  return createHash("sha256").update(token).digest("hex");
}
function serializeAccessCookie(token, maxAge) {
  const sameSite = ENV.isProduction ? "None; Secure" : "Lax";
  return `${REGISTRATION_ACCESS_COOKIE}=${encodeURIComponent(token)}; Max-Age=${maxAge}; Path=/; HttpOnly; SameSite=${sameSite}`;
}
async function issueRegistrationAccess(registrationId, res) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + ACCESS_TTL_MS);
  await db.insert(registrationAccessTokens).values({ registrationId, tokenHash: hashToken(token), expiresAt });
  res.setHeader("Set-Cookie", serializeAccessCookie(token, Math.floor(ACCESS_TTL_MS / 1e3)));
}
async function getRegistrationAccessId(req) {
  const token = parse(req.headers.cookie || "")[REGISTRATION_ACCESS_COOKIE];
  if (!token) return null;
  const db = await getDb();
  if (!db) return null;
  const result = await db.select({ registrationId: registrationAccessTokens.registrationId }).from(registrationAccessTokens).where(and2(eq2(registrationAccessTokens.tokenHash, hashToken(token)), gt(registrationAccessTokens.expiresAt, /* @__PURE__ */ new Date()))).limit(1);
  return result[0]?.registrationId ?? null;
}

// server/programCatalog.ts
var programs = [
  {
    "id": "aws-activate-founders",
    "name": "AWS Activate Founders",
    "provider": "Amazon Web Services",
    "region": "Global",
    "type": "Startup credits",
    "short": "Up to $5,000 AWS credits for self-funded startups",
    "eligibility": "Pre-Series B; founded within 10 years; paid-tier AWS account; self-funded or bootstrapped; new to Activate or requesting more than previously received.",
    "benefits": "Starts at $1,000 AWS Activate Credits; select startups may qualify for up to $5,000. | Use credits for infrastructure, data, and AI/ML services.",
    "steps": "Create or sign in to an AWS Builder ID. | Choose Activate Founders. | Complete company and product details. | Link the AWS account and submit. | Wait for the stated 5\u201310 business-day response.",
    "deadline": "\u{1F504} Rolling \u2014 no published deadline",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://aws.amazon.com/startups/credits/",
    "lastVerified": "2026-10-28",
    "primaryCategory": "Cloud & infrastructure credits",
    "categorySource": "global/credits.md",
    "officialSource": true
  },
  {
    "id": "aws-activate-portfolio",
    "name": "AWS Activate Portfolio",
    "provider": "Amazon Web Services",
    "region": "Global",
    "type": "Startup credits",
    "short": "Up to $200,000 AWS credits through an Activate Provider",
    "eligibility": "Pre-Series B; founded within 10 years; paid-tier AWS account; startup must have an Activate Provider Org ID from an accelerator, investor, or startup-enabling organization.",
    "benefits": "Up to $200,000 AWS Activate Credits. | Offset infrastructure, data, and AI/ML costs while building toward the next milestone.",
    "steps": "Confirm your accelerator or investor is an AWS Activate Provider. | Obtain the Provider Org ID. | Create the startup profile. | Link the AWS account and submit the Portfolio application.",
    "deadline": "\u{1F504} Rolling \u2014 no published deadline",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://aws.amazon.com/startups/credits/",
    "lastVerified": "2026-10-28",
    "primaryCategory": "Cloud & infrastructure credits",
    "categorySource": "global/credits.md",
    "officialSource": true
  },
  {
    "id": "aws-ai-startups",
    "name": "AWS Credits for AI Startups",
    "provider": "Amazon Web Services",
    "region": "Global",
    "type": "AI / cloud credits",
    "short": "$200,000+ additional AWS credits for AI startups ready to scale",
    "eligibility": "Invite-only path for AI startups ready to scale after AWS Activate Portfolio; final eligibility is assessed by AWS.",
    "benefits": "$200,000+ in additional AWS credits may be available. | Support AI infrastructure, Amazon Bedrock models, and production workloads.",
    "steps": "Build and validate on AWS Activate. | Reach the scale-readiness threshold. | Discuss eligibility with an AWS Account Manager. | Complete the additional-credit review.",
    "deadline": "\u{1F504} Rolling \u2014 invite or account-manager pathway",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://aws.amazon.com/startups/credits/",
    "lastVerified": "2026-10-28",
    "primaryCategory": "Cloud & infrastructure credits",
    "categorySource": "global/credits.md",
    "officialSource": true
  },
  {
    "id": "aws-education-accelerator",
    "name": "AWS Education Accelerator",
    "provider": "Amazon Web Services",
    "region": "Global",
    "type": "EdTech accelerator",
    "short": "10-week EdTech program with up to $100,000 AWS computing credits",
    "eligibility": "Global EdTech startups with a developed MVP or launched product, founded within 10 years; English programming; startup must also qualify for AWS Activate. Cohort dates vary.",
    "benefits": "Up to $100,000 AWS computing credits with zero equity. | Technical deep dives, tailored training, expert mentorship, demo day, and alumni/investor network.",
    "steps": "Check the current cohort window. | Prepare the EdTech product, traction, and team profile. | Confirm AWS Activate eligibility. | Submit the official application when open. | Complete the 10-week program and demo day.",
    "deadline": "\u23F3 Cohort-based \u2014 check the official page for the next window",
    "status": "\u23F3 Opening soon",
    "statusKey": "opening",
    "link": "https://startups.aws.com/programs/education-accelerator",
    "lastVerified": "2026-10-28",
    "primaryCategory": "Accelerators & ecosystem",
    "categorySource": "global/accelerators.md",
    "officialSource": true
  },
  {
    "id": "clickup-startups",
    "name": "ClickUp for Startups",
    "provider": "ClickUp",
    "region": "Global",
    "type": "Credits / discount",
    "short": "$3,000 ClickUp credit plus Enterprise workspace",
    "eligibility": "Approved funding-partner affiliation; no later than Series B; incorporated less than 5 years.",
    "benefits": "$3,000 ClickUp credit. | Enterprise workspace. | Onboarding resources, training, and support.",
    "steps": "Confirm approved funding-partner affiliation. | Check age and funding-stage requirements. | Open the official ClickUp for Startups application. | Submit startup and partner details. | Complete onboarding after approval.",
    "deadline": "\u{1F504} Rolling \u2014 no 2026/2027 deadline published",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://clickup.com/startup-program",
    "lastVerified": "2026-10-12",
    "primaryCategory": "Cloud & infrastructure credits",
    "categorySource": "global/credits.md",
    "officialSource": true
  },
  {
    "id": "anthropic-startup",
    "name": "Anthropic Startup Program",
    "provider": "Anthropic",
    "region": "Global",
    "type": "Credits / ecosystem support",
    "short": "API credits, priority rate limits, and selected resources",
    "eligibility": "Complete applications evaluated on traction, investment/funding, and Claude integration/usage; eligibility is at Anthropic\u2019s discretion.",
    "benefits": "Anthropic API credits. | Priority rate limits. | Access to selected Anthropic resources.",
    "steps": "Review the official terms and territory restrictions. | Prepare company, traction, funding, and Claude-use information. | Submit a complete application through the program channel. | Respond to validation or affidavit requests if selected. | Receive benefits on the company account if awarded.",
    "deadline": "\u{1F504} Rolling \u2014 selections are made on a rolling basis",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://www.anthropic.com/startup-program-official-terms",
    "lastVerified": "2026-10-12",
    "primaryCategory": "Cloud & infrastructure credits",
    "categorySource": "global/credits.md",
    "officialSource": true
  },
  {
    "id": "sendpulse-grant",
    "name": "SendPulse Startup Grant",
    "provider": "SendPulse",
    "region": "Global",
    "type": "Grant / credits",
    "short": "$5,000 SendPulse credits valid for 12 months",
    "eligibility": "Launched within 3 years; innovative product; not e-commerce/online business; no history of paid SendPulse plans.",
    "benefits": "$5,000 bonus-balance credits. | Valid for one year. | Use across most tools, with official exclusions.",
    "steps": "Confirm the startup is \u22643 years old and meets the sector rules. | Create or use a free SendPulse account. | Prepare the website, team, country, and account details. | Submit the official form. | Wait for review and use approved credits within 12 months.",
    "deadline": "\u{1F504} Rolling \u2014 applications reviewed within 1\u20133 business days",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://sendpulse.com/startup",
    "lastVerified": "2026-10-12",
    "primaryCategory": "Grants & funding",
    "categorySource": "global/credits.md",
    "officialSource": true
  },
  {
    "id": "microsoft-startups",
    "name": "Microsoft for Startups",
    "provider": "Microsoft",
    "region": "Global",
    "type": "Credits / discount",
    "short": "Up to $150,000 credits plus AI and go-to-market support",
    "eligibility": "Access is through the Microsoft for Startups portal; the official FAQ describes investor-referral and self-start pathways. Benefit tier is determined in the portal.",
    "benefits": "Up to $150,000 credits. | AI services and developer tools. | Technical guidance and enterprise go-to-market support.",
    "steps": "Choose self-start or investor-referral pathway. | Open the official Microsoft for Startups portal. | Create the startup profile and provide requested proof. | Complete eligibility review. | Claim portal benefits and credits.",
    "deadline": "\u{1F504} Rolling \u2014 no 2026/2027 deadline published",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://www.microsoft.com/en/startups",
    "lastVerified": "2026-10-12",
    "primaryCategory": "Cloud & infrastructure credits",
    "categorySource": "global/credits.md",
    "officialSource": true
  },
  {
    "id": "google-cloud-startups",
    "name": "Google for Startups Cloud Program",
    "provider": "Google Cloud",
    "region": "Global",
    "type": "Credits",
    "short": "$2,000 pre-funded; $200,000 Seed\u2013A; up to $350,000 AI-first",
    "eligibility": "Stage-based application: pre-funded, Seed\u2013Series A, AI-first, or Series B+. Exact program rules are confirmed in the application flow.",
    "benefits": "$2,000 for pre-funded MVPs. | $200,000 for Seed\u2013Series A. | Up to $350,000 for AI-first startups. | Customized support for Series B+.",
    "steps": "Identify the correct pre-funded, early-stage, AI-first, or Series B+ path. | Open the official Google Cloud application. | Submit startup stage and product details. | Complete review and account setup. | Activate credits and program resources.",
    "deadline": "\u{1F504} Rolling \u2014 applications presented as ongoing",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://cloud.google.com/startup",
    "lastVerified": "2026-10-12",
    "primaryCategory": "Cloud & infrastructure credits",
    "categorySource": "global/credits.md",
    "officialSource": true
  },
  {
    "id": "github-startups",
    "name": "GitHub for Startups",
    "provider": "GitHub",
    "region": "Global",
    "type": "Credits / discount",
    "short": "$10,000 GitHub credits for up to 12 months",
    "eligibility": "GitHub for Startups partner affiliation; outside funding up to Series B; new to GitHub Enterprise or absent for 6 months; no prior startup credits or Enterprise licenses.",
    "benefits": "$10,000 credits. | Up to 12 months. | Enterprise, Copilot, Advanced Security, Actions, and other eligible metered offerings.",
    "steps": "Confirm partner affiliation and outside funding. | Check Enterprise/new-user and prior-credit rules. | Apply through a GitHub for Startups partner. | Provide Enterprise account and billing details. | Wait for the stated 2\u20133 business-day email and activate credits.",
    "deadline": "\u{1F504} Rolling \u2014 approval described as ongoing",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://github.com/enterprise/startups",
    "lastVerified": "2026-10-12",
    "primaryCategory": "Cloud & infrastructure credits",
    "categorySource": "global/credits.md",
    "officialSource": true
  },
  {
    "id": "nvidia-inception",
    "name": "NVIDIA Inception",
    "provider": "NVIDIA",
    "region": "Global",
    "type": "Accelerator / discount",
    "short": "Free AI startup program with preferred pricing and partner offers",
    "eligibility": "At least one developer; working website; incorporated; less than 10 years old. Excludes consulting/outsourcing, crypto-associated companies, cloud providers, resellers/distributors, and public companies.",
    "benefits": "Free membership with no equity requirement. | Developer tools and technical training. | Preferred pricing on selected hardware/software. | Partner cloud credits, investor-network exposure, and go-to-market resources.",
    "steps": "Confirm incorporation, developer, website, and sector exclusions. | Prepare company/product details, funding status, and pitch deck. | Submit the NVIDIA Inception application. | Wait for review and member onboarding. | Explore member benefits and keep the profile updated.",
    "deadline": "\u{1F504} Rolling \u2014 no deadlines or cohorts",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://www.nvidia.com/en-us/startups/",
    "lastVerified": "2026-10-12",
    "primaryCategory": "Accelerators & ecosystem",
    "categorySource": "global/accelerators.md",
    "officialSource": true
  },
  {
    "id": "alibaba-ai-catalyst",
    "name": "Alibaba Cloud AI Catalyst Program",
    "provider": "Alibaba Cloud",
    "region": "China",
    "type": "Credits / accelerator",
    "short": "2B Model Studio tokens and up to $120,000 cloud credits",
    "eligibility": "Online application; official page especially targets AI video/image creation, model aggregators, and content moderation. Further eligibility is assessed during review.",
    "benefits": "Up to 2B free Model Studio tokens. | Up to $120,000 cloud credits. | POC coupons and AI expert office hours. | Events/network access and 12 months of Academy access.",
    "steps": "Check that the product fits the AI Catalyst focus areas. | Submit the official online application. | Provide additional information if requested. | Wait for the stated 4\u20135 business-day notification. | Join the program and activate credits/resources.",
    "deadline": "\u{1F504} Rolling \u2014 no 2026/2027 deadline published",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://www.alibabacloud.com/en/startup/ai?_p_lc=1",
    "lastVerified": "2026-10-12",
    "primaryCategory": "Accelerators & ecosystem",
    "categorySource": "china/cloud-and-ai.md",
    "officialSource": true
  },
  {
    "id": "alibaba-startup-catalyst",
    "name": "Alibaba Cloud Startup Catalyst Program",
    "provider": "Alibaba Cloud",
    "region": "China",
    "type": "Credits",
    "short": "Cloud credits for funded startups",
    "eligibility": "Funded startup founded within the last 10 years; full current tier is confirmed in the application flow.",
    "benefits": "Cloud credits. | Startup support through Alibaba Cloud. | Exact tier confirmed during application.",
    "steps": "Confirm funding and company age. | Open the official redemption/application page. | Submit funding and company information. | Complete review and account linkage. | Redeem the approved cloud credits.",
    "deadline": "\u{1F504} Rolling \u2014 no 2026/2027 deadline published",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://www.alibabacloud.com/en/startup/cloudcreditredemption?_p_lc=1",
    "lastVerified": "2026-10-12",
    "primaryCategory": "Cloud & infrastructure credits",
    "categorySource": "china/cloud-and-ai.md",
    "officialSource": true
  },
  {
    "id": "tencent-cloud-startup",
    "name": "Tencent Cloud Startup Program",
    "provider": "Tencent Cloud",
    "region": "China",
    "type": "Credits / discount / accelerator",
    "short": "Financial support, discounts, training, and marketing opportunities",
    "eligibility": "Designed for VC-backed startups; application requests incorporation, financing stage, VC document, historical cloud billing, product interest, and usage information.",
    "benefits": "Financial support. | Service discounts. | Training resources. | Marketing opportunities and Tencent Cloud ecosystem support.",
    "steps": "Create and identity-verify a Tencent Cloud account. | Prepare VC and historical billing documents. | Complete the official application form. | Submit for approval. | Wait for the stated two-week processing window and activate offers.",
    "deadline": "\u{1F504} Rolling \u2014 applications processed within two weeks",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://www.tencentcloud.com/campaign/startupprogram",
    "lastVerified": "2026-10-12",
    "primaryCategory": "Accelerators & ecosystem",
    "categorySource": "china/cloud-and-ai.md",
    "officialSource": true
  },
  {
    "id": "huawei-cloud-startup",
    "name": "Huawei Cloud Startup Program",
    "provider": "Huawei Cloud",
    "region": "China",
    "type": "Credits / accelerator",
    "short": "$5,000 minimum voucher; possible application up to $150,000",
    "eligibility": "Enterprise established less than 5 years; not listed; no more than 50% of shares held by a listed company; enterprise real-name verification.",
    "benefits": "Minimum $5,000 Huawei Cloud cash-credit voucher. | Possibility to apply for up to $150,000. | Cloud migration, enablement, business resources, and accelerator access.",
    "steps": "Check company age, listing, and ownership rules. | Register a Huawei Cloud account. | Complete enterprise real-name verification. | Apply through the startup center and upload materials. | Wait for qualification review and claim approved benefits.",
    "deadline": "\u{1F504} Rolling \u2014 no 2026/2027 deadline published",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://startup.huaweicloud.com/intl/en-us/index.html",
    "lastVerified": "2026-10-12",
    "primaryCategory": "Accelerators & ecosystem",
    "categorySource": "china/cloud-and-ai.md",
    "officialSource": true
  },
  {
    "id": "startup-edge",
    "name": "Startup EDGE",
    "provider": "Ukrainian Startup Fund",
    "region": "Ukraine",
    "type": "Grant",
    "short": "Up to \u20AC20,000 pre-seed; up to \u20AC40,000 seed",
    "eligibility": "Innovative Ukrainian early-stage startups in Deep Tech, Green Tech, or EdTech; formal compliance, expert evaluation, pitching, committee, board, and agreement stages.",
    "benefits": "Up to \u20AC20,000 pre-seed grant. | Up to \u20AC40,000 seed grant. | Focus on Deep Tech, Green Tech, and EdTech.",
    "steps": "Join the official open-call notification list. | Check sector and stage fit when the call opens. | Prepare compliance and pitch materials. | Submit during the announced call window. | Complete expert evaluation, pitching, committee, board, and grant-agreement stages.",
    "deadline": "\u23F3 Opens soon \u2014 official page says call for applications coming soon",
    "status": "\u23F3 Opens soon",
    "statusKey": "opening",
    "link": "https://usf.com.ua/en/programs/startup-edge",
    "lastVerified": "2026-10-12",
    "primaryCategory": "Grants & funding",
    "categorySource": "ukraine/grants-and-ecosystem.md",
    "officialSource": true
  },
  {
    "id": "usf-ecosystem",
    "name": "Ukrainian Startup Fund \u2014 ecosystem programs",
    "provider": "Ukrainian Startup Fund",
    "region": "Ukraine",
    "type": "Grant / accelerator / ecosystem support",
    "short": "Startup EDGE, AI & Blockchain Sandbox, schools, missions, and other programs",
    "eligibility": "Varies by program; each linked program page has its own rules, sectors, and call status.",
    "benefits": "Grant and non-financial support opportunities. | AI & Blockchain Sandbox. | Tech missions and startup schools. | Seeds of Bravery and corporate innovation programs.",
    "steps": "Open the USF programs directory. | Choose a specific program and read its official rules. | Prepare the program-specific application materials. | Submit through the linked official channel. | Complete the program-specific selection or participation process.",
    "deadline": "\u{1F504} Rolling \u2014 program-specific dates",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://usf.com.ua/en/",
    "lastVerified": "2026-10-12",
    "primaryCategory": "Accelerators & ecosystem",
    "categorySource": "ukraine/grants-and-ecosystem.md",
    "officialSource": true
  },
  {
    "id": "diia-city",
    "name": "Diia City residency",
    "provider": "Ministry of Digital Transformation of Ukraine / Diia City",
    "region": "Ukraine",
    "type": "Discount / legal and tax framework",
    "short": "Preferential tax, GIG contracts, IP protections, and investment tools",
    "eligibility": "Company registered under Ukrainian law; qualified IT/innovation activities; residency conditions and required documents must be met.",
    "benefits": "5% personal income tax, 22% minimum-wage social contribution, and 5% military levy for employment taxes. | 9% distributed-profit or 18% profit-tax model. | GIG contracts, IP protections, and venture-investment instruments.",
    "steps": "Confirm Ukrainian registration and qualified activity. | Prepare the required documents. | Submit the online Diia City residency application. | Wait for review of up to 10 working days. | Maintain residency reporting and compliance requirements.",
    "deadline": "\u{1F504} Rolling \u2014 no annual deadline; online applications",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://city.diia.gov.ua/en/",
    "lastVerified": "2026-10-12",
    "primaryCategory": "SaaS discounts & perks",
    "categorySource": "ukraine/grants-and-ecosystem.md",
    "officialSource": true
  },
  {
    "id": "digitalocean-startups",
    "name": "DigitalOcean Startups / Hatch",
    "provider": "DigitalOcean",
    "region": "Global",
    "type": "Credits / perks",
    "short": "12 months of credits; award level set through the program",
    "eligibility": "New startup; raised $10M or less; active company website; matching company email; registered DigitalOcean team account.",
    "benefits": "12 months of DigitalOcean credits. | Welcome Kit perks and technical/migration assistance. | GPU credits may be separately reviewed; core credits exclude GPU products.",
    "steps": "Check the funding, website, company-email, and prior-credit rules. | Create a new DigitalOcean team account with a company email and valid card. | Open the official Hatch application. | Submit startup and infrastructure details. | Wait for the award level and onboarding instructions.",
    "deadline": "\u{1F504} Rolling \u2014 no 2026/2027 deadline published",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://sammydigitalocean.typeform.com/hatch",
    "lastVerified": "2026-10-12",
    "primaryCategory": "Cloud & infrastructure credits",
    "categorySource": "global/additional-programs.md",
    "officialSource": true
  },
  {
    "id": "cloudflare-startups",
    "name": "Cloudflare for Startups",
    "provider": "Cloudflare",
    "region": "Global",
    "type": "Credits / discount",
    "short": "$10,000\u2013$350,000 credits for one year",
    "eligibility": "Founded within 10 years; funded up to Series B; funded within the last 12 months for funded tiers; technology product; public website; public social presence; first-time applicant.",
    "benefits": "$10,000 Tier 3 credits with no minimum funding. | $100,000 Tier 2 credits. | $350,000 Tier 1 maximum. | Account management, expert sessions, support, and community access by tier.",
    "steps": "Identify the correct tier from funding and partner status. | Verify company age, product, website, social presence, and business email. | Open the official Cloudflare application. | Submit company and funding details. | Wait for review and use benefits within one year if approved.",
    "deadline": "\u{1F504} Rolling \u2014 no 2026/2027 deadline published",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://www.cloudflare.com/startups/",
    "lastVerified": "2026-10-12",
    "primaryCategory": "Cloud & infrastructure credits",
    "categorySource": "global/additional-programs.md",
    "officialSource": true
  },
  {
    "id": "mongodb-startups",
    "name": "MongoDB for Startups",
    "provider": "MongoDB",
    "region": "Global",
    "type": "Credits / technical support",
    "short": "Atlas credits, Voyage AI tokens, technical expertise, and support",
    "eligibility": "Base tier: less than 7 years old; Series A or earlier; scalable software product; active website and LinkedIn; new to the program. VC/accelerator referral is encouraged but non-VC applicants can apply on the page.",
    "benefits": "Atlas credits. | Voyage AI tokens/access. | Technical expertise and dedicated support. | Partner and go-to-market opportunities.",
    "steps": "Check age, stage, product, website, LinkedIn, and prior-program rules. | Prepare company and funding-stage details. | Ask a VC/accelerator partner for referral, or apply directly on the official page. | Complete review and receive a promo code if accepted. | Activate the code as an organization owner or billing admin.",
    "deadline": "\u{1F504} Rolling \u2014 no 2026/2027 deadline published",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://www.mongodb.com/solutions/startups",
    "lastVerified": "2026-10-12",
    "primaryCategory": "Cloud & infrastructure credits",
    "categorySource": "global/additional-programs.md",
    "officialSource": true
  },
  {
    "id": "hubspot-startups",
    "name": "HubSpot for Startups",
    "provider": "HubSpot",
    "region": "Global",
    "type": "Discount",
    "short": "Up to 90% off in year one for eligible funded startups",
    "eligibility": "Pre-seed, Seed, or Series A startups can qualify for 90% off year one when affiliated with an approved partner or with verified venture funding. Approved entrepreneurial organizations can qualify for 30% off year one.",
    "benefits": "90% off year one for eligible pre-seed/Seed/Series A startups. | 50% off year two and 25% off year three for that tier. | 30% off year one for approved entrepreneurial-organization tier and 15% off year two. | Founder resources, training, and community.",
    "steps": "Check funding stage and approved-partner or verification route. | Choose the net-new Professional or Enterprise products. | Open the official HubSpot application. | Submit partner/funding verification and company details. | Complete onboarding and review the annual commitment before purchase.",
    "deadline": "\u{1F504} Rolling \u2014 application route currently available",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://app.hubspot.com/signup-hubspot/hubspot-for-startups",
    "lastVerified": "2026-10-12",
    "primaryCategory": "SaaS discounts & perks",
    "categorySource": "global/additional-programs.md",
    "officialSource": true
  },
  {
    "id": "startup-sg-founder",
    "name": "Startup SG Founder",
    "provider": "Enterprise Singapore",
    "region": "Singapore",
    "type": "Grant / mentorship",
    "short": "S$20,000\u2013S$50,000 grant with 1:1 co-matching and mentorship",
    "eligibility": "First-time entrepreneurs with innovative businesses; must work with an Accredited Mentor Partner and obtain a Letter of Recommendation before applying to EnterpriseSG.",
    "benefits": "S$20,000\u2013S$50,000 startup grant. | 1:1 mentorship and financial support. | Pitch training, networking, and investor/corporate connections. | Secretarial and accounting support.",
    "steps": "Find and engage an Accredited Mentor Partner. | Develop the innovative business proposal and pitch. | Obtain the AMP Letter of Recommendation. | Prepare the co-matching capital evidence and EnterpriseSG application. | Submit through the official application route and complete review.",
    "deadline": "\u{1F504} Rolling \u2014 no 2026/2027 deadline published on the official page",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://www.startupsg.gov.sg/programmes/4894/startup-sg-founder/apply",
    "lastVerified": "2026-10-12",
    "primaryCategory": "Grants & funding",
    "categorySource": "global/additional-programs.md",
    "officialSource": true
  },
  {
    "id": "startup-chile",
    "name": "Start-Up Chile \u2014 Build / Ignite / Growth",
    "provider": "CORFO / Start-Up Chile",
    "region": "Chile / Global founders",
    "type": "Accelerator / grant",
    "short": "Equity-free funding, coworking, mentorship, discounts, and network",
    "eligibility": "Technology-based, innovative, scalable, high-impact businesses; program-specific stage criteria apply. The official application page currently says applications open soon.",
    "benefits": "Equity-free funding. | Free coworking space. | Mentors, experts, board sessions, and pitch sessions. | Investor/corporate/university network and Chile landing support.",
    "steps": "Select the appropriate Build, Ignite, or Growth track. | Monitor the official page until the application opens. | Complete the official form with startup and product information. | Pass eligibility and expert/team evaluation; attend an interview if invited. | Await committee decision and onboarding.",
    "deadline": "\u23F3 Opens soon \u2014 official page says applications open soon; no 2026/2027 deadline published",
    "status": "\u23F3 Opens soon",
    "statusKey": "opening",
    "link": "https://startupchile.org/en/apply/",
    "lastVerified": "2026-10-12",
    "primaryCategory": "Accelerators & ecosystem",
    "categorySource": "global/additional-programs.md",
    "officialSource": true
  },
  {
    "id": "ovhcloud-startup",
    "name": "OVHcloud Startup Program",
    "provider": "OVHcloud",
    "region": "Global",
    "type": "Cloud credits",
    "short": "\u20AC10,000 Start credits; up to \u20AC100,000 Scale credits for 12 months",
    "eligibility": "Startups and scaleups; application and program review required.",
    "benefits": "\u20AC10,000 Start cloud credits. | Up to \u20AC100,000 Scale cloud credits. | Technical support and market/funding access.",
    "steps": "Check level. | Prepare company and infrastructure details. | Apply through the official portal. | Complete review and onboarding.",
    "deadline": "\u{1F504} Rolling \u2014 no general 2026/2027 deadline published",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://startup.ovhcloud.com/en/login/",
    "lastVerified": "2026-10-14",
    "primaryCategory": "Cloud & infrastructure credits",
    "categorySource": "global/verified-credits.md",
    "officialSource": true
  },
  {
    "id": "akamai-rise",
    "name": "Akamai Cloud Rise",
    "provider": "Akamai",
    "region": "Global",
    "type": "Cloud credits",
    "short": "US$500\u2013$120,000 first-year credits; discounted years 2\u20133",
    "eligibility": "For-profit early-stage company under 7 years; qualifying traction, revenue, users, employees, or VC; scaling plan.",
    "benefits": "US$500\u2013$120,000 first-year cloud credits. | Discounted services years 2\u20133. | Engineering guidance and support.",
    "steps": "Create qualifying account. | Submit intake form. | Complete review. | Attend discovery call if invited. | Receive credits.",
    "deadline": "\u{1F504} Rolling \u2014 review usually 1\u20132 weeks",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://www.akamai.com/cloud/start-ups/rise",
    "lastVerified": "2026-10-14",
    "primaryCategory": "Cloud & infrastructure credits",
    "categorySource": "global/verified-credits.md",
    "officialSource": true
  },
  {
    "id": "startup-india-seed-fund",
    "name": "Startup India Seed Fund Scheme",
    "provider": "DPIIT / Startup India",
    "region": "India",
    "type": "Grant / debt support",
    "short": "\u20B9945 crore scheme outlay; grant and debt/convertible support under guidelines",
    "eligibility": "DPIIT-recognised startup incorporated \u22642 years; technology-led idea; Indian promoter shareholding \u226551%; prior government monetary support \u2264\u20B910 lakh.",
    "benefits": "\u20B9945 crore official scheme outlay. | Seed support through eligible incubators. | Grant and debt/convertible support under guidelines.",
    "steps": "Obtain DPIIT recognition. | Review guidelines. | Apply when call is open. | Select eligible incubators where permitted. | Complete evaluation.",
    "deadline": "\u274C 2026 startup deadline published as 31 May 2026; 2027 unconfirmed",
    "status": "\u274C Closed",
    "statusKey": "closed",
    "link": "https://seedfund.startupindia.gov.in/",
    "lastVerified": "2026-10-14",
    "primaryCategory": "Grants & funding",
    "categorySource": "global/verified-credits.md",
    "officialSource": true
  },
  {
    "id": "india-credit-guarantee",
    "name": "Credit Guarantee Scheme for Startups",
    "provider": "Government of India / DPIIT / NCGTC",
    "region": "India",
    "type": "Credit guarantee",
    "short": "Guarantee cover up to \u20B920 crore per eligible borrower",
    "eligibility": "DPIIT-recognised startup not in default or NPA; eligibility certified by a Member Institution.",
    "benefits": "Guarantee cover up to \u20B920 crore. | 85% cover up to \u20B910 crore. | 75% cover above \u20B910 crore, subject to scheme rules.",
    "steps": "Confirm DPIIT recognition. | Check Jan Samarth or Member Institution eligibility. | Prepare borrowing documents. | Apply for debt. | Lender handles guarantee cover.",
    "deadline": "\u{1F504} Rolling \u2014 lender/Jan Samarth route; no annual deadline published",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://www.startupindia.gov.in/content/sih/en/credit-guarantee-scheme-for-startups.html",
    "lastVerified": "2026-10-14",
    "primaryCategory": "Grants & funding",
    "categorySource": "global/verified-credits.md",
    "officialSource": true
  },
  {
    "id": "canada-iaf",
    "name": "Investment Accelerator Fund",
    "provider": "Government of Ontario / MaRS",
    "region": "Ontario, Canada",
    "type": "Investment / seed funding",
    "short": "Up to C$500,000 may be available",
    "eligibility": "Emerging Ontario technology companies, especially IT, health, and cleantech; current intake assessment applies.",
    "benefits": "Potential investment funding up to C$500,000. | Focus on IT, health, and cleantech.",
    "steps": "Confirm Ontario eligibility. | Review MaRS IAF route. | Prepare company and financing details. | Submit or contact program. | Complete assessment.",
    "deadline": "\u{1F504} Program-specific \u2014 confirm current intake",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://sbs-spe.feddevontario.canada.ca/en/technology-and-innovation-financial-support",
    "lastVerified": "2026-10-14",
    "primaryCategory": "Grants & funding",
    "categorySource": "global/verified-credits.md",
    "officialSource": true
  },
  {
    "id": "canexport-innovation",
    "name": "CanExport Innovation",
    "provider": "Trade Commissioner Service, Government of Canada",
    "region": "Canada",
    "type": "Grant / cost share",
    "short": "Up to 75% of eligible costs up to C$75,000",
    "eligibility": "Canadian SME, university, or non-government research centre developing technology with an international partner.",
    "benefits": "Up to 75% partnership-development cost share. | Maximum C$75,000.",
    "steps": "Check applicant and partner requirements. | Define project. | Prepare eligible costs. | Apply through official route. | Complete assessment.",
    "deadline": "\u{1F504} Timing varies \u2014 confirm current intake",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://www.tradecommissioner.gc.ca/en/our-solutions/funding-financing-international-business/canexport-innovation.html",
    "lastVerified": "2026-10-14",
    "primaryCategory": "Grants & funding",
    "categorySource": "global/verified-credits.md",
    "officialSource": true
  },
  {
    "id": "australia-rdti",
    "name": "Australian R&D Tax Incentive",
    "provider": "Australian Government / DISR / ATO",
    "region": "Australia",
    "type": "R&D tax offset",
    "short": "Refundable offset for eligible R&D; corporate tax rate plus 18.5% premium under A$20m turnover",
    "eligibility": "Eligible Australian R&D entity conducting eligible R&D and maintaining records.",
    "benefits": "Refundable tax offset for qualifying smaller companies. | Corporate tax rate plus 18.5% premium under A$20m turnover.",
    "steps": "Self-assess. | Conduct and record R&D. | Register activities. | Lodge tax schedule. | Claim offset.",
    "deadline": "\u{1F504} Rolling by income year \u2014 apply within 10 months after income year end",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://business.gov.au/grants-and-programs/research-and-development-tax-incentive/overview-of-rd-tax-incentive",
    "lastVerified": "2026-10-14",
    "primaryCategory": "Grants & funding",
    "categorySource": "global/verified-credits.md",
    "officialSource": true
  },
  {
    "id": "uk-bic-innovation",
    "name": "BIC Innovation Grant Sunderland",
    "provider": "BIC Innovation / UK Government business finance directory",
    "region": "Sunderland, United Kingdom",
    "type": "Grant",
    "short": "40% contribution for innovative projects valued \xA35,000\u2013\xA325,000",
    "eligibility": "Local Sunderland and current-call requirements apply.",
    "benefits": "40% grant contribution. | Innovative project support.",
    "steps": "Confirm local eligibility. | Open official listing. | Prepare project costs. | Submit locally. | Complete assessment.",
    "deadline": "\u{1F504} Listed officially; current local deadline not published",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://www.gov.uk/business-finance-support/bic-innovation-grant-sunderland",
    "lastVerified": "2026-10-14",
    "primaryCategory": "Grants & funding",
    "categorySource": "global/verified-credits.md",
    "officialSource": true
  },
  {
    "id": "france-bourse-french-tech",
    "name": "Bourse French Tech",
    "provider": "Bpifrance",
    "region": "France",
    "type": "Grant",
    "short": "Up to 70% of eligible costs, capped at \u20AC30,000",
    "eligibility": "Innovative company-creation project with eligible internal or external R&D expenditure.",
    "benefits": "Up to 70% eligible R&D expenses. | Maximum \u20AC30,000 grant.",
    "steps": "Confirm eligibility. | Prepare R&D plan. | Apply through Bpifrance. | Complete review. | Contract and claim.",
    "deadline": "\u{1F504} Availability and calls vary; no universal 2026/2027 deadline",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://www.bpifrance.fr/catalogue-offres/bourse-french-tech",
    "lastVerified": "2026-10-14",
    "primaryCategory": "Grants & funding",
    "categorySource": "global/verified-credits.md",
    "officialSource": true
  },
  {
    "id": "france-tech-emergence",
    "name": "French Tech Emergence",
    "provider": "Bpifrance",
    "region": "France",
    "type": "Deep-tech grant",
    "short": "Up to 70% of eligible costs, capped at \u20AC90,000",
    "eligibility": "Company-creation project based on breakthrough, high-technology deep-tech innovation.",
    "benefits": "Up to 70% eligible forecast expenses. | Maximum \u20AC90,000 grant.",
    "steps": "Confirm deep-tech eligibility. | Prepare innovation plan. | Apply through Bpifrance. | Complete evaluation. | Contract and claim.",
    "deadline": "\u{1F504} Availability and calls vary; no universal 2026/2027 deadline",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://www.bpifrance.fr/catalogue-offres/bourse-french-tech-emergence",
    "lastVerified": "2026-10-14",
    "primaryCategory": "Grants & funding",
    "categorySource": "global/verified-credits.md",
    "officialSource": true
  },
  {
    "id": "nedo-deep-tech",
    "name": "NEDO Deep-Tech Startups Support \u2014 International Joint R&D",
    "provider": "NEDO",
    "region": "Japan + partner countries",
    "type": "Subsidy",
    "short": "Up to \xA5100 million per project; maximum two-thirds of total cost",
    "eligibility": "Unlisted Japanese SME with main R&D base in Japan; generally \u226410 years or within 5 years of first qualifying startup investment; international partner required.",
    "benefits": "Up to \xA5100 million subsidy. | International joint R&D. | About 2\u20133 year supported project.",
    "steps": "Confirm Japanese and partner eligibility. | Define joint deep-tech R&D. | Watch NEDO call. | Submit. | Complete evaluation and contracting.",
    "deadline": "\u{1F504} FY2023\u2013FY2031 program; individual calls have deadlines",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://www.nedo.go.jp/english/activities/activities_ZZJP_100262.html",
    "lastVerified": "2026-10-14",
    "primaryCategory": "Grants & funding",
    "categorySource": "global/verified-credits.md",
    "officialSource": true
  },
  {
    "id": "vercel-startups",
    "name": "Vercel for Startups",
    "provider": "Vercel",
    "region": "Global",
    "type": "Startup credits",
    "short": "Up to $30,000 flexible commitment credits for one year",
    "eligibility": "Approved startup partner; Series A or earlier; apply within 12 months of latest round; website, matching work email, proof of affiliation",
    "benefits": "$30,000 credits. | Enterprise terms for one year. | Vercel and v0 access. | Slack and startup events.",
    "steps": "Select team. | Choose partner. | Upload proof. | Submit. | Accept terms.",
    "deadline": "\u{1F504} Rolling \u2014 review typically 5\u20137 days",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://vercel.com/startups/credits",
    "lastVerified": "2026-10-14",
    "primaryCategory": "Cloud & infrastructure credits",
    "categorySource": "global/resourify-verified.md",
    "officialSource": true
  },
  {
    "id": "miro-startup-program",
    "name": "Miro Startup Program",
    "provider": "Miro",
    "region": "Global",
    "type": "Startup credits",
    "short": "$1,000 via a Miro partner or $500 independent application",
    "eligibility": "Free Miro account; partner route or independent verification; work email; partner tier generally fewer than 30 employees",
    "benefits": "$1,000 partner credit. | $500 independent credit. | Startup collaboration workspace.",
    "steps": "Create free account. | Use partner link or official form. | Submit eligibility. | Remain on free plan. | Apply credit after approval.",
    "deadline": "\u{1F504} Rolling \u2014 independent review may take up to 15 days",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://miro.com/startups/apply/",
    "lastVerified": "2026-10-14",
    "primaryCategory": "Cloud & infrastructure credits",
    "categorySource": "global/resourify-verified.md",
    "officialSource": true
  },
  {
    "id": "elevenlabs-startup-grants",
    "name": "ElevenLabs Startup Grants",
    "provider": "ElevenLabs",
    "region": "Global",
    "type": "Grant / credits",
    "short": "33M characters; over 680 hours of Agents usage; 12 months; stated value $5,500+",
    "eligibility": "Startup or company with fewer than 25 employees; monetized long-term product; valid business email; no agencies or consultancies",
    "benefits": "$5,500+ stated value. | Voice, speech, sound, and Agents access. | Founder community.",
    "steps": "Complete application. | Describe product and team. | Wait for review. | Receive grant plan if accepted.",
    "deadline": "\u{1F504} Rolling \u2014 no deadline; response typically within one week",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://elevenlabs.io/grants-application",
    "lastVerified": "2026-10-14",
    "primaryCategory": "Grants & funding",
    "categorySource": "global/resourify-verified.md",
    "officialSource": true
  },
  {
    "id": "airtable-startups",
    "name": "Airtable for Startups",
    "provider": "Airtable",
    "region": "Global",
    "type": "Startup credits",
    "short": "$500 free workspace credit",
    "eligibility": "Airtable account; name, work email, LinkedIn, workspace ID, and company information",
    "benefits": "$500 Airtable credit. | Startup content and educational materials.",
    "steps": "Create account. | Find workspace ID. | Complete official form. | Wait for review. | Use credit if approved.",
    "deadline": "\u{1F504} Rolling \u2014 official form says 3\u20135 days review",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://www.airtable.com/startups",
    "lastVerified": "2026-10-14",
    "primaryCategory": "Cloud & infrastructure credits",
    "categorySource": "global/resourify-verified.md",
    "officialSource": true
  },
  {
    "id": "deepgram-startups",
    "name": "Deepgram for Startups",
    "provider": "Deepgram",
    "region": "Global",
    "type": "Startup credits",
    "short": "Up to $100,000 API credits for 12 months",
    "eligibility": "AI builder or early-stage startup; in production or launching within 6 months; active building and community engagement",
    "benefits": "$100,000 API credits. | Startup community. | Engineering support.",
    "steps": "Create account. | Get Project ID. | Apply. | Await review. | Use credits after acceptance.",
    "deadline": "\u{1F504} Rolling \u2014 response usually within one week",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://deepgram.com/startup-program",
    "lastVerified": "2026-10-14",
    "primaryCategory": "Cloud & infrastructure credits",
    "categorySource": "global/resourify-verified.md",
    "officialSource": true
  },
  {
    "id": "vultr-promotional-credits",
    "name": "Vultr Promotional Credits",
    "provider": "Vultr",
    "region": "Global",
    "type": "Cloud promotional credits",
    "short": "$100 match or $200/$250/$300 promotional credit depending on official code",
    "eligibility": "New customers; selected products only; offers cannot be combined",
    "benefits": "$100 deposit match. | $200, $250, or $300 promotional credit. | Cloud trial access.",
    "steps": "Open official coupon page. | Choose one offer. | Create account. | Enter code. | Review terms before provisioning.",
    "deadline": "\u{1F504} Official coupon page live; expiry not universally published",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://www.vultr.com/coupons/",
    "lastVerified": "2026-10-14",
    "primaryCategory": "Cloud & infrastructure credits",
    "categorySource": "global/resourify-verified.md",
    "officialSource": true
  },
  {
    "id": "perplexity-startups",
    "name": "Perplexity Startups",
    "provider": "Perplexity",
    "region": "Global",
    "type": "AI tools / startup support",
    "short": "AI research, multi-model workflows, and API access for startup teams",
    "eligibility": "Startup access and any current offer terms are confirmed through the official Perplexity Startups page.",
    "benefits": "Research and answers backed by citations. | Multi-model orchestration and web-first workflows. | Access to Perplexity capabilities and API information for building and shipping.",
    "steps": "Open the official Perplexity Startups page. | Review the current startup offer and eligibility. | Submit through the official route when available. | Complete any startup verification requested. | Activate the approved workspace or benefits.",
    "deadline": "\u{1F504} Rolling \u2014 official startup page is live; offer terms may change",
    "status": "\u{1F504} Rolling",
    "statusKey": "rolling",
    "link": "https://www.perplexity.ai/startups",
    "lastVerified": "2026-10-24",
    "primaryCategory": "SaaS discounts & perks",
    "categorySource": "Official Perplexity Startups page",
    "officialSource": true
  }
];
var programCategories = ["All", ...new Set(programs.map((program) => program.primaryCategory))];
var programRegions = ["All", ...new Set(programs.map((program) => program.region))];

// server/routers.ts
var registrationInput = z2.object({
  name: z2.string().trim().min(2).max(160),
  email: z2.string().trim().email().max(320),
  phone: z2.string().trim().min(6).max(40),
  country: z2.string().trim().min(2).max(8),
  dialCode: z2.string().trim().min(2).max(12),
  stage: z2.string().trim().min(2).max(100),
  goal: z2.string().trim().min(3).max(4e3),
  language: z2.enum(["ar", "en"]).default("ar")
});
var statusSchema = z2.enum(["new", "contacted", "qualified", "archived"]);
function databaseError(error) {
  console.error("[API] Database operation failed", error);
  throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR", message: "Database is not configured or unavailable" });
}
var appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true };
    })
  }),
  registration: router({
    create: publicProcedure.input(registrationInput).mutation(async ({ input, ctx }) => {
      try {
        const id = await createRegistration({ ...input, status: "new" });
        await issueRegistrationAccess(id, ctx.res);
        return { success: true, registrationId: id };
      } catch (error) {
        return databaseError(error);
      }
    }),
    accessStatus: publicProcedure.query(async ({ ctx }) => ({ registered: Boolean(await getRegistrationAccessId(ctx.req)) }))
  }),
  directory: router({
    list: publicProcedure.query(async ({ ctx }) => {
      const registrationId = await getRegistrationAccessId(ctx.req);
      if (!registrationId) throw new TRPCError3({ code: "UNAUTHORIZED", message: "Registration required" });
      return { programs, registrationId };
    })
  }),
  admin: router({
    stats: adminProcedure.query(async () => {
      try {
        return getRegistrationStats();
      } catch (error) {
        return databaseError(error);
      }
    }),
    registrations: adminProcedure.input(z2.object({ query: z2.string().optional(), country: z2.string().optional(), stage: z2.string().optional(), status: z2.union([statusSchema, z2.literal("All")]).optional() }).optional()).query(async ({ input }) => {
      try {
        return listRegistrations(input);
      } catch (error) {
        return databaseError(error);
      }
    }),
    updateRegistration: adminProcedure.input(z2.object({ id: z2.number().int().positive(), status: statusSchema, notes: z2.string().max(4e3).optional() })).mutation(async ({ input }) => {
      try {
        return updateRegistrationStatus(input.id, input.status, input.notes);
      } catch (error) {
        return databaseError(error);
      }
    })
  })
});

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
var isNonEmptyString2 = (value) => typeof value === "string" && value.length > 0;
var EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
var GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
var GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
var OAuthService = class {
  constructor(client) {
    this.client = client;
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error(
        "[OAuth] ERROR: MANUS_OAUTH_API_URL is not configured! Set MANUS_OAUTH_API_URL environment variable."
      );
    }
  }
  decodeState(state) {
    return decodeOAuthState(state).redirectUri;
  }
  async getTokenByCode(code, state) {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state)
    };
    const { data } = await this.client.post(
      EXCHANGE_TOKEN_PATH,
      payload
    );
    return data;
  }
  async getUserInfoByToken(token) {
    const { data } = await this.client.post(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken
      }
    );
    return data;
  }
};
var createOAuthHttpClient = () => axios.create({
  baseURL: ENV.oAuthServerUrl,
  timeout: AXIOS_TIMEOUT_MS
});
var SDKServer = class {
  client;
  oauthService;
  constructor(client = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }
  deriveLoginMethod(platforms, fallback) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set(
      platforms.filter((p) => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }
  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(code, state) {
    return this.oauthService.getTokenByCode(code, state);
  }
  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken) {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken
    });
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) {
      return /* @__PURE__ */ new Map();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    if (!secret) throw new Error("MANUS_JWT_SECRET is unavailable");
    return new TextEncoder().encode(secret);
  }
  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(openId, options = {}) {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || ""
      },
      options
    );
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name
    }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { openId, appId, name } = payload;
      if (!isNonEmptyString2(openId) || (!isNonEmptyString2(appId) || appId !== ENV.appId) || typeof name !== "string") {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }
      return {
        openId,
        appId,
        name
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }
  async getUserInfoWithJwt(jwtToken) {
    const payload = {
      jwtToken,
      projectId: ENV.appId
    };
    const { data } = await this.client.post(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  async authenticateRequest(req) {
    const cookies = this.parseCookies(req.headers.cookie);
    let sessionToken = cookies.get(COOKIE_NAME);
    if (!sessionToken && req.path.startsWith("/api/scheduled/")) {
      const ticket = cookies.get("app_session_id");
      const identity = await this.verifySession(ticket);
      if (identity?.openId.startsWith(CRON_OPEN_ID_PREFIX)) sessionToken = ticket;
    }
    if (!sessionToken) {
      const authHeader = req.headers.authorization;
      if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
        sessionToken = authHeader.slice(7);
      }
    }
    const session = await this.verifySession(sessionToken);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    if (session.openId.startsWith(CRON_OPEN_ID_PREFIX)) {
      const userInfo = await this.getUserInfoWithJwt(sessionToken ?? "");
      const taskUid = userInfo.taskUid ?? null;
      if (!taskUid) {
        throw ForbiddenError("Cron session missing task_uid");
      }
      return buildCronUser(userInfo);
    }
    const sessionUserId = session.openId;
    const signedInAt = /* @__PURE__ */ new Date();
    let user = await getUserByOpenId(sessionUserId);
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionToken ?? "");
        await upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt
        });
        user = await getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }
    if (!user) {
      throw ForbiddenError("User not found");
    }
    await upsertUser({
      openId: user.openId,
      lastSignedIn: signedInAt
    });
    return user;
  }
};
var CRON_OPEN_ID_PREFIX = "cron_";
function buildCronUser(userInfo) {
  const now = /* @__PURE__ */ new Date();
  return {
    id: -1,
    openId: userInfo.openId,
    name: userInfo.name || "Manus Scheduled Task",
    email: null,
    loginMethod: null,
    role: "user",
    createdAt: now,
    updatedAt: now,
    lastSignedIn: now,
    taskUid: userInfo.taskUid ?? void 0,
    isCron: true
  };
}
var sdk = new SDKServer();

// server/_core/context.ts
async function createContext(opts) {
  let user = null;
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server-runtime/trpc-entry.ts
var app = express();
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ limit: "2mb", extended: true }));
app.use(createExpressMiddleware({ router: appRouter, createContext }));
function handler(req, res) {
  return app(req, res);
}
export {
  handler as default
};
