import Link from "next/link";
import {
  Calculator,
  ImageIcon,
  LayoutTemplate,
  Package,
  Plus,
  Settings,
} from "lucide-react";
import { getEnquiries } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { PhoneLink } from "@/components/ui/ContactLinks";

export default async function AdminDashboardPage() {
  const enquiries = await getEnquiries();
  const total = enquiries.length;
  const newCount = enquiries.filter((e) => e.status === "New").length;
  const pending = enquiries.filter(
    (e) => e.status === "New" || e.status === "Contacted" || e.status === "In Progress",
  ).length;
  const completed = enquiries.filter((e) => e.status === "Completed").length;

  const cards = [
    { label: "Total Enquiries", value: total, color: "bg-[#0a1628]" },
    { label: "New Enquiries", value: newCount, color: "bg-amber-500" },
    { label: "Pending Enquiries", value: pending, color: "bg-[#1e3a5f]" },
    { label: "Completed Enquiries", value: completed, color: "bg-emerald-600" },
  ];

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-[#0a1628]">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-600">
        Overview of customer quotation and enquiry requests.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`rounded-2xl ${card.color} p-6 text-white shadow-lg`}
          >
            <p className="text-sm text-white/80">{card.label}</p>
            <p className="mt-2 text-3xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="font-semibold text-[#0a1628]">Recent Enquiries</h2>
          <Link
            href="/admin/enquiries"
            className="text-sm font-medium text-[#1e3a5f] hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-3 font-medium">ID</th>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Phone</th>
                <th className="px-6 py-3 font-medium">Service</th>
                <th className="px-6 py-3 font-medium">Qty</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.slice(0, 8).map((e) => (
                <tr key={e.id} className="border-t border-slate-100">
                  <td className="px-6 py-3">
                    <Link
                      href={`/admin/enquiries/${e.id}`}
                      className="font-medium text-[#1e3a5f] hover:underline"
                    >
                      {e.id}
                    </Link>
                  </td>
                  <td className="px-6 py-3">{e.customerName}</td>
                  <td className="px-6 py-3">
                    <PhoneLink phone={e.phone} className="text-[#1e3a5f]" />
                  </td>
                  <td className="px-6 py-3">{e.service}</td>
                  <td className="px-6 py-3 text-slate-600">{e.quantity || "—"}</td>
                  <td className="px-6 py-3">
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium">
                      {e.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-slate-500">
                    {formatDate(e.createdAt)}
                  </td>
                  <td className="px-6 py-3">
                    <Link
                      href={`/admin/enquiries/${e.id}`}
                      className="rounded-lg bg-[#1e3a5f] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0a1628]"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {enquiries.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-slate-500">
                    No enquiries yet. They will appear here when customers submit
                    the quote form.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-[#0a1628]">Quick Actions</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { id: "services", href: "/admin/services", label: "Manage Services", icon: Package },
            { id: "calculator", href: "/admin/calculator", label: "Price Calculator", icon: Calculator },
            { id: "designs", href: "/admin/designs", label: "Design Templates", icon: LayoutTemplate },
            { id: "gallery", href: "/admin/gallery", label: "Home Gallery", icon: ImageIcon },
            { id: "settings", href: "/admin/settings", label: "Site Content", icon: Settings },
            { id: "enquiries", href: "/admin/enquiries", label: "All Enquiries", icon: Plus },
          ].map(({ id, href, label, icon: Icon }) => (
            <Link
              key={id}
              href={href}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#1e3a5f] shadow-sm transition hover:border-[#1e3a5f]/30 hover:shadow-md"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
