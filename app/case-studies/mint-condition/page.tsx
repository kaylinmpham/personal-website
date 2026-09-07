"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

const slides = [
  {
    label: "Problem",
    title: "Sustainable shopping breaks at the exact moment of intent.",
    body: "People find the product they want, feel the momentum, and then hit a wall. The sustainable option requires leaving the page, opening a new tab, comparing prices, and doing extra research. By the time they decide to change path, the original decision is already gone.",
  },
  {
    label: "Opportunity",
    title:
      "The better decision needs to appear where the decision is already happening.",
    body: "The real opportunity was not to lecture people about sustainability. It was to make the better choice feel obvious in the exact moment they were deciding. That meant bringing secondhand discovery into the shopping flow instead of asking people to take a separate detour.",
  },
  {
    label: "User behavior",
    title:
      "Shoppers do not want more friction. They want clarity and momentum.",
    body: "People are not searching for sustainability in a vacuum. They are already in a familiar shopping flow. The design needed to fit that pattern without interrupting it: visible, quick to scan, and easy to act on.",
  },
  {
    label: "Interaction model",
    title: "A side panel gave alternatives context without stealing the page.",
    body: "I tested a few patterns before landing on the in-context panel. The key was to show a secondhand alternative next to the main product without taking attention away from the purchase decision. It felt like a helpful recommendation, not a preachy intervention.",
  },
  {
    label: "Design decisions",
    title: "The interface stays calm, useful, and easy to understand.",
    body: "The system leans toward strong hierarchy, simple language, and low cognitive load. The product does not ask for a moral decision. It simply makes the better option feel natural, useful, and immediately actionable.",
  },
  {
    label: "Outcome",
    title:
      "Better secondhand discovery becomes part of the shopping experience itself.",
    body: "The result is a product that surfaces alternatives in context, keeps momentum intact, and reframes sustainable shopping as an obvious, low-friction decision. The user sees the option, understands the value, and can keep moving without losing the thread of intent.",
  },
];

