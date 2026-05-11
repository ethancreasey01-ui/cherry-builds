import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: rating }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsCarousel({ testimonials, cardBg = "#2a2a2a", cardWidth = "clamp(260px, 78vw, 300px)" }) {
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const sync = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [testimonials]);

  const nudge = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-tc]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 280) + 16), behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* padding-bottom/-margin trick hides the scrollbar without CSS */}
      <div style={{ overflow: "hidden" }}>
        <div
          ref={trackRef}
          onScroll={sync}
          className="flex gap-4"
          style={{ overflowX: "scroll", scrollSnapType: "x mandatory", paddingBottom: 20, marginBottom: -20 }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              data-tc
              className="flex-shrink-0 rounded-2xl p-6 border flex flex-col"
              style={{ width: cardWidth, scrollSnapAlign: "start", backgroundColor: cardBg, borderColor: "rgba(255,255,255,0.08)" }}
            >
              <Stars rating={t.rating} />
              <p className="text-neutral-300 text-sm leading-relaxed mb-4 flex-1">"{t.text}"</p>
              <div>
                <div className="font-semibold text-white text-sm">{t.name}</div>
                <div className="text-xs text-neutral-500 mt-0.5">{t.suburb}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {canLeft && (
        <button
          onClick={() => nudge(-1)}
          aria-label="Previous"
          className="absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-neutral-200 shadow-md flex items-center justify-center hover:bg-neutral-50 transition-colors z-10"
        >
          <ChevronLeft className="w-4 h-4 text-neutral-700" />
        </button>
      )}
      {canRight && (
        <button
          onClick={() => nudge(1)}
          aria-label="Next"
          className="absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-neutral-200 shadow-md flex items-center justify-center hover:bg-neutral-50 transition-colors z-10"
        >
          <ChevronRight className="w-4 h-4 text-neutral-700" />
        </button>
      )}
    </div>
  );
}
