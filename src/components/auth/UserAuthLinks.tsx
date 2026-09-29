"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isSupabaseAuthConfigured } from "@/lib/supabase/auth-config";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  variant?: "header" | "mobile";
};

export function UserAuthLinks({ className, variant = "header" }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [ready, setReady] = useState(false);
  const configured = isSupabaseAuthConfigured();

  useEffect(() => {
    if (!configured) {
      setReady(true);
      return;
    }
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setReady(true);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [configured]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
    router.refresh();
    if (pathname.startsWith("/account")) {
      router.push("/");
    }
  }

  if (!configured || !ready) {
    return null;
  }

  const linkClass =
    variant === "mobile"
      ? "block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-white/60"
      : "hidden sm:inline-flex px-2 py-2 text-sm font-medium text-slate-600 hover:text-brand-blue";

  if (user) {
    const label =
      user.user_metadata?.full_name?.trim() ||
      user.email?.split("@")[0] ||
      "Account";
    return (
      <div className={cn("flex items-center gap-1 sm:gap-2", className)}>
        <Link href="/account" className={linkClass}>
          <span className="inline-flex items-center gap-1.5">
            <User className="w-4 h-4 shrink-0" />
            <span className="max-w-[7rem] truncate">{label}</span>
          </span>
        </Link>
        {variant === "header" && (
          <button
            type="button"
            onClick={() => logout()}
            className="hidden sm:inline-flex p-2 text-slate-500 hover:text-red-600"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
        {variant === "mobile" && (
          <button
            type="button"
            onClick={() => logout()}
            className={linkClass}
          >
            Sign out
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-1 sm:gap-2", className)}>
      <Link href="/login" className={linkClass}>
        Login
      </Link>
      <Link
        href="/signup"
        className={
          variant === "mobile"
            ? "block w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-brand-blue bg-blue-50/90 border border-blue-100"
            : "hidden sm:inline-flex px-3 py-2 rounded-xl text-sm font-semibold text-brand-blue border border-brand-blue/30 hover:bg-blue-50 transition"
        }
      >
        Sign up
      </Link>
    </div>
  );
}
