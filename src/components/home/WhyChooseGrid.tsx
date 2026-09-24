"use client";

import {
  Headphones,
  Layers,
  MessageSquareQuote,
  Palette,
  PenTool,
  Sparkles,
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const iconByTitle: Record<string, typeof Sparkles> = {
  "Custom Printing": Palette,
  "Professional Designs": PenTool,
  "Quality Materials": Sparkles,
  "Multiple Printing Solutions": Layers,
  "Easy Quotation": MessageSquareQuote,
  "Direct Customer Support": Headphones,
};

export function WhyChooseGrid({
  items,
}: {
  items: { title: string; text: string }[];
}) {
  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => {
        const Icon = iconByTitle[item.title] ?? Sparkles;
        return (
          <AnimateOnScroll key={item.title} delay={i * 80}>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-amber-400/25 hover:shadow-xl">
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-400/10 blur-2xl transition group-hover:bg-amber-400/20" />
              <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 text-amber-700 ring-1 ring-amber-200/60">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <div className="mb-3 h-1 w-10 rounded-full bg-gradient-to-r from-amber-400 to-[#1e3a5f] transition-all duration-500 group-hover:w-16" />
              <h3 className="text-lg font-bold text-[#0a1628]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.text}
              </p>
            </div>
          </AnimateOnScroll>
        );
      })}
    </div>
  );
}
