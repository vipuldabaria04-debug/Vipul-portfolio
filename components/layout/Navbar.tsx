"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { mainNav, moreNav, site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[80] transition-all duration-300",
        scrolled ? "glass" : "bg-transparent"
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Primary">
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
