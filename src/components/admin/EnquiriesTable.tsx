"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Enquiry } from "@/lib/types";
import { ENQUIRY_STATUSES } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { PhoneLink } from "@/components/ui/ContactLinks";

export function EnquiriesTable({ enquiries }: { enquiries: Enquiry[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [service, setService] = useState("All");
  const [status, setStatus] = useState("All");
  const [dateFrom, setDateFrom] = useState("");

  const services = useMemo(() => {
    const set = new Set(enquiries.map((e) => e.service).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [enquiries]);

  const filtered = useMemo(() => {
    return enquiries.filter((e) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        e.customerName.toLowerCase().includes(q) ||
        e.phone.includes(q) ||
        e.id.toLowerCase().includes(q);
      const matchesService = service === "All" || e.service === service;
      const matchesStatus = status === "All" || e.status === status;
      const matchesDate =
        !dateFrom || new Date(e.createdAt) >= new Date(dateFrom);
      return matchesSearch && matchesService && matchesStatus && matchesDate;
    });
  }, [enquiries, search, service, status, dateFrom]);

  async function remove(id: string) {
    if (!confirm("Delete this enquiry permanently?")) return;
    const res = await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-4">
        <input
          placeholder="Search name, phone, ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm"
        />
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm"
        >
          {services.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm"
        >
          <option value="All">All statuses</option>
          {ENQUIRY_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Customer Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-mono text-xs">{e.id}</td>
                <td className="px-4 py-3">{e.customerName}</td>
                <td className="px-4 py-3">
                  <PhoneLink phone={e.phone} className="text-[#1e3a5f]" />
                </td>
                <td className="px-4 py-3">{e.service}</td>
                <td className="px-4 py-3">{e.quantity || "—"}</td>
                <td className="px-4 py-3 text-slate-500">{formatDate(e.createdAt)}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium">
                    {e.status}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <Link
                    href={`/admin/enquiries/${e.id}`}
                    className="font-medium text-[#1e3a5f] hover:underline"
                  >
                    View
                  </Link>
                  <button
                    type="button"
                    onClick={() => remove(e.id)}
                    className="text-red-600 hover:underline text-xs font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                  No enquiries match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
