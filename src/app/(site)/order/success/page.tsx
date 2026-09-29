import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order placed",
  robots: { index: false },
};

type PageProps = {
  searchParams: Promise<{ no?: string }>;
};

export default async function OrderSuccessPage({ searchParams }: PageProps) {
  const { no } = await searchParams;

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8">
        <h1 className="text-2xl font-bold text-emerald-900">Thank you!</h1>
        <p className="mt-2 text-slate-700">Your order has been placed.</p>
        {no && (
          <p className="mt-4 text-lg font-mono font-bold text-slate-900">
            {no}
          </p>
        )}
        <p className="mt-2 text-sm text-slate-600">
          Save this order ID to track status. We will call you to confirm specs
          if needed.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link
            href={`/track-order${no ? `?no=${encodeURIComponent(no)}` : ""}`}
            className="rounded-xl bg-brand-blue px-5 py-2.5 text-sm font-bold text-white"
          >
            Track order
          </Link>
          <Link
            href="/services"
            className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
