import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { ORDER_STATUSES } from "@/lib/constants";
import { updateOrder } from "@/lib/store";
import type { OrderStatus, PaymentStatus } from "@/lib/types";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();

  const patch: {
    status?: OrderStatus;
    paymentStatus?: PaymentStatus;
  } = {};

  if (body.status && ORDER_STATUSES.includes(body.status)) {
    patch.status = body.status as OrderStatus;
  }
  if (
    body.paymentStatus &&
    ["pending", "paid", "failed", "not_required"].includes(body.paymentStatus)
  ) {
    patch.paymentStatus = body.paymentStatus as PaymentStatus;
  }

  const order = await updateOrder(id, patch);
  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  return NextResponse.json({ order });
}
