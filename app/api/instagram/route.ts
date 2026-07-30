import { NextResponse } from "next/server";
import { getInstagramPosts } from "@/lib/instagram";

export const revalidate = 3600; // revalidate every hour

export async function GET() {
  try {
    const data = await getInstagramPosts(6);
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
      },
    });
  } catch (err) {
    console.error("[/api/instagram] Failed to fetch posts:", err);
    return NextResponse.json({ posts: [] }, { status: 200 });
  }
}
