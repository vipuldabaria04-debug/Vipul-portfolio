"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

export function StatCounter({
  value,
  suffix = "",
  label,
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, value, decimals]);

  return (
    <div>
      <motion.div className="font-display text-4xl font-semibold text-paper md:text-5xl">
        <span ref={ref}>{display}</span>
        <span className="text-signal">{suffix}</span>
      </motion.div>
      <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.14em] text-paper-muted">
        {label}
      </p>
    </div>
  );
}
