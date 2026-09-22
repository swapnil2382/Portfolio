import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Smartphone, Globe } from "lucide-react";
import Section, { SectionHeader } from "../common/Section";
import Reveal from "../common/Reveal";
import FeaturedProject from "./FeaturedProject";
import CaseStudyModal from "./CaseStudyModal";
import {
  featuredProjects,
  gridProjects,
  projectCategories,
} from "../../data/projects";

/**
 * Compact card for the secondary grid.
 * The first card in each row spans wider on large screens so the grid has
 * hierarchy instead of nine identical tiles.
 */
const ProjectCard = ({ project, wide, onOpenCase }) => (
  <motion.article
    layout
    initial={{ opacity: 0, scale: 0.97 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.97 }}
    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    className={`panel group flex flex-col p-5 transition-colors hover:border-[color:var(--line-strong)] ${wide ? "sm:col-span-2" : ""
      }`}
  >
    <div className="mb-3 flex items-center gap-2">
      <span style={{ color: "var(--text-3)" }}>
        {project.platform === "mobile" ? (
          <Smartphone size={12} />
        ) : (
          <Globe size={12} />
        )}
      </span>
      <span className="mono text-[0.62rem] text-[color:var(--text-3)]">
        {project.category.toUpperCase()}
      </span>
    </div>

    <h3 className="mb-2 text-[0.95rem] font-semibold text-[color:var(--text-0)]">
      {project.name}
    </h3>

    <p className="mb-4 flex-1 text-[0.82rem] leading-relaxed text-[color:var(--text-2)]">
      {project.tagline}
    </p>

    <div className="mb-4 flex flex-wrap gap-1.5">
      {project.technologies.slice(0, wide ? 5 : 3).map((tech) => (
        <span
          key={tech}
          className="mono rounded px-1.5 py-0.5 text-[0.6rem]"
          style={{ background: "var(--bg-3)", color: "var(--text-2)" }}
        >
          {tech}
        </span>
      ))}
    </div>

    <div
      className="flex items-center justify-between gap-3 pt-3"
      style={{ borderTop: "1px solid var(--line)" }}
    >
      <button
        type="button"
        onClick={() => onOpenCase(project)}
        data-cursor="VIEW"
        className="mono inline-flex items-center gap-1.5 text-[0.7rem] transition-colors"
        style={{ color: "var(--accent)" }}
      >
        Details <ArrowUpRight size={11} />
      </button>

      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="OPEN"
          aria-label={`${project.name} source`}
          style={{ color: "var(--text-3)" }}
        >
          <Github size={13} />
        </a>
      ) : (
        <span className="mono text-[0.6rem] text-[color:var(--text-3)]">
          Coming Soon
        </span>
      )}
    </div>
  </motion.article>
);

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [caseStudy, setCaseStudy] = useState(null);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? gridProjects
        : gridProjects.filter((project) => project.category === filter),
    [filter]
  );

  // Only offer categories that actually have projects behind them.
  const availableCategories = useMemo(
    () =>
      projectCategories.filter(
        (category) =>
          category.id === "all" ||
          gridProjects.some((project) => project.category === category.id)
      ),
    []
  );

  return (
    <Section id="projects" wide>
      <SectionHeader
        index="04"
        label="Projects"
        title="Work, shown on the device it runs on."
        lead="Three featured builds with full case studies, plus the wider set of projects underneath."
      />

      {/* featured */}
      <div className="mb-24 space-y-24 lg:space-y-32">
        {featuredProjects.map((project, index) => (
          <FeaturedProject
            key={project.id}
            project={project}
            index={index}
            onOpenCase={setCaseStudy}
          />
        ))}
      </div>

      {/* grid */}
      <Reveal>
        <div
          className="mb-8 flex flex-wrap items-center justify-between gap-4 pb-5"
          style={{ borderTop: "1px solid var(--line)", paddingTop: "2.5rem" }}
        >
          <div className="flex items-center gap-3">
            <span className="label">More Projects</span>
            <span className="mono text-[0.65rem] text-[color:var(--text-3)]">
              {String(filtered.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter projects">
            {availableCategories.map((category) => {
              const isActive = filter === category.id;
              return (
                <button
                  key={category.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(category.id)}
                  className="mono rounded-md px-3 py-1.5 text-[0.68rem] transition-colors"
                  style={{
                    background: isActive ? "var(--accent)" : "var(--bg-1)",
                    border: `1px solid ${isActive ? "var(--accent)" : "var(--line)"}`,
                    color: isActive ? "#0a0c10" : "var(--text-2)",
                  }}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      <motion.div
        layout
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              wide={index === 0 && filter === "all"}
              onOpenCase={setCaseStudy}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-sm text-[color:var(--text-3)]">
          No projects in this category yet.
        </p>
      )}

      <CaseStudyModal
        project={caseStudy}
        onClose={() => setCaseStudy(null)}
      />
    </Section>
  );
};

export default Projects;
