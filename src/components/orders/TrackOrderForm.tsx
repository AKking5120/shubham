"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUSES,
} from "@/lib/constants";
import type { Order } from "@/lib/types";

const STATUS_STEPS = ORDER_STATUSES.filter((s) => s !== "cancelled");

export function TrackOrderForm() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const no = searchParams.get("no") ?? searchParams.get("order");
    const ph = searchParams.get("phone");
    if (no) setOrderNumber(no);
    if (ph) setPhone(ph);
  }, [searchParams]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOrder(null);
    setLoading(true);
    try {
      const params = new URLSearchParams({
        orderNumber: orderNumber.trim(),
        phone: phone.trim(),
      });
      const res = await fetch(`/api/orders/track?${params}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Order not found.");
        return;
      }
      setOrder(data.order as Order);
    } catch {
      setError("Could not check status. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const stepIndex = order
    ? STATUS_STEPS.indexOf(
        order.status === "cancelled" ? "placed" : order.status,
      )
    : -1;

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3"
      >
        <label className="block text-sm font-medium">
          Order ID
          <input
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="PS-20260929-ABCD"
            required
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          />
        </label>
        <label className="block text-sm font-medium">
          Phone number (used at checkout)
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            inputMode="tel"
            required
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          />
        </label>
        {error && (
          <p className="text-sm text-red-700 bg-red-50 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-brand-blue py-2.5 text-sm font-bold text-white"
        >
          {loading ? "Checking…" : "Track order"}
        </button>
      </form>

      {order && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-600">Order</p>
          <p className="text-xl font-bold text-slate-900">{order.orderNumber}</p>
          <p className="mt-2 text-sm">
            Status:{" "}
            <span className="font-semibold text-brand-blue">
              {ORDER_STATUS_LABELS[order.status]}
            </span>
          </p>
          <p className="text-sm text-slate-600 mt-1">
            Payment: {order.paymentMethod === "cod" ? "COD" : "Online"} —{" "}
            {order.paymentStatus}
          </p>
          <p className="text-sm font-medium mt-2">Total: ₹{order.total}</p>

          {order.status !== "cancelled" && (
            <ol className="mt-6 space-y-2">
              {STATUS_STEPS.map((step, i) => (
                <li
                  key={step}
                  className={`flex items-center gap-2 text-sm ${
                    i <= stepIndex ? "text-emerald-700 font-medium" : "text-slate-400"
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      i <= stepIndex ? "bg-emerald-500" : "bg-slate-200"
                    }`}
                  />
                  {ORDER_STATUS_LABELS[step]}
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
}
