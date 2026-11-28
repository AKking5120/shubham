import type { Metadata } from "next";
import Image from "next/image";
import { BackLink } from "@/components/ui/BackLink";
import { whatsappLink } from "@/lib/constants";

export const metadata: Metadata = { title: "Flex Printing" };

const products = [
  { name: "Flex Banner Printing", image: "/products/flex/flex-banner.webp" },
  { name: "Flex Board Printing", image: "/products/flex/flex-board.webp" },
  { name: "Eco-Solvent Vinyl Printing", image: "/products/flex/eco-solvent-vinyl.webp" },
  { name: "Solvent Vinyl Printing", image: "/products/flex/solvent-vinyl.webp" },
];

export default function FlexPrintingPage() {
  return (
    <section
      id="flex-printing"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-10 sm:px-6 lg:px-8"
    >
      <BackLink href="/" label="Back to Home" />
      <h1 className="mt-5 text-3xl font-black text-slate-900">Flex Printing</h1>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {products.map(({ name, image }) => (
          <article
            key={name}
            className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white"
          >
            <div className="relative aspect-square bg-slate-50">
              <Image
                src={image}
                alt={name}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-contain"
              />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-3 sm:p-4">
              <h2 className="flex-1 font-bold text-slate-900">{name}</h2>
              <a
                href={whatsappLink(`Hello Shubham Prints, I would like a quote for ${name}.`)}
                className="rounded-lg bg-brand-blue px-3 py-2 text-center text-sm font-semibold text-white hover:bg-blue-800"
              >
                Get quote
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
