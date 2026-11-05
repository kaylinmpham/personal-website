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
  author?: string,
): Promise<string | null> {
  if (isbn) {
    return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
  }
  if (title) {
    try {
      const query = encodeURIComponent(`${title} ${author ?? ""}`);
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${query}&limit=1&fields=cover_i`,
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
    const res = await fetch(rssUrl(shelf), {
      next: { revalidate: 3600 },
      headers: {
        // Workaround for Goodreads RSS feed blocking requests with non-browser user agents.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    if (!res.ok) {
      console.error(`[goodreads] ${shelf} shelf returned HTTP ${res.status}`);
      return [];
    }

    const xml = await res.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      parseTagValue: false,
    });
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
      }),
    );
  } catch (err) {
    console.error(`[goodreads] Failed to parse ${shelf} shelf:`, err);
    return [];
  }
}

const BROWSER_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
};

function decodeEntities(text: string) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&rsquo;/g, "\u2019");
}

/**
 * The RSS endpoint now returns 404, so fall back to the "Currently Reading"
 * block of the public profile page.
 */
async function scrapeCurrentlyReading(): Promise<Book[]> {
  if (!USER_ID) return [];

  try {
    const res = await fetch(`https://www.goodreads.com/user/show/${USER_ID}`, {
      next: { revalidate: 3600 },
      headers: BROWSER_HEADERS,
    });
    if (!res.ok) {
      console.error(`[goodreads] profile page returned HTTP ${res.status}`);
      return [];
    }

    const html = await res.text();
    const start = html.indexOf('id="currentlyReadingReviews"');
    if (start === -1) return [];
    const block = html.slice(start).split('class="bigBoxBottom"')[0];

    return block
      .split('<div class="Updates')
      .slice(1)
      .flatMap((chunk) => {
        const cover = chunk.match(/<img[^>]*src="([^"]+)"/)?.[1] ?? null;
        const titleMatch = chunk.match(
          /<a class="bookTitle" href="([^"]+)"[^>]*>([^<]+)<\/a>/,
        );
        if (!titleMatch) return [];
        const author = chunk.match(/class="authorName"[^>]*>([^<]+)</)?.[1];

        return [
          {
            title: decodeEntities(titleMatch[2].trim()),
            author: decodeEntities(author?.trim() ?? "Unknown Author"),
            link: new URL(titleMatch[1], "https://www.goodreads.com").href,
            coverUrl: cover,
            rating: 0,
            shelf: "currently-reading",
          } satisfies Book,
        ];
      });
  } catch (err) {
    console.error("[goodreads] Failed to scrape profile page:", err);
    return [];
  }
}

export async function getCurrentlyReading(): Promise<Book[]> {
  const books = await parseShelf("currently-reading");
  return books.length > 0 ? books : scrapeCurrentlyReading();
}

interface YearBook {
  title: string;
  author: string;
  link: string;
  coverUrl: string | null;
}

function parseYearBook(chunk: string): YearBook | null {
  const match = chunk.match(
    /<a [^>]*href="(\/book\/show\/[^"]+)"[^>]*><img alt="([^"]+)"[^>]*src="([^"]+)"/,
  );
  if (!match) return null;

  const [, href, alt, src] = match;
  const text = decodeEntities(alt);
  const split = text.lastIndexOf(" by ");

  return {
    title: split > -1 ? text.slice(0, split) : text,
    author: split > -1 ? text.slice(split + 4) : "Unknown Author",
    link: new URL(href, "https://www.goodreads.com").href,
    coverUrl: src,
  };
}

function toBook(book: YearBook, highlight: string, rating = 0): Book {
  return { ...book, rating, shelf: "read", highlight };
}

/**
 * The read shelf needs sign-in, so use the public "Year in Books" page.
 * Only the larger covers in its grid show a star rating, and the grid is in
 * the order books were finished, so the last "it was amazing" is the latest
 * 5-star read it exposes.
 */
async function scrapeYear(year: number) {
  if (!USER_ID) return {};

  try {
    const res = await fetch(
      `https://www.goodreads.com/user/year_in_books/${year}/${USER_ID}`,
      { next: { revalidate: 3600 }, headers: BROWSER_HEADERS },
    );
    if (!res.ok) {
      console.error(`[goodreads] year in books returned HTTP ${res.status}`);
      return {};
    }

    const html = await res.text();

    const lastIdx = html.indexOf("last review of the year");
    const lastFinished =
      lastIdx > -1
        ? parseYearBook(html.slice(lastIdx - 1500, lastIdx + 1500))
        : null;

    const gridStart = html.indexOf("class='bookCovers'");
    const fiveStarChunk = (gridStart > -1 ? html.slice(gridStart) : "")
      .split("doubleSizeCover")
      .slice(1)
      .map((chunk) => chunk.split("</span>\n")[0])
      .filter((chunk) => chunk.includes('title="it was amazing"'))
      .pop();
    const fiveStar = fiveStarChunk ? parseYearBook(fiveStarChunk) : null;

    return { lastFinished, fiveStar };
  } catch (err) {
    console.error("[goodreads] Failed to scrape year in books:", err);
    return {};
  }
}

export async function getRecentReads(limit = 4): Promise<Book[]> {
  const books = await parseShelf("read");
  if (books.length > 0) return books.slice(0, limit);

  const year = new Date().getFullYear();
  const current = await scrapeYear(year);
  const previous =
    current.lastFinished && current.fiveStar ? {} : await scrapeYear(year - 1);

  const lastFinished = current.lastFinished ?? previous.lastFinished;
  const fiveStar = current.fiveStar ?? previous.fiveStar;

  return [
    lastFinished && toBook(lastFinished, "Just finished"),
    fiveStar && toBook(fiveStar, "Recent favorite", 5),
  ]
    .filter((book): book is Book => Boolean(book))
    .slice(0, limit);
}
