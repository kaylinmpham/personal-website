import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Now from "@/components/sections/Now";
import Contact from "@/components/sections/Contact";

const TICKER_ITEMS = [
  "Design Engineer",
  "Front-End",
  "Motion",
  "TypeScript",
  "Remix",
  "Aria Accessibility",
  "Systems Thinking",
  "Component Libraries",
  "Design Systems",
  "GSAP",
];

const tickerText = TICKER_ITEMS.join(" · ") + " · ";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Marquee ticker strip */}
      <div
        className="w-full overflow-hidden border-y border-border py-3 select-none"
        aria-hidden="true"
      >
        <div className="marquee-track">
          {[tickerText, tickerText].map((chunk, i) => (
            <span
              key={i}
              className="font-sans text-xs uppercase tracking-widest text-subtle whitespace-nowrap px-4"
            >
              {chunk}
            </span>
          ))}
        </div>
      </div>

      <Experience />
      <Now />
      <Contact />
    </main>
  );
}
