import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="schematic-bg flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-signal">Signal lost</p>
      <h1 className="mt-4 font-display text-6xl font-semibold text-paper md:text-8xl">404</h1>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper-muted">
        This route doesn&apos;t exist on the map. Let&apos;s get you back to a known node.
      </p>
      <div className="mt-8">
        <Button href="/">Back to home</Button>
      </div>
    </div>
  );
}
