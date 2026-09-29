import type { PriceCalculatorConfig } from "./price-calculator";

const SLUG_TO_CALCULATOR_KEY: Record<string, string> = {
  "visiting-card-tag": "visiting_cards",
  "garment-tags": "visiting_cards",
  "die-cut-visiting-card": "visiting_cards",
  "bill-book": "bill_books",
  "challan-book": "bill_books",
  "doctor-files": "doctor_files",
  envelope: "doctor_files",
  "sticker-banner": "banners",
  "bulk-copy-printout": "bulk_prints",
  "letter-pad": "doctor_files",
  "id-card": "doctor_files",
  "atm-pouch": "doctor_files",
  "uv-texture": "visiting_cards",
};

const FALLBACK_UNIT_PRICE = 299;

/** Estimated line price from calculator defaults (admin can adjust final amount). */
export function estimateServiceLinePrice(
  serviceSlug: string,
  quantity: number,
  config: PriceCalculatorConfig,
): number {
  const key = SLUG_TO_CALCULATOR_KEY[serviceSlug];
  const cat = key ? config[key] : undefined;
  if (!cat || cat.papers.length === 0) {
    return FALLBACK_UNIT_PRICE * Math.max(1, quantity);
  }
  const paper = cat.papers[0];
  const qty = Math.max(1, quantity);
  return Math.round(paper.baseRate * qty);
}
