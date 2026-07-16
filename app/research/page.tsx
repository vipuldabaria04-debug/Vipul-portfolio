import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { researchInterests, pinnResearch } from "@/data/research";

export const metadata: Metadata = {
  title: "Research",
  description: "Research interests and ongoing work in power systems and scientific machine learning.",
};

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="Physics first. Machine learning where it earns its place."
        description="My research centers on power system dynamics and the growing role of physics-constrained machine learning in understanding them."
      />

      <Section>
        <Reveal>
          <div className="card-surface flex flex-col justify-between gap-6 p-8 md:flex-row md:items-center">
            <div>
              <p className="eyebrow mb-2">Featured Research</p>
              <h3 className="text-2xl font-semibold text-paper md:text-3xl">{pinnResearch.shortTitle}</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-paper-muted">
                {pinnResearch.institution} · {pinnResearch.period}
              </p>
            </div>
            <Button href="/research/pinn-inertia-estimation" icon={<ArrowUpRight className="h-4 w-4" />}>
              Read the case study
            </Button>
          </div>
        </Reveal>
      </Section>

      <Section className="border-t border-line">
        <SectionHeading eyebrow="Interests" title="Where I focus." />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {researchInterests.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.05}>
              <div className="card-surface h-full p-6">
                <p className="font-medium text-paper">{r.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-paper-muted">{r.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line">
        <SectionHeading eyebrow="Publications" title="In preparation." />
        <div className="card-surface flex flex-col gap-3 p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-paper">{pinnResearch.title}</p>
            <Badge>Manuscript in preparation</Badge>
          </div>
          <p className="text-sm text-paper-muted">
            See the full <a href="/publications" className="link-underline text-trace-bright">publications page</a> for
            citation placeholders and future entries.
          </p>
        </div>
      </Section>
    </>
  );
}
