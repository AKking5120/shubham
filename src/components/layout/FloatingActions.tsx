"use client";

import { MessageCircle } from "lucide-react";
import { AutoUpButton } from "@/components/layout/AutoUpButton";
import { whatsappLink } from "@/lib/constants";

export function FloatingActions() {
  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-3 md:bottom-5">
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-900/20 transition hover:scale-105 hover:bg-[#1ebe57] animate-whatsapp-pulse"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
      <AutoUpButton />
    </div>
  );
}
