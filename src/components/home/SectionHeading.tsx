"use client";

import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
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
        {eyebrow && (
          <p
            className={`mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 ${
              align === "center" ? "" : ""
            }`}
          >
            {eyebrow}
          </p>
        )}
        <div
          className={`mb-4 h-1 w-14 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-[#1e3a5f] animate-shimmer-line ${
            align === "center" ? "mx-auto" : ""
          }`}
        />
        <h2 className="text-3xl font-extrabold tracking-tight text-[#0a1628] md:text-4xl lg:text-[2.75rem] lg:leading-tight">
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
