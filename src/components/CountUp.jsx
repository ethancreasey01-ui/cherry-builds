import React from "react";
import { useInView } from "framer-motion";

export default function CountUp({ value, className = "", style }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = React.useState("0");

  React.useEffect(() => {
    if (!inView) return;

    // Parse "30+", "500+", "100%", "2007" → { num: 30, suffix: "+" }
    const match = String(value).match(/^(\d+)(.*)$/);
    if (!match) { setDisplay(value); return; }

    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const duration = Math.min(1800, 600 + target * 0.8);
    let start = null;

    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(String(Math.floor(eased * target)) + suffix);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [inView, value]);

  return <span ref={ref} className={className} style={style}>{display}</span>;
}
