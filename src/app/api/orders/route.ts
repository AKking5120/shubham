import { NextResponse } from "next/server";
import {
  DELHI_DELIVERY_FEE_INR,
  isDelhiDeliveryPincode,
} from "@/lib/constants";
import { lineTotal } from "@/lib/cart-types";
import type { CartLineItem } from "@/lib/cart-types";
import { normalizeOrderPhone, orderTotals } from "@/lib/order-utils";
import { getPublicRazorpayKeyId, isRazorpayConfigured } from "@/lib/razorpay";
import {
  createRazorpayOrder,
  isRazorpayServerReady,
} from "@/lib/razorpay-server";
import { formatApiError } from "@/lib/api-errors";
import { getSupabaseUser } from "@/lib/supabase/server-auth";
import { addOrder, saveCustomerProfileFromCheckout, updateOrder } from "@/lib/store";
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

    if (paymentMethod === "razorpay" && !isRazorpayServerReady()) {
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

    const authUser = await getSupabaseUser();
    const userId = authUser?.id ?? null;
    const customerEmail =
      (body.email ?? "").trim() || authUser?.email?.trim() || "";

    const order = await addOrder({
      userId,
      customerName: body.customerName.trim(),
      phone: normalizeOrderPhone(body.phone),
      email: customerEmail,
      addressLine1: body.addressLine1.trim(),
      addressLine2: (body.addressLine2 ?? "").trim(),
      city: (body.city ?? "New Delhi").trim(),
      pincode: body.pincode.replace(/\D/g, ""),
      items: orderItems,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
      paymentStatus: "pending",
      razorpayOrderId: null,
      razorpayPaymentId: null,
      status: "placed",
      notes: (body.notes ?? "").trim(),
    });

    if (userId) {
      await saveCustomerProfileFromCheckout(userId, {
        fullName: body.customerName.trim(),
        phone: normalizeOrderPhone(body.phone),
        email: customerEmail,
        addressLine1: body.addressLine1.trim(),
        addressLine2: (body.addressLine2 ?? "").trim(),
        city: (body.city ?? "New Delhi").trim(),
        pincode: body.pincode.replace(/\D/g, ""),
      });
    }

    if (paymentMethod === "razorpay" && isRazorpayConfigured()) {
      try {
        const rzOrder = await createRazorpayOrder({
          amountInr: total,
          receipt: order.orderNumber,
          notes: {
            order_id: order.id.slice(0, 64),
            order_number: order.orderNumber.slice(0, 64),
          },
        });

        const withRz = await updateOrder(order.id, {
          razorpayOrderId: rzOrder.id,
        });

        const keyId = getPublicRazorpayKeyId() ?? process.env.RAZORPAY_KEY_ID;
        if (!keyId) {
          return NextResponse.json(
            {
              error:
                "Razorpay Key ID missing on server. Set NEXT_PUBLIC_RAZORPAY_KEY_ID and RAZORPAY_KEY_ID in Vercel.",
            },
            { status: 500 },
          );
        }

        return NextResponse.json({
          order: withRz ?? order,
          razorpayCheckout: {
            keyId,
            amount: rzOrder.amount,
            currency: rzOrder.currency,
            razorpayOrderId: rzOrder.id,
            internalOrderId: order.id,
            orderNumber: order.orderNumber,
          },
        });
      } catch (rzErr) {
        console.error("Razorpay order create failed:", rzErr);
        return NextResponse.json(
          {
            error: formatApiError(
              rzErr,
              "Razorpay payment could not start. Check Key ID and Key Secret match (same CSV), or use COD.",
            ),
          },
          { status: 502 },
        );
      }
    }

    return NextResponse.json({ order });
  } catch (err) {
    console.error("Create order failed:", err);
    const msg = formatApiError(err, "Could not place order.");
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
