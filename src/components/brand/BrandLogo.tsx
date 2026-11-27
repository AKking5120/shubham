import Image from "next/image";
import Link from "next/link";
import { BRAND_LOGO, BUSINESS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const brandSizes = {
  sm: {
    logo: "size-10",
    sizes: "40px",
    name: "text-sm",
    subtitle: "text-[10px]",
  },
  md: {
    logo: "size-12",
    sizes: "48px",
    name: "text-base",
    subtitle: "text-[11px]",
  },
  nav: {
    logo: "size-10 sm:size-16",
    sizes: "(min-width: 640px) 64px, 40px",
    name: "text-base sm:text-2xl",
    subtitle: "text-[10px] sm:text-base",
  },
} as const;

type BrandLogoProps = {
  size?: keyof typeof brandSizes;
  href?: string;
  tone?: "light" | "dark";
  className?: string;
};

export function BrandLogo({
  size = "md",
  href = "/",
  tone = "light",
  className,
}: BrandLogoProps) {
  const styles = brandSizes[size];

  return (
    <Link
      href={href}
      aria-label={`${BUSINESS.name} home`}
      className={cn(
        "inline-flex shrink-0 items-center gap-2.5 text-left sm:gap-3",
        tone === "dark" ? "text-white" : "text-[#082e67]",
        className,
      )}
    >
      <Image
        src={BRAND_LOGO}
        alt=""
        width={64}
        height={64}
        sizes={styles.sizes}
        className={cn("shrink-0 rounded-full object-contain", styles.logo)}
      />
      <span className="whitespace-nowrap">
        <span className={cn("block font-black leading-tight tracking-tight", styles.name)}>
          SHUBHAM PRINTS
        </span>
        <span className={cn("block font-medium leading-tight tracking-[0.2em]", styles.subtitle)}>
          &amp; STATIONERS
        </span>
      </span>
    </Link>
  );
}
