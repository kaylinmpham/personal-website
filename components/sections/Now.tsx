"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useNowPlaying } from "@/hooks/useNowPlaying";
import { useCurrentlyReading } from "@/hooks/useCurrentlyReading";
import { useTopTracks } from "@/hooks/useTopTracks";

// ─── Spotify Widget ───────────────────────────────────────────────────────────

function SoundBars() {
  return (
    <span className="inline-flex items-end gap-0.5 h-4" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="soundbar-bar h-full" />
      ))}
    </span>
  );
}

function SpotifyWidget() {
  const { data: nowPlaying, loading: nowLoading } = useNowPlaying();
  const { data: top, loading: topLoading } = useTopTracks();

  const topTrack = top?.tracks?.[0] ?? null;
  const topArtist = top?.artists?.[0] ?? null;

  return (
    <motion.div
      className="border border-border p-6 flex flex-col gap-4"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="flex items-center gap-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-accent shrink-0"
        >
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
        <span className="font-sans text-xs uppercase tracking-widest text-mid">
          Spotify
        </span>
        {nowPlaying?.isPlaying && <SoundBars />}
      </div>

      {nowLoading ? (
        <div className="flex gap-4 animate-pulse">
          <div className="w-14 h-14 rounded-lg bg-border shrink-0" />
          <div className="flex-1 flex flex-col gap-2 justify-center">
            <div className="h-3 bg-border rounded w-3/4" />
            <div className="h-3 bg-border rounded w-1/2" />
          </div>
        </div>
      ) : nowPlaying?.track ? (
        <a
          href={nowPlaying.track.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-4 items-center group"
        >
          {nowPlaying.track.album.images[0] && (
            <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 shadow-sm">
              <Image
                src={nowPlaying.track.album.images[0].url}
                alt={nowPlaying.track.album.name}
                fill
                sizes="56px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-sans text-xs text-dim mb-0.5">
              {nowPlaying.isPlaying ? "Now playing" : "Recently played"}
            </p>
            <p className="font-sans text-sm font-medium text-ink truncate group-hover:text-accent transition-colors">
              {nowPlaying.track.name}
            </p>
            <p className="font-sans text-xs text-mid truncate">
              {nowPlaying.track.artists.map((a) => a.name).join(", ")}
            </p>
          </div>
          {nowPlaying.isPlaying && (
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
          )}
        </a>
      ) : (
        <p className="font-sans text-sm text-dim italic">Nothing playing right now.</p>
      )}

      <div className="border-t border-border" />

      <div className="flex flex-col gap-3">
        {topLoading ? (
          <>
            <div className="flex gap-3 animate-pulse">
              <div className="w-10 h-10 rounded bg-border shrink-0" />
              <div className="flex-1 flex flex-col gap-2 justify-center">
                <div className="h-2.5 bg-border rounded w-3/4" />
                <div className="h-2.5 bg-border rounded w-1/2" />
              </div>
            </div>
            <div className="flex gap-3 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-border shrink-0" />
              <div className="flex-1 flex flex-col gap-2 justify-center">
                <div className="h-2.5 bg-border rounded w-2/4" />
                <div className="h-2.5 bg-border rounded w-1/3" />
              </div>
            </div>
          </>
        ) : (
          <>
            {topTrack && (
              <a
                href={topTrack.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 items-center group"
              >
                <div className="relative w-10 h-10 rounded overflow-hidden shrink-0 shadow-sm">
                  <Image
                    src={topTrack.album.images[0].url}
                    alt={topTrack.album.name}
                    fill
                    sizes="40px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-xs text-dim mb-0.5">Top song this month</p>
                  <p className="font-sans text-sm font-medium text-ink truncate group-hover:text-accent transition-colors">
                    {topTrack.name}
                  </p>
                  <p className="font-sans text-xs text-mid truncate">
                    {topTrack.artists.map((a) => a.name).join(", ")}
                  </p>
                </div>
              </a>
            )}
            {topArtist && (
              <a
                href={topArtist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 items-center group"
              >
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 shadow-sm">
                  {topArtist.images[0] && (
                    <Image
                      src={topArtist.images[0].url}
                      alt={topArtist.name}
                      fill
                      sizes="40px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-xs text-dim mb-0.5">Top artist this month</p>
                  <p className="font-sans text-sm font-medium text-ink truncate group-hover:text-accent transition-colors">
                    {topArtist.name}
                  </p>
                  <p className="font-sans text-xs text-mid truncate">
                    {(topArtist.genres ?? []).slice(0, 2).join(", ")}
                  </p>
                </div>
              </a>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

// ─── Reading Widget ───────────────────────────────────────────────────────────
function ReadingWidget() {
  const { data, loading } = useCurrentlyReading();
  const books = [
    ...data.currentlyReading.slice(0, 2),
    ...data.recentReads,
  ].slice(0, 3);

  return (
    <motion.div
      className="border border-border p-6 flex flex-col gap-4"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="flex items-center gap-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent shrink-0"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
        <span className="font-sans text-xs uppercase tracking-widest text-mid">
          Reading
        </span>
      </div>

      {loading ? (
        <div className="flex flex-col gap-3 animate-pulse">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="w-10 h-14 rounded bg-border shrink-0" />
              <div className="flex-1 flex flex-col gap-2 justify-center">
                <div className="h-3 bg-border rounded w-4/5" />
                <div className="h-3 bg-border rounded w-2/4" />
              </div>
            </div>
          ))}
        </div>
      ) : books.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {books.map((book, i) => (
            <li key={i}>
              <a
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 items-center group"
              >
                <div className="relative w-10 h-14 rounded overflow-hidden shrink-0 shadow-sm bg-border">
                  {book.coverUrl && (
                    <Image
                      src={book.coverUrl}
                      alt={book.title}
                      fill
                      sizes="40px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-xs text-dim mb-0.5">
                    {book.shelf === "currently-reading" ? "Currently reading" : "Just finished"}
                  </p>
                  <p className="font-sans text-sm font-medium text-ink truncate group-hover:text-accent transition-colors">
                    {book.title}
                  </p>
                  <p className="font-sans text-xs text-mid truncate">
                    {book.author}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="font-sans text-sm text-dim italic">
          Shelf is quiet right now.
        </p>
      )}
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function Now() {
  return (
    <section id="now" className="py-section px-6 max-w-5xl mx-auto">
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <p className="font-sans text-xs uppercase tracking-widest text-mid mb-3">
          Now
        </p>
        <h2 className="font-display font-bold text-4xl sm:text-5xl text-ink tracking-tight">
          What I&apos;m up to
        </h2>
        <p className="font-sans text-sm text-mid mt-3 max-w-md">
          A snapshot of what I&apos;m listening to and what I&apos;m reading.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SpotifyWidget />
        <ReadingWidget />
      </div>
    </section>
  );
}
