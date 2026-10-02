"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUSES,
} from "@/lib/constants";
import type { Order } from "@/lib/types";
import type { PublicTrackedOrder } from "@/lib/quote-workflow";
import { formatDate } from "@/lib/utils";

const STATUS_STEPS = ORDER_STATUSES.filter((s) => s !== "cancelled");

export function TrackOrderForm() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState(
    () => searchParams.get("no") ?? searchParams.get("order") ?? "",
  );
  const [phone, setPhone] = useState(() => searchParams.get("phone") ?? "");
  const [needsPhone, setNeedsPhone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [quote, setQuote] = useState<PublicTrackedOrder | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOrder(null);
    setQuote(null);
    setLoading(true);
    try {
      const params = new URLSearchParams({
        orderNumber: orderNumber.trim(),
      });
      if (phone.trim()) params.set("phone", phone.trim());
      const res = await fetch(`/api/orders/track?${params}`);
      const data = await res.json();
      if (!res.ok) {
        setNeedsPhone(Boolean(data.needsPhone));
        setError(data.error ?? "Order not found.");
        return;
      }
      setNeedsPhone(false);
      if (data.kind === "quote") setQuote(data.quote as PublicTrackedOrder);
      else setOrder(data.order as Order);
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

  const quoteOrder = /^ORD-\d{4}-\d{5}$/i.test(orderNumber.trim());

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <form
        onSubmit={onSubmit}
        className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <label className="block text-sm font-medium">
          Order ID
          <input
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="ORD-2026-00001"
            required
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          />
        </label>
        {!quoteOrder && (
          <label className="block text-sm font-medium">
            Mobile number
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="tel"
              required={needsPhone}
              placeholder="Required for checkout orders"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
        )}
        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-brand-blue py-2.5 text-sm font-bold uppercase tracking-wide text-white"
        >
          {loading ? "Checking…" : "Track order"}
        </button>
        <p className="text-xs text-slate-500">
          Confirmed print orders use an ID like ORD-2026-00001. Online checkout
          orders still need the mobile number used at checkout.
        </p>
      </form>

      {quote && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-600">Order ID</p>
          <p className="text-xl font-bold text-slate-900">{quote.orderId}</p>
          <p className="mt-3 text-sm">
            <span className="text-slate-500">Product: </span>
            {quote.product}
          </p>
          <p className="text-sm text-slate-600">
            {quote.category} · {quote.productCategory}
          </p>
          <p className="mt-2 text-sm">
            Status:{" "}
            <span className="font-semibold text-brand-blue">{quote.statusLabel}</span>
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Order date: {formatDate(quote.orderDate)}
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-xs uppercase text-slate-400">Size</dt>
              <dd>{quote.size}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-slate-400">Quantity</dt>
              <dd>{quote.quantity}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-slate-400">Pages / set</dt>
              <dd>{quote.pagesSet}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-slate-400">Color</dt>
              <dd>{quote.printingColor}</dd>
            </div>
          </dl>
          {quote.latestUpdate && (
            <p className="mt-4 text-sm text-slate-700">
              Latest update: {quote.latestUpdate.label} · {formatDate(quote.latestUpdate.at)}
            </p>
          )}
          {quote.expectedCompletion && (
            <p className="mt-1 text-sm text-slate-700">
              Expected completion: {quote.expectedCompletion}
            </p>
          )}
          {quote.cancelled ? (
            <p className="mt-4 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">
              This order was cancelled.
            </p>
          ) : (
            <ol className="mt-6 space-y-2">
              {quote.timeline.map((step) => (
                <li
                  key={step.key}
                  className={`flex items-center gap-2 text-sm ${
                    step.state === "upcoming"
                      ? "text-slate-400"
                      : step.state === "current"
                        ? "font-semibold text-brand-blue"
                        : "font-medium text-emerald-700"
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      step.state === "current"
                        ? "bg-brand-blue ring-4 ring-blue-100"
                        : step.state === "done"
                          ? "bg-emerald-500"
                          : "bg-slate-200"
                    }`}
                  />
                  {step.label}
                </li>
              ))}
            </ol>
          )}
        </div>
      )}

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
          <p className="mt-1 text-sm text-slate-600">
            Payment: {order.paymentMethod === "cod" ? "COD" : "Online"} —{" "}
            {order.paymentStatus}
          </p>
          <p className="mt-2 text-sm font-medium">Total: ₹{order.total}</p>

          {order.status !== "cancelled" && (
            <ol className="mt-6 space-y-2">
              {STATUS_STEPS.map((step, i) => (
                <li
                  key={step}
                  className={`flex items-center gap-2 text-sm ${
                    i <= stepIndex ? "font-medium text-emerald-700" : "text-slate-400"
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
