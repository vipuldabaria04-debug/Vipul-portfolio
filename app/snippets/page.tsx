import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SnippetCard } from "@/components/project/SnippetCard";
import { snippets } from "@/data/snippets";

export const metadata: Metadata = {
  title: "Snippets",
  description: "Code excerpts, visualizations, and quick engineering insights from ongoing projects.",
};

export default function SnippetsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Snippets"
        title="Small pieces of the bigger projects."
        description="Visualizations, code excerpts, research insights, and lessons — the kind of thing that doesn't merit its own page but is worth keeping."
      />
      <Section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {snippets.map((s, i) => (
            <SnippetCard key={s.id} snippet={s} index={i} />
          ))}
        </div>
      </Section>
    </>
  );
}
