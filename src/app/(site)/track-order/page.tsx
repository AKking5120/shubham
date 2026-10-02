import type { Metadata } from "next";
import { Suspense } from "react";
import { TrackOrderForm } from "@/components/orders/TrackOrderForm";

export const metadata: Metadata = {
  title: "Track Order",
  alternates: { canonical: "/track-order" },
};

export default function TrackOrderPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900 text-center">
        Track your order
      </h1>
      <p className="text-center text-sm text-slate-600 mt-2 mb-8">
        Enter your Order ID to see the latest print status.
      </p>
      <Suspense fallback={<p className="text-center text-sm text-slate-500">Loading…</p>}>
        <TrackOrderForm />
      </Suspense>
    </div>
  );
}
