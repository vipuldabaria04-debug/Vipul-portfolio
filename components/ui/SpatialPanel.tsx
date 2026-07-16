"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type PanelRow = {
  label: string;
  value: string;
  tone?: "signal" | "trace" | "success" | "default";
  live?: boolean;
};

const toneClassDark: Record<NonNullable<PanelRow["tone"]>, string> = {
  signal: "text-signal",
  trace: "text-trace",
  success: "text-success",
  default: "text-paper",
};

// The light widget reads more like a real macOS widget: mostly near-black
// text, with the accent reserved for the hero stat only.
const toneClassLight: Record<NonNullable<PanelRow["tone"]>, string> = {
  signal: "text-[#1D4ED8]",
  trace: "text-[#3F4A5C]",
  success: "text-[#0F7A4F]",
  default: "text-[#1C1D21]",
};

/**
 * A floating instrument panel — the site's one deliberate spatial gesture.
 * It tracks pointer position across the whole viewport (not just on hover) for a
 * faint parallax, and idles with a slow vertical float. Meant to feel like a
 * physical readout suspended just above the page, not a UI toy.
 *
 * `variant="light"` matches the macOS Notification Center widget material —
 * a genuinely light frosted card (Calendar/Weather-widget style) rather than
 * dark glass — and is the default, since it's the primary reference for how
 * these dashboards should read.
 */
export function SpatialPanel({
  title,
  icon,
  rows,
  className,
  depth = 1,
  floatDelay = 0,
  variant = "light",
  heroStat = true,
}: {
  title: string;
  icon?: ReactNode;
  rows: PanelRow[];
  className?: string;
  /** 0–1, how strongly this panel responds to pointer parallax (further "back" panels move less) */
  depth?: number;
  floatDelay?: number;
  variant?: "light" | "dark";
  /** Renders the first row as a large hero figure (Weather-widget style), rest compact below */
  heroStat?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const spring = { stiffness: 55, damping: 22, mass: 1.3 };
  const translateX = useSpring(useTransform(mx, [-1, 1], [-8 * depth, 8 * depth]), spring);
  const translateY = useSpring(useTransform(my, [-1, 1], [-6 * depth, 6 * depth]), spring);
  const rotateX = useSpring(useTransform(my, [-1, 1], [2.5 * depth, -2.5 * depth]), spring);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-2.5 * depth, 2.5 * depth]), spring);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !fine) return;
    setEnabled(true);

    function handleMove(e: PointerEvent) {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mx.set(nx);
      my.set(ny);
    }
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLight = variant === "light";
  const toneClass = isLight ? toneClassLight : toneClassDark;
  const [hero, ...rest] = rows;

  return (
    <div className="tilt-perspective">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 8, delay: floatDelay, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          ref={ref}
          style={
            enabled
              ? { x: translateX, y: translateY, rotateX, rotateY, transformStyle: "preserve-3d" }
              : undefined
          }
          className={cn(
            isLight ? "widget-light" : "glass-panel",
            "rounded-[22px] p-5",
            className
          )}
        >
          <div
            className={cn(
              "flex items-center gap-2 border-b pb-3",
              isLight ? "border-black/[0.08]" : "border-white/[0.08]"
            )}
          >
            {icon}
            <p
              className={cn(
                "font-mono text-[10.5px] uppercase tracking-[0.16em]",
                isLight ? "text-[#6B6F7B]" : "text-paper-muted"
              )}
            >
              {title}
            </p>
            <span className="ml-auto flex h-1.5 w-1.5 rounded-full bg-success animate-pulseTrace" />
          </div>

          {heroStat && hero ? (
            <>
              <div className="mt-3 flex items-baseline gap-2">
                <span
                  className={cn(
                    "font-display text-[34px] font-semibold leading-none tracking-tight",
                    toneClass[hero.tone ?? (isLight ? "default" : "signal")],
                    hero.live && "animate-tick"
                  )}
                >
                  {hero.value}
                </span>
              </div>
              <p className={cn("mt-1 text-[11.5px]", isLight ? "text-[#6B6F7B]" : "text-paper-faint")}>
                {hero.label}
              </p>
              {rest.length > 0 && (
                <dl
                  className={cn(
                    "mt-4 flex flex-col gap-2 border-t pt-3",
                    isLight ? "border-black/[0.08]" : "border-white/[0.08]"
                  )}
                >
                  {rest.map((r) => (
                    <div key={r.label} className="flex items-center justify-between gap-4">
                      <dt
                        className={cn(
                          "font-mono text-[10.5px] uppercase tracking-wide",
                          isLight ? "text-[#8A8D97]" : "text-paper-faint"
                        )}
                      >
                        {r.label}
                      </dt>
                      <dd
                        className={cn(
                          "font-mono text-[12px] font-medium",
                          toneClass[r.tone ?? "default"],
                          r.live && "animate-tick"
                        )}
                      >
                        {r.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </>
          ) : (
            <dl className="mt-3 flex flex-col gap-2.5">
              {rows.map((r) => (
                <div key={r.label} className="flex items-center justify-between gap-4">
                  <dt
                    className={cn(
                      "font-mono text-[10.5px] uppercase tracking-wide",
                      isLight ? "text-[#8A8D97]" : "text-paper-faint"
                    )}
                  >
                    {r.label}
                  </dt>
                  <dd
                    className={cn(
                      "font-mono text-[12.5px] font-medium",
                      toneClass[r.tone ?? "default"],
                      r.live && "animate-tick"
                    )}
                  >
                    {r.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
