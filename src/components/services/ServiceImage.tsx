import Image from "next/image";
import { isLocalPublicImage } from "@/lib/service-images";
import { cn } from "@/lib/utils";

type ServiceImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
};

export function ServiceImage({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority,
  fill,
}: ServiceImageProps) {
  const unoptimized = isLocalPublicImage(src);

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={unoptimized}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
      sizes={sizes}
      priority={priority}
      unoptimized={unoptimized}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
