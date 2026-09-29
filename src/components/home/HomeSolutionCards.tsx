import Link from "next/link";
import {
  BookOpen,
  CreditCard,
  FileText,
  Heart,
  ImageIcon,
  Sticker,
} from "lucide-react";

const solutions = [
  {
    icon: FileText,
    title: "Bill & challan books",
    text: "GST duplicate / triplicate carbonless pads for shops.",
    href: "/services#bill-book",
  },
  {
    icon: CreditCard,
    title: "Visiting cards & tags",
    text: "UV, velvet, die-cut and garment tags.",
    href: "/services#visiting-card-tag",
  },
  {
    icon: BookOpen,
    title: "Bulk copy & printouts",
    text: "Xerox, binding and office document printing.",
    href: "/services#bulk-copy-printout",
  },
  {
    icon: Heart,
    title: "Wedding cards",
    text: "Invitations and matching wedding stationery.",
    href: "/services#wedding-card",
  },
  {
    icon: ImageIcon,
    title: "Banners & flex",
    text: "Shop boards, vinyl and event banners.",
    href: "/services#sticker-banner",
  },
  {
    icon: Sticker,
    title: "Stickers & stationery",
    text: "Labels, letter pads, envelopes and more.",
    href: "/services#letter-pad",
  },
];

export function HomeSolutionCards() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
            Printing solutions
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Choose a category, add to cart, and checkout — we print in Jaitpur &
            Badarpur.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition hover:border-brand-blue/30 hover:bg-white hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-bold text-slate-900 group-hover:text-brand-blue">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600">{item.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
