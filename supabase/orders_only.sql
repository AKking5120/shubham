-- Run in Supabase SQL Editor if orders table is missing (existing projects).

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

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_order_number_idx on public.orders (order_number);
create index if not exists orders_phone_idx on public.orders (phone);

alter table public.orders enable row level security;
