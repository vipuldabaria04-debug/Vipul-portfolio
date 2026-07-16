import { Reveal } from "@/components/ui/Reveal";
import { skillGroups } from "@/data/skills";

export function SkillsGrid() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {skillGroups.map((group, i) => (
        <Reveal key={group.category} delay={i * 0.05}>
          <div className="card-surface h-full p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-trace">
              {group.category}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-line bg-ink-850 px-2.5 py-1.5 text-[13px] text-paper-dim"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
