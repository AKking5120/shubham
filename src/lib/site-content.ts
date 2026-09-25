import { BUSINESS, SEO, WHATSAPP_DEFAULT_MESSAGE } from "./constants";

export type SiteContent = {
  business: {
    name: string;
    owner: string;
    phones: string[];
    email: string;
    address: {
      line1: string;
      line2: string;
      city: string;
      full: string;
    };
    slogan: string;
  };
  seo: {
    title: string;
    description: string;
  };
  announcement: {
    badge: string;
    text: string;
  };
  hero: {
    title: string;
    highlight: string;
    description: string;
  };
  contact: {
    workingHours: string;
    whatsappDefaultMessage: string;
  };
};

export const DEFAULT_SITE_CONTENT: SiteContent = {
  business: {
    name: BUSINESS.name,
    owner: BUSINESS.owner,
    phones: [...BUSINESS.phones],
    email: BUSINESS.email,
    address: { ...BUSINESS.address },
    slogan: BUSINESS.slogan,
  },
  seo: {
    title: SEO.title,
    description: SEO.description,
  },
  announcement: {
    badge: "Fast Turnaround",
    text:
      "GST Bill Books, Spot UV Cards, Doctor Files & Shadi Cards in Badarpur & Jaitpur!",
  },
  hero: {
    title: "Complete High-Quality",
    highlight: "Printing & Stationery",
    description:
      "Serving South Delhi businesses, doctors, schools & walk-in customers. From GST duplicate bill books to spot UV texture cards, garment tags, doctor files & shadi cards with fast local turnaround.",
  },
  contact: {
    workingHours: "Monday - Sunday: 9:00 AM - 9:00 PM",
    whatsappDefaultMessage: WHATSAPP_DEFAULT_MESSAGE,
  },
};

export function mergeSiteContent(partial: Partial<SiteContent>): SiteContent {
  return {
    business: { ...DEFAULT_SITE_CONTENT.business, ...partial.business },
    seo: { ...DEFAULT_SITE_CONTENT.seo, ...partial.seo },
    announcement: {
      ...DEFAULT_SITE_CONTENT.announcement,
      ...partial.announcement,
    },
    hero: { ...DEFAULT_SITE_CONTENT.hero, ...partial.hero },
    contact: { ...DEFAULT_SITE_CONTENT.contact, ...partial.contact },
  };
}
