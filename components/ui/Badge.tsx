import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-ink-850 px-3 py-1 font-mono text-[11px] tracking-wide text-paper-dim",
        className
      )}
    >
      {children}
    </span>
  );
}
