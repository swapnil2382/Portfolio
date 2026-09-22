import React from "react";
import { motion } from "framer-motion";

/**
 * Numbered section shell — "01 / ABOUT" in monospace, a hairline rule, then
 * the heading. Used by every section so the page has one rhythm.
 */
export const SectionHeader = ({ index, label, title, lead, align = "left" }) => (
  <motion.header
    className={`mb-14 md:mb-20 ${align === "center" ? "text-center" : ""}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    <div
      className={`flex items-center gap-4 mb-7 ${align === "center" ? "justify-center" : ""
        }`}
    >
      <span className="mono text-xs tracking-[0.2em]" style={{ color: "var(--accent)" }}>
        {index}
      </span>
      <span className="label">/ {label}</span>
      <span
        className={`h-px ${align === "center" ? "w-16" : "flex-1 max-w-[220px]"}`}
        style={{ background: "var(--line-strong)" }}
      />
    </div>

    <h2 className="display text-3xl sm:text-4xl md:text-5xl font-bold text-[color:var(--text-0)] max-w-3xl">
      {title}
    </h2>

    {lead && (
      <p
        className={`mt-6 text-base md:text-lg leading-relaxed text-[color:var(--text-1)] max-w-2xl ${align === "center" ? "mx-auto" : ""
          }`}
      >
        {lead}
      </p>
    )}
  </motion.header>
);

/** Standard section wrapper: id anchor, vertical rhythm, max width. */
const Section = ({ id, children, className = "", wide = false }) => (
  <section
    id={id}
    className={`relative px-5 sm:px-8 py-24 md:py-32 ${className}`}
  >
    <div className={`mx-auto w-full ${wide ? "max-w-7xl" : "max-w-6xl"}`}>
      {children}
    </div>
  </section>
);

export default Section;
