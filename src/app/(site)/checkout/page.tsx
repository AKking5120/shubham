import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import type { CheckoutDefaults } from "@/lib/checkout-defaults";
import { isSupabaseAuthConfigured } from "@/lib/supabase/auth-config";
import { getSupabaseUser } from "@/lib/supabase/server-auth";
import { getCustomerProfile } from "@/lib/store";

export const metadata: Metadata = {
  title: "Checkout",
  alternates: { canonical: "/checkout" },
};

export default async function CheckoutPage() {
  let defaults: CheckoutDefaults | undefined;

  if (isSupabaseAuthConfigured()) {
    const user = await getSupabaseUser();
    if (user) {
      const profile = await getCustomerProfile(user.id);
      const metaName = (user.user_metadata?.full_name as string | undefined)?.trim();
      defaults = {
        customerName: profile?.fullName || metaName || "",
        phone: profile?.phone ?? "",
        email: profile?.email || user.email || "",
        addressLine1: profile?.addressLine1 ?? "",
        addressLine2: profile?.addressLine2 ?? "",
        city: profile?.city || "New Delhi",
        pincode: profile?.pincode ?? "",
      };
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Checkout</h1>
      <CheckoutForm defaults={defaults} />
    </div>
  );
}
