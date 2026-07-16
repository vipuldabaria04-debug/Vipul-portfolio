import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { FigureFrame } from "@/components/ui/FigureFrame";
import { SkillsConstellation } from "@/components/sections/SkillsConstellation";
import { researchInterests } from "@/data/research";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Vipul Dabaria's work in electrical engineering, research, and embedded systems.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Grounded in circuits. Curious about everything they power."
        description="A closer look at how I ended up building smart pavement, estimating grid inertia, and running a campus innovation cell — all before graduating."
      />

      <Section>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="flex flex-col gap-6 text-[15px] leading-relaxed text-paper-muted">
              <p>
                I&apos;m {site.name}, a third-year {site.degree} student at {site.university} in
                Kota, India, currently holding a CGPA of {site.cgpa}. My interest in electrical
                engineering didn&apos;t start with textbooks — it started with wanting to know why
                the grid behaves the way it does when something goes wrong, and whether that
                behavior could be predicted, sensed, or even harvested.
              </p>
              <p>
                That question has taken me to a live 220kV substation with Power Grid Corporation
                of India, into the turbine halls of an NTPC combined-cycle plant, and into a
                research lab at IIT Kharagpur applying physics-informed machine learning to grid
                inertia estimation. Each experience sharpened the same instinct: infrastructure
                should sense itself, and the physics should stay in the loop even when machine
                learning is doing the heavy lifting.
              </p>
              <p>
                Outside of coursework and internships, I coordinate the Innovation & Incubation
                Cell (IIC) / E-Cell at RTU — organizing the institute&apos;s Internship Fair,
                running technical workshops, and building the small-team habits that make student
                organizations actually ship things. My flagship build, Urban Pulse, grew directly
                out of that overlap between research curiosity and a bias toward building real
                things: a smart pavement panel that harvests the energy of passing vehicles while
                simultaneously sensing them.
              </p>
              <p>
                I&apos;m looking for research collaborations, internships, and conversations with
                people building at the intersection of power systems, embedded sensing, and
                intelligent infrastructure.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <FigureFrame figureNumber="01" caption="Portrait" ratio="aspect-[4/5]" priority />
            <div className="card-surface mt-6 p-8">
              <p className="eyebrow mb-6">At a glance</p>
              <dl className="flex flex-col gap-5">
                {[
                  ["Based in", site.location],
                  ["Studying", `${site.degree}`],
                  ["Institution", site.university],
                  ["Graduating", site.year],
                  ["CGPA", site.cgpa],
                  ["Current role", "IIC / E-Cell Coordinator"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between border-b border-line pb-3">
                    <dt className="font-mono text-[12px] uppercase tracking-wide text-paper-muted">{k}</dt>
                    <dd className="text-sm text-paper">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Workshop moments — a horizontal documentary strip */}
      <Section className="border-t border-line">
        <SectionHeading eyebrow="Workshop Moments" title="Where the work actually happens." />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <FigureFrame figureNumber="02" caption="Soldering the Urban Pulse controller board" tag="Workshop" />
          <FigureFrame figureNumber="03" caption="IIC / E-Cell technical workshop, RTU campus" tag="IIC / E-Cell" />
          <FigureFrame figureNumber="04" caption="Campus, between classes" tag="Campus" />
        </div>
      </Section>

      <Section className="border-t border-line">
        <SectionHeading
          eyebrow="Research Interests"
          title="Where I want to spend the next decade of work."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {researchInterests.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.05}>
              <div className="border-l border-line pl-5">
                <p className="font-medium text-paper">{r.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-paper-muted">{r.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line">
        <SectionHeading eyebrow="Toolkit" title="Technical skills." />
        <SkillsConstellation />
      </Section>
    </>
  );
}
