import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Phone, ArrowRight, CheckCircle, ChevronRight } from "lucide-react";
import ScrollProgress from "../components/ScrollProgress.jsx";

const CHERRY = "#a3343e";
const CHERRY_HOVER = "#8a2a33";
const CHERRY_LIGHT = "#fdf5f5";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

// ─── Data ─────────────────────────────────────────────────────────────────────

const AREAS = [
  {
    region: "Bayside",
    color: CHERRY,
    suburbs: [
      { name: "Brighton",      note: "Kitchen & bathroom renovations, heritage homes" },
      { name: "Sandringham",   note: "Full home renovations & decking" },
      { name: "Beaumaris",     note: "Bathroom renovations & tiling" },
      { name: "Mentone",       note: "Full home & property preparation" },
      { name: "Cheltenham",    note: "Kitchen renovations & plastering" },
      { name: "Hampton",       note: "Bathroom & kitchen renovations" },
    ],
  },
  {
    region: "Mornington Peninsula",
    color: "#8a2a33",
    suburbs: [
      { name: "Frankston",     note: "Full home renovations & property prep" },
      { name: "Mornington",    note: "Kitchen, bathroom & decking specialists" },
      { name: "Mount Eliza",   note: "Heritage homes & full renovations" },
      { name: "Seaford",       note: "Bathroom renovations & tiling" },
      { name: "Langwarrin",    note: "Kitchen renovations & plastering" },
      { name: "Somerville",    note: "Full home & outdoor living projects" },
    ],
  },
  {
    region: "Inner Melbourne",
    color: "#6b1f26",
    suburbs: [
      { name: "Albert Park",   note: "Heritage renovations & bespoke kitchens" },
      { name: "St Kilda",      note: "Apartment renovations & bathroom fit-outs" },
      { name: "Fitzroy",       note: "Art deco renovations & character homes" },
      { name: "South Yarra",   note: "Premium kitchen & bathroom renovations" },
      { name: "Port Melbourne", note: "Full home renovations & decking" },
      { name: "Prahran",       note: "Bathroom renovations & tiling" },
    ],
  },
];

const SERVICES_SHORTLIST = [
  "Full Home Renovations",
  "Bathroom Renovations",
  "Kitchen Renovations",
  "Decking & Landscaping",
  "Tiling & Flooring",
  "Waterproofing",
  "Plastering & Painting",
  "Property Preparation",
];

