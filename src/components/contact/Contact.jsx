import React from "react";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import Section, { SectionHeader } from "../common/Section";
import Reveal from "../common/Reveal";
import { profile, links } from "../../data/profile";

const socials = [
  { label: "GitHub", handle: "swapnil2382", href: links.github, icon: <Github size={15} /> },
  { label: "LinkedIn", handle: "Swapnil Patil", href: links.linkedin, icon: <Linkedin size={15} /> },
  { label: "Instagram", handle: "@swapnil._16", href: links.instagram, icon: <Instagram size={15} /> },
  { label: "WhatsApp", handle: profile.phone, href: links.whatsapp, icon: <MessageCircle size={15} /> },
];

/**
 * Contact presented as a request/response panel — the one place the
 * API-styling metaphor is used at full strength, since it's the final screen.
 */
const ResponsePanel = () => (
  <div className="panel-raised overflow-hidden">
    <div
      className="flex items-center justify-between px-4 py-2.5"
      style={{ borderBottom: "1px solid var(--line)" }}
    >
      <span className="mono text-[0.7rem]">
        <span style={{ color: "var(--accent)" }}>GET</span>{" "}
        <span style={{ color: "var(--text-2)" }}>/contact</span>
      </span>
      <span className="mono flex items-center gap-1.5 text-[0.62rem] text-[color:var(--text-3)]">
        <span className="status-dot" />
        200 OK
      </span>
    </div>

    <div className="mono p-4 text-[0.74rem] leading-relaxed">
      <p style={{ color: "var(--text-3)" }}>{"{"}</p>

      {[
        { key: "status", value: "OPEN_TO_DISCUSSION", accent: true },
        { key: "email", value: profile.email, href: links.email },
        { key: "phone", value: profile.phone, href: links.phone },
        { key: "location", value: profile.locationShort },
        { key: "role", value: profile.currentRole.role },
        { key: "company", value: profile.currentRole.company },
      ].map((row) => (
        <p key={row.key} className="pl-5">
          <span style={{ color: "var(--text-2)" }}>"{row.key}"</span>
          <span style={{ color: "var(--text-3)" }}>: </span>
          {row.href ? (
            <a
              href={row.href}
              data-cursor="COPY"
              className="underline decoration-dotted underline-offset-4 transition-colors"
              style={{ color: "var(--text-0)" }}
            >
              "{row.value}"
            </a>
          ) : (
            <span
              style={{
                color: row.accent ? "#4ade80" : "var(--text-0)",
              }}
            >
              "{row.value}"
            </span>
          )}
          <span style={{ color: "var(--text-3)" }}>,</span>
        </p>
      ))}

      <p style={{ color: "var(--text-3)" }}>{"}"}</p>
    </div>
  </div>
);

const Contact = () => (
  <Section id="contact">
    <SectionHeader
      index="06"
      label="Contact"
      title="Let's build something."
      lead="Have an idea, project, or opportunity? Let's talk."
      align="center"
    />

    <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
      {/* primary actions */}
      <Reveal>
        <div className="flex h-full flex-col gap-3">
          <a
            href={links.email}
            data-cursor="MAIL"
            className="panel group flex items-center gap-4 p-5 transition-colors hover:border-[color:var(--line-strong)]"
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
              style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
            >
              <Mail size={17} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="label block">Email</span>
              <span className="mt-1 block truncate text-[0.85rem] text-[color:var(--text-0)]">
                {profile.email}
              </span>
            </span>
            <ArrowUpRight
              size={15}
              className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              style={{ color: "var(--text-3)" }}
            />
          </a>

          <a
            href={links.phone}
            data-cursor="CALL"
            className="panel group flex items-center gap-4 p-5 transition-colors hover:border-[color:var(--line-strong)]"
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
              style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
            >
              <Phone size={17} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="label block">Phone</span>
              <span className="mt-1 block text-[0.85rem] text-[color:var(--text-0)]">
                {profile.phone}
              </span>
            </span>
            <ArrowUpRight
              size={15}
              className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              style={{ color: "var(--text-3)" }}
            />
          </a>

          {/* socials */}
          <div className="panel grid flex-1 grid-cols-2 gap-px overflow-hidden" style={{ background: "var(--line)" }}>
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN"
                className="group flex flex-col justify-center gap-1.5 p-4 transition-colors"
                style={{ background: "var(--bg-1)" }}
              >
                <span
                  className="transition-colors group-hover:text-[color:var(--accent)]"
                  style={{ color: "var(--text-2)" }}
                >
                  {social.icon}
                </span>
                <span className="text-[0.78rem] font-medium text-[color:var(--text-0)]">
                  {social.label}
                </span>
                <span className="mono truncate text-[0.62rem] text-[color:var(--text-3)]">
                  {social.handle}
                </span>
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      {/* api panel */}
      <Reveal delay={0.1}>
        <ResponsePanel />
      </Reveal>
    </div>
  </Section>
);

export default Contact;
