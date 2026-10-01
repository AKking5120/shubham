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
-- If you only need this table on an existing project, run supabase/app_settings_only.sql
create table if not exists public.app_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.app_settings enable row level security;

grant all on table public.app_settings to service_role;
grant all on table public.app_settings to postgres;

create table if not exists public.orders (
  id text primary key,
  order_number text unique not null,
  customer_name text not null,
  phone text not null,
  email text not null default '',
  address_line1 text not null,
  address_line2 text not null default '',
  city text not null default 'New Delhi',
  pincode text not null,
  items jsonb not null default '[]'::jsonb,
  subtotal numeric not null default 0,
  delivery_fee numeric not null default 0,
  total numeric not null default 0,
  payment_method text not null default 'cod',
  payment_status text not null default 'pending',
  razorpay_order_id text,
  razorpay_payment_id text,
  status text not null default 'placed',
  notes text not null default '',
  user_id uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '',
  phone text not null default '',
  email text not null default '',
  address_line1 text not null default '',
  address_line2 text not null default '',
  city text not null default 'New Delhi',
  pincode text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_order_number_idx on public.orders (order_number);
create index if not exists orders_phone_idx on public.orders (phone);
create index if not exists orders_user_id_idx on public.orders (user_id);

alter table public.orders enable row level security;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
