import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Smartphone, Globe } from "lucide-react";
import DeviceMockup from "./DeviceMockup";

/** One labelled block in the case study body — skipped when data is absent. */
const Block = ({ label, children }) => {
  if (!children) return null;
  return (
    <section className="mb-7">
      <p className="label mb-2.5">{label}</p>
      <div className="text-[0.88rem] leading-relaxed text-[color:var(--text-1)]">
        {children}
      </div>
    </section>
  );
};

/**
 * Expanded project case study. Only renders the blocks a project actually has
 * data for, so nothing is padded out with invented detail.
 */
const CaseStudyModal = ({ project, onClose }) => {
  const panelRef = useRef(null);
  const restoreRef = useRef(null);

  useEffect(() => {
    if (!project) return;

    restoreRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    const timer = setTimeout(() => panelRef.current?.focus(), 50);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      if (restoreRef.current instanceof HTMLElement) restoreRef.current.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-start justify-center overflow-y-auto p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={onClose}
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />

          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} case study`}
            className="panel-raised relative my-auto w-full max-w-4xl overflow-hidden outline-none"
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            {/* header */}
            <div
              className="sticky top-0 z-10 flex items-start justify-between gap-4 p-5 sm:p-6"
              style={{
                borderBottom: "1px solid var(--line)",
                background: "var(--bg-2)",
              }}
            >
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span
                    className="mono inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-[0.62rem]"
                    style={{
                      background: "var(--accent-soft)",
                      color: "var(--accent)",
                    }}
                  >
                    {project.platform === "mobile" ? (
                      <Smartphone size={10} />
                    ) : (
                      <Globe size={10} />
                    )}
                    {project.platform === "mobile" ? "MOBILE" : "WEB"}
                  </span>
                  {project.org && (
                    <span className="mono text-[0.62rem] text-[color:var(--text-3)]">
                      {project.org}
                    </span>
                  )}
                  <span className="mono text-[0.62rem] text-[color:var(--text-3)]">
                    {project.status}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-[color:var(--text-0)] sm:text-2xl">
                  {project.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="shrink-0 rounded-md p-2 transition-colors"
                style={{ color: "var(--text-2)", background: "var(--bg-3)" }}
              >
                <X size={16} />
              </button>
            </div>

            {/* body */}
            <div className="max-h-[70vh] overflow-y-auto p-5 sm:p-6">
              <div className="mb-8">
                <DeviceMockup project={project} />
              </div>

              <div className="grid gap-x-10 md:grid-cols-2">
                <div>
                  <Block label="Overview">{project.description}</Block>
                  <Block label="Problem">{project.problem}</Block>
                  <Block label="Approach">{project.approach}</Block>
                </div>

                <div>
                  <Block label="My Contribution">
                    {project.contribution && (
                      <ul className="space-y-2">
                        {project.contribution.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <span
                              className="mono mr-3 mt-0.5 shrink-0 text-[0.62rem]"
                              style={{ color: "var(--text-3)" }}
                            >
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Block>

                  <Block label="Tech Stack">
                    <dl className="space-y-2">
                      {Object.entries(project.stackDetail || {}).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex items-baseline justify-between gap-4 py-1"
                            style={{ borderBottom: "1px solid var(--line)" }}
                          >
                            <dt className="mono text-[0.68rem] text-[color:var(--text-3)]">
                              {key}
                            </dt>
                            <dd className="text-[0.82rem] text-[color:var(--text-1)]">
                              {value}
                            </dd>
                          </div>
                        )
                      )}
                    </dl>
                  </Block>

                  <Block label="Role">{project.role}</Block>
                </div>
              </div>

              {/* links */}
              <div
                className="mt-4 flex flex-wrap items-center gap-3 pt-5"
                style={{ borderTop: "1px solid var(--line)" }}
              >
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="OPEN"
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold"
                    style={{ background: "var(--accent)", color: "#0a0c10" }}
                  >
                    Live Demo <ExternalLink size={14} />
                  </a>
                ) : null}

                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="OPEN"
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium"
                    style={{
                      border: "1px solid var(--line-strong)",
                      color: "var(--text-0)",
                    }}
                  >
                    <Github size={14} /> Source
                  </a>
                ) : (
                  <span
                    className="mono rounded-lg px-3 py-2 text-[0.7rem]"
                    style={{
                      border: "1px solid var(--line)",
                      color: "var(--text-3)",
                    }}
                  >
                    {project.confidential
                      ? "Client work — source not public"
                      : "Source link coming soon"}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CaseStudyModal;
