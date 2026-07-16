import { Mail, Github, Linkedin, Twitter, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { FigureFrame } from "@/components/ui/FigureFrame";
import { ContactForm } from "@/components/sections/ContactForm";
import { site } from "@/data/site";

export function ContactSection() {
  return (
    <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr]">
      <Reveal>
        <FigureFrame figureNumber="01" caption="Desk, instruments, and the work in progress" tag="Workspace" ratio="aspect-[4/3]" priority />

        <p className="eyebrow mb-3 mt-8">Contact</p>
        <h2 className="text-3xl font-semibold text-paper md:text-4xl">
          Building something in power systems, embedded sensing, or ML?
        </h2>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-paper-muted">
          I&apos;m open to research collaborations, internships, and conversations about
          intelligent infrastructure. Reach out directly or use the form.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <a href={site.socials.email} className="flex items-center gap-3 text-sm text-paper-dim hover:text-signal">
            <Mail className="h-4 w-4" /> {site.email}
          </a>
          <div className="flex items-center gap-3 text-sm text-paper-dim">
            <MapPin className="h-4 w-4" /> {site.location}
          </div>
          <div className="flex items-center gap-4 pt-2">
            <a href={site.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-paper-muted hover:text-signal">
              <Github className="h-5 w-5" />
            </a>
            <a href={site.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-paper-muted hover:text-signal">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href={site.socials.twitter} target="_blank" rel="noreferrer" aria-label="Twitter" className="text-paper-muted hover:text-signal">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <ContactForm />
      </Reveal>
    </div>
  );
}
