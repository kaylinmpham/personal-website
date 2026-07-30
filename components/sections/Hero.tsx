"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const INTRO =
  "Design engineer spanning UX, product, & front-end. I design accessible user-centric experiences that minimize friction.";

type CollageItem = {
  title: string;
  subtitle: string;
  href: string;
  desktopPosition: string;
  mobileSpan: string;
  tone: string;
  frame: string;
  art: "folder" | "window" | "record" | "note" | "headshot" | "books";
  floatY: number[];
  floatRotate: number[];
  duration: number;
};

const COLLAGE_ITEMS: CollageItem[] = [
  // Left side - top
  {
    title: "Experience",
    subtitle: "Teams, roles, and what I've worked on.",
    href: "#experience",
    desktopPosition:
      "left-15 -top-20 w-[5.5rem] rotate-[-9deg] sm:w-[6.5rem] lg:w-[7rem] xl:w-[7.5rem]",
    mobileSpan: "sm:col-span-1",
    tone: "from-[#5bb5ff] via-[#8dd1ff] to-[#d7f1ff] text-[#143a63] shadow-[0_24px_60px_rgba(30,86,146,0.2)]",
    frame: "rounded-[2rem]",
    art: "folder",
    floatY: [0, 0, 0],
    floatRotate: [-9, -9, -9],
    duration: 6.8,
  },
  // Left side - middle
  {
    title: "Now",
    subtitle: "What I've been listening to lately.",
    href: "#now",
    desktopPosition:
      "-left-15 top-45 -translate-y-1/2 w-[6rem] rotate-[7deg] sm:w-[7rem] lg:w-[7.5rem] xl:w-[8rem]",
    mobileSpan: "sm:col-span-1",
    tone: "from-[#fbf0a7] via-[#f8f2cf] to-[#fffdf4] text-[#5b4d10] shadow-[0_24px_60px_rgba(147,127,31,0.2)]",
    frame: "rounded-[999px]",
    art: "record",
    floatY: [0, 0, 0],
    floatRotate: [7, 7, 7],
    duration: 7.6,
  },
  // Left side - bottom
  {
    title: "Reading",
    subtitle: "What I've been reading lately.",
    href: "#now",
    desktopPosition:
      "left-20 bottom-4 w-[5.5rem] rotate-[-5deg] sm:w-[6.5rem] lg:w-[7rem] xl:w-[7.5rem]",
    mobileSpan: "sm:col-span-1",
    tone: "from-[#c7e9ff] via-[#e3f4ff] to-[#f7fcff] text-[#1e4563] shadow-[0_24px_60px_rgba(50,110,150,0.2)]",
    frame: "rounded-[2rem]",
    art: "books",
    floatY: [0, 0, 0],
    floatRotate: [-5, -5, -5],
    duration: 7.0,
  },
  // Right side - top
  {
    title: "Me!",
    subtitle: "So you can put a face to the name.",
    href: "#",
    desktopPosition:
      "right-15 -top-20 w-[6.5rem] rotate-[-3deg] sm:w-[7.5rem] lg:w-[8rem] xl:w-[8.5rem]",
    mobileSpan: "sm:col-span-2",
    tone: "from-[#e8d4ff] via-[#f5ebff] to-[#fdfaff] text-[#4a2d5e] shadow-[0_24px_60px_rgba(105,74,135,0.2)]",
    frame: "rounded-[999px]",
    art: "headshot",
    floatY: [0, 0, 0],
    floatRotate: [-3, -3, -3],
    duration: 7.0,
  },
  // Right side - middle
  {
    title: "Projects",
    subtitle: "Selected work to see what I've built.",
    href: "#projects",
    desktopPosition:
      "-right-15 top-45 -translate-y-1/2 w-[5rem] rotate-[10deg] sm:w-[6rem] lg:w-[6.5rem] xl:w-[7rem]",
    mobileSpan: "sm:col-span-1",
    tone: "from-[#ffd2c7] via-[#fff3d9] to-[#fffaf3] text-[#5d3340] shadow-[0_24px_60px_rgba(151,96,112,0.2)]",
    frame: "rounded-[2rem]",
    art: "window",
    floatY: [0, 0, 0],
    floatRotate: [10, 10, 10],
    duration: 7.2,
  },
  // Right side - bottom
  {
    title: "Contact",
    subtitle: "Get in touch via email, phone, or social media.",
    href: "#contact",
    desktopPosition:
      "right-20 -bottom-4 w-[5.5rem] rotate-[-7deg] sm:w-[6.5rem] lg:w-[7rem] xl:w-[7.5rem]",
    mobileSpan: "sm:col-span-1",
    tone: "from-[#fff7e0] via-[#fffdf4] to-[#ffffff] text-[#6d5038] shadow-[0_24px_60px_rgba(157,121,86,0.18)]",
    frame: "rounded-[1.75rem]",
    art: "note",
    floatY: [0, 0, 0],
    floatRotate: [-7, -7, -7],
    duration: 6.4,
  },
];

