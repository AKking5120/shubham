"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ImageIcon,
  LayoutDashboard,
  LayoutTemplate,
  LogOut,
  Calculator,
  Package,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/enquiries", label: "Orders / Enquiries", icon: ShoppingBag },
  { href: "/admin/services", label: "Services", icon: Package },
  { href: "/admin/gallery", label: "Home Gallery", icon: ImageIcon },
  { href: "/admin/designs", label: "Design Templates", icon: LayoutTemplate },
  { href: "/admin/calculator", label: "Price Calculator", icon: Calculator },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/login", {
      method: "DELETE",
      credentials: "include",
    });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-full flex-col border-r border-slate-200 bg-[#0a1628] text-white lg:min-h-screen lg:w-64">
      <div className="border-b border-white/10 p-6">
        <BrandLogo size="md" href="/" />
        <p className="mt-3 text-xs uppercase tracking-widest text-slate-400">
          Admin panel
        </p>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
              pathname === href || (href !== "/admin" && pathname.startsWith(href))
                ? "bg-white/10 text-white"
                : "text-slate-300 hover:bg-white/5 hover:text-white",
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
      <button
        type="button"
        onClick={logout}
        className="m-4 flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-sm text-slate-300 hover:bg-white/5"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </aside>
  );
}