export default function MintConditionCaseStudyPage() {
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const updateActiveSection = () => {
      const viewportMidpoint = window.innerHeight * 0.45;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      sectionRefs.current.forEach((section, index) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - viewportMidpoint);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <main className="mx-auto max-w-300 px-6 py-16 sm:py-20">
      <div className="mb-10">
        <Link
          href="/"
          className="font-sans text-xs uppercase tracking-[0.2em] text-subtle hover:text-ink"
        >
          ← Back to portfolio
        </Link>
      </div>

      <section className="rounded-[28px] border border-border bg-[#f2f0ec] p-5 sm:p-7 lg:p-8">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,0.6fr)] lg:items-center">
          <div className="min-w-0">
            <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.19em] text-subtle">
              Featured work
            </p>

            <h1 className="mb-3 font-sligoil text-[2.5rem] leading-[0.92] tracking-[-0.035em] text-ink sm:text-[3.2rem] lg:text-[4.4rem] lg:whitespace-nowrap">
              Mint Condition
            </h1>

            <p className="font-sans text-[0.96rem] leading-relaxed text-subtle sm:text-[1rem]">
              A Chrome extension that helps shoppers discover secondhand
              alternatives while they&apos;re already browsing, turning
              sustainability into an in-context decision instead of an extra
              step.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-border px-3 py-1.5 font-sans text-[9px] uppercase tracking-[0.12em] text-subtle">
                Chrome Extension
              </span>
              <span className="rounded-full border border-border px-3 py-1.5 font-sans text-[9px] uppercase tracking-[0.12em] text-subtle">
                Product Design
              </span>
              <span className="rounded-full border border-border px-3 py-1.5 font-sans text-[9px] uppercase tracking-[0.12em] text-subtle">
                Frontend
              </span>
              <span className="rounded-full border border-border px-3 py-1.5 font-sans text-[9px] uppercase tracking-[0.12em] text-subtle">
                UX Research
              </span>
            </div>
          </div>

          <div className="mx-auto aspect-square w-full max-w-64 overflow-hidden rounded-[20px] lg:max-w-56">
            <img
              src="/icons/mint-condition.PNG"
              alt="Mint Condition logo"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white/10 p-4">
            <span className="mb-2 block font-sans text-[10px] uppercase tracking-[0.14em] text-subtle">
              Problem
            </span>
            <p className="font-sans text-[0.98rem] leading-relaxed text-ink">
              Sustainable shopping often requires leaving the page and doing
              extra research, which breaks the flow at the exact moment someone
              decides.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-white/10 p-4">
            <span className="mb-2 block font-sans text-[10px] uppercase tracking-[0.14em] text-subtle">
              Solution
            </span>
            <p className="font-sans text-[0.98rem] leading-relaxed text-ink">
              Mint Condition surfaces secondhand alternatives directly in the
              shopping experience, making better options feel quick and obvious.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white/10 p-4 sm:p-5">
            <strong className="mb-2 block font-sans text-[8px] uppercase tracking-[0.16em] text-subtle">
              Role
            </strong>
            <p className="font-sans leading-relaxed text-subtle">
              Product design and frontend implementation, from concept to
              production.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-white/10 p-4 sm:p-5">
            <strong className="mb-2 block font-sans text-[8px] uppercase tracking-[0.16em] text-subtle">
              Tools
            </strong>
            <p className="font-sans leading-relaxed text-subtle">
              Chrome APIs, JavaScript, Cloudflare Workers, product prototyping.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-white/10 p-4 sm:p-5">
            <strong className="mb-2 block font-sans text-[8px] uppercase tracking-[0.16em] text-subtle">
              Outcome
            </strong>
            <p className="font-sans leading-relaxed text-subtle">
              Built and launched an in-context shopping experience for better
              secondhand discovery.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-hidden rounded-[22px] border border-border bg-white/5">
          <video
            className="h-full w-full object-cover"
            src="/Mint Demo.mov"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        <div className="overflow-hidden rounded-[22px] border border-border bg-white/5">
          <img
            src="/mockups/hero-context.webp"
            alt="Mint Condition product context preview"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="mt-16 space-y-5">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <article
              key={slide.label}
              data-index={index}
              ref={(node) => {
                sectionRefs.current[index] = node;
              }}
              className="scroll-mt-24"
            >
              <div className="grid gap-6 lg:grid-cols-[180px_minmax(0,1fr)] lg:items-start">
                <div className="pt-2 lg:sticky lg:top-20">
                  <p
                    className={`font-sans text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                      isActive ? "text-ink" : "text-muted/60"
                    }`}
                  >
                    {slide.label}
                  </p>
                </div>

                <div
                  className={`rounded-[22px] border p-5 sm:p-6 transition-colors duration-300 ${
                    isActive
                      ? "border-border bg-white/10 shadow-[0_0_0_1px_rgba(31,28,26,0.04)]"
                      : "border-border/60 bg-white/5 opacity-80"
                  }`}
                >
                  <h2
                    className={`font-sligoil text-[1.55rem] leading-[1.1] sm:text-[1.95rem] transition-colors duration-300 ${
                      isActive ? "text-ink" : "text-ink/70"
                    }`}
                  >
                    {slide.title}
                  </h2>
                  <p
                    className={`mt-4 w-full font-sans text-base leading-relaxed transition-colors duration-300 ${
                      isActive ? "text-subtle" : "text-subtle/75"
                    }`}
                  >
                    {slide.body}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <div className="mt-12 flex flex-wrap gap-3">
        <Button variant="highlight" size="sm" asChild noMotion>
          <a
            href="https://chromewebstore.google.com/detail/mint-condition/einkjpadmpkeaifhbbhiidohjmfdllip"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Chrome Web Store
          </a>
        </Button>
        <Button variant="outline" size="sm" asChild noMotion>
          <Link href="/#projects">Back to home</Link>
        </Button>
      </div>
    </main>
  );
}
