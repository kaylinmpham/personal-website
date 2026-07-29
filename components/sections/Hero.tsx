"use client";

import { motion, useReducedMotion } from "motion/react";

const INTRO =
  "Design engineer shaping expressive interfaces, motion, and systems that make the web feel more human.";

type CollageItem = {
  title: string;
  subtitle: string;
  href: string;
  desktopPosition: string;
  mobileSpan: string;
  tone: string;
  frame: string;
  art: "folder" | "window" | "record" | "note";
  floatY: number[];
  floatRotate: number[];
  duration: number;
};

const COLLAGE_ITEMS: CollageItem[] = [
  {
    title: "Experience",
    subtitle: "Teams, roles, and the way I like to build.",
    href: "#experience",
    desktopPosition:
      "left-0 top-4 w-[7.33rem] rotate-[-9deg] sm:w-[8.67rem] lg:w-[9.33rem] xl:w-[10rem]",
    mobileSpan: "sm:col-span-1",
    tone: "from-[#5bb5ff] via-[#8dd1ff] to-[#d7f1ff] text-[#143a63] shadow-[0_24px_60px_rgba(30,86,146,0.2)]",
    frame: "rounded-[2rem]",
    art: "folder",
    floatY: [0, -16, 0],
    floatRotate: [-9, -5, -9],
    duration: 6.8,
  },
  {
    title: "Projects",
    subtitle: "Selected work with a little more texture.",
    href: "#projects",
    desktopPosition:
      "right-2 top-[-1rem] w-[6.67rem] rotate-[10deg] sm:w-[8rem] lg:w-[8.67rem] xl:w-[9.33rem]",
    mobileSpan: "sm:col-span-1",
    tone: "from-[#ffd2c7] via-[#fff3d9] to-[#fffaf3] text-[#5d3340] shadow-[0_24px_60px_rgba(151,96,112,0.2)]",
    frame: "rounded-[2rem]",
    art: "window",
    floatY: [0, -12, 0],
    floatRotate: [10, 6, 10],
    duration: 7.2,
  },
  {
    title: "Now",
    subtitle: "What I am learning, reading, and looping lately.",
    href: "#now",
    desktopPosition:
      "left-8 bottom-2 w-[8rem] rotate-[7deg] sm:w-[9.33rem] lg:w-[10rem] xl:w-[10.67rem]",
    mobileSpan: "sm:col-span-1",
    tone: "from-[#fbf0a7] via-[#f8f2cf] to-[#fffdf4] text-[#5b4d10] shadow-[0_24px_60px_rgba(147,127,31,0.2)]",
    frame: "rounded-[999px]",
    art: "record",
    floatY: [0, -14, 0],
    floatRotate: [7, 10, 7],
    duration: 7.6,
  },
  {
    title: "Contact",
    subtitle: "A direct line for collaborations and conversation.",
    href: "#contact",
    desktopPosition:
      "right-0 bottom-4 w-[7.33rem] rotate-[-7deg] sm:w-[8.67rem] lg:w-[9.33rem] xl:w-[10rem]",
    mobileSpan: "sm:col-span-1",
    tone: "from-[#fff7e0] via-[#fffdf4] to-[#ffffff] text-[#6d5038] shadow-[0_24px_60px_rgba(157,121,86,0.18)]",
    frame: "rounded-[1.75rem]",
    art: "note",
    floatY: [0, -18, 0],
    floatRotate: [-7, -3, -7],
    duration: 6.4,
  },
];

