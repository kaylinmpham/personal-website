import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Spotify album art
      { protocol: "https", hostname: "i.scdn.co" },
      // Goodreads/Amazon book covers
      { protocol: "https", hostname: "i.gr-assets.com" },
      { protocol: "https", hostname: "*.gr-assets.com" },
      // Open Library covers
      { protocol: "https", hostname: "covers.openlibrary.org" },
    ],
  },
};

export default nextConfig;
