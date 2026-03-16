"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const HEADLINE = "Design Engineer.";
const SUBLINE = "Creative Engineer bridging aesthetic design and technical feasibility. Experienced in architecting high-fidelity prototypes and scalable interfaces with TypeScript and Remix. Focused on translating complex requirements into accessible component libraries to optimize design-to-development workflows.";

/** Stagger each word in from below with a slight blur */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.4,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const headlineWords = HEADLINE.split(" ");
  const sublineWords = SUBLINE.split(" ");

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center px-6 pt-28 pb-20 max-w-5xl mx-auto"
    >
      {/* Decorative earthy circles — parallax */}
      <motion.div
        style={{ y: parallaxY }}
        className="pointer-events-none absolute right-0 top-1/4 w-72 h-72 rounded-full bg-sand/60 blur-3xl -z-10"
        aria-hidden="true"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 40]) }}
        className="pointer-events-none absolute left-1/4 bottom-1/3 w-48 h-48 rounded-full bg-sage/20 blur-3xl -z-10"
        aria-hidden="true"
      />

      <motion.div style={{ opacity }}>
        {/* Eyebrow */}
        <motion.p
          className="font-sans text-sm uppercase tracking-widest text-warm-gray mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Kaylin Pham
        </motion.p>

        {/* Primary headline — word stagger */}
        <motion.h1
          className="font-serif text-5xl sm:text-7xl lg:text-8xl text-espresso leading-[1.05] tracking-tight mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label={HEADLINE}
        >
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subline — word stagger, delayed */}
        <motion.p
          className="font-sans text-lg sm:text-xl text-warm-gray max-w-xl leading-relaxed mb-12"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.04, delayChildren: 1.0 },
            },
          }}
          initial="hidden"
          animate="visible"
          aria-label={SUBLINE}
        >
          {sublineWords.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
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
              px-6 py-3 rounded-full
              bg-terracotta text-cream
              font-sans text-sm font-medium
              hover:bg-terracotta-dark
              transition-colors duration-300
            "
          >
            View my work
          </a>
          <a
            href="#contact"
            className="
              inline-flex items-center gap-2
              px-6 py-3 rounded-full
              border border-espresso/20 text-espresso
              font-sans text-sm font-medium
              hover:border-espresso/50
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
        <span className="font-sans text-xs uppercase tracking-widest text-warm-gray-lighter">
          scroll
        </span>
        <motion.div
          className="w-px h-8 bg-warm-gray-lighter origin-top"
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
