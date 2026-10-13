"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import type { Application } from "@splinetool/runtime";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";

/** Swap this for your own published Spline scene (Export → Code → "Viewer" URL). */
const HERO_SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

/** If the scene hasn't loaded by then, give up and let the hero fall back. */
const LOAD_TIMEOUT_MS = 20_000;

/**
 * A scene that fails to load or crashes inside the Spline runtime must never take
 * the page down with it — this swallows the error and tells the hero to fall back.
 */
class SceneBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

/**
 * The interactive 3D scene for the homepage hero. It is deliberately the last
 * thing the page loads and the first thing to be dropped:
 *  - only on desktop-width screens (it's ~MBs of WebGL, wasted on phones)
 *  - never for visitors who prefer reduced motion or have Data Saver on
 *  - only after the page has loaded and the browser is idle, so it can't slow the
 *    headline or LCP
 *  - paused while scrolled out of view, and abandoned after a timeout
 * `onReadyChange` reports whether the scene is visible, so the hero can decide
 * what to show alongside it. Nothing is shown here until the scene is ready.
 */
export function HeroScene({ onReadyChange }: { onReadyChange?: (ready: boolean) => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);

  const [armed, setArmed] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  // 1. Decide whether this visitor should get the scene at all, then wait for idle.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = !!(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const w = window as IdleWindow;

    let cancelled = false;
    let scheduled = false;
    let idleId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const arm = () => {
      if (!cancelled) setArmed(true);
    };
    const start = () => {
      if (w.requestIdleCallback) idleId = w.requestIdleCallback(arm, { timeout: 3000 });
      else timer = setTimeout(arm, 1200);
    };
    const evaluate = () => {
      if (!desktop.matches || reduce.matches || saveData) {
        setArmed(false);
        setLoaded(false);
        return;
      }
      if (scheduled) return;
      scheduled = true;
      if (document.readyState === "complete") start();
      else window.addEventListener("load", start, { once: true });
    };

    evaluate();
    desktop.addEventListener("change", evaluate);
    reduce.addEventListener("change", evaluate);
    return () => {
      cancelled = true;
      desktop.removeEventListener("change", evaluate);
      reduce.removeEventListener("change", evaluate);
      window.removeEventListener("load", start);
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId);
      if (timer) clearTimeout(timer);
    };
  }, []);

  // 2. Give up if it never loads.
  useEffect(() => {
    if (!armed || loaded || failed) return;
    const t = setTimeout(() => setFailed(true), LOAD_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [armed, loaded, failed]);

  // 2b. Check the scene file is actually reachable before handing it to the Spline
  //     runtime, which throws on a missing or blocked file. We only need the
  //     response headers, so the body download is cancelled straight away.
  useEffect(() => {
    if (!armed || failed) return;
    const ctrl = new AbortController();
    fetch(HERO_SCENE, { signal: ctrl.signal })
      .then((res) => {
        if (res.ok) {
          setVerified(true);
          ctrl.abort();
        } else {
          setFailed(true);
        }
      })
      .catch((err: unknown) => {
        if ((err as Error)?.name !== "AbortError") setFailed(true);
      });
    return () => ctrl.abort();
  }, [armed, failed]);

  // 3. Never let the 3D canvas swallow the page's scroll wheel. Spline scenes can
  //    be authored with scroll-zoom; we stop the wheel reaching the canvas but
  //    leave the browser's own scrolling untouched.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const stop = (e: WheelEvent) => e.stopPropagation();
    el.addEventListener("wheel", stop, { capture: true, passive: true });
    return () => el.removeEventListener("wheel", stop, { capture: true });
  }, []);

  // 4. Pause rendering while the hero is scrolled out of view.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !loaded) return;
    const io = new IntersectionObserver(([entry]) => {
      try {
        if (entry?.isIntersecting) appRef.current?.play();
        else appRef.current?.stop();
      } catch {
        /* the scene may have been torn down */
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [loaded]);

  const ready = armed && verified && loaded && !failed;
  useEffect(() => {
    onReadyChange?.(ready);
  }, [ready, onReadyChange]);

  const handleLoad = (app: Application) => {
    appRef.current = app;
    setLoaded(true);
  };

  // Soft edges so a scene with a solid background melts into the page.
  const mask = "radial-gradient(ellipse 80% 75% at 58% 50%, #000 52%, transparent 100%)";

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={cn(
        "absolute inset-y-0 right-0 z-0 hidden w-1/2 lg:block",
        ready ? "pointer-events-auto" : "pointer-events-none"
      )}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      {armed && verified && !failed && (
        <SceneBoundary onError={() => setFailed(true)}>
          <motion.div
            className="h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <SplineScene scene={HERO_SCENE} className="h-full w-full" onLoad={handleLoad} />
          </motion.div>
        </SceneBoundary>
      )}
      {ready && <Spotlight size={380} className="from-signal-bright via-signal to-signal-dim mix-blend-screen" />}
    </div>
  );
}
