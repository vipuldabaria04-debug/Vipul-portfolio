export function DraftingMarks({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      {/* top-left registration mark */}
      <svg
        className="absolute left-6 top-6 h-6 w-6 opacity-[0.35] md:left-10 md:top-8"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path d="M12 2V10" stroke="#8B93A3" strokeWidth="1" />
        <path d="M2 12H10" stroke="#8B93A3" strokeWidth="1" />
        <circle cx="12" cy="12" r="2.5" stroke="#8B93A3" strokeWidth="1" />
      </svg>
      {/* bottom-right registration mark */}
      <svg
        className="absolute bottom-6 right-6 h-6 w-6 opacity-[0.35] md:bottom-8 md:right-10"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path d="M12 14V22" stroke="#8B93A3" strokeWidth="1" />
        <path d="M14 12H22" stroke="#8B93A3" strokeWidth="1" />
        <circle cx="12" cy="12" r="2.5" stroke="#8B93A3" strokeWidth="1" />
      </svg>
    </div>
  );
}
