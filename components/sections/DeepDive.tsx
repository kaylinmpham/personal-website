import Image from "next/image";
import LoopingVideo from "@/components/ui/LoopingVideo";
import type { CaseStudy } from "@/lib/caseStudies";

export default function DeepDive({ study }: { study: CaseStudy }) {
  return (
    <section className="deep-dive" aria-label={`${study.title} case study`}>
      <div className="deep-dive-section">
        <div
          className="deep-dive-hero"
          style={{ aspectRatio: `${study.hero.width} / ${study.hero.height}` }}
        >
          <Image
            src={study.hero.src}
            alt={study.hero.alt}
            fill
            priority
            sizes="(max-width: 700px) 100vw, 60vw"
          />
        </div>
        <p className="deep-dive-body">{study.intro}</p>
        <a
          href={study.link.href}
          className="home-tile-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {study.link.label}
        </a>
      </div>

      <div className="deep-dive-section">
        <h2 className="home-heading">Project overview</h2>
        <dl className="deep-dive-meta">
          {study.overview.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
        <p className="deep-dive-body">{study.summary}</p>
      </div>

      {study.sections.map((section) => (
        <div className="deep-dive-section" key={section.title}>
          <h2 className="home-heading">{section.title}</h2>
          {section.paragraphs?.map((paragraph) => (
            <p className="deep-dive-body" key={paragraph}>
              {paragraph}
            </p>
          ))}
          {section.video && (
            <LoopingVideo
              className="deep-dive-video"
              src={section.video.src}
              start={section.video.start}
              aria-label={section.video.label}
              width={section.video.width}
              height={section.video.height}
              controls
            />
          )}
          {section.bullets && (
            <ul className="deep-dive-body deep-dive-list">
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
}
