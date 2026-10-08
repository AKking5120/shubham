import Image from "next/image";
import Link from "next/link";

type Props = {
  href: string;
  name: string;
  image: string;
};

export function SubcategoryTile({ href, name, image }: Props) {
  return (
    <Link href={href} className="group block text-center">
      <div className="relative mx-auto aspect-square max-w-[250px] overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition group-hover:scale-105"
          sizes="250px"
        />
      </div>
      <p className="mt-4 text-base font-semibold text-slate-800 group-hover:text-brand-blue">
        {name}
      </p>
    </Link>
  );
}
