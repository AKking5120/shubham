"use client";

import { FileText, MessageCircle, PackageCheck } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionHeading } from "@/components/home/SectionHeading";

const steps = [
  {
    icon: MessageCircle,
    title: "Share your requirement",
    text: "Use the quote form, WhatsApp or call us with quantity, size and design details.",
  },
  {
    icon: FileText,
    title: "Get pricing & proof",
    text: "We confirm options, paper type and timeline — and share proofs when needed.",
  },
  {
    icon: PackageCheck,
    title: "Print & collect",
    text: "Quality-checked printing ready for pickup or delivery as discussed.",
  },
];

export function HomeHowItWorks() {
  return (
    <section className="relative overflow-hidden border-y border-slate-100 bg-gradient-to-b from-white via-slate-50/80 to-white py-16 md:py-20">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SectionHeading
          eyebrow="Simple process"
          title="How It Works"
          subtitle="From first message to finished print — a straightforward experience with direct support."
        />
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <AnimateOnScroll key={step.title} delay={i * 100}>
              <div className="relative h-full rounded-3xl border border-slate-100/80 bg-white p-8 shadow-sm ring-1 ring-slate-100 transition duration-500 hover:-translate-y-1 hover:shadow-xl hover:ring-amber-400/25">
                <span className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-3 py-0.5 text-xs font-bold text-[#0a1628] shadow-md">
                  Step {i + 1}
                </span>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0a1628] to-[#1e3a5f] text-amber-300 shadow-lg shadow-[#0a1628]/20">
                  <step.icon className="h-7 w-7" strokeWidth={1.75} />
                </div>
                <h3 className="text-xl font-bold text-[#0a1628]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {step.text}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
