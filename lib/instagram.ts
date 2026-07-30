const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN!;
const USER_ID = process.env.INSTAGRAM_USER_ID!;

const MEDIA_ENDPOINT = `https://graph.instagram.com/${USER_ID}/media`;

/**
 * Fetches recent Instagram posts using the Instagram Basic Display API.
 * 
 * Setup instructions:
 * 1. Go to https://developers.facebook.com/apps
 * 2. Create a new app or select existing
 * 3. Add "Instagram Basic Display" product
 * 4. Configure OAuth redirect URIs
 * 5. Generate a long-lived access token (valid for 60 days)
 * 6. Add INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID to .env.local
 * 
 * Note: Access tokens expire every 60 days and need manual refresh.
 * Consider setting up a cron job to refresh tokens automatically.
 */
export async function getInstagramPosts(limit = 6) {
  if (!ACCESS_TOKEN || !USER_ID) {
    console.warn("[Instagram] Missing ACCESS_TOKEN or USER_ID");
    return { posts: [] };
  }

  try {
    // Fetch media IDs
    const mediaRes = await fetch(
      `${MEDIA_ENDPOINT}?fields=id&limit=${limit}&access_token=${ACCESS_TOKEN}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!mediaRes.ok) {
      const errorText = await mediaRes.text();
      console.error("[Instagram] Failed to fetch media:", mediaRes.status, errorText);
      return { posts: [] };
    }

    const mediaData = await mediaRes.json();
    const mediaIds = mediaData.data || [];

    if (mediaIds.length === 0) {
      return { posts: [] };
    }

    // Fetch details for each post
    const posts = await Promise.all(
      mediaIds.map(async (item: { id: string }) => {
        const detailRes = await fetch(
          `https://graph.instagram.com/${item.id}?fields=id,caption,media_type,media_url,permalink,timestamp,thumbnail_url&access_token=${ACCESS_TOKEN}`,
          { next: { revalidate: 3600 } }
        );

        if (!detailRes.ok) {
          console.error(`[Instagram] Failed to fetch post ${item.id}:`, detailRes.status);
          return null;
        }

        return detailRes.json();
      })
    );

    // Filter out failed requests
    const validPosts = posts.filter((post) => post !== null);

    return { posts: validPosts };
  } catch (error) {
    console.error("[Instagram] Error fetching posts:", error);
    return { posts: [] };
  }
}
