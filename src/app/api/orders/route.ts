import { NextResponse } from "next/server";
import {
  DELHI_DELIVERY_FEE_INR,
  isDelhiDeliveryPincode,
} from "@/lib/constants";
import { lineTotal } from "@/lib/cart-types";
import type { CartLineItem } from "@/lib/cart-types";
import { normalizeOrderPhone, orderTotals } from "@/lib/order-utils";
import { isRazorpayConfigured } from "@/lib/razorpay";
import { addOrder } from "@/lib/store";
import type { OrderLineItem, PaymentMethod } from "@/lib/types";

type CreateOrderBody = {
  customerName: string;
  phone: string;
  email?: string;
  addressLine1: string;
  addressLine2?: string;
  city?: string;
  pincode: string;
  notes?: string;
  paymentMethod: PaymentMethod;
  items: CartLineItem[];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateOrderBody;

    if (!body.customerName?.trim() || !body.phone?.trim()) {
      return NextResponse.json(
        { error: "Name and phone are required." },
        { status: 400 },
      );
    }
    if (!body.addressLine1?.trim() || !body.pincode?.trim()) {
      return NextResponse.json(
        { error: "Delivery address and pincode are required." },
        { status: 400 },
      );
    }
    if (!isDelhiDeliveryPincode(body.pincode)) {
      return NextResponse.json(
        {
          error:
            "We currently deliver online orders within Delhi only (pincode 110xxx).",
        },
        { status: 400 },
      );
    }
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    const paymentMethod = body.paymentMethod === "razorpay" ? "razorpay" : "cod";

    if (paymentMethod === "razorpay" && !isRazorpayConfigured()) {
      return NextResponse.json(
        {
          error:
            "Online payment is not active yet. Please choose Cash on Delivery (COD).",
        },
        { status: 400 },
      );
    }

    const orderItems: OrderLineItem[] = body.items.map((item) => ({
      id: item.cartId,
      title: item.title,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      lineTotal: lineTotal(item),
      options: item.options,
      fileUrl: item.fileUrl ?? null,
    }));

    const { subtotal, deliveryFee, total } = orderTotals(
      orderItems,
      DELHI_DELIVERY_FEE_INR,
    );

    const order = await addOrder({
      customerName: body.customerName.trim(),
      phone: normalizeOrderPhone(body.phone),
      email: (body.email ?? "").trim(),
      addressLine1: body.addressLine1.trim(),
      addressLine2: (body.addressLine2 ?? "").trim(),
      city: (body.city ?? "New Delhi").trim(),
      pincode: body.pincode.replace(/\D/g, ""),
      items: orderItems,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "pending" : "pending",
      razorpayOrderId: null,
      razorpayPaymentId: null,
      status: "placed",
      notes: (body.notes ?? "").trim(),
    });

    return NextResponse.json({ order });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Could not place order.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
