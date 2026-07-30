"use client";

import { useEffect, useState } from "react";
import type { InstagramPostsResponse } from "@/types";

export function useInstagramPosts() {
  const [data, setData] = useState<InstagramPostsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/instagram");
        const json = await res.json();
        setData(json);
      } catch {
        setData({ posts: [] });
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return { data, loading };
}
