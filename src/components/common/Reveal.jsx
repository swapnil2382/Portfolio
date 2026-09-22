import React from "react";
import { motion } from "framer-motion";

/**
 * The single scroll-entrance used across the site.
 *
 * Deliberately one shared primitive rather than bespoke animation per element:
 * motion should signal hierarchy, and hierarchy is easier to keep consistent
 * when everything shares the same curve and distance.
 */
const Reveal = ({
  children,
  delay = 0,
  y = 24,
  className = "",
  as = "div",
  amount = 0.3,
}) => {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
