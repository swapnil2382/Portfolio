import React, { useState, useRef, useEffect } from "react";
import { FileDown, Check, Loader2 } from "lucide-react";
import resumePDF from "../Swapnil resume final2.pdf";

/**
 * Resume action with real UI state rather than a bare link:
 *   idle -> hover "Preparing resume…" -> click "Downloading…" -> "Downloaded"
 *
 * The download itself is immediate; the states are brief and only report what
 * actually happened.
 */
const ResumeButton = () => {
  const [state, setState] = useState("idle");
  const timers = useRef([]);

  useEffect(
    () => () => timers.current.forEach(clearTimeout),
    []
  );

  const handleClick = () => {
    if (state === "downloading") return;

    setState("downloading");
    timers.current.push(
      setTimeout(() => setState("done"), 900),
      setTimeout(() => setState("idle"), 2600)
    );
  };

  const content = {
    idle: { text: "Download Resume", icon: <FileDown size={15} /> },
    hover: { text: "Preparing resume…", icon: <FileDown size={15} /> },
    downloading: {
      text: "Downloading…",
      icon: <Loader2 size={15} className="animate-spin" />,
    },
    done: { text: "Downloaded", icon: <Check size={15} /> },
  }[state];

  return (
    <a
      href={resumePDF}
      download
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="GET"
      onClick={handleClick}
      onMouseEnter={() => setState((s) => (s === "idle" ? "hover" : s))}
      onMouseLeave={() => setState((s) => (s === "hover" ? "idle" : s))}
      className="group inline-flex items-center gap-2.5 rounded-lg px-5 py-3 text-sm font-medium transition-all duration-300"
      style={{
        background: "var(--bg-2)",
        border: "1px solid var(--line-strong)",
        color: "var(--text-0)",
        minWidth: 200,
      }}
    >
      <span
        className="transition-colors"
        style={{
          color: state === "done" ? "#4ade80" : "var(--accent)",
        }}
      >
        {content.icon}
      </span>
      <span className="mono text-[0.78rem]">{content.text}</span>
    </a>
  );
};

export default ResumeButton;
