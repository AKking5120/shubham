"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isSupabaseAuthConfigured } from "@/lib/supabase/auth-config";

export function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [ready, setReady] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSupabaseAuthConfigured()) {
      setReady(true);
      return;
    }
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getSession().then(({ data }) => {
      setHasSession(Boolean(data.session));
      setReady(true);
    });
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });
      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }
      router.push("/account");
      router.refresh();
    } catch {
      setError("Could not update password. Open the link from your email again.");
      setLoading(false);
    }
  }

  if (!ready) {
    return null;
  }

  if (!hasSession) {
    return (
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-100 text-center">
        <BrandLogo size="lg" href="/" />
        <h1 className="mt-6 text-xl font-bold text-slate-900">Link expired</h1>
        <p className="mt-2 text-sm text-slate-600">
          Request a new password reset from the sign-in page.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold text-white"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-100">
      <div className="flex justify-center">
        <BrandLogo size="lg" href="/" />
      </div>
      <h1 className="mt-6 text-center text-2xl font-bold text-slate-900">
        New password
      </h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="block text-sm font-medium text-slate-700">
          Password (min 6 characters)
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
            className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3"
          />
        </label>
        {error && (
          <p className="text-sm text-red-600 rounded-lg bg-red-50 px-3 py-2">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-brand-blue py-3 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Saving…" : "Save password"}
        </button>
      </form>
    </div>
  );
}
