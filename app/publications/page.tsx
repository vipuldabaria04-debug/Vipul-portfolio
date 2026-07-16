import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { pinnResearch } from "@/data/research";

export const metadata: Metadata = {
  title: "Publications",
  description: "Publications and manuscripts by Vipul Dabaria.",
};

export default function PublicationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Publications"
        title="Research writing, in progress."
        description="This page will hold peer-reviewed papers, preprints, and technical reports as they're published. One manuscript is currently in preparation."
      />

      <Section>
        <div className="card-surface flex flex-col gap-4 p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-base font-medium text-paper">{pinnResearch.title}</p>
            <Badge>Manuscript in preparation</Badge>
          </div>
          <p className="text-sm leading-relaxed text-paper-muted">{pinnResearch.abstract}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <span className="rounded-full border border-line px-4 py-2 font-mono text-[12px] text-paper-faint">
              Target venue — placeholder
            </span>
            <span className="rounded-full border border-line px-4 py-2 font-mono text-[12px] text-paper-faint">
              DOI — placeholder
            </span>
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-dashed border-line p-8 text-center">
          <p className="font-mono text-[12px] uppercase tracking-wide text-paper-faint">
            Future publications will appear here
          </p>
        </div>
      </Section>
    </>
  );
}
