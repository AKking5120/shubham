import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { FloatingActions } from "@/components/layout/FloatingActions";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileBottomBar />
      <div className="hidden md:block">
        <FloatingActions />
      </div>
    </div>
  );
}
