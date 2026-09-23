import { NextResponse } from "next/server";
import { getAllServices, getServices, saveServices } from "@/lib/store";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import type { Service } from "@/lib/types";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const all = url.searchParams.get("all") === "1";
  const services = all ? await getAllServices() : await getServices();
  return NextResponse.json(services);
}

export async function PUT(request: Request) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const services = (await request.json()) as Service[];
  await saveServices(services);
  return NextResponse.json({ success: true });
}

export async function POST(request: Request) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const service = (await request.json()) as Service;
  const services = await getAllServices();
  services.push(service);
  await saveServices(services);
  return NextResponse.json(service);
}
