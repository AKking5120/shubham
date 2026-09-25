import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { getSiteContent } from "@/lib/store";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const siteContent = await getSiteContent();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header
        site={{
          announcement: siteContent.announcement,
          business: siteContent.business,
          contact: siteContent.contact,
        }}
      />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileBottomBar />
      <div className="hidden md:block">
        <FloatingActions />
      </div>
    </div>
  );
}
