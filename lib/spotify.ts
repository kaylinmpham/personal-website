const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";
const TOP_TRACKS_ENDPOINT =
  "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5";
const TOP_ARTISTS_ENDPOINT =
  "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5";

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

  const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

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

  const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (recentRes.status === 200) {
    const recentData = await recentRes.json();
    return { isPlaying: false, track: recentData.items?.[0]?.track ?? null };
  }

  return { isPlaying: false, track: null };
}

export async function getTopItems() {
  const accessToken = await getAccessToken();

  const [tracksRes, artistsRes] = await Promise.all([
    fetch(TOP_TRACKS_ENDPOINT, { headers: { Authorization: `Bearer ${accessToken}` } }),
    fetch(TOP_ARTISTS_ENDPOINT, { headers: { Authorization: `Bearer ${accessToken}` } }),
  ]);

  const [tracksData, artistsData] = await Promise.all([
    tracksRes.ok ? tracksRes.json() : Promise.resolve({ items: [] }),
    artistsRes.ok ? artistsRes.json() : Promise.resolve({ items: [] }),
  ]);

  return {
    tracks: tracksData.items ?? [],
    artists: artistsData.items ?? [],
  };
}
