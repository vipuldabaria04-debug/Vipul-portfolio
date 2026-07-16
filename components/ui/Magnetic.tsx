"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wraps interactive elements (primarily buttons) in a small magnetic pull toward
 * the cursor — capped at a few pixels so it reads as "responsive material," never
 * as the element chasing the mouse. Desktop-only; no-ops on touch.
 */
export function Magnetic({
  children,
  strength = 0.18,
  range = 50,
}: {
  children: ReactNode;
  strength?: number;
  range?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < range) {
      x.set(dx * strength);
      y.set(dy * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
