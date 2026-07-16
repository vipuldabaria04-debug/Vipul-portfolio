"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "build-log", label: "Build Log" },
  { id: "gallery", label: "Gallery" },
  { id: "recognition", label: "Recognition" },
];

export function ProductTabs() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const sections = tabs.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="glass sticky top-16 z-[60] border-b border-line">
      <nav className="container-page flex items-center gap-1 overflow-x-auto py-3" aria-label="Urban Pulse sections">
        {tabs.map((t) => {
          const isActive = active === t.id;
          return (
            <a
              key={t.id}
              href={`#${t.id}`}
              className="relative shrink-0 rounded-full px-4 py-1.5 font-mono text-[12.5px] text-paper-muted transition-colors duration-300 hover:text-paper"
            >
              {isActive && (
                <motion.span
                  layoutId="product-tab-active"
                  className="absolute inset-0 rounded-full border border-signal/30 bg-signal/15"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className={`relative ${isActive ? "text-signal" : ""}`}>{t.label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
