import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section, { SectionHeader } from "../common/Section";
import Reveal from "../common/Reveal";
import SkillNetwork from "./SkillNetwork";
import { skillGroups } from "../../data/skills";

/** One technology row inside a group panel. */
const SkillRow = ({ item, onHover }) => {
  const [iconFailed, setIconFailed] = useState(false);

  return (
    <li
      className="group flex items-center gap-3 rounded-md px-2.5 py-2 transition-colors"
      onMouseEnter={() => onHover(item)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: "default" }}
    >
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded"
        style={{ background: "var(--bg-3)" }}
      >
        {item.icon && !iconFailed ? (
          <img
            src={item.icon}
            alt=""
            aria-hidden="true"
            loading="lazy"
            onError={() => setIconFailed(true)}
            className={`h-4 w-4 object-contain ${item.invert ? "invert" : ""}`}
          />
        ) : (
          <span
            className="mono text-[0.6rem]"
            style={{ color: "var(--text-2)" }}
          >
            {item.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </span>

      <span className="flex-1 text-[0.85rem] text-[color:var(--text-1)] transition-colors group-hover:text-[color:var(--text-0)]">
        {item.name}
      </span>
    </li>
  );
};

const Skills = () => {
  const [detail, setDetail] = useState(null);

  return (
    <Section id="skills">
      <SectionHeader
        index="02"
        label="Skills"
        title="The stack I actually work in."
        lead="Grouped by where each piece sits in a system — interface, service layer, persistence, tooling."
      />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        {/* network graph */}
        <div className="order-2 lg:order-1 lg:col-span-5">
          <Reveal>
            <div className="panel-raised overflow-hidden">
              <div
                className="flex items-center justify-between px-4 py-2.5"
                style={{ borderBottom: "1px solid var(--line)" }}
              >
                <span className="label">Technology Graph</span>
                <span className="mono text-[0.62rem] text-[color:var(--text-3)]">
                  interactive
                </span>
              </div>

              <div className="px-3 pb-4 pt-2">
                <SkillNetwork />
              </div>
            </div>
          </Reveal>
        </div>

        {/* grouped lists */}
        <div className="order-1 lg:order-2 lg:col-span-7">
          <div className="grid gap-5 sm:grid-cols-2">
            {skillGroups.map((group, index) => (
              <Reveal key={group.id} delay={index * 0.06}>
                <div className="panel h-full p-4">
                  <div className="mb-3 flex items-center gap-2.5 px-1">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: group.accent }}
                    />
                    <span className="label">{group.label}</span>
                    <span className="mono ml-auto text-[0.62rem] text-[color:var(--text-3)]">
                      {String(group.items.length).padStart(2, "0")}
                    </span>
                  </div>

                  <ul>
                    {group.items.map((item) => (
                      <SkillRow key={item.name} item={item} onHover={setDetail} />
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* hovered technology detail */}
          <Reveal delay={0.1}>
            <div
              className="panel mt-5 flex min-h-[58px] items-center px-4 py-3"
              aria-live="polite"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={detail?.name || "idle"}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
                >
                  {detail ? (
                    <>
                      <span
                        className="mono text-[0.75rem]"
                        style={{ color: "var(--accent)" }}
                      >
                        {detail.name}
                      </span>
                      <span className="text-[0.82rem] text-[color:var(--text-1)]">
                        {detail.note}
                      </span>
                    </>
                  ) : (
                    <span className="text-[0.82rem] text-[color:var(--text-3)]">
                      Hover a technology for detail.
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};

export default Skills;
