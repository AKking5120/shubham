import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE } from "./constants";

const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD ?? "Shubham@2026";

export function verifyAdminPassword(password: string): boolean {
  return password === DEFAULT_PASSWORD;
}

export function createSessionToken(): string {
  return Buffer.from(`admin:${Date.now()}:${DEFAULT_PASSWORD}`).toString(
    "base64",
  );
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const parts = decoded.split(":");
    return parts[0] === "admin" && parts[2] === DEFAULT_PASSWORD;
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return isValidSessionToken(token);
}

export async function requireAdmin(): Promise<boolean> {
  return isAdminAuthenticated();
}