function CardArt({ art }: { art: CollageItem["art"] }) {
  if (art === "folder") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-[inherit] bg-linear-to-br from-[#4aaaf7] via-[#7ecbff] to-[#caebff] p-4">
        <div className="absolute left-4 top-4 h-5 w-20 rounded-t-2xl bg-white/35" />
        <div className="absolute inset-x-3 bottom-3 top-8 rounded-3xl bg-white/16 backdrop-blur-sm" />
        <div className="absolute inset-x-7 top-14 h-px bg-white/45" />
        <div className="absolute inset-x-7 top-20 h-px bg-white/35" />
        <div className="absolute inset-x-7 top-26 h-px bg-white/30" />
      </div>
    );
  }

  if (art === "window") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-[inherit] bg-linear-to-br from-[#f5d0df] via-[#fff7ea] to-[#fffdf8] p-3">
        <div className="rounded-[1.4rem] border border-white/70 bg-white/70 p-3 shadow-inner shadow-[#f0d5c5]">
          <div className="mb-3 flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff8e7b]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffd56a]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#8fd28f]" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="aspect-[1.2] rounded-2xl bg-[#ffd6cc]" />
            <div className="aspect-[1.2] rounded-2xl bg-[#d6e7ff]" />
            <div className="aspect-[1.2] rounded-2xl bg-[#fff2b4]" />
            <div className="aspect-[1.2] rounded-2xl bg-[#ffd8ef]" />
          </div>
        </div>
      </div>
    );
  }

  if (art === "record") {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[inherit] bg-linear-to-br from-[#f0e282] via-[#d5c555] to-[#f8efbc]">
        <div className="absolute h-[72%] w-[72%] rounded-full bg-[#5d551f]/18" />
        <div className="absolute h-[54%] w-[54%] rounded-full bg-[#6c6325]/18" />
        <div className="absolute h-[20%] w-[20%] rounded-full bg-white/70" />
        <div className="absolute h-[7%] w-[7%] rounded-full bg-[#8b7b27]" />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[inherit] bg-linear-to-br from-[#fff4ca] via-[#fffdf0] to-[#ffffff] p-5">
      <div className="absolute inset-x-5 top-8 h-px bg-[#7a654f]/30" />
      <div className="absolute inset-x-5 top-14 h-px bg-[#7a654f]/18" />
      <div className="absolute inset-x-5 top-20 h-px bg-[#7a654f]/18" />
      <div className="absolute inset-x-5 top-26 h-px bg-[#7a654f]/18" />
      <div className="absolute right-8 top-7 h-14 w-0.5 rotate-12 bg-[#4a6ca4]/60" />
    </div>
  );
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden px-6 pb-16 pt-24 sm:pt-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[14%] h-48 w-48 rounded-full bg-[rgba(247,248,174,0.5)] blur-3xl" />
        <div className="absolute right-[10%] top-[18%] h-56 w-56 rounded-full bg-[rgba(93,181,255,0.22)] blur-3xl" />
        <div className="absolute bottom-[10%] left-[28%] h-52 w-52 rounded-full bg-[rgba(255,210,199,0.28)] blur-3xl" />
      </div>

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
              className="text-3xl font-bold leading-none text-ink sm:text-7xl"
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
            {COLLAGE_ITEMS.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className={`group relative block ${item.mobileSpan}`}
                initial={{ opacity: 0, y: 24, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{
                  duration: 0.65,
                  delay: 0.18 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={`relative aspect-[4/4.2] overflow-hidden border border-white/70 bg-linear-to-br ${item.tone} ${item.frame} p-3`}
                >
                  <CardArt art={item.art} />
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="font-sans text-xs uppercase tracking-[0.24em] text-subtle">
                    {item.title}
                  </span>
                  <span className="font-sans text-[11px] text-muted">Open</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="relative hidden min-h-[29.33rem] lg:block">
          {COLLAGE_ITEMS.map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              className={`group absolute block ${item.desktopPosition}`}
              initial={{ opacity: 0, y: 36, rotate: item.floatRotate[0] }}
              animate={
                shouldReduceMotion
                  ? { opacity: 1, y: 0, rotate: item.floatRotate[0] }
                  : {
                      opacity: 1,
                      y: item.floatY,
                      rotate: item.floatRotate,
                    }
              }
              transition={
                shouldReduceMotion
                  ? {
                      duration: 0.7,
                      delay: 0.18 + index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }
                  : {
                      opacity: {
                        duration: 0.7,
                        delay: 0.18 + index * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      y: {
                        repeat: Infinity,
                        duration: item.duration,
                        ease: "easeInOut",
                      },
                      rotate: {
                        repeat: Infinity,
                        duration: item.duration,
                        ease: "easeInOut",
                      },
                    }
              }
              whileHover={{ y: -18, rotate: 0, scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`relative aspect-8/9 overflow-hidden border border-white/70 bg-linear-to-br ${item.tone} ${item.frame} p-4 transition-shadow duration-300 group-hover:shadow-[0_30px_80px_rgba(20,30,45,0.18)]`}
              >
                <CardArt art={item.art} />
              </div>
              <div className="pointer-events-none absolute left-1/2 top-full mt-3 w-max -translate-x-1/2 rounded-full border border-border/70 bg-paper/90 px-2.5 py-1 text-center opacity-0 shadow-lg shadow-[rgba(20,30,45,0.08)] backdrop-blur-md transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="font-sans text-[7px] uppercase tracking-[0.16em] text-subtle">
                  {item.title}
                </p>
                <p className="mt-0.5 font-sans text-[7px] text-muted">
                  {item.subtitle}
                </p>
              </div>
            </motion.a>
          ))}

          <motion.div
            className="absolute left-1/2 top-1/2 z-10 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 px-6 text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-5 font-sans text-[11px] uppercase tracking-[0.42em] text-subtle">
              Design Engineer
            </p>
            <h1
              className="text-[clamp(4.25rem,10vw,7.25rem)] font-bold leading-[0.92] text-ink"
              style={{ fontFamily: '"Cedarville Cursive", cursive' }}
            >
              Kaylin Pham
            </h1>
            <p
              className="mx-auto mt-6 max-w-xl text-base leading-8 text-subtle"
              style={{ fontFamily: '"Geist Mono", monospace' }}
            >
              {INTRO}
            </p>
            <p className="mt-5 font-sans text-xs uppercase tracking-[0.28em] text-muted">
              Hover a piece to peek around. Click one to jump in.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
