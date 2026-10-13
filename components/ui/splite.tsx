"use client";

import dynamic from "next/dynamic";
import type { Application } from "@splinetool/runtime";

interface SplineSceneProps {
  /** A published Spline scene URL (…/scene.splinecode). */
  scene: string;
  className?: string;
  onLoad?: (app: Application) => void;
}

function SceneLoader() {
  return (
    <div className="flex h-full w-full items-center justify-center" role="status" aria-label="Loading 3D scene">
      <span className="node-dot animate-pulseTrace" />
    </div>
  );
}

// The Spline runtime is large (it ships a WebGL engine), so it is loaded only on
// the client and only when a scene is actually rendered — never in the server
// bundle and never on the initial page payload.
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <SceneLoader />,
});

export function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
  return <Spline scene={scene} className={className} onLoad={onLoad} />;
}
