"use client";

import { motion } from "motion/react";
import { Button } from "../ui/Button";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/mint-condition/einkjpadmpkeaifhbbhiidohjmfdllip";

const tags = ["Chrome Extension", "Product Design", "Frontend", "UX Research"];

export default function Projects({
  onOpenCaseStudy,
}: {
  onOpenCaseStudy?: () => void;
} = {}) {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-section">
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-subtle">
          Featured work
        </p>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <Button variant="outline" size="sm" asChild noMotion>
            <a
              href="/case-studies/mint-condition"
              onClick={
                onOpenCaseStudy
                  ? (event) => {
                      event.preventDefault();
                      onOpenCaseStudy();
                    }
                  : undefined
              }
            >
              Read case study
            </a>
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
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_11rem] lg:items-start">
          <div className="w-full min-w-0 pr-1 lg:flex lg:min-h-44 lg:flex-col lg:justify-between">
            <div className="space-y-4">
              <h2 className="font-sligoil whitespace-nowrap text-[clamp(3.1rem,4vw,5.4rem)] leading-[0.72] tracking-[-0.04em] text-ink">
                Mint Condition
              </h2>

              <p className="max-w-none font-sans text-sm leading-relaxed text-subtle sm:text-[0.88rem] lg:text-[0.96rem]">
                A Chrome extension that helps shoppers discover secondhand
                alternatives while they&apos;re already browsing, turning
                sustainability into an in-context decision instead of an extra
                step.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 lg:mt-0">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2.5 py-1 font-sans text-[9px] uppercase tracking-[0.12em] text-subtle"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto h-64 w-64 overflow-hidden rounded-[14px] sm:h-80 sm:w-80 lg:mx-0 lg:h-44 lg:w-44 lg:justify-self-end">
            <img
              src="/icons/mint-condition.PNG"
              alt="Mint Condition app icon"
              className="h-full w-full max-w-full object-contain object-center"
            />
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[14px] border border-border bg-white/10 p-3">
            <span className="mb-1.5 block font-sans text-[9px] uppercase tracking-[0.14em] text-subtle">
              Problem
            </span>
            <p className="font-sans text-[0.86rem] leading-relaxed text-ink">
              Sustainable shopping often requires leaving the page and doing
              extra research, which breaks the flow at the exact moment someone
              decides.
            </p>
          </div>

          <div className="rounded-[14px] border border-border bg-white/10 p-3">
            <span className="mb-1.5 block font-sans text-[9px] uppercase tracking-[0.14em] text-subtle">
              Solution
            </span>
            <p className="font-sans text-[0.86rem] leading-relaxed text-ink">
              Mint Condition surfaces secondhand alternatives directly in the
              shopping experience, making better options feel quick and obvious.
            </p>
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
