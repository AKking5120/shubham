import { promises as fs } from "fs";
import path from "path";
import { randomBytes } from "crypto";
import { uploadArtworkToCloudinary, isCloudinaryConfigured } from "./cloudinary";
import type { ArtworkFile } from "./quote-workflow";

const MAX_BYTES = 12 * 1024 * 1024;

const ALLOWED_EXT = new Set([
  "jpg",
  "jpeg",
  "png",
  "webp",
  "gif",
  "tif",
  "tiff",
  "pdf",
  "ai",
  "psd",
  "eps",
  "cdr",
  "svg",
]);

const ALLOWED_MIME = new Set([
  "",
  "application/octet-stream",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/tiff",
  "image/svg+xml",
  "application/pdf",
  "application/postscript",
  "application/illustrator",
  "application/vnd.adobe.illustrator",
  "image/vnd.adobe.photoshop",
  "application/x-photoshop",
  "application/cdr",
  "application/x-cdr",
  "application/coreldraw",
]);

const PRIVATE_ROOT = path.join(process.cwd(), "data", "private-uploads", "artwork");

export function artworkError(message: string): Error {
  const err = new Error(message);
  err.name = "ArtworkError";
  return err;
}

export function assertArtworkFile(file: File): void {
  if (!file || file.size <= 0) {
    throw artworkError("Choose a design file to upload.");
  }
  if (file.size > MAX_BYTES) {
    throw artworkError("File is too large. Maximum size is 12 MB.");
  }
  const base = path.basename(file.name || "design");
  if (base.includes("..") || base.includes("/") || base.includes("\\") || base.includes("\0")) {
    throw artworkError("That file name is not allowed.");
  }
  const ext = base.includes(".") ? base.split(".").pop()!.toLowerCase() : "";
  if (!ALLOWED_EXT.has(ext)) {
    throw artworkError(
      "Unsupported file type. Upload an image, PDF, or design file (JPG, PNG, WEBP, PDF, AI, PSD, EPS, CDR).",
    );
  }
  const mime = (file.type || "").toLowerCase();
  if (!ALLOWED_MIME.has(mime)) {
    throw artworkError("That file type is not supported.");
  }
}

function safeDownloadName(name: string): string {
  const base = path.basename(name).replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
  return base || "artwork";
}

export async function saveArtwork(file: File): Promise<ArtworkFile> {
  assertArtworkFile(file);
  const ext = path.basename(file.name).split(".").pop()!.toLowerCase();
  const id = randomBytes(12).toString("hex");
  const stored = `${id}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  const imageExt = new Set(["jpg", "jpeg", "png", "webp", "gif", "tif", "tiff"]);
  const resourceType = imageExt.has(ext) ? "image" : "raw";

  if (isCloudinaryConfigured()) {
    const uploaded = await uploadArtworkToCloudinary(bytes, {
      publicId: id,
      resourceType,
    });
    return {
      id,
      originalName: safeDownloadName(file.name),
      mimeType: file.type || "application/octet-stream",
      sizeBytes: file.size,
      storage: "cloudinary",
      key: uploaded.publicId,
      resourceType: uploaded.resourceType,
    };
  }

  await fs.mkdir(PRIVATE_ROOT, { recursive: true });
  const full = path.join(PRIVATE_ROOT, stored);
  await fs.writeFile(full, bytes);
  return {
    id,
    originalName: safeDownloadName(file.name),
    mimeType: file.type || "application/octet-stream",
    sizeBytes: file.size,
    storage: "local",
    key: stored,
    resourceType,
  };
}

export async function deleteArtwork(file: ArtworkFile | null): Promise<void> {
  if (!file || file.storage !== "local") return;
  if (!/^[a-f0-9]{24}\.[a-z0-9]+$/.test(file.key)) return;
  await fs.rm(path.join(PRIVATE_ROOT, file.key), { force: true });
}

export function resolveLocalArtwork(file: ArtworkFile): string | null {
  if (file.storage !== "local") return null;
  if (!/^[a-f0-9]{24}\.[a-z0-9]+$/.test(file.key)) return null;
  const full = path.resolve(PRIVATE_ROOT, file.key);
  if (!full.startsWith(path.resolve(PRIVATE_ROOT) + path.sep)) return null;
  return full;
}

export function artworkContentDisposition(file: ArtworkFile): string {
  return `attachment; filename="${safeDownloadName(file.originalName)}"`;
}
