"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type NodeDef = { x: number; y: number; w: number; label: string; sub: string; detail: string; accent?: boolean };

const nodeList: NodeDef[] = [
  { x: 20, y: 134, w: 140, label: "EMU Inputs", sub: "t, frequency, angle", detail: "Real electromechanical mode measurements — frequency and phase-angle traces captured around grid disturbance events." },
  { x: 220, y: 134, w: 160, label: "PINN Network", sub: "fully-connected + autodiff", detail: "A fully-connected network whose outputs feed both a data-fitting loss and, via automatic differentiation, a physics-residual loss.", accent: true },
  { x: 440, y: 60, w: 150, label: "Predicted State", sub: "ω̂, δ̂", detail: "The network's predicted frequency deviation and rotor angle at each timestep." },
  { x: 440, y: 210, w: 150, label: "Swing-Eq Residual", sub: "physics constraint", detail: "The swing equation evaluated on the network's own outputs — its residual is penalized directly in training." },
  { x: 660, y: 134, w: 200, label: "Composite Loss", sub: "L_data + L_physics + L_reg", detail: "The weighted sum of all three terms drives backpropagation — physics and data pull the same weights toward a consistent estimate.", accent: true },
];

const edgeList: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 4],
];

function edgeCoords(from: NodeDef, to: NodeDef): [number, number, number, number] {
  return [from.x + from.w, from.y, to.x, to.y];
}

export function PinnArchitectureDiagram() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="card-surface overflow-x-auto p-6 md:p-10">
      <svg viewBox="0 0 900 300" className="min-w-[760px]" fill="none">
        {edgeList.map(([a, b], i) => {
          const from = nodeList[a];
          const to = nodeList[b];
          if (!from || !to) return null;
          const [x1, y1, x2, y2] = edgeCoords(from, to);
          const isLive = active === a || active === b;
          return (
            <g key={i}>
              <motion.line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth={1.4}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              />
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#7C8AA5"
                strokeWidth={1.2}
                strokeDasharray="1.5 20"
                className="animate-dashFlow"
                opacity={isLive ? 0.9 : 0.25}
              />
            </g>
          );
        })}

        {nodeList.map((n, i) => (
          <NodeBox
            key={n.label}
            node={n}
            index={i}
            active={active === i}
            onEnter={() => setActive(i)}
            onLeave={() => setActive(null)}
          />
        ))}

        <text x={450} y={288} textAnchor="middle" fill="#6B7383" fontSize="10.5" fontFamily="var(--font-mono)">
          Gradients from L_physics flow back through the network via automatic differentiation.
        </text>
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
                <span className="font-mono text-[12px] text-trace">{nodeList[active]?.label} — </span>
                {nodeList[active]?.detail}
              </>
            ) : (
              <span className="font-mono text-[12px] uppercase tracking-wide text-paper-faint">
                Hover or focus a node to trace how physics and data combine.
              </span>
            )}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

function NodeBox({
  node,
  index,
  active,
  onEnter,
  onLeave,
}: {
  node: NodeDef;
  index: number;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const { x, y, w, label, sub, accent } = node;
  return (
    <g
      tabIndex={0}
      role="button"
      aria-label={`${label} — ${node.detail}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className="cursor-pointer outline-none"
    >
      {accent && (
        <rect
          x={x - 4}
          y={y - 30}
          width={w + 8}
          height={60}
          rx={12}
          fill="none"
          stroke="#7C8AA5"
          strokeWidth={1}
          className="animate-glowPulse"
          opacity={0.35}
        />
      )}
      <motion.rect
        x={x}
        y={y - 26}
        width={w}
        height={52}
        rx={10}
        fill={active ? "#1B212B" : "#171B22"}
        stroke={active ? "#7C8AA5" : accent ? "#7C8AA5" : "rgba(255,255,255,0.12)"}
        strokeWidth={active ? 1.6 : 1.2}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
        animate={{ scale: active ? 1.035 : 1 }}
      />
      <text x={x + w / 2} y={y - 4} textAnchor="middle" fill="#F7F7F7" fontSize="12.5" fontFamily="var(--font-display)" fontWeight={600}>
        {label}
      </text>
      <text x={x + w / 2} y={y + 14} textAnchor="middle" fill="#A6B0C0" fontSize="9.5" fontFamily="var(--font-mono)">
        {sub}
      </text>
    </g>
  );
}
