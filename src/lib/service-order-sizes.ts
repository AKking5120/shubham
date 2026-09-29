const COMMON = ["Standard / shop default", "Custom size (describe below)"];

export const SERVICE_SIZE_OPTIONS: Record<string, string[]> = {
  "bill-book": ["A5 duplicate (5.8\" x 8.3\")", "A4 duplicate", "3\" x 5\" challan size", ...COMMON],
  "challan-book": ["A5", "A4", "Custom size (describe below)"],
  "letter-pad": ["A4 letterhead", "A5 letterhead", ...COMMON],
  "visiting-card-tag": ["3.5\" x 2\" (standard)", "4\" x 2.5\"", "Square 2.5\"", ...COMMON],
  "die-cut-visiting-card": ["3.5\" x 2\"", "Custom die-cut shape", ...COMMON],
  "sticker-banner": ["1 sq ft", "2 sq ft", "3x2 ft flex", "4x3 ft flex", ...COMMON],
  "wedding-card": ["5\" x 7\" card", "6\" x 8\" card", "Scroll invite", ...COMMON],
  "bulk-copy-printout": ["A4 single side", "A4 double side", "A3", ...COMMON],
  "doctor-files": ["9\" x 12\" doctor file", "A4 folder", ...COMMON],
  envelope: ["9\" x 4\"", "10\" x 12\"", ...COMMON],
  "atm-pouch": ["Standard ATM pouch", ...COMMON],
  "id-card": ["CR80 PVC (standard ID)", ...COMMON],
  "uv-texture": ["3.5\" x 2\" UV card", ...COMMON],
  "garment-tags": ["50x50 mm", "40x60 mm", ...COMMON],
};

export const CALCULATOR_SIZE_OPTIONS: Record<string, string[]> = {
  visiting_cards: SERVICE_SIZE_OPTIONS["visiting-card-tag"],
  bill_books: SERVICE_SIZE_OPTIONS["bill-book"],
  doctor_files: SERVICE_SIZE_OPTIONS["doctor-files"],
  banners: SERVICE_SIZE_OPTIONS["sticker-banner"],
  bulk_prints: SERVICE_SIZE_OPTIONS["bulk-copy-printout"],
};

export function sizeOptionsForService(slug: string): string[] {
  return SERVICE_SIZE_OPTIONS[slug] ?? COMMON;
}

export function sizeOptionsForCalculator(key: string): string[] {
  return CALCULATOR_SIZE_OPTIONS[key] ?? COMMON;
}
