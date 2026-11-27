import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, BookOpen, CreditCard, FileText, Heart, MapPin, Menu, MessageCircle, Printer, ReceiptText, Search, ShoppingCart, Tag, Award } from "lucide-react";
import { SEO, whatsappLink } from "@/lib/constants";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { CartIconLink } from "@/components/cart/CartIconLink";
import { HomeHeroSlider } from "@/components/home/HomeHeroSlider";

export const metadata: Metadata = {
  title: { absolute: SEO.title },
  description: SEO.description,
  alternates: { canonical: "/" }
};

const categories = [
  { name: "Visiting Cards", sub: "Premium & Standard", icon: CreditCard, href: "/shop/standard-visiting-cards" },
  { name: "Wedding Cards", sub: "Bridal & Invitation", icon: Heart, href: "/shop/wedding-cards" },
  { name: "Bill Books", sub: "GST & Non-GST", icon: ReceiptText, href: "/shop/bill-books-challans" },
  { name: "Doctor Files", sub: "Patient Records", icon: FileText, href: "/shop" },
  { name: "Sticker & Labels", sub: "Product & Barcode", icon: Tag, href: "/shop/stickers-labels" },
  { name: "Flex Printing", sub: "Banner & Flex Board", icon: Printer, href: "/premium-gallery#flex-printing" },
  { name: "Marketing Material", sub: "Pamphlet & Brochure", icon: BookOpen, href: "/shop/pamphlets-leaflets" },
  { name: "Garment Tags", sub: "Hang Tags & Tags", icon: Award, href: "/shop/garment-tags" },
];

export default function HomePage() {
  const quoteUrl = whatsappLink("Hello Shubham Prints, I would like a printing quotation.");
  return (
    <div className="bg-white text-[#092752]">
      <div className="bg-[#082f68] px-5 py-2 text-xs text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2"><MapPin size={14} /> Jaitpur Badarpur, Delhi</span>
          <a href={quoteUrl} className="inline-flex items-center gap-2"><MessageCircle size={14}/> WhatsApp Enquiry</a>
        </div>
      </div>
      <header className="border-b border-blue-100 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:gap-4">
          <BrandLogo size="nav" />
          <nav aria-label="Primary" className="hidden items-center gap-4 text-sm font-semibold lg:flex">
            <Link className="rounded-lg bg-[#073b82] px-4 py-2 text-white" href="/">Home</Link>
            <Link href="/services">Our Services</Link>
            <Link href="/shop">Products</Link>
            <Link href="/contact">Contact Us</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/shop" aria-label="Browse products" className="hidden rounded-full border border-blue-100 px-4 py-2 text-sm text-slate-500 sm:flex">Search Products <Search size={16} className="ml-2"/></Link>
            <CartIconLink className="relative p-2" />
            <details className="relative lg:hidden">
              <summary className="cursor-pointer list-none rounded-md p-2" aria-label="Open navigation"><Menu size={22}/></summary>
              <div className="absolute right-0 top-full z-50 grid w-44 gap-3 rounded-xl border bg-white p-4 text-sm font-semibold shadow-xl">
                <Link href="/shop">Products</Link><Link href="/services">Services</Link><Link href="/contact">Contact</Link>
                <Link href="/admin/login">Admin</Link>
              </div>
            </details>
          </div>
        </div>
      </header>
      <section className="overflow-hidden bg-gradient-to-r from-[#edf4ff] via-white to-[#dbeafb]">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-5 py-10 lg:min-h-[400px] lg:grid-cols-2 lg:py-8">
          <div>
            <p className="font-serif text-xl font-bold italic text-[#1167bd] sm:text-2xl">Your Complete Printing Partner</p>
            <h1 className="mt-4 text-[clamp(2.5rem,5vw,4.25rem)] font-black leading-[1.07] tracking-tight">Premium Printing.<br/><span className="text-[#1466b9]">Perfect Quality.</span></h1>
            <p className="mt-5 max-w-lg text-base font-semibold sm:text-xl">Visiting Cards, Wedding Cards, Bill Books, Flex Printing and more...</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/services" className="inline-flex items-center gap-2 rounded-full bg-[#073a7d] px-5 py-3 text-sm font-bold text-white"><ShoppingCart size={17}/> Explore Services <ArrowRight size={16}/></Link>
              <a href={quoteUrl} className="inline-flex items-center gap-2 rounded-full border-2 border-[#073a7d] px-5 py-3 text-sm font-bold"><MessageCircle size={17}/> Get a Quote</a>
            </div>
          </div>
          <HomeHeroSlider />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-9 sm:px-6">
        <h2 className="mb-6 text-center text-2xl font-black text-[#083b7d] sm:text-3xl">Our Printing Services</h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {categories.map(({name,sub,icon:Icon,href}) => (
            <Link href={href} key={name} className="flex items-center gap-3 rounded-xl border border-blue-100 bg-white p-4 shadow-sm transition hover:border-blue-400 hover:shadow-md">
              <Icon size={32} className="shrink-0 text-[#1562b3]"/>
              <div><h3 className="text-sm font-bold sm:text-base">{name}</h3><p className="mt-1 text-xs text-slate-600 sm:text-sm">{sub}</p></div>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-[#eaf4ff] px-4 py-9">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <div className="rounded-xl bg-white p-6"><h2 className="mb-5 text-2xl font-black">Why Choose Us?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {["Premium Printing Quality","Fast Local Service","Competitive Quotes","Easy WhatsApp Enquiry"].map(value => <div key={value} className="flex items-center gap-2 text-sm font-semibold"><BadgeCheck size={20} className="text-[#1562b3]"/>{value}</div>)}
            </div>
          </div>
          <div className="rounded-xl bg-white p-6"><h2 className="mb-3 text-2xl font-black">What Our Customers Say</h2>
            <p className="text-sm text-slate-600">We value your feedback. Contact us to share your experience with Shubham Prints.</p>
            <Link href="/contact" className="mt-5 inline-block text-sm font-bold text-[#1466b9]">Contact Us →</Link>
          </div>
        </div>
      </section>
      <footer className="bg-[#062a5b] text-white">
        <div className="mx-auto grid max-w-7xl gap-7 px-5 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div><BrandLogo size="sm" tone="dark" /><p className="mt-3 text-xs text-blue-100">Print Smart. Grow Smart.</p></div>
          <div><h3 className="mb-3 font-bold">Quick Links</h3><div className="grid gap-2 text-sm text-blue-100"><Link href="/">Home</Link><Link href="/services">Our Services</Link><Link href="/shop">Products</Link><Link href="/contact">Contact Us</Link></div></div>
          <div><h3 className="mb-3 font-bold">Contact Us</h3><p className="text-sm text-blue-100">Jaitpur Badarpur, Delhi</p><Link href="/contact" className="mt-3 block text-sm underline">View full contact details</Link></div>
          <div><h3 className="mb-3 font-bold">Follow Us</h3><a href={quoteUrl} className="inline-flex items-center gap-2 rounded-xl bg-[#06a852] px-5 py-3 font-bold"><MessageCircle/> Chat on WhatsApp</a><Link href="/admin/login" className="mt-4 block text-xs text-blue-200">Admin Portal</Link></div>
        </div>
        <p className="border-t border-white/20 px-4 py-4 text-center text-xs text-blue-100">© {new Date().getFullYear()} Shubham Prints & Stationers. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
