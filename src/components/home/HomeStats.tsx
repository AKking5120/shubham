"use client";

import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

type Stat = { value: string; label: string };

export function HomeStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="relative z-10 -mt-6 mx-auto max-w-5xl px-4 lg:px-6">
      <div className="grid grid-cols-2 gap-3 rounded-3xl border border-white/10 bg-white/95 p-4 shadow-2xl shadow-[#0a1628]/25 backdrop-blur-xl md:grid-cols-4 md:gap-0 md:divide-x md:divide-slate-200/80 md:p-0">
        {stats.map((stat, i) => (
          <AnimateOnScroll key={stat.label} delay={i * 60}>
            <div className="flex flex-col items-center justify-center px-4 py-5 text-center md:py-8">
              <p className="text-2xl font-extrabold tracking-tight text-gradient-brand md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 md:text-sm">
                {stat.label}
              </p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  );
}
