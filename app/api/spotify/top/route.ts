import { NextResponse } from "next/server";
import { getTopItems } from "@/lib/spotify";

export const revalidate = 3600;

export async function GET() {
  try {
    const data = await getTopItems();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600" },
    });
  } catch (err) {
    console.error("[/api/spotify/top]", err);
    return NextResponse.json({ tracks: [], artists: [] }, { status: 200 });
  }
}
