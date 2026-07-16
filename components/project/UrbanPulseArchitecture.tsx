"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const nodes = [
  { x: 60, y: 140, label: "Vehicle Axle", sub: "kinetic input", detail: "A passing vehicle axle deforms the panel surface, generating the single mechanical event that both charging and sensing pipelines respond to." },
  { x: 260, y: 140, label: "Piezo + Tribo Layer", sub: "hybrid harvesting", detail: "Stacked piezoelectric and triboelectric elements convert that deformation into two complementary charge profiles, harvested simultaneously from one impact." },
  { x: 470, y: 60, label: "Signal Conditioning", sub: "rectify · filter", detail: "Rectifies and filters the raw harvested waveform into a clean signal usable both for charging and as a detection trigger." },
  { x: 470, y: 220, label: "Energy Storage", sub: "supercap buffer", detail: "A supercapacitor buffer smooths harvested energy across axle events, powering the controller without an external supply." },
  { x: 690, y: 140, label: "ESP32 Controller", sub: "sense · classify", detail: "Reads the conditioned waveform to detect the axle event, classify vehicle type by shape and axle spacing, and estimate speed." },
  { x: 900, y: 60, label: "Wireless Uplink", sub: "LoRa / Wi-Fi", detail: "Streams per-event detections wirelessly to the analytics backend — no wired infrastructure required along the road." },
  { x: 900, y: 220, label: "Traffic Analytics", sub: "dashboard", detail: "Aggregates events into live counts, class distributions, and speed profiles for traffic-optimization decisions." },
];

const edges: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 4],
  [4, 5],
  [4, 6],
];

export function UrbanPulseArchitecture() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="card-surface overflow-x-auto p-6 md:p-10">
      <svg viewBox="0 0 980 300" className="min-w-[820px]" fill="none">
        {edges.map(([a, b], i) => {
          const from = nodes[a];
          const to = nodes[b];
          if (!from || !to) return null;
          const isLive = active === a || active === b;
          return (
            <g key={i}>
              <motion.line
                x1={from.x + 70}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth={1.5}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: "easeInOut" }}
              />
              {/* continuous quiet current flow along every trace */}
              <line
                x1={from.x + 70}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="#3B82F6"
                strokeWidth={1.3}
                strokeDasharray="1.5 22"
                className="animate-dashFlow"
                opacity={isLive ? 0.9 : 0.28}
              />
            </g>
          );
        })}

        {nodes.map((n, i) => {
          const isActive = active === i;
          const isCore = i === 4;
          return (
            <g
              key={n.label}
              tabIndex={0}
              role="button"
              aria-label={`${n.label} — ${n.detail}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="cursor-pointer outline-none"
            >
              {isCore && (
                <motion.rect
                  x={n.x - 14}
                  y={n.y - 30}
                  width={168}
                  height={60}
                  rx={12}
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth={1}
                  className="animate-glowPulse"
                  opacity={0.4}
                />
              )}
              <motion.rect
                x={n.x - 10}
                y={n.y - 26}
                width={160}
                height={52}
                rx={10}
                fill={isActive ? "#1B212B" : "#171B22"}
                stroke={isActive ? "#3B82F6" : isCore ? "#3B82F6" : "rgba(255,255,255,0.12)"}
                strokeWidth={isActive ? 1.6 : 1.2}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                animate={{ scale: isActive ? 1.035 : 1 }}
              />
              <text
                x={n.x + 70}
                y={n.y - 4}
                textAnchor="middle"
                fill="#F7F7F7"
                fontSize="12.5"
                fontFamily="var(--font-display)"
                fontWeight={600}
              >
                {n.label}
              </text>
              <text
                x={n.x + 70}
                y={n.y + 14}
                textAnchor="middle"
                fill="#A6B0C0"
                fontSize="10"
                fontFamily="var(--font-mono)"
              >
                {n.sub}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-6 min-h-[52px] border-t border-line pt-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={active ?? "default"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="text-sm leading-relaxed text-paper-muted"
          >
            {active !== null ? (
              <>
                <span className="font-mono text-[12px] text-signal">{nodes[active]?.label} — </span>
                {nodes[active]?.detail}
              </>
            ) : (
              <span className="font-mono text-[12px] uppercase tracking-wide text-paper-faint">
                Hover or focus a node to see how it fits into the pipeline.
              </span>
            )}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
