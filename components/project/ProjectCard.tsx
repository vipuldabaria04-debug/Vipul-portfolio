import { ArrowUpRight, Github } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import type { Project } from "@/data/projects";

function CardBody({ project }: { project: Project }) {
  return (
    <>
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-paper">{project.title}</h3>
          {project.href && (
            <ArrowUpRight className="h-4 w-4 shrink-0 text-paper-faint transition-colors" />
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-paper-muted">{project.tagline}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.slice(0, 3).map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <span className="font-mono text-[11px] text-paper-faint">{project.period}</span>
        {project.repoPlaceholder && (
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-paper-faint">
            <Github className="h-3.5 w-3.5" /> repo
          </span>
        )}
      </div>
    </>
  );
}

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <Reveal delay={index * 0.05}>
      <SpotlightCard
        href={project.href}
        className="flex h-full flex-col justify-between p-6 hover:border-signal/30"
      >
        <CardBody project={project} />
      </SpotlightCard>
    </Reveal>
  );
}
