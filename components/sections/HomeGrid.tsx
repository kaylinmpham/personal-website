"use client";

import { useState } from "react";
import Image from "next/image";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Now from "@/components/sections/Now";

const EMAIL = "kaylin.renee.pham@gmail.com";

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/kaylinpham",
    external: true,
  },
  { label: "GitHub", href: "https://github.com/kaylinmpham", external: true },
  { label: "Resume.cv", href: "/resume.pdf", external: false },
];

const SECTIONS = [
  {
    id: "experience",
    label: "Experience",
    title: "From Figma to production.",
    copy: "Three years between design and production, turning thoughtful Figma work into accessible interfaces and the systems behind them.",
    className: "home-tile-experience",
  },
  {
    id: "projects",
    label: "Selected project",
    title: "My work",
    copy: "My work is out in the real world, from first sketch to shipped product.",
    image: "/mockups/hero-context.webp",
    className: "home-tile-work",
  },
  {
    id: "about",
    label: "About me",
    title: "I'm Kaylin, a SWE turned design engineer.",
    copy: "I'm drawn to the details that make the web feel human: thoughtful interactions, accessible interfaces, and spaces where design and engineering meet.",
    className: "home-tile-about",
  },
  {
    id: "now",
    label: "What I'm up to",
    title: "A glimpse into my life outside of work.",
    copy: "A running log of what I've been into lately, on and off the clock.",
    className: "home-tile-now",
  },
];

function ContactTile() {
  return (
    <section className="home-tile home-tile-contact" aria-label="Let's connect">
      <p className="home-eyebrow">Let&apos;s connect</p>
      <div className="home-contact-links">
        <a href={`mailto:${EMAIL}`} className="home-heading">
          Contact
        </a>
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="home-heading"
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}

function SectionPicker({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="home-section-picker" aria-label="Portfolio sections">
      {SECTIONS.map((section, index) => (
        <button
          className={`home-tile home-section-choice ${section.className}`}
          key={section.id}
          type="button"
          onClick={() => onSelect(section.id)}
          aria-label={`Open ${section.label}`}
        >
          <span className="home-eyebrow">{section.label}</span>
          {section.image && (
            <span className="home-work-image-wrap">
              <Image
                src={section.image}
                alt="Mint Condition shopping experience"
                fill
                sizes="(max-width: 700px) 100vw, 33vw"
                className="home-work-image"
              />
            </span>
          )}
          <span className="home-tile-content">
            {section.id === "experience" && (
              <span className="home-tile-link">
                CoStar Group · Jacobs · NASA
              </span>
            )}
            <span className="home-heading">{section.title}</span>
            <span className="home-copy">{section.copy}</span>

            {section.id === "projects" && (
              <span className="home-tile-link">Mint Condition ↗</span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
}

function SectionPage({
  id,
  onBack,
  onOpenCaseStudy,
}: {
  id: string;
  onBack: () => void;
  onOpenCaseStudy: () => void;
}) {
  const section = SECTIONS.find((item) => item.id === id);
  const pageTitle = id === "mint-condition" ? "Mint Condition" : section?.label;

  return (
    <div className="home-page-view">
      <div className="home-page-toolbar">
        <button type="button" className="home-back-button" onClick={onBack}>
          <span aria-hidden="true">←</span> All sections
        </button>
        <span className="home-eyebrow">{pageTitle}</span>
      </div>
      {id === "experience" && <Experience />}
      {id === "projects" && <Projects onOpenCaseStudy={onOpenCaseStudy} />}
      {id === "mint-condition" && (
        <iframe
          className="home-case-study-frame"
          src="/case-studies/mint-condition?embedded=1"
          title="Mint Condition case study"
        />
      )}
      {id === "now" && <Now />}
      {id === "about" && (
        <section className="home-about-page" aria-labelledby="about-page-title">
          <p className="home-eyebrow">About me</p>
          <h1 className="home-heading" id="about-page-title">
            I&apos;m Kaylin, a SWE turned design engineer.
          </h1>
          <p className="home-about-copy">
            I&apos;m drawn to the details that make the web feel human:
            thoughtful interactions, accessible interfaces, and spaces where
            design and engineering meet. I work across product design and
            frontend engineering, turning clear ideas into useful, carefully
            crafted experiences.
          </p>
          <a
            className="home-tile-link"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            View resume ↗
          </a>
        </section>
      )}
    </div>
  );
}

export default function HomeGrid() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <main
      className={`home-shell${activeSection ? " home-shell-active" : ""}`}
      aria-label="Kaylin Pham portfolio"
    >
      <aside className="home-rail" aria-label="Profile and contact">
        <section className="home-tile home-tile-intro" id="about">
          <Image
            src="/icons/head-shot.jpg"
            alt="Portrait of Kaylin Pham"
            fill
            priority
            sizes="(max-width: 700px) 50vw, 33vw"
            className="home-intro-image"
          />
        </section>
        <ContactTile />
      </aside>

      <section className="home-main" aria-label="Portfolio content">
        {activeSection ? (
          <SectionPage
            id={activeSection}
            onBack={() => setActiveSection(null)}
            onOpenCaseStudy={() => setActiveSection("mint-condition")}
          />
        ) : (
          <SectionPicker onSelect={setActiveSection} />
        )}
      </section>
    </main>
  );
}
