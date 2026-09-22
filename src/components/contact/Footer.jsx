import React from "react";
import { ArrowUp } from "lucide-react";
import { profile, links } from "../../data/profile";
import { scrollToSection } from "../../hooks";

const Footer = () => (
  <footer
    className="px-5 py-10 sm:px-8"
    style={{ borderTop: "1px solid var(--line)" }}
  >
    <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-[color:var(--text-0)]">
          {profile.name}
        </p>
        <p className="mt-1 text-[0.8rem] text-[color:var(--text-2)]">
          {profile.title}
        </p>
        <p className="mono mt-0.5 text-[0.68rem] text-[color:var(--text-3)]">
          {profile.specialization}
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:items-end">
        <nav className="flex gap-5" aria-label="Social links">
          {[
            { label: "GitHub", href: links.github },
            { label: "LinkedIn", href: links.linkedin },
            { label: "Instagram", href: links.instagram },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="OPEN"
              className="text-[0.8rem] transition-colors hover:text-[color:var(--accent)]"
              style={{ color: "var(--text-2)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <p className="mono text-[0.66rem] text-[color:var(--text-3)]">
            © {new Date().getFullYear()} {profile.name}
          </p>

          <button
            type="button"
            onClick={() => scrollToSection("home")}
            aria-label="Back to top"
            className="flex h-7 w-7 items-center justify-center rounded-md transition-colors"
            style={{
              border: "1px solid var(--line)",
              color: "var(--text-2)",
            }}
          >
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
