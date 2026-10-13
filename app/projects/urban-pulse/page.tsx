import type { Metadata } from "next";
import { Zap, Radio, Gauge, ShieldCheck, Github, ArrowUpRight, Trophy, Activity, Target, BatteryCharging, Wifi, Layers } from "lucide-react";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StatCounter } from "@/components/ui/StatCounter";
import { FigureFrame } from "@/components/ui/FigureFrame";
import { SplitStory } from "@/components/ui/SplitStory";
import { SpatialPanel } from "@/components/ui/SpatialPanel";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { MeshGradient } from "@/components/ui/MeshGradient";
import { UrbanPulseArchitecture } from "@/components/project/UrbanPulseArchitecture";
import { ProductTabs } from "@/components/project/ProductTabs";
import { CinematicFeature } from "@/components/project/CinematicFeature";
import { featuredProject } from "@/data/projects";

export const metadata: Metadata = {
  title: "Urban Pulse",
  description:
    "Urban Pulse is a hybrid piezoelectric + triboelectric smart-pavement system with an ESP32 controller for self-powered vehicle detection, classification, and speed estimation.",
};

const developmentTimeline = [
  { phase: "Concept & literature review", detail: "Surveyed energy-harvesting pavement research and defined the hybrid piezo-tribo approach." },
  { phase: "Harvesting layer prototyping", detail: "Built and load-tested piezoelectric and triboelectric layers under repeated mechanical cycling." },
  { phase: "Embedded sensing pipeline", detail: "Designed the ESP32 signal-conditioning and capture pipeline for axle-event detection." },
  { phase: "Classification & speed logic", detail: "Developed waveform-based vehicle classification and dual-sensor speed estimation." },
  { phase: "Field prototype & demo", detail: "Assembled a working panel prototype for live demonstration at Electrothon 8.0 and IIT Bombay Techfest." },
  { phase: "Patent filing", detail: "Filed a patent application covering the hybrid harvesting and sensing method (in progress)." },
];

const metrics = [
  { icon: Target, value: 96.2, suffix: "%", decimals: 1, label: "Detection accuracy" },
  { icon: BatteryCharging, value: 18, suffix: " mJ", decimals: 0, label: "Energy / axle event" },
  { icon: Wifi, value: 120, suffix: " m", decimals: 0, label: "Wireless range" },
  { icon: Layers, value: 4, suffix: "", decimals: 0, label: "Vehicle classes" },
];

