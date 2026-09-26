import { BUSINESS, PAGE_HERO_IMAGES, SEO, WHATSAPP_DEFAULT_MESSAGE } from "./constants";

export type ShopPhoto = {
  id: string;
  image: string;
  caption: string;
};

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
  shopGallery: {
    title: string;
    subtitle: string;
    photos: ShopPhoto[];
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
      "GST Bill Books, Spot UV Cards, Doctor Files & Wedding Card in Badarpur & Jaitpur!",
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
  shopGallery: {
    title: "Our Shop & Workspace",
    subtitle:
      "Visit us at Jaitpur, Badarpur for samples, urgent jobs and face-to-face printing advice.",
    photos: [
      {
        id: "shop-1",
        image: PAGE_HERO_IMAGES.storefront,
        caption: "Shubham Prints — your local printing partner",
      },
      {
        id: "shop-2",
        image:
          "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=900&q=80",
        caption: "Commercial printing & stationery counter",
      },
      {
        id: "shop-3",
        image:
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80",
        caption: "Bill books, cards and bulk printouts",
      },
    ],
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
    shopGallery: {
      ...DEFAULT_SITE_CONTENT.shopGallery,
      ...partial.shopGallery,
      photos:
        partial.shopGallery?.photos !== undefined
          ? partial.shopGallery.photos
          : DEFAULT_SITE_CONTENT.shopGallery.photos,
    },
  };
}
