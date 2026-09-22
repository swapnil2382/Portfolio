import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Trophy } from "lucide-react";
import Section, { SectionHeader } from "../common/Section";
import Reveal from "../common/Reveal";
import { education, honours } from "../../data/education";

const Stat = ({ label, value }) => (
  <div
    className="rounded-lg px-4 py-3"
    style={{ background: "var(--bg-2)", border: "1px solid var(--line)" }}
  >
    <p className="mono mb-1.5 text-[0.62rem] text-[color:var(--text-3)]">
      {label}
    </p>
    <p className="text-sm font-medium text-[color:var(--text-0)]">{value}</p>
  </div>
);

const Education = () => (
  <Section id="education">
    <SectionHeader
      index="05"
      label="Education"
      title="Computer Engineering, Mumbai University."
      lead="Alongside hackathons and research competitions that kept the learning applied rather than theoretical."
    />

    <div className="grid gap-6 lg:grid-cols-12">
      {/* degree */}
      <Reveal className="lg:col-span-7">
        <div className="panel-raised h-full p-6 md:p-8">
          <div className="mb-6 flex items-start gap-4">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
              style={{
                background: "var(--accent-soft)",
                color: "var(--accent)",
              }}
            >
              <GraduationCap size={20} />
            </span>

            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-[color:var(--text-0)]">
                {education.degree}
              </h3>
              <p className="mt-1 text-sm text-[color:var(--text-1)]">
                {education.institution}
              </p>
              <p className="mono mt-0.5 text-[0.7rem] text-[color:var(--text-3)]">
                {education.university}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <Stat label="CGPA" value={education.cgpa} />
            <Stat label="GRADUATING" value={education.graduation} />
            <Stat label="LOCATION" value={education.location} />
          </div>

          <div
            className="mt-7 pt-6"
            style={{ borderTop: "1px solid var(--line)" }}
          >
            <p className="label mb-3.5">Relevant Coursework</p>
            <div className="flex flex-wrap gap-1.5">
              {education.coursework.map((subject) => (
                <span
                  key={subject}
                  className="mono rounded px-2 py-1 text-[0.65rem]"
                  style={{ background: "var(--bg-2)", color: "var(--text-2)" }}
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* honours */}
      <Reveal delay={0.1} className="lg:col-span-5">
        <div className="panel-raised h-full p-6 md:p-8">
          <p className="label mb-6">Competitions & Honours</p>

          <ul className="relative space-y-6">
            <span
              className="absolute bottom-2 top-2 w-px"
              style={{ left: 5, background: "var(--line)" }}
              aria-hidden="true"
            />

            {honours.map((item, index) => (
              <motion.li
                key={item.id}
                className="relative pl-7"
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span
                  className="absolute top-1 flex h-[11px] w-[11px] items-center justify-center rounded-full"
                  style={{
                    left: 0,
                    background: item.highlight ? "var(--accent)" : "var(--bg-3)",
                    border: `1px solid ${item.highlight ? "var(--accent)" : "var(--line-strong)"
                      }`,
                  }}
                />

                <div className="flex flex-wrap items-baseline gap-2">
                  <h4
                    className="text-[0.88rem] font-semibold"
                    style={{
                      color: item.highlight
                        ? "var(--accent)"
                        : "var(--text-0)",
                    }}
                  >
                    {item.title}
                  </h4>

                  <span
                    className="mono rounded px-1.5 py-0.5 text-[0.6rem]"
                    style={{
                      background: item.highlight
                        ? "var(--accent-soft)"
                        : "var(--bg-3)",
                      color: item.highlight
                        ? "var(--accent)"
                        : "var(--text-2)",
                    }}
                  >
                    {item.result}
                  </span>

                  {item.highlight && (
                    <Trophy size={12} style={{ color: "var(--accent)" }} />
                  )}
                </div>

                <p className="mt-1.5 text-[0.78rem] leading-relaxed text-[color:var(--text-2)]">
                  {item.detail}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  </Section>
);

export default Education;
