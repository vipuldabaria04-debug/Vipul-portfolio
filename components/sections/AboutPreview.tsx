import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { StatCounter } from "@/components/ui/StatCounter";
import { Button } from "@/components/ui/Button";
import { stats } from "@/data/skills";
import { ArrowUpRight } from "lucide-react";

export function AboutPreview() {
  return (
    <Section id="about">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <p className="eyebrow mb-3">About</p>
          <h2 className="text-3xl font-semibold text-paper md:text-4xl">
            An engineer who prototypes at the boundary of hardware and physics.
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-paper-muted">
            I&apos;m a third-year Electrical Engineering student at RTU, Kota, spending most of my
            time where circuits meet real-world physics — power grids, embedded sensors, and the
            models that try to describe them. I&apos;ve spent internships inside a live substation,
            a combined-cycle power plant, and a research lab, and I keep coming back to the same
            question: how do you make infrastructure that senses, learns, and improves itself?
          </p>
          <div className="mt-8">
            <Button href="/about" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />}>
              More about me
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-8 rounded-2xl border border-line bg-ink-900/40 p-8 sm:grid-cols-2">
            {stats.map((s) => (
              <StatCounter
                key={s.label}
                value={s.value}
                suffix={s.suffix}
                label={s.label}
                decimals={s.label === "CGPA" ? 1 : 0}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
