import type {
  EnquiryRow,
  OrderRow,
  ProductRow,
  ProfileRow,
  ReviewRow,
  ServiceRow,
} from "./server";
import type {
  CustomerProfile,
  Enquiry,
  Order,
  OrderLineItem,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  Product,
  Review,
  Service,
} from "../types";
import type { EnquiryStatus, GalleryCategory } from "../types";

export function rowToService(row: ServiceRow): Service {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    shortDescription: row.short_description,
    description: row.description,
    image: row.image,
    enabled: row.enabled,
    order: row.sort_order,
  };
}

export function serviceToRow(service: Service): ServiceRow {
  return {
    id: service.id,
    slug: service.slug,
    name: service.name,
    short_description: service.shortDescription,
    description: service.description,
    image: service.image,
    enabled: service.enabled,
    sort_order: service.order,
  };
}

export function rowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category as GalleryCategory,
    description: row.description,
    image: row.image,
  };
}

export function productToRow(product: Product): ProductRow {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    description: product.description,
    image: product.image,
  };
}

export function rowToEnquiry(row: EnquiryRow): Enquiry {
  return {
    id: row.id,
    customerName: row.customer_name,
    phone: row.phone,
    email: row.email,
    service: row.service,
    quantity: row.quantity,
    size: row.size,
    material: row.material,
    colorRequirement: row.color_requirement,
    message: row.message,
    uploadedFile: row.uploaded_file,
    status: row.status as EnquiryStatus,
    createdAt: row.created_at ?? new Date().toISOString(),
  };
}

export function rowToProfile(row: ProfileRow): CustomerProfile {
  return {
    id: row.id,
    fullName: row.full_name,
    phone: row.phone,
    email: row.email,
    addressLine1: row.address_line1,
    addressLine2: row.address_line2,
    city: row.city,
    pincode: row.pincode,
    updatedAt: row.updated_at ?? new Date().toISOString(),
  };
}

export function profileToRow(
  profile: Omit<CustomerProfile, "updatedAt"> & { updatedAt?: string },
): ProfileRow {
  return {
    id: profile.id,
    full_name: profile.fullName,
    phone: profile.phone,
    email: profile.email,
    address_line1: profile.addressLine1,
    address_line2: profile.addressLine2,
    city: profile.city,
    pincode: profile.pincode,
    updated_at: profile.updatedAt,
  };
}

export function rowToOrder(row: OrderRow): Order {
  const items = (Array.isArray(row.items) ? row.items : []) as OrderLineItem[];
  return {
    id: row.id,
    orderNumber: row.order_number,
    userId: row.user_id ?? null,
    customerName: row.customer_name,
    phone: row.phone,
    email: row.email,
    addressLine1: row.address_line1,
    addressLine2: row.address_line2,
    city: row.city,
    pincode: row.pincode,
    items,
    subtotal: Number(row.subtotal),
    deliveryFee: Number(row.delivery_fee),
    total: Number(row.total),
    paymentMethod: row.payment_method as PaymentMethod,
    paymentStatus: row.payment_status as PaymentStatus,
    razorpayOrderId: row.razorpay_order_id,
    razorpayPaymentId: row.razorpay_payment_id,
    status: row.status as OrderStatus,
    notes: row.notes,
    createdAt: row.created_at ?? new Date().toISOString(),
    updatedAt: row.updated_at ?? row.created_at ?? new Date().toISOString(),
  };
}

export function orderToRow(
  order: Omit<Order, "createdAt" | "updatedAt"> & {
    createdAt?: string;
    updatedAt?: string;
  },
): OrderRow {
  return {
    id: order.id,
    order_number: order.orderNumber,
    user_id: order.userId,
    customer_name: order.customerName,
    phone: order.phone,
    email: order.email,
    address_line1: order.addressLine1,
    address_line2: order.addressLine2,
    city: order.city,
    pincode: order.pincode,
    items: order.items,
    subtotal: order.subtotal,
    delivery_fee: order.deliveryFee,
    total: order.total,
    payment_method: order.paymentMethod,
    payment_status: order.paymentStatus,
    razorpay_order_id: order.razorpayOrderId,
    razorpay_payment_id: order.razorpayPaymentId,
    status: order.status,
    notes: order.notes,
    created_at: order.createdAt,
    updated_at: order.updatedAt,
  };
}

export function enquiryToRow(
  enquiry: Omit<Enquiry, "createdAt"> & { createdAt?: string },
): EnquiryRow {
  return {
    id: enquiry.id,
    customer_name: enquiry.customerName,
    phone: enquiry.phone,
    email: enquiry.email,
    service: enquiry.service,
    quantity: enquiry.quantity,
    size: enquiry.size,
    material: enquiry.material,
    color_requirement: enquiry.colorRequirement,
    message: enquiry.message,
    uploaded_file: enquiry.uploadedFile,
    status: enquiry.status,
    created_at: enquiry.createdAt,
  };
}

export function rowToReview(row: ReviewRow): Review {
  return {
    id: row.id,
    customerName: row.customer_name,
    rating: Number(row.rating),
    message: row.message,
    createdAt: row.created_at ?? new Date().toISOString(),
  };
}

export function reviewToRow(review: Review): ReviewRow {
  return {
    id: review.id,
    customer_name: review.customerName,
    rating: review.rating,
    message: review.message,
    created_at: review.createdAt,
  };
}
