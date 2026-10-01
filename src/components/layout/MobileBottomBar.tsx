"use client";

import Link from "next/link";
import { Home, MapPin, ShoppingBag, Truck } from "lucide-react";
import { mapsLink } from "@/lib/constants";

export function MobileBottomBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-800 p-2.5 flex items-center justify-around text-white">
      <Link
        href="/"
        className="flex flex-col items-center gap-0.5 text-[10px] text-slate-300 font-medium"
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </Link>
      <Link
        href="/shop"
        className="flex flex-col items-center gap-0.5 text-[10px] text-blue-300 font-medium"
      >
        <ShoppingBag className="w-5 h-5" />
        <span>Shop</span>
      </Link>
      <Link
        href="/track-order"
        className="flex flex-col items-center gap-0.5 text-[10px] text-amber-400 font-medium"
      >
        <Truck className="w-5 h-5" />
        <span>Track</span>
      </Link>
      <a
        href={mapsLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-0.5 text-[10px] text-slate-300 font-medium"
      >
        <MapPin className="w-5 h-5" />
        <span>Map</span>
      </a>
    </div>
  );
}
