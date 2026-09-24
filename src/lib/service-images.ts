/** Local service preview images (from Printers Club category artwork). */
export const SERVICE_IMAGES: Record<string, string> = {
  "bill-book": "/services/bill-book.jpg",
  "challan-book": "/services/challan-book.jpg",
  "letter-pad": "/services/letter-pad.jpg",
  "visiting-card-tag": "/services/visiting-card-tag.jpg",
  "sticker-banner": "/services/sticker-banner.jpg",
  "wedding-card": "/services/wedding-card.jpg",
  "bulk-copy-printout": "/services/bulk-copy-printout.jpg",
};

export function serviceImageForSlug(slug: string): string {
  return SERVICE_IMAGES[slug] ?? "/services/bill-book.jpg";
}
