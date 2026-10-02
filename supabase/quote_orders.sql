-- Quote inquiries, confirmed orders, artwork, and status history.
-- Run in the Supabase SQL editor. Service role (Next.js API) bypasses RLS.

create table if not exists public.quote_inquiries (
  id text primary key,
  customer_name text not null,
  phone text not null,
  email text not null default '',
  category text not null,
  category_slug text not null,
  product_category text not null,
  product_category_slug text not null,
  product text not null,
  product_slug text not null,
  size text not null default '',
  quantity text not null default '',
  pages_set text not null default '',
  printing_color text not null default '',
  description text not null default '',
  status text not null default 'new_quote',
  order_id text unique,
  order_created_at timestamptz,
  admin_notes text not null default '',
  expected_completion date,
  payment_amount numeric,
  payment_status text not null default 'unpaid',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quote_orders (
  id text primary key,
  inquiry_id text not null unique references public.quote_inquiries (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.quote_artwork (
  id text primary key,
  inquiry_id text not null unique references public.quote_inquiries (id) on delete cascade,
  original_name text not null,
  mime_type text not null default 'application/octet-stream',
  size_bytes integer not null default 0,
  storage text not null,
  storage_key text not null,
  resource_type text not null default 'raw',
  created_at timestamptz not null default now()
);

create table if not exists public.quote_status_history (
  id text primary key,
  inquiry_id text not null references public.quote_inquiries (id) on delete cascade,
  previous_status text,
  new_status text not null,
  changed_at timestamptz not null default now(),
  changed_by text not null default 'admin'
);

create index if not exists quote_inquiries_created_idx
  on public.quote_inquiries (created_at desc);
create index if not exists quote_inquiries_status_idx
  on public.quote_inquiries (status);
create index if not exists quote_inquiries_phone_idx
  on public.quote_inquiries (phone);
create index if not exists quote_status_history_inquiry_idx
  on public.quote_status_history (inquiry_id, changed_at);

alter table public.quote_inquiries enable row level security;
alter table public.quote_orders enable row level security;
alter table public.quote_artwork enable row level security;
alter table public.quote_status_history enable row level security;

grant all on table public.quote_inquiries to service_role;
grant all on table public.quote_orders to service_role;
grant all on table public.quote_artwork to service_role;
grant all on table public.quote_status_history to service_role;
