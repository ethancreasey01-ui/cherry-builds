import { motion } from "framer-motion";

const wordVariant = {
  hidden: { opacity: 0, y: "105%", rotateX: -15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.52, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function RevealText({ children, as: Tag = "h2", className = "", once = true }) {
  const words = String(children).split(" ");

  return (
    <Tag className={className} style={{ perspective: "600px" }}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.2 }}
        aria-label={children}
        style={{ display: "inline" }}
      >
        {words.map((word, i) => (
          <span key={i} style={{ display: "inline" }}>
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
              <motion.span
                custom={i}
                variants={wordVariant}
                style={{ display: "inline-block" }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
