import { BUSINESS } from "@/lib/constants";
import type { Enquiry } from "@/lib/types";

export function isEnquiryEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

function siteBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string | null | undefined): string {
  const v = (value ?? "").trim();
  if (!v) return "";
  return `<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;width:140px;">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:14px;">${escapeHtml(v)}</td></tr>`;
}

function buildEnquiryEmailHtml(enquiry: Enquiry): string {
  const adminUrl = `${siteBaseUrl()}/admin/enquiries/${encodeURIComponent(enquiry.id)}`;
  const rows = [
    row("Enquiry ID", enquiry.id),
    row("Name", enquiry.customerName),
    row("Phone", enquiry.phone),
    row("Email", enquiry.email),
    row("Service", enquiry.service),
    row("Quantity", enquiry.quantity),
    row("Size", enquiry.size),
    row("Material", enquiry.material),
    row("Color", enquiry.colorRequirement),
    row("Message", enquiry.message),
    row("Design file", enquiry.uploadedFile),
  ].join("");

  return `
<!DOCTYPE html>
<html>
<body style="margin:0;font-family:system-ui,sans-serif;background:#f1f5f9;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
    <div style="background:#0a1628;color:#fff;padding:20px 24px;">
      <p style="margin:0;font-size:12px;opacity:0.8;text-transform:uppercase;letter-spacing:0.05em;">New quote request</p>
      <h1 style="margin:8px 0 0;font-size:20px;">${escapeHtml(BUSINESS.name)}</h1>
    </div>
    <table style="width:100%;border-collapse:collapse;">${rows}</table>
    <div style="padding:20px 24px;background:#f8fafc;">
      <a href="${escapeHtml(adminUrl)}" style="display:inline-block;background:#1e3a5f;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:600;font-size:14px;">View in admin</a>
    </div>
  </div>
</body>
</html>`;
}

/** Sends admin notification via Resend. No-op if RESEND_API_KEY is unset. */
export async function sendNewEnquiryEmail(enquiry: Enquiry): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return;

  const to =
    process.env.ENQUIRY_NOTIFY_EMAIL?.trim() || BUSINESS.email;
  const from =
    process.env.EMAIL_FROM?.trim() ||
    `${BUSINESS.name} <onboarding@resend.dev>`;

  const subject = `New enquiry: ${enquiry.service} — ${enquiry.customerName}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html: buildEnquiryEmailHtml(enquiry),
      reply_to: enquiry.email?.trim() || undefined,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[enquiry-email] Resend error:", res.status, text);
    throw new Error(`Email failed (${res.status})`);
  }
}
