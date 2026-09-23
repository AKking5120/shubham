import type { EnquiryRow, ProductRow, ServiceRow } from "./server";
import type { Enquiry, Product, Service } from "../types";
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
