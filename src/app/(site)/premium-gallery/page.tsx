import type { Metadata } from "next";
import Image from "next/image";
import { flexProducts } from "@/lib/flex-products";
import { BackLink } from "@/components/ui/BackLink";
import { FlexWhatsAppQuoteButton } from "@/components/catalog/WhatsAppQuoteDialog";

export const metadata: Metadata = {
  title: "Flex & Vinyl Printing in Badarpur, Delhi",
  description: "Browse samples of flex banners and vinyl prints from Shubham Prints in Badarpur. Request a custom quote on WhatsApp.",
  alternates: { canonical: "/premium-gallery" },
};

export default function FlexPrintingPage() {
  return (
    <section
      id="flex-printing"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-10 sm:px-6 lg:px-8"
    >
      <BackLink href="/" label="Back to Home" />
      <h1 className="mt-5 text-3xl font-black text-slate-900">Flex Printing</h1>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {flexProducts.map(({ slug, name, image }) => (
          <article
            id={slug}
            key={slug}
            className="flex min-w-0 scroll-mt-24 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white"
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
              <FlexWhatsAppQuoteButton productName={name} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
