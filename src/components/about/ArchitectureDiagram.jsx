import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks";

/**
 * System architecture as a flat SVG diagram.
 *
 * Deliberately drawn rather than modelled: the technology graph and the
 * laptop screen both read as crisp UI, and a dark 3D stack sat awkwardly
 * between them. Flat vector also means the labels are legible, which they
 * never were in 3D without pulling in a font atlas.
 *
 * Indices map 1:1 with the `architecture` array in data/skills.js.
 */

const W = 340;
const H = 404;
const CX = 140;

const LAYERS = {
  user: { y: 30 },
  client: { x: 58, y: 58, w: 164, h: 44 },
  api: { x: 74, y: 120, w: 132, h: 40 },
  server: { x: 58, y: 178, w: 164, h: 44 },
  db: { top: 250, bodyH: 58, rx: 56, ry: 13 },
  services: { x: 272, y: 200, r: 23 },
};

const Box = ({ layer, label, sub, index, activeIndex, onHover, accent }) => {
  const isActive = activeIndex === index;
  const lit = isActive || accent;

  return (
    <g
      onMouseEnter={() => onHover(index)}
      style={{ cursor: "default" }}
    >
      <motion.rect
        x={layer.x}
        y={layer.y}
        width={layer.w}
        height={layer.h}
        rx={9}
        fill={isActive ? "var(--bg-3)" : "var(--bg-2)"}
        stroke={lit ? "var(--accent)" : "var(--line-strong)"}
        animate={{ strokeWidth: isActive ? 1.6 : 1 }}
        transition={{ duration: 0.25 }}
      />

      {/* accent spine on the left edge */}
      {lit && (
        <rect
          x={layer.x}
          y={layer.y + 9}
          width={2.5}
          height={layer.h - 18}
          rx={1.5}
          fill="var(--accent)"
        />
      )}

      <text
        x={layer.x + layer.w / 2}
        y={layer.y + (sub ? 19 : layer.h / 2 + 3)}
        textAnchor="middle"
        className="mono"
        fontSize="9.5"
        fill={lit ? "var(--accent)" : "var(--text-0)"}
      >
        {label}
      </text>

      {sub && (
        <text
          x={layer.x + layer.w / 2}
          y={layer.y + 32}
          textAnchor="middle"
          className="mono"
          fontSize="8"
          fill="var(--text-3)"
        >
          {sub}
        </text>
      )}
    </g>
  );
};

const Connector = ({ y1, y2, animate }) => (
  <line
    className={animate ? "edge-flow" : ""}
    x1={CX}
    y1={y1}
    x2={CX}
    y2={y2}
    stroke="var(--line-strong)"
    strokeWidth={1}
  />
);

