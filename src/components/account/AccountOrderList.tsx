import Link from "next/link";
import { ORDER_STATUS_LABELS } from "@/lib/constants";
import type { Order, OrderStatus } from "@/lib/types";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function statusLabel(status: string) {
  if (status in ORDER_STATUS_LABELS) {
    return ORDER_STATUS_LABELS[status as OrderStatus];
  }
  return status;
}

export function AccountOrderList({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-600">You have not placed any orders yet.</p>
        <Link
          href="/services"
          className="mt-4 inline-flex text-sm font-semibold text-brand-blue hover:underline"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {orders.map((order) => (
        <li
          key={order.id}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-slate-900">
                Order #{order.orderNumber}
              </p>
              <p className="text-sm text-slate-500">{formatDate(order.createdAt)}</p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand-blue">
              {statusLabel(order.status)}
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            {order.items.length} item{order.items.length === 1 ? "" : "s"} · ₹
            {order.total}
            {order.paymentMethod === "cod" ? " · COD" : " · Paid online"}
          </p>
          <Link
            href={`/track-order?no=${encodeURIComponent(order.orderNumber)}&phone=${encodeURIComponent(order.phone)}`}
            className="mt-3 inline-block text-sm font-semibold text-brand-blue hover:underline"
          >
            View status
          </Link>
        </li>
      ))}
    </ul>
  );
}
