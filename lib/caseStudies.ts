export type CaseStudyId = "dream-floral-art" | "mint-condition";

export interface DeepDiveSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  video?: {
    src: string;
    label: string;
    width: number;
    height: number;
    /** Seconds into the video to start (and loop back to). */
    start?: number;
  };
}

export interface CaseStudy {
  title: string;
  hero: { src: string; alt: string; width: number; height: number };
  intro: string;
  link: { label: string; href: string };
  overview: { label: string; value: string }[];
  summary: string;
  sections: DeepDiveSection[];
}

export const CASE_STUDIES: Record<CaseStudyId, CaseStudy> = {
  "dream-floral-art": {
    title: "Dream Floral Art",
    hero: {
      src: "/icons/dfa-ss.png",
      alt: "Dream Floral Art website homepage",
      width: 1520,
      height: 756,
    },
    intro:
      "Dream Floral Art is a boutique floral studio specializing in luxury Vietnamese wedding tea ceremony florals and design in the D.C. area. I redesigned and built its website to match the quality of the work.",
    link: {
      label: "Visit dreamfloralart.com ↗",
      href: "https://dreamfloralart.com/",
    },
    overview: [
      { label: "Role", value: "Designer & Developer" },
      { label: "Timeline", value: "10 Weeks (Fall 2026)" },
      {
        label: "Tools & Tech",
        value:
          "Figma, React, TypeScript, React Router, Tailwind CSS, Netlify, Resend, ARIA Accessibility",
      },
    ],
    summary:
      "This was a freelance project for the studio's owner. I designed the site in Figma, shaped the copy with her, and built every page in React. It gives couples a clear look at three offerings, altars, mâm quả, and khăn đóng, and an easy way to reach out.",
    sections: [
      {
        title: "The challenge",
        paragraphs: [
          "The old site did not match the work. The studio makes detailed, culturally specific pieces, but the site did not show that clearly. Its services were hard to tell apart, and it gave couples no easy way to start a conversation.",
          "The goal was a site that explains the tradition, shows the work, and makes inquiring simple. It also had to feel premium without feeling decorative.",
        ],
      },
      {
        title: "Research & discovery",
        paragraphs: [
          "I started by auditing the existing site and the owner's own words. Her blurb and service descriptions became the factual base. She also corrected a key point early. The specialty is tea ceremonies, not Vietnamese weddings in general. That changed how I named and organized the services.",
          "I also studied a reference floral studio site for structure, type, and pacing. Her press features, a blog post and a podcast interview, gave me strong proof of credibility. I added them to the homepage.",
        ],
      },
      {
        title: "Design process",
        paragraphs: [
          "I built the system in Figma first, then carried the same tokens into code. Three colors and three typefaces do the work: warm white, ink black, and a deep rose. Fraunces handles headlines, Montserrat handles labels, and Rethink Sans handles body copy.",
          "I kept the design quiet so the photography can lead. Buttons are sharp-cornered burgundy with a clear primary and secondary hierarchy. I renamed “Portfolio” to “Offerings” because the section works as both a service menu and a gallery. Each offering gets its own alternating image and text row. I wrote the copy for each piece around what the ceremony means to the family.",
        ],
      },
      {
        title: "Key accomplishments",
        bullets: [
          "Redesigned and built a five-page site, including Home, Gallery, Testimonials, About, and Contact.",
          "Built a contact form that emails the owner each inquiry with the event date, location, and details, and blocks spam with a hidden honeypot field.",
          "Automated the gallery so new photos added to a shared Google Drive folder appear on the site every three hours, with no developer needed.",
          "Built with accessibility in mind, including a skip link, labeled form fields, and an accessible audio player for the podcast.",
        ],
      },
      {
        title: "Results & impact",
        paragraphs: [
          "The owner now has a site that shows her work and her heritage clearly. Couples can browse the three offerings, read client testimonials, and send an inquiry that lands directly in her inbox. New portfolio photos update automatically, so she can manage the gallery herself.",
        ],
      },
    ],
  },
  "mint-condition": {
    title: "Mint Condition",
    hero: {
      src: "/icons/mint-ss.png",
      alt: "Mint Condition side panel showing secondhand alternatives next to a retail product page",
      width: 3024,
      height: 1508,
    },
    intro:
      "Mint Condition puts the ethics check and the secondhand search where you are already shopping.",
    link: {
      label: "Open in Chrome Web Store ↗",
      href: "https://chromewebstore.google.com/detail/mint-condition/einkjpadmpkeaifhbbhiidohjmfdllip",
    },
    overview: [
      { label: "Role", value: "Designer & Developer" },
      { label: "Timeline", value: "6 Weeks (Summer 2026)" },
      {
        label: "Tools & Tech",
        value:
          "Figma, JavaScript, Chrome Extension APIs, Cloudflare Workers, eBay Browse API, WikiRate, Claude Code",
      },
    ],
    summary:
      "Mint Condition is a Chrome extension I designed and built to make sustainable shopping easier. It reads the product you are viewing, rates the brand on a five-tier scale, and shows secondhand eBay alternatives in a side panel. It is live on the Chrome Web Store. I owned the interface and the decision logic. I used Claude Code for the backend implementation.",
    sections: [
      {
        title: "The challenge",
        paragraphs: [
          "When trying to shop sustainably, I always hit the same wall. I would find something I liked, google whether the brand was ethical, then browse secondhand sites with no real starting point. Somewhere in that process I would give up. The better choice took three tabs and a lot of effort, and the original decision was gone by the time I finished.",
          "The challenge was to bring that whole process into the page where the decision already happens. It had to be fast, easy to scan, and never preachy.",
        ],
      },
      {
        title: "Research & discovery",
        paragraphs: [
          "I started with my own habit, since I was the user with the problem. I mapped the three-tab routine step by step and found where I gave up. It was always at the secondhand search, because there was no starting point.",
          "Then I looked at what data could power a score. No single source covered every brand. I used Fashion Revolution's Transparency Index through WikiRate, added Good On You ratings, and set an AI estimate as the last fallback, clearly labeled as an estimate.",
        ],
      },
      {
        title: "Design process",
        paragraphs: [
          "I tested a few patterns before choosing an in-context side panel. It shows an alternative next to the product without pulling attention from the purchase. It reads as a helpful suggestion, not a lecture.",
          "From there I built the interface around three choices. A five-tier rating (We Avoid, Poor, Fair, Good, Great) gives a clear answer at a glance. Image-first cards make secondhand listings easy to scan. A warm, editorial palette keeps the panel calm next to busy retail pages.",
          "I used Figma for the interface, then built it myself in JavaScript.",
        ],
      },
      {
        title: "Key accomplishments",
        bullets: [
          "Designed and built a Chrome extension end to end, from Figma concept to live Chrome Web Store release.",
          "Built a three-source scoring system with fallbacks, so most brands return a rating instead of a blank state.",
          "Combined image and text search across eBay US, UK, and DE to surface close secondhand matches.",
        ],
      },
      {
        title: "Final design showcase",
        video: {
          src: "/Mint Demo.mov",
          start: 10,
          label:
            "Demo of Mint Condition rating a brand and showing secondhand alternatives in the side panel",
          width: 3010,
          height: 1736,
        },
      },
      {
        title: "Results & impact",
        paragraphs: [
          "Mint Condition is live on the Chrome Web Store. It searches over 1 billion eBay listings and returns 20 matches per search, typically in under 2 seconds in my testing. It turns a three-tab research routine into one panel on the page you are already viewing.",
        ],
      },
    ],
  },
};
