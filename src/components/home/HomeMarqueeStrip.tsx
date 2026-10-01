const ITEMS = [
  "GST Bill Books",
  "Spot UV Visiting Cards",
  "Gold Foil Cards",
  "Wedding Cards",
  "Flex & Banners",
  "Letter Pads",
  "Garment Tags",
  "Bulk Xerox & Binding",
  "Doctor Files",
  "Stickers & Labels",
];

function MarqueeTrack() {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {ITEMS.map((label) => (
        <span
          key={label}
          className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-bold text-slate-900"
        >
          <span className="text-base" aria-hidden>✨</span>
          {label}
        </span>
      ))}
    </div>
  );
}

export function HomeMarqueeStrip() {
  return (
    <div className="border-b border-amber-400/80 bg-[#FACC15] py-2.5 overflow-hidden">
      <div className="flex w-max animate-home-marquee">
        <MarqueeTrack />
        <MarqueeTrack aria-hidden />
      </div>
    </div>
  );
}
