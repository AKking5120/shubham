-- Run this in Supabase → SQL Editor → Run (if admin save says app_settings is missing)

create table if not exists public.app_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.app_settings enable row level security;

-- Next.js admin API uses SUPABASE_SERVICE_ROLE_KEY (bypasses RLS).
-- No public policies are required for site content / calculator saves.

grant all on table public.app_settings to service_role;
grant all on table public.app_settings to postgres;
