import { SiteChrome } from "@/components/layout/SiteChrome";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { SiteProviders } from "@/components/providers/SiteProviders";
import { getSiteContent } from "@/lib/store";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const site = await getSiteContent();
  const headerSite = {
    announcement: site.announcement,
    business: site.business,
    contact: site.contact,
  };

  return (
    <SiteProviders>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
        <SiteChrome position="top" site={headerSite} />
        <main className="flex-1">{children}</main>
        <SiteChrome position="bottom" site={headerSite} />
        <MobileBottomBar />
        <FloatingActions />
      </div>
    </SiteProviders>
  );
}
