/**
 * Thin, defensive wrapper around liquidGL (https://github.com/naughtyduk/liquidGL, MIT).
 *
 * liquidGL turns a fixed/sticky element into a refracting "liquid glass" pane
 * drawn with WebGPU/WebGL. It is a progressive enhancement here: if the visitor's
 * device is a phone, prefers reduced motion, has Data Saver on, or anything at all
 * goes wrong, this resolves to `null` and the element keeps its plain CSS blur
 * styling. The library itself is only downloaded when it is going to be used.
 */
import type { LiquidGLOptions } from "liquid-gl";

export interface GlassHandle {
  destroy(): void;
}

export function canUseLiquidGlass(): boolean {
  if (typeof window === "undefined") return false;
  const saveData = !!(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  return (
    window.matchMedia("(min-width: 1024px)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !saveData
  );
}

export async function startLiquidGlass(
  target: string,
  options: Omit<LiquidGLOptions, "target"> = {}
): Promise<GlassHandle | null> {
  if (!canUseLiquidGlass()) return null;
  try {
    const { default: liquidGL } = await import("liquid-gl");
    const result = liquidGL({ target, snapshot: "body", ...options });
    const lenses = Array.isArray(result) ? result : result ? [result] : [];
    if (!lenses.length) return null;
    return {
      destroy: () => {
        for (const lens of lenses) {
          try {
            lens.destroy();
          } catch {
            /* already torn down */
          }
        }
      },
    };
  } catch (err) {
    console.warn("liquidGL could not start; falling back to CSS glass.", err);
    return null;
  }
}
