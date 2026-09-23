import { promises as fs } from "fs";
import path from "path";
import { uploadBufferToCloudinary, isCloudinaryConfigured } from "./cloudinary";

export async function saveUploadedFile(
  file: File,
  folder: "enquiries" | "gallery" | "services",
): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

  if (isCloudinaryConfigured()) {
    return uploadBufferToCloudinary(buffer, { folder, filename: safeName });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, safeName), buffer);
  return `/uploads/${folder}/${safeName}`;
}
