-- Run in Supabase SQL Editor (existing projects).
-- Stores customer reviews and a simple website visit counter.

create table if not exists public.reviews (
  id text primary key,
  customer_name text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists reviews_created_at_idx on public.reviews (created_at desc);

alter table public.reviews enable row level security;

create table if not exists public.site_counters (
  key text primary key,
  value bigint not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.site_counters enable row level security;

insert into public.site_counters (key, value)
values ('visits', 0)
on conflict (key) do nothing;
