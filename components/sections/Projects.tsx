"use client";

import type { MouseEvent } from "react";
import Image from "next/image";

import type { CaseStudyId } from "@/lib/caseStudies";

const caseStudies: {
  id: CaseStudyId;
  title: string;
  summary: string;
  bullets: string[];
  image: string;
  imageAlt: string;
}[] = [
  {
    id: "dream-floral-art",
    title: "Dream Floral Art",
    summary:
      "Freelance website design for a boutique floral studio specializing in Vietnamese weddings and tea ceremonies.",
    bullets: [
      "Designed and built a client website, including a contact page, testimonials, and about section.",
      "Collaborated with the owner to translate her voice and cultural expertise into site copy and structure.",
      "Built a visual layout system connecting imagery, content, and brand identity.",
    ],
    image: "/icons/dfa-ss.png",
    imageAlt: "Dream Floral Art website homepage",
  },
  {
    id: "mint-condition",
    title: "Mint Condition",
    summary:
      "Chrome extension surfacing sustainability scores and secondhand eBay alternatives on retail product pages.",
    bullets: [
      "Built a Chrome extension surfacing sustainability scores and secondhand alternatives, using Cloudflare Workers, the eBay Browse API, and WikiRate data.",
      "Owned interface design and decision logic, using Claude Code for implementation.",
      "Searches over 1 billion eBay listings per query, returning 20 relevant results with load times under 2 seconds.",
    ],
    image: "/icons/mint-ss.png",
    imageAlt: "Mint Condition extension running on a product page",
  },
];

export default function Projects({
  onOpenCaseStudy,
}: {
  onOpenCaseStudy?: (id: CaseStudyId) => void;
} = {}) {
  return (
    <section id="projects" className="work-page">
      <div className="work-intro">
        <h1 className="home-heading">Case studies / work</h1>
        <p className="home-copy">
          A deep-dive look at core product ships with architectural details.
        </p>
      </div>

      {caseStudies.map((study, index) => {
        const openStudy = onOpenCaseStudy
          ? (event: MouseEvent) => {
              event.preventDefault();
              onOpenCaseStudy(study.id);
            }
          : undefined;

        return (
          <article
            key={study.id}
            className={`work-study${index % 2 ? " work-study-reverse" : ""}`}
          >
            <a
              href={`/case-studies/${study.id}`}
              className="work-study-image"
              onClick={openStudy}
              aria-label={`Read the ${study.title} case study`}
            >
              <Image
                src={study.image}
                alt={study.imageAlt}
                fill
                sizes="(max-width: 900px) 100vw, 320px"
              />
            </a>
            <div className="work-study-text">
              <h2 className="home-heading">{study.title}</h2>
              <p className="work-study-summary">{study.summary}</p>
            </div>
            <ul className="work-study-bullets">
              {study.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <a
              href={`/case-studies/${study.id}`}
              className="home-tile-link work-study-link"
              onClick={openStudy}
            >
              Read case study ↗
            </a>
          </article>
        );
      })}
    </section>
  );
}
