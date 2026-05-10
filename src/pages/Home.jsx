import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, Mail, MapPin, ChevronDown, ChevronRight,
  Award, Check, ArrowRight, ExternalLink, Droplets, Shield,
} from "lucide-react";
import { SERVICES, PROJECTS, TESTIMONIALS, FAQS, CREDENTIALS } from "../data/index.js";
import RevealText from "../components/RevealText.jsx";
import CountUp from "../components/CountUp.jsx";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: "#1a1a1a" }}>
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)", opacity: 0.98 }} />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(255,255,255,1) 60px,rgba(255,255,255,1) 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(255,255,255,1) 60px,rgba(255,255,255,1) 61px)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium mb-8 tracking-wide border"
          style={{ backgroundColor: "rgba(163,52,62,0.2)", borderColor: "rgba(163,52,62,0.4)", color: "#f49ba0" }}
        >
          <Award className="w-4 h-4" />
          VBA Licensed · Master Builders Member · 30+ Years Experience
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.08] mb-6 tracking-tight"
        >
          Melbourne's Trusted
          <span className="block mt-1" style={{ color: "#a3343e" }}>Renovation Specialists</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          From full home renovations to kitchens, bathrooms, decking, and landscaping —
          Cherry Builds delivers expert craftsmanship across Melbourne's Bayside and Mornington Peninsula.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-xl"
            style={{ backgroundColor: "#a3343e" }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#8a2b34"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#a3343e"}
          >
            Get a Free Quote
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="tel:0438499146"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all backdrop-blur-sm"
          >
            <Phone className="w-4 h-4" />
            0438 499 146
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-20 grid grid-cols-3 gap-6 max-w-md mx-auto"
        >
          {[
            { val: "30+", label: "Years Experience" },
            { val: "500+", label: "Projects Completed" },
            { val: "100%", label: "Licensed & Insured" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <CountUp value={s.val} className="font-serif text-3xl font-bold" style={{ color: "#a3343e" }} />
              <div className="text-xs text-neutral-400 mt-1.5 leading-snug">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-500"
      >
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </motion.div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp(0.1)}>
            <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#a3343e" }}>About Us</span>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-neutral-900 leading-tight">
              Building Melbourne homes since 2007
            </h2>
            <p className="mt-5 text-neutral-600 leading-relaxed">
              Originally established as Cherry Properties in 2007, we rebranded to Cherry Building and
              Construction Services in 2020 — bringing the same trusted team and quality workmanship
              that Melbourne homeowners have relied on for decades.
            </p>
            <p className="mt-4 text-neutral-600 leading-relaxed">
              With over 30 years of industry experience, our portfolio spans hundreds of bathroom
              renovations, custom kitchens, and outdoor living projects across Melbourne's Bayside,
              inner city, and the Mornington Peninsula.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {CREDENTIALS.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-sm text-neutral-700">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#fdf2f3", border: "1px solid #fce4e5" }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: "#a3343e" }} />
                  </div>
                  {text}
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              style={{ backgroundColor: "#a3343e" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#8a2b34"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#a3343e"}
            >
              Talk to Us
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.25)} className="grid grid-cols-2 gap-4">
            {[
              { val: "30+", label: "Years in the industry" },
              { val: "2007", label: "Established" },
              { val: "500+", label: "Projects completed" },
              { val: "100%", label: "Customer satisfaction focus" },
            ].map((s) => (
              <div key={s.label} className="bg-white border border-neutral-200 rounded-2xl p-8 text-center shadow-sm" style={{ backgroundColor: "#ededed" }}>
                <CountUp value={s.val} className="font-serif text-4xl font-bold" style={{ color: "#a3343e" }} />
                <div className="text-sm text-neutral-500 mt-2 leading-snug">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="services" className="py-24" style={{ backgroundColor: "#ededed" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div {...fadeUp(0.1)} className="text-center mb-14">
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#a3343e" }}>What We Do</span>
          <RevealText className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-neutral-900">Our Services</RevealText>
          <p className="mt-4 text-neutral-500 max-w-xl mx-auto">
            From a single bathroom through to a full home renovation — we manage every trade in-house.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.title}
              {...fadeUp(0.05 + i * 0.04)}
              whileHover={{ y: -4 }}
              className="group bg-white border border-neutral-200 rounded-2xl p-6 hover:shadow-md hover:border-cherry-100 transition-all"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#fdf2f3", border: "1px solid #fce4e5" }}>
                <svc.icon className="w-5 h-5" style={{ color: "#a3343e" }} />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2 text-sm">{svc.title}</h3>
              <p className="text-xs text-neutral-500 leading-relaxed mb-4">{svc.desc}</p>
              <Link
                to={`/services/${svc.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold transition-colors group-hover:gap-1.5"
                style={{ color: "#a3343e" }}
              >
                Learn More
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects ────────────────────────────────────────────────────────────────

function Projects() {
  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div {...fadeUp(0.1)} className="text-center mb-14">
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#a3343e" }}>Portfolio</span>
          <RevealText className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-neutral-900">Recent Projects</RevealText>
          <p className="mt-4 text-neutral-500 max-w-xl mx-auto">
            A selection of completed renovations across Melbourne's Bayside and Mornington Peninsula.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.slug}
              {...fadeUp(0.05 + i * 0.06)}
              className="group bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="h-48 relative overflow-hidden" style={{ backgroundColor: "#ededed" }}>
                <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🏗</div>
                    <div className="text-xs">Photo coming soon</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-neutral-900">{p.title}</h3>
                    <div className="flex items-center gap-1 text-xs mt-0.5" style={{ color: "#a3343e" }}>
                      <MapPin className="w-3 h-3" />
                      {p.location}
                    </div>
                  </div>
                  {p.value && (
                    <span className="text-xs text-neutral-400 font-medium whitespace-nowrap">{p.value}</span>
                  )}
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed mb-4">{p.summary}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "#fdf2f3", color: "#a3343e", border: "1px solid #fce4e5" }}>
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/projects/${p.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors group/link"
                  style={{ color: "#a3343e" }}
                >
                  View Project
                  <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ────────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <section className="py-24" style={{ backgroundColor: "#1a1a1a" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div {...fadeUp(0.1)} className="text-center mb-14">
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#f49ba0" }}>Reviews</span>
          <RevealText className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-white">What Our Clients Say</RevealText>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              {...fadeUp(0.05 + i * 0.07)}
              className="rounded-2xl p-6 border"
              style={{ backgroundColor: "#2a2a2a", borderColor: "rgba(255,255,255,0.08)" }}
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
              </div>
              <p className="text-neutral-300 text-sm leading-relaxed mb-5">"{t.text}"</p>
              <div>
                <div className="font-semibold text-white text-sm">{t.name}</div>
                <div className="text-xs text-neutral-500 mt-0.5">{t.suburb}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── AquaTight ───────────────────────────────────────────────────────────────

function AquaTight() {
  return (
    <section id="aquatight" className="py-24" style={{ backgroundColor: "#ededed" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #a3343e 0%, #72232b 100%)" }}>
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <motion.div {...fadeUp(0.1)}>
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-3 py-1 text-sm font-medium mb-5">
                <Droplets className="w-4 h-4" />
                Certified Division
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold leading-tight mb-5">
                Aqua Tight Waterproofing
              </h2>
              <p className="text-red-100 leading-relaxed mb-5">
                Our certified waterproofing division — Aqua Tight — provides AS3740-compliant waterproofing
                for showers, bathrooms, balconies, and all domestic wet areas. All work comes with
                certificates and warranties on completion.
              </p>
              <ul className="space-y-2.5 mb-8">
                {[
                  "Shower & bathroom waterproofing",
                  "Balcony & outdoor wet areas",
                  "Versipave Pod System for balconies",
                  "Rectification of failed waterproofing",
                  "Free inspections & obligation-free quotes",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-red-100">
                    <Check className="w-4 h-4 text-red-200 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="https://www.aquatightwaterproofing.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white font-semibold px-6 py-3 rounded-xl hover:bg-red-50 transition-colors shadow-lg"
                style={{ color: "#a3343e" }}
              >
                Visit Aqua Tight
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div {...fadeUp(0.25)} className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, title: "AS3740 Compliant", desc: "All work meets Australian Standards" },
                { icon: Award, title: "Certified Team", desc: "Licensed waterproofers & tilers" },
                { icon: Check, title: "Warranties Issued", desc: "Certificates on every job" },
                { icon: Droplets, title: "All Wet Areas", desc: "Showers, balconies, laundries" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white/10 border border-white/20 rounded-xl p-4">
                  <Icon className="w-5 h-5 text-red-200 mb-2" />
                  <div className="font-semibold text-white text-sm">{title}</div>
                  <div className="text-xs text-red-200 mt-0.5">{desc}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FAQ() {
  const [open, setOpen] = React.useState(null);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div {...fadeUp(0.1)} className="text-center mb-14">
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#a3343e" }}>FAQ</span>
          <RevealText className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-neutral-900">Common Questions</RevealText>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.05 + i * 0.04)}
              className="border border-neutral-200 rounded-2xl overflow-hidden"
              style={{ backgroundColor: "#ededed" }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-medium text-neutral-900">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                  style={{ color: "#a3343e" }}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm text-neutral-500 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

function Contact() {
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData(e.target);
    await fetch(e.target.action, { method: "POST", body: data, headers: { Accept: "application/json" } });
    setSubmitting(false);
    setSubmitted(true);
  };

  const inputClass = "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-cherry-600";

  return (
    <section id="contact" className="py-24" style={{ backgroundColor: "#ededed" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-14 items-start">
          <motion.div {...fadeUp(0.1)}>
            <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#a3343e" }}>Get in Touch</span>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-neutral-900 leading-tight">
              Ready to start your renovation?
            </h2>
            <p className="mt-5 text-neutral-500 leading-relaxed">
              Tell us about your project and we'll get back to you with an obligation-free quote.
              We service Melbourne's Bayside suburbs, Mornington Peninsula, and inner-city areas.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: Phone, label: "Phone", value: "0438 499 146", href: "tel:0438499146" },
                { icon: Phone, label: "Alt Phone", value: "0400 210 105", href: "tel:0400210105" },
                { icon: Mail, label: "Email", value: "info@cherrybuilds.com.au", href: "mailto:info@cherrybuilds.com.au" },
                { icon: MapPin, label: "Postal", value: "PO BOX 3109, Mentone East VIC 3194", href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#fdf2f3", border: "1px solid #fce4e5" }}>
                    <Icon className="w-4 h-4" style={{ color: "#a3343e" }} />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400 font-medium">{label}</div>
                    {href ? (
                      <a href={href} className="text-sm text-neutral-700 font-medium transition-colors hover:text-cherry-600">{value}</a>
                    ) : (
                      <span className="text-sm text-neutral-700">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm text-neutral-500">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              <a href="https://www.facebook.com/cherrybuilds" target="_blank" rel="noopener noreferrer" className="hover:text-cherry-600 transition-colors">Follow us on Facebook</a>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-300 text-xs text-neutral-400 space-y-0.5">
              <div>ABN: 60 122 151 679</div>
              <div>VBA Licence: DB – 71349</div>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: "#fdf2f3", border: "1px solid #fce4e5" }}>
                  <Check className="w-7 h-7" style={{ color: "#a3343e" }} />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">Enquiry sent!</h3>
                <p className="text-neutral-500 text-sm">Thanks for reaching out — we'll be in touch shortly with your obligation-free quote.</p>
              </div>
            ) : (
              <form action="https://formspree.io/f/placeholder" method="POST" onSubmit={handleSubmit} className="space-y-4 text-sm">
                <input type="text" name="_gotcha" className="hidden" />
                <input type="hidden" name="_subject" value="New enquiry from Cherry Builds website" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cb-first" className="block text-xs font-semibold text-neutral-600 mb-1">First name</label>
                    <input id="cb-first" type="text" name="first_name" required className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="cb-last" className="block text-xs font-semibold text-neutral-600 mb-1">Last name</label>
                    <input id="cb-last" type="text" name="last_name" required className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor="cb-email" className="block text-xs font-semibold text-neutral-600 mb-1">Email</label>
                  <input id="cb-email" type="email" name="email" required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="cb-phone" className="block text-xs font-semibold text-neutral-600 mb-1">Phone</label>
                  <input id="cb-phone" type="tel" name="phone" required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="cb-suburb" className="block text-xs font-semibold text-neutral-600 mb-1">Suburb / location of work</label>
                  <input id="cb-suburb" type="text" name="suburb" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="cb-message" className="block text-xs font-semibold text-neutral-600 mb-1">Tell us about your project</label>
                  <textarea id="cb-message" name="message" rows="4" className={`${inputClass} resize-none`} />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60"
                  style={{ backgroundColor: "#a3343e" }}
                  onMouseEnter={e => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = "#8a2b34")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#a3343e")}
                >
                  <Mail className="w-4 h-4" />
                  {submitting ? "Sending…" : "Send Enquiry"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Floating call ────────────────────────────────────────────────────────────

function FloatingCall() {
  return (
    <motion.a
      href="tel:0438499146"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-20 right-5 z-50 md:hidden flex items-center gap-2 text-white font-semibold text-sm px-4 py-3 rounded-full shadow-lg"
      style={{ backgroundColor: "#a3343e" }}
    >
      <Phone className="w-4 h-4" />
      Call Now
    </motion.a>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Testimonials />
      <AquaTight />
      <FAQ />
      <Contact />
      <FloatingCall />
    </>
  );
}
