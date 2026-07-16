import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { FigureFrame } from "@/components/ui/FigureFrame";
import { MeshGradient } from "@/components/ui/MeshGradient";
import { photos } from "@/data/photography";

export const metadata: Metadata = {
  title: "Photography",
  description: "A personal photography gallery — sites, campuses, and moments along the way.",
};

export default function PhotographyPage() {
  return (
    <>
      <div className="relative">
        <MeshGradient variant="research" className="-z-10" />
        <PageHeader
          eyebrow="Photography"
          title="What I notice when I'm not building."
          description="Frames from substations, plants, campuses, and the odd quiet moment in between — the least structured gallery on the site, and the best home for anything that doesn't fit a specific story elsewhere."
        />
      </div>

      <Section>
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {photos.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.05} className="mb-6 break-inside-avoid">
              <FigureFrame
                figureNumber={String(i + 1).padStart(2, "0")}
                caption={p.caption}
                location={p.location}
                ratio={i % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}
              />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
