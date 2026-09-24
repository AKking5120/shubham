import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-[#0a1628] py-16 text-white md:py-24",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-mesh-hero opacity-100" />
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.35]" />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
        {eyebrow && (
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            {eyebrow}
          </p>
        )}
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
