/**
 * Spotify OAuth helpers — server-side only.
 *
 * Env vars required (set in .env.local / Vercel dashboard):
 *   SPOTIFY_CLIENT_ID
 *   SPOTIFY_CLIENT_SECRET
 *   SPOTIFY_REFRESH_TOKEN
 *
 * One-time setup:
 *  1. Create a Spotify app at https://developer.spotify.com/dashboard
 *  2. Add http://localhost:3000/api/spotify/callback as a redirect URI
 *  3. Run the auth flow once to obtain your refresh token
 *  4. Store the refresh token in SPOTIFY_REFRESH_TOKEN env var
 */

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

async function getAccessToken(): Promise<string> {
  const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    "base64"
  );

  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
  });

  const data = await res.json();
  return data.access_token as string;
}

export async function getNowPlaying() {
  const accessToken = await getAccessToken();

  // Try currently playing first
  const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  // 204 = nothing playing, 200 = active track
  if (nowPlayingRes.status === 200) {
    const data = await nowPlayingRes.json();
    if (data.item) {
      return {
        isPlaying: data.is_playing as boolean,
        track: data.item,
        progress: data.progress_ms
          ? Math.round((data.progress_ms / data.item.duration_ms) * 100)
          : 0,
      };
    }
  }

  // Fall back to most recently played
  const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (recentRes.status === 200) {
    const recentData = await recentRes.json();
    const recentTrack = recentData.items?.[0]?.track ?? null;
    return { isPlaying: false, track: recentTrack };
  }

  return { isPlaying: false, track: null };
}
