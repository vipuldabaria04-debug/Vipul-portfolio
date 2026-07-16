import type { Metadata } from "next";
import { BrainCircuit } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { SplitStory } from "@/components/ui/SplitStory";
import { EquationBlock } from "@/components/research/EquationBlock";
import { MeshGradient } from "@/components/ui/MeshGradient";
import { SpatialPanel } from "@/components/ui/SpatialPanel";
import { PinnArchitectureDiagram } from "@/components/research/PinnArchitectureDiagram";
import { pinnResearch } from "@/data/research";

export const metadata: Metadata = {
  title: "PINN Inertia Estimation — Research Case Study",
  description: pinnResearch.abstract,
};

export default function PinnResearchPage() {
  return (
    <>
      <div className="relative">
        <MeshGradient variant="research" className="-z-10" />
        <PageHeader eyebrow="Research Case Study" title={pinnResearch.title} description={pinnResearch.abstract}>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Badge>{pinnResearch.institution}</Badge>
          <Badge>{pinnResearch.period}</Badge>
          <span className="font-mono text-[12px] text-signal">{pinnResearch.status}</span>
        </div>

        <div className="pointer-events-none absolute right-10 top-16 hidden w-[220px] xl:block">
          <SpatialPanel
            title="PINN — Training"
            icon={<BrainCircuit className="h-3.5 w-3.5 text-signal" />}
            depth={0.6}
            rows={[
              { label: "Epoch", value: "512", tone: "trace", live: true },
              { label: "Physics Loss", value: "0.00013" },
              { label: "Validation", value: "97.8%", tone: "success" },
              { label: "Inference", value: "2 ms", tone: "success" },
            ]}
          />
        </div>
        </PageHeader>
      </div>

      {/* Problem statement */}
      <Section>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <SectionHeading eyebrow="Problem Statement" title="Why estimating inertia is getting harder." />
            <p className="text-[15px] leading-relaxed text-paper-muted">{pinnResearch.problemStatement}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card-surface p-8">
              <p className="eyebrow mb-4">Why it matters</p>
              <ul className="flex flex-col gap-3">
                {pinnResearch.whyItMatters.map((w) => (
                  <li key={w} className="flex gap-2.5 text-sm leading-relaxed text-paper-dim">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-trace" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* The lab, not just the equations */}
      <Section className="border-t border-line">
        <SplitStory
          figureNumber="01"
          caption="Research desk, IIT Kharagpur — EMU data review and model development"
          location="Kharagpur, West Bengal"
          tag="Research Desk"
          ratio="aspect-[4/3]"
          eyebrow="On Site"
          title="Where the estimator actually got built."
        >
          <p>
            Most of this project happened at a single desk — cleaning EMU measurement
            files, sketching residual formulations on paper before touching code, and
            re-running training loops late enough that the lab emptied out around me.
          </p>
          <p>
            The photograph reserved here is from that desk, mid-project.
          </p>
        </SplitStory>
      </Section>

      {/* What are PINNs */}
      <Section className="border-t border-line">
        <SectionHeading eyebrow="Background" title="What is a Physics-Informed Neural Network?" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <p className="text-[15px] leading-relaxed text-paper-muted">{pinnResearch.whatArePinns}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <EquationBlock
              label="Swing Equation"
              equation="2H/ω₀ · d²δ/dt² = Pₘ − Pₑ − D·dδ/dt"
              description="The governing differential equation relating rotor angle δ, inertia constant H, and power imbalance — the physical constraint embedded directly into the PINN's loss."
            />
          </Reveal>
        </div>
      </Section>

      {/* Methodology */}
      <Section className="border-t border-line">
        <SectionHeading eyebrow="Methodology" title="From raw EMU data to a trained estimator." />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pinnResearch.methodology.map((m, i) => (
            <Reveal key={m.step} delay={i * 0.05}>
              <div className="border-l border-line pl-5">
                <p className="font-mono text-[12px] text-signal">{m.step}</p>
                <p className="mt-2 font-medium text-paper">{m.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-paper-muted">{m.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Dataset */}
      <Section className="border-t border-line">
        <SectionHeading eyebrow="Dataset" title="Electromechanical Mode Unit (EMU) measurements." />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="text-[15px] leading-relaxed text-paper-muted">{pinnResearch.datasetOverview.description}</p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {pinnResearch.datasetOverview.properties.map((p) => (
                <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-paper-dim">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <MediaPlaceholder label="EMU measurement sample — frequency trace" />
          </Reveal>
        </div>
      </Section>

      {/* Architecture */}
      <Section className="border-t border-line">
        <SectionHeading eyebrow="Model Architecture" title="Data loss and physics loss, sharing one network." />
        <PinnArchitectureDiagram />
      </Section>

      {/* Loss function */}
      <Section className="border-t border-line">
        <SectionHeading eyebrow="Loss Function" title="A composite objective." description={pinnResearch.lossFunction.description} />
        <Reveal>
          <div className="mb-8">
            <EquationBlock
              label="Composite Loss"
              equation="L = λ₁·L_data + λ₂·L_physics + λ₃·L_reg"
              description="Data-fitting, physics-residual, and regularization terms, weighted and summed — the single objective the network is trained against."
            />
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {pinnResearch.lossFunction.terms.map((t) => (
            <Reveal key={t.symbol}>
              <div className="card-surface p-6">
                <p className="font-mono text-lg text-signal">{t.symbol}</p>
                <p className="mt-2 text-sm leading-relaxed text-paper-muted">{t.meaning}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-8">
            <MediaPlaceholder label="Training loss curves — L_data vs L_physics vs epoch" ratio="aspect-[21/9]" />
          </div>
        </Reveal>
      </Section>

      {/* Results placeholder */}
      <Section className="border-t border-line">
        <SectionHeading eyebrow="Results" title="Estimation accuracy vs. classical baselines." />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <MediaPlaceholder label="Estimated vs. true inertia — scatter plot" />
          <MediaPlaceholder label="Robustness to measurement noise" />
        </div>
      </Section>

      {/* Key learnings */}
      <Section className="border-t border-line">
        <SectionHeading eyebrow="Key Learnings" title="What the project actually taught me." />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {pinnResearch.keyLearnings.map((l, i) => (
            <Reveal key={l} delay={i * 0.05}>
              <div className="card-surface p-6 text-sm leading-relaxed text-paper-muted">{l}</div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Future work */}
      <Section className="border-t border-line">
        <SectionHeading eyebrow="Future Work" title="Where this goes next." />
        <ul className="flex flex-col gap-3">
          {pinnResearch.futureWork.map((f) => (
            <li key={f} className="flex gap-2.5 text-sm leading-relaxed text-paper-dim">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-trace" />
              {f}
            </li>
          ))}
        </ul>
      </Section>

      {/* Skills + placeholders for paper/repo */}
      <Section className="border-t border-line">
        <div className="card-surface flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow mb-3">Skills applied</p>
            <div className="flex flex-wrap gap-2">
              {pinnResearch.skills.map((s) => (
                <Badge key={s}>{s}</Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-line px-4 py-2 font-mono text-[12px] text-paper-faint">
              Paper — placeholder link
            </span>
            <span className="rounded-full border border-line px-4 py-2 font-mono text-[12px] text-paper-faint">
              GitHub repo — placeholder link
            </span>
          </div>
        </div>
      </Section>
    </>
  );
}
