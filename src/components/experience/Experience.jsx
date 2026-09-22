import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Section, { SectionHeader } from "../common/Section";
import Reveal from "../common/Reveal";
import ExperienceTimeline from "./ExperienceTimeline";
import { certificates, courses } from "../../data/certificates";

const TABS = ["Experience", "Certificates", "Courses"];

/** Certificate card with a subtle 3D tilt that follows the pointer. */
const CertificateCard = ({ cert }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * 7, y: px * 7 });
  };

  return (
    <motion.article
      className="panel-raised group h-full p-5"
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: "spring", stiffness: 210, damping: 18 }}
      style={{ transformStyle: "preserve-3d", perspective: 700 }}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <span className="label">{cert.issuer}</span>
        {cert.year && (
          <span className="mono text-[0.62rem] text-[color:var(--text-3)]">
            {cert.year}
          </span>
        )}
      </div>

      <h3 className="mb-2 text-[0.95rem] font-semibold leading-snug text-[color:var(--text-0)]">
        {cert.title}
      </h3>

      <p className="mb-5 text-[0.8rem] leading-relaxed text-[color:var(--text-2)]">
        {cert.description}
      </p>

      <a
        href={cert.pdf}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="OPEN"
        className="mono inline-flex items-center gap-1.5 text-[0.7rem] transition-colors"
        style={{ color: "var(--accent)" }}
      >
        View Certificate <ExternalLink size={11} />
      </a>
    </motion.article>
  );
};

const Experience = () => {
  const [tab, setTab] = useState("Experience");

  return (
    <Section id="experience">
      <SectionHeader
        index="03"
        label="Experience"
        title="Where I've built things."
        lead="Four roles across production software and client delivery, plus the certifications and coursework behind them."
      />

      {/* tabs */}
      <Reveal>
        <div
          className="mb-10 inline-flex rounded-lg p-1"
          style={{ background: "var(--bg-1)", border: "1px solid var(--line)" }}
          role="tablist"
          aria-label="Experience categories"
        >
          {TABS.map((item) => {
            const isActive = tab === item;
            return (
              <button
                key={item}
                role="tab"
                aria-selected={isActive}
                onClick={() => setTab(item)}
                className="relative rounded-md px-4 py-2 text-[0.82rem] font-medium transition-colors"
                style={{ color: isActive ? "#0a0c10" : "var(--text-2)" }}
              >
                {isActive && (
                  <motion.span
                    layoutId="exp-tab"
                    className="absolute inset-0 rounded-md"
                    style={{ background: "var(--accent)" }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <span className="relative z-10">{item}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {tab === "Experience" && <ExperienceTimeline />}

          {tab === "Certificates" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {certificates.map((cert) => (
                <CertificateCard key={cert.id} cert={cert} />
              ))}
            </div>
          )}

          {tab === "Courses" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {courses.map((course) => (
                <article key={course.id} className="panel h-full p-5">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <span className="label">{course.platform}</span>
                  </div>

                  <h3 className="mb-2 text-[0.95rem] font-semibold text-[color:var(--text-0)]">
                    {course.title}
                  </h3>

                  <p className="mb-4 text-[0.8rem] leading-relaxed text-[color:var(--text-2)]">
                    {course.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {course.skills.map((skill) => (
                      <span
                        key={skill}
                        className="mono rounded px-2 py-1 text-[0.63rem]"
                        style={{
                          background: "var(--bg-3)",
                          color: "var(--text-2)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
};

export default Experience;
