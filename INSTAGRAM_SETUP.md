# Instagram Setup (Behold)

The "What I'm up to" page shows recent posts from [@kaylinsarchive](https://www.instagram.com/kaylinsarchive/) using a [Behold](https://behold.so) JSON feed. Behold connects to Instagram and refreshes the access token on its own, so the site never stores an Instagram token.

## Setup

1. Make sure the Instagram account is a **Creator** or **Business** account (Instagram app → Settings → Account type and tools).
2. Sign up at [behold.so](https://behold.so) and click **Connect Instagram**. Log in as `@kaylinsarchive`.
3. Click **Add feed**, choose **JSON**, and pick the account as the source.
4. Copy the feed ID, which is the last part of the feed URL: `https://feeds.behold.so/<FEED_ID>`.
5. Add it to `.env.local`:

   ```env
   BEHOLD_FEED_ID=your_feed_id
   ```

6. Add the same variable to the hosting provider's environment variables and redeploy.

## How it works

- `lib/instagram.ts` fetches the feed and maps each post to `{ id, permalink, timestamp, mediaType, imageUrl, alt }`.
- `/api/instagram` serves the six most recent posts, cached for an hour.
- Images come from Behold's CDN (`behold.pictures`), which is allowed in `next.config.ts`.
- Behold updates the feed on its own schedule. To pull new posts right away, use **Refresh** on the feed in the Behold dashboard.

## Troubleshooting

- **"Missing BEHOLD_FEED_ID" in the server logs:** the variable isn't set. Restart the dev server after adding it.
- **"Behold feed request failed (404)":** the feed ID is wrong or the feed was deleted.
- **Posts look out of date:** refresh the feed in Behold, then wait up to an hour for the site cache.
