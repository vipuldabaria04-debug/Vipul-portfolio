import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { FigureFrame } from "@/components/ui/FigureFrame";
import { MeshGradient } from "@/components/ui/MeshGradient";
import { AchievementsExhibition } from "@/components/sections/AchievementsExhibition";
import { certifications } from "@/data/skills";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Awards, recognitions, and certifications earned by Vipul Dabaria.",
};

export default function AchievementsPage() {
  return (
    <>
      <div className="relative">
        <MeshGradient variant="product" className="-z-10" />
        <PageHeader
          eyebrow="Achievements — Exhibition"
          title="Recognition earned by shipping."
          description="Competition results, research selections, and the certifications behind them — photographed as they happened, not just listed."
        />
      </div>

      <Section>
        <SectionHeading eyebrow="Highlights" title="Awards & recognition." />
        <AchievementsExhibition />
      </Section>

      <Section className="border-t border-line">
        <SectionHeading eyebrow="Certifications" title="Formal training & credentials." />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {certifications.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.05}>
              <div className="flex h-full flex-col">
                <FigureFrame
                  figureNumber={`C${i + 1}`}
                  caption={c.title}
                  location={c.issuer}
                  ratio="aspect-[3/4]"
                />
                <span className="mt-3 font-mono text-[11px] text-paper-faint">{c.year}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
