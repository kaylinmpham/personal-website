import Link from "next/link";
import { notFound } from "next/navigation";
import DeepDive from "@/components/sections/DeepDive";
import { CASE_STUDIES, type CaseStudyId } from "@/lib/caseStudies";

export function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = CASE_STUDIES[slug as CaseStudyId];
  if (!study) notFound();

  return (
    <main className="deep-dive-page">
      <Link
        href="/"
        className="font-sans text-xs uppercase tracking-[0.2em] text-subtle hover:text-ink"
      >
        ← Back to portfolio
      </Link>
      <DeepDive study={study} />
    </main>
  );
}
