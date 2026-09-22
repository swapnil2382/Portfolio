import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  FileDown,
  Github,
  Linkedin,
  Hash,
} from "lucide-react";
import { sections, links } from "../../data/profile";
import { scrollToSection } from "../../hooks";
import resumePDF from "../Swapnil resume final2.pdf";

/**
 * Ctrl/Cmd + K command palette.
 *
 * This is the detail that makes the site feel built by someone who uses
 * developer tools, so it behaves like one: type to filter, arrows to move,
 * Enter to run, Escape to dismiss, focus returned on close.
 */
const CommandPalette = ({ open, setOpen }) => {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const restoreFocusRef = useRef(null);

  const commands = useMemo(() => {
    const navigation = sections.map((section) => ({
      id: `go-${section.id}`,
      label: `Go to ${section.label}`,
      hint: section.index,
      group: "Navigation",
      icon: <Hash size={15} />,
      run: () => scrollToSection(section.id),
    }));

    const external = [
      {
        id: "github",
        label: "View GitHub",
        hint: "↗",
        group: "Links",
        icon: <Github size={15} />,
        run: () => window.open(links.github, "_blank", "noopener,noreferrer"),
      },
      {
        id: "linkedin",
        label: "View LinkedIn",
        hint: "↗",
        group: "Links",
        icon: <Linkedin size={15} />,
        run: () => window.open(links.linkedin, "_blank", "noopener,noreferrer"),
      },
      {
        id: "resume",
        label: "Download Resume",
        hint: "PDF",
        group: "Links",
        icon: <FileDown size={15} />,
        run: () => window.open(resumePDF, "_blank", "noopener,noreferrer"),
      },
    ];

    return [...navigation, ...external];
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return commands;
    return commands.filter((command) =>
      command.label.toLowerCase().includes(term)
    );
  }, [commands, query]);

  // Global shortcut to open. Registered once, independent of palette state.
  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((previous) => !previous);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setOpen]);

  // Reset and trap focus while open.
  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = document.activeElement;
    setQuery("");
    setCursor(0);

    const timer = setTimeout(() => inputRef.current?.focus(), 40);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      if (restoreFocusRef.current instanceof HTMLElement) {
        restoreFocusRef.current.focus();
      }
    };
  }, [open]);

  useEffect(() => {
    setCursor(0);
  }, [query]);

  // Keep the highlighted row scrolled into view.
  useEffect(() => {
    const active = listRef.current?.querySelector('[data-active="true"]');
    active?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  const execute = (command) => {
    setOpen(false);
    // Let the overlay unmount before scrolling, or the scroll lock fights it.
    setTimeout(() => command.run(), 60);
  };

  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setCursor((index) => (index + 1) % Math.max(filtered.length, 1));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setCursor(
        (index) =>
          (index - 1 + Math.max(filtered.length, 1)) %
          Math.max(filtered.length, 1)
      );
      return;
    }

    if (event.key === "Enter" && filtered[cursor]) {
      event.preventDefault();
      execute(filtered[cursor]);
    }
  };

  let lastGroup = null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="glass relative w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            {/* input */}
            <div
              className="flex items-center gap-3 px-4 py-3.5"
              style={{ borderBottom: "1px solid var(--line-strong)" }}
            >
              <Search size={16} className="text-[color:var(--text-2)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Type a command or search…"
                aria-label="Search commands"
                className="flex-1 bg-transparent text-sm text-[color:var(--text-0)] outline-none placeholder:text-[color:var(--text-3)]"
              />
              <kbd className="mono rounded border border-[color:var(--line-strong)] px-1.5 py-0.5 text-[0.65rem] text-[color:var(--text-2)]">
                ESC
              </kbd>
            </div>

            {/* results */}
            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-[color:var(--text-2)]">
                  No matching commands.
                </p>
              )}

              {filtered.map((command, index) => {
                const showGroup = command.group !== lastGroup;
                lastGroup = command.group;
                const isActive = index === cursor;

                return (
                  <div key={command.id}>
                    {showGroup && (
                      <p className="label px-3 pb-1.5 pt-3">{command.group}</p>
                    )}

                    <button
                      type="button"
                      data-active={isActive}
                      onMouseEnter={() => setCursor(index)}
                      onClick={() => execute(command)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors"
                      style={{
                        background: isActive ? "var(--bg-3)" : "transparent",
                        color: isActive
                          ? "var(--text-0)"
                          : "var(--text-1)",
                      }}
                    >
                      <span
                        style={{
                          color: isActive ? "var(--accent)" : "var(--text-3)",
                        }}
                      >
                        {command.icon}
                      </span>
                      <span className="flex-1 text-sm">{command.label}</span>
                      <span className="mono text-[0.65rem] text-[color:var(--text-3)]">
                        {command.hint}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* footer legend */}
            <div
              className="flex items-center gap-4 px-4 py-2.5"
              style={{ borderTop: "1px solid var(--line-strong)" }}
            >
              <span className="mono flex items-center gap-1 text-[0.65rem] text-[color:var(--text-3)]">
                <ArrowUp size={11} />
                <ArrowDown size={11} /> navigate
              </span>
              <span className="mono flex items-center gap-1 text-[0.65rem] text-[color:var(--text-3)]">
                <CornerDownLeft size={11} /> select
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
