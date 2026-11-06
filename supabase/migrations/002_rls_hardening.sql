-- RLS hardening for protected customer data.
-- Keep all registration and entitlement writes server-side with the Supabase service role.
-- The browser must never receive SUPABASE_ADMIN_SECRET.

revoke all on table public.profiles from anon, authenticated;
revoke all on table public.registrations from anon, authenticated;
revoke all on table public.entitlements from anon, authenticated;
revoke all on table public.protected_sources from anon, authenticated;
revoke all on table public.source_access_logs from anon, authenticated;
revoke all on table public.audit_logs from anon, authenticated;

grant select on table public.tiers to anon, authenticated;

-- No INSERT/UPDATE/DELETE/SELECT policy is granted to anon or authenticated for
-- registrations or protected sources. Server-side API calls use service_role,
-- which bypasses RLS while the secret remains outside the client bundle.
