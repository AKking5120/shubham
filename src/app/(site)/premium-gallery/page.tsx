import type { Metadata } from "next";
import { BackLink } from "@/components/ui/BackLink";

export const metadata: Metadata = { title: "Flex Printing" };

export default function FlexPrintingPage() {
  return (
    <section
      id="flex-printing"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-10 sm:px-6 lg:px-8"
    >
      <BackLink href="/" label="Back to Home" />
      <h1 className="mt-5 text-3xl font-black text-slate-900">Flex Printing</h1>
    </section>
  );
}
