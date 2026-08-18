"use client";

import { motion } from "motion/react";
import { Button } from "../ui/Button";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/mint-condition/einkjpadmpkeaifhbbhiidohjmfdllip";

const tags = ["Chrome Extension", "Product Design", "Frontend", "UX Research"];

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-[1200px] px-6 py-section">
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-subtle">
          Featured work
        </p>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <Button variant="outline" size="sm" asChild noMotion>
            <a href="/case-studies/mint-condition">Read case study</a>
          </Button>
          <Button variant="highlight" size="sm" asChild noMotion>
            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Mint Condition on the Chrome Web Store"
            >
              Chrome Web Store ↗
            </a>
          </Button>
        </div>
      </div>

      <div className="rounded-[26px] border border-border bg-[#f2f0ec] p-4 sm:p-5 lg:p-6">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.7fr)_minmax(220px,0.8fr)] lg:items-center">
          <div className="min-w-0 space-y-4 pr-1">
            <h2 className="font-sligoil whitespace-nowrap text-[clamp(3.1rem,4vw,5.4rem)] leading-[0.72] tracking-[-0.04em] text-ink">
              Mint Condition
            </h2>

            <p className="max-w-[38rem] font-sans text-sm leading-relaxed text-subtle sm:text-[0.88rem] lg:text-[0.96rem]">
              A Chrome extension that helps shoppers discover secondhand
              alternatives while they&apos;re already browsing, turning
              sustainability into an in-context decision instead of an extra
              step.
            </p>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2.5 py-1 font-sans text-[9px] uppercase tracking-[0.12em] text-subtle"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[14px] border border-border bg-white/10 p-3">
                <span className="mb-1.5 block font-sans text-[9px] uppercase tracking-[0.14em] text-subtle">
                  Problem
                </span>
                <p className="font-sans text-[0.86rem] leading-relaxed text-ink">
                  Sustainable shopping often requires leaving the page and doing
                  extra research, which breaks the flow at the exact moment
                  someone decides.
                </p>
              </div>

              <div className="rounded-[14px] border border-border bg-white/10 p-3">
                <span className="mb-1.5 block font-sans text-[9px] uppercase tracking-[0.14em] text-subtle">
                  Solution
                </span>
                <p className="font-sans text-[0.86rem] leading-relaxed text-ink">
                  Mint Condition surfaces secondhand alternatives directly in
                  the shopping experience, making better options feel quick and
                  obvious.
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex h-[290px] w-full items-center justify-end overflow-hidden rounded-[14px] pl-0 sm:h-80 lg:h-[22rem] lg:pl-0">
            <img
              src="/icons/mint-condition.PNG"
              alt="Mint Condition app icon"
              className="h-full w-auto max-w-[420px] object-contain"
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-5 grid gap-3 md:grid-cols-3"
        >
          <div className="rounded-[14px] border border-border bg-white/10 p-3 sm:p-4">
            <strong className="mb-1.5 block font-sans text-[9px] uppercase tracking-[0.15em] text-subtle">
              Role
            </strong>
            <p className="font-sans text-[0.8rem] leading-relaxed text-subtle">
              Product design and frontend implementation, from concept to
              production.
            </p>
          </div>

          <div className="rounded-[14px] border border-border bg-white/10 p-3 sm:p-4">
            <strong className="mb-1.5 block font-sans text-[9px] uppercase tracking-[0.15em] text-subtle">
              Tools
            </strong>
            <p className="font-sans text-[0.8rem] leading-relaxed text-subtle">
              Chrome APIs, JavaScript, Cloudflare Workers, product prototyping.
            </p>
          </div>

          <div className="rounded-[14px] border border-border bg-white/10 p-3 sm:p-4">
            <strong className="mb-1.5 block font-sans text-[9px] uppercase tracking-[0.15em] text-subtle">
              Outcome
            </strong>
            <p className="font-sans text-[0.8rem] leading-relaxed text-subtle">
              Built and launched an in-context shopping experience for better
              secondhand discovery.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
