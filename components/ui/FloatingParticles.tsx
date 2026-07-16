"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: "brass" | "trace" | "titanium";
};

function generateParticles(count: number): Particle[] {
  const colors: Particle["color"][] = ["brass", "trace", "titanium"];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 2.5,
    delay: Math.random() * 5,
    duration: 6 + Math.random() * 5,
    color: colors[i % colors.length] as Particle["color"],
  }));
}

const colorMap: Record<Particle["color"], string> = {
  brass: "#3B82F6",
  trace: "#7C8AA5",
  titanium: "#8B93A3",
};

/**
 * A quiet field of drifting points behind the hero — evokes suspended dust in a
 * lab, or telemetry nodes on a dark instrument panel. Purely decorative-adjacent:
 * it reinforces "sensing/measurement" without competing with the headline.
 */
export function FloatingParticles({ count = 22 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    setParticles(generateParticles(count));
    setEnabled(true);
  }, [count]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: colorMap[p.color],
            opacity: 0.22,
          }}
          animate={{
            y: [0, -16, 0],
            opacity: [0.1, 0.26, 0.1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
