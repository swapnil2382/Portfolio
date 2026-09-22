import React, { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "../../data/profile";
import { usePointer, useIsMobile, useInViewOnce, scrollToSection } from "../../hooks";
import StatusPanel from "./StatusPanel";
import ResumeButton from "./ResumeButton";
import Marquee from "./Marquee";

// 3D is split out of the main bundle and only mounted once the hero is seen.
const SceneFrame = lazy(() => import("../three/SceneFrame"));
const Workstation = lazy(() => import("../three/Workstation"));

const ease = [0.22, 1, 0.36, 1];

const line = {
  hidden: { opacity: 0, y: 26 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: 0.1 + i * 0.09, ease },
  }),
};

const Hero = () => {
  const isMobile = useIsMobile();
  const pointer = usePointer(!isMobile);
  const [sceneRef, sceneVisible] = useInViewOnce("100px");

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* ambient base */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 60% 35%, var(--navy) 0%, var(--bg-0) 70%)",
        }}
      />
      <div className="tech-grid absolute inset-0 -z-10 opacity-60" />

      {/* 3D workstation — desktop only.
          Three.js costs ~240kB gzipped; on a phone that is a poor trade for a
          background element, so mobile gets a CSS-only glow instead. */}
      {!isMobile && (
        <div ref={sceneRef} className="absolute inset-0 -z-[5]">
          {sceneVisible && (
            <Suspense fallback={null}>
              <SceneFrame
                className="h-full w-full"
                camera={{ position: [0, 0.4, 10], fov: 42 }}
              >
                <Workstation pointer={pointer} />
              </SceneFrame>
            </Suspense>
          )}
        </div>
      )}

      {isMobile && (
        <div
          className="pointer-events-none absolute inset-0 -z-[5]"
          style={{
            background:
              "radial-gradient(circle 280px at 78% 22%, rgba(240,180,41,0.09), transparent 70%)",
          }}
        />
      )}

      {/* copy */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-5 pb-32 pt-32 sm:px-8">
        <div className="max-w-2xl">
          <motion.p
            className="mono mb-6 text-[0.72rem] tracking-[0.2em]"
            style={{ color: "var(--text-3)" }}
            variants={line}
            initial="hidden"
            animate="show"
            custom={0}
          >
            <span style={{ color: "var(--accent)" }}>{"{"}</span>
            {" building_products: true "}
            <span style={{ color: "var(--accent)" }}>{"}"}</span>
          </motion.p>

          <motion.h1
            className="display text-[2.6rem] font-extrabold leading-[0.95] sm:text-6xl lg:text-7xl"
            variants={line}
            initial="hidden"
            animate="show"
            custom={1}
          >
            Hey, I'm Swapnil.
          </motion.h1>

          <motion.p
            className="mt-6 text-xl font-semibold text-[color:var(--text-0)] sm:text-2xl"
            variants={line}
            initial="hidden"
            animate="show"
            custom={2}
          >
            {profile.title}
          </motion.p>

          <motion.p
            className="mono mt-2 text-sm tracking-wide"
            style={{ color: "var(--accent)" }}
            variants={line}
            initial="hidden"
            animate="show"
            custom={3}
          >
            {profile.specialization}
          </motion.p>

          <motion.p
            className="mt-7 max-w-lg text-base leading-relaxed text-[color:var(--text-1)] sm:text-lg"
            variants={line}
            initial="hidden"
            animate="show"
            custom={4}
          >
            {profile.statement}
          </motion.p>

          {/* actions */}
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            variants={line}
            initial="hidden"
            animate="show"
            custom={5}
          >
            <button
              type="button"
              onClick={() => scrollToSection("about")}
              data-cursor="GO"
              className="inline-flex items-center gap-2.5 rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-300 hover:brightness-110"
              style={{ background: "var(--accent)", color: "#0a0c10" }}
            >
              Explore Portfolio
              <ArrowDown size={15} />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("projects")}
              data-cursor="VIEW"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-colors duration-300"
              style={{
                border: "1px solid var(--line-strong)",
                color: "var(--text-0)",
              }}
            >
              View Projects
              <ArrowUpRight size={15} />
            </button>

            <ResumeButton />
          </motion.div>

          {/* status line */}
          <motion.p
            className="mono mt-8 text-[0.7rem]"
            style={{ color: "var(--text-3)" }}
            variants={line}
            initial="hidden"
            animate="show"
            custom={6}
          >
            status:{" "}
            <span style={{ color: "#4ade80" }}>{profile.status}</span>
          </motion.p>
        </div>

        {/* floating status panel */}
        <div className="pointer-events-none absolute bottom-28 right-5 hidden lg:block xl:right-8">
          <div className="pointer-events-auto">
            <StatusPanel />
          </div>
        </div>
      </div>

      {/* marquee pinned to the bottom of the viewport */}
      <div className="absolute bottom-0 left-0 w-full">
        <Marquee />
      </div>
    </section>
  );
};

export default Hero;
