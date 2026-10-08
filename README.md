This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

site/
├── app/
│ ├── globals.css — earthy design token system (Tailwind v4 @theme)
│ ├── layout.tsx — DM Serif Display + DM Sans fonts, Nav, FluidCursor
│ ├── page.tsx — composes all 4 sections
│ └── api/
│ ├── spotify/route.ts — server-side OAuth token refresh → now playing
│ └── reads/route.ts — Goodreads RSS proxy + parser
├── components/
│ ├── layout/Nav.tsx — fixed nav, scroll-aware glass, mobile hamburger
│ ├── sections/
│ │ ├── Hero.tsx — full-viewport, Motion word stagger, parallax blobs
│ │ ├── Experience.tsx — GSAP ScrollTrigger entrance, Headless UI Disclosure
│ │ ├── Now.tsx — Spotify + reading widgets, soundbar CSS animation
│ │ └── Contact.tsx — copy-email CTA, Motion social links, footer
│ └── ui/FluidCursor.tsx — spring-physics custom cursor (pointer: fine only)
├── hooks/
│ ├── useNowPlaying.ts — polls /api/spotify every 60s
│ └── useCurrentlyReading.ts
├── lib/
│ ├── spotify.ts — token refresh + currently-playing/recently-played
│ ├── goodreads.ts — RSS parse via fast-xml-parser + Open Library fallback
│ └── utils.ts — cn() helper, formatDuration()
├── types/index.ts — NowPlayingResponse, Book, ExperienceItem
├── next.config.ts — image domains (Spotify CDN, Goodreads, Open Library)
└── .env.local.example — setup instructions for Spotify + Goodreads
