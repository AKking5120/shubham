"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
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

  const isLogin = mode === "login";

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
          setError(signInError.message);
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
          emailRedirectTo: absoluteUrl(
            `/auth/callback?next=${encodeURIComponent(next)}`,
          ),
        },
      });
      if (signUpError) {
        setError(signUpError.message);
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
          <p className="text-sm text-red-600 rounded-lg bg-red-50 px-3 py-2">
            {error}
          </p>
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
