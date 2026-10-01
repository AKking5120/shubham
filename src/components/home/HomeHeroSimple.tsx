import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SiteContent } from "@/lib/site-content";
import { HOME_HERO_SLIDES, whatsappLink } from "@/lib/constants";
import { HomeMarqueeStrip } from "@/components/home/HomeMarqueeStrip";

type Props = Pick<SiteContent, "hero">;

export function HomeHeroSimple({ hero }: Props) {
  const bgRaw = HOME_HERO_SLIDES[0]?.src ?? "/banners/home-slide-1.jpg";
  const bg = bgRaw.split("?")[0];

  return (
    <section className="relative border-b border-slate-800">
      <HomeMarqueeStrip />

      <div className="relative min-h-[min(92vh,820px)] overflow-hidden">
        <Image
          src={bg}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-900/78 to-slate-900/55"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(34,211,238,0.12),transparent_55%)]"
          aria-hidden
        />

        <div className="relative mx-auto flex min-h-[min(92vh,820px)] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
          <p
            className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/40 bg-slate-900/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-100 backdrop-blur-sm"
          >
            <span className="text-cyan-400" aria-hidden>◆</span>
            Premium printing solutions
          </p>

          <h1
            className="mt-8 max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[3.35rem]"
          >
            {hero.title}{" "}
            <span
              className="bg-gradient-to-r from-cyan-300 via-sky-400 to-cyan-400 bg-clip-text text-transparent"
            >
              {hero.highlight}
            </span>{" "}
            {hero.trailing ?? ""}
          </h1>

          <p className="mt-6 max-w-xl text-base text-slate-200 sm:text-lg">
            {hero.description}
          </p>

          <p className="mt-4 text-sm font-medium text-slate-300">
            Fast delivery <span className="text-cyan-400/80">•</span> Premium
            quality <span className="text-cyan-400/80">•</span> WhatsApp quotes
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:from-cyan-300 hover:to-sky-400"
            >
              Get a quote
              <ArrowRight
                className="h-4 w-4 transition group-hover:translate-x-0.5"
              />
            </a>
            <Link
              href="/shop"
              className="inline-flex items-center rounded-xl border-2 border-cyan-400/70 bg-transparent px-7 py-3.5 text-sm font-bold text-white transition hover:bg-cyan-400/10"
            >
              View products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
