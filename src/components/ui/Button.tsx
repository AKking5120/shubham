import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "whatsapp" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-[#0a1628] hover:from-amber-500 hover:via-amber-500 hover:to-amber-700 shadow-lg shadow-amber-500/25 ring-1 ring-amber-400/30",
  secondary:
    "bg-gradient-to-r from-[#1e3a5f] to-[#0a1628] text-white hover:from-[#152a45] hover:to-[#0a1628] shadow-lg shadow-[#0a1628]/20",
  outline:
    "border-2 border-white/80 text-white hover:bg-white/10 backdrop-blur-sm",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#1ebe57]",
  ghost: "text-[#1e3a5f] hover:bg-slate-100",
};

type ButtonProps = {
  variant?: Variant;
  className?: string;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  className,
  href,
  external,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={cn(base, variants[variant], className)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cn(base, variants[variant], className)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
