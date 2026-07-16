import type { Metadata } from "next";
import { FileDown, Mail } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { SkillsGrid } from "@/components/sections/SkillsGrid";
import { experience } from "@/data/experience";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Resume",
  description: "Download Vipul Dabaria's resume, or view an interactive summary below.",
};

export default function ResumePage() {
  return (
    <>
      <PageHeader
        eyebrow="Resume"
        title="One page, or the interactive version below."
        description={`${site.degree} · ${site.university} · CGPA ${site.cgpa}`}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          {/*
            Place your PDF resume at /public/resume/vipul-dabaria-resume.pdf
            and this link will serve it directly.
          */}
          <Button href="/resume/vipul-dabaria-resume.pdf" external icon={<FileDown className="h-4 w-4" />}>
            Download PDF
          </Button>
          <Button href={site.socials.email} variant="secondary" icon={<Mail className="h-4 w-4" />}>
            Email me directly
          </Button>
        </div>
      </PageHeader>

      <Section>
        <SectionHeading eyebrow="Experience" title="Work history." />
        <ExperienceTimeline entries={experience} />
      </Section>

      <Section className="border-t border-line">
        <SectionHeading eyebrow="Skills" title="Technical toolkit." />
        <SkillsGrid />
      </Section>
    </>
  );
}
