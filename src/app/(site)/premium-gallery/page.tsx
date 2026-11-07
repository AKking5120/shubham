import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/constants";

export const metadata: Metadata = { title: "Premium Product Gallery | Shubham Prints" };

const groups = [
  { slug: "stickers-labels", title: "Sticker & Labels", image: "/gallery/sticker/01.jpg",
    names: ["Product Label","Barcode Sticker","QR Sticker","Round Sticker","Die Cut Sticker","Vinyl Sticker","Transparent Sticker","Hologram Sticker","Warranty Sticker","Seal Sticker"] },
  { slug: "flex-printing", title: "Flex Printing", image: "/banners/home-slide-1.jpg",
    names: ["Flex Banner","Vinyl Printing","One Way Vision","Backlit Flex","Standee","Roll Up Banner","Hoarding Print","Glow Sign Flex","Event Backdrop","Cutout Standee"] },
  { slug: "marketing-material", title: "Marketing Material", image: "/banners/home-slide-2.jpg",
    names: ["Pamphlet","Brochure","Catalogue","Flyer","Leaflet","Poster","Menu Card","Table Tent","Danglers","A3/A4 Prints"] },
  { slug: "garment-tags", title: "Garment Tags", image: "/gallery/id-card/01.jpg",
    names: ["Price Tag","Hang Tag","Care Label","Size Tag","Brand Tag","Barcode Tag","Swing Tag","RFID Tag","Clothing Label","Neck Label"] },
];

export default function PremiumGallery() {
 return <div className="min-h-screen bg-[#f4f8ff] px-4 py-12 text-[#082e63]">
   <div className="mx-auto max-w-7xl">
     <Link href="/" className="font-bold text-blue-700">← Back to Homepage</Link>
     <h1 className="mb-3 mt-6 text-3xl font-black sm:text-4xl">Premium Product Gallery</h1>
     <p className="mb-2 text-slate-600">Browse our printing options and request your custom quote on WhatsApp.</p>
     <p className="mb-8 text-xs text-slate-500">Category preview images are illustrative; final materials and finishes depend on the order.</p>
     {groups.map(group => <section key={group.slug} id={group.slug} className="mb-12 scroll-mt-24">
       <h2 className="mb-4 text-2xl font-bold">{group.title}</h2>
       <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
         {group.names.map((name,i) => <article key={name} className="rounded-xl border border-blue-100 bg-white p-3 shadow-sm">
           <div className="relative aspect-square overflow-hidden rounded-lg bg-blue-50">
             <Image src={group.image} alt={group.title + " printed products preview"} fill className="object-cover" sizes="(max-width:640px) 50vw, 20vw" />
             <span className="absolute bottom-2 left-2 rounded bg-white/95 px-2 py-1 text-[10px] font-bold text-[#073a7d]">Option {i+1}</span>
           </div>
           <h3 className="mt-2 min-h-10 text-sm font-semibold">{name}</h3>
           <a href={whatsappLink("Hello Shubham Prints, please quote for " + name)} className="mt-2 flex items-center justify-center gap-1 rounded-md bg-[#073a7d] px-2 py-2 text-xs font-bold text-white"><MessageCircle size={14}/> Get Quote</a>
         </article>)}
       </div>
     </section>)}
   </div>
 </div>;
}
