// ─────────────────────────────────────────
// Spotify
// ─────────────────────────────────────────

export interface SpotifyArtist {
  name: string;
  external_urls: { spotify: string };
}

export interface SpotifyAlbum {
  name: string;
  images: { url: string; width: number; height: number }[];
  external_urls: { spotify: string };
}

export interface SpotifyTrack {
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  external_urls: { spotify: string };
  duration_ms: number;
  preview_url: string | null;
}

export interface NowPlayingResponse {
  isPlaying: boolean;
  track: SpotifyTrack | null;
  /** 0–100, only present when isPlaying */
  progress?: number;
}

// ─────────────────────────────────────────
// Goodreads / Books
// ─────────────────────────────────────────

export interface Book {
  title: string;
  author: string;
  /** Goodreads link to the book */
  link: string;
  /** Cover image URL — sourced from Goodreads RSS or Open Library fallback */
  coverUrl: string | null;
  /** User's star rating (0 if not yet rated) */
  rating: number;
  /** "currently-reading" | "read" | "to-read" */
  shelf: string;
}

// ─────────────────────────────────────────
// Experience
// ─────────────────────────────────────────

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  tags: string[];
  link?: string;
}
