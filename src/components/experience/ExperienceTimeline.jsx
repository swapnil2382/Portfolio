import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { experience } from "../../data/experience";

/**
 * Vertical career timeline. One entry is expanded at a time; expanding reveals
 * responsibilities and the stack used at that company.
 */
const ExperienceTimeline = () => {
  const [openId, setOpenId] = useState(experience[0].id);

  return (
    <div className="relative">
      {/* rail */}
      <span
        className="absolute bottom-4 top-4 w-px"
        style={{ left: 11, background: "var(--line-strong)" }}
        aria-hidden="true"
      />

      <ul className="space-y-3">
        {experience.map((job, index) => {
          const isOpen = openId === job.id;

          return (
            <motion.li
              key={job.id}
              className="relative pl-10"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* node */}
              <span
                className="absolute top-5 flex h-[23px] w-[23px] items-center justify-center rounded-full"
                style={{
                  left: 0,
                  background: "var(--bg-1)",
                  border: `1px solid ${job.current ? "var(--accent-line)" : "var(--line-strong)"
                    }`,
                }}
              >
                {job.current ? (
                  <span className="status-dot" />
                ) : (
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--text-3)" }}
                  />
                )}
              </span>

              <div
                className="panel overflow-hidden transition-colors"
                style={{
                  borderColor: isOpen ? "var(--line-strong)" : "var(--line)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : job.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start gap-4 p-5 text-left"
                >
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      {job.current ? (
                        <span
                          className="mono rounded px-1.5 py-0.5 text-[0.6rem] tracking-wider"
                          style={{
                            background: "var(--accent-soft)",
                            color: "var(--accent)",
                          }}
                        >
                          CURRENT
                        </span>
                      ) : (
                        <span className="mono text-[0.62rem] text-[color:var(--text-3)]">
                          {job.type.toUpperCase()}
                        </span>
                      )}
                      <span className="mono text-[0.62rem] text-[color:var(--text-3)]">
                        {job.period}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-[color:var(--text-0)]">
                      {job.role}
                    </h3>
                    <p className="mt-0.5 text-sm text-[color:var(--text-1)]">
                      {job.company}
                    </p>

                    {!isOpen && (
                      <p className="mt-2.5 text-[0.82rem] leading-relaxed text-[color:var(--text-2)]">
                        {job.summary}
                      </p>
                    )}
                  </div>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-1 shrink-0"
                    style={{ color: "var(--text-3)" }}
                  >
                    <ChevronDown size={16} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        className="px-5 pb-5"
                        style={{ borderTop: "1px solid var(--line)" }}
                      >
                        <p className="label mb-3 pt-4">Responsibilities</p>
                        <ul className="space-y-2">
                          {job.responsibilities.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start text-[0.85rem] leading-relaxed text-[color:var(--text-1)]"
                            >
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

                        <p className="label mb-2.5 mt-5">Stack</p>
                        <div className="flex flex-wrap gap-1.5">
                          {job.stack.map((tech) => (
                            <span
                              key={tech}
                              className="mono rounded px-2 py-1 text-[0.65rem]"
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};

export default ExperienceTimeline;
