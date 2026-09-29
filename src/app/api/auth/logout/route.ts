import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-auth";
import { isSupabaseAuthConfigured } from "@/lib/supabase/auth-config";

export async function POST() {
  if (!isSupabaseAuthConfigured()) {
    return NextResponse.json({ ok: true });
  }
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  return NextResponse.json({ ok: true });
}