export default function UrbanPulsePage() {
  return (
    <>
      {/* Cinematic opener — the first scroll expands the prototype to full screen,
          then the project summary below is revealed. Swap the two /images paths
          for real photographs of the build when you have them. */}
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="/images/urban-pulse-panel.svg"
        bgImageSrc="/images/urban-pulse-backdrop.svg"
        mediaAlt="Diagram of the Urban Pulse panel: a piezoelectric and triboelectric layer stack with an axle event passing through it, wired to an ESP32 controller."
        title={featuredProject.title}
        date={featuredProject.achievements?.[0]}
        scrollToExpand="Scroll to expand"
      >
        <div className="relative">
          <MeshGradient variant="product" className="-z-10" />
          <div className="container-page relative pb-12 pt-2 md:pt-6">
            <p className="text-balance max-w-2xl font-display text-2xl font-semibold leading-[1.2] text-paper md:text-4xl">
              {featuredProject.tagline}
            </p>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-paper-muted md:text-base">
              {featuredProject.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="#gallery" variant="secondary">View media</Button>
              <Button href={`https://${featuredProject.repoPlaceholder}`} variant="ghost" external icon={<Github className="h-4 w-4" />}>
                Repository
              </Button>
              <span className="font-mono text-[12px] text-signal">{featuredProject.status}</span>
            </div>

            <div className="pointer-events-none absolute right-10 top-2 hidden w-[220px] xl:block">
              <SpatialPanel
                title="Urban Pulse — Live"
                icon={<Activity className="h-3.5 w-3.5 text-signal" />}
                depth={0.6}
                rows={[
                  { label: "Vehicle Status", value: "Detected", tone: "signal", live: true },
                  { label: "Energy Harvested", value: "18 mJ", tone: "success" },
                  { label: "Sensor Status", value: "Healthy", tone: "success" },
                  { label: "Wireless", value: "Connected" },
                ]}
              />
            </div>
          </div>
        </div>
      </ScrollExpandMedia>

      {/* Product-page tab nav — jumps to each section below, Apple OS-switcher style */}
      <ProductTabs />

      {/* Cinematic statement — a beat of pure narrative before the data starts */}
      <Section className="!py-20 text-center">
        <Reveal>
          <p className="text-balance mx-auto max-w-3xl font-display text-3xl font-semibold leading-[1.2] text-paper md:text-5xl">
            One panel. <span className="text-signal">Three functions.</span> Zero external power.
          </p>
        </Reveal>
      </Section>

      {/* Metrics strip */}
      <Section className="border-b border-t border-line !py-16">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.06}>
              <SpotlightCard className="flex h-full flex-col gap-4 p-6">
                <m.icon className="h-4 w-4 text-signal" />
                <StatCounter value={m.value} suffix={m.suffix} label={m.label} decimals={m.decimals} />
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Overview + role */}
      <Section id="overview">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Overview"
              title="A pavement panel that powers itself while it watches the road."
              description="Urban Pulse fuses two energy-harvesting mechanisms with an embedded sensing pipeline, turning ordinary vehicle traffic into both a power source and a real-time traffic dataset."
            />
            <div className="flex flex-col gap-5 text-[15px] leading-relaxed text-paper-muted">
              <p>
                Each panel embeds a stacked piezoelectric and triboelectric layer beneath a
                driving surface. As a vehicle axle passes, mechanical deformation of the stack
                generates a usable charge — captured, rectified, and buffered by onboard signal
                conditioning — while the same deformation event triggers the sensing pipeline.
              </p>
              <p>
                An ESP32 microcontroller reads the conditioned waveform to detect an axle event,
                classify the vehicle by waveform shape and axle spacing, and estimate speed from
                a two-sensor time-of-flight measurement. Results are pushed wirelessly to a
                traffic-analytics dashboard for real-time monitoring and optimization.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card-surface flex flex-col gap-6 p-8">
              <div>
                <p className="eyebrow mb-2">Role</p>
                <p className="text-sm text-paper">{featuredProject.role}</p>
              </div>
              <div>
                <p className="eyebrow mb-2">Timeline</p>
                <p className="text-sm text-paper">{featuredProject.period}</p>
              </div>
              <div>
                <p className="eyebrow mb-2">Stack</p>
                <div className="flex flex-wrap gap-2">
                  {featuredProject.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Cinematic feature — the product moment, Apple marketing-page style */}
      <Section className="border-t border-line">
        <CinematicFeature
          eyebrow="In the field"
          headline="It senses what it powers itself from — no external supply, no wired sensor line."
          caption="Urban Pulse panel, installed test section"
          tag="Field Install"
        />
      </Section>

      {/* Architecture */}
      <Section id="architecture" className="border-t border-line">
        <SectionHeading
          eyebrow="System Architecture"
          title="From axle impact to analytics dashboard."
          description="Mechanical energy and sensing data travel the same physical event, split into two downstream paths: power and information."
        />
        <UrbanPulseArchitecture />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { icon: Zap, title: "Harvest", detail: "Hybrid piezo-tribo stack converts axle deformation into usable charge." },
            { icon: Radio, title: "Sense", detail: "ESP32 captures the same event's waveform for detection and classification." },
            { icon: Gauge, title: "Analyze", detail: "Speed, class, and count are computed on-device and streamed wirelessly." },
          ].map(({ icon: Icon, title, detail }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <SpotlightCard className="h-full p-6">
                <Icon className="h-5 w-5 text-signal" />
                <p className="mt-4 font-medium text-paper">{title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-paper-muted">{detail}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Development timeline — alternating sides for visual rhythm as you scroll */}
      <Section id="build-log" className="border-t border-line">
        <SectionHeading eyebrow="Build Log" title="How the panel came together." />
        <div className="flex flex-col gap-8">
          {developmentTimeline.map((t, i) => (
            <Reveal key={t.phase} delay={i * 0.05} y={i % 2 === 0 ? 16 : -16}>
              <div
                className={`grid grid-cols-1 gap-3 border-b border-line pb-8 last:border-0 md:grid-cols-[220px_1fr] ${
                  i % 2 === 1 ? "md:grid-cols-[1fr_220px] md:text-right" : ""
                }`}
              >
                {i % 2 === 1 ? (
                  <>
                    <p className="order-2 text-sm leading-relaxed text-paper-muted md:order-1">{t.detail}</p>
                    <p className="order-1 font-mono text-[12px] uppercase tracking-wide text-signal md:order-2">{t.phase}</p>
                  </>
                ) : (
                  <>
                    <p className="font-mono text-[12px] uppercase tracking-wide text-signal">{t.phase}</p>
                    <p className="text-sm leading-relaxed text-paper-muted">{t.detail}</p>
                  </>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Build documentation — the prototype, as it was actually built */}
      <Section className="border-t border-line">
        <SectionHeading
          eyebrow="Build Documentation"
          title="From breadboard to buried panel."
          description="Photographs from the actual build — layer stack-up, controller assembly, and load testing — are reserved below and will replace these frames directly."
        />
        <SplitStory
          figureNumber="04"
          caption="Hybrid piezo-tribo harvesting layer, mid-assembly"
          tag="Harvesting Layer"
          ratio="aspect-[4/3]"
          eyebrow="Hardware"
          title="Two harvesting mechanisms, one stack."
        >
          <p>
            The piezoelectric and triboelectric layers were prototyped and load-tested
            separately before being combined into a single panel stack, to isolate
            failure modes under repeated mechanical cycling.
          </p>
        </SplitStory>
      </Section>

      {/* Gallery placeholders — bento-style asymmetric grid, fully captioned */}
      <Section id="gallery" className="border-t border-line">
        <SectionHeading eyebrow="Media" title="Gallery & demo footage." description="Every frame below is reserved for a real photograph or clip from the build and demo days." />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FigureFrame
            figureNumber="05"
            caption="Assembled panel prototype, top view"
            tag="Prototype"
            className="lg:col-span-2 lg:row-span-2"
            ratio="aspect-square lg:aspect-auto lg:h-full"
          />
          <FigureFrame figureNumber="06" caption="Harvesting layer stack-up, exploded view" />
          <FigureFrame figureNumber="07" caption="ESP32 controller board, close-up" tag="PCB" />
          <FigureFrame
            figureNumber="08"
            caption="Live demo, Electrothon 8.0 finals"
            kind="video"
            className="sm:col-span-2 lg:col-span-1"
          />
          <FigureFrame figureNumber="09" caption="Jury round, IIT Bombay Techfest" kind="video" />
          <FigureFrame
            figureNumber="10"
            caption="Traffic analytics dashboard, live session"
            className="sm:col-span-2 lg:col-span-1"
          />
        </div>
      </Section>

      {/* Recognition + IP */}
      <Section id="recognition" className="border-t border-line">
        <SectionHeading eyebrow="Recognition" title="Where this project has been shown." />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {featuredProject.achievements?.map((a, i) => (
            <Reveal key={a} delay={i * 0.06}>
              <div className="card-surface flex items-center gap-3 p-6">
                <Trophy className="h-4 w-4 shrink-0 text-gold" />
                <span className="text-sm text-paper">{a}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="card-surface mt-6 flex flex-col items-start gap-4 p-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <ShieldCheck className="h-8 w-8 shrink-0 text-gold" />
              <div>
                <p className="font-medium text-paper">Patent application in progress</p>
                <p className="mt-1 text-sm text-paper-muted">
                  Covering the hybrid piezoelectric–triboelectric harvesting and sensing method.
                </p>
              </div>
            </div>
            <Button href="/contact" icon={<ArrowUpRight className="h-4 w-4" />}>
              Discuss this project
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
