"use client";

import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function SectionHeading({
  title,
  subtitle,
  align = "center",
}: {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <AnimateOnScroll>
      <div
        className={
          align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
        }
      >
        <div
          className={`mb-4 h-1 w-14 rounded-full bg-gradient-to-r from-amber-400 to-[#1e3a5f] animate-shimmer-line ${
            align === "center" ? "mx-auto" : ""
          }`}
        />
        <h2 className="text-3xl font-bold tracking-tight text-[#0a1628] md:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </AnimateOnScroll>
  );
}
