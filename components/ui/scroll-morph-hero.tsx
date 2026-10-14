"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

export interface MorphPhoto {
  /** Path under /public (or a remote URL). Without it, a placeholder tile is drawn. */
  src?: string;
  caption: string;
  location?: string;
  /** Text-card mode (no photo): the big line on the card front, e.g. a skill name. */
  label?: string;
  /** Small mono line above the label, e.g. its category. */
  tag?: string;
}

interface ScrollMorphHeroProps {
  photos: MorphPhoto[];
  /** Shown first, while the cards assemble into a circle. */
  introTitle: string;
  introHint?: string;
  /** Shown once the cards have settled into the arc. */
  eyebrow?: string;
  arcTitle: string;
  arcDescription?: string;
  className?: string;
  /** Card size in px before the arc scales it up. Photos: 84×118. Text cards read better wider. */
  cardWidth?: number;
  cardHeight?: number;
  /** Extra page scroll (px) the section occupies. Longer = slower sweep. */
  scrollLength?: number;
  /** Lift the card at the centre of the arc to the front, so dense arcs stay readable. */
  focusCenter?: boolean;
  /** Card scale on the arc (desktop). Larger = bigger cards. Default 1.9. */
  arcScale?: number;
  /** How far below the stage's centre the arc's highest point sits, as a fraction of its height. Default 0.22. */
  arcApex?: number;
  /** Use "h2" when the page already has its own h1 (the arc title then becomes an h3). */
  headingLevel?: "h1" | "h2";
}

// --- Layout constants ---
const DEFAULT_CARD_W = 84;
const DEFAULT_CARD_H = 118;
/** Extra page scroll (px) the section occupies. 0–600 morphs, the rest shuffles. */
const DEFAULT_SCROLL_LENGTH = 2400;
const MORPH_END = 600;

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

