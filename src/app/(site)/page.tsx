import Link from "next/link";
import {
  CheckCircle,
  ChevronRight,
  Clock,
  Copy,
  Layers,
  MapPin,
  MessageCircle,
  PhoneCall,
  Printer,
} from "lucide-react";
import { OwnerPhoto } from "@/components/brand/OwnerPhoto";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { HomeGalleryPreview } from "@/components/home/HomeGalleryPreview";
import { HomeHeroSlider } from "@/components/home/HomeHeroSlider";
import { ShopPhotosSection } from "@/components/home/ShopPhotosSection";
import { ServiceCard } from "@/components/services/ServiceCard";
import { telLink, whatsappLink } from "@/lib/constants";
import { getGalleryPreviewProducts } from "@/lib/service-design-gallery";
import { getPublicProducts, getPublicServices } from "@/lib/public-catalog";
import { getSiteContent } from "@/lib/store";

const popularServices = [
  {
    badge: "GST",
    badgeClass: "bg-blue-900/60 text-blue-300",
    title: "Bill & Challan Books",
    subtitle: "Duplicate / Triplicate Carbonless",
    href: "/services#bill-book",
  },
  {
    badge: "UV",
    badgeClass: "bg-amber-900/60 text-amber-300",
    title: "Visiting Cards & Tags",
    subtitle: "Velvet, Spot UV, Die-Cut",
    href: "/services#visiting-card-tag",
  },
  {
    badge: "DR",
    badgeClass: "bg-rose-900/60 text-rose-300",
    title: "Doctor Files & Envelopes",
    subtitle: "Medical Folders & ATM Pouches",
    href: "/services#doctor-files",
  },
  {
    badge: "शादी",
    badgeClass: "bg-red-900/60 text-red-300",
    title: "Wedding Cards & Banners",
    subtitle: "Royal Shadi Invites & Vinyl Flex",
    href: "/services#wedding-card",
  },
];

export default async function HomePage() {
  const [services, products, site] = await Promise.all([
    getPublicServices(),
    getPublicProducts(),
    getSiteContent(),
  ]);
  const galleryPreview = getGalleryPreviewProducts(8);
  const { business: BUSINESS, hero, contact } = site;
  const wa = () => whatsappLink(contact.whatsappDefaultMessage);

  return (
    <>
      <HomeHeroSlider />
      <section className="relative bg-slate-900 text-white overflow-hidden py-12 lg:py-20">
        <div className="absolute inset-0 opacity-20 hero-dot-pattern" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-3 py-1 rounded-full text-xs text-amber-400 font-medium">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {BUSINESS.address.line1}, {BUSINESS.address.line2}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                {hero.title}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                  {hero.highlight}
                </span>{" "}
                Solutions
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {hero.description}
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <a
                  href={wa()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Enquiry (हिंदी / Eng)
                </a>
                <Link
                  href="/contact#quote"
                  className="bg-brand-orange hover:bg-amber-600 text-slate-950 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg transition"
                >
                  Quick Price Estimate
                </Link>
                <a
                  href={telLink(BUSINESS.phones[0])}
                  className="border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-200 px-4 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  Call {BUSINESS.phones[0]}
                </a>
              </div>
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center max-w-lg mx-auto lg:mx-0">
                <div>
                  <p className="text-lg font-bold text-amber-400">100% Custom</p>
                  <p className="text-[11px] text-slate-400">GST & Serial Print</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-amber-400">24–48 Hrs</p>
                  <p className="text-[11px] text-slate-400">Fast Turnaround</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-amber-400">Best Rates</p>
                  <p className="text-[11px] text-slate-400">Jaitpur / Badarpur</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl relative">
                <div className="absolute -top-3 -right-3 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Popular Services
                </div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Printer className="w-5 h-5 text-amber-400" />
                  Most Ordered Items
                </h3>
                <div className="space-y-3">
                  {popularServices.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60 flex items-center justify-between hover:border-amber-400/50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${item.badgeClass}`}
                        >
                          {item.badge}
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-sm text-slate-100">{item.title}</h4>
                          <p className="text-xs text-slate-400">{item.subtitle}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-orange bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
            Our Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Complete Printing Services Catalog
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            High precision printing for shops, clinics, offices and special occasions.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              products={products}
              compact
            />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-brand-blue hover:bg-indigo-900 text-white font-bold px-6 py-3 rounded-xl text-sm transition"
          >
            Services & Live Rate Estimator
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <HomeGalleryPreview products={galleryPreview} />

      <ShopPhotosSection
        title={site.shopGallery.title}
        subtitle={site.shopGallery.subtitle}
        photos={site.shopGallery.photos}
        addressLine={BUSINESS.address.full}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-brand-blue rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
                Local Trust & Precision
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">
                Why Local Businesses Trust {BUSINESS.owner} & Shubham Prints?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  {
                    icon: CheckCircle,
                    title: "GST Bill Books & Carbonless",
                    text: "Numbered, duplicate/triplicate with exact business tax info.",
                  },
                  {
                    icon: Layers,
                    title: "Premium Finishing & Textures",
                    text: "Spot UV, velvet lamination, gold foil & die-cut shapes.",
                  },
                  {
                    icon: Clock,
                    title: "Express Local Turnaround",
                    text: "Urgent printing across Badarpur, Jaitpur & South Delhi.",
                  },
                  {
                    icon: Copy,
                    title: "Affordable Bulk Copying",
                    text: "High speed xerox & printouts for schools & offices.",
                  },
                ].map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="p-2 bg-blue-800/80 rounded-lg text-amber-400 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{title}</h4>
                      <p className="text-xs text-slate-300">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4 bg-slate-900/60 p-6 rounded-2xl border border-blue-700/50 text-center space-y-4">
              <OwnerPhoto size="lg" className="mx-auto ring-amber-400/50" />
              <div>
                <h3 className="font-bold text-base text-white">{BUSINESS.owner}</h3>
                <p className="text-xs text-amber-300 font-medium">
                  Founder & Managing Director
                </p>
              </div>
              <p className="text-xs text-slate-300 italic">
                “Our aim is to provide every shopkeeper, school, doctor, and household
                with shop-quality premium printing at local market prices.”
              </p>
              <a
                href={telLink(BUSINESS.phones[0])}
                className="inline-block bg-white text-brand-blue hover:bg-amber-400 hover:text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition"
              >
                Talk to {BUSINESS.owner.split(" ")[0]}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="quote"
        className="bg-slate-100 py-12 md:py-16 border-t border-slate-200"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Custom Order Request
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              Request Custom Printing Quote
            </h2>
            <p className="text-slate-600 text-sm">
              Upload artwork or describe your specification — we respond on WhatsApp
              and phone.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-8">
            <QuoteForm
              showExtendedFields
              serviceOptions={services.map((s) => s.name).concat(["Other"])}
            />
          </div>
        </div>
      </section>
    </>
  );
}
