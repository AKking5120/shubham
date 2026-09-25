import Image from "next/image";
import Link from "next/link";
import { BRAND_LOGO, BUSINESS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SIZE_CLASS = {
  xs: "h-9 w-9",
  sm: "h-11 w-11",
  md: "h-14 w-14",
  lg: "h-[4.5rem] w-[4.5rem]",
  xl: "h-24 w-24",
  hero: "h-28 w-28 sm:h-32 sm:w-32",
} as const;

type BrandLogoProps = {
  size?: keyof typeof SIZE_CLASS;
  className?: string;
  href?: string | null;
  priority?: boolean;
};

export function BrandLogo({
  size = "md",
  className,
  href = "/",
  priority,
}: BrandLogoProps) {
  const image = (
    <span
      className={cn(
        "relative inline-block shrink-0 overflow-hidden rounded-full bg-white shadow-md ring-2 ring-white/80",
        SIZE_CLASS[size],
        className,
      )}
    >
      <Image
        src={BRAND_LOGO}
        alt={`${BUSINESS.name} — ${BUSINESS.slogan}`}
        fill
        sizes="(max-width: 640px) 56px, 128px"
        priority={priority}
        unoptimized
        className="object-cover"
      />
    </span>
  );

  if (href === null) {
    return image;
  }

  return (
    <Link
      href={href}
      className="inline-block shrink-0 transition hover:opacity-95"
      aria-label={`${BUSINESS.name} home`}
    >
      {image}
    </Link>
  );
}
