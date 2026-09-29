import Link from "next/link";
import { ShoppingBag, Truck } from "lucide-react";
import type { SiteContent } from "@/lib/site-content";

type Props = Pick<SiteContent, "hero">;

export function HomeHeroSimple({ hero }: Props) {
  return (
    <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-brand-blue">
          Online printing store
        </p>
        <h1 className="mt-3 text-center text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
          {hero.title}{" "}
          <span className="text-brand-blue">{hero.highlight}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-slate-600 sm:text-lg">
          {hero.description}
        </p>
        <p className="mt-3 text-center text-sm text-slate-500">
          Delhi delivery · COD & online pay (soon) · Phone & WhatsApp in footer
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-indigo-900"
          >
            <ShoppingBag className="h-4 w-4" />
            Order online
          </Link>
          <Link
            href="/track-order"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
          >
            <Truck className="h-4 w-4" />
            Track order
          </Link>
        </div>
      </div>
    </section>
  );
}
