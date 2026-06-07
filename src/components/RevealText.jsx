import { motion } from "framer-motion";

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
          <motion.span
            key={i}
            custom={i}
            variants={wordVariant}
            style={{ display: "inline-block" }}
          >
            {word}{i < words.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
