"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

/**
 * A glass surface where light genuinely follows the cursor — a soft radial
 * highlight tracks pointer position, composed with a light tilt and a
 * top-edge specular catch. This is the primitive behind the "every card
 * should feel alive" requirement: cheap to apply, expensive-looking result.
 */
export function SpotlightCard({
  children,
  className,
  maxTilt = 2,
  href,
  accent = "signal",
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  href?: string;
  accent?: "signal" | "trace" | "gold";
}) {
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const spring = { stiffness: 200, damping: 30, mass: 0.7 };
  const rotateX = useSpring(useTransform(my, [0, 1], [maxTilt, -maxTilt]), spring);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-maxTilt, maxTilt]), spring);
  const spotX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const spotY = useTransform(my, [0, 1], ["0%", "100%"]);

  const accentRgb = {
    signal: "59,130,246",
    trace: "124,138,165",
    gold: "201,161,90",
  }[accent];

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

  const spotlight = (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500"
      animate={{ opacity: hovered ? 1 : 0 }}
      style={{
        background: useTransform([spotX, spotY], ([sx, sy]: string[]) =>
          `radial-gradient(360px circle at ${sx} ${sy}, rgba(${accentRgb},0.12), transparent 70%)`
        ),
      }}
    />
  );

  const sharedProps = {
    ref,
    onPointerMove: handleMove,
    onPointerLeave: handleLeave,
    style: { rotateX, rotateY, transformStyle: "preserve-3d" as const },
    className: cn("card-surface relative overflow-hidden", className),
  };

  return (
    <div className="tilt-perspective">
      {href ? (
        <MotionLink href={href} {...(sharedProps as any)}>
          {children}
          {spotlight}
        </MotionLink>
      ) : (
        <motion.div {...(sharedProps as any)}>
          {children}
          {spotlight}
        </motion.div>
      )}
    </div>
  );
}
