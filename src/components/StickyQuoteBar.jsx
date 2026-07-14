import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function StickyQuoteBar() {
  const [visible, setVisible] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const contactEl = document.getElementById("contact");

    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.75;

      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        const nearContact = rect.top < window.innerHeight * 0.85;
        setVisible(pastHero && !nearContact);
      } else {
        setVisible(pastHero);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const isHome = location.pathname === "/";
  const quoteHref = isHome ? "#contact" : "/#contact";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 inset-x-0 z-40 border-t border-neutral-200 shadow-2xl"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
            {/* Left — branding */}
            <div className="hidden sm:flex items-center gap-2 min-w-0">
              <span className="font-bold text-neutral-900 text-sm whitespace-nowrap">Cherry Builds</span>
              <span className="text-neutral-300 text-sm">—</span>
              <span className="text-neutral-500 text-sm truncate">Melbourne's Renovation Specialists</span>
            </div>

            {/* Right — actions */}
            <div className="flex items-center gap-3 ml-auto">
              {/* Social icons */}
              <div className="hidden sm:flex items-center gap-2">
                <a href="https://www.facebook.com/cherrybuilds" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-700 transition-colors" aria-label="Facebook">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
                <a href="https://www.instagram.com/cherrybuildsmelb/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-700 transition-colors" aria-label="Instagram">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="3"/><circle cx="18.5" cy="5.5" r="1.5" fill="currentColor" stroke="none"/></svg>
                </a>
              </div>

              <div className="hidden sm:block w-px h-5 bg-neutral-200" />

              <a
                href="tel:0408827996"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                <Phone className="w-4 h-4" style={{ color: "#a3343e" }} />
                0408 827 996
              </a>

              {/* Divider */}
              <div className="hidden sm:block w-px h-5 bg-neutral-200" />

              <a
                href={quoteHref}
                className="inline-flex items-center gap-1.5 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                style={{ backgroundColor: "#a3343e" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#8a2b34")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#a3343e")}
              >
                Get a Free Quote
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
