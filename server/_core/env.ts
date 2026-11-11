// Platform values are read at use time. See the Webdev service/authentication skills.
export const ENV = {
  get appId() { return process.env.MANUS_PROJECT_ID ?? ""; },
  get cookieSecret() { return process.env.MANUS_JWT_SECRET ?? ""; },
  get databaseUrl() { return process.env.DATABASE_URL ?? ""; },
  get oAuthServerUrl() { return process.env.MANUS_OAUTH_API_URL ?? ""; },
  // Preserve the legacy hint when supplied; otherwise roles remain application data.
  get ownerOpenId() { return process.env.OWNER_OPEN_ID ?? ""; },
  get adminEmail() { return process.env.ADMIN_EMAIL ?? ""; },
  get adminPasswordHash() { return process.env.ADMIN_PASSWORD_HASH ?? ""; },
  get adminSessionSecret() { return process.env.ADMIN_SESSION_SECRET ?? ""; },
  get supabaseUrl() { return process.env.SUPABASE_URL ?? ""; },
  get supabaseAnonKey() { return process.env.SUPABASE_ANON_KEY ?? ""; },
  get supabaseAdminSecret() { return process.env.SUPABASE_ADMIN_SECRET ?? ""; },
  get isProduction() { return process.env.NODE_ENV === "production"; },
  get forgeApiUrl() { return process.env.MANUS_API_URL ?? ""; },
  get forgeApiKey() { return process.env.MANUS_API_KEY ?? ""; },
  get resendApiKey() { return process.env.RESEND_API_KEY ?? ""; },
  get resendFromEmail() { return process.env.RESEND_FROM_EMAIL ?? ""; },
};
