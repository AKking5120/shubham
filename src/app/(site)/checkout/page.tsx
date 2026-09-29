import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  alternates: { canonical: "/checkout" },
};

export default function CheckoutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Checkout</h1>
      <CheckoutForm />
    </div>
  );
}
