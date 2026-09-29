import { NextResponse } from "next/server";
import { trackOrder } from "@/lib/store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderNumber = searchParams.get("orderNumber") ?? "";
  const phone = searchParams.get("phone") ?? "";

  if (!orderNumber.trim() || !phone.trim()) {
    return NextResponse.json(
      { error: "Order number and phone are required." },
      { status: 400 },
    );
  }

  const order = await trackOrder(orderNumber, phone);
  if (!order) {
    return NextResponse.json(
      { error: "No order found. Check order ID and phone number." },
      { status: 404 },
    );
  }

  return NextResponse.json({ order });
}
