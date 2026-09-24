import Image from "next/image";
import Link from "next/link";
import { BRAND_LOGO, BUSINESS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SIZE_PX = {
  xs: 36,
  sm: 44,
  md: 52,
  lg: 72,
  xl: 96,
  hero: 112,
} as const;

type BrandLogoProps = {
  size?: keyof typeof SIZE_PX;
  className?: string;
  /** Set to null to render without a link wrapper */
  href?: string | null;
  priority?: boolean;
};

export function BrandLogo({
  size = "md",
  className,
  href = "/",
  priority,
}: BrandLogoProps) {
  const px = SIZE_PX[size];
  const image = (
    <Image
      src={BRAND_LOGO}
      alt={`${BUSINESS.name} — ${BUSINESS.slogan}`}
      width={px}
      height={px}
      priority={priority}
      className={cn(
        "rounded-full object-cover shadow-lg ring-2 ring-white/25",
        className,
      )}
    />
  );

  if (href === null) {
    return image;
  }

  return (
    <Link href={href} className="inline-block shrink-0 transition hover:opacity-95">
      {image}
    </Link>
  );
}
