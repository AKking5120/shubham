import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";

export function AuthUnavailable() {
  return (
    <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-100 text-center">
      <div className="flex justify-center">
        <BrandLogo size="lg" href="/" />
      </div>
      <h1 className="mt-6 text-xl font-bold text-slate-900">Login coming soon</h1>
      <p className="mt-2 text-sm text-slate-600">
        Customer accounts are not enabled on this server yet. You can still{" "}
        <Link href="/checkout" className="text-brand-blue font-medium hover:underline">
          checkout as guest
        </Link>{" "}
        or{" "}
        <Link href="/track-order" className="text-brand-blue font-medium hover:underline">
          track your order
        </Link>
        .
      </p>
      <Link
        href="/services"
        className="mt-6 inline-flex rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-900"
      >
        Browse services
      </Link>
    </div>
  );
}
