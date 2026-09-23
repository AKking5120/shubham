import type { Metadata } from "next";
import Image from "next/image";
import { BUSINESS, SEO } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: `About | ${SEO.title}`,
  description: SEO.description,
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-[#0a1628] py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <h1 className="text-4xl font-bold md:text-5xl">
            About {BUSINESS.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Your local partner for complete printing solutions in Jaitpur,
            Badarpur and New Delhi.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2 lg:px-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80"
              alt="Professional printing workspace"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-lg leading-relaxed text-slate-700">
              {BUSINESS.name} provides complete printing solutions for customers
              who need reliable business stationery, promotional materials,
              cards and wedding printing. From bill books and challan books to
              visiting cards, stickers, banners and wedding invitations, we help
              you present your brand and occasions with a professional finish.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              We focus on clear communication, practical customisation and
              responsive support — so you can share your requirements easily and
              get your printing done with confidence.
            </p>

            <dl className="mt-8 space-y-4 rounded-2xl bg-slate-50 p-6">
              <div>
                <dt className="text-sm font-semibold text-slate-500">Owner</dt>
                <dd className="text-lg font-bold text-[#0a1628]">
                  {BUSINESS.owner}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-slate-500">Slogan</dt>
                <dd className="text-[#1e3a5f] italic">{BUSINESS.slogan}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-slate-500">Address</dt>
                <dd className="text-slate-700">
                  {BUSINESS.address.line1}
                  <br />
                  {BUSINESS.address.line2}
                  <br />
                  {BUSINESS.address.city}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact#quote">Get a Quote</Button>
              <Button href="/services" variant="secondary">
                Our Services
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
