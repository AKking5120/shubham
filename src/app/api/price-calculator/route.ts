import { NextResponse } from "next/server";
import { getPriceCalculator } from "@/lib/store";

export async function GET() {
  const config = await getPriceCalculator();
  return NextResponse.json(config);
}
