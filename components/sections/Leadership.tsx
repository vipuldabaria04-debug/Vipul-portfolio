import { Reveal } from "@/components/ui/Reveal";
import { leadership } from "@/data/experience";

export function Leadership() {
  return (
    <div className="rounded-2xl border border-line bg-ink-900/40 p-8 md:p-12">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="eyebrow mb-2">Leadership</p>
          <h3 className="text-2xl font-semibold text-paper md:text-3xl">{leadership.role}</h3>
          <p className="mt-1 text-[15px] text-paper-dim">{leadership.org}</p>
        </div>
        <p className="font-mono text-[12px] text-paper-muted">{leadership.period}</p>
      </div>

      <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-paper-muted">
        {leadership.summary}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {leadership.responsibilities.map((r, i) => (
          <Reveal key={r.title} delay={i * 0.05}>
            <div className="border-l border-line pl-4">
              <p className="font-mono text-[11px] text-signal">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1.5 font-medium text-paper">{r.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-paper-muted">{r.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
