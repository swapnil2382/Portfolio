import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Smartphone, Globe } from "lucide-react";
import DeviceMockup from "./DeviceMockup";

/**
 * A featured project, presented large. Rows alternate sides so the page has
 * rhythm rather than a uniform column of blocks.
 */
const FeaturedProject = ({ project, index, onOpenCase }) => {
  const [techOpen, setTechOpen] = useState(false);
  const reversed = index % 2 === 1;
  const isMobileApp = project.platform === "mobile";

  return (
    <motion.article
      className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* device */}
      <div className={`lg:col-span-7 ${reversed ? "lg:order-2" : "lg:order-1"}`}>
        <DeviceMockup project={project} />
      </div>

      {/* detail */}
      <div className={`lg:col-span-5 ${reversed ? "lg:order-1" : "lg:order-2"}`}>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="mono text-[0.65rem]" style={{ color: "var(--accent)" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="mono inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-[0.62rem]"
            style={{ background: "var(--bg-2)", color: "var(--text-2)" }}
          >
            {isMobileApp ? <Smartphone size={10} /> : <Globe size={10} />}
            {isMobileApp ? "MOBILE APP" : "WEB APP"}
          </span>
          {project.org && (
            <span className="mono text-[0.62rem] text-[color:var(--text-3)]">
              {project.org}
            </span>
          )}
        </div>

        <h3 className="display mb-3 text-2xl font-bold text-[color:var(--text-0)] md:text-3xl">
          {project.name}
        </h3>

        <p className="mb-5 text-[0.95rem] leading-relaxed text-[color:var(--text-1)]">
          {project.tagline}
        </p>

        {project.problem && (
          <div className="mb-5">
            <p className="label mb-2">Problem</p>
            <p className="text-[0.85rem] leading-relaxed text-[color:var(--text-2)]">
              {project.problem}
            </p>
          </div>
        )}

        {/* expandable technical overview */}
        <div
          className="mb-6 overflow-hidden rounded-lg"
          style={{ border: "1px solid var(--line)" }}
        >
          <button
            type="button"
            onClick={() => setTechOpen((open) => !open)}
            aria-expanded={techOpen}
            className="flex w-full items-center justify-between px-3.5 py-2.5"
          >
            <span className="label">Technical Overview</span>
            <motion.span
              animate={{ rotate: techOpen ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ color: "var(--text-3)" }}
            >
              <ChevronDown size={14} />
            </motion.span>
          </button>

          <motion.div
            initial={false}
            animate={{ height: techOpen ? "auto" : 0, opacity: techOpen ? 1 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <dl className="px-3.5 pb-3.5">
              {Object.entries(project.stackDetail || {}).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-baseline justify-between gap-4 py-1.5"
                  style={{ borderTop: "1px solid var(--line)" }}
                >
                  <dt className="mono text-[0.66rem] text-[color:var(--text-3)]">
                    {key}
                  </dt>
                  <dd className="text-[0.8rem] text-[color:var(--text-1)]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        <div className="mb-6 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="mono rounded px-2 py-1 text-[0.65rem]"
              style={{ background: "var(--bg-2)", color: "var(--text-2)" }}
            >
              {tech}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onOpenCase(project)}
          data-cursor="VIEW"
          className="group inline-flex items-center gap-2 text-sm font-semibold transition-colors"
          style={{ color: "var(--accent)" }}
        >
          Explore Case Study
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </motion.article>
  );
};

export default FeaturedProject;
