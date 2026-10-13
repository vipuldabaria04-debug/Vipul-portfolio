"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ScrollLockedVideoHero from "@/components/ui/scroll-locked-video-hero";
import { INTRO_STORAGE_KEY, shouldSkipIntro } from "@/lib/intro";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * The video that plays. Download it into /public/videos and point this at
 * "/videos/gate-intro.mp4" before launch — a hotlinked third-party file can vanish
 * (the intro skips itself if it does, but you'd lose the effect), and you need the
 * right to use it on a public site.
 */
const INTRO_VIDEO =
  "https://cdn.21st.dev/assets/mirror/21/21a77eac28eacbb7e142016eefeaa0b4a766619e51113629a3bc6df6af066c0f.mp4";

/** How much of the clip to play, 0–1. Set it to where the gate has finished opening. */
const INTRO_END = 0.5;

const FADE_MS = 900;

type Phase = "active" | "leaving" | "gone";

/**
 * A once-per-session, homepage-only intro. The video is scrubbed by scrolling;
 * when the gate has opened (or the visitor skips) the intro fades away and the
 * site underneath is there, ready.
 *
 * It only ever plays when the visit *starts* on "/" — landing on a deep link, or
 * clicking Home later in the session, goes straight to the page.
 */
export function IntroGate() {
  const pathname = usePathname();
  const startedOnHome = useRef(pathname === "/");
  const [phase, setPhase] = useState<Phase>(startedOnHome.current ? "active" : "gone");
  const gateRef = useRef<HTMLDivElement>(null);
  const [hint, setHint] = useState("Scroll to enter");
  // Child effects run before this component's own, so the video must not start
  // loading until we've confirmed this visit should actually play the intro.
  const [armed, setArmed] = useState(false);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    } catch {
      /* private mode etc. — worst case it plays again next visit */
    }
    setPhase((p) => (p === "active" ? "leaving" : p));
  }, []);

  // React is alive: cancel the no-JS failsafe, and bail out if this visit shouldn't play.
  useEffect(() => {
    gateRef.current?.setAttribute("data-engaged", "1");
    if (window.matchMedia("(pointer: coarse)").matches) setHint("Swipe up to enter");
    if (shouldSkipIntro()) {
      try {
        sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      setPhase("gone");
    } else {
      setArmed(true);
    }
  }, []);

  useEffect(() => {
    if (phase !== "leaving") return;
    const t = setTimeout(() => setPhase("gone"), FADE_MS);
    return () => clearTimeout(t);
  }, [phase]);

  // While the intro is up, nothing behind it should be reachable by keyboard or screen reader.
  useEffect(() => {
    if (phase !== "active") return;
    const gate = gateRef.current;
    if (!gate) return;
    const skippable = ["SCRIPT", "STYLE", "LINK", "NOSCRIPT", "NEXT-ROUTE-ANNOUNCER"];
    const siblings = Array.from(document.body.children).filter(
      (el): el is HTMLElement => el !== gate && !skippable.includes(el.tagName) && !el.hasAttribute("inert")
    );
    siblings.forEach((el) => el.setAttribute("inert", ""));
    // Move focus into the dialog without lighting up a button; the first Tab reaches "Skip intro".
    gate.focus({ preventScroll: true });
    return () => siblings.forEach((el) => el.removeAttribute("inert"));
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      id="intro-gate"
      ref={gateRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site introduction"
      tabIndex={-1}
      className={cn(
        "fixed inset-0 z-[200] bg-ink-950 outline-none transition-[opacity,transform] ease-out",
        phase === "leaving" && "pointer-events-none scale-[1.04] opacity-0"
      )}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <ScrollLockedVideoHero
        videoSrc={INTRO_VIDEO}
        endAt={INTRO_END}
        title={site.name}
        tagline={site.role}
        scrollHint={hint}
        active={armed && phase === "active"}
        onComplete={finish}
        onSkip={finish}
      />
      <button
        type="button"
        onClick={finish}
        className="glass absolute right-5 top-5 z-10 rounded-full px-4 py-2 font-mono text-[12px] text-paper-muted transition-colors hover:text-paper focus-visible:text-paper"
      >
        Skip intro
      </button>
    </div>
  );
}
