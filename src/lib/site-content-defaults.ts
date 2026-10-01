import { BUSINESS, PAGE_HERO_IMAGES, SEO, WHATSAPP_DEFAULT_MESSAGE } from "./constants";
import type { SiteContent } from "./site-content-types";

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
    title: "High-Quality",
    highlight: "Printing Solutions",
    trailing: "for Every Business",
    description:
      "Bill books, visiting cards, wedding invites, flex & bulk print — Jaitpur & Badarpur, South Delhi.",
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
