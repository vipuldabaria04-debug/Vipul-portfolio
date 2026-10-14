"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { mainNav, moreNav, site } from "@/data/site";
import { cn } from "@/lib/utils";
import { startLiquidGlass, type GlassHandle } from "@/lib/liquid-glass";

/** Tuned for a dark page: gentle refraction, a soft bevel, a touch of frost and a dark dye. */
const NAV_GLASS = {
  refraction: 0.02,
  bevelDepth: 0.14,
  bevelWidth: 0.3,
  frost: 1.5,
  shadow: true,
  specular: true,
  resolution: 1.25,
  tint: "rgba(9, 11, 16, 0.32)",
  reveal: "fade",
} as const;

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // True while the liquid-glass lens is drawing the pill (desktop only).
  const [glassOn, setGlassOn] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // (Re)build the glass lens for each page: it refracts a snapshot of the page, so a
  // new route needs a new snapshot. It waits for the homepage intro to finish and for
  // the page's own entrance animations to settle, so neither ends up in the snapshot.
  useEffect(() => {
    let cancelled = false;
    let handle: GlassHandle | null = null;
    let timer: ReturnType<typeof setTimeout> | undefined;
    setGlassOn(false);

    const attempt = (tries: number) => {
      if (document.getElementById("intro-gate") && tries < 240) {
        timer = setTimeout(() => attempt(tries + 1), 500);
        return;
      }
      timer = setTimeout(async () => {
        const h = await startLiquidGlass("#glass-nav", NAV_GLASS);
        if (cancelled) {
          h?.destroy();
          return;
        }
        handle = h;
        setGlassOn(!!h);
      }, 1500);
    };
    const begin = () => attempt(0);
    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });

    return () => {
      cancelled = true;
      clearTimeout(timer);
      window.removeEventListener("load", begin);
      handle?.destroy();
    };
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[80] transition-all duration-300",
        // On phones and small screens the header is a full-width bar; from lg up it is
        // just a click-through container for the floating glass pill below.
        "lg:pointer-events-none lg:border-0 lg:bg-transparent lg:shadow-none lg:backdrop-blur-none",
        scrolled ? "glass" : "bg-transparent"
      )}
    >
      <nav
        id="glass-nav"
        className={cn(
          "container-page flex h-16 items-center justify-between",
          "lg:pointer-events-auto lg:[&>*]:pointer-events-auto lg:mt-3 lg:h-14 lg:w-[calc(100%-2rem)] lg:max-w-[1120px] lg:rounded-full lg:border lg:border-white/10 lg:px-7",
          // Plain CSS glass until (and unless) the liquid-glass lens takes over
          glassOn ? "lg:bg-transparent lg:backdrop-blur-none" : "lg:bg-ink-900/60 lg:backdrop-blur-xl"
        )}
        aria-label="Primary"
      >
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.name} — home`}>
          <span className="node-dot animate-pulseTrace" />
          <span className="font-display text-[15px] font-semibold tracking-tight text-paper">
            Vipul<span className="text-signal">.</span>Dabaria
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "link-underline font-mono text-[13px] tracking-wide text-paper-muted transition-colors hover:text-paper",
                pathname === item.href && "text-signal"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="group relative">
            <button className="font-mono text-[13px] tracking-wide text-paper-muted transition-colors hover:text-paper">
              More
            </button>
            <div className="invisible absolute right-0 top-full flex w-48 flex-col gap-1 rounded-lg border border-line bg-ink-900 p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
              {moreNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-[13px] text-paper-dim hover:bg-ink-850 hover:text-paper"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <Link
            href="/contact"
            className="shadow-glow-brass inline-flex items-center gap-1.5 rounded-[7px] border border-signal/30 bg-signal/[0.07] px-4 py-2 font-mono text-[12px] tracking-wide text-signal transition-colors hover:bg-signal/[0.14]"
          >
            Let&apos;s talk
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <button
          className="flex items-center justify-center rounded-md p-2 text-paper lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-ink-950 lg:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-4">
              {[...mainNav, ...moreNav].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-3 font-mono text-sm text-paper-dim hover:bg-ink-850 hover:text-paper",
                    pathname === item.href && "text-signal"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
