import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { SiteProviders } from "@/components/providers/SiteProviders";
import { getSiteContent } from "@/lib/store";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const siteContent = await getSiteContent();

  return (
    <SiteProviders>
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
      <FloatingActions />
    </div>
    </SiteProviders>
  );
}
