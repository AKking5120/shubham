import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import type { DesignGalleryOverride } from "@/lib/store";
import {
  getDesignGalleryOverrides,
  saveDesignGalleryOverrides,
} from "@/lib/store";

export async function GET() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const overrides = await getDesignGalleryOverrides();
  return NextResponse.json({ overrides });
}

export async function PUT(request: Request) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as {
    overrides: Record<string, DesignGalleryOverride>;
  };
  await saveDesignGalleryOverrides(body.overrides ?? {});
  return NextResponse.json({ success: true });
}
