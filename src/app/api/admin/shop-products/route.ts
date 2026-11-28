import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getCatalogSubcategory } from "@/lib/print-catalog";
import { getShopProductEntries, saveShopProductOverride } from "@/lib/managed-shop";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { isCloudinaryConfigured } from "@/lib/cloudinary";
import { saveUploadedFile } from "@/lib/uploads";

function reject(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

async function isProductPhoto(file: File) {
  if (file.size > 4_000_000) return false;
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const signature = String.fromCharCode(...bytes);
  return (file.type === "image/jpeg" && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) ||
    (file.type === "image/png" && signature.startsWith("\x89PNG\r\n\x1a\n")) ||
    (file.type === "image/webp" && signature.startsWith("RIFF") && signature.slice(8) === "WEBP");
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return reject("Unauthorized", 401);
  if (!isSupabaseConfigured()) return reject("Shop storage is unavailable.", 503);

  try {
    const form = await request.formData();
    const name = String(form.get("name") ?? "").trim();
    const [categorySlug, subcategorySlug] = String(form.get("destination") ?? "").split(":");
    const entries = await getShopProductEntries();
    const item = entries.find(({ key }) => key === form.get("key"));
    if (!item || !name || name.length > 120 || !getCatalogSubcategory(categorySlug, subcategorySlug)) {
      return reject("Choose a product and a valid category, and enter its name.");
    }
    if (entries.some((other) => other.key !== item.key && other.product.slug === item.product.slug &&
      (other.override?.categorySlug ?? other.categorySlug) === categorySlug &&
      (other.override?.subcategorySlug ?? other.subcategorySlug) === subcategorySlug)) {
      return reject("That destination already contains a product with this ID.", 409);
    }

    let image = item.override?.image ?? item.product.image;
    const photo = form.get("photo");
    if (photo instanceof File && photo.size > 0) {
      if (!(await isProductPhoto(photo))) return reject("Choose a JPEG, PNG or WebP photo up to 4 MB.");
      if (!isCloudinaryConfigured()) return reject("Product photo storage is unavailable.", 503);
      image = await saveUploadedFile(photo, "shop");
    }

    await saveShopProductOverride(item.key, {
      name,
      image,
      categorySlug,
      subcategorySlug,
      hidden: form.get("hidden") === "on",
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Shop product update failed", error);
    return reject("Could not save the product.", 500);
  }
}