function CardArt({ art }: { art: CollageItem["art"] }) {
  const imageMap = {
    folder: "/icons/folder.PNG",
    window: "/icons/mint-condition.PNG",
    record: "/icons/record.PNG",
    note: "/icons/flip-phone.PNG",
    headshot: "/icons/head-shot.PNG",
    books: "/icons/books.PNG",
  };

  return (
    <div>
      <Image
        src={imageMap[art]}
        alt=""
        width={200}
        height={200}
        className="h-auto w-full drop-shadow-lg"
        style={{ display: "block" }}
      />
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden px-6 pb-16 pt-24 sm:pt-28"
    >
      <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl flex-col justify-center">
        <div className="grid gap-8 lg:hidden">
          <motion.div
            className="mx-auto max-w-xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-4 font-sans text-[11px] uppercase tracking-[0.35em] text-subtle">
              Design Engineer
            </p>
            <h1
              className="text-2xl font-bold leading-none text-ink sm:text-4xl"
              style={{ fontFamily: '"Cedarville Cursive", cursive' }}
            >
              Kaylin Pham
            </h1>
            <p
              className="mx-auto mt-5 max-w-md text-sm leading-7 text-subtle sm:text-base"
              style={{ fontFamily: '"Geist Mono", monospace' }}
            >
              {INTRO}
            </p>
            <p className="mt-4 font-sans text-xs uppercase tracking-[0.24em] text-muted">
              Hover a card, then click to wander.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {COLLAGE_ITEMS.map((item, index) => {
              const isClickable = item.href !== "#";
              const Component = isClickable ? motion.a : motion.div;
              const props = isClickable ? { href: item.href } : {};

              return (
                <Component
                  key={item.href + item.title}
                  {...props}
                  className={`group relative block ${item.mobileSpan} ${!isClickable ? "cursor-default" : ""}`}
                  initial={{ opacity: 0, y: 24, rotate: 0 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    duration: 0.5,
                    // delay: 0.18 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CardArt art={item.art} />
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="font-sans text-xs uppercase tracking-[0.24em] text-subtle">
                      {item.title}
                    </span>
                    {isClickable && (
                      <span className="font-sans text-[11px] text-muted">
                        Open
                      </span>
                    )}
                  </div>
                </Component>
              );
            })}
          </div>
        </div>

        <div className="relative hidden min-h-[29.33rem] lg:block">
          {COLLAGE_ITEMS.map((item, index) => {
            const isClickable = item.href !== "#";
            const Component = isClickable ? motion.a : motion.div;
            const props = isClickable ? { href: item.href } : {};

            return (
              <Component
                key={item.href + item.title}
                {...props}
                className={`group absolute block ${item.desktopPosition} ${!isClickable ? "cursor-default" : ""}`}
                initial={{ opacity: 0, y: 36, rotate: item.floatRotate[0] }}
                animate={{ opacity: 1, y: 0, rotate: item.floatRotate[0] }}
                transition={{
                  duration: 0.5,
                  // delay: 0.18 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ rotate: item.floatRotate[0] + 15 }}
                whileTap={{ scale: 0.98 }}
              >
                <CardArt art={item.art} />
                <div className="pointer-events-none absolute left-1/2 top-full mt-3 w-max -translate-x-1/2 rounded-full border border-border/70 bg-paper/90 px-2.5 py-1 text-center opacity-0 shadow-lg shadow-[rgba(20,30,45,0.08)] backdrop-blur-md transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-subtle">
                    {item.title}
                  </p>
                  <p className="mt-0.5 font-sans text-[10px] text-muted">
                    {item.subtitle}
                  </p>
                </div>
              </Component>
            );
          })}

          {/* Burst background */}
          <div className="absolute left-1/2 top-5/12 -translate-x-1/2 -translate-y-1/2 rotate-180 w-200 h-200 z-0 pointer-events-none">
            <Image
              src="/icons/burst.PNG"
              alt=""
              fill
              className="object-contain opacity-60"
              sizes="700px"
              priority
            />
          </div>

          <motion.div
            className="absolute left-1/2 top-5/12 z-10 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 px-6 text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              <h1
                className="text-[clamp(3rem,6vw,5rem)] leading-[0.92] text-ink"
                style={{ fontFamily: '"Cedarville Cursive", cursive' }}
              >
                Kaylin Pham
              </h1>
              <p
                className="mx-auto mt-6 max-w-md text-sm leading-7 text-subtle"
                style={{ fontFamily: '"Geist Mono", monospace' }}
              >
                {INTRO}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
