"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUSES,
} from "@/lib/constants";
import type { Order, OrderStatus } from "@/lib/types";

export function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      if (res.ok) {
        setOrders(await res.json());
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(id: string, status: OrderStatus) {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const { order } = await res.json();
      setOrders((prev) => prev.map((o) => (o.id === id ? order : o)));
    }
  }

  if (loading) {
    return <p className="text-sm text-slate-600">Loading orders…</p>;
  }

  if (orders.length === 0) {
    return (
      <p className="text-sm text-slate-600">
        No online orders yet. Run{" "}
        <code className="text-xs bg-slate-100 px-1 rounded">orders_only.sql</code>{" "}
        in Supabase if the table is missing.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Order</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-4 py-3">Pay</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t border-slate-100">
              <td className="px-4 py-3 font-mono text-xs">{o.orderNumber}</td>
              <td className="px-4 py-3">
                <div className="font-medium">{o.customerName}</div>
                <div className="text-xs text-slate-500">{o.phone}</div>
              </td>
              <td className="px-4 py-3">₹{o.total}</td>
              <td className="px-4 py-3 uppercase text-xs">
                {o.paymentMethod}
              </td>
              <td className="px-4 py-3">
                <select
                  value={o.status}
                  onChange={(e) =>
                    updateStatus(o.id, e.target.value as OrderStatus)
                  }
                  className="rounded-lg border border-slate-200 px-2 py-1 text-xs"
                >
                  {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {ORDER_STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-4 py-2 text-xs text-slate-500 border-t border-slate-100">
        Customers track at{" "}
        <Link href="/track-order" className="text-brand-blue underline">
          /track-order
        </Link>
      </p>
    </div>
  );
}
