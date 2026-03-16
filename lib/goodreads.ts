/**
 * Goodreads RSS feed parser — server-side only.
 *
 * Env vars required:
 *   GOODREADS_USER_ID  — your numeric Goodreads user ID
 *
 * ⚠️  The Goodreads developer API was shut down in 2020. This uses the
 *     public RSS feed which Goodreads (Amazon) still generates as of 2026.
 *     It is fragile — Goodreads can remove it without notice. The fetch
 *     lives here in one place so it's easy to swap to Literal.club's
 *     GraphQL API later.
 *
 * Literal.club migration path (when needed):
 *   https://literal.club/pages/api
 */

import { XMLParser } from "fast-xml-parser";
import type { Book } from "@/types";

const USER_ID = process.env.GOODREADS_USER_ID;

function rssUrl(shelf: string) {
  return `https://www.goodreads.com/review/list_rss/${USER_ID}?shelf=${shelf}`;
}

/** Fetch Open Library cover by ISBN or title as fallback */
async function getCoverUrl(
  isbn?: string,
  title?: string,
  author?: string
): Promise<string | null> {
  if (isbn) {
    return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
  }
  if (title) {
    try {
      const query = encodeURIComponent(`${title} ${author ?? ""}`);
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${query}&limit=1&fields=cover_i`
      );
      const data = await res.json();
      const coverId = data.docs?.[0]?.cover_i;
      if (coverId) {
        return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
      }
    } catch {
      // silently fall through
    }
  }
  return null;
}

interface RssItem {
  title: string;
  author_name?: string;
  link: string;
  book_id?: string;
  isbn?: string;
  book_large_image_url?: string;
  user_rating?: string | number;
  shelf?: string;
}

async function parseShelf(shelf: string): Promise<Book[]> {
  if (!USER_ID) return [];

  try {
    const res = await fetch(rssUrl(shelf), { next: { revalidate: 3600 } });
    if (!res.ok) return [];

    const xml = await res.text();
    const parser = new XMLParser({ ignoreAttributes: false });
    const parsed = parser.parse(xml);

    const items: RssItem[] = parsed?.rss?.channel?.item ?? [];
    const itemArray = Array.isArray(items) ? items : [items];

    return await Promise.all(
      itemArray.map(async (item) => {
        const isbn = item.isbn?.toString();
        const title = item.title?.toString() ?? "Unknown Title";
        const author = item.author_name?.toString() ?? "Unknown Author";

        // Prefer Goodreads's own cover image, fall back to Open Library
        const coverUrl =
          item.book_large_image_url?.toString() ||
          (await getCoverUrl(isbn, title, author));

        return {
          title,
          author,
          link: item.link?.toString() ?? "#",
          coverUrl,
          rating: Number(item.user_rating) || 0,
          shelf,
        } satisfies Book;
      })
    );
  } catch {
    return [];
  }
}

export async function getCurrentlyReading(): Promise<Book[]> {
  return parseShelf("currently-reading");
}

export async function getRecentReads(limit = 4): Promise<Book[]> {
  const books = await parseShelf("read");
  return books.slice(0, limit);
}
