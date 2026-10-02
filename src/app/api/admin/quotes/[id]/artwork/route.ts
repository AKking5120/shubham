import { createReadStream } from "fs";
import { promises as fs } from "fs";
import { Readable } from "stream";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getQuoteInquiry } from "@/lib/quote-store";
import {
  artworkContentDisposition,
  resolveLocalArtwork,
} from "@/lib/artwork-storage";
import { signedArtworkUrl } from "@/lib/cloudinary";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Ctx) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const quote = await getQuoteInquiry(id);
  const file = quote?.artwork;
  if (!quote || !file) {
    return NextResponse.json({ error: "No artwork on this quote." }, { status: 404 });
  }

  if (file.storage === "cloudinary") {
    const url = signedArtworkUrl({
      publicId: file.key,
      resourceType: file.resourceType,
    });
    return NextResponse.redirect(url);
  }

  const full = resolveLocalArtwork(file);
  if (!full) {
    return NextResponse.json({ error: "Artwork file is missing." }, { status: 404 });
  }
  try {
    await fs.access(full);
  } catch {
    return NextResponse.json({ error: "Artwork file is missing." }, { status: 404 });
  }

  const stream = createReadStream(full);
  const web = Readable.toWeb(stream) as ReadableStream;
  return new NextResponse(web, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": artworkContentDisposition(file),
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
