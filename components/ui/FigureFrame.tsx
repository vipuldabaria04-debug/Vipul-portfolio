import { ImageIcon, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function FigureFrame({
  figureNumber,
  caption,
  location,
  tag,
  ratio = "aspect-[4/3]",
  className,
  priority = false,
  kind = "photo",
}: {
  /** e.g. "01" — rendered as "Fig. 01" */
  figureNumber: string;
  caption: string;
  location?: string;
  tag?: string;
  ratio?: string;
  className?: string;
  priority?: boolean;
  kind?: "photo" | "video";
}) {
  return (
    <figure className={cn("group relative", className)}>
      <div
        className={cn(
          "zoom-frame schematic-bg relative overflow-hidden rounded-2xl border border-line bg-ink-850",
          ratio,
          priority ? "shadow-elevated" : "shadow-soft"
        )}
      >
        {/* corner registration marks — the visual cue this is a deliberate
            documentary frame, not a generic empty box */}
        <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-white/25" aria-hidden="true" />
        <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-white/25" aria-hidden="true" />
        <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-white/25" aria-hidden="true" />
        <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-white/25" aria-hidden="true" />

        {tag && (
          <span className="absolute left-3 top-3 z-10 translate-x-4 translate-y-4 rounded border border-signal/30 bg-ink-950/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-signal backdrop-blur-sm">
            {tag}
          </span>
        )}

        <div className="flex h-full w-full items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-paper-faint">
            {kind === "video" ? <PlayCircle className="h-6 w-6" /> : <ImageIcon className="h-6 w-6" />}
            <span className="max-w-[220px] text-center font-mono text-[10.5px] uppercase tracking-wide">
              {kind === "video" ? "Footage pending" : "Photo pending"}
            </span>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 flex items-baseline gap-3">
        <span className="shrink-0 font-mono text-[11px] text-signal">Fig. {figureNumber}</span>
        <span className="text-[13px] leading-snug text-paper-muted">
          {caption}
          {location && <span className="text-paper-faint"> — {location}</span>}
        </span>
      </figcaption>
    </figure>
  );
}
