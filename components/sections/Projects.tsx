"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

// ─── Data ──────────────────────────────────────────────────────────────────────

const GOALS = [
  "Easy-to-use solution that intercepts fashion browsing and surfaces secondhand eBay alternatives without disrupting the user's existing flow.",
  "Scalable architecture: new listing sources (Depop, Vinted, ThredUp) are a data-layer change, not an extension change.",
  "Solution that integrates seamlessly into the browser with no new-tab friction at the moment of purchase decision.",
  "Design system built on semantic tokens so visual reskins don't require touching component logic.",
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery",
    desc: 'Mapped the "intent-drop" moment in fashion browsing to identify where users lose interest in sustainable alternatives.',
  },
  {
    step: "02",
    title: "Analysis",
    desc: "Audited industry data sources like Good On You and researched Chrome MV3 constraints to ensure technical viability.",
  },
  {
    step: "03",
    title: "Ideation",
    desc: "Leveraged Figma for low-fidelity whiteboarding and rapid prototyping to translate research notes into actionable user flow mockups.",
  },
  {
    step: "04",
    title: "UI Architecture",
    desc: "Developed a scalable system of semantic tokens, side-panel layouts, and intuitive metaphors for sustainability communication.",
  },
  {
    step: "05",
    title: "UX Optimization",
    desc: "Refined the visual identity and used CSS animations to improve perceived performance and ensure a native-feeling experience.",
  },
  {
    step: "06",
    title: "Engineering",
    desc: "Built the technical core using Vanilla JS and Cloudflare Workers for a lightweight, high-performance extension architecture.",
  },
  {
    step: "07",
    title: "Launch",
    desc: "Deploy to the Chrome Web Store to provide users with real-time, actionable alternatives while browsing fast-fashion sites.",
    muted: true,
  },
];

const DISCOVERY = [
  {
    label: "The Friction",
    text: 'Identified that the need to open a new tab to check eBay breaks the user\'s "Golden Path," causing them to abandon their secondhand intent at the peak of interest.',
  },
  {
    label: "The Insight",
    text: 'Realized that a sustainability score is a "dead-end" insight. It informs the user a brand is unethical but fails to provide a constructive way forward.',
  },
  {
    label: "The Intervention",
    text: "Pivoted the strategy to bring ethical alternatives directly to the brand's product page, turning a static rating into an actionable choice.",
  },
];

const ANALYSIS = [
  {
    title: "Manual Resale",
    prefix: "The Friction",
    text: 'High-effort and context-blind. Requires users to manually initiate searches and switch tabs, breaking the "purchase flow" at the peak of intent.',
    highlight: false,
  },
  {
    title: "Savings Assistants",
    prefix: "The Friction",
    text: "Transaction-focused. Optimized for coupons and retail-to-retail price comparisons with no integration for circular economy or ethical sourcing.",
    highlight: false,
  },
  {
    title: "Ethical Aggregators",
    prefix: "The Friction",
    text: 'Brand-centric redirection. Successfully suggests more ethical companies but typically encourages "buying new" rather than solving circularity for the specific item at hand.',
    highlight: false,
  },
  {
    title: "Mint Condition",
    prefix: "The Solution",
    text: "Retail-to-Resale Circularity. Detects brand context via DOM to surface ethical scores and direct eBay alternatives in-context (zero tab switching).",
    highlight: true,
  },
];

const IDEATION = [
  {
    title: "Popup on product page",
    desc: "A floating overlay that appears when a supported brand is detected. Familiar pattern but interrupts the browsing session.",
    chosen: false,
  },
  {
    title: "New tab redirect",
    desc: "Auto-opens an eBay search in a new tab on click. Fast to build, but defeats the purpose — tab-switching is the problem being solved.",
    chosen: false,
  },
  {
    title: "Side panel",
    desc: "A persistent side panel that opens alongside the current page. Zero interruption. User stays in context.",
    chosen: true,
  },
];

