"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const HEADLINE = "Design Engineer.";
const SUBLINE = "Creative Engineer bridging aesthetic design and technical feasibility. Experienced in architecting high-fidelity prototypes and scalable interfaces with TypeScript and Remix. Focused on translating complex requirements into accessible component libraries to optimize design-to-development workflows.";

/** Stagger each word up through an overflow-hidden mask */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.4,
    },
  },
};

const wordVariants = {
  hidden: { y: "115%" },
  visible: {
    y: "0%",
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const headlineWords = HEADLINE.split(" ");
  const sublineWords = SUBLINE.split(" ");

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center px-6 pt-28 pb-20 max-w-5xl mx-auto"
    >
      <motion.div style={{ opacity }}>
        {/* Eyebrow */}
        <motion.p
          className="font-sans text-sm uppercase tracking-widest text-mid mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Kaylin Pham
        </motion.p>

        {/* Primary headline — word reveal */}
        <motion.h1
          className="font-display align-middle font-bold text-5xl sm:text-7xl lg:text-8xl text-ink leading-[1.05] tracking-tight mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label={HEADLINE}
        >
          {headlineWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-[0.15em] -mb-[0.15em]">
              <motion.span variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Subline — word reveal, delayed */}
        <motion.p
          className="font-sans text-lg sm:text-xl text-mid max-w-xl leading-relaxed mb-12"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.03, delayChildren: 1.0 },
            },
          }}
          initial="hidden"
          animate="visible"
          aria-label={SUBLINE}
        >
          {sublineWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-[0.1em] -mb-[0.1em]">
              <motion.span variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
            </span>
          ))}
        </motion.p>

        {/* CTA row */}
        <motion.div
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <a
            href="#experience"
            className="
              inline-flex items-center gap-2
              px-6 py-3
              bg-accent text-paper
              font-sans text-sm font-medium
              hover:bg-accent-dark
              transition-colors duration-300
            "
          >
            Jump to experience
          </a>
          <a
            href="#contact"
            className="
              inline-flex items-center gap-2
              px-6 py-3
              border border-ink/20 text-ink
              font-sans text-sm font-medium
              hover:border-ink/50
              transition-colors duration-300
            "
          >
            Get in touch
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="font-sans text-xs uppercase tracking-widest text-dim">
          scroll
        </span>
        <motion.div
          className="w-px h-8 bg-dim origin-top"
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
