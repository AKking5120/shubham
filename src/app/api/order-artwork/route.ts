import { NextResponse } from "next/server";
import { saveUploadedFile } from "@/lib/uploads";

const MAX_BYTES = 12 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "File too large (max 12 MB)." },
        { status: 400 },
      );
    }

    const url = await saveUploadedFile(file, "orders");
    return NextResponse.json({ url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
