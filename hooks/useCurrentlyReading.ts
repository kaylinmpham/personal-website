"use client";

import { useEffect, useState } from "react";
import type { Book } from "@/types";

interface ReadsData {
  currentlyReading: Book[];
  recentReads: Book[];
}

export function useCurrentlyReading() {
  const [data, setData] = useState<ReadsData>({
    currentlyReading: [],
    recentReads: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReads() {
      try {
        const res = await fetch("/api/reads");
        const json = await res.json();
        setData(json);
      } catch {
        setData({ currentlyReading: [], recentReads: [] });
      } finally {
        setLoading(false);
      }
    }

    fetchReads();
  }, []);

  return { data, loading };
}
