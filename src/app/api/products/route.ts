import { NextResponse } from "next/server";
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
  const products = (await request.json()) as Product[];
  await saveProducts(products);
  return NextResponse.json({ success: true });
}
