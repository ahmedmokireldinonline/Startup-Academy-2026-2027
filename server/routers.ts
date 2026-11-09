import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { systemRouter } from "./_core/systemRouter";
import { getSessionCookieOptions } from "./_core/cookies";
import { COOKIE_NAME } from "../shared/const";
import { bulkCreateRegistrations, createRegistration, getRegistrationStats, listRegistrations, updateRegistrationStatus } from "./db";
import { getRegistrationAccessId, issueRegistrationAccess } from "./access";
import { programs } from "./programCatalog";
import { investorCatalog } from "./investorCatalog";

const registrationInput = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().min(6).max(40),
  country: z.string().trim().min(2).max(8),
  dialCode: z.string().trim().min(2).max(12),
  stage: z.string().trim().min(2).max(100),
  goal: z.string().trim().min(3).max(4000),
  language: z.enum(["ar", "en"]).default("ar"),
});

const statusSchema = z.enum(["new", "contacted", "qualified", "archived"]);

const importedRegistration = registrationInput.extend({
  status: statusSchema.optional(),
  notes: z.string().max(4000).optional(),
}).transform((item) => ({ ...item, status: item.status ?? "new" as const }));

function databaseError(error: unknown): never {
  console.error("[API] Database operation failed", error);
  const detail = error instanceof Error ? error.message : "Unknown database error";
  throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: detail });
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  registration: router({
    create: publicProcedure.input(registrationInput).mutation(async ({ input, ctx }) => {
      try {
        const id = await createRegistration({ ...input, status: "new" });
        await issueRegistrationAccess(id, ctx.res);
        return { success: true, registrationId: id } as const;
      } catch (error) {
        return databaseError(error);
      }
    }),
    accessStatus: publicProcedure.query(async ({ ctx }) => ({ registered: Boolean(await getRegistrationAccessId(ctx.req)) })),
  }),

  directory: router({
    list: publicProcedure.query(async ({ ctx }) => {
      const registrationId = await getRegistrationAccessId(ctx.req);
      if (!registrationId) throw new TRPCError({ code: "UNAUTHORIZED", message: "Registration required" });
      return { programs, registrationId };
    }),
  }),

  investors: router({
    public: publicProcedure.query(() => ({
      // Keep all non-secret source fields available for the public directory's detail view.
      investors: investorCatalog.map(({ id, name, type, location, locations, countries, focus, role, details, investmentsCount, image, url, source, sources, profileUrls }) => ({ id, name, type, location, locations, countries, focus, role, details, investmentsCount, image, url, source, sources, profileUrls })),
      total: investorCatalog.length,
      countries: Array.from(new Set(investorCatalog.flatMap((item) => item.countries))).sort(),
    })),
    full: publicProcedure.query(async ({ ctx }) => {
      const registrationId = await getRegistrationAccessId(ctx.req);
      if (!registrationId) throw new TRPCError({ code: "UNAUTHORIZED", message: "Paid access required" });
      return { investors: investorCatalog, registrationId };
    }),
  }),

  admin: router({
    stats: adminProcedure.query(async () => {
      try { return getRegistrationStats(); } catch (error) { return databaseError(error); }
    }),
    registrations: adminProcedure.input(z.object({ query: z.string().optional(), country: z.string().optional(), stage: z.string().optional(), status: z.union([statusSchema, z.literal("All")]).optional() }).optional()).query(async ({ input }) => {
      try { return listRegistrations(input); } catch (error) { return databaseError(error); }
    }),
    importRegistrations: adminProcedure.input(z.object({ rows: z.array(importedRegistration).min(1).max(1000) })).mutation(async ({ input }) => {
      try { return bulkCreateRegistrations(input.rows); } catch (error) { return databaseError(error); }
    }),
    updateRegistration: adminProcedure.input(z.object({ id: z.number().int().positive(), status: statusSchema, notes: z.string().max(4000).optional() })).mutation(async ({ input }) => {
      try { return updateRegistrationStatus(input.id, input.status, input.notes); } catch (error) { return databaseError(error); }
    }),
  }),
});

export type AppRouter = typeof appRouter;
