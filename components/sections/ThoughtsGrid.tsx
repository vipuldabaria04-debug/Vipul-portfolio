"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { thoughts, type Thought } from "@/data/thoughts";

const categories: Array<Thought["category"] | "All"> = [
  "All",
  "Research",
  "Engineering",
  "Notes",
  "Events",
  "Books",
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ThoughtsGrid() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(
    () => (active === "All" ? thoughts : thoughts.filter((t) => t.category === active)),
    [active]
  );

  return (
    <div>
      <div className="mb-14 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-4 py-2 font-mono text-[12px] tracking-wide transition-colors ${
              active === c
                ? "border-signal/50 bg-signal/10 text-signal"
                : "border-line text-paper-muted hover:text-paper"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* A single ruled column — reads as a running journal, not a card grid */}
      <div className="relative mx-auto max-w-2xl">
        <div className="absolute bottom-2 left-0 top-2 hidden w-px bg-line md:block" aria-hidden="true" />
        <div className="flex flex-col">
          {filtered.map((t, i) => (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
              className="relative border-b border-line py-8 pl-0 last:border-0 md:pl-10"
            >
              <span className="absolute left-0 top-9 hidden h-1.5 w-1.5 -translate-x-[2.5px] rounded-full bg-signal md:block" aria-hidden="true" />
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wide text-trace">
                  {t.category} · Entry {String(filtered.length - i).padStart(3, "0")}
                </span>
                <time className="font-mono text-[11px] text-paper-faint">{formatDate(t.date)}</time>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-paper">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper-muted">{t.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
