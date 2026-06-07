import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Clock, DollarSign, ArrowLeft, ArrowRight,
  CheckCircle, Phone, Star, X, ChevronLeft, ChevronRight, Eye,
} from "lucide-react";
import { PROJECTS, TESTIMONIALS } from "../data/index.js";
import ScrollProgress from "../components/ScrollProgress.jsx";
import RevealText from "../components/RevealText.jsx";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

function PlaceholderImage({ className = "" }) {
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ backgroundColor: "#ededed" }}>
      <div className="text-center text-neutral-400">
        <div className="text-4xl mb-2">🏗</div>
        <div className="text-xs">Photo coming soon</div>
      </div>
    </div>
  );
}

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white/60 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>
      <button
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <motion.img
        key={index}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.18 }}
        src={images[index]}
        alt={`Photo ${index + 1}`}
        className="max-h-[88vh] max-w-[88vw] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-neutral-500 text-sm tabular-nums select-none">
        {index + 1} / {images.length}
      </div>
    </motion.div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);

  const [lightboxIdx, setLightboxIdx] = React.useState(null);

  if (!project) return <Navigate to="/" replace />;

  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const prev = PROJECTS[currentIndex - 1] ?? null;
  const next = PROJECTS[currentIndex + 1] ?? null;

  const projectTestimonials = TESTIMONIALS.filter((t) => t.project === project.slug);
  const galleryImages = project.images ?? [];
  const count = galleryImages.length;

  const metaTitle = `${project.title} | Melbourne Home Renovations | Cherry Builds`;
  const metaDesc = `${project.summary} By Cherry Builds — Melbourne's renovation specialists. VBA Licensed. 30+ years experience.`.slice(0, 160);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={`https://cherrybuilds.com.au/projects/${project.slug}`} />
        <link rel="canonical" href={`https://cherrybuilds.com.au/projects/${project.slug}`} />
      </Helmet>
      <ScrollProgress />
      {/* Hero banner */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden" style={{ backgroundColor: "#1a1a1a" }}>
        {project.image ? (
          <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-40" />
        ) : (
          <PlaceholderImage className="absolute inset-0 w-full h-full opacity-30" />
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #1a1a1a 0%, rgba(26,26,26,0.5) 50%, rgba(26,26,26,0.2) 100%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-end pb-12 pt-24">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Link to="/#projects" className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((t) => (
                <span key={t} className="text-xs text-white px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: "rgba(163,52,62,0.8)" }}>
                  {t}
                </span>
              ))}
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
              {project.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-sm text-neutral-300">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" style={{ color: "#f49ba0" }} />
                {project.location}
              </span>
              {project.duration && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" style={{ color: "#f49ba0" }} />
                  {project.duration}
                </span>
              )}
              {project.value && (
                <span className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" style={{ color: "#f49ba0" }} />
                  {project.value}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <motion.div {...fadeUp(0.1)}>
              <RevealText className="font-serif text-2xl font-bold text-neutral-900 mb-4">Project Overview</RevealText>
              <p className="text-neutral-600 leading-relaxed text-[1.05rem]">{project.overview}</p>
            </motion.div>

            <motion.div {...fadeUp(0.15)}>
              <RevealText className="font-serif text-2xl font-bold text-neutral-900 mb-4">Gallery</RevealText>
              {galleryImages.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="col-span-2 sm:col-span-2">
                    <button
                      className="group relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden block"
                      onClick={() => setLightboxIdx(0)}
                      aria-label="Open photo"
                    >
                      <img src={galleryImages[0]} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                      </div>
                    </button>
                  </div>
                  {galleryImages.slice(1).map((img, i) => (
                    <button
                      key={i}
                      className="group relative w-full h-32 sm:h-[8.5rem] rounded-xl overflow-hidden block"
                      onClick={() => setLightboxIdx(i + 1)}
                      aria-label="Open photo"
                    >
                      <img src={img} alt={`${project.title} ${i + 2}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <Eye className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="col-span-2 sm:col-span-2 row-span-2">
                    <PlaceholderImage className="w-full h-64 sm:h-72 rounded-2xl" />
                  </div>
                  {Array.from({ length: Math.min(4, (project.imageCount ?? 4) - 1) }).map((_, i) => (
                    <PlaceholderImage key={i} className="w-full h-32 sm:h-[8.5rem] rounded-xl" />
                  ))}
                </div>
              )}
            </motion.div>
            {projectTestimonials.length > 0 && (
              <motion.div {...fadeUp(0.2)}>
                {projectTestimonials.slice(0, 1).map((t) => (
                  <div key={t.name} className="relative rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)" }}>
                    {/* decorative quote mark */}
                    <div className="absolute top-4 right-6 font-serif text-[120px] leading-none select-none pointer-events-none" style={{ color: "rgba(163,52,62,0.12)" }}>"</div>
                    <div className="relative z-10 p-8">
                      {/* stars */}
                      <div className="flex gap-1 mb-5">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      {/* quote */}
                      <p className="font-serif text-xl sm:text-2xl text-white leading-relaxed mb-7">
                        &ldquo;{t.text}&rdquo;
                      </p>
                      {/* author */}
                      <div className="flex items-center gap-3 pt-5 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ backgroundColor: "#a3343e" }}>
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{t.name}</div>
                          <div className="text-sm mt-0.5" style={{ color: "rgba(232,232,232,0.45)" }}>{t.suburb}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            <motion.div {...fadeUp(0.2)} className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-neutral-900 mb-4">Scope of Work</h3>
              <ul className="space-y-2.5">
                {project.scope.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-600">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#a3343e" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeUp(0.25)} className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-neutral-900 mb-4">Project Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-500">Location</span>
                  <span className="font-medium text-neutral-800">{project.location}, VIC</span>
                </div>
                {project.duration && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">Duration</span>
                    <span className="font-medium text-neutral-800">{project.duration}</span>
                  </div>
                )}
                {project.value && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">Project Value</span>
                    <span className="font-medium text-neutral-800">{project.value}</span>
                  </div>
                )}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "#fdf2f3", color: "#a3343e", border: "1px solid #fce4e5" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.3)} className="rounded-2xl p-6 text-white" style={{ backgroundColor: "#a3343e" }}>
              <h3 className="font-serif text-lg font-bold mb-2">Like what you see?</h3>
              <p className="text-red-100 text-sm leading-relaxed mb-4">
                Get in touch for an obligation-free quote on your project.
              </p>
              <a
                href="/#contact"
                className="flex items-center justify-center gap-2 bg-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-red-50 transition-colors"
                style={{ color: "#a3343e" }}
              >
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:0438499146"
                className="mt-2 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium px-5 py-3 rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4" />
                0438 499 146
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIdx !== null && count > 0 && (
          <Lightbox
            images={galleryImages}
            index={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
            onPrev={() => setLightboxIdx((lightboxIdx - 1 + count) % count)}
            onNext={() => setLightboxIdx((lightboxIdx + 1) % count)}
          />
        )}
      </AnimatePresence>

      {(prev || next) && (
        <section className="border-t border-neutral-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <div className="flex justify-between gap-4">
              {prev ? (
                <Link to={`/projects/${prev.slug}`} className="group flex items-center gap-3 text-sm hover:text-cherry-600 transition-colors">
                  <div className="w-9 h-9 rounded-xl border border-neutral-200 flex items-center justify-center group-hover:border-cherry-200 group-hover:bg-cherry-50 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400 mb-0.5">Previous</div>
                    <div className="font-medium text-neutral-900">{prev.title}</div>
                  </div>
                </Link>
              ) : <div />}

              {next && (
                <Link to={`/projects/${next.slug}`} className="group flex items-center gap-3 text-sm text-right hover:text-cherry-600 transition-colors">
                  <div>
                    <div className="text-xs text-neutral-400 mb-0.5">Next</div>
                    <div className="font-medium text-neutral-900">{next.title}</div>
                  </div>
                  <div className="w-9 h-9 rounded-xl border border-neutral-200 flex items-center justify-center group-hover:border-cherry-200 group-hover:bg-cherry-50 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
