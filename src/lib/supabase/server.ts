import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type ServiceRow = {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  description: string;
  image: string;
  enabled: boolean;
  sort_order: number;
  created_at?: string;
};

export type ProductRow = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  created_at?: string;
};

export type ProfileRow = {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  address_line1: string;
  address_line2: string;
  city: string;
  pincode: string;
  updated_at?: string;
};

export type OrderRow = {
  id: string;
  order_number: string;
  user_id: string | null;
  customer_name: string;
  phone: string;
  email: string;
  address_line1: string;
  address_line2: string;
  city: string;
  pincode: string;
  items: unknown;
  subtotal: number;
  delivery_fee: number;
  total: number;
  payment_method: string;
  payment_status: string;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  status: string;
  notes: string;
  created_at?: string;
  updated_at?: string;
};

export type EnquiryRow = {
  id: string;
  customer_name: string;
  phone: string;
  email: string;
  service: string;
  quantity: string;
  size: string;
  material: string;
  color_requirement: string;
  message: string;
  uploaded_file: string | null;
  status: string;
  created_at?: string;
};

export type ReviewRow = {
  id: string;
  customer_name: string;
  rating: number;
  message: string;
  created_at?: string;
};

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

let adminClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured. Set env variables in .env.local");
  }
  if (!adminClient) {
    adminClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
  }
  return adminClient;
}
