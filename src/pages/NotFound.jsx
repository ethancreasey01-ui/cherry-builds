import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Home } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Cherry Builds</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#1a1a1a" }}
      >
        {/* Subtle background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(255,255,255,1) 60px,rgba(255,255,255,1) 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(255,255,255,1) 60px,rgba(255,255,255,1) 61px)",
          }}
        />

        <div className="relative z-10 max-w-lg mx-auto px-6 text-center">
          {/* Big 404 number */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="font-serif font-bold leading-none select-none"
              style={{
                fontSize: "clamp(6rem, 20vw, 10rem)",
                color: "rgba(163,52,62,0.25)",
                display: "block",
                lineHeight: 1,
              }}
            >
              404
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Page not found
            </h1>
            <p className="text-neutral-400 leading-relaxed mb-10">
              The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
              Let&rsquo;s get you back on track.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                style={{ backgroundColor: "#a3343e" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#8a2b34")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#a3343e")}
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-all"
              >
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
