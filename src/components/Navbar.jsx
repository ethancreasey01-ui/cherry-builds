import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, Hammer } from "lucide-react";
import { NAV_LINKS } from "../data/index.js";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => { setOpen(false); }, [location]);

  const transparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        transparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-18">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cherry-600 flex items-center justify-center">
            <Hammer className="w-4 h-4 text-white" />
          </div>
          <span className={`font-bold text-lg tracking-tight transition-colors ${transparent ? "text-white" : "text-neutral-900"}`}>
            Cherry Builds
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={isHome ? l.href : `/${l.href}`}
              className={`text-sm font-medium transition-colors ${
                transparent ? "text-white/80 hover:text-white" : "text-neutral-600 hover:text-cherry-600"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href={isHome ? "#contact" : "/#contact"}
            className="ml-2 inline-flex items-center gap-1.5 bg-cherry-600 hover:bg-cherry-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            Get a Quote
          </a>
        </nav>

        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${transparent ? "text-white" : "text-neutral-700"}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-neutral-200 shadow-lg"
          >
            <nav className="flex flex-col px-4 py-4 gap-1">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={isHome ? l.href : `/${l.href}`}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-neutral-700 hover:text-cherry-600 hover:bg-cherry-50 rounded-lg transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={isHome ? "#contact" : "/#contact"}
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 bg-cherry-600 hover:bg-cherry-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                Get a Quote
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
