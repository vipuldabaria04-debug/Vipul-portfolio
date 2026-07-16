"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { skillGroups } from "@/data/skills";

function layoutNodes(count: number, radius: number, cx: number, cy: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  });
}

function ClusterCard({ category, items, index }: { category: string; items: string[]; index: number }) {
  const [active, setActive] = useState<number | null>(null);
  const cx = 150;
  const cy = 118;
  const radius = 86;
  const nodes = layoutNodes(items.length, radius, cx, cy);

  return (
    <Reveal delay={index * 0.06}>
      <div className="card-surface flex h-full flex-col p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-trace">
          {category}
        </p>
        <svg viewBox="0 0 300 240" className="mt-3 w-full">
          {nodes.map((n, i) => {
            const isActive = active === i;
            return (
              <line
                key={`line-${i}`}
                x1={cx}
                y1={cy}
                x2={n.x}
                y2={n.y}
                stroke={isActive ? "#3B82F6" : "rgba(255,255,255,0.1)"}
                strokeWidth={isActive ? 1.4 : 1}
              />
            );
          })}
          <circle cx={cx} cy={cy} r={5} fill="#3B82F6" opacity={0.9} />
          <circle cx={cx} cy={cy} r={11} fill="none" stroke="#3B82F6" strokeWidth={1} opacity={0.25} />

          {nodes.map((n, i) => {
            const isActive = active === i;
            return (
              <circle
                key={i}
                cx={n.x}
                cy={n.y}
                r={isActive ? 6 : 3}
                fill={isActive ? "#3B82F6" : "#7C8AA5"}
                className="cursor-default transition-[r] duration-200"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              />
            );
          })}
        </svg>

        {/* Active label shown below the diagram — avoids any risk of long
            skill names overflowing or colliding inside the SVG itself. */}
        <div className="mt-2 flex h-6 items-center justify-center">
          <AnimatePresence mode="wait">
            {active !== null && (
              <motion.span
                key={items[active]}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="rounded-md border border-line bg-ink-850 px-2.5 py-1 font-mono text-[11.5px] text-paper"
              >
                {items[active]}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Static fallback list for touch devices / no-JS-hover / accessibility —
            visually quiet, but ensures every skill is discoverable without hover. */}
        <div className="mt-3 flex flex-wrap gap-1.5 border-t border-line pt-3">
          {items.map((item) => (
            <span
              key={item}
              className="rounded-md border border-line bg-ink-850 px-2 py-1 text-[11px] text-paper-faint"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export function SkillsConstellation() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {skillGroups.map((group, i) => (
        <ClusterCard key={group.category} category={group.category} items={group.items} index={i} />
      ))}
    </div>
  );
}
