"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useNowPlaying } from "@/hooks/useNowPlaying";
import { useCurrentlyReading } from "@/hooks/useCurrentlyReading";
import { useTopTracks } from "@/hooks/useTopTracks";
import { useInstagramPosts } from "@/hooks/useInstagramPosts";

const INSTAGRAM_URL = "https://www.instagram.com/kaylinsarchive/";

// ─── Shared pieces ────────────────────────────────────────────────────────────

function NowBlock({
  title,
  link,
  wide,
  delay = 0,
  children,
}: {
  title: string;
  link?: { label: string; href: string };
  wide?: boolean;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={`now-block${wide ? " now-block-wide" : ""}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="now-block-header">
        <h2 className="home-heading">{title}</h2>
        {link && (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="home-tile-link now-link"
          >
            {link.label}
          </a>
        )}
      </div>
      {children}
    </motion.div>
  );
}

function NowItem({
  href,
  art,
  artShape = "square",
  label,
  title,
  subtitle,
  trailing,
}: {
  href: string;
  art?: { src: string; alt: string };
  artShape?: "square" | "book";
  label: string;
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="now-item"
    >
      <span className={`now-item-art now-item-art-${artShape}`}>
        {art && <Image src={art.src} alt={art.alt} fill sizes="64px" />}
      </span>
      <span className="now-item-text">
        <span className="now-item-label">{label}</span>
        <span className="now-item-title">{title}</span>
        {subtitle && <span className="now-item-sub">{subtitle}</span>}
      </span>
      {trailing}
    </a>
  );
}

function SkeletonItems({ count }: { count: number }) {
  return (
    <div className="now-list" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="now-item now-skeleton-item">
          <span className="now-item-art now-item-art-square now-skeleton" />
          <span className="now-item-text">
            <span className="now-skeleton now-skeleton-line" />
            <span className="now-skeleton now-skeleton-line now-skeleton-short" />
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Spotify ──────────────────────────────────────────────────────────────────

function SoundBars() {
  return (
    <span className="inline-flex items-end gap-0.5 h-3" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="soundbar-bar h-full" />
      ))}
    </span>
  );
}

function SpotifyWidget() {
  const { data: nowPlaying, loading: nowLoading } = useNowPlaying();
  const { data: top, loading: topLoading } = useTopTracks();

  const track = nowPlaying?.track;
  const topTrack = top?.tracks?.[0] ?? null;
  const topArtist = top?.artists?.[0] ?? null;

  return (
    <NowBlock title="Playing">
      {nowLoading || topLoading ? (
        <SkeletonItems count={3} />
      ) : (
        <div className="now-list">
          {track ? (
            <NowItem
              href={track.external_urls.spotify}
              art={
                track.album.images[0] && {
                  src: track.album.images[0].url,
                  alt: track.album.name,
                }
              }
              label={nowPlaying.isPlaying ? "Now playing" : "Recently played"}
              title={track.name}
              subtitle={track.artists.map((a) => a.name).join(", ")}
              trailing={nowPlaying.isPlaying && <SoundBars />}
            />
          ) : (
            <p className="now-empty">Nothing playing right now.</p>
          )}
          {topTrack && (
            <NowItem
              href={topTrack.external_urls.spotify}
              art={
                topTrack.album.images[0] && {
                  src: topTrack.album.images[0].url,
                  alt: topTrack.album.name,
                }
              }
              label="Top song this month"
              title={topTrack.name}
              subtitle={topTrack.artists.map((a) => a.name).join(", ")}
            />
          )}
          {topArtist && (
            <NowItem
              href={topArtist.external_urls.spotify}
              art={
                topArtist.images[0] && {
                  src: topArtist.images[0].url,
                  alt: topArtist.name,
                }
              }
              label="Top artist this month"
              title={topArtist.name}
              subtitle={(topArtist.genres ?? []).slice(0, 2).join(", ")}
            />
          )}
        </div>
      )}
    </NowBlock>
  );
}

// ─── Reading ──────────────────────────────────────────────────────────────────

function ReadingWidget() {
  const { data, loading } = useCurrentlyReading();
  const books = [
    ...data.currentlyReading.slice(0, 2),
    ...data.recentReads,
  ].slice(0, 3);

  return (
    <NowBlock title="Reading" delay={0.1}>
      {loading ? (
        <SkeletonItems count={3} />
      ) : books.length > 0 ? (
        <div className="now-list">
          {books.map((book) => (
            <NowItem
              key={`${book.shelf}-${book.title}`}
              href={book.link}
              art={
                book.coverUrl
                  ? { src: book.coverUrl, alt: book.title }
                  : undefined
              }
              artShape="book"
              label={
                book.shelf === "currently-reading"
                  ? "Currently reading"
                  : "Just finished"
              }
              title={book.title}
              subtitle={book.author}
            />
          ))}
        </div>
      ) : (
        <p className="now-empty">Shelf is quiet right now.</p>
      )}
    </NowBlock>
  );
}

// ─── Pottery (Instagram) ──────────────────────────────────────────────────────

function PotteryWidget() {
  const { data, loading } = useInstagramPosts();
  const posts = data?.posts?.slice(0, 6) ?? [];

  return (
    <NowBlock
      title="Making"
      link={{ label: "@kaylinsarchive ↗", href: INSTAGRAM_URL }}
      wide
      delay={0.15}
    >
      <p className="home-copy now-block-copy">
        Pottery from the wheel, glaze results, and whatever came out of the kiln
        recently.
      </p>
      {loading ? (
        <div className="now-pottery-grid" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="now-pottery-tile now-skeleton" />
          ))}
        </div>
      ) : posts.length > 0 ? (
        <div className="now-pottery-grid">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="now-pottery-tile"
            >
              <Image
                src={post.imageUrl}
                alt={post.alt}
                fill
                sizes="(max-width: 700px) 33vw, 20vw"
              />
              {post.mediaType === "VIDEO" && (
                <span className="now-pottery-play" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              )}
            </a>
          ))}
        </div>
      ) : (
        <p className="now-empty">No posts yet. Check back soon!</p>
      )}
    </NowBlock>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function Now() {
  return (
    <section id="now" className="now-page">
      <div className="work-intro">
        <h1 className="home-heading">What I&apos;m up to</h1>
        <p className="home-copy">
          A running log of what I&apos;ve been into lately off the clock.
        </p>
      </div>

      <div className="now-grid">
        <SpotifyWidget />
        <ReadingWidget />
        <PotteryWidget />
      </div>
    </section>
  );
}
