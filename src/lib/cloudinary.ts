import { v2 as cloudinary } from "cloudinary";

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}

function getCloudinary() {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary is not configured");
  }
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  return cloudinary;
}

export async function uploadBufferToCloudinary(
  buffer: Buffer,
  options: { folder: string; filename: string },
): Promise<string> {
  const cld = getCloudinary();
  const base64 = `data:application/octet-stream;base64,${buffer.toString("base64")}`;

  const result = await cld.uploader.upload(base64, {
    folder: `shubham-prints/${options.folder}`,
    public_id: options.filename.replace(/\.[^.]+$/, ""),
    overwrite: true,
    resource_type: "auto",
  });

  return result.secure_url;
}
