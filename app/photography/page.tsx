import type { Metadata } from "next";
import ScrollMorphHero from "@/components/ui/scroll-morph-hero";
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
      {/* Scroll-driven opener: the frames assemble into a circle, then open into an arc
          you sweep through by scrolling. Real page scroll — nothing is intercepted. */}
      <div className="relative">
        <MeshGradient variant="research" className="-z-10" />
        <ScrollMorphHero
          photos={photos.map(({ src, caption, location }) => ({ src, caption, location }))}
          introTitle="What I notice when I'm not building."
          introHint="Scroll to explore"
          eyebrow="Photography"
          arcTitle="Frames from the field"
          arcDescription="Substations, plants, campuses, and the quiet moments in between. Hover or tap a frame to read its caption."
        />
      </div>

      <Section id="photo-grid">
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {photos.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.05} className="mb-6 break-inside-avoid">
              <FigureFrame
                figureNumber={String(i + 1).padStart(2, "0")}
                caption={p.caption}
                location={p.location}
                ratio={i % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}
                src={p.src}
              />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
