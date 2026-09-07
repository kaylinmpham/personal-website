"use client";

import Image from "next/image";
import { motion } from "motion/react";

const INTRO =
  "Design engineer obsessed with aesthetics, human-feel, and crisp micro-interactions. Turning solid code and imaginative ideas into thoughtful, accessible web pages.";

type IconItem = {
  title: string;
  subtitle: string;
  href: string;
  art: "folder" | "window" | "record" | "note" | "headshot" | "books" | "pdf";
};

const ICON_ITEMS: IconItem[] = [
  {
    title: "Me",
    subtitle: "So you can put a face to the name",
    href: "#about",
    art: "headshot",
  },
  {
    title: "Experience",
    subtitle: "Teams & roles",
    href: "#experience",
    art: "folder",
  },
  {
    title: "Projects",
    subtitle: "Featured work",
    href: "#projects",
    art: "window",
  },
  {
    title: "Resume",
    subtitle: "PDF overview",
    href: "/resume.pdf",
    art: "pdf",
  },
  {
    title: "Now",
    subtitle: "What I'm up to",
    href: "#now",
    art: "record",
  },
  {
    title: "Contact",
    subtitle: "Let's connect",
    href: "#contact",
    art: "note",
  },
];

function IconCircle({ art }: { art: IconItem["art"] }) {
  const imageMap = {
    folder: "/icons/folder.PNG",
    window: "/icons/mint-condition.PNG",
    record: "/icons/record.PNG",
    note: "/icons/flip-phone.PNG",
    headshot: "/icons/head-shot.PNG",
    books: "/icons/books.PNG",
    pdf: "/icons/resume-preview.png",
  };

  const offsetMap = {
    headshot: "translate-x-[2px]",
    folder: "translate-x-[-1px]",
    window: "translate-x-[-5px]",
    pdf: "translate-x-[5px]",
    record: "translate-x-0",
    note: "translate-x-[4px]",
    books: "translate-x-0",
  };

  return (
    <Image
      src={imageMap[art]}
      alt=""
      width={80}
      height={80}
      className={`h-20 w-20 object-contain ${offsetMap[art]}`}
    />
  );
}

export default function Hero() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center px-6 pb-8 pt-20"
    >
      {/* Floating accent marks */}
      <div className="pointer-events-none absolute left-[10%] top-[20%] rotate-[-15deg] font-cursive text-2xl text-muted opacity-15">
        ✦
      </div>
      <div className="pointer-events-none absolute right-[12%] top-[30%] rotate-12 font-cursive text-2xl text-muted opacity-15">
        ✦
      </div>
      <div className="pointer-events-none absolute bottom-[15%] left-[15%] rotate-[8deg] font-cursive text-2xl text-muted opacity-15">
        ✦
      </div>

      <motion.div
        className="w-full max-w-5xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Header */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h1
            className="mb-4 px-4 py-2 text-[clamp(3.5rem,8vw,6.5rem)] leading-[1.3] text-ink"
            style={{
              fontFamily: '"Cedarville Cursive", cursive',
            }}
          >
            Kaylin Pham
          </h1>
          <p className="mb-2 font-sans text-[0.72rem] lowercase tracking-[0.08em] text-muted">
            product designer + frontend engineer
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-subtle"
          style={{ fontFamily: '"Geist Mono", monospace' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {INTRO}
        </motion.p>

        {/* Icon Grid */}
        <motion.div
          className="mx-auto grid max-w-4xl grid-cols-2 justify-items-center gap-6 sm:grid-cols-3 lg:grid-cols-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {ICON_ITEMS.map((item, index) => (
            <motion.a
              key={item.href + item.title}
              href={item.href}
              className="group relative flex w-full flex-col items-center gap-3 rounded-lg px-2 py-6 text-center"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.4 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.1, transition: { duration: 0 } }}
            >
              <IconCircle art={item.art} />
              <div>
                <div className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-subtle">
                  {item.title}
                </div>
                <div className="mt-1 font-sans text-[0.625rem] text-muted">
                  {item.subtitle}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
