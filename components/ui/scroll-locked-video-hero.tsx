"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ScrollLockedVideoHeroProps {
  videoSrc: string;
  title?: string;
  tagline?: string;
  scrollHint?: string;
  /** Total input distance (px) needed to scrub the whole intro. Tune to taste. */
  scrubDistance?: number;
  /** How much of the video to play, 0–1. 0.5 plays only the first half. */
  endAt?: number;
  /** Set false to release the scroll lock and stop capturing input. */
  active?: boolean;
  /** Fires once the visitor has scrubbed to the end (and lingered, or pushed past it). */
  onComplete?: () => void;
  /** Fires if the video can't be loaded, or the visitor presses Escape. */
  onSkip?: () => void;
  className?: string;
}

const LOAD_TIMEOUT_MS = 8000;
/** After reaching the end with no further input, open the site on its own. */
const AUTO_COMPLETE_MS = 1400;
/** Ignore trackpad momentum right after the end is reached. */
const PUSH_PAST_DELAY_MS = 700;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * A locked, scroll-scrubbed video intro. While active the page can't move: wheel,
 * touch and keyboard input only drive `video.currentTime`, forward and backward.
 * When the visitor reaches the end, `onComplete` fires and the lock is released.
 *
 * Adapted from the "scroll-locked video hero" component: it now reads from the
 * site's design tokens, supports keyboard input and Escape, only plays the first
 * `endAt` of the clip, and always has a way out (load failure, timeout, skip).
 */
