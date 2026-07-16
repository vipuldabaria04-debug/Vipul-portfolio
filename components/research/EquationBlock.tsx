export function EquationBlock({
  label,
  equation,
  description,
}: {
  label: string;
  equation: string;
  description?: string;
}) {
  return (
    <div className="card-surface flex flex-col items-center gap-3 p-8 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-trace">{label}</p>
      <p
        className="text-2xl text-paper md:text-3xl"
        style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.01em" }}
      >
        {equation}
      </p>
      {description && (
        <p className="max-w-md text-[13px] leading-relaxed text-paper-muted">{description}</p>
      )}
    </div>
  );
}
