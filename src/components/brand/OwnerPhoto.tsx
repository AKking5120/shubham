import { BUSINESS, OWNER_PHOTO } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SIZE_CLASS = {
  xs: "h-10 w-10",
  sm: "h-16 w-16",
  md: "h-24 w-24",
  lg: "h-32 w-32",
  xl: "h-40 w-40",
} as const;

type OwnerPhotoProps = {
  size?: keyof typeof SIZE_CLASS;
  className?: string;
};

export function OwnerPhoto({ size = "md", className }: OwnerPhotoProps) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-full bg-slate-100 shadow-lg ring-4 ring-white/90",
        SIZE_CLASS[size],
        className,
      )}
    >
      <img
        src={OWNER_PHOTO}
        alt={`${BUSINESS.owner} — ${BUSINESS.name}`}
        width={320}
        height={320}
        className="h-full w-full object-cover object-center"
        decoding="async"
      />
    </span>
  );
}
