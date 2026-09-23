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
