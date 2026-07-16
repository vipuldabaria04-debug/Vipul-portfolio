import { LineChart, Code2, Lightbulb, FlaskConical, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import type { Snippet } from "@/data/snippets";

const kindMeta: Record<Snippet["kind"], { icon: typeof Code2; accent: "signal" | "trace" }> = {
  Visualization: { icon: LineChart, accent: "trace" },
  Code: { icon: Code2, accent: "signal" },
  Insight: { icon: Lightbulb, accent: "trace" },
  Prototype: { icon: FlaskConical, accent: "signal" },
  Lesson: { icon: GraduationCap, accent: "trace" },
};

export function SnippetCard({ snippet, index = 0 }: { snippet: Snippet; index?: number }) {
  const { icon: Icon, accent } = kindMeta[snippet.kind];
  const accentClass = accent === "signal" ? "text-signal" : "text-trace";

  return (
    <Reveal delay={index * 0.05}>
      <SpotlightCard accent={accent} className="flex h-full flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <Badge>{snippet.kind}</Badge>
          <Icon className={`h-4 w-4 ${accentClass}`} />
        </div>
        <h3 className="text-base font-semibold text-paper">{snippet.title}</h3>
        <p className="text-sm leading-relaxed text-paper-muted">{snippet.description}</p>
        {snippet.code && (
          <pre className="overflow-x-auto rounded-lg border border-line bg-ink-950 p-4 font-mono text-[12.5px] leading-relaxed text-paper-dim">
            <code>{snippet.code}</code>
          </pre>
        )}
      </SpotlightCard>
    </Reveal>
  );
}
