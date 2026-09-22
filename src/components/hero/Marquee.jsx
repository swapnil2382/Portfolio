import React from "react";
import { marqueeItems } from "../../data/profile";

/**
 * Infinite technical-identity marquee.
 * The track holds two identical copies and translates -50%, so the loop is
 * seamless without measuring anything in JS.
 */
const Marquee = () => (
  <div
    className="relative w-full overflow-hidden py-4"
    style={{
      borderTop: "1px solid var(--line)",
      borderBottom: "1px solid var(--line)",
    }}
    aria-hidden="true"
  >
    {/* edge fades hide the seam */}
    <div
      className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28"
      style={{
        background: "linear-gradient(to right, var(--bg-0), transparent)",
      }}
    />
    <div
      className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28"
      style={{
        background: "linear-gradient(to left, var(--bg-0), transparent)",
      }}
    />

    <div className="marquee-track">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center">
          {marqueeItems.map((item) => (
            <span key={`${copy}-${item}`} className="flex items-center">
              <span className="mono px-7 text-[0.72rem] tracking-[0.24em] text-[color:var(--text-2)]">
                {item}
              </span>
              <span
                className="h-1 w-1 rounded-full"
                style={{ background: "var(--accent)", opacity: 0.5 }}
              />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default Marquee;
