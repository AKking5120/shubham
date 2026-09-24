import { getEnquiries } from "@/lib/store";
import type { CustomerSummary } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { EmailLink, PhoneLink } from "@/components/ui/ContactLinks";

export default async function AdminCustomersPage() {
  const enquiries = await getEnquiries();
  const map = new Map<string, CustomerSummary>();

  for (const e of enquiries) {
    const key = e.phone;
    const existing = map.get(key);
    if (existing) {
      existing.enquiryCount += 1;
      if (new Date(e.createdAt) > new Date(existing.lastEnquiry)) {
        existing.lastEnquiry = e.createdAt;
        existing.name = e.customerName;
        existing.email = e.email;
      }
    } else {
      map.set(key, {
        name: e.customerName,
        phone: e.phone,
        email: e.email,
        enquiryCount: 1,
        lastEnquiry: e.createdAt,
      });
    }
  }

  const customers = Array.from(map.values()).sort(
    (a, b) => new Date(b.lastEnquiry).getTime() - new Date(a.lastEnquiry).getTime(),
  );

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-[#0a1628]">Customers</h1>
      <p className="mt-1 text-sm text-slate-600">
        Customers derived from enquiry submissions.
      </p>
      <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Enquiries</th>
              <th className="px-4 py-3">Last Enquiry</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.phone} className="border-t border-slate-100">
                <td className="px-4 py-3">{c.name}</td>
                <td className="px-4 py-3">
                  <PhoneLink phone={c.phone} className="text-[#1e3a5f]" />
                </td>
                <td className="px-4 py-3">
                  {c.email ? (
                    <EmailLink email={c.email} className="text-[#1e3a5f]" />
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-3">{c.enquiryCount}</td>
                <td className="px-4 py-3 text-slate-500">
                  {formatDate(c.lastEnquiry)}
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  No customers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
