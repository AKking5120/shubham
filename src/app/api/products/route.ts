import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getProducts, saveProducts } from "@/lib/store";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import type { Product } from "@/lib/types";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function PUT(request: Request) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const products = (await request.json()) as Product[];
    await saveProducts(products);
    revalidatePath("/");
    revalidatePath("/gallery");
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Save failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
