"use client";

import { useRouter } from "next/navigation";
import type { Enquiry, EnquiryStatus } from "@/lib/types";
import { ENQUIRY_STATUSES } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

export function EnquiryDetail({ enquiry }: { enquiry: Enquiry }) {
  const router = useRouter();

  async function updateStatus(status: EnquiryStatus) {
    await fetch(`/api/enquiries/${enquiry.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  }

  async function deleteEnquiry() {
    if (!confirm("Delete this enquiry permanently?")) return;
    await fetch(`/api/enquiries/${enquiry.id}`, { method: "DELETE" });
    router.push("/admin/enquiries");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-sm text-slate-500">{enquiry.id}</p>
            <h2 className="mt-1 text-2xl font-bold text-[#0a1628]">
              {enquiry.customerName}
            </h2>
            <p className="text-sm text-slate-500">{formatDate(enquiry.createdAt)}</p>
          </div>
          <span className="rounded-full bg-[#0a1628] px-4 py-1.5 text-sm font-medium text-white">
            {enquiry.status}
          </span>
        </div>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase text-slate-400">Phone</dt>
            <dd className="mt-1">{enquiry.phone}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase text-slate-400">Email</dt>
            <dd className="mt-1">{enquiry.email || "—"}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase text-slate-400">Service</dt>
            <dd className="mt-1">{enquiry.service}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase text-slate-400">Quantity</dt>
            <dd className="mt-1">{enquiry.quantity || "—"}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase text-slate-400">Size</dt>
            <dd className="mt-1">{enquiry.size || "—"}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase text-slate-400">Material</dt>
            <dd className="mt-1">{enquiry.material || "—"}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold uppercase text-slate-400">Message</dt>
            <dd className="mt-1 whitespace-pre-wrap text-slate-700">
              {enquiry.message || "—"}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase text-slate-400">
              Uploaded Design
            </dt>
            <dd className="mt-1">
              {enquiry.uploadedFile ? (
                <a
                  href={enquiry.uploadedFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1e3a5f] underline"
                >
                  View file
                </a>
              ) : (
                "—"
              )}
            </dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-wrap gap-2">
        {ENQUIRY_STATUSES.filter((s) => s !== "Cancelled").map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => updateStatus(status)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Mark as {status}
          </button>
        ))}
        <button
          type="button"
          onClick={() => updateStatus("Cancelled")}
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700"
        >
          Cancelled
        </button>
        <button
          type="button"
          onClick={deleteEnquiry}
          className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white"
        >
          Delete Enquiry
        </button>
      </div>
    </div>
  );
}
