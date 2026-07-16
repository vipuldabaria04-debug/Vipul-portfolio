import type { ReactNode } from "react";
import { FigureFrame } from "@/components/ui/FigureFrame";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function SplitStory({
  reverse = false,
  figureNumber,
  caption,
  location,
  tag,
  ratio = "aspect-[4/5]",
  eyebrow,
  title,
  children,
  className,
}: {
  reverse?: boolean;
  figureNumber: string;
  caption: string;
  location?: string;
  tag?: string;
  ratio?: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16", className)}>
      <Reveal className={reverse ? "lg:order-2" : ""}>
        <FigureFrame figureNumber={figureNumber} caption={caption} location={location} tag={tag} ratio={ratio} priority />
      </Reveal>
      <Reveal delay={0.1} className={reverse ? "lg:order-1" : ""}>
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h3 className="text-2xl font-semibold text-paper md:text-3xl">{title}</h3>
        <div className="mt-5 flex flex-col gap-4 text-[15px] leading-relaxed text-paper-muted">
          {children}
        </div>
      </Reveal>
    </div>
  );
}
