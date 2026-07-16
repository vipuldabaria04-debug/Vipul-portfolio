export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-ink-950">
      <div className="widget-light flex flex-col items-center gap-3 rounded-[22px] px-8 py-7">
        <span className="node-dot animate-pulseTrace" style={{ boxShadow: "0 0 0 4px rgba(59,130,246,0.16)" }} />
        <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#6B6F7B]">
          Loading
        </p>
      </div>
    </div>
  );
}
