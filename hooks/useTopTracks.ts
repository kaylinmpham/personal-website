"use client";

import { useEffect, useState } from "react";
import type { SpotifyTrack, SpotifyArtistFull } from "@/types";

interface TopData {
  tracks: SpotifyTrack[];
  artists: SpotifyArtistFull[];
}

export function useTopTracks() {
  const [data, setData] = useState<TopData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTop() {
      try {
        const res = await fetch("/api/spotify/top");
        const json = await res.json();
        setData(json);
      } catch {
        setData({ tracks: [], artists: [] });
      } finally {
        setLoading(false);
      }
    }

    fetchTop();
  }, []);

  return { data, loading };
}
