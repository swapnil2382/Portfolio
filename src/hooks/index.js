import { useState, useEffect, useRef } from "react";

/** Matches a media query and stays in sync with resizes. */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (event) => setMatches(event.matches);

    setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
};

export const useReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

export const useIsTouch = () =>
  useMediaQuery("(hover: none), (pointer: coarse)");

export const useIsMobile = () => useMediaQuery("(max-width: 767px)");

/**
 * Tracks which section is currently in view.
 * Picks the entry closest to the top of the viewport rather than the first
 * intersecting one, so fast scrolling doesn't leave the nav lagging behind.
 */
export const useActiveSection = (ids) => {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top)
          );

        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return active;
};

/** True once the element has entered the viewport; used to gate 3D scenes. */
export const useInViewOnce = (margin = "200px") => {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || seen) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [seen, margin]);

  return [ref, seen];
};

/** Normalised (-1..1) pointer position, throttled to animation frames. */
export const usePointer = (enabled = true) => {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    let frame = null;

    const onMove = (event) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        pointer.current = {
          x: (event.clientX / window.innerWidth) * 2 - 1,
          y: (event.clientY / window.innerHeight) * 2 - 1,
        };
        frame = null;
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return pointer;
};

/** Smoothly scrolls to a section id and keeps focus behaviour sane. */
export const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
};
