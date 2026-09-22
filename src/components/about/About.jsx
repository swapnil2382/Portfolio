import React, { useState } from "react";
import Section, { SectionHeader } from "../common/Section";
import Reveal from "../common/Reveal";
import JourneyTimeline from "./JourneyTimeline";
import ArchitectureDiagram from "./ArchitectureDiagram";
import { aboutIntro } from "../../data/about";
import { architecture } from "../../data/skills";
import { profile, experienceSnapshot } from "../../data/profile";
import portrait from "../swapnil_SD_Codehub.jpg";

const About = () => {
  const [activeStage, setActiveStage] = useState(2); // "Into Production"
  const [activeLayer, setActiveLayer] = useState(-1);

  return (
    <Section id="about">
      <SectionHeader
        index="01"
        label="About"
        title={aboutIntro.heading}
        lead={aboutIntro.paragraphs[0]}
      />

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* left: copy + timeline */}
        <div className="lg:col-span-7">
          {/* identity card */}
          <Reveal>
            <div className="panel mb-8 flex items-center gap-4 p-4">
              <img
                src={portrait}
                alt={profile.name}
                loading="lazy"
                className="h-16 w-16 shrink-0 rounded-lg object-cover"
                style={{ border: "1px solid var(--line-strong)" }}
              />

              <div className="min-w-0">
                <p className="text-[0.92rem] font-semibold text-[color:var(--text-0)]">
                  {profile.name}
                </p>
                <p className="mt-0.5 text-[0.8rem] text-[color:var(--text-1)]">
                  {profile.currentRole.role}
                </p>
                <p className="mono mt-1 flex items-center gap-2 text-[0.66rem] text-[color:var(--text-3)]">
                  <span className="status-dot" />
                  {profile.currentRole.company}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <p className="max-w-xl leading-relaxed text-[color:var(--text-1)]">
              {aboutIntro.paragraphs[1]}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {aboutIntro.approach.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.08}>
                <div className="panel h-full p-5">
                  <p className="label mb-2.5">{item.label}</p>
                  <p className="text-sm leading-relaxed text-[color:var(--text-1)]">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-14">
              <p className="label mb-6">Journey</p>
              <JourneyTimeline
                activeIndex={activeStage}
                setActiveIndex={setActiveStage}
              />
            </div>
          </Reveal>
        </div>

        {/* right: architecture */}
        <div className="lg:col-span-5">
          <Reveal delay={0.12}>
            <div className="panel-raised overflow-hidden">
              <div
                className="flex items-center justify-between px-4 py-2.5"
                style={{ borderBottom: "1px solid var(--line)" }}
              >
                <span className="label">System Architecture</span>
                <span className="mono text-[0.62rem] text-[color:var(--text-3)]">
                  typical stack
                </span>
              </div>

              <div className="px-4 pb-2 pt-4">
                <ArchitectureDiagram
                  activeIndex={activeLayer}
                  onHover={setActiveLayer}
                />
              </div>

              {/* Layer legend — labels live in DOM rather than 3D text, and
                  hovering a row lifts the matching solid in the scene. */}
              <ul
                style={{ borderTop: "1px solid var(--line)" }}
                onMouseLeave={() => setActiveLayer(-1)}
              >
                {architecture.map((layer, index) => {
                  const isActive = activeLayer === index;

                  return (
                    <li
                      key={layer.id}
                      onMouseEnter={() => setActiveLayer(index)}
                      className="flex cursor-default items-baseline gap-3 px-4 py-2.5 transition-colors"
                      style={{
                        background: isActive ? "var(--bg-3)" : "transparent",
                        borderBottom:
                          index === architecture.length - 1
                            ? "none"
                            : "1px solid var(--line)",
                      }}
                    >
                      <span
                        className="mono w-6 shrink-0 text-[0.62rem] transition-colors"
                        style={{
                          color: isActive
                            ? "var(--accent)"
                            : "var(--text-3)",
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-[0.82rem] font-medium text-[color:var(--text-0)]">
                        {layer.label}
                      </span>
                      <span className="hidden text-[0.7rem] text-[color:var(--text-2)] sm:block">
                        {layer.detail}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          {/* experience snapshot */}
          <Reveal delay={0.18}>
            <div className="panel mt-6 p-5">
              <p className="label mb-4">Experience Snapshot</p>
              <ul className="space-y-2.5">
                {experienceSnapshot.map((stat) => (
                  <li
                    key={stat.label}
                    className="flex items-baseline justify-between gap-4"
                  >
                    <span className="text-[0.82rem] text-[color:var(--text-1)]">
                      {stat.label}
                    </span>
                    <span
                      className="mono shrink-0 text-[0.75rem]"
                      style={{ color: "var(--accent)" }}
                    >
                      {stat.value} {stat.unit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};

export default About;
