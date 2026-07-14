import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, CheckCircle, Phone, ChevronDown, MapPin, ChevronLeft, ChevronRight, Star,
} from "lucide-react";
import React from "react";
import { SERVICES, PROJECTS, TESTIMONIALS } from "../data/index.js";
import ScrollProgress from "../components/ScrollProgress.jsx";
import RevealText from "../components/RevealText.jsx";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

function PlaceholderBanner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "#2a2a2a" }}>
      <div className="text-neutral-700 text-6xl opacity-30">🏗</div>
    </div>
  );
}

function RelatedProjectsCarousel({ projects }) {
  const trackRef = React.useRef(null);
  const [canLeft, setCanLeft] = React.useState(false);
  const [canRight, setCanRight] = React.useState(false);

  const sync = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  React.useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [projects]);

  const nudge = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-pc]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 260) + 20), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div style={{ overflow: "hidden" }}>
        <div
          ref={trackRef}
          onScroll={sync}
          className="flex gap-5"
          style={{ overflowX: "scroll", scrollSnapType: "x mandatory", paddingBottom: 20, marginBottom: -20 }}
        >
          {projects.map((p) => (
            <Link
              key={p.slug}
              data-pc
              to={`/projects/${p.slug}`}
              className="group flex-shrink-0 bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-md transition-all"
              style={{ width: "clamp(220px, 65vw, 260px)", scrollSnapAlign: "start" }}
            >
              <div className="h-36 relative overflow-hidden" style={{ backgroundColor: "#ededed" }}>
                {p.image ? (
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                    <div className="text-center">
                      <div className="text-2xl mb-1">🏗</div>
                      <div className="text-xs">Photo coming soon</div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-neutral-900 text-sm group-hover:transition-colors">{p.title}</h3>
                <div className="flex items-center gap-1 text-xs mt-0.5" style={{ color: "#a3343e" }}>
                  <MapPin className="w-3 h-3" />
                  {p.location}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "#fdf2f3", color: "#a3343e", border: "1px solid #fce4e5" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {canLeft && (
        <button onClick={() => nudge(-1)} aria-label="Previous" className="absolute -left-4 top-[72px] -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-neutral-200 shadow-md flex items-center justify-center hover:bg-neutral-50 transition-colors z-10">
          <ChevronLeft className="w-4 h-4 text-neutral-700" />
        </button>
      )}
      {canRight && (
        <button onClick={() => nudge(1)} aria-label="Next" className="absolute -right-4 top-[72px] -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-neutral-200 shadow-md flex items-center justify-center hover:bg-neutral-50 transition-colors z-10">
          <ChevronRight className="w-4 h-4 text-neutral-700" />
        </button>
      )}
    </div>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.slug === slug);
  const [openFaq, setOpenFaq] = React.useState(null);

  if (!service) return <Navigate to="/" replace />;

  const related = service.relatedProjects
    ?.map((ps) => PROJECTS.find((p) => p.slug === ps))
    .filter(Boolean) ?? [];

  const currentIndex = SERVICES.findIndex((s) => s.slug === slug);
  const prev = SERVICES[currentIndex - 1] ?? null;
  const next = SERVICES[currentIndex + 1] ?? null;

  const serviceTestimonials = TESTIMONIALS.filter((t) => t.service === service.slug);

  const metaTitle = `${service.title} Melbourne | Cherry Builds`;
  const metaDesc = service.seoDesc ?? `${service.desc} Servicing Melbourne's Bayside and Mornington Peninsula. VBA Licensed. 30+ years experience.`;

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={`https://cherrybuilds.com.au/services/${service.slug}`} />
        <meta property="og:image" content="https://cherrybuilds.com.au/og-image.jpg" />
        <meta property="og:locale" content="en_AU" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:image" content="https://cherrybuilds.com.au/og-image.jpg" />
        <link rel="canonical" href={`https://cherrybuilds.com.au/services/${service.slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `https://cherrybuilds.com.au/services/${service.slug}`,
          name: service.title,
          description: metaDesc,
          url: `https://cherrybuilds.com.au/services/${service.slug}`,
          provider: { "@id": "https://cherrybuilds.com.au/#business" },
          areaServed: "Melbourne, Victoria, Australia",
          serviceType: "Home Renovation",
        })}</script>
      </Helmet>
      <ScrollProgress />
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[380px] overflow-hidden" style={{ backgroundColor: "#1a1a1a" }}>
        {service.heroImage ? (
          <img src={service.heroImage} alt={service.title} className="absolute inset-0 w-full h-full object-cover opacity-40" />
        ) : (
          <PlaceholderBanner />
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #1a1a1a 0%, rgba(26,26,26,0.65) 50%, rgba(26,26,26,0.3) 100%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-end pb-12 pt-24">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Link to="/#services" className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              All Services
            </Link>
            <div className="flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-4 border" style={{ backgroundColor: "rgba(163,52,62,0.25)", borderColor: "rgba(163,52,62,0.4)", color: "#f49ba0" }}>
              Cherry Builds Service
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
              {service.title}
            </h1>
            <p className="mt-3 text-neutral-300 text-lg max-w-xl">{service.desc}</p>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Main column */}
          <div className="lg:col-span-2 space-y-12">

            {/* Overview */}
            <motion.div {...fadeUp(0.1)}>
              <RevealText className="font-serif text-2xl font-bold text-neutral-900 mb-4">{service.overviewHeading ?? "Overview"}</RevealText>
              {service.overview.split("\n\n").map((para, i) => (
                <p key={i} className="text-neutral-600 leading-relaxed text-[1.05rem] mb-4 last:mb-0">{para}</p>
              ))}
            </motion.div>

            {/* What's included */}
            <motion.div {...fadeUp(0.15)}>
              <RevealText className="font-serif text-2xl font-bold text-neutral-900 mb-5">{service.includesHeading ?? "What's Included"}</RevealText>
              <div className="grid sm:grid-cols-2 gap-3">
                {service.includes.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-neutral-700">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#a3343e" }} />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Process */}
            <motion.div {...fadeUp(0.2)}>
              <RevealText className="font-serif text-2xl font-bold text-neutral-900 mb-6">Our Process</RevealText>
              <div className="grid sm:grid-cols-2 gap-5">
                {service.process.map((step) => (
                  <div key={step.step} className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mb-3" style={{ backgroundColor: "#a3343e" }}>
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-neutral-900 mb-1.5">{step.title}</h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* FAQs */}
            {service.faqs?.length > 0 && (
              <motion.div {...fadeUp(0.25)}>
                <RevealText className="font-serif text-2xl font-bold text-neutral-900 mb-5">Common Questions</RevealText>
                <div className="space-y-3">
                  {service.faqs.map((faq, i) => (
                    <div key={i} className="border border-neutral-200 rounded-2xl overflow-hidden" style={{ backgroundColor: "#ededed" }}>
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                      >
                        <span className="font-medium text-neutral-900 text-sm">{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                          style={{ color: "#a3343e" }}
                        />
                      </button>
                      {openFaq === i && (
                        <div className="px-6 pb-4">
                          <p className="text-sm text-neutral-500 leading-relaxed">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Testimonials */}
            {serviceTestimonials.length > 0 && (
              <motion.div {...fadeUp(0.28)}>
                <RevealText className="font-serif text-2xl font-bold text-neutral-900 mb-5">What Our Clients Say</RevealText>
                <div className={`grid gap-4 ${serviceTestimonials.length === 1 ? "" : "sm:grid-cols-2"}`}>
                  {serviceTestimonials.map((t) => (
                    <div
                      key={t.name}
                      className="rounded-2xl p-6 border flex flex-col"
                      style={{ backgroundColor: "#1a1a1a", borderColor: "rgba(255,255,255,0.08)" }}
                    >
                      <div className="flex gap-0.5 mb-3">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-neutral-300 text-sm leading-relaxed mb-5 flex-1">"{t.text}"</p>
                      <div className="flex items-center gap-2.5 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: "#a3343e" }}>
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{t.name}</div>
                          <div className="text-xs mt-0.5" style={{ color: "rgba(232,232,232,0.4)" }}>{t.suburb}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Related projects */}
            {related.length > 0 && (
              <motion.div {...fadeUp(0.3)}>
                <RevealText className="font-serif text-2xl font-bold text-neutral-900 mb-5">Related Projects</RevealText>
                <RelatedProjectsCarousel projects={related} />
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* CTA */}
            <motion.div {...fadeUp(0.15)} className="rounded-2xl p-6 text-white" style={{ backgroundColor: "#a3343e" }}>
              <service.icon className="w-7 h-7 text-red-200 mb-3" />
              <h3 className="font-serif text-xl font-bold mb-2">Get a Quote</h3>
              <p className="text-red-100 text-sm leading-relaxed mb-5">
                Obligation-free quote for your {service.title.toLowerCase()} project across Melbourne's Bayside and Mornington Peninsula.
              </p>
              <a
                href="/#contact"
                className="flex items-center justify-center gap-2 bg-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-red-50 transition-colors"
                style={{ color: "#a3343e" }}
              >
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:0408827996"
                className="mt-2 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium px-5 py-3 rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4" />
                0408 827 996
              </a>
            </motion.div>

            {/* All services */}
            <motion.div {...fadeUp(0.2)} className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-semibold text-neutral-900 text-sm mb-3">All Services</h3>
              <ul className="space-y-1">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/services/${s.slug}`}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        s.slug === slug
                          ? "font-semibold"
                          : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                      }`}
                      style={s.slug === slug ? { backgroundColor: "#fdf2f3", color: "#a3343e" } : {}}
                    >
                      <s.icon className="w-3.5 h-3.5 flex-shrink-0" />
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      {(prev || next) && (
        <section className="border-t border-neutral-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <div className="flex justify-between gap-4">
              {prev ? (
                <Link to={`/services/${prev.slug}`} className="group flex items-center gap-3 text-sm hover:text-cherry-600 transition-colors">
                  <div className="w-9 h-9 rounded-xl border border-neutral-200 flex items-center justify-center group-hover:bg-cherry-50 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400 mb-0.5">Previous</div>
                    <div className="font-medium text-neutral-900">{prev.title}</div>
                  </div>
                </Link>
              ) : <div />}

              {next && (
                <Link to={`/services/${next.slug}`} className="group flex items-center gap-3 text-sm text-right hover:text-cherry-600 transition-colors">
                  <div>
                    <div className="text-xs text-neutral-400 mb-0.5">Next</div>
                    <div className="font-medium text-neutral-900">{next.title}</div>
                  </div>
                  <div className="w-9 h-9 rounded-xl border border-neutral-200 flex items-center justify-center group-hover:bg-cherry-50 transition-colors">
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
