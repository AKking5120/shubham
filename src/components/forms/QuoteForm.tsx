"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { telLink, whatsappLink, BUSINESS } from "@/lib/constants";

const SERVICE_OPTIONS = [
  "Bill Book",
  "Challan Book",
  "Letter Pad",
  "Visiting Card / Tag",
  "Sticker / Banner",
  "Wedding Card",
  "Bulk Copy & Printout",
  "Other",
];

type QuoteFormProps = {
  defaultService?: string;
  compact?: boolean;
  showExtendedFields?: boolean;
};

export function QuoteForm({
  defaultService = "",
  compact = false,
  showExtendedFields = false,
}: QuoteFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [service, setService] = useState(
    SERVICE_OPTIONS.includes(defaultService) ? defaultService : "",
  );

  const showOtherService = service === "Other";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = e.currentTarget;
    const fd = new FormData(form);

    const selected = String(fd.get("service") ?? "");
    if (selected === "Other") {
      const other = String(fd.get("otherService") ?? "").trim();
      if (!other) {
        setError("Please specify which printing service you need.");
        setLoading(false);
        return;
      }
      fd.set("service", `Other — ${other}`);
    }

    try {
      const res = await fetch("/api/enquiries", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setSuccess(true);
      form.reset();
      setService("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <h3 className="text-xl font-bold text-[#0a1628]">Thank you!</h3>
        <p className="mt-2 text-slate-600">
          Your requirement has been received. We will contact you soon.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href={whatsappLink()} external variant="whatsapp">
            WhatsApp Us
          </Button>
          <Button href={telLink(BUSINESS.phones[0])} variant="secondary">
            Call Now
          </Button>
        </div>
        <button
          type="button"
          className="mt-4 text-sm text-[#1e3a5f] underline"
          onClick={() => setSuccess(false)}
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm outline-none transition focus:border-amber-500/60 focus:bg-white focus:ring-2 focus:ring-amber-400/25";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className={compact ? "grid gap-4 sm:grid-cols-2" : "grid gap-4 md:grid-cols-2"}>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Name *
          </label>
          <input name="customerName" required className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Phone Number *
          </label>
          <input
            name="phone"
            type="tel"
            required
            pattern="[0-9+\s-]{10,}"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input name="email" type="email" className={inputClass} />
        </div>
        <div className={showOtherService ? "md:col-span-2" : ""}>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Select Service
          </label>
          <select
            name="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={inputClass}
          >
            <option value="">Choose a service</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {showOtherService && (
            <div className="mt-3">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Please specify your requirement *
              </label>
              <input
                name="otherService"
                required
                className={inputClass}
                placeholder="e.g. Flex printing, rubber stamp, catalogue..."
              />
            </div>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Quantity
          </label>
          <input name="quantity" className={inputClass} placeholder="e.g. 100" />
        </div>
        {showExtendedFields && (
          <>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Size
              </label>
              <input name="size" className={inputClass} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Paper / Material
              </label>
              <input name="material" className={inputClass} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Color Requirement
              </label>
              <input name="colorRequirement" className={inputClass} />
            </div>
          </>
        )}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Message / Requirements
        </label>
        <textarea
          name="message"
          rows={4}
          className={inputClass}
          placeholder="Share size, paper type, delivery timeline, or other details..."
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Upload Design (optional)
        </label>
        <input
          name="uploadedFile"
          type="file"
          accept="image/*,.pdf,.ai,.psd"
          className="w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-[#0a1628] file:px-4 file:py-2 file:text-white"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full sm:w-auto">
        {loading ? "Sending..." : showExtendedFields ? "Send Quote Request" : "Request a Quote"}
      </Button>
    </form>
  );
}
