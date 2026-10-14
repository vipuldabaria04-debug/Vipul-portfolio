// liquid-gl ships plain JavaScript without type declarations.
declare module "liquid-gl" {
  export interface LiquidGLLens {
    destroy(): void;
    setTint?(color: string | null): void;
    setDraggable?(on: boolean): void;
  }
  export interface LiquidGLOptions {
    target: string;
    engine?: "auto" | "webgpu" | "webgl2" | "webgl";
    snapshot?: string;
    resolution?: number;
    zIndex?: number;
    content?: string | boolean;
    refraction?: number;
    aberration?: number;
    bevelDepth?: number;
    bevelWidth?: number;
    frost?: number;
    shadow?: boolean;
    specular?: boolean;
    reveal?: "none" | "fade";
    tilt?: boolean;
    tiltFactor?: number;
    tiltEase?: number;
    draggable?: boolean;
    interaction?: "none" | "fluid";
    magnify?: number;
    tint?: string | null;
    helper?: boolean;
    on?: { init?: (lens: LiquidGLLens) => void };
  }
  const liquidGL: {
    (options: LiquidGLOptions): LiquidGLLens | LiquidGLLens[] | undefined;
    registerDynamic(elements: string | Element[]): void;
    syncWith(config?: Record<string, unknown>): Record<string, unknown>;
  };
  export default liquidGL;
}
