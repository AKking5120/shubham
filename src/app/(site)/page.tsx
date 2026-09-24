import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { HomeHowItWorks } from "@/components/home/HomeHowItWorks";
import { HomeStats } from "@/components/home/HomeStats";
import { HomeTrustBar } from "@/components/home/HomeTrustBar";
import { SectionHeading } from "@/components/home/SectionHeading";
import { WhyChooseGrid } from "@/components/home/WhyChooseGrid";
import { ServiceCard } from "@/components/services/ServiceCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { BUSINESS, telLink, whatsappLink } from "@/lib/constants";
import { getProducts, getServices } from "@/lib/store";

const whyChoose = [
  {
    title: "Custom Printing",
    text: "Tailored layouts, sizes and finishes based on your business or event needs.",
  },
  {
    title: "Professional Designs",
    text: "Clean, readable designs for stationery, cards and promotional materials.",
  },
  {
    title: "Quality Materials",
    text: "Reliable paper stocks and print options suited to everyday commercial use.",
  },
  {
    title: "Multiple Printing Solutions",
    text: "Bill books to wedding cards — a wide range under one trusted local shop.",
  },
  {
    title: "Easy Quotation",
    text: "Share your requirement online, on WhatsApp or by phone for a quick response.",
  },
  {
    title: "Direct Customer Support",
    text: "Speak directly with our team for updates, proofs and order details.",
  },
];

type HomePageProps = PageProps<"/">;

export default async function HomePage({ searchParams }: HomePageProps) {
  const [services, products] = await Promise.all([getServices(), getProducts()]);
  const params = await searchParams;
  const defaultProductId =
    typeof params?.product === "string" ? params.product : undefined;

  const stats = [
    { value: `${services.length}+`, label: "Core services" },
    { value: "Local", label: "Jaitpur & nearby" },
    { value: "Fast", label: "Quote response" },
    { value: "Custom", label: "Orders welcome" },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-[#0a1628] pb-20 text-white md:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-mesh-hero" />
        <div className="grain-overlay pointer-events-none absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 left-10 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:px-6 lg:py-24">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
              {BUSINESS.name}
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
              Complete Printing Solutions{" "}
              <span className="text-gradient-light">Under One Roof</span>
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Professional printing solutions for businesses, events, weddings and
              everyday requirements.
            </p>
            <p className="mt-2 text-sm italic text-slate-400">{BUSINESS.slogan}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact#quote">Get a Quote</Button>
              <Button href={whatsappLink()} external variant="whatsapp">
                WhatsApp Us
              </Button>
              <Button href={telLink(BUSINESS.phones[0])} variant="outline">
                Call Now
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-up-delay-1">
            <div className="grid grid-cols-2 gap-3">
              {products.slice(0, 4).map((p, i) => (
                <div
                  key={p.id}
                  className={`relative overflow-hidden rounded-3xl shadow-2xl ring-2 ring-white/15 transition duration-500 hover:ring-amber-400/50 hover:shadow-amber-500/10 ${i % 2 === 1 ? "mt-8 animate-float-soft-delay" : "animate-float-soft"}`}
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover"
                      priority={i < 2}
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <HomeStats stats={stats} />
      </section>

      <HomeTrustBar />

      <section className="relative py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-mesh-light opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="What we offer"
            title="Our Printing Services"
            subtitle="From business stationery to wedding and promotional printing, we provide complete printing solutions for your requirements."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <AnimateOnScroll key={service.id} delay={i * 90}>
                <ServiceCard service={service} products={products} />
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll delay={200}>
            <div className="mt-10 text-center">
              <Button href="/services" variant="secondary">
                View All Services
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section
        id="work"
        className="scroll-mt-24 bg-gradient-to-b from-slate-50 via-slate-100/50 to-slate-50 py-16 md:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="Portfolio"
            title="Our Work & Products"
            subtitle="A glimpse of business stationery, cards, stickers, banners and wedding printing."
          />
          <div className="mt-12">
            <GalleryGrid
              products={products}
              defaultProductId={defaultProductId}
            />
          </div>
        </div>
      </section>

      <HomeHowItWorks />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="Why us"
            title={`Why Choose ${BUSINESS.name}?`}
          />
          <WhyChooseGrid items={whyChoose} />
        </div>
      </section>

      <section
        id="quote"
        className="relative overflow-hidden bg-[#0a1628] py-16 md:py-24"
      >
        <div className="pointer-events-none absolute inset-0 bg-mesh-hero" />
        <div className="grain-overlay pointer-events-none absolute inset-0 opacity-25" />
        <div className="relative mx-auto max-w-3xl px-4 lg:px-6">
          <AnimateOnScroll>
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold md:text-4xl">
                Have a Printing Requirement?
              </h2>
              <p className="mt-3 text-slate-300">
                Tell us what you need and our team will get back to you with the
                details.
              </p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={120}>
            <div className="mt-10 rounded-3xl bg-white p-6 shadow-2xl shadow-black/25 ring-1 ring-amber-400/20 md:p-8">
              <QuoteForm showExtendedFields />
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
