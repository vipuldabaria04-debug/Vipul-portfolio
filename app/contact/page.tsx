import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Vipul Dabaria for research collaborations, internships, or opportunities.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Say hello."
        description="Whether it's a research collaboration, an internship, or just a good conversation about power systems — I'd like to hear from you."
      />
      <Section>
        <ContactSection />
      </Section>
    </>
  );
}
