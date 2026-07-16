"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.4 }}
      className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      aria-hidden="true"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-faint">
        Scroll
      </span>
      <motion.span
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-3.5 w-3.5 text-paper-faint" />
      </motion.span>
    </motion.div>
  );
}
