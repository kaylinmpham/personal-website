"use client";

import { useState } from "react";
import Image from "next/image";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Now from "@/components/sections/Now";
import DeepDive from "@/components/sections/DeepDive";
import { CASE_STUDIES, type CaseStudyId } from "@/lib/caseStudies";

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
    images: [
      { src: "/icons/dfa-ss.png", alt: "Dream Floral Art website" },
      { src: "/icons/mint-ss.png", alt: "Mint Condition extension" },
    ],
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
    copy: "A running log of what I've been into lately off the clock.",
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
          {section.images && (
            <span className="home-work-images">
              {section.images.map((image) => (
                <span className="home-work-image-wrap" key={image.src}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 700px) 50vw, 17vw"
                    className="home-work-image"
                  />
                </span>
              ))}
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
              <span className="home-tile-link">
                Dream Floral Art · Mint Condition ↗
              </span>
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
  onClose,
  onOpenCaseStudy,
}: {
  id: string;
  onBack: () => void;
  onClose: () => void;
  onOpenCaseStudy: (id: CaseStudyId) => void;
}) {
  const section = SECTIONS.find((item) => item.id === id);
  const caseStudy = CASE_STUDIES[id as CaseStudyId];
  const caseStudyTitle = caseStudy?.title;
  const pageTitle =
    caseStudyTitle ??
    (id === "projects"
      ? "My Work"
      : id === "experience"
        ? "Work Experience"
        : section?.label);

  return (
    <div
      className={`home-page-view home-page-${id}${
        id === "projects" || caseStudy ? " home-page-fog" : ""
      }`}
    >
      <div className="home-page-toolbar">
        <button
          type="button"
          className="home-back-button"
          onClick={onBack}
          aria-label={
            caseStudyTitle ? "Back to My Work" : "Back to all sections"
          }
        >
          <img src="/icons/arrow-left.svg" alt="" width={24} height={24} />
          {pageTitle}
        </button>
        <button
          type="button"
          className="home-close-button"
          onClick={onClose}
          aria-label="Close and return to all sections"
        >
          <img src="/icons/close.svg" alt="" width={24} height={24} />
        </button>
      </div>
      {id === "experience" && <Experience />}
      {id === "projects" && <Projects onOpenCaseStudy={onOpenCaseStudy} />}
      {caseStudy && <DeepDive study={caseStudy} />}
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
            onBack={() =>
              setActiveSection(
                activeSection in CASE_STUDIES ? "projects" : null,
              )
            }
            onClose={() => setActiveSection(null)}
            onOpenCaseStudy={setActiveSection}
          />
        ) : (
          <SectionPicker onSelect={setActiveSection} />
        )}
      </section>
    </main>
  );
}
