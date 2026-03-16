"use client";

import { useEffect, useState } from "react";
import type { NowPlayingResponse } from "@/types";

export function useNowPlaying() {
  const [data, setData] = useState<NowPlayingResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNowPlaying() {
      try {
        const res = await fetch("/api/spotify");
        const json = await res.json();
        setData(json);
      } catch {
        setData({ isPlaying: false, track: null });
      } finally {
        setLoading(false);
      }
    }

    fetchNowPlaying();
    // Poll every 60 seconds to stay reasonably fresh
    const interval = setInterval(fetchNowPlaying, 60_000);
    return () => clearInterval(interval);
  }, []);

  return { data, loading };
}
