"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CodeXml,
  FileText,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const EMAIL = "kaylin.renee.pham@gmail.com";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/kaylinmpham",
    icon: <CodeXml size={18} aria-hidden="true" />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/kaylinpham",
    icon: <BriefcaseBusiness size={18} aria-hidden="true" />,
  },
  {
    label: "Resumé",
    href: "/resume.pdf",
    icon: <FileText size={18} aria-hidden="true" />,
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
        <div className="max-w-xl">
          <p className="font-sans text-xs uppercase tracking-widest text-subtle mb-3">
            Contact
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink tracking-tight leading-tight mb-6">
            Open to
            <br />
            <em className="not-italic text-ink">frontend &amp; </em>
            <em className="not-italic text-ink">product design </em>
            <br />
            opportunities.
          </h2>
          <p className="font-sans text-xs text-subtle leading-relaxed mb-8">
            Full-time, contract, and product-focused collaborations welcome.
          </p>

          {/* Email CTA */}
          <div className="flex items-center gap-3">
            <Button variant="accent" size="sm" onClick={handleCopyEmail}>
              <span className="grid">
                <span
                  className="invisible col-start-1 row-start-1 justify-start"
                  aria-hidden="true"
                >
                  {EMAIL}
                </span>
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="copied"
                      className="col-start-1 row-start-1 flex"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      Copied!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="email"
                      className="col-start-1 row-start-1 flex"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      {EMAIL}
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </Button>

            <Button variant="highlight" size="sm" asChild noMotion>
              <a href={`mailto:${EMAIL}`} aria-label="Send email">
                <Mail size={14} aria-hidden="true" />
                Open mail
              </a>
            </Button>
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
              className="flex items-center gap-3 text-subtle hover:text-ink group transition-colors duration-300"
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
              <span className="text-muted group-hover:text-accent transition-colors duration-300">
                {link.icon}
              </span>
              <span className="font-sans text-xs">{link.label}</span>
              <ArrowUpRight
                size={12}
                aria-hidden="true"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-1 group-hover:translate-x-0"
              />
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
        <p className="font-sans text-xs text-muted">
          © 2026 Kaylin Pham. Designed &amp; built by me.
        </p>
        <p className="font-sans text-xs text-muted">
          Next.js · Tailwind CSS · Motion · GSAP
        </p>
      </motion.footer>
    </section>
  );
}
