import Image from "next/image";
import Link from "next/link";

type Props = {
  href: string;
  name: string;
  image?: string;
};

export function SubcategoryTile({ href, name, image }: Props) {
  if (!image) {
    return (
      <Link
        href={href}
        className="flex min-h-28 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 text-center font-semibold text-slate-800 hover:border-brand-blue hover:text-brand-blue"
      >
        {name}
      </Link>
    );
  }

  return (
    <Link href={href} className="group block text-center">
      <div className="relative mx-auto aspect-square max-w-[250px] overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain"
          sizes="250px"
        />
      </div>
      <p className="mt-4 text-base font-semibold text-slate-800 group-hover:text-brand-blue">
        {name}
      </p>
    </Link>
  );
}