const RECENT_JOBS = [
  { suburb: "Albert Park",  type: "Full kitchen & living room renovation",      year: "2025" },
  { suburb: "Fitzroy",      type: "Art deco apartment — bathroom & tiling",     year: "2025" },
  { suburb: "Sandringham",  note: "Timber decking & outdoor entertaining",      year: "2024" },
  { suburb: "Point Leo",    type: "Full holiday home renovation",               year: "2024" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServiceAreas() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Service Areas Melbourne | Cherry Builds</title>
        <meta
          name="description"
          content="Cherry Builds services Melbourne's Bayside, Mornington Peninsula, and inner suburbs. VBA Licensed renovation builder covering Brighton, Sandringham, Frankston, Mornington, Albert Park and surrounds."
        />
        <meta property="og:title" content="Service Areas Melbourne | Cherry Builds" />
        <meta property="og:description" content="Cherry Builds covers Melbourne's Bayside, Mornington Peninsula, and inner suburbs. VBA Licensed renovation specialists." />
        <meta property="og:url" content="https://cherrybuilds.com.au/service-areas" />
        <meta property="og:image" content="https://cherrybuilds.com.au/og-image.jpg" />
        <meta property="og:locale" content="en_AU" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://cherrybuilds.com.au/service-areas" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": "https://cherrybuilds.com.au/service-areas",
          name: "Cherry Builds — Melbourne Service Areas",
          provider: { "@id": "https://cherrybuilds.com.au/#business" },
          areaServed: AREAS.flatMap(a => a.suburbs.map(s => ({
            "@type": "City",
            name: `${s.name}, Victoria, Australia`,
          }))),
          serviceType: "Home Renovation",
        })}</script>
      </Helmet>
      <ScrollProgress />

      {/* ── Hero ── */}
      <section
        className="relative h-[44vh] min-h-[320px] overflow-hidden flex items-end"
        style={{ backgroundColor: "#1a1a1a" }}
      >
        <img
          src="/images/melbourne-home-renovations-cherry-builds.jpg"
          alt="Cherry Builds Melbourne renovations"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,26,26,0.85) 0%, transparent 60%)" }} />
        {/* Large faded map pin watermark */}
        <div className="absolute inset-0 flex items-center justify-end pr-12 pointer-events-none">
          <MapPin className="w-64 h-64 opacity-[0.04] text-white" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full pb-12 pt-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-col items-start gap-3 mb-5">
              <Link to="/" className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white text-sm transition-colors">
                ← Home
              </Link>
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold border"
                style={{ backgroundColor: "rgba(163,52,62,0.25)", borderColor: "rgba(163,52,62,0.45)", color: "#f4a0a7" }}
              >
                <MapPin className="w-3.5 h-3.5" />
                Melbourne, Victoria
              </div>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">
              Where We Work
            </h1>
            <p className="mt-3 text-neutral-300 max-w-xl">
              Servicing Melbourne's Bayside, Mornington Peninsula, and inner suburbs.
              VBA Licensed. Fixed prices. Free quotes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Wave divider */}
      <div className="overflow-hidden" style={{ backgroundColor: "#1a1a1a", marginBottom: -1 }}>
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ display: "block", height: 48 }} aria-hidden="true">
          <path d="M0,0 C360,48 1080,0 1440,48 L1440,48 L0,48 Z" fill="white" />
        </svg>
      </div>

      {/* ── Coverage intro ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — copy */}
            <motion.div {...fadeUp(0.1)}>
              <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: CHERRY }}>
                Coverage Area
              </span>
              <h2 className="mt-3 font-serif text-4xl font-bold text-neutral-900 leading-tight">
                Melbourne's South-East &amp; Inner Suburbs
              </h2>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                Based in Mentone East, Cherry Builds works across a wide stretch of Melbourne — from
                the heritage homes of Fitzroy and Albert Park down through Bayside, Frankston, and the
                full Mornington Peninsula.
              </p>
              <p className="mt-3 text-neutral-600 leading-relaxed">
                Every project gets the same VBA Licensed builder, the same fixed-price contract,
                and the same 30+ years of experience behind it regardless of suburb.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {SERVICES_SHORTLIST.map((s) => (
                  <div key={s} className="flex items-center gap-2 text-sm text-neutral-700">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: CHERRY }} />
                    {s}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl transition-all"
                  style={{ backgroundColor: CHERRY }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = CHERRY_HOVER)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = CHERRY)}
                >
                  Get a Free Quote <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="tel:0408827996"
                  className="inline-flex items-center gap-2 border border-neutral-200 hover:border-cherry-300 text-neutral-700 font-semibold px-6 py-3 rounded-xl transition-all"
                >
                  <Phone className="w-4 h-4" style={{ color: CHERRY }} />
                  0408 827 996
                </a>
              </div>
            </motion.div>

            {/* Right — SVG map */}
            <motion.div {...fadeUp(0.2)}>
              <div
                className="relative rounded-2xl overflow-hidden border border-neutral-200"
                style={{ height: 420, background: "linear-gradient(135deg, #fdf5f5 0%, #fce8e9 100%)" }}
              >
                <svg viewBox="0 0 400 420" className="absolute inset-0 w-full h-full" aria-hidden="true">
                  {/* Melbourne south-east region shape */}
                  <path
                    d="M60,80 Q120,55 200,85 Q280,115 340,95 Q365,160 355,225 Q345,285 305,330 Q265,370 205,380 Q145,390 105,350 Q65,310 52,248 Q38,185 60,80Z"
                    fill="rgba(163,52,62,0.07)" stroke="rgba(163,52,62,0.18)" strokeWidth="1.5"
                  />

                  {/* Region labels */}
                  <text x="60" y="130" fontSize="9" fill={CHERRY} fontWeight="600" fontFamily="Inter,sans-serif" opacity="0.7">INNER</text>
                  <text x="60" y="142" fontSize="9" fill={CHERRY} fontWeight="600" fontFamily="Inter,sans-serif" opacity="0.7">MELBOURNE</text>
                  <text x="165" y="200" fontSize="9" fill={CHERRY} fontWeight="600" fontFamily="Inter,sans-serif" opacity="0.7">BAYSIDE</text>
                  <text x="130" y="310" fontSize="9" fill={CHERRY} fontWeight="600" fontFamily="Inter,sans-serif" opacity="0.7">MORNINGTON</text>
                  <text x="130" y="322" fontSize="9" fill={CHERRY} fontWeight="600" fontFamily="Inter,sans-serif" opacity="0.7">PENINSULA</text>

                  {/* Inner Melbourne dots */}
                  {[
                    [95, 155, "Fitzroy"],
                    [105, 173, "Albert Park"],
                    [112, 191, "St Kilda"],
                    [118, 207, "South Yarra"],
                    [108, 225, "Port Melbourne"],
                    [125, 240, "Prahran"],
                  ].map(([cx, cy, label]) => (
                    <g key={label}>
                      <circle cx={cx} cy={cy} r="4" fill="#6b1f26" opacity="0.75" />
                      <text x={cx + 8} y={cy + 4} fontSize="7.5" fill="#374151" fontFamily="Inter,sans-serif">{label}</text>
                    </g>
                  ))}

                  {/* Bayside dots */}
                  {[
                    [170, 215, "Brighton"],
                    [175, 233, "Hampton"],
                    [178, 250, "Sandringham"],
                    [180, 268, "Cheltenham"],
                    [182, 285, "Beaumaris"],
                    [185, 302, "Mentone"],
                  ].map(([cx, cy, label]) => (
                    <g key={label}>
                      <circle cx={cx} cy={cy} r="4" fill={CHERRY} opacity="0.75" />
                      <text x={cx + 8} y={cy + 4} fontSize="7.5" fill="#374151" fontFamily="Inter,sans-serif">{label}</text>
                    </g>
                  ))}

                  {/* Peninsula dots */}
                  {[
                    [185, 318, "Frankston"],
                    [175, 337, "Seaford"],
                    [162, 355, "Langwarrin"],
                    [148, 372, "Mornington"],
                    [133, 355, "Mt Eliza"],
                    [155, 340, "Somerville"],
                  ].map(([cx, cy, label]) => (
                    <g key={label}>
                      <circle cx={cx} cy={cy} r="4" fill="#8a2a33" opacity="0.75" />
                      <text x={cx + 8} y={cy + 4} fontSize="7.5" fill="#374151" fontFamily="Inter,sans-serif">{label}</text>
                    </g>
                  ))}
                </svg>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 border border-neutral-100 text-xs space-y-1.5">
                  {[
                    { color: "#6b1f26", label: "Inner Melbourne" },
                    { color: CHERRY,    label: "Bayside" },
                    { color: "#8a2a33", label: "Mornington Peninsula" },
                  ].map(({ color, label }) => (
                    <div key={label} className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                      <span className="text-neutral-600 font-medium">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Area cards ── */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: CHERRY_LIGHT }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(163,52,62,0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <svg className="absolute top-0 left-0 w-full pointer-events-none" viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ height: 48 }} aria-hidden="true">
          <path d="M0,24 C240,48 480,0 720,24 C960,48 1200,0 1440,24 L1440,0 L0,0 Z" fill="white" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-full pointer-events-none" viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ height: 48 }} aria-hidden="true">
          <path d="M0,24 C240,0 480,48 720,24 C960,0 1200,48 1440,24 L1440,48 L0,48 Z" fill="white" />
        </svg>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp(0.1)} className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: CHERRY }}>Suburbs We Cover</span>
            <h2 className="mt-3 font-serif text-4xl font-bold text-neutral-900">Service Areas</h2>
            <p className="mt-3 text-neutral-500 max-w-lg mx-auto">
              Not sure if we cover your suburb? Give us a call — if you're in Melbourne we almost certainly do.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {AREAS.map((area, ai) => (
              <motion.div
                key={area.region}
                {...fadeUp(0.1 + ai * 0.1)}
                className="bg-white rounded-2xl border border-neutral-200 overflow-hidden"
                style={{ borderTop: `3px solid ${area.color}` }}
              >
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: area.color }}>
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-neutral-900">{area.region}</h3>
                  </div>
                  <div className="space-y-3">
                    {area.suburbs.map((sub) => (
                      <div key={sub.name} className="flex items-start gap-2.5">
                        <ChevronRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: area.color }} />
                        <div>
                          <div className="text-sm font-medium text-neutral-800">{sub.name}</div>
                          <div className="text-xs text-neutral-400 leading-snug">{sub.note}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent jobs ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp(0.1)} className="mb-10">
            <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: CHERRY }}>Recent Work</span>
            <h2 className="mt-3 font-serif text-4xl font-bold text-neutral-900">Jobs Near You</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RECENT_JOBS.map((job, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.1 + i * 0.07)}
                className="rounded-xl border border-neutral-200 p-5"
                style={{ borderTop: `3px solid ${CHERRY}` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: CHERRY }} />
                  <span className="font-semibold text-sm text-neutral-900">{job.suburb}</span>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed mb-2">{job.type || job.note}</p>
                <span className="text-xs font-medium" style={{ color: CHERRY }}>{job.year}</span>
              </motion.div>
            ))}
          </div>

          {/* Link to projects */}
          <motion.div {...fadeUp(0.2)} className="mt-8 text-center">
            <a
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: CHERRY }}
            >
              View our full project portfolio <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp(0.1)}>
            <h2 className="font-serif text-4xl font-bold text-white mb-4">
              In our area? Let's talk.
            </h2>
            <p className="text-neutral-400 mb-8 text-lg">
              Free quote, fixed price, VBA Licensed. No surprises.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-xl transition-all"
                style={{ backgroundColor: CHERRY }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = CHERRY_HOVER)}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = CHERRY)}
              >
                Get a Free Quote <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:0408827996"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all"
              >
                <Phone className="w-4 h-4" />
                0408 827 996
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
