import React from "react";
import { motion } from "framer-motion";
import { profile } from "../../data/profile";

/**
 * Small dashboard panel near the hero. Reads as a system-status widget from
 * a developer tool rather than a decorative card.
 */
const StatusPanel = () => (
  <motion.aside
    className="glass w-full max-w-[260px] rounded-xl p-4"
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
    aria-label="Developer status"
  >
    <div
      className="mb-3 flex items-center justify-between pb-2.5"
      style={{ borderBottom: "1px solid var(--line)" }}
    >
      <span className="label">Developer Status</span>
      <span className="status-dot" />
    </div>

    <div className="space-y-3.5">
      <div>
        <p className="mono mb-1 text-[0.62rem] text-[color:var(--text-3)]">
          CURRENTLY BUILDING
        </p>
        <p className="text-[0.82rem] font-medium text-[color:var(--text-0)]">
          {profile.currentlyBuilding}
        </p>
      </div>

      <div>
        <p className="mono mb-1.5 text-[0.62rem] text-[color:var(--text-3)]">
          STACK
        </p>
        <div className="flex flex-wrap gap-1.5">
          {profile.activeStack.map((tech) => (
            <span
              key={tech}
              className="mono rounded px-1.5 py-0.5 text-[0.62rem]"
              style={{
                background: "var(--bg-3)",
                color: "var(--text-1)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="mono mb-1 text-[0.62rem] text-[color:var(--text-3)]">
          LOCATION
        </p>
        <p className="text-[0.82rem] text-[color:var(--text-1)]">
          {profile.locationShort}
        </p>
      </div>
    </div>
  </motion.aside>
);

export default StatusPanel;
