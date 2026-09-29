import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseAuthConfigured } from "@/lib/supabase/auth-config";
import { absoluteUrl } from "@/lib/site-url";

export async function GET(request: NextRequest) {
  const next = request.nextUrl.searchParams.get("next") ?? "/account";
  const redirectTo = new URL(next, request.url);

  if (!isSupabaseAuthConfigured()) {
    return NextResponse.redirect(absoluteUrl("/login"));
  }

  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.redirect(absoluteUrl("/login"));
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    },
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    const login = new URL("/login", request.url);
    login.searchParams.set("error", "confirm_failed");
    return NextResponse.redirect(login);
  }

  return NextResponse.redirect(redirectTo);
}
