import React from "react";
import { useInView } from "framer-motion";

export default function CountUp({ value, className = "", style, delay = 0 }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  // Starts at the real value so the prerendered HTML, no-JS visitors and crawlers see the final number.
  const [display, setDisplay] = React.useState(String(value));

  React.useEffect(() => {
    if (!inView) return;
    // Reduced motion: leave the final number in place, no count-up.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Parse "30+", "500+", "100%", "2007" → { num: 30, suffix: "+" }
    const match = String(value).match(/^(\d+)(.*)$/);
    if (!match) { setDisplay(value); return; }

    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const duration = Math.min(1800, 600 + target * 0.8);

    const run = () => {
      setDisplay("0" + suffix);
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(String(Math.floor(eased * target)) + suffix);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (delay > 0) {
      const t = setTimeout(run, delay);
      return () => clearTimeout(t);
    } else {
      run();
    }
  }, [inView, value, delay]);

  return <span ref={ref} className={className} style={style}>{display}</span>;
}
