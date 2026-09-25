"use client";

import Link from "next/link";
import { FileText, MapPin, MessageSquare, PhoneCall } from "lucide-react";
import { BUSINESS, mapsLink, telLink, whatsappLink } from "@/lib/constants";

export function MobileBottomBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-800 p-2.5 flex items-center justify-around text-white">
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-0.5 text-[10px] text-emerald-400 font-medium"
      >
        <MessageSquare className="w-5 h-5" />
        <span>WhatsApp</span>
      </a>
      <a
        href={telLink(BUSINESS.phones[0])}
        className="flex flex-col items-center gap-0.5 text-[10px] text-amber-400 font-medium"
      >
        <PhoneCall className="w-5 h-5" />
        <span>Call Now</span>
      </a>
      <Link
        href="/contact#quote"
        className="flex flex-col items-center gap-0.5 text-[10px] text-blue-300 font-medium"
      >
        <FileText className="w-5 h-5" />
        <span>Get Quote</span>
      </Link>
      <a
        href={mapsLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-0.5 text-[10px] text-slate-300 font-medium"
      >
        <MapPin className="w-5 h-5" />
        <span>Location</span>
      </a>
    </div>
  );
}
