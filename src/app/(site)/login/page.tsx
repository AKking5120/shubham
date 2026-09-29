import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthUnavailable } from "@/components/auth/AuthUnavailable";
import { isSupabaseAuthConfigured } from "@/lib/supabase/auth-config";

export const metadata: Metadata = {
  title: "Sign in",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <div className="px-4 py-12 sm:py-16">
      {isSupabaseAuthConfigured() ? (
        <Suspense fallback={<div className="mx-auto h-96 max-w-md rounded-2xl bg-white shadow-xl" />}>
          <AuthForm mode="login" />
        </Suspense>
      ) : (
        <AuthUnavailable />
      )}
    </div>
  );
}
