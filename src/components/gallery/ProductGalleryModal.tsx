"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import type { Product } from "@/lib/types";

type ProductGalleryModalProps = {
  products: Product[];
  initialIndex: number;
  title?: string;
  onClose: () => void;
};

const CLOSE_MS = 280;

export function ProductGalleryModal({
  products,
  initialIndex,
  title,
  onClose,
}: ProductGalleryModalProps) {
  const [index, setIndex] = useState(initialIndex);
  const [closing, setClosing] = useState(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const current = products[index];
  const progress = ((index + 1) / products.length) * 100;

  const goPrev = useCallback(() => {
    setIndex((i) => (i <= 0 ? products.length - 1 : i - 1));
  }, [products.length]);

  const goNext = useCallback(() => {
    setIndex((i) => (i >= products.length - 1 ? 0 : i + 1));
  }, [products.length]);

  const requestClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(() => onCloseRef.current(), CLOSE_MS);
  }, [closing]);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") requestClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [goPrev, goNext, requestClose]);

  if (!current || typeof document === "undefined") return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-black/75 p-3 backdrop-blur-md sm:p-6 ${
        closing ? "animate-modal-backdrop-out" : "animate-modal-backdrop-in"
      }`}
      role="dialog"
      aria-modal
      aria-label="Product gallery"
      onClick={requestClose}
    >
      <div
        className={`flex max-h-[96vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0f1f38] to-[#0a1628] shadow-2xl shadow-black/50 ${
          closing ? "animate-modal-panel-out" : "animate-modal-panel-in"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative border-b border-white/10 px-5 py-4 sm:px-6">
          <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400/90">
                <ZoomIn className="h-3.5 w-3.5" />
                {title ?? "Product Gallery"}
              </p>
              <p className="mt-1 text-lg font-bold text-white sm:text-xl">
                {current.name}
              </p>
              <p className="text-sm text-slate-400">
                {index + 1} of {products.length} · {current.category}
              </p>
            </div>
            <button
              type="button"
              className="flex shrink-0 items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20 hover:scale-105 active:scale-95"
              onClick={requestClose}
              aria-label="Close gallery"
            >
              <X className="h-5 w-5" />
              Close
            </button>
          </div>
        </div>

        <div className="relative flex flex-1 items-center justify-center bg-[#060d18]/60 px-4 py-6 sm:px-8">
          {products.length > 1 && (
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-2 z-10 rounded-full border border-white/10 bg-black/40 p-3 text-white backdrop-blur-sm transition hover:bg-white/15 hover:scale-110 active:scale-95 sm:left-4"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl ring-1 ring-white/10">
            <div className="relative aspect-[4/3] max-h-[min(58vh,640px)] w-full bg-slate-900/80">
              <Image
                key={current.id}
                src={current.image}
                alt={current.name}
                fill
                className="animate-gallery-image object-contain"
                sizes="(max-width: 768px) 100vw, 768px"
                unoptimized
              />
            </div>
          </div>

          {products.length > 1 && (
            <button
              type="button"
              onClick={goNext}
              className="absolute right-2 z-10 rounded-full border border-white/10 bg-black/40 p-3 text-white backdrop-blur-sm transition hover:bg-white/15 hover:scale-110 active:scale-95 sm:right-4"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </div>

        <div className="border-t border-white/10 bg-black/25 px-5 py-5 sm:px-6">
          <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-slate-300">
            {current.description}
          </p>

          {products.length > 1 && products.length <= 48 && (
            <div className="mt-5 flex justify-center gap-2 overflow-x-auto pb-1">
              {products.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-xl ring-2 transition-all duration-300 sm:h-16 sm:w-16 ${
                    i === index
                      ? "scale-105 shadow-lg shadow-amber-500/20 ring-amber-400"
                      : "opacity-60 ring-transparent hover:scale-105 hover:opacity-100"
                  }`}
                  aria-label={`View ${p.name}`}
                >
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="64px"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          )}
          {products.length > 48 && (
            <p className="mt-4 text-center text-xs text-slate-500">
              Use arrow keys or the side buttons to browse all {products.length}{" "}
              designs.
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
