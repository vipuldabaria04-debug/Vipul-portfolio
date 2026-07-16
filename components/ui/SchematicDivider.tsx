"use client";

export function SchematicDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="h-10 w-full"
        fill="none"
      >
        <line x1="0" y1="20" x2="1200" y2="20" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        {/* continuous signal flow — a quiet pulse traveling the trace, evoking live current */}
        <line
          x1="0"
          y1="20"
          x2="1200"
          y2="20"
          stroke="#3B82F6"
          strokeWidth="1"
          strokeDasharray="2 34"
          className="animate-dashFlow"
          opacity={0.4}
        />
        {[80, 320, 560, 800, 1040].map((x, i) => (
          <g key={x}>
            <circle cx={x} cy={20} r={3} fill="#3B82F6" opacity={0.55} />
            {i % 2 === 0 && (
              <path
                d={`M ${x} 20 L ${x} 8 L ${x + 40} 8`}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
