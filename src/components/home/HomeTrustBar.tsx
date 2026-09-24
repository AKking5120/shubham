"use client";

import {
  BadgeCheck,
  Headphones,
  Palette,
  Sparkles,
  Timer,
  Wallet,
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const trustItems = [
  { icon: BadgeCheck, label: "Quality Printing" },
  { icon: Sparkles, label: "Professional Finish" },
  { icon: Palette, label: "Custom Printing" },
  { icon: Timer, label: "Fast Response" },
  { icon: Wallet, label: "Affordable Solutions" },
  { icon: Headphones, label: "Direct Customer Support" },
];

export function HomeTrustBar() {
  return (
    <section className="relative border-b border-slate-100 bg-mesh-light py-10 md:py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 md:grid-cols-3 lg:grid-cols-6 lg:px-6">
        {trustItems.map(({ icon: Icon, label }, i) => (
          <AnimateOnScroll key={label} delay={i * 70}>
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-slate-100/80 bg-white/90 p-4 text-center shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:ring-2 hover:ring-amber-400/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0a1628] to-[#1e3a5f] text-amber-300 shadow-md shadow-[#0a1628]/15">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-semibold text-slate-700 md:text-sm">
                {label}
              </span>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
