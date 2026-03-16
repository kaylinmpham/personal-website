import { NextResponse } from "next/server";
import { getCurrentlyReading, getRecentReads } from "@/lib/goodreads";

export const revalidate = 3600; // revalidate every hour

export async function GET() {
  try {
    const [currentlyReading, recentReads] = await Promise.all([
      getCurrentlyReading(),
      getRecentReads(4),
    ]);

    return NextResponse.json(
      { currentlyReading, recentReads },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
        },
      }
    );
  } catch (err) {
    console.error("[/api/reads] Failed to fetch reading data:", err);
    return NextResponse.json(
      { currentlyReading: [], recentReads: [] },
      { status: 200 }
    );
  }
}
