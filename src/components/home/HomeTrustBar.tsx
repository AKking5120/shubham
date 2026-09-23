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
    <section className="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white py-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 md:grid-cols-3 lg:grid-cols-6 lg:px-6">
        {trustItems.map(({ icon: Icon, label }, i) => (
          <AnimateOnScroll key={label} delay={i * 70}>
            <div className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1 hover:shadow-md hover:ring-amber-400/25">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0a1628]/5 text-[#1e3a5f]">
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
