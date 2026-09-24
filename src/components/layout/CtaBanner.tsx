import { Button } from "@/components/ui/Button";

export function CtaBanner({
  title = "Your Printing Our Priority",
  buttonHref = "/contact#quote",
  buttonLabel = "Get a Quote",
}: {
  title?: string;
  buttonHref?: string;
  buttonLabel?: string;
}) {
  return (
    <section className="bg-gradient-to-r from-[#1e3a5f] via-[#0a1628] to-[#1e3a5f] py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:text-left lg:px-6">
        <p className="text-2xl font-bold tracking-tight md:text-3xl">{title}</p>
        <Button href={buttonHref} variant="light" className="shrink-0">
          {buttonLabel}
        </Button>
      </div>
    </section>
  );
}
