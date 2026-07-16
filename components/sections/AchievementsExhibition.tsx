import { Trophy } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { FigureFrame } from "@/components/ui/FigureFrame";
import { Badge } from "@/components/ui/Badge";
import { achievements } from "@/data/skills";

export function AchievementsExhibition() {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
      {achievements.map((a, i) => {
        const featured = i === 0;
        return (
          <Reveal
            key={a.id}
            delay={i * 0.06}
            className={featured ? "lg:col-span-2 lg:row-span-2" : ""}
          >
            <div className="flex h-full flex-col">
              <FigureFrame
                figureNumber={String(i + 1).padStart(2, "0")}
                caption={a.title}
                tag={a.tag}
                ratio={featured ? "aspect-[16/10]" : "aspect-[4/3]"}
                priority={featured}
              />
              <div className="mt-4 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className={featured ? "text-lg font-semibold text-paper" : "font-medium text-paper"}>
                        {a.title}
                      </h3>
                      <Badge>{a.tag}</Badge>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-paper-muted">{a.description}</p>
                  </div>
                </div>
                <span className="shrink-0 font-mono text-[11px] text-paper-faint">{a.year}</span>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
