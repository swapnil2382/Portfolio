import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { journey } from "../../data/about";

/**
 * Interactive career timeline. Selecting a stage swaps the detail panel and
 * moves the rail indicator — one animation carrying the state change, rather
 * than four cards each animating independently.
 */
const JourneyTimeline = ({ activeIndex, setActiveIndex }) => {
  const [hovered, setHovered] = useState(null);
  const shown = hovered ?? activeIndex;
  const stage = journey[shown];

  return (
    <div>
      {/* rail */}
      <div
        className="relative flex gap-1 pb-6"
        style={{ borderBottom: "1px solid var(--line)" }}
        role="tablist"
        aria-label="Developer journey"
      >
        {journey.map((item, index) => {
          const isActive = shown === index;

          return (
            <button
              key={item.index}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered(null)}
              className="group relative flex-1 pb-5 pt-1 text-left transition-colors"
            >
              <span
                className="mono block text-[0.68rem] transition-colors"
                style={{ color: isActive ? "var(--accent)" : "var(--text-3)" }}
              >
                {item.index}
              </span>

              <span
                className="mt-1.5 block text-[0.8rem] font-medium leading-tight transition-colors sm:text-sm"
                style={{
                  color: isActive ? "var(--text-0)" : "var(--text-2)",
                }}
              >
                {item.title}
              </span>

              {/* node */}
              <span
                className="absolute -bottom-[5px] left-0 block h-[9px] w-[9px] rounded-full transition-all duration-300"
                style={{
                  background: isActive ? "var(--accent)" : "var(--bg-3)",
                  border: `1px solid ${isActive ? "var(--accent)" : "var(--line-strong)"}`,
                  transform: isActive ? "scale(1.15)" : "scale(1)",
                }}
              />
            </button>
          );
        })}

        {/* moving underline */}
        <motion.span
          className="absolute bottom-0 h-px"
          style={{ background: "var(--accent)" }}
          animate={{
            left: `${(shown / journey.length) * 100}%`,
            width: `${100 / journey.length}%`,
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* detail */}
      <div className="relative mt-8 min-h-[190px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.index}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="label mb-3">{stage.period}</p>

            <h3 className="mb-4 text-xl font-semibold text-[color:var(--text-0)]">
              {stage.title}
            </h3>

            <p className="max-w-xl leading-relaxed text-[color:var(--text-1)]">
              {stage.text}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {stage.tags.map((tag) => (
                <span
                  key={tag}
                  className="mono rounded px-2 py-1 text-[0.66rem]"
                  style={{
                    background: "var(--bg-2)",
                    border: "1px solid var(--line)",
                    color: "var(--text-2)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JourneyTimeline;
