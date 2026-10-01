"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { formatAuthError } from "@/lib/auth-errors";
import { absoluteUrl } from "@/lib/site-url";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type Mode = "login" | "signup";

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/account";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const isLogin = mode === "login";

  useEffect(() => {
    if (searchParams.get("error") === "confirm_failed") {
      setError(
        "Email confirmation link did not work (expired or already used). Try signing in, or resend confirmation below.",
      );
    }
  }, [searchParams]);

  const emailRedirect = absoluteUrl(
    `/auth/callback?next=${encodeURIComponent(next)}`,
  );

  async function resendConfirmation() {
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Enter your email above, then tap Resend confirmation.");
      return;
    }
    setResendLoading(true);
    setError("");
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email: trimmed,
        options: { emailRedirectTo: emailRedirect },
      });
      if (resendError) {
        setError(formatAuthError(resendError));
      } else {
        setInfo("Confirmation email sent. Check inbox and spam.");
      }
    } catch {
      setError("Could not send email. Try again in a minute.");
    } finally {
      setResendLoading(false);
    }
  }

  async function sendPasswordReset() {
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Enter your email above, then tap Forgot password.");
      return;
    }
    setResendLoading(true);
    setError("");
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        trimmed,
        {
          redirectTo: absoluteUrl("/auth/callback?next=/reset-password"),
        },
      );
      if (resetError) {
        setError(formatAuthError(resetError));
      } else {
        setInfo("Password reset link sent. Open it from your email.");
      }
    } catch {
      setError("Could not send reset email.");
    } finally {
      setResendLoading(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();

      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (signInError) {
          setError(formatAuthError(signInError));
          setLoading(false);
          return;
        }
        router.push(next.startsWith("/") ? next : "/account");
        router.refresh();
        return;
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { full_name: fullName.trim() },
          emailRedirectTo: emailRedirect,
        },
      });
      if (signUpError) {
        setError(formatAuthError(signUpError));
        setLoading(false);
        return;
      }
      if (data.session) {
        router.push(next.startsWith("/") ? next : "/account");
        router.refresh();
        return;
      }
      setInfo(
        "Account created. Check your email for a confirmation link, then sign in.",
      );
      setLoading(false);
    } catch {
      setError(
        "Login is not available on this site yet. Please contact us to place an order.",
      );
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-100">
      <div className="flex justify-center">
        <BrandLogo size="lg" href="/" />
      </div>
      <h1 className="mt-6 text-center text-2xl font-bold text-slate-900">
        {isLogin ? "Sign in" : "Create account"}
      </h1>
      <p className="mt-2 text-center text-sm text-slate-600">
        {isLogin
          ? "Track orders and checkout faster."
          : "Register with your email to manage orders."}
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Full name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
              autoComplete="name"
              required
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            autoComplete={isLogin ? "current-password" : "new-password"}
            minLength={6}
            required
          />
          {!isLogin && (
            <p className="mt-1 text-xs text-slate-500">At least 6 characters.</p>
          )}
        </div>

        {error && (
          <div className="text-sm text-red-800 rounded-lg bg-red-50 px-3 py-2 space-y-2">
            <p>{error}</p>
            {isLogin && (
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  disabled={resendLoading}
                  onClick={() => resendConfirmation()}
                  className="text-xs font-semibold text-brand-blue hover:underline disabled:opacity-50"
                >
                  Resend confirmation
                </button>
                <span className="text-red-300">·</span>
                <button
                  type="button"
                  disabled={resendLoading}
                  onClick={() => sendPasswordReset()}
                  className="text-xs font-semibold text-brand-blue hover:underline disabled:opacity-50"
                >
                  Forgot password?
                </button>
              </div>
            )}
          </div>
        )}
        {info && (
          <p className="text-sm text-emerald-800 rounded-lg bg-emerald-50 px-3 py-2">
            {info}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-brand-blue py-3 font-semibold text-white hover:bg-indigo-900 disabled:opacity-50 transition"
        >
          {loading
            ? "Please wait..."
            : isLogin
              ? "Sign in"
              : "Sign up"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        {isLogin ? (
          <>
            New here?{" "}
            <Link
              href={`/signup${next !== "/account" ? `?next=${encodeURIComponent(next)}` : ""}`}
              className="font-semibold text-brand-blue hover:underline"
            >
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link
              href={`/login${next !== "/account" ? `?next=${encodeURIComponent(next)}` : ""}`}
              className="font-semibold text-brand-blue hover:underline"
            >
              Sign in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
