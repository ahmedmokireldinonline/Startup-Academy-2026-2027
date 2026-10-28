-- Startup Academy paid access foundation
-- Apply in Supabase SQL Editor after the project connection is available.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  country text,
  language text not null default 'ar',
  role text not null default 'member' check (role in ('member','admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tiers (
  id text primary key,
  name text not null unique,
  price_usd integer not null check (price_usd > 0),
  description text not null default '',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.tiers (id, name, price_usd, description)
values
  ('standard', 'Standard Access', 3000, 'Lifetime access to the standard startup grants and learning library.'),
  ('vip', 'VIP Full Access', 7000, 'Lifetime access to all available grants, protected sources, and premium support.' )
on conflict (id) do update set name = excluded.name, price_usd = excluded.price_usd, description = excluded.description;

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  email text not null,
  full_name text not null,
  country text not null,
  language text not null default 'ar',
  startup_stage text not null,
  goal text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.entitlements (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  tier_id text not null references public.tiers(id),
  status text not null default 'active' check (status in ('pending','active','revoked')),
  source text not null default 'manual' check (source in ('manual','stripe')),
  stripe_payment_intent_id text unique,
  granted_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.protected_sources (
  id uuid primary key default gen_random_uuid(),
  program_key text not null unique,
  provider text not null,
  program_name text not null,
  source_url text not null,
  minimum_tier_id text not null references public.tiers(id),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.source_access_logs (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  source_id uuid not null references public.protected_sources(id) on delete cascade,
  granted boolean not null,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.tiers enable row level security;
alter table public.registrations enable row level security;
alter table public.entitlements enable row level security;
alter table public.protected_sources enable row level security;
alter table public.source_access_logs enable row level security;
alter table public.audit_logs enable row level security;

-- Authenticated users may read their own profile and entitlements.
create policy if not exists profiles_self_read on public.profiles for select using (auth.uid() = id);
create policy if not exists entitlements_self_read on public.entitlements for select using (profile_id = auth.uid());

-- Tier names/prices are public; protected source URLs are never client-readable.
create policy if not exists tiers_public_read on public.tiers for select using (is_active = true);

-- Registration writes should go through a server-side endpoint using the service role.
-- No anonymous insert policy is created intentionally.

-- Admin checks must be implemented server-side; never trust a client-provided role.
