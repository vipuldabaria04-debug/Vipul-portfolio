"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

/**
 * Wraps a card in a gentle, physically-plausible tilt that tracks the pointer.
 * The tilt range is intentionally small (a few degrees) — this is meant to read
 * as "handled material with weight," not a gimmick. Disabled on touch devices.
 * Pass `href` to render the tilting surface as the clickable Link itself.
 */
export function TiltCard({
  children,
  className,
  maxTilt = 2.5,
  glare = true,
  href,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
  href?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const spring = { stiffness: 200, damping: 30, mass: 0.7 };
  const rotateX = useSpring(useTransform(my, [0, 1], [maxTilt, -maxTilt]), spring);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-maxTilt, maxTilt]), spring);
  const glareX = useTransform(mx, [0, 1], ["10%", "90%"]);
  const glareY = useTransform(my, [0, 1], ["10%", "90%"]);

  function handleMove(e: React.PointerEvent<HTMLElement>) {
    if (e.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
    setHovered(true);
  }

  function handleLeave() {
    mx.set(0.5);
    my.set(0.5);
    setHovered(false);
  }

  const sharedProps: Record<string, unknown> = {
    ref,
    onPointerMove: handleMove,
    onPointerLeave: handleLeave,
    style: { rotateX, rotateY, transformStyle: "preserve-3d" as const },
    className: cn("relative", className),
  };

  const glareLayer = glare && (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500"
      animate={{ opacity: hovered ? 1 : 0 }}
      style={{
        background: `radial-gradient(280px circle at ${glareX} ${glareY}, rgba(255,255,255,0.14), rgba(59,130,246,0.06) 45%, transparent 70%)`,
        mixBlendMode: "overlay",
      }}
    />
  );

  return (
    <div className="tilt-perspective">
      {href ? (
        <MotionLink href={href} {...(sharedProps as any)}>
          {children}
          {glareLayer}
        </MotionLink>
      ) : (
        <motion.div {...(sharedProps as any)}>
          {children}
          {glareLayer}
        </motion.div>
      )}
    </div>
  );
}
