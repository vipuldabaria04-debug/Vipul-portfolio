import { Award } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { TiltCard } from "@/components/ui/TiltCard";
import { achievements } from "@/data/skills";

export function AchievementsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {achievements.map((a, i) => (
        <Reveal key={a.id} delay={i * 0.05}>
          <TiltCard maxTilt={2.5} className="card-surface flex h-full gap-4 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
              <Award className="h-[18px] w-[18px] text-gold" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-medium text-paper">{a.title}</h3>
                <Badge>{a.tag}</Badge>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-paper-muted">{a.description}</p>
              <p className="mt-3 font-mono text-[11px] text-paper-faint">{a.year}</p>
            </div>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  );
}
