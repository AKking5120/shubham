"use client";

import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function WhyChooseGrid({
  items,
}: {
  items: { title: string; text: string }[];
}) {
  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <AnimateOnScroll key={item.title} delay={i * 80}>
          <div className="group h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-amber-400/30 hover:shadow-lg">
            <div className="mb-3 h-1 w-10 rounded-full bg-gradient-to-r from-amber-400 to-[#1e3a5f] transition-all duration-500 group-hover:w-16" />
            <h3 className="text-lg font-bold text-[#0a1628]">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {item.text}
            </p>
          </div>
        </AnimateOnScroll>
      ))}
    </div>
  );
}