/** Small deterministic PRNG so server and client render identical scatter positions. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// --- A single flip card ---
interface FlipCardProps {
  photo: MorphPhoto;
  index: number;
  total: number;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number; focus?: boolean };
  instant: boolean;
  width: number;
  height: number;
}

function TextFace({ photo, index }: { photo: MorphPhoto; index: number }) {
  const tints = ["from-ink-750 via-ink-800 to-ink-850", "from-ink-700 via-ink-800 to-ink-900", "from-ink-800 via-ink-750 to-ink-800"];
  return (
    <div className={cn("relative flex h-full w-full flex-col justify-between bg-gradient-to-br p-2.5", tints[index % tints.length])}>
      <div
        className="absolute inset-0 opacity-60"
        style={{ background: "radial-gradient(circle at 85% 0%, rgba(59,130,246,0.22), transparent 60%)" }}
      />
      <span className="relative line-clamp-2 font-mono text-[6.5px] uppercase leading-tight tracking-wider text-signal">{photo.tag}</span>
      <span className="relative break-words font-display text-[11px] font-semibold leading-[1.15] text-paper">{photo.label}</span>
    </div>
  );
}

function PlaceholderTile({ index }: { index: number }) {
  const tints = [
    "from-ink-700 via-ink-800 to-ink-850",
    "from-ink-800 via-ink-750 to-ink-700",
    "from-ink-750 via-ink-800 to-ink-900",
  ];
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-br",
        tints[index % tints.length]
      )}
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(circle at ${index % 2 ? "25%" : "75%"} 20%, rgba(59,130,246,0.22), transparent 60%)`,
        }}
      />
      <Camera className="relative h-5 w-5 text-trace" aria-hidden="true" />
      <span className="absolute bottom-2 left-2.5 font-mono text-[8px] text-paper-faint">
        Fig. {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

function FlipCard({ photo, index, total, target, instant, width, height }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      role="listitem"
      tabIndex={0}
      aria-label={`${photo.caption}${photo.location ? `, ${photo.location}` : ""} (${index + 1} of ${total})`}
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={instant ? { duration: 0 } : { type: "spring", stiffness: 40, damping: 15 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
      style={{
        position: "absolute",
        width,
        height,
        transformStyle: "preserve-3d",
        perspective: "1000px",
        zIndex: flipped ? 50 : target.focus ? 30 : index,
      }}
      className="rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={instant ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 overflow-hidden rounded-xl border border-white/10 bg-ink-800 shadow-elevated"
          style={{ backfaceVisibility: "hidden" }}
        >
          {photo.src ? (
            <Image src={photo.src} alt="" fill sizes="170px" className="object-cover" />
          ) : photo.label ? (
            <TextFace photo={photo} index={index} />
          ) : (
            <PlaceholderTile index={index} />
          )}
        </div>

        {/* Back face — the caption */}
        <div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-ink-900 p-2.5 shadow-elevated"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="font-mono text-[8px] text-signal">
            {photo.label ? `${String(index + 1).padStart(2, "0")} / ${total}` : `Fig. ${String(index + 1).padStart(2, "0")}`}
          </span>
          <div>
            <p className="text-[9px] font-medium leading-snug text-paper">{photo.caption}</p>
            {photo.location && (
              <p className="mt-1 font-mono text-[7.5px] leading-snug text-paper-faint">{photo.location}</p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Scroll-driven gallery: cards scatter in, line up, form a circle, then morph into
 * an arc along the bottom of the screen that you can sweep through by scrolling.
 *
 * Unlike the original virtual-scroll version, this uses a tall wrapper with a
 * sticky stage and reads real page scroll. Nothing intercepts the wheel or touch
 * events, so the page never traps the visitor, keyboard and trackpad scrolling
 * just work, and it can be placed anywhere on a page.
 */
export default function ScrollMorphHero({
  photos,
  introTitle,
  introHint,
  eyebrow,
  arcTitle,
  arcDescription,
  className,
  cardWidth = DEFAULT_CARD_W,
  cardHeight = DEFAULT_CARD_H,
  scrollLength = DEFAULT_SCROLL_LENGTH,
  focusCenter = false,
  arcScale: arcScaleProp = 1.9,
  arcApex = 0.22,
  headingLevel = "h1",
}: ScrollMorphHeroProps) {
  const CARD_W = cardWidth;
  const MAX_SCROLL = scrollLength;
  const IntroHeading = headingLevel === "h1" ? motion.h1 : motion.h2;
  const ArcHeading = headingLevel === "h1" ? "h2" : "h3";
  const reduceMotion = useReducedMotion();
  const total = photos.length;

  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // --- Stage size ---
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });
    observer.observe(el);
    setContainerSize({ width: el.offsetWidth, height: el.offsetHeight });
    return () => observer.disconnect();
  }, []);

  // --- Scroll progress (0..MAX_SCROLL) from the real page scroll ---
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ["start start", "end end"] });
  const virtualScroll = useTransform(scrollYProgress, [0, 1], [0, MAX_SCROLL]);

  // 1. Morph progress: 0 (circle) -> 1 (arc)
  const morphProgress = useTransform(virtualScroll, [0, MORPH_END], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

  // 2. Shuffle: after the morph, sweep through the arc
  const scrollRotate = useTransform(virtualScroll, [MORPH_END, MAX_SCROLL], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

  // --- Mouse parallax (within the stage) ---
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const el = stageRef.current;
    if (!el || reduceMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const normalizedX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseX.set(normalizedX * 100);
    };
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, reduceMotion]);

  // --- Intro sequence: starts when the stage is actually on screen ---
  const inView = useInView(stageRef, { amount: 0.5, once: true });
  useEffect(() => {
    if (reduceMotion) {
      setIntroPhase("circle");
      return;
    }
    if (!inView) return;
    const t1 = setTimeout(() => setIntroPhase("line"), 300);
    const t2 = setTimeout(() => setIntroPhase("circle"), 2300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [inView, reduceMotion]);

  // Reduced motion: jump straight to the settled arc.
  useEffect(() => {
    if (!reduceMotion) return;
    smoothMorph.jump(1);
    smoothScrollRotate.jump(0);
  }, [reduceMotion, smoothMorph, smoothScrollRotate]);

  // --- Deterministic scatter positions ---
  const scatterPositions = useMemo(() => {
    const rand = mulberry32(20240);
    return photos.map(() => ({
      x: (rand() - 0.5) * 1500,
      y: (rand() - 0.5) * 1000,
      rotation: (rand() - 0.5) * 180,
      scale: 0.6,
      opacity: 0,
    }));
  }, [photos]);

  // --- Mirror motion values into state so card targets recompute ---
  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    const u1 = smoothMorph.on("change", setMorphValue);
    const u2 = smoothScrollRotate.on("change", setRotateValue);
    const u3 = smoothMouseX.on("change", setParallaxValue);
    return () => {
      u1();
      u2();
      u3();
    };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  // --- Arc content fades in once the arc has formed ---
  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

  const isMobile = containerSize.width < 768;

  const targetFor = (i: number) => {
    if (introPhase === "scatter") return scatterPositions[i]!;

    if (introPhase === "line") {
      const lineSpacing = CARD_W + 12;
      const lineTotalWidth = total * lineSpacing;
      return { x: i * lineSpacing - lineTotalWidth / 2 + lineSpacing / 2, y: 0, rotation: 0, scale: 1, opacity: 1 };
    }

    // A. Circle
    const minDimension = Math.min(containerSize.width, containerSize.height);
    const circleRadius = Math.min(minDimension * 0.35, 350);
    const circleAngle = (i / total) * 360;
    const circleRad = (circleAngle * Math.PI) / 180;
    const circlePos = {
      x: Math.cos(circleRad) * circleRadius,
      y: Math.sin(circleRad) * circleRadius,
      rotation: circleAngle + 90,
    };

    // B. Arc — a rainbow along the bottom of the stage
    const arcScale = isMobile ? arcScaleProp * 0.85 : arcScaleProp;
    const maxSpread = isMobile ? 120 : 150;
    const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
    // Many cards need a wider, flatter arc so they don't pile on top of each other.
    const neededRadius = (CARD_W * arcScale * 1.12 * Math.max(total - 1, 1)) / ((maxSpread * Math.PI) / 180);
    const arcRadius = Math.max(baseRadius * (isMobile ? 1.4 : 1.1), neededRadius);
    const arcApexY = containerSize.height * (isMobile ? Math.min(arcApex, 0.06) : arcApex);
    const arcCenterY = arcApexY + arcRadius;

    // Space the cards by their own width so any number of photos sits evenly.
    const stepDeg = (((CARD_W * arcScale * 1.45) / arcRadius) * 180) / Math.PI;
    const spreadAngle = Math.min(stepDeg * Math.max(total - 1, 1), maxSpread);
    const startAngle = -90 - spreadAngle / 2;
    const step = total > 1 ? spreadAngle / (total - 1) : 0;

    // Sweep: slide the arc so the first card starts at the left edge of the
    // screen and the last card finishes at the right edge — the viewport stays
    // full the whole way instead of emptying out.
    const edgeMargin = containerSize.width * 0.1;
    const visibleHalf = Math.max(containerSize.width / 2 - edgeMargin, 0);
    const edgeAngle = (Math.asin(Math.min(visibleHalf / arcRadius, 1)) * 180) / Math.PI;
    const maxShift = Math.max(spreadAngle / 2 - edgeAngle, 0);
    const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
    const boundedRotation = maxShift * (1 - 2 * scrollProgress);

    const currentArcAngle = startAngle + i * step + boundedRotation;
    const arcRad = (currentArcAngle * Math.PI) / 180;
    const focus = focusCenter && Math.abs(currentArcAngle + 90) < Math.max(step, 1) / 2;
    const arcPos = {
      x: Math.cos(arcRad) * arcRadius + parallaxValue,
      y: Math.sin(arcRad) * arcRadius + arcCenterY,
      rotation: currentArcAngle + 90,
      scale: focus ? arcScale * 1.18 : arcScale,
    };

    // C. Morph between the two
    return {
      x: lerp(circlePos.x, arcPos.x, morphValue),
      y: lerp(circlePos.y, arcPos.y, morphValue),
      rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
      scale: lerp(1, arcPos.scale, morphValue),
      opacity: 1,
      focus: focus && morphValue > 0.9,
    };
  };

  const introVisible = introPhase === "circle" && morphValue < 0.5;

  return (
    <div
      ref={outerRef}
      className={cn("relative w-full", className)}
      style={{ height: reduceMotion ? "100svh" : `calc(100svh + ${MAX_SCROLL}px)` }}
    >
      <div
        ref={stageRef}
        className="sticky top-0 h-[100svh] min-h-[600px] w-full overflow-hidden"
      >
        <div className="flex h-full w-full flex-col items-center justify-center">
          {/* Intro text — fades out as the cards start to move */}
          <div className="pointer-events-none absolute top-1/2 z-0 flex -translate-y-1/2 flex-col items-center justify-center px-6 text-center">
            <IntroHeading
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={
                introVisible
                  ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, filter: "blur(10px)" }
              }
              transition={{ duration: reduceMotion ? 0 : 1 }}
              className="text-balance max-w-3xl font-display text-3xl font-semibold leading-[1.1] tracking-tight text-paper md:text-5xl"
            >
              {introTitle}
            </IntroHeading>
            {introHint && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={introVisible ? { opacity: 0.8 - morphValue } : { opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 1, delay: reduceMotion ? 0 : 0.2 }}
                className="mt-5 font-mono text-[12px] text-paper-faint"
              >
                {introHint}
              </motion.p>
            )}
          </div>

          {/* Arc content — fades in once the arc forms */}
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="pointer-events-none absolute top-[15%] z-10 flex flex-col items-center justify-center px-6 text-center"
          >
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            <ArcHeading className="text-balance max-w-2xl font-display text-3xl font-semibold leading-[1.1] tracking-tight text-paper md:text-5xl">
              {arcTitle}
            </ArcHeading>
            {arcDescription && (
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-paper-muted md:text-base">
                {arcDescription}
              </p>
            )}
          </motion.div>

          {/* Cards */}
          <div role="list" className="relative flex h-full w-full items-center justify-center">
            {photos.map((photo, i) => (
              <FlipCard
                key={`${photo.caption}-${i}`}
                photo={photo}
                index={i}
                total={total}
                target={targetFor(i)}
                instant={!!reduceMotion}
                width={cardWidth}
                height={cardHeight}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
