import { createBrowserClient } from "@supabase/ssr";
import { isSupabaseAuthConfigured } from "@/lib/supabase/auth-config";

export function createSupabaseBrowserClient() {
  if (!isSupabaseAuthConfigured()) {
    throw new Error(
      "Customer login is not configured. Set NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
