import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion, useIsMobile } from "../../hooks";

/**
 * Shared Canvas wrapper.
 *
 * Every 3D scene on the site goes through here so the performance rules live
 * in one place: capped DPR, no anti-alias cost on mobile, frameloop parked
 * when the section is off-screen or the user asked for reduced motion.
 */
const SceneFrame = ({
  children,
  camera = { position: [0, 0, 9], fov: 42 },
  className = "",
  active = true,
  fallback = null,
}) => {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  // Render a single frame instead of animating when motion is reduced.
  const frameloop = !active ? "never" : reduceMotion ? "demand" : "always";

  return (
    <div className={className}>
      <Canvas
        camera={camera}
        dpr={[1, isMobile ? 1.4 : 1.9]}
        gl={{
          antialias: !isMobile,
          powerPreference: "high-performance",
          alpha: true,
        }}
        frameloop={frameloop}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={fallback}>{children}</Suspense>
      </Canvas>
    </div>
  );
};

export default SceneFrame;