const SOLUTION_STEPS = [
  {
    num: "01",
    title: "Brand Detection",
    desc: "Content script reads the DOM and URL to identify the brand. Fires a message to the background service worker on detection.",
  },
  {
    num: "02",
    title: "Edge-Proxied Data Fetch",
    desc: "Background worker queries a Cloudflare Worker, which pulls a sustainability score from KV and proxies an eBay search. API keys stay off the client. Results are cached in local storage so that revisiting a brand costs zero network requests.",
  },
  {
    num: "03",
    title: "Side Panel Renders",
    desc: "Combined payload is pushed to the side panel via Chrome's message API. Renders a tier-colored score and a 2-column grid of secondhand listings, filtered to the user's saved sizes.",
  },
];

const TECH_STACK = [
  {
    layer: "[ 01 ] Client Layer",
    items: [
      {
        title: "Frontend",
        bullets: [
          "HTML5, CSS3, JavaScript (ES6+)",
          "Google Fonts: DM Sans, Instrument Serif",
        ],
      },
      {
        title: "Browser Extension",
        bullets: [
          "Chrome Extension, Manifest V3",
          "Content Scripts, Service Worker, Side Panel",
          "Chrome Storage and Runtime Messaging APIs",
        ],
      },
    ],
  },
  {
    layer: "[ 02 ] Cloud Layer",
    items: [
      {
        title: "Backend / Cloud",
        bullets: [
          "Cloudflare Workers (serverless edge compute)",
          "Cloudflare KV (distributed key-value caching)",
          "Wrangler CLI (deployment and local dev)",
        ],
      },
      {
        title: "Runtime & Tooling",
        bullets: ["Node.js 18+", "ES Modules, npm package management"],
      },
    ],
  },
  {
    layer: "[ 03 ] Data Layer",
    items: [
      {
        title: "External APIs",
        bullets: [
          "eBay Browse API v1 — secondhand product search, text and image-based, OAuth 2.0",
          "WikiRate Open API — sustainability brand data",
        ],
      },
      {
        title: "Data Sources",
        bullets: [
          "Fashion Transparency Index (FTI): 250+ brands",
          "What Fuels Fashion 2025 (WFF): 200+ brands",
        ],
      },
    ],
  },
];

const RESULTS = [
  {
    label: "Frictionless by design",
    text: "Activates automatically on a supported brand's product page — no clicks, no new tabs, no context switch.",
  },
  {
    label: "Scalable data layer",
    text: "Adding Depop, Vinted, or ThredUp is a Cloudflare Worker data change, not an extension update.",
  },
  {
    label: "Native Chrome integration",
    text: "Built on the Side Panel API with minimal permissions and no UI injection into host pages.",
  },
  {
    label: "Stateful without a framework",
    text: "Size preferences persist across sessions via chrome.storage.local, correctly handling the MV3 service worker lifecycle.",
  },
];

