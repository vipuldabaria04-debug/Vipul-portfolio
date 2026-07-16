import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ThoughtsGrid } from "@/components/sections/ThoughtsGrid";

export const metadata: Metadata = {
  title: "Thoughts",
  description: "Short technical notes, research observations, and engineering lessons from Vipul Dabaria.",
};

export default function ThoughtsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Thoughts"
        title="Short notes on research, engineering, and everything in between."
        description="A running log of ideas, lessons, and observations — written as I have them, not after I've forgotten the interesting part."
      />
      <Section>
        <ThoughtsGrid />
      </Section>
    </>
  );
}
