import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { Leadership } from "@/components/sections/Leadership";
import { FeaturedProjectSection } from "@/components/sections/FeaturedProjectSection";
import { SkillsConstellation } from "@/components/sections/SkillsConstellation";
import { AchievementsGrid } from "@/components/sections/AchievementsGrid";
import { ContactSection } from "@/components/sections/ContactSection";
import { SchematicDivider } from "@/components/ui/SchematicDivider";
import { Reveal } from "@/components/ui/Reveal";
import { experience } from "@/data/experience";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SchematicDivider />

      <AboutPreview />

      <Section id="experience">
        <SectionHeading
          eyebrow="Experience"
          title="Time on the ground — labs, substations, and power plants."
          description="Three internships, three very different views of how electrical infrastructure actually runs."
        />
        <ExperienceTimeline entries={experience} />
      </Section>

      <Section id="leadership">
        <SectionHeading eyebrow="Leadership" title="Running the room, not just the research." />
        <Leadership />
      </Section>

      <Section id="featured-project">
        <SectionHeading
          eyebrow="Flagship Build"
          title="Urban Pulse"
          description="A hybrid energy-harvesting smart pavement that senses the traffic it powers itself from."
        />
        <FeaturedProjectSection />
      </Section>

      <Section id="skills">
        <SectionHeading eyebrow="Toolkit" title="What I build with." />
        <SkillsConstellation />
      </Section>

      <Section id="achievements">
        <SectionHeading eyebrow="Recognition" title="Selected achievements." />
        <AchievementsGrid />
        <Reveal>
          <div className="mt-8">
            <Link
              href="/achievements"
              className="link-underline inline-flex items-center gap-1.5 font-mono text-[13px] text-trace-bright"
            >
              View all achievements & certifications
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Reveal>
      </Section>

      <Section id="contact">
        <ContactSection />
      </Section>
    </>
  );
}
