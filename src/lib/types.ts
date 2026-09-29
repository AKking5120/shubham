import type {
  ENQUIRY_STATUSES,
  GALLERY_CATEGORIES,
  ORDER_STATUSES,
  PAYMENT_METHODS,
} from "./constants";

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

export type OrderStatus = (typeof ORDER_STATUSES)[number];
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];
export type PaymentStatus = "pending" | "paid" | "failed" | "not_required";

export interface OrderLineItem {
  id: string;
  title: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  options?: string;
  fileUrl?: string | null;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  pincode: string;
  items: OrderLineItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  status: OrderStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
