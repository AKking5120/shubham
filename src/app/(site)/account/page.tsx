import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AccountOrderList } from "@/components/account/AccountOrderList";
import { isSupabaseAuthConfigured } from "@/lib/supabase/auth-config";
import { getSupabaseUser } from "@/lib/supabase/server-auth";
import { getCustomerProfile, getOrdersByUserId } from "@/lib/store";

export const metadata: Metadata = {
  title: "My account",
  alternates: { canonical: "/account" },
  robots: { index: false, follow: true },
};

export default async function AccountPage() {
  if (!isSupabaseAuthConfigured()) {
    redirect("/login");
  }

  const user = await getSupabaseUser();
  if (!user) {
    redirect("/login?next=/account");
  }

  const [profile, orders] = await Promise.all([
    getCustomerProfile(user.id),
    getOrdersByUserId(user.id),
  ]);

  const name =
    profile?.fullName ||
    (user.user_metadata?.full_name as string | undefined)?.trim() ||
    "Customer";

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 sm:py-14">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">My account</h1>
      <p className="mt-2 text-slate-600">Signed in as {user.email}</p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Name
          </p>
          <p className="text-lg font-medium text-slate-900">{name}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Email
          </p>
          <p className="text-lg font-medium text-slate-900">{user.email}</p>
        </div>
        {profile?.phone ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Phone
            </p>
            <p className="text-lg font-medium text-slate-900">{profile.phone}</p>
          </div>
        ) : null}
      </div>

      <h2 className="mt-10 text-lg font-bold text-slate-900">Your orders</h2>
      <p className="mt-1 text-sm text-slate-600">
        Orders placed while signed in appear here.
      </p>
      <div className="mt-4">
        <AccountOrderList orders={orders} />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/services"
          className="inline-flex rounded-xl bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-900"
        >
          Order again
        </Link>
        <Link
          href="/track-order"
          className="inline-flex rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
        >
          Track by order number
        </Link>
      </div>
    </div>
  );
}
