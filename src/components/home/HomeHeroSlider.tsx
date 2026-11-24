"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";

const AUTO_MS = 5000;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const slides = [
  {
    src: "/banners/print-made-perfect.webp",
    alt: "Print Made Perfect — business cards, brochures, banners, flyers and posters.",
  },
  {
    src: "/banners/professional-printing.webp",
    alt: "Professional Printing Services — bulk printing, quality prints and on-time delivery.",
  },
  {
    src: "/banners/printing-and-binding.webp",
    alt: "Complete Printing and Binding Services — stationery, promotional prints, spiral and wire binding, and lamination.",
  },
];
const controlClass =
  "grid size-10 place-items-center rounded-full border border-slate-200 bg-white text-[#082e67] hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700";

function subscribeToReducedMotion(onChange: () => void) {
  const preference = window.matchMedia(REDUCED_MOTION);
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

export function HomeHeroSlider() {
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState<boolean | null>(null);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
  const playing = autoplay ?? !reducedMotion;
  const rotating = playing && !hovered;

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, AUTO_MS);
    return () => window.clearInterval(timer);
  }, [rotating]);

  function chooseSlide(next: number) {
    setAutoplay(false);
    setIndex((next + slides.length) % slides.length);
  }

  return (
    <section
      aria-label="Printing promotions"
      aria-roledescription="carousel"
      className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6"
    >
      <div
        className="overflow-hidden rounded-2xl border border-blue-100 bg-slate-950"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
          aria-live={rotating ? "off" : "polite"}
        >
          {slides.map((slide, slideIndex) => (
            <div
              key={slide.src}
              className="relative aspect-video w-full shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${slideIndex + 1} of ${slides.length}`}
              aria-hidden={slideIndex !== index}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                loading="eager"
                sizes="(max-width: 1280px) 100vw, 1232px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        <button type="button" className={controlClass} aria-label="Previous banner" onClick={() => chooseSlide(index - 1)}>
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.src}
            type="button"
            className={controlClass}
            aria-label={`Show banner ${slideIndex + 1}`}
            aria-current={slideIndex === index ? "true" : undefined}
            onClick={() => chooseSlide(slideIndex)}
          >
            <span
              aria-hidden="true"
              className={slideIndex === index ? "size-2.5 rounded-full bg-blue-700" : "size-2.5 rounded-full bg-slate-300"}
            />
          </button>
        ))}
        <button type="button" className={controlClass} aria-label={playing ? "Pause banners" : "Play banners"} onClick={() => setAutoplay(!playing)}>
          {playing ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
        </button>
        <button type="button" className={controlClass} aria-label="Next banner" onClick={() => chooseSlide(index + 1)}>
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