const FUTURE = [
  {
    label: "Vite + TypeScript migration",
    text: "Typed message contracts between the three execution contexts catch mismatched payloads at compile time instead of silently at runtime.",
  },
  {
    label: "Multi-platform listings",
    text: "Depop, Vinted, ThredUp, etc as optional alternatives.",
  },
  {
    label: "Onboarding flow",
    text: "A first-run prompt for size preferences on install. Currently users have to discover the settings panel on their own.",
  },
  {
    label: "Lucide as an npm dependency",
    text: "Replaces hand-rolled SVG strings with a maintained, tree-shaken package (unlocked by the Vite migration).",
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────

const PANEL_COUNT = 9;

export default function Projects() {
  const [panel, setPanel] = useState(0);
  const prev = () => setPanel((p) => Math.max(0, p - 1));
  const next = () => setPanel((p) => Math.min(PANEL_COUNT - 1, p + 1));

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="projects" className="h-screen flex flex-col overflow-hidden">
      {/* ── Header ── */}
      <div className="shrink-0 px-6 sm:px-12 pt-20 pb-4">
        <div className="max-w-5xl mx-auto flex items-end justify-between">
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-subtle mb-1">
              Selected Work
            </p>
            <h2 className="font-sligoil font-bold text-2xl sm:text-3xl text-ink">
              Mint Condition
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-sans text-xs px-3 py-1 border border-border text-subtle hidden sm:inline-block">
              Chrome Extension
            </span>
            <a
              href="https://github.com/kaylinmpham/eco-alternatives"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-accent hover:text-accent-hover transition-colors"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="shrink-0 px-6 sm:px-12">
        <div className="max-w-5xl mx-auto h-px bg-border" />
      </div>

      {/* ── Panel strip ── */}
      <div className="flex-1 overflow-hidden">
        <motion.div
          className="flex h-full"
          animate={{ x: `${-panel * 100}vw` }}
          transition={{ type: "spring", stiffness: 300, damping: 34 }}
        >
          {/* ─ 00: Overview ─ */}
          <Panel label="00 — Overview">
            <div className="max-w-4xl flex flex-col gap-8">
              {/* Top two columns */}
              <div className="grid grid-cols-2 gap-12">
                {/* Left: description */}
                <div>
                  <p className="font-sans text-sm text-ink/80 leading-relaxed">
                    Chrome Web Extension that intercepts online shopping
                    sessions and surfaces secondhand eBay alternatives in real
                    time. Built with Vanilla JS and Cloudflare Workers — no
                    frameworks, no new tabs, no friction.
                  </p>
                </div>
                {/* Right: design goals */}
                <div>
                  <p className="font-sans text-xs uppercase tracking-widest text-subtle mb-4">
                    Design Goals
                  </p>
                  <ul className="space-y-3">
                    {GOALS.map((g, i) => (
                      <li
                        key={i}
                        className="font-sans text-xs text-ink/75 leading-relaxed flex gap-3"
                      >
                        <span className="text-accent shrink-0 mt-0.5">⤳</span>
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Full-width: how it works */}
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-subtle mb-3">
                  How it works
                </p>
                <div className="flex">
                  {[
                    { step: "01", title: "Browse",  desc: "User visits a fast-fashion product page" },
                    { step: "02", title: "Detect",  desc: "Content script identifies the brand via DOM" },
                    { step: "03", title: "Fetch",   desc: "Worker pulls score + eBay listings" },
                    { step: "04", title: "Surface", desc: "Side panel renders alternatives in-context" },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="flex-1 border border-border px-3 py-2.5 -ml-px first:ml-0"
                    >
                      <p className="font-sans text-[10px] uppercase tracking-widest text-muted mb-1">
                        {s.step}
                      </p>
                      <p className="font-sans text-xs font-medium text-ink mb-1">
                        {s.title}
                      </p>
                      <p className="font-sans text-[11px] text-subtle leading-snug">
                        {s.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Panel>

          {/* ─ 01: Design Process ─ */}
          <Panel label="01 — Design Process">
            <p className="font-sans text-xs text-muted mb-6 max-w-sm">
              Seven steps from research to launch. Step 7 is in progress.
            </p>
            <div className="grid grid-cols-4 gap-x-8 gap-y-6 max-w-4xl">
              {PROCESS_STEPS.map((s, i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-1 ${s.muted ? "opacity-25" : ""}`}
                >
                  <span className="font-sligoil text-xs text-muted">
                    {s.step}
                  </span>
                  <p className="font-sans text-xs font-medium text-ink">
                    {s.title}
                  </p>
                  <p className="font-sans text-xs text-subtle leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </Panel>

          {/* ─ 02: Discovery ─ */}
          <Panel label="02 — Discovery">
            <p className="font-sans text-xs text-muted mb-6 max-w-sm">
              Mapping where sustainable intent breaks down during a fashion
              browsing session.
            </p>
            <div className="grid grid-cols-3 gap-5 max-w-3xl">
              {DISCOVERY.map((d, i) => (
                <div
                  key={i}
                  className="border border-border p-5 rounded-sm flex flex-col gap-3"
                >
                  <p className="font-sans text-xs text-accent uppercase tracking-wider">
                    {d.label}
                  </p>
                  <p className="font-sans text-xs text-ink/75 leading-relaxed">
                    {d.text}
                  </p>
                </div>
              ))}
            </div>
          </Panel>

          {/* ─ 03: Competitive Analysis ─ */}
          <Panel label="03 — Competitive Analysis">
            <p className="font-sans text-xs text-muted mb-6 max-w-sm">
              How existing tools handle secondhand discovery — and where they
              fall short for in-context browsing.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-4xl">
              {ANALYSIS.map((a, i) => (
                <div
                  key={i}
                  className={`border p-5 rounded-sm ${a.highlight ? "border-accent bg-accent/5" : "border-border"}`}
                >
                  <p
                    className={`font-sans text-xs uppercase tracking-wider mb-2 ${a.highlight ? "text-accent" : "text-subtle"}`}
                  >
                    {a.title}
                  </p>
                  <p className="font-sans text-xs text-ink/75 leading-relaxed">
                    <span
                      className={`font-medium ${a.highlight ? "text-accent" : "text-subtle"}`}
                    >
                      {a.prefix}:
                    </span>{" "}
                    {a.text}
                  </p>
                </div>
              ))}
            </div>
          </Panel>

          {/* ─ 04: Ideation ─ */}
          <Panel label="04 — Ideation">
            <p className="font-sans text-xs text-muted mb-6 max-w-sm">
              Three candidate forms evaluated on interruption, effort, and
              context preservation.
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-4xl">
              {IDEATION.map((opt, i) => (
                <div
                  key={i}
                  className={`border p-5 rounded-sm flex flex-col gap-2 ${opt.chosen ? "border-accent bg-accent/5" : "border-border opacity-40"}`}
                >
                  {opt.chosen && (
                    <span className="font-sans text-xs text-accent uppercase tracking-wider">
                      ✓ Selected
                    </span>
                  )}
                  <p
                    className={`font-sans text-xs font-medium ${opt.chosen ? "text-ink" : "text-subtle"}`}
                  >
                    {opt.title}
                  </p>
                  <p className="font-sans text-xs text-ink/70 leading-relaxed">
                    {opt.desc}
                  </p>
                </div>
              ))}
            </div>
          </Panel>

          {/* ─ 05: Solution Architecture ─ */}
          <Panel label="05 — Solution Architecture">
            <p className="font-sans text-sm text-ink/80 leading-relaxed max-w-lg mb-7">
              A Chrome side panel that activates automatically when the user
              reaches a supported brand&apos;s product page. No clicks, no new
              tabs.
            </p>
            <div className="grid grid-cols-3 gap-5 max-w-3xl">
              {SOLUTION_STEPS.map((s, i) => (
                <div
                  key={i}
                  className="border border-border p-5 rounded-sm flex flex-col gap-3"
                >
                  <span className="font-sligoil text-2xl text-border leading-none">
                    {s.num}
                  </span>
                  <p className="font-sans text-xs font-medium text-ink">
                    {s.title}
                  </p>
                  <p className="font-sans text-xs text-subtle leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </Panel>

          {/* ─ 06: Tech Stack ─ */}
          <Panel label="06 — Tech Stack">
            <div className="grid grid-cols-3 gap-8 max-w-3xl">
              {TECH_STACK.map((layer, li) => (
                <div key={li}>
                  <p className="font-sans text-xs uppercase tracking-widest text-muted mb-3">
                    {layer.layer}
                  </p>
                  <div className="flex flex-col gap-3">
                    {layer.items.map((item, ii) => (
                      <div
                        key={ii}
                        className="border border-border p-4 rounded-sm"
                      >
                        <p className="font-sans text-xs font-medium text-ink mb-2">
                          {item.title}
                        </p>
                        <ul className="space-y-1">
                          {item.bullets.map((b, bi) => (
                            <li
                              key={bi}
                              className="font-sans text-xs text-subtle leading-relaxed flex gap-1.5"
                            >
                              <span className="text-border shrink-0">–</span>
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* ─ 07: Results + Future ─ */}
          <Panel label="07 — Results & What's Next">
            <div className="grid grid-cols-2 gap-8 max-w-4xl">
              {/* Goals Achieved */}
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-subtle mb-4">
                  Goals Achieved
                </p>
                <div className="flex flex-col gap-2">
                  {RESULTS.map((r, i) => (
                    <div
                      key={i}
                      className="border border-border rounded-sm p-4 flex gap-3"
                    >
                      <span className="text-accent shrink-0 mt-0.5 text-xs">
                        ⤳
                      </span>
                      <p className="font-sans text-xs leading-relaxed">
                        <span className="font-medium text-ink">{r.label}.</span>{" "}
                        <span className="text-ink/65">{r.text}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Potential Additions */}
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-subtle mb-4">
                  Potential Additions
                </p>
                <div className="flex flex-col gap-2">
                  {FUTURE.map((f, i) => (
                    <div
                      key={i}
                      className="border border-border rounded-sm p-4 flex gap-3 opacity-40"
                    >
                      <span className="text-muted shrink-0 mt-0.5 text-xs">
                        ◌
                      </span>
                      <p className="font-sans text-xs leading-relaxed">
                        <span className="font-medium text-subtle">
                          {f.label}.
                        </span>{" "}
                        <span className="text-ink/65">{f.text}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Panel>

          {/* ─ 08: Demo + Launch ─ */}
          <Panel label="08 — Demo">
            <div className="grid grid-cols-2 gap-12 max-w-4xl">
              {/* Demo video */}
              <video
                className="aspect-video w-full rounded-sm border border-border bg-border/5"
                src="/Mint Demo.mov"
                controls
                playsInline
                preload="metadata"
              />

              {/* Launch info */}
              <div className="flex flex-col justify-center gap-6">
                <div>
                  <p className="font-sans text-xs uppercase tracking-widest text-subtle mb-3">
                    Status
                  </p>
                  <p className="font-sans text-sm text-ink/80 leading-relaxed">
                    Coming soon to the Chrome Web Store. The extension is fully
                    functional — pending review and publication.
                  </p>
                </div>
                <div className="h-px bg-border" />
                <div className="flex flex-col gap-3">
                  <a
                    href="https://github.com/kaylinmpham/eco-alternatives"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-xs text-accent hover:text-accent-hover transition-colors"
                  >
                    github.com/kaylinmpham/eco-alternatives ↗
                  </a>
                </div>
              </div>
            </div>
          </Panel>
        </motion.div>
      </div>

      {/* ── Footer nav ── */}
      <div className="shrink-0 px-6 sm:px-12 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <button
            onClick={prev}
            disabled={panel === 0}
            aria-label="Previous panel"
            className="font-sans text-xs text-ink hover:text-accent disabled:opacity-20 transition-colors shrink-0 px-2 py-1 border border-border select-none"
          >
            &#8592; prev
          </button>

          {/* Single unified progress bar */}
          <div className="flex-1 relative h-px bg-border">
            <motion.div
              className="absolute inset-y-0 left-0 bg-accent"
              animate={{ width: `${(panel / (PANEL_COUNT - 1)) * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 34 }}
            />
          </div>

          <span className="font-sans text-xs text-muted shrink-0 tabular-nums">
            {String(panel).padStart(2, "0")}&nbsp;/&nbsp;
            {String(PANEL_COUNT - 1).padStart(2, "0")}
          </span>

          {/* Remaining bar (inverted — fills right-to-left as accent) */}
          <div className="flex-1 relative h-px bg-border">
            <motion.div
              className="absolute inset-y-0 right-0 bg-accent"
              animate={{
                width: `${((PANEL_COUNT - 1 - panel) / (PANEL_COUNT - 1)) * 100}%`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 34 }}
            />
          </div>

          <button
            onClick={next}
            disabled={panel === PANEL_COUNT - 1}
            aria-label="Next panel"
            className="font-sans text-xs text-ink hover:text-accent disabled:opacity-20 transition-colors shrink-0 px-2 py-1 border border-border select-none"
          >
            next &#8594;
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Panel wrapper ──────────────────────────────────────────────────────────────

function Panel({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen shrink-0 h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto px-6 sm:px-12 pt-6 pb-8">
        <p className="font-sans text-xs uppercase tracking-widest text-subtle mb-5">
          {label}
        </p>
        {children}
      </div>
    </div>
  );
}
