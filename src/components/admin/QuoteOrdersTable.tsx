"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { QUOTE_STATUSES, QUOTE_STATUS_LABELS, type QuoteInquiry } from "@/lib/quote-workflow";
import { formatDate } from "@/lib/utils";
import { PhoneLink } from "@/components/ui/ContactLinks";

export function QuoteOrdersTable({ quotes }: { quotes: QuoteInquiry[] }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return quotes.filter((item) => {
      const matchesStatus = status === "All" || item.status === status;
      const matchesSearch =
        !q ||
        item.customerName.toLowerCase().includes(q) ||
        item.phone.includes(q) ||
        item.id.toLowerCase().includes(q) ||
        (item.orderId ?? "").toLowerCase().includes(q) ||
        item.product.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [quotes, search, status]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <input
          placeholder="Search name, mobile, inquiry ID, order ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm"
        >
          <option value="All">All statuses</option>
          {QUOTE_STATUSES.map((s) => (
            <option key={s} value={s}>
              {QUOTE_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[880px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Inquiry</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Order ID</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-mono text-xs">{item.id}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-[#0a1628]">{item.customerName}</div>
                  <PhoneLink phone={item.phone} className="text-xs text-[#1e3a5f]" />
                </td>
                <td className="px-4 py-3">
                  <div>{item.product}</div>
                  <div className="text-xs text-slate-500">{item.productCategory}</div>
                </td>
                <td className="px-4 py-3 font-mono text-xs">{item.orderId ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium">
                    {QUOTE_STATUS_LABELS[item.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500">{formatDate(item.createdAt)}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/quotes/${item.id}`}
                    className="rounded-lg bg-[#1e3a5f] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0a1628]"
                  >
                    Open
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                  No quote requests match this search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
