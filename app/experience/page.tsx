import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SplitStory } from "@/components/ui/SplitStory";
import { SpatialPanel } from "@/components/ui/SpatialPanel";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { Leadership } from "@/components/sections/Leadership";
import { MeshGradient } from "@/components/ui/MeshGradient";
import { experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Research and industrial experience across IIT Kharagpur, PGCIL, and NTPC.",
};

const kgp = experience.find((e) => e.id === "iit-kgp")!;
const pgcil = experience.find((e) => e.id === "pgcil")!;
const ntpc = experience.find((e) => e.id === "ntpc")!;

export default function ExperiencePage() {
  return (
    <>
      <div className="relative">
        <MeshGradient variant="research" className="-z-10" />
        <PageHeader
          eyebrow="Experience — Field Journal"
          title="Three internships. Three views of the grid."
          description="From a research desk at IIT Kharagpur to a live 220kV switchyard and a combined-cycle turbine hall — documented as it happened. Photographs from each placement are on their way in; the frames below are reserved for them."
        />
      </div>

      {/* Industrial field journal — immersive storytelling, one placement at a time */}
      <Section className="flex flex-col gap-28 md:gap-36">
        <SplitStory
          figureNumber="01"
          caption="Research desk, IIT Kharagpur — physics-informed ML for power system inertia estimation"
          location="Kharagpur, West Bengal"
          tag="PINN Research"
          eyebrow={`${kgp.org} · ${kgp.period}`}
          title={kgp.role}
        >
          <p>{kgp.summary}</p>
          <p>{kgp.responsibilities[0]}</p>
          <Link
            href={kgp.href ?? "/research/pinn-inertia-estimation"}
            className="link-underline inline-flex w-fit items-center gap-1.5 font-mono text-[13px] text-trace"
          >
            Read the full research case study
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </SplitStory>

        <SplitStory
          reverse
          figureNumber="02"
          caption="220kV Air-Insulated Switchyard — busbar arrangement and live switching operations"
          location={pgcil.org}
          tag="220kV AIS"
          eyebrow={`${pgcil.org} · ${pgcil.period}`}
          title={pgcil.role}
        >
          <p>{pgcil.summary}</p>
          <p>{pgcil.responsibilities[1]}</p>
        </SplitStory>

        <SplitStory
          figureNumber="03"
          caption="Combined-cycle turbine hall — gas turbine, HRSG, and steam turbine stages"
          location={ntpc.org}
          tag="Combined Cycle"
          eyebrow={`${ntpc.org} · ${ntpc.period}`}
          title={ntpc.role}
        >
          <p>{ntpc.summary}</p>
          <p>{ntpc.responsibilities[0]}</p>
        </SplitStory>
      </Section>

      {/* Live readouts — the same instrument-panel language used on the homepage,
          grounding the photo-led narrative in real engineering data */}
      <Section className="border-t border-line">
        <SectionHeading
          eyebrow="Instrumentation"
          title="What the panels actually read."
          description="The same class of readouts observed on-site at PGCIL and NTPC, reproduced here in the site's own instrument language."
        />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <SpatialPanel
            title="PGCIL — Grid"
            depth={0.3}
            rows={[
              { label: "Voltage", value: "220 kV", tone: "signal" },
              { label: "Frequency", value: "49.98 Hz" },
              { label: "Breaker", value: "Closed", tone: "success" },
              { label: "Grid Health", value: "Nominal", tone: "success" },
            ]}
          />
          <SpatialPanel
            title="NTPC — Plant"
            depth={0.3}
            rows={[
              { label: "Plant Load", value: "94%", tone: "trace" },
              { label: "Steam Pressure", value: "128 bar" },
              { label: "Efficiency", value: "58%", tone: "trace" },
              { label: "Turbine RPM", value: "3,000" },
            ]}
          />
        </div>
      </Section>

      {/* The detailed engineering brief remains available in full below */}
      <Section className="border-t border-line">
        <SectionHeading
          eyebrow="Full Record"
          title="The complete engineering brief."
          description="Responsibilities, systems, technologies, and outcomes for each placement, in detail."
        />
        <ExperienceTimeline entries={experience} />
      </Section>

      <Section className="border-t border-line">
        <SectionHeading eyebrow="Leadership" title="Running IIC / E-Cell at RTU." />
        <Leadership />
      </Section>
    </>
  );
}