const ArchitectureDiagram = ({ activeIndex, onHover }) => {
  const reduceMotion = useReducedMotion();
  const db = LAYERS.db;
  const dbActive = activeIndex === 4;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-label="System architecture: user, client, API, server, database, and Python services"
      onMouseLeave={() => onHover(-1)}
    >
      {/* ---- connectors ---- */}
      <Connector y1={44} y2={58} animate={!reduceMotion} />
      <Connector y1={102} y2={120} animate={!reduceMotion} />
      <Connector y1={160} y2={178} animate={!reduceMotion} />
      <Connector y1={222} y2={db.top - db.ry} animate={!reduceMotion} />

      {/* branch out to services */}
      <line
        className={reduceMotion ? "" : "edge-flow"}
        x1={222}
        y1={200}
        x2={LAYERS.services.x - LAYERS.services.r}
        y2={200}
        stroke="var(--line-strong)"
        strokeWidth={1}
      />

      {/* ---- user ---- */}
      <g onMouseEnter={() => onHover(0)} style={{ cursor: "default" }}>
        <circle
          cx={CX}
          cy={LAYERS.user.y}
          r={14}
          fill={activeIndex === 0 ? "var(--bg-3)" : "var(--bg-2)"}
          stroke={activeIndex === 0 ? "var(--accent)" : "var(--line-strong)"}
          strokeWidth={activeIndex === 0 ? 1.6 : 1}
        />
        {/* simple person glyph */}
        <circle
          cx={CX}
          cy={LAYERS.user.y - 3.5}
          r={3.6}
          fill={activeIndex === 0 ? "var(--accent)" : "var(--text-2)"}
        />
        <path
          d={`M ${CX - 6} ${LAYERS.user.y + 7} a 6 6 0 0 1 12 0`}
          fill={activeIndex === 0 ? "var(--accent)" : "var(--text-2)"}
        />
        <text
          x={CX + 26}
          y={LAYERS.user.y + 3}
          className="mono"
          fontSize="9"
          fill="var(--text-3)"
        >
          User
        </text>
      </g>

      {/* ---- stack ---- */}
      <Box
        layer={LAYERS.client}
        label="React · React Native"
        sub="interface layer"
        index={1}
        activeIndex={activeIndex}
        onHover={onHover}
      />
      <Box
        layer={LAYERS.api}
        label="REST API"
        index={2}
        activeIndex={activeIndex}
        onHover={onHover}
        accent
      />
      <Box
        layer={LAYERS.server}
        label="Node.js · Express"
        sub="application logic"
        index={3}
        activeIndex={activeIndex}
        onHover={onHover}
      />

      {/* ---- database cylinder ---- */}
      <g onMouseEnter={() => onHover(4)} style={{ cursor: "default" }}>
        <rect
          x={CX - db.rx}
          y={db.top}
          width={db.rx * 2}
          height={db.bodyH}
          fill={dbActive ? "var(--bg-3)" : "var(--bg-2)"}
        />
        <line
          x1={CX - db.rx}
          y1={db.top}
          x2={CX - db.rx}
          y2={db.top + db.bodyH}
          stroke={dbActive ? "var(--accent)" : "var(--line-strong)"}
          strokeWidth={dbActive ? 1.6 : 1}
        />
        <line
          x1={CX + db.rx}
          y1={db.top}
          x2={CX + db.rx}
          y2={db.top + db.bodyH}
          stroke={dbActive ? "var(--accent)" : "var(--line-strong)"}
          strokeWidth={dbActive ? 1.6 : 1}
        />

        {/* bottom cap */}
        <ellipse
          cx={CX}
          cy={db.top + db.bodyH}
          rx={db.rx}
          ry={db.ry}
          fill={dbActive ? "var(--bg-3)" : "var(--bg-2)"}
          stroke={dbActive ? "var(--accent)" : "var(--line-strong)"}
          strokeWidth={dbActive ? 1.6 : 1}
        />

        {/* inner rings give it the stacked-platter look */}
        {[19, 38].map((offset) => (
          <ellipse
            key={offset}
            cx={CX}
            cy={db.top + offset}
            rx={db.rx}
            ry={db.ry}
            fill="none"
            stroke="var(--line)"
            strokeWidth={1}
          />
        ))}

        {/* top cap */}
        <ellipse
          cx={CX}
          cy={db.top}
          rx={db.rx}
          ry={db.ry}
          fill={dbActive ? "var(--bg-3)" : "var(--bg-1)"}
          stroke={dbActive ? "var(--accent)" : "var(--line-strong)"}
          strokeWidth={dbActive ? 1.6 : 1}
        />

        <text
          x={CX}
          y={db.top + 34}
          textAnchor="middle"
          className="mono"
          fontSize="9"
          fill={dbActive ? "var(--accent)" : "var(--text-1)"}
        >
          MongoDB · MySQL
        </text>
      </g>

      {/* ---- services branch ---- */}
      <g onMouseEnter={() => onHover(5)} style={{ cursor: "default" }}>
        <motion.rect
          x={LAYERS.services.x - 20}
          y={LAYERS.services.y - 20}
          width={40}
          height={40}
          rx={8}
          fill={activeIndex === 5 ? "var(--bg-3)" : "var(--bg-2)"}
          stroke={activeIndex === 5 ? "var(--accent)" : "var(--line-strong)"}
          animate={{
            strokeWidth: activeIndex === 5 ? 1.6 : 1,
            rotate: activeIndex === 5 ? 45 : 0,
          }}
          style={{ originX: "50%", originY: "50%", transformBox: "fill-box" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <text
          x={LAYERS.services.x}
          y={LAYERS.services.y + 3}
          textAnchor="middle"
          className="mono"
          fontSize="8"
          fill={activeIndex === 5 ? "var(--accent)" : "var(--text-1)"}
        >
          PY
        </text>
        <text
          x={LAYERS.services.x}
          y={LAYERS.services.y + 38}
          textAnchor="middle"
          className="mono"
          fontSize="7.5"
          fill="var(--text-3)"
        >
          AI services
        </text>
      </g>

      {/* ---- request packet ----
          A request descending the stack and returning, so the diagram has a
          pulse even when nothing is hovered. */}
      {!reduceMotion && (
        <motion.circle
          cx={CX}
          r={3.5}
          fill="var(--accent)"
          initial={{ cy: 46 }}
          animate={{
            cy: [46, 250, 46],
            opacity: [0.25, 1, 0.25],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </svg>
  );
};

export default ArchitectureDiagram;
