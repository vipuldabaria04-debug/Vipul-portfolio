import { cn } from "@/lib/utils";

export function MeshGradient({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "research" | "product";
}) {
  const palettes = {
    default: [
      { color: "59,130,246", x: "8%", y: "-10%", size: 620, delay: "0s" },
      { color: "124,138,165", x: "88%", y: "8%", size: 540, delay: "-6s" },
      { color: "59,130,246", x: "50%", y: "85%", size: 480, delay: "-12s" },
    ],
    research: [
      { color: "124,138,165", x: "10%", y: "0%", size: 560, delay: "0s" },
      { color: "59,130,246", x: "92%", y: "20%", size: 600, delay: "-8s" },
      { color: "124,138,165", x: "40%", y: "95%", size: 460, delay: "-14s" },
    ],
    product: [
      { color: "59,130,246", x: "0%", y: "10%", size: 640, delay: "0s" },
      { color: "201,161,90", x: "95%", y: "0%", size: 420, delay: "-5s" },
      { color: "59,130,246", x: "55%", y: "90%", size: 560, delay: "-10s" },
    ],
  }[variant];

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {palettes.map((p, i) => (
        <div
          key={i}
          className="animate-drift absolute rounded-full opacity-[0.09] blur-[110px]"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgb(${p.color}) 0%, transparent 70%)`,
            animationDelay: p.delay,
            animationDuration: `${18 + i * 4}s`,
          }}
        />
      ))}
    </div>
  );
}
