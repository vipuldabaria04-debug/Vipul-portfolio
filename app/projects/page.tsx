import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FeaturedProjectSection } from "@/components/sections/FeaturedProjectSection";
import { ProjectCard } from "@/components/project/ProjectCard";
import { otherProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Urban Pulse and other engineering projects by Vipul Dabaria.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Things I've built to test an idea properly."
        description="A flagship smart-infrastructure system, a research prototype, and a handful of smaller tools built to document what I was learning."
      />

      <Section>
        <FeaturedProjectSection />
      </Section>

      <Section className="border-t border-line">
        <SectionHeading eyebrow="More Builds" title="Other projects." />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="https://github.com/vipuldabaria"
            target="_blank"
            rel="noreferrer"
            className="link-underline inline-flex items-center gap-1.5 font-mono text-[13px] text-trace-bright"
          >
            See everything on GitHub
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Section>
    </>
  );
}
