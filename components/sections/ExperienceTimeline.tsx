"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Cpu, ClipboardList, TrendingUp } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import type { ExperienceEntry } from "@/data/experience";

export function ExperienceTimeline({ entries }: { entries: ExperienceEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.6 });

  return (
    <div ref={ref} className="relative">
      <div className="absolute left-[7px] top-2 bottom-2 hidden w-px bg-line md:block" aria-hidden="true" />
      <motion.div
        aria-hidden="true"
        className="absolute left-[7px] top-2 hidden w-px origin-top bg-gradient-to-b from-signal to-signal/20 md:block"
        style={{ scaleY: fill, height: "calc(100% - 16px)" }}
      />
      <div className="flex flex-col gap-14">
        {entries.map((e, i) => (
          <Reveal key={e.id} delay={i * 0.05}>
            <ExperienceCard entry={e} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function ExperienceCard({ entry: e }: { entry: ExperienceEntry }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative grid grid-cols-1 gap-4 md:grid-cols-[16px_1fr] md:gap-8">
      <div className="hidden pt-2 md:block">
        <span className="node-dot" />
      </div>
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-signal">
              {e.type}
            </p>
            <h3 className="mt-1 text-xl font-semibold text-paper md:text-2xl">
              {e.role}
            </h3>
            <p className="mt-1 text-[15px] text-paper-dim">{e.org}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[12px] text-paper-muted">{e.period}</p>
            <p className="font-mono text-[12px] text-paper-faint">{e.location}</p>
          </div>
        </div>

        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-paper-muted">
          {e.summary}
        </p>

        <ul className="mt-4 flex flex-col gap-2">
          {e.highlights.map((h) => (
            <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-paper-dim">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-trace" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          {e.skills.map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-5">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="inline-flex items-center gap-1.5 font-mono text-[13px] text-paper-dim transition-colors hover:text-signal-bright"
          >
            {open ? "Hide engineering brief" : "View engineering brief"}
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown className="h-3.5 w-3.5" />
            </motion.span>
          </button>

          {e.href && (
            <Link
              href={e.href}
              className="link-underline inline-flex items-center gap-1.5 font-mono text-[13px] text-trace-bright"
            >
              Read the research case study
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-6 grid grid-cols-1 gap-6 rounded-xl border border-line bg-ink-900/40 p-6 md:grid-cols-3 md:p-8">
                <BriefColumn
                  icon={ClipboardList}
                  title="Responsibilities"
                  items={e.responsibilities}
                />
                <BriefColumn
                  icon={Cpu}
                  title="Systems & Technologies"
                  items={e.systems}
                  extra={e.technologies}
                />
                <BriefColumn
                  icon={TrendingUp}
                  title="Outcomes"
                  items={e.outcomes}
                  accent="trace"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function BriefColumn({
  icon: Icon,
  title,
  items,
  extra,
  accent = "signal",
}: {
  icon: typeof Cpu;
  title: string;
  items: string[];
  extra?: string[];
  accent?: "signal" | "trace";
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${accent === "trace" ? "text-trace" : "text-signal"}`} />
        <p className="font-mono text-[11px] uppercase tracking-wide text-paper-muted">{title}</p>
      </div>
      <ul className="mt-3 flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item} className="text-[13px] leading-relaxed text-paper-dim">
            {item}
          </li>
        ))}
      </ul>
      {extra && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {extra.map((t) => (
            <span
              key={t}
              className="rounded-md border border-line bg-ink-850 px-2 py-1 font-mono text-[10.5px] text-paper-faint"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
