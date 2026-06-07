import { motion } from "framer-motion";
import React from "react";

const wordVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function RevealText({ children, as: Tag = "h2", className = "" }) {
  const words = String(children).split(" ");

  return (
    <Tag className={className}>
      <motion.span
        key={children}
        initial="hidden"
        animate="visible"
        aria-label={children}
        style={{ display: "inline" }}
      >
        {words.map((word, i) => (
          <React.Fragment key={i}>
            <motion.span
              custom={i}
              variants={wordVariant}
              style={{ display: "inline-block" }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? " " : ""}
          </React.Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}
