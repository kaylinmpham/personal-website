import type { InstagramPost } from "@/types";

const BEHOLD_FEED_ID = process.env.BEHOLD_FEED_ID;

interface BeholdSize {
  mediaUrl: string;
  width: number;
  height: number;
}

interface BeholdPost {
  id: string;
  permalink: string;
  timestamp: string;
  mediaType: InstagramPost["mediaType"];
  mediaUrl: string;
  thumbnailUrl?: string;
  prunedCaption?: string;
  altText?: string;
  sizes?: { small?: BeholdSize; medium?: BeholdSize };
  /** "hidden" when the post is hidden in the Behold dashboard */
  visibility?: string;
}

/**
 * Fetches recent Instagram posts from a Behold JSON feed (https://behold.so).
 * Behold handles Instagram auth and token refresh, so the only config is
 * BEHOLD_FEED_ID in .env.local. See INSTAGRAM_SETUP.md.
 */
export async function getInstagramPosts(limit = 6) {
  if (!BEHOLD_FEED_ID) {
    console.warn("[Instagram] Missing BEHOLD_FEED_ID");
    return { posts: [] };
  }

  const res = await fetch(`https://feeds.behold.so/${BEHOLD_FEED_ID}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`Behold feed request failed (${res.status})`);
  }

  const feed: { posts?: BeholdPost[] } = await res.json();
  const posts: InstagramPost[] = (feed.posts ?? [])
    .filter((post) => post.visibility !== "hidden")
    .slice(0, limit)
    .map((post) => ({
      id: post.id,
      permalink: post.permalink,
      timestamp: post.timestamp,
      mediaType: post.mediaType,
      // Behold's resized image works for every type, including video covers.
      imageUrl:
        post.sizes?.medium?.mediaUrl ??
        post.thumbnailUrl ??
        post.mediaUrl,
      alt: post.altText || post.prunedCaption?.slice(0, 120) || "Pottery post",
    }));

  return { posts };
}
