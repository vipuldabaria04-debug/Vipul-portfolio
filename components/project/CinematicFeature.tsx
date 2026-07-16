import { ImageIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function CinematicFeature({
  eyebrow,
  headline,
  caption,
  tag,
}: {
  eyebrow: string;
  headline: string;
  caption: string;
  tag?: string;
}) {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-3xl border border-line bg-ink-900 shadow-elevated">
        <div className="schematic-bg absolute inset-0 opacity-40" />

        {/* headline sits directly on the media, the way Apple's product pages set type over photography */}
        <div className="relative z-10 px-8 pb-0 pt-10 md:px-14 md:pt-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">{eyebrow}</p>
          <p className="text-balance mt-4 max-w-2xl font-display text-2xl font-semibold leading-[1.15] text-paper md:text-4xl">
            {headline}
          </p>
        </div>

        <div className="relative z-10 mt-10 aspect-[16/9] w-full overflow-hidden md:mt-14">
          <div className="zoom-frame group flex h-full w-full items-center justify-center bg-ink-850">
            {tag && (
              <span className="absolute left-6 top-6 z-10 rounded border border-signal/30 bg-ink-950/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-signal backdrop-blur-sm">
                {tag}
              </span>
            )}
            <div className="flex flex-col items-center gap-2 text-paper-faint">
              <ImageIcon className="h-7 w-7" />
              <span className="max-w-[240px] text-center font-mono text-[10.5px] uppercase tracking-wide">
                {caption}
              </span>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
