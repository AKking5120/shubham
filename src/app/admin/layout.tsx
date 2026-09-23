import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function AdminLayout({
  children,
}: LayoutProps<"/admin">) {
  const authed = await isAdminAuthenticated();

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      {authed ? <AdminSidebar /> : null}
      <div className="flex-1">{children}</div>
    </div>
  );
}
