-- Shubham Prints & Stationers — run in Supabase SQL Editor

create table if not exists public.services (
  id text primary key,
  slug text unique not null,
  name text not null,
  short_description text not null default '',
  description text not null default '',
  image text not null default '',
  enabled boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key,
  name text not null,
  category text not null,
  description text not null default '',
  image text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.enquiries (
  id text primary key,
  customer_name text not null,
  phone text not null,
  email text not null default '',
  service text not null default '',
  quantity text not null default '',
  size text not null default '',
  material text not null default '',
  color_requirement text not null default '',
  message text not null default '',
  uploaded_file text,
  status text not null default 'New',
  created_at timestamptz not null default now()
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx on public.enquiries (status);
create index if not exists services_sort_order_idx on public.services (sort_order);

alter table public.services enable row level security;
alter table public.products enable row level security;
alter table public.enquiries enable row level security;

-- Public read (enabled services + all gallery products)
create policy "Public read enabled services"
  on public.services for select
  using (enabled = true);

create policy "Public read products"
  on public.products for select
  using (true);

-- Public can submit enquiries (optional if using service role from API only)
create policy "Public insert enquiries"
  on public.enquiries for insert
  with check (true);

-- Service role key (used in Next.js API) bypasses RLS.

-- Admin-editable JSON (site content, price calculator, design overrides)
create table if not exists public.app_settings (
  key text primary key,
  value jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

alter table public.app_settings enable row level security;
