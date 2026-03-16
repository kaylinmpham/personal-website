import { NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/spotify";

export const revalidate = 60; // revalidate every 60 seconds

export async function GET() {
  try {
    const data = await getNowPlaying();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (err) {
    console.error("[/api/spotify] Failed to fetch now playing:", err);
    return NextResponse.json(
      { isPlaying: false, track: null },
      { status: 200 }
    );
  }
}
