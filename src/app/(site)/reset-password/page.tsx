import { Suspense } from "react";
import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { AuthUnavailable } from "@/components/auth/AuthUnavailable";
import { isSupabaseAuthConfigured } from "@/lib/supabase/auth-config";

export const metadata: Metadata = {
  title: "Set new password",
  robots: { index: false, follow: true },
};

export default function ResetPasswordPage() {
  return (
    <div className="px-4 py-12 sm:py-16">
      {isSupabaseAuthConfigured() ? (
        <Suspense fallback={<div className="mx-auto h-64 max-w-md rounded-2xl bg-white shadow-xl" />}>
          <ResetPasswordForm />
        </Suspense>
      ) : (
        <AuthUnavailable />
      )}
    </div>
  );
}
