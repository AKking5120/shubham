import Link from "next/link";

const points = [
  "Delhi delivery on online orders (110xxx pincodes)",
  "Cash on delivery — pay when you receive",
  "All services: bill books, cards, wedding, flex & xerox",
  "Fast turnaround from our Jaitpur / Badarpur shop",
  "Add to cart with live rate estimates on services page",
  "Track order status anytime with order ID + phone",
];

export function HomeWhyChoose() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
              Why order with us
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Simple online ordering like leading print stores — with local shop
              quality and support.
            </p>
          </div>
          <ul className="space-y-3">
            {points.map((text) => (
              <li
                key={text}
                className="flex gap-2 text-sm text-slate-700 before:shrink-0 before:content-['✓'] before:font-bold before:text-emerald-600"
              >
                {text}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 text-center text-sm text-slate-600">
          Bulk or custom job?{" "}
          <Link href="/contact" className="font-semibold text-brand-blue hover:underline">
            Contact form
          </Link>{" "}
          or call us directly.
        </p>
      </div>
    </section>
  );
}
