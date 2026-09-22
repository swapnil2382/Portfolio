import React, { useState, useEffect, useRef } from "react";
import { useIsTouch, useReducedMotion } from "../../hooks";

/**
 * Minimal cursor: a small dot that becomes a labelled ring over interactive
 * elements. Reads intent from `data-cursor` on the hovered element, so any
 * component can opt into a label without this file knowing about it.
 *
 * Disabled entirely on touch devices and when reduced motion is requested.
 */
const Cursor = () => {
  const isTouch = useIsTouch();
  const reduceMotion = useReducedMotion();
  const enabled = !isTouch && !reduceMotion;

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [label, setLabel] = useState(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("custom-cursor-active");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { ...target };
    let frame;

    const onMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!visible) setVisible(true);

      const interactive = event.target.closest(
        "a, button, [data-cursor], input, textarea, select"
      );

      if (interactive) {
        setActive(true);
        setLabel(interactive.getAttribute("data-cursor"));
      } else {
        setActive(false);
        setLabel(null);
      }
    };

    const onLeave = () => setVisible(false);

    // The dot tracks exactly; the ring lags slightly for weight.
    const render = () => {
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }

      frame = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [enabled, visible]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[200]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.25s" }}
    >
      <div
        ref={dotRef}
        className="absolute left-0 top-0 rounded-full"
        style={{
          width: 5,
          height: 5,
          marginLeft: -2.5,
          marginTop: -2.5,
          background: "var(--accent)",
          opacity: active ? 0 : 1,
          transition: "opacity 0.2s",
        }}
      />

      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full"
        style={{
          width: label ? 58 : 30,
          height: label ? 58 : 30,
          marginLeft: label ? -29 : -15,
          marginTop: label ? -29 : -15,
          border: `1px solid ${active ? "var(--accent)" : "var(--line-strong)"}`,
          background: label ? "var(--accent-soft)" : "transparent",
          transition:
            "width 0.25s var(--ease), height 0.25s var(--ease), margin 0.25s var(--ease), border-color 0.2s, background 0.2s",
        }}
      >
        {label && (
          <span
            className="mono text-[0.55rem] tracking-widest"
            style={{ color: "var(--accent)" }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
};

export default Cursor;
