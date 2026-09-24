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
