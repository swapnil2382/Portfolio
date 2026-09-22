import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { createScreenTexture } from "./ScreenTexture";

const ACCENT = "#f0b429";
// No environment map in this scene, so metallic materials have nothing to
// reflect and would render black. Low metalness + a lighter base keeps the
// machine legible against the dark page.
const SHELL = "#3a4658";
const SHELL_LIGHT = "#4a5870";

/** The display: a canvas texture that scrolls a stylised website. */
const Screen = () => {
  const screen = useMemo(() => createScreenTexture(), []);
  const scroll = useRef(0);
  const sinceDraw = useRef(0);

  useEffect(() => () => screen.dispose(), [screen]);

  useFrame((state, delta) => {
    // Gentle, continuous scroll.
    scroll.current += delta * 42;
    sinceDraw.current += delta;

    // Redrawing a 640x400 canvas every frame is wasted work — ~24fps is
    // indistinguishable here and leaves the GPU alone.
    if (sinceDraw.current >= 1 / 24) {
      screen.draw(scroll.current);
      sinceDraw.current = 0;
    }
  });

  return (
    <mesh position={[0, 1.1, 0.056]}>
      <planeGeometry args={[3.18, 1.99]} />
      <meshBasicMaterial map={screen.texture} toneMapped={false} />
    </mesh>
  );
};

const Laptop = () => (
  <group rotation={[0, -0.34, 0]}>
    {/* base */}
    <RoundedBox
      args={[3.6, 0.15, 2.4]}
      radius={0.06}
      smoothness={3}
      position={[0, -0.78, 0.62]}
    >
      <meshStandardMaterial color={SHELL_LIGHT} metalness={0.25} roughness={0.42} />
    </RoundedBox>

    {/* keyboard well */}
    <mesh position={[0, -0.7, 0.35]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[3.0, 1.1]} />
      <meshStandardMaterial color="#2c3648" roughness={0.75} metalness={0.05} />
    </mesh>

    {/* key rows */}
    {[0, 1, 2, 3].map((row) => (
      <mesh
        key={row}
        position={[0, -0.69, -0.07 + row * 0.24]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[2.88, 0.14]} />
        <meshStandardMaterial color="#37435a" roughness={0.8} metalness={0.05} />
      </mesh>
    ))}

    {/* trackpad */}
    <mesh position={[0, -0.69, 1.18]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[1.15, 0.72]} />
      <meshStandardMaterial color="#323d52" roughness={0.6} metalness={0.1} />
    </mesh>

    {/* lid */}
    <group position={[0, -0.72, -0.55]} rotation={[-0.4, 0, 0]}>
      <RoundedBox
        args={[3.6, 2.3, 0.1]}
        radius={0.05}
        smoothness={3}
        position={[0, 1.1, 0]}
      >
        <meshStandardMaterial color={SHELL} metalness={0.25} roughness={0.42} />
      </RoundedBox>

      <Screen />

      {/* camera dot */}
      <mesh position={[0, 2.17, 0.056]}>
        <circleGeometry args={[0.022, 12]} />
        <meshBasicMaterial color="#1b2432" />
      </mesh>

      {/* light spilling from the display */}
      <pointLight
        position={[0, 1.1, 1.2]}
        intensity={5}
        distance={6}
        color="#6f93d6"
      />
    </group>

    {/* hinge */}
    <mesh position={[0, -0.78, -0.55]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.07, 0.07, 3.4, 16]} />
      <meshStandardMaterial color="#2c3648" metalness={0.35} roughness={0.5} />
    </mesh>
  </group>
);

/**
 * Hero scene: just the machine, with a page scrolling on its display.
 * Rotates gently toward the pointer.
 */
const Workstation = ({ pointer, offsetX = 2.4 }) => {
  const group = useRef(null);

  useFrame((state, delta) => {
    if (!group.current) return;

    const targetY = pointer?.current ? pointer.current.x * 0.3 : 0;
    const targetX = pointer?.current ? pointer.current.y * 0.16 : 0;

    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetY,
      3,
      delta
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetX,
      3,
      delta
    );
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <hemisphereLight args={["#cddcf5", "#2a3344", 1.1]} />
      <directionalLight position={[5, 6, 5]} intensity={2.6} />
      <directionalLight position={[-6, -1, -4]} intensity={1.1} color="#7aa2e3" />
      <directionalLight position={[-3, 4, -6]} intensity={1.4} color="#ffffff" />
      <pointLight position={[0, 1, 5]} intensity={1.8} color={ACCENT} distance={16} />

      {/* Shifted right so the machine sits in the empty half of the hero
          instead of behind the headline. */}
      <group ref={group} position={[offsetX, 0, 0]} scale={1.08}>
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.4}>
          <Laptop />
        </Float>
      </group>
    </>
  );
};

export default Workstation;
