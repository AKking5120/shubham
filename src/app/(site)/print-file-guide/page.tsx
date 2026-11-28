import type { Metadata } from "next";
import { BackLink } from "@/components/ui/BackLink";

export const metadata: Metadata = {
  title: "Print File Guide for Cards, Invitations & Banners",
  description: "Prepare artwork for print with practical guidance on exporting a PDF, adding bleed, checking image resolution and specifying finishes.",
  alternates: { canonical: "/print-file-guide" },
};

const steps = [
  { title: "Export a PDF", text: "Send a print-quality PDF at the agreed finished size. Embed fonts, and include front and back as separate pages for double-sided cards." },
  { title: "Allow for trimming", text: "For cards and invitations, 3 mm bleed and a 3 mm safe margin are common starting points. Extend backgrounds into the bleed and keep text inside the safe area. Confirm these values with us before export." },
  { title: "Check image quality", text: "For cards and invitations, aim for 300 ppi at final print size. For flex or vinyl, tell us the finished width, height and viewing distance so we can advise on resolution and artwork scale." },
  { title: "Confirm colour and finishing", text: "Check spelling, dimensions and page order. Ask us for the colour profile and any artwork requirements for foil, lamination, die cuts or banner eyelets." },
];

export default function PrintFileGuide() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <BackLink href="/shop" label="Back to Shop" />
      <h1 className="mt-5 text-3xl font-black text-slate-900">Print File Guide</h1>
      <div className="mt-6 space-y-5">
        {steps.map(({ title, text }) => (
          <section key={title} className="rounded-xl border bg-white p-4">
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{text}</p>
          </section>
        ))}
      </div>
    </section>
  );
}
