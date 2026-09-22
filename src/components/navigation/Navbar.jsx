import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command } from "lucide-react";
import { sections, links } from "../../data/profile";
import { useActiveSection, scrollToSection } from "../../hooks";
import resumePDF from "../Swapnil resume final2.pdf";

const sectionIds = sections.map((section) => section.id);

const ease = [0.22, 1, 0.36, 1];

/**
 * Two distinct treatments rather than one responsive bar:
 *  - desktop gets the centred glass pill with an animated active indicator
 *  - mobile gets a single circular trigger tucked into the top-right corner,
 *    since a monogram plus a hamburger in a centred pill wastes the space and
 *    reads as a cramped desktop nav that has been squeezed.
 */
const Navbar = ({ onOpenPalette }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Escape closes the sheet, matching the palette and the case-study modal.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const go = (id) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      {/* ---------- desktop ---------- */}
      <motion.nav
        className="fixed left-1/2 z-[90] hidden -translate-x-1/2 md:block"
        initial={false}
        animate={{ top: scrolled ? 12 : 22 }}
        transition={{ duration: 0.4, ease }}
        aria-label="Primary"
      >
        <div
          className="glass flex items-center gap-1 rounded-full transition-all duration-300"
          style={{ padding: scrolled ? "6px 8px" : "9px 12px" }}
        >
          <button
            type="button"
            onClick={() => go("home")}
            aria-label="Back to top"
            className="mono flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
            style={{ background: "var(--bg-3)", color: "var(--accent)" }}
          >
            S
          </button>

          <ul className="mx-1 flex items-center">
            {sections.slice(1).map((section) => {
              const isActive = active === section.id;

              return (
                <li key={section.id} className="relative">
                  <button
                    type="button"
                    onClick={() => go(section.id)}
                    aria-current={isActive ? "true" : undefined}
                    className="relative z-10 rounded-full px-3.5 py-1.5 text-[0.82rem] font-medium transition-colors duration-200"
                    style={{ color: isActive ? "var(--text-0)" : "var(--text-2)" }}
                  >
                    {section.label}
                  </button>

                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "var(--bg-3)" }}
                      transition={{ duration: 0.35, ease }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open command palette"
            className="mono flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.7rem] transition-colors"
            style={{
              background: "var(--bg-2)",
              border: "1px solid var(--line-strong)",
              color: "var(--text-2)",
            }}
          >
            <Command size={11} />K
          </button>
        </div>
      </motion.nav>

      {/* ---------- mobile trigger ---------- */}
      <motion.button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        className="glass fixed z-[95] flex h-12 w-12 items-center justify-center rounded-full md:hidden"
        initial={false}
        animate={{ top: scrolled ? 14 : 20, right: scrolled ? 14 : 20 }}
        transition={{ duration: 0.4, ease }}
        style={{ color: menuOpen ? "var(--accent)" : "var(--text-0)" }}
        whileTap={{ scale: 0.92 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={menuOpen ? "close" : "open"}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.18 }}
            className="flex"
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* ---------- mobile sheet ---------- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col justify-center px-8 md:hidden"
            style={{ background: "rgba(5, 6, 7, 0.97)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <nav aria-label="Mobile">
              <ul>
                {sections.map((section, index) => (
                  <motion.li
                    key={section.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.04, duration: 0.3, ease }}
                  >
                    <button
                      type="button"
                      onClick={() => go(section.id)}
                      className="flex w-full items-baseline gap-4 py-3 text-left"
                    >
                      <span
                        className="mono text-xs"
                        style={{
                          color:
                            active === section.id
                              ? "var(--accent)"
                              : "var(--text-3)",
                        }}
                      >
                        {section.index}
                      </span>
                      <span
                        className="text-2xl font-semibold"
                        style={{
                          color:
                            active === section.id
                              ? "var(--text-0)"
                              : "var(--text-2)",
                        }}
                      >
                        {section.label}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Mobile has no Cmd+K, so the palette's external actions live here */}
            <motion.div
              className="mt-10 flex flex-wrap gap-5 pt-6"
              style={{ borderTop: "1px solid var(--line)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              {[
                { label: "GitHub", href: links.github },
                { label: "LinkedIn", href: links.linkedin },
                { label: "Resume", href: resumePDF },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono text-[0.78rem]"
                  style={{ color: "var(--text-2)" }}
                >
                  {link.label} ↗
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
