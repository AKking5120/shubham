import type { ENQUIRY_STATUSES, GALLERY_CATEGORIES } from "./constants";

export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];
export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export interface Service {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  enabled: boolean;
  order: number;
}

export interface Product {
  id: string;
  name: string;
  category: GalleryCategory;
  description: string;
  image: string;
}

export interface Enquiry {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  service: string;
  quantity: string;
  size: string;
  material: string;
  colorRequirement: string;
  message: string;
  uploadedFile: string | null;
  status: EnquiryStatus;
  createdAt: string;
}

export interface CustomerSummary {
  name: string;
  phone: string;
  email: string;
  enquiryCount: number;
  lastEnquiry: string;
}

export interface SiteSettings {
  adminPasswordHash?: string;
}
