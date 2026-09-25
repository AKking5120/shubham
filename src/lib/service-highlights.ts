import type { Service } from "@/lib/types";

/** Bullet points for services catalogue (mockup-style list). */
export function serviceHighlights(service: Service): string[] {
  const bySlug: Record<string, string[]> = {
    "bill-book": [
      "Duplicate & triplicate formats",
      "Custom business header & GST details",
      "Numbered pages for daily billing",
      "Durable paper for shop use",
    ],
    "challan-book": [
      "Delivery & logistics layouts",
      "Company branding on every page",
      "Clear fields for quantities & signatures",
      "Bulk printing for commercial use",
    ],
    "letter-pad": [
      "Logo & contact details on every sheet",
      "Premium paper options",
      "Ideal for offices & firms",
      "Professional brand presentation",
    ],
    "visiting-card-tag": [
      "Multiple finishes & sizes",
      "Sharp colour printing",
      "Retail tags & professional cards",
      "Quick turnaround on bulk orders",
    ],
    "sticker-banner": [
      "Indoor & outdoor options",
      "Vivid colours for promotions",
      "Custom sizes for shops & events",
      "Branding stickers & flex banners",
    ],
    "wedding-card": [
      "Traditional & modern designs",
      "Premium papers & finishes",
      "Matching envelopes & inserts",
      "Personalised text & motifs",
    ],
    "bulk-copy-printout": [
      "Bulk photocopy & document printouts",
      "Black & white and colour printing",
      "A4 and custom page sizes",
      "Binding, spiral and finishing options",
    ],
    "id-card": [
      "Staff, student & member ID layouts",
      "Photo, name & designation fields",
      "Barcode / QR options available",
      "Durable PVC or laminated cards",
    ],
    "die-cut-visiting-card": [
      "Shaped & premium die-cut cards",
      "Metal, velvet & UV finish options",
      "Stand-out branding for businesses",
      "Wide design gallery to choose from",
    ],
    envelope: [
      "Business & gift envelope sizes",
      "Logo and return address printing",
      "Standard and custom dimensions",
      "Ideal for offices and invitations",
    ],
    "atm-pouch": [
      "ATM, RC & document pouches",
      "Dealer and bank branding options",
      "Durable materials for daily use",
      "Multiple layout templates",
    ],
    "doctor-files": [
      "Clinic and hospital file layouts",
      "OPD and record-keeping formats",
      "Professional medical branding",
      "Custom text and logo placement",
    ],
    "uv-texture": [
      "UV texture templates for premium print",
      "Suitable for cards and labels",
      "High-impact visual effects",
      "Print-ready artwork references",
    ],
    "garment-tags": [
      "Apparel hang tags & labels",
      "Retail and boutique branding",
      "Multiple tag shapes and sizes",
      "Stringing and finishing on request",
    ],
  };

  return (
    bySlug[service.slug] ?? [
      service.shortDescription,
      "Custom layouts to your requirement",
      "Quality materials & clear printing",
      "Easy quote via form or WhatsApp",
    ]
  );
}
