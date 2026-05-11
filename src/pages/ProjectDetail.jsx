import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  MapPin, Clock, DollarSign, ArrowLeft, ArrowRight,
  CheckCircle, Phone,
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

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/" replace />;

  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const prev = PROJECTS[currentIndex - 1] ?? null;
  const next = PROJECTS[currentIndex + 1] ?? null;

  const projectTestimonials = TESTIMONIALS.filter((t) => t.project === project.slug);

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
              {project.images?.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="col-span-2 sm:col-span-2">
                    <img src={project.images[0]} alt={project.title} className="w-full h-64 sm:h-72 rounded-2xl object-cover" />
                  </div>
                  {project.images.slice(1).map((img, i) => (
                    <img key={i} src={img} alt={`${project.title} ${i + 2}`} className="w-full h-32 sm:h-[8.5rem] rounded-xl object-cover" />
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
                <RevealText className="font-serif text-2xl font-bold text-neutral-900 mb-5">Client Review</RevealText>
                <div className="space-y-4">
                  {projectTestimonials.slice(0, 1).map((t) => (
                    <div key={t.name} className="rounded-2xl p-5 border" style={{ backgroundColor: "#1a1a1a", borderColor: "rgba(255,255,255,0.08)" }}>
                      <div className="flex gap-0.5 mb-3">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <svg key={j} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        ))}
                      </div>
                      <p className="text-neutral-300 text-sm leading-relaxed mb-4">"{t.text}"</p>
                      <div>
                        <div className="font-semibold text-white text-sm">{t.name}</div>
                        <div className="text-xs text-neutral-500 mt-0.5">{t.suburb}</div>
                      </div>
                    </div>
                  ))}
                </div>
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
