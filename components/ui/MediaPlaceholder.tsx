import { ImageIcon, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function MediaPlaceholder({
  label,
  ratio = "aspect-video",
  kind = "image",
  className,
}: {
  label: string;
  ratio?: string;
  kind?: "image" | "video";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "zoom-frame schematic-bg group relative flex items-center justify-center overflow-hidden rounded-xl border border-dashed border-line bg-ink-900/50",
        ratio,
        className
      )}
    >
      <div className="flex flex-col items-center gap-2 text-paper-faint transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
        {kind === "video" ? (
          <PlayCircle className="h-7 w-7" />
        ) : (
          <ImageIcon className="h-7 w-7" />
        )}
        <span className="max-w-[200px] text-center font-mono text-[11px] uppercase tracking-wide">
          {label}
        </span>
      </div>
    </div>
  );
}
