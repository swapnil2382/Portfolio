import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { skillNetwork } from "../../data/skills";
import { useReducedMotion } from "../../hooks";

const GROUP_COLOR = {
  frontend: "#60a5fa",
  backend: "#4ade80",
  database: "#fbbf24",
};

const VIEW = 520;
const RADIUS = 190;
const toX = (x) => VIEW / 2 + x * RADIUS;
const toY = (y) => VIEW / 2 + y * RADIUS;

/**
 * Node graph with the developer at the centre.
 *
 * At rest it walks itself: a spotlight steps through the nodes on a timer and
 * dashes drift along the spokes, so the graph looks like a running system
 * rather than an inert diagram. The moment a pointer arrives, the spotlight
 * yields and hover takes over completely.
 */
const SkillNetwork = () => {
  const [hovered, setHovered] = useState(null);
  const [spotlight, setSpotlight] = useState(skillNetwork.nodes[0].id);
  const reduceMotion = useReducedMotion();
  const timer = useRef(null);

  // Idle auto-tour. Paused while hovering, and skipped entirely when the user
  // has asked for reduced motion.
  useEffect(() => {
    if (hovered || reduceMotion) {
      clearInterval(timer.current);
      return undefined;
    }

    timer.current = setInterval(() => {
      setSpotlight((current) => {
        const index = skillNetwork.nodes.findIndex((n) => n.id === current);
        const next = (index + 1) % skillNetwork.nodes.length;
        return skillNetwork.nodes[next].id;
      });
    }, 2200);

    return () => clearInterval(timer.current);
  }, [hovered, reduceMotion]);

  // Hover wins; otherwise the spotlight drives the highlight.
  const active = hovered || spotlight;
  const isUserDriven = Boolean(hovered);

  const related = active ? skillNetwork.related[active] || [] : [];
  const isLit = (id) => !active || active === id || related.includes(id);

  const activeNode = skillNetwork.nodes.find((node) => node.id === active);
  const activeColor = activeNode
    ? GROUP_COLOR[activeNode.group] || "var(--accent)"
    : "var(--accent)";

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        className="w-full"
        role="img"
        aria-label="Interactive diagram of connected technologies"
      >
        {/* spokes */}
        {skillNetwork.nodes.map((node) => (
          <motion.line
            key={`spoke-${node.id}`}
            className={reduceMotion ? "" : "edge-flow"}
            x1={VIEW / 2}
            y1={VIEW / 2}
            x2={toX(node.x)}
            y2={toY(node.y)}
            stroke={isLit(node.id) ? "var(--line-strong)" : "var(--line)"}
            strokeWidth={1}
            animate={{ opacity: isLit(node.id) ? 1 : 0.2 }}
            transition={{ duration: 0.35 }}
          />
        ))}

        {/* edges between the active node and its relations */}
        {active &&
          related.map((otherId) => {
            const a = skillNetwork.nodes.find((n) => n.id === active);
            const b = skillNetwork.nodes.find((n) => n.id === otherId);
            if (!a || !b) return null;

            return (
              <motion.line
                key={`edge-${active}-${otherId}`}
                x1={toX(a.x)}
                y1={toY(a.y)}
                x2={toX(b.x)}
                y2={toY(b.y)}
                stroke={activeColor}
                strokeWidth={1}
                strokeDasharray="3 3"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 0.6, pathLength: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            );
          })}

        {/* centre */}
        <g>
          {!reduceMotion && (
            <circle
              className="core-ring"
              cx={VIEW / 2}
              cy={VIEW / 2}
              r={64}
              fill="none"
              stroke="var(--accent-line)"
              strokeWidth={1}
              strokeDasharray="2 10"
            />
          )}

          <circle
            cx={VIEW / 2}
            cy={VIEW / 2}
            r={52}
            fill="var(--bg-2)"
            stroke="var(--accent-line)"
            strokeWidth={1}
          />
          <text
            x={VIEW / 2}
            y={VIEW / 2 - 5}
            textAnchor="middle"
            className="mono"
            fontSize="11"
            fill="var(--accent)"
          >
            FULL-STACK
          </text>
          <text
            x={VIEW / 2}
            y={VIEW / 2 + 11}
            textAnchor="middle"
            className="mono"
            fontSize="11"
            fill="var(--text-2)"
          >
            DEVELOPER
          </text>
        </g>

        {/* nodes */}
        {skillNetwork.nodes.map((node) => {
          const lit = isLit(node.id);
          const isActive = active === node.id;
          const color = GROUP_COLOR[node.group] || "var(--accent)";

          return (
            <g
              key={node.id}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={toX(node.x)}
                cy={toY(node.y)}
                r={34}
                fill="transparent"
              />

              {/* halo only on the active node */}
              {isActive && !reduceMotion && (
                <circle
                  className="node-halo"
                  cx={toX(node.x)}
                  cy={toY(node.y)}
                  r={26}
                  fill="none"
                  stroke={color}
                  strokeWidth={1}
                />
              )}

              <motion.circle
                cx={toX(node.x)}
                cy={toY(node.y)}
                fill="var(--bg-2)"
                stroke={isActive ? color : "var(--line-strong)"}
                animate={{
                  r: isActive ? 27 : 21,
                  opacity: lit ? 1 : 0.28,
                  strokeWidth: isActive ? 1.6 : 1,
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />

              <motion.text
                x={toX(node.x)}
                y={toY(node.y) + 3.5}
                textAnchor="middle"
                className="mono"
                fontSize="9"
                fill={isActive ? color : "var(--text-1)"}
                animate={{ opacity: lit ? 1 : 0.35 }}
                style={{ pointerEvents: "none" }}
              >
                {node.label.length > 11
                  ? node.label.slice(0, 9) + "…"
                  : node.label}
              </motion.text>
            </g>
          );
        })}
      </svg>

      {/* readout */}
      <div className="mt-1 flex min-h-[54px] items-start justify-center px-4 text-center">
        <motion.p
          key={active}
          className="text-sm"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <span className="mono" style={{ color: activeColor }}>
            {activeNode?.label}
          </span>
          <span className="text-[color:var(--text-3)]">
            {" → "}
            {related.length} connection{related.length === 1 ? "" : "s"}
          </span>
          {!isUserDriven && (
            <span className="mono ml-2 text-[0.62rem] text-[color:var(--text-3)]">
              · hover to explore
            </span>
          )}
        </motion.p>
      </div>
    </div>
  );
};

export default SkillNetwork;
