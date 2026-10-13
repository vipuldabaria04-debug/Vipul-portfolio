"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronsDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  /** Alt text for the expanding image. Falls back to the title. */
  mediaAlt?: string;
  /** Revealed beneath the media once it has fully expanded. */
  children?: ReactNode;
}

const clamp = (n: number) => Math.min(Math.max(n, 0), 1);

/**
 * A full-viewport hero where the first scroll gestures expand a framed media
 * element to the full width of the screen while the title splits apart.
 *
 * The page is held at the top until the media has fully expanded. Because that
 * takes scrolling away from the visitor, this version also supports:
 *  - keyboard (Arrow/Page keys, Space, End) and a visible "Skip intro" button
 *  - in-page anchor links (they expand the hero first, then jump)
 *  - `prefers-reduced-motion` (renders fully expanded, no scroll capture)
 *
 * It must sit at the very top of a page: it assumes scrollY === 0 while locked.
 */
const ScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  mediaAlt,
  children,
}: ScrollExpandMediaProps) => {
  const reduceMotion = useReducedMotion();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mirrors of state, so the (long-lived) event listeners never go stale and
  // never need to be re-bound on every wheel tick.
  const progressRef = useRef(0);
  const expandedRef = useRef(false);
  const touchStartY = useRef<number | null>(null);

  const applyProgress = useCallback((next: number) => {
    const p = clamp(next);
    progressRef.current = p;
    setScrollProgress(p);
    if (p >= 1) {
      expandedRef.current = true;
      setMediaFullyExpanded(true);
      setShowContent(true);
    } else if (p < 0.75) {
      setShowContent(false);
    }
  }, []);

  const collapse = useCallback(() => {
    expandedRef.current = false;
    setMediaFullyExpanded(false);
  }, []);

  const expandNow = useCallback(() => applyProgress(1), [applyProgress]);

  // Reset when the media type changes (kept from the original component).
  useEffect(() => {
    progressRef.current = 0;
    expandedRef.current = false;
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  // Reduced motion, or arriving on a #hash link: skip straight to expanded.
  useEffect(() => {
    if (reduceMotion || window.location.hash) expandNow();
  }, [reduceMotion, expandNow]);

  useEffect(() => {
    if (reduceMotion) return;

    const handleWheel = (e: globalThis.WheelEvent) => {
      if (expandedRef.current && e.deltaY < 0 && window.scrollY <= 5) {
        collapse();
        e.preventDefault();
      } else if (!expandedRef.current) {
        e.preventDefault();
        applyProgress(progressRef.current + e.deltaY * 0.0009);
      }
    };

    const handleTouchStart = (e: globalThis.TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (e: globalThis.TouchEvent) => {
      const start = touchStartY.current;
      const touchY = e.touches[0]?.clientY;
      if (start === null || touchY === undefined) return;

      const deltaY = start - touchY;

      if (expandedRef.current && deltaY < -20 && window.scrollY <= 5) {
        collapse();
        e.preventDefault();
      } else if (!expandedRef.current) {
        e.preventDefault();
        // Slightly higher sensitivity when swiping back down
        const factor = deltaY < 0 ? 0.008 : 0.005;
        applyProgress(progressRef.current + deltaY * factor);
        touchStartY.current = touchY;
      }
    };

    const handleTouchEnd = () => {
      touchStartY.current = null;
    };

    const handleScroll = () => {
      if (!expandedRef.current) window.scrollTo(0, 0);
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t?.closest("input, textarea, select, [contenteditable='true']")) return;
      const onControl = !!t?.closest("button, a, summary");

      const down = e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey && !onControl);
      const up = e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey && !onControl);

      if (!expandedRef.current) {
        if (e.key === "End") {
          e.preventDefault();
          expandNow();
        } else if (down) {
          e.preventDefault();
          applyProgress(progressRef.current + 0.2);
        } else if (up) {
          e.preventDefault();
          applyProgress(progressRef.current - 0.2);
        }
      } else if (up && window.scrollY <= 5) {
        collapse();
        e.preventDefault();
      }
    };

    // Clicking an in-page anchor (#gallery etc.) while locked would otherwise be
    // yanked back to the top by handleScroll — expand first, then let it jump.
    const handleAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest("a[href^='#']");
      if (a && !expandedRef.current) expandNow();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("keydown", handleKey);
    document.addEventListener("click", handleAnchorClick, true);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKey);
      document.removeEventListener("click", handleAnchorClick, true);
    };
  }, [reduceMotion, applyProgress, collapse, expandNow]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobile ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobile ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobile ? 180 : 150);

  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

  const isYouTube = mediaType === "video" && mediaSrc.includes("youtube.com");

  return (
    <div className="overflow-x-clip">
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-start">
        <div className="relative flex min-h-[100dvh] w-full flex-col items-center">
          {/* Backdrop — fades out as the media takes over the screen */}
          <motion.div
            className="absolute inset-x-0 top-0 z-0 h-[100dvh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
            aria-hidden="true"
          >
            <Image
              src={bgImageSrc}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-ink-950/40" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950 to-transparent" />
          </motion.div>

          <div className="container mx-auto relative z-10 flex flex-col items-center justify-start">
            <div className="relative flex h-[100dvh] w-full flex-col items-center justify-center">
              <div
                className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rounded-2xl ring-1 ring-white/10 transition-none"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: "95vw",
                  maxHeight: "85vh",
                  boxShadow: "0 40px 90px -30px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
                }}
              >
                {mediaType === "video" ? (
                  isYouTube ? (
                    <div className="pointer-events-none relative h-full w-full">
                      <iframe
                        title={title ? `${title} video` : "Video"}
                        width="100%"
                        height="100%"
                        src={
                          mediaSrc.includes("embed")
                            ? mediaSrc +
                              (mediaSrc.includes("?") ? "&" : "?") +
                              "autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1"
                            : mediaSrc.replace("watch?v=", "embed/") +
                              "?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=" +
                              mediaSrc.split("v=")[1]
                        }
                        className="h-full w-full rounded-2xl"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-black/30"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  ) : (
                    <div className="pointer-events-none relative h-full w-full">
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="h-full w-full rounded-2xl object-cover"
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-black/30"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  )
                ) : (
                  <div className="relative h-full w-full overflow-hidden rounded-2xl">
                    <Image
                      src={mediaSrc}
                      alt={mediaAlt ?? title ?? "Media content"}
                      width={1280}
                      height={720}
                      sizes="100vw"
                      priority
                      className="h-full w-full object-cover"
                    />
                    <motion.div
                      className="absolute inset-0 bg-ink-950/50"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.5 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                {/* Drafting-style corner marks, same language as FigureFrame */}
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  animate={{ opacity: 1 - scrollProgress }}
                  transition={{ duration: 0.1 }}
                  aria-hidden="true"
                >
                  <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-white/30" />
                  <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-white/30" />
                  <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-white/30" />
                  <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-white/30" />
                </motion.div>

                <div className="relative z-10 mt-5 flex flex-col items-center gap-1.5 text-center transition-none">
                  {date && (
                    <p
                      className="font-display text-lg text-paper-dim"
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className="font-mono text-[12px] tracking-wide text-signal-bright"
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              <h1
                className={cn(
                  "relative z-10 flex w-full flex-col items-center justify-center gap-2 text-center font-display text-5xl font-semibold leading-none tracking-tight text-paper transition-none md:gap-4 md:text-7xl lg:text-8xl",
                  textBlend ? "mix-blend-difference" : "mix-blend-normal"
                )}
              >
                <motion.span style={{ transform: `translateX(-${textTranslateX}vw)` }}>
                  {firstWord}
                </motion.span>
                <motion.span style={{ transform: `translateX(${textTranslateX}vw)` }}>
                  {restOfTitle}
                </motion.span>
              </h1>

              {!mediaFullyExpanded && !reduceMotion && (
                <button
                  type="button"
                  onClick={expandNow}
                  className="glass absolute bottom-8 left-1/2 z-20 inline-flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 font-mono text-[12px] text-paper-muted transition-colors hover:text-paper focus-visible:text-paper"
                >
                  Skip intro
                  <ChevronsDown className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}
            </div>

            <motion.section
              className="flex w-full flex-col px-0 py-10 lg:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
              // Not reachable by Tab while it is still hidden behind the lock
              inert={!showContent}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
