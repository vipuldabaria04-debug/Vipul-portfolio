"use client";

import { useEffect, useRef } from "react";

/**
 * A subtle radial glow that follows the pointer, evoking a probe/oscilloscope
 * trace reading the page. Desktop-only (fine pointer), and disabled entirely
 * for users who prefer reduced motion.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (prefersReduced || !hasFinePointer) return;

    let frame: number;
    let x = 0;
    let y = 0;

    const handleMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transform = `translate3d(${x - 190}px, ${y - 190}px, 0)`;
        }
      });
    };

    window.addEventListener("pointermove", handleMove);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-[380px] w-[380px] rounded-full opacity-[0.09] mix-blend-screen md:block"
      style={{
        background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
