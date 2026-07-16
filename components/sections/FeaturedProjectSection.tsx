import { ArrowUpRight, Zap, Radio, Gauge } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { featuredProject } from "@/data/projects";

export function FeaturedProjectSection() {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-900 shadow-soft">
        <div className="schematic-bg absolute inset-0 -z-0 opacity-50" />
        <div className="bg-directional-light absolute inset-0 -z-0" />
        <div className="relative grid grid-cols-1 gap-10 p-8 md:p-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-3">Featured Project</p>
            <h3 className="text-3xl font-semibold text-paper md:text-4xl">
              {featuredProject.title}
            </h3>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-paper-muted">
              {featuredProject.tagline}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {featuredProject.tags.slice(0, 4).map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/projects/urban-pulse" icon={<ArrowUpRight className="h-4 w-4" />}>
                Explore the case study
              </Button>
              <span className="font-mono text-[12px] text-signal">
                {featuredProject.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {featuredProject.metrics?.map((m) => (
              <TiltCard key={m.label} maxTilt={2.5} className="card-surface flex flex-col justify-between p-5">
                <span className="font-display text-2xl font-semibold text-paper">
                  {m.value}
                </span>
                <span className="mt-2 font-mono text-[11px] uppercase tracking-wide text-paper-muted">
                  {m.label}
                </span>
              </TiltCard>
            ))}
            <div className="card-surface col-span-2 flex items-center gap-4 p-5">
              <Zap className="h-5 w-5 shrink-0 text-signal" />
              <Radio className="h-5 w-5 shrink-0 text-trace" />
              <Gauge className="h-5 w-5 shrink-0 text-paper-muted" />
              <span className="text-sm text-paper-muted">
                Harvest · Sense · Classify — one panel, three functions.
              </span>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
