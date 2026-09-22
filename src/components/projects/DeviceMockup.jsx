import React, { useState, useRef } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useIsTouch } from "../../hooks";

/**
 * Abstract UI drawn with plain divs, used when a project has no screenshot.
 * It is always labelled DEMO — this never pretends to be real product output.
 */
const DemoUI = ({ platform }) => {
  if (platform === "mobile") {
    return (
      <div className="flex h-full w-full flex-col p-3" style={{ background: "var(--bg-1)" }}>
        <div className="flex items-center justify-between px-1 pt-1">
          <div className="h-1.5 w-6 rounded-full" style={{ background: "var(--bg-3)" }} />
          <div className="flex gap-1">
            <div className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--bg-3)" }} />
            <div className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--bg-3)" }} />
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <div className="h-2.5 w-2/3 rounded" style={{ background: "var(--accent)", opacity: 0.45 }} />
          <div className="h-1.5 w-1/2 rounded" style={{ background: "var(--bg-3)" }} />
        </div>

        <div className="mt-5 flex-1 space-y-2.5">
          {[0, 1, 2, 3].map((row) => (
            <div
              key={row}
              className="flex items-center gap-2 rounded-lg p-2"
              style={{ background: "var(--bg-2)", border: "1px solid var(--line)" }}
            >
              <div className="h-6 w-6 shrink-0 rounded-md" style={{ background: "var(--accent-soft)" }} />
              <div className="flex-1 space-y-1.5">
                <div className="h-1.5 w-3/4 rounded" style={{ background: "var(--bg-3)" }} />
                <div className="h-1.5 w-1/2 rounded" style={{ background: "var(--bg-3)", opacity: 0.6 }} />
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-3 flex items-center justify-around rounded-xl py-2"
          style={{ background: "var(--bg-2)", border: "1px solid var(--line)" }}
        >
          <div className="h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
          {[0, 1, 2].map((dot) => (
            <div key={dot} className="h-2 w-2 rounded-full" style={{ background: "var(--bg-3)" }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full" style={{ background: "var(--bg-1)" }}>
      <div
        className="hidden w-[18%] flex-col gap-2 p-3 sm:flex"
        style={{ borderRight: "1px solid var(--line)" }}
      >
        <div className="mb-2 h-2 w-3/4 rounded" style={{ background: "var(--accent)", opacity: 0.4 }} />
        {[0, 1, 2, 3, 4].map((row) => (
          <div key={row} className="h-1.5 w-full rounded" style={{ background: "var(--bg-3)" }} />
        ))}
      </div>

      <div className="flex-1 space-y-3 p-4">
        <div className="h-2.5 w-1/3 rounded" style={{ background: "var(--accent)", opacity: 0.4 }} />

        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((card) => (
            <div
              key={card}
              className="space-y-1.5 rounded-lg p-2.5"
              style={{ background: "var(--bg-2)", border: "1px solid var(--line)" }}
            >
              <div className="h-1.5 w-2/3 rounded" style={{ background: "var(--bg-3)" }} />
              <div className="h-2.5 w-1/2 rounded" style={{ background: "var(--bg-3)", opacity: 0.7 }} />
            </div>
          ))}
        </div>

        <div
          className="flex h-[52%] items-end gap-1.5 rounded-lg p-3"
          style={{ background: "var(--bg-2)", border: "1px solid var(--line)" }}
        >
          {[45, 70, 35, 85, 55, 95, 60, 75, 50].map((height, idx) => (
            <div
              key={idx}
              className="flex-1 rounded-sm"
              style={{
                height: `${height}%`,
                background: idx % 3 === 0 ? "var(--accent)" : "var(--bg-3)",
                opacity: idx % 3 === 0 ? 0.55 : 1,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const DemoBadge = () => (
  <span
    className="mono absolute right-2.5 top-2.5 z-20 rounded px-1.5 py-0.5 text-[0.58rem] tracking-widest"
    style={{
      background: "rgba(5, 6, 7, 0.82)",
      border: "1px solid var(--line-strong)",
      color: "var(--text-2)",
    }}
  >
    DEMO
  </span>
);

const Screen = ({ project }) => {
  const [failed, setFailed] = useState(false);
  const hasImage = project.image && !failed;

  return (
    <>
      {hasImage ? (
        <img
          src={project.image}
          alt={`${project.name} screenshot`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top"
        />
      ) : (
        <>
          <DemoUI platform={project.platform} />
          <DemoBadge />
        </>
      )}
    </>
  );
};

/**
 * Browser or phone frame with pointer-reactive tilt.
 * Moving right rotates the device slightly left, as if it were a physical
 * object being looked around. Disabled on touch.
 */
const DeviceMockup = ({ project }) => {
  const isTouch = useIsTouch();
  const ref = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const spring = { stiffness: 140, damping: 18, mass: 0.6 };
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [7, -7]), spring);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [-5, 5]), spring);

  const onMove = (event) => {
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const isMobileDevice = project.platform === "mobile";

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: 1200 }}
      className="w-full"
    >
      <motion.div
        style={{
          rotateX: isTouch ? 0 : rotateX,
          rotateY: isTouch ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {isMobileDevice ? (
          <div
            className="relative mx-auto w-[210px] rounded-[2.1rem] p-[7px] shadow-2xl"
            style={{ background: "var(--bg-3)", border: "1px solid var(--line-strong)" }}
          >
            <div
              className="absolute left-1/2 top-[7px] z-20 h-4 w-20 -translate-x-1/2 rounded-b-xl"
              style={{ background: "var(--bg-3)" }}
            />
            <div className="relative aspect-[9/19] overflow-hidden rounded-[1.7rem]">
              <Screen project={project} />
            </div>
          </div>
        ) : (
          <div
            className="overflow-hidden rounded-xl shadow-2xl"
            style={{ background: "var(--bg-2)", border: "1px solid var(--line-strong)" }}
          >
            {/* browser chrome */}
            <div
              className="flex items-center gap-2 px-3 py-2.5"
              style={{ borderBottom: "1px solid var(--line)" }}
            >
              <div className="flex gap-1.5">
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: "var(--bg-3)" }}
                  />
                ))}
              </div>
              <div
                className="mono mx-2 flex-1 truncate rounded px-2.5 py-1 text-[0.62rem]"
                style={{ background: "var(--bg-1)", color: "var(--text-3)" }}
              >
                {project.live || `${project.id}`}
              </div>
            </div>

            <div className="relative aspect-[16/10]">
              <Screen project={project} />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DeviceMockup;
