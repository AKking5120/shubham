"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SHOW_AFTER_PX = 280;

export function AutoUpButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      title="Back to top"
      aria-label="Back to top"
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-slate-800/95 text-white shadow-lg shadow-slate-900/25 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-[#1e3a5f] active:scale-95",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
    </button>
  );
}
