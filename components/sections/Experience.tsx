"use client";

import { useRef } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import type { ExperienceItem } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE: ExperienceItem[] = [
  {
    company: "CoStar Group",
    role: "Software Engineer I",
    period: "July 2023 - February 2026",
    location: "Washington, D.C.",
    bullets: [
      "Led UI design initiatives via high-fidelity Figma mockups and prototypes; optimized design-to-dev workflows by translating designs into scalable React components.",
      "Owned end-to-end features for the Sync Portal (TypeScript/Remix); built REST APIs and accessible interfaces (ARIA, keyboard nav) to enable real-time ETL data visualization.",
      "Maintained CoStar Sync, a near-real-time ETL platform using C#, .NET, AWS, and Kafka, supporting billions of daily data mutations across the ecosystem.",
      "Mentored and onboarded team members, conducting weekly intern code reviews and training new hires on Figma design workflows and technical implementation.",
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "C#", ".NET", "AWS", "Kafka"],
    link: "https://www.costar.com",
  },
  {
    company: "Jacobs",
    role: "Embedded Systems Software Engineering Intern",
    period: "May - August 2022",
    location: "Severn, MD",
    bullets: [
      "Maintained satellite software reliability by adapting C++ and Python patterns to support new functional requirements for system repositories.",
      "Accelerated testing workflows by implementing unit and integration tests using Git, Docker, and Jenkins in an Agile environment.",

    ],
    tags: ["C++", "Python", "Git", "Docker", "Jenkins", "Agile"],
    link: "https://www.jacobs.com",
  },
  {
    company: "NASA",
    role: "Software Engineer Intern",
    period: "May - August 2019 & May - August 2020",
    location: "Greenbelt, MD",
    bullets: [
      "Maintained an internal database for the electro-mechanical branch to store flight projects and make it more user friendly, amongst a team of interns.",
      "Built a miniature model of a CubeSat utilizing arduino coding and CAD software in a Linux environment.",
    ],
    tags: ["Python", "Arduino", "CAD", "Linux"],
    link: "https://www.nasa.gov",
  },
];

// ─── Skills grid data ─────────────────────────────────────────────────────────
const SKILLS = [
  "React", "Next.js", "TypeScript", "Tailwind CSS",
  "Motion", "GSAP", "Figma", "Accessibility",
  "Design Systems", "CSS / SVG Animation", "Node.js", "REST APIs",
];

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Stagger timeline items in from the left on scroll
      gsap.fromTo(
        ".exp-item",
        { opacity: 0, x: -32 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".exp-list",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        }
      );

      // Skills chips fade in
      gsap.fromTo(
        ".skill-chip",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.045,
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-section px-6 max-w-5xl mx-auto"
    >
      {/* Section header */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <p className="font-sans text-xs uppercase tracking-widest text-mid mb-3">
          Work
        </p>
        <h2 className="font-display font-bold text-4xl sm:text-5xl text-ink tracking-tight">
          Experience
        </h2>
      </motion.div>

      {/* Timeline */}
      <div className="exp-list relative">
        {/* Vertical line */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-border hidden sm:block" />

        <div className="flex flex-col gap-2">
          {EXPERIENCE.map((item, i) => (
            <div key={i} className="exp-item sm:pl-10 relative">
              {/* Dot */}
              <div className="absolute left-0 top-7 -translate-x-1/2 hidden sm:flex text-accent text-xs leading-none bg-paper pt-0.5 pb-1">
                ꩜
              </div>

              <Disclosure>
                {({ open }) => (
                  <div
                    className={cn(
                      "border transition-all duration-300 rounded-sm",
                      open
                        ? "border-border bg-border/20"
                        : "border-transparent hover:border-border/80 hover:bg-border/10"
                    )}
                  >
                    <DisclosureButton className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 group">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                          <h3 className="font-display font-semibold text-xl text-ink">
                            {item.role}
                          </h3>
                          {item.link ? (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-sans text-sm text-accent hover:text-accent-dark transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {item.company} ↗
                            </a>
                          ) : (
                            <span className="font-sans text-sm text-accent">
                              {item.company}
                            </span>
                          )}
                        </div>
                        <p className="font-sans text-xs text-dim">
                          {item.period} · {item.location}
                        </p>
                      </div>

                      {/* Expand chevron */}
                      <motion.span
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                          className="text-mid mt-1 shrink-0"
                        aria-hidden="true"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M4 6l4 4 4-4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.span>
                    </DisclosureButton>

                    <DisclosurePanel>
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="px-6 pb-6"
                      >
                        <ul className="space-y-2 mb-5">
                          {item.bullets.map((bullet, j) => (
                            <li
                              key={j}
                              className="font-sans text-sm text-ink/80 leading-relaxed flex gap-2"
                            >
                              <span className="text-accent mt-0.5 shrink-0 text-sm">
                                ⤳
                              </span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-sans text-xs px-3 py-1 border border-border text-mid"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </DisclosurePanel>
                  </div>
                )}
              </Disclosure>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mt-20">
        <motion.p
          className="font-sans text-xs uppercase tracking-widest text-mid mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Tools & Skills
        </motion.p>
        <div className="skills-grid flex flex-wrap gap-3">
          {SKILLS.map((skill) => (
            <motion.span
              key={skill}
              className="skill-chip font-sans text-sm px-4 py-2 border border-border text-mid bg-transparent hover:bg-border/30 hover:border-accent/50 hover:text-accent transition-all duration-300 cursor-default"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