export default function ScrollLockedVideoHero({
  videoSrc,
  title = "",
  tagline = "",
  scrollHint = "Scroll",
  scrubDistance = 3200,
  endAt = 1,
  active = true,
  onComplete,
  onSkip,
  className,
}: ScrollLockedVideoHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  // Callbacks live in refs so changing them never restarts the scrub loop.
  const onCompleteRef = useRef(onComplete);
  const onSkipRef = useRef(onSkip);
  useEffect(() => {
    onCompleteRef.current = onComplete;
    onSkipRef.current = onSkip;
  });

  useEffect(() => {
    if (!active) return;
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    let duration = 0;
    let rafId = 0;
    let target = 0;
    let current = 0;
    let started = false;
    let seeking = false;
    let pendingTime: number | null = null;
    let locked = false;
    let lockedScrollY = 0;
    let touchStartY = 0;
    let done = false;
    let reachedEndAt = 0;
    let holdTimer: ReturnType<typeof setTimeout> | undefined;

    const complete = () => {
      if (done) return;
      done = true;
      onCompleteRef.current?.();
    };

    // --- Video loading, with a way out if it never arrives ---
    const loadTimer = setTimeout(() => {
      if (!duration) onSkipRef.current?.();
    }, LOAD_TIMEOUT_MS);
    const onLoadedData = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      duration = video.duration;
      clearTimeout(loadTimer);
      setReady(true);
    };
    const onError = () => onSkipRef.current?.();
    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("error", onError);
    video.preload = "auto";
    video.src = videoSrc;

    // iOS Safari won't buffer a video that never plays; a silent play-then-pause
    // on mount kicks real loading off.
    const kickstart = video.play();
    if (kickstart && typeof kickstart.then === "function") {
      kickstart.then(() => video.pause()).catch(() => {});
    } else {
      video.pause();
    }

    const onSeeked = () => {
      seeking = false;
      if (pendingTime !== null) {
        const t = pendingTime;
        pendingTime = null;
        seeking = true;
        video.currentTime = t;
      }
    };
    video.addEventListener("seeked", onSeeked);

    const seekTo = (t: number) => {
      if (seeking) {
        pendingTime = t;
        return;
      }
      seeking = true;
      video.currentTime = t;
    };

    // --- Scroll lock: pin the body so nothing behind the intro can move ---
    const engageLock = () => {
      if (locked) return;
      locked = true;
      lockedScrollY = window.scrollY;
      const b = document.body.style;
      b.position = "fixed";
      b.top = `-${lockedScrollY}px`;
      b.left = "0";
      b.right = "0";
      b.width = "100%";
      b.height = "100%";
      b.overscrollBehavior = "none";
    };
    const releaseLock = () => {
      if (!locked) return;
      locked = false;
      const b = document.body.style;
      b.position = "";
      b.top = "";
      b.left = "";
      b.right = "";
      b.width = "";
      b.height = "";
      b.overscrollBehavior = "";
      window.scrollTo({ top: lockedScrollY, behavior: "instant" });
    };
    engageLock();

    // --- Input ---
    const addProgress = (delta: number) => {
      if (done) return;
      // Pushing forward again once the end has been reached opens the site.
      if (delta > 0 && target >= 1 && performance.now() - reachedEndAt > PUSH_PAST_DELAY_MS) {
        complete();
        return;
      }
      target = clamp(target + delta, 0, 1);
      if (target > 0.001) started = true;
      if (target < 1) {
        clearTimeout(holdTimer);
        holdTimer = undefined;
        reachedEndAt = 0;
      }
    };

    const onWheel = (e: WheelEvent) => {
      addProgress(e.deltaY / scrubDistance);
      e.preventDefault();
    };
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? touchStartY;
      addProgress((touchStartY - y) / scrubDistance);
      touchStartY = y;
      e.preventDefault();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onSkipRef.current?.();
        return;
      }
      const onControl = !!(e.target as HTMLElement | null)?.closest("button, a, input, textarea, select");
      if (onControl && (e.key === " " || e.key === "Enter")) return; // let the button do its thing
      const steps: Record<string, number> = {
        ArrowDown: 0.06,
        ArrowRight: 0.06,
        " ": 0.06,
        PageDown: 0.2,
        ArrowUp: -0.06,
        ArrowLeft: -0.06,
        PageUp: -0.2,
        End: 1,
        Home: -1,
      };
      const step = steps[e.key];
      if (step === undefined) return;
      e.preventDefault();
      addProgress(step);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);
    // Some iOS versions lose the race against native scrolling with window-level
    // listeners alone, so bind on the element too, with capture.
    section.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    section.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });

    // --- Render loop ---
    const frame = () => {
      current += (target - current) * 0.18;
      if (Math.abs(target - current) < 0.0005) current = target;

      if (duration > 0) seekTo(Math.min(current * endAt * duration, duration - 0.05));

      if (video) video.style.transform = `scale(${1 + current * 0.06})`;
      if (titleRef.current) {
        const t = 1 - clamp(current / 0.35, 0, 1);
        titleRef.current.style.opacity = String(t);
        titleRef.current.style.transform = `translateY(${(1 - t) * -24}px) scale(${0.96 + t * 0.04})`;
        titleRef.current.style.filter = `blur(${(1 - t) * 10}px)`;
      }
      if (hintRef.current) hintRef.current.style.opacity = started ? "0" : "1";
      if (taglineRef.current) {
        const t = clamp((current - 0.82) / 0.18, 0, 1);
        taglineRef.current.style.opacity = String(t);
        taglineRef.current.style.transform = `translateY(${(1 - t) * 20}px) scale(${0.97 + t * 0.03})`;
        taglineRef.current.style.filter = `blur(${(1 - t) * 8}px)`;
      }
      if (progressBarRef.current) progressBarRef.current.style.transform = `scaleX(${current})`;

      if (!done && target >= 1 && current > 0.995 && !holdTimer) {
        reachedEndAt = performance.now();
        holdTimer = setTimeout(complete, AUTO_COMPLETE_MS);
      }

      rafId = requestAnimationFrame(frame);
    };
    rafId = requestAnimationFrame(frame);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(holdTimer);
      cancelAnimationFrame(rafId);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("error", onError);
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      section.removeEventListener("touchstart", onTouchStart, true);
      section.removeEventListener("touchmove", onTouchMove, true);
      releaseLock();
    };
  }, [active, videoSrc, scrubDistance, endAt]);

  return (
    <div
      ref={sectionRef}
      className={cn("relative h-[100dvh] w-full touch-none overflow-hidden bg-ink-950", className)}
    >
      {/* No src here on purpose — it is assigned on mount, so a visitor who skips
          the intro (repeat visit, reduced motion) never downloads the video. */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="none"
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full touch-none object-cover transition-opacity duration-[600ms] will-change-transform",
          ready ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Legibility scrim */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(9,11,16,0.45),rgba(9,11,16,0)_30%,rgba(9,11,16,0.15)_70%,rgba(9,11,16,0.6))]" />

      <div
        ref={titleRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center px-[6%] text-center"
      >
        <h1 className="inline-block font-display text-[clamp(2rem,7vw,6rem)] font-semibold uppercase leading-none tracking-tight text-paper will-change-[transform,filter,opacity] [text-shadow:0_4px_30px_rgba(0,0,0,0.5)]">
          {title}
        </h1>
      </div>

      {tagline && (
        <div
          ref={taglineRef}
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-[8%] text-center opacity-0"
        >
          <p className="font-display text-[clamp(1.25rem,3.4vw,2.5rem)] font-medium leading-tight tracking-tight text-paper [text-shadow:0_4px_24px_rgba(0,0,0,0.5)]">
            {tagline}
          </p>
        </div>
      )}

      <div
        ref={hintRef}
        className="pointer-events-none absolute bottom-[clamp(20px,6vh,48px)] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[12px] tracking-[0.3em] text-paper-muted transition-opacity duration-500"
      >
        <span className="uppercase">{scrollHint}</span>
        <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
      </div>

      {/* Thin progress line — fills as the intro advances */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/10">
        <div
          ref={progressBarRef}
          className="h-full w-full origin-left bg-gradient-to-r from-signal/60 to-signal-bright"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
