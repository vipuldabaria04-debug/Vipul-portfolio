"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, FileDown, Zap, Flame } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FloatingParticles } from "@/components/ui/FloatingParticles";
import { SpatialPanel } from "@/components/ui/SpatialPanel";
import { MeshGradient } from "@/components/ui/MeshGradient";
import { ScrollCue } from "@/components/ui/ScrollCue";
import { HeroScene } from "@/components/sections/HeroScene";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Hero() {
  // True once the 3D scene has loaded and is showing (desktop only).
  const [sceneReady, setSceneReady] = useState(false);

  return (
    <section className="relative overflow-hidden pb-24 pt-40 md:pb-32 md:pt-48">
      <MeshGradient variant="default" />
      <div className="schematic-bg absolute inset-0 -z-10" />
      <FloatingParticles count={18} />
      <HeroScene onReadyChange={setSceneReady} />

      {/* Spatial instrument panels — a quiet nod to the two grids this work has run on */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: sceneReady ? 0 : 1, scale: 1 }}
        transition={sceneReady ? { duration: 0.8 } : { duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute right-6 top-32 hidden w-[190px] lg:right-10 lg:block xl:w-[210px]"
      >
        <SpatialPanel
          title="PGCIL — Grid"
          icon={<Zap className="h-3.5 w-3.5 text-signal" />}
          depth={0.7}
          floatDelay={0}
          rows={[
            { label: "Voltage", value: "220 kV", tone: "signal" },
            { label: "Frequency", value: "49.98 Hz" },
            { label: "Breaker", value: "Closed", tone: "success" },
            { label: "Grid Health", value: "Nominal", tone: "success" },
          ]}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: sceneReady ? 0 : 1, scale: 1 }}
        transition={sceneReady ? { duration: 0.8 } : { duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute right-16 top-[26rem] hidden w-[190px] lg:block xl:right-24 xl:w-[210px]"
      >
        <SpatialPanel
          title="NTPC — Plant"
          icon={<Flame className="h-3.5 w-3.5 text-signal" />}
          depth={0.5}
          floatDelay={1.4}
          rows={[
            { label: "Plant Load", value: "94%", tone: "trace" },
            { label: "Steam Pressure", value: "128 bar" },
            { label: "Efficiency", value: "58%", tone: "trace" },
            { label: "Turbine RPM", value: "3,000" },
          ]}
        />
      </motion.div>

      <div className={cn("container-page relative z-10", sceneReady && "pointer-events-none")}>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2.5"
        >
          <span className="node-dot animate-pulseTrace" />
          <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-paper-muted">
            {site.location} · Available for research & internships
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-4xl text-[2.6rem] font-semibold leading-[1.06] text-paper sm:text-6xl md:text-7xl lg:max-w-[8.8em] lg:text-[3.4rem] xl:text-6xl 2xl:text-[4rem]"
        >
          I build the wires<br />
          between <span className="text-signal">physics</span> and{" "}
          <span className="italic font-normal text-trace-bright">code.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-xl text-[16px] leading-relaxed text-paper-muted md:text-lg lg:max-w-[28rem]"
        >
          {site.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4"
        >
          <Button href="/projects/urban-pulse" icon={<ArrowUpRight className="h-4 w-4" />}>
            View Urban Pulse
          </Button>
          <Button href="/resume" variant="secondary" icon={<FileDown className="h-4 w-4" />}>
            Download Resume
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-line pt-8 lg:mt-14 lg:max-w-[calc(50%-1rem)]"
        >
          {[
            "RTU, Kota — B.Tech EE",
            "IIT Kharagpur — Research",
            "PGCIL — 220kV Substation",
            "NTPC — Combined Cycle Plant",
          ].map((line) => (
            <span key={line} className="font-mono text-[12px] tracking-wide text-paper-faint">
              {line}
            </span>
          ))}
        </motion.div>
      </div>
      <ScrollCue />
    </section>
  );
}
