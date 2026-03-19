"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const EMAIL = "kaylin.renee.pham@gmail.com";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/kaylinmpham",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/kaylinpham",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Read.cv",
    href: "https://read.cv/kaylinpham", // replace with yours
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10,9 9,9 8,9" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  }

  return (
    <section id="contact" className="py-section px-6 max-w-5xl mx-auto">
      {/* Divider */}
      <div className="w-full h-px bg-border mb-16" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-12"
      >
        {/* Left: headline + CTA */}
        <div className="max-w-md">
          <p className="font-sans text-xs uppercase tracking-widest text-mid mb-3">
            04 — Contact
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-ink tracking-tight leading-tight mb-6">
            Let&apos;s make{" "}
            <em className="not-italic text-accent">something</em> together.
          </h2>
          <p className="font-sans text-sm text-mid leading-relaxed mb-8">
            I&apos;m open to full-time roles, freelance projects, and
            conversations about design engineering, front-end craft, or building
            great things in general.
          </p>

          {/* Email CTA */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={handleCopyEmail}
              className="
                inline-flex items-center gap-2
                px-6 py-3
                bg-ink text-paper
                font-sans text-sm font-medium
                hover:bg-ink/80
                transition-colors duration-300
              "
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    ✓ Copied!
                  </motion.span>
                ) : (
                  <motion.span
                    key="email"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {EMAIL}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <a
              href={`mailto:${EMAIL}`}
              className="
                inline-flex items-center gap-1.5
                px-4 py-3
                border border-ink/20 text-mid
                font-sans text-sm
                hover:border-ink/50 hover:text-ink
                transition-all duration-300
              "
              aria-label="Send email"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Open mail
            </a>
          </div>
        </div>

        {/* Right: social links */}
        <div className="flex flex-col gap-3">
          {SOCIAL_LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-mid hover:text-ink group transition-colors duration-300"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ x: 4 }}
            >
              <span className="text-dim group-hover:text-accent transition-colors duration-300">
                {link.icon}
              </span>
              <span className="font-sans text-sm">{link.label}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-1 group-hover:translate-x-0 transition-transform"
              >
                <line x1="7" y1="17" x2="17" y2="7"/>
                <polyline points="7 7 17 7 17 17"/>
              </svg>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="mt-20 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <p className="font-sans text-xs text-dim">
          © {new Date().getFullYear()} Kaylin Pham. Designed &amp; built by me.
        </p>
        <p className="font-sans text-xs text-dim">
          Next.js · Tailwind CSS · Motion · GSAP
        </p>
      </motion.footer>
    </section>
  );
}
