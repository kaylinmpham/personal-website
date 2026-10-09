"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { motion } from "motion/react";
import type { ExperienceItem } from "@/types";

const EXPERIENCE: ExperienceItem[] = [
  {
    company: "CoStar Group",
    role: "Software Engineer",
    period: "2023 – 2026",
    scope: "Front-End / Full-Stack / Product Design",
    team: "Sync",
    tools:
      "Figma, TypeScript, Remix, React, C#, .NET, AWS, Kafka, Azure, Datadog, ARIA/WCAG",
    bullets: [
      "Owned end-to-end delivery of Sync Portal features (TypeScript, Remix), an internal app for querying, visualizing, and managing CoStar Sync data. Took Figma prototypes to ARIA compliant React components to production pages, streamlining the design-to-production pipeline.",
      "Contributed to CoStar Sync (C#, .NET, AWS, Kafka), a near-real-time ETL platform processing billions of daily data mutations across CoStar's ecosystem, including Homes.com, Apartments.com, and LoopNet.",
      "Designed and built a build log dashboard that auto-schedules models in optimal order, cutting a manual process to seconds, with Azure, Datadog, and ownership data in each job view.",
      "Facilitated an intro to Figma workshop for a 30+ person backend engineering org.",
      "Mentored and onboarded one new hire and one intern on Figma workflows and coding practices.",
    ],
    link: "https://www.costar.com",
  },
  {
    company: "Jacobs",
    role: "Software Engineering Intern",
    period: "2022",
    scope: "Embedded Systems / Backend",
    team: "Aerospace Embedded Systems",
    tools: "C++, Python, Git, Docker, Jenkins, CI/CD",
    bullets: [
      "Maintained satellite software reliability by adapting C++ and Python patterns to support new functional requirements.",
      "Accelerated testing workflows by implementing unit and integration tests in a CI/CD pipeline using Git, Docker, and Jenkins in an Agile environment.",
    ],
    link: "https://www.jacobs.com",
  },
  {
    company: "NASA",
    role: "Engineering Intern",
    period: "2018 & 2019",
    scope: "Database Design / Arduino / CAD",
    team: "Electro-Mechanical Branch",
    tools: "Arduino, CAD, Linux",
    bullets: [
      "Built an online database for NASA Goddard's Electro-Mechanical branch to store flight projects and make them easier to find.",
      "Worked with two other interns to make the database more user friendly for branch staff.",
      "Modeled a miniature CubeSat in CAD software and programmed it with Arduino on Linux.",
    ],
    link: "https://www.nasa.gov",
  },
];

const SKILL_GROUPS = [
  {
    label: "Design",
    skills: [
      "Figma",
      "Prototyping",
      "Design Systems",
      "Accessibility (ARIA/WCAG)",
    ],
  },
  {
    label: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Remix",
      "Tailwind CSS",
      "Motion / GSAP",
      "CSS / SVG Animation",
    ],
  },
  {
    label: "Backend & cloud",
    skills: [
      "Node.js",
      "REST APIs",
      "C#",
      ".NET",
      "AWS",
      "Azure",
      "Kafka",
      "Datadog",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="exp-page">
      {EXPERIENCE.map((item, i) => (
        <motion.div
          key={item.company}
          className="exp-entry"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.6,
            delay: i * 0.08,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <Disclosure>
            {({ open }) => (
              <>
                <DisclosureButton className="exp-header">
                  <span className="exp-header-text">
                    <span className="exp-period">
                      {item.period}
                      {!open && ` · ${item.company}`}
                    </span>
                    <span className="home-heading exp-role">{item.role}</span>
                  </span>
                  <span className="exp-toggle" aria-hidden="true">
                    {open ? "[−]" : "[+]"}
                  </span>
                </DisclosureButton>

                <DisclosurePanel>
                  <motion.div
                    className="exp-body"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <dl className="exp-meta">
                      {[
                        { label: "Scope", value: item.scope },
                        { label: "Team", value: item.team },
                        { label: "Tools", value: item.tools },
                      ].map((meta) => (
                        <div key={meta.label}>
                          <dt className="exp-label">{meta.label}</dt>
                          <dd>{meta.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="exp-detail">
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="exp-company"
                        >
                          {item.company} ↗
                        </a>
                      ) : (
                        <span className="exp-company">{item.company}</span>
                      )}
                      <div>
                        <p className="exp-label">Description</p>
                        <ul className="exp-bullets">
                          {item.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        </motion.div>
      ))}

      <motion.div
        className="exp-entry exp-skills"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h2 className="home-heading exp-skills-title">Tools &amp; skills</h2>
        <div className="exp-skill-groups">
          {SKILL_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="exp-label">{group.label}</p>
              <ul className="exp-skill-list">
                {group.skills.map((skill) => (
                  <li key={skill} className="exp-skill">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
