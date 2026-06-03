import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Phone, Mail, MapPin, ChevronDown, ChevronRight, ChevronLeft, X,
  Award, Check, ArrowRight, ExternalLink, Droplets, Shield,
  Hammer, SlidersHorizontal, LayoutGrid, Eye, ThumbsUp, Star,
} from "lucide-react";
import { SERVICES, PROJECTS, TESTIMONIALS, FAQS, CREDENTIALS } from "../data/index.js";
import RevealText from "../components/RevealText.jsx";
import CountUp from "../components/CountUp.jsx";
import TrustBar from "../components/TrustBar.jsx";
import TestimonialsCarousel from "../components/TestimonialsCarousel.jsx";

// ─── Motion helpers ───────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const slideUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Schema.org Structured Data ───────────────────────────────────────────────
// seo-schema audit: zero schema on live site — GeneralContractor + Service + AggregateRating added.
// FAQPage: included for AI/LLM citation benefit (ChatGPT, Perplexity, AI Overviews)
// — NOT for Google rich results (commercial site restriction, Aug 2023).

const schemaLocalBusiness = {
  "@context": "https://schema.org",
  "@type": ["GeneralContractor", "LocalBusiness"],
  "@id": "https://cherrybuilds.com.au/#business",
  name: "Cherry Builds",
  legalName: "Cherry Building and Construction Services",
  description:
    "VBA Licensed renovation builder in Melbourne. Kitchens, bathrooms, full home renovations, decking and waterproofing across Bayside and the Mornington Peninsula. 30+ years experience.",
  url: "https://cherrybuilds.com.au",
  telephone: "+61438499146",
  email: "info@cherrybuilds.com.au",
  address: {
    "@type": "PostalAddress",
    streetAddress: "PO BOX 3109",
    addressLocality: "Mentone East",
    addressRegion: "VIC",
    postalCode: "3194",
    addressCountry: "AU",
  },
  geo: { "@type": "GeoCoordinates", latitude: -37.9736, longitude: 145.0724 },
  areaServed: [
    { "@type": "City", name: "Melbourne" },
    { "@type": "AdministrativeArea", name: "Bayside, Victoria" },
    { "@type": "AdministrativeArea", name: "Mornington Peninsula" },
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "licence",
    name: "VBA Building Practitioner Licence",
    identifier: "DB-71349",
    recognizedBy: { "@type": "GovernmentOrganization", name: "Victorian Building Authority" },
  },
  memberOf: { "@type": "Organization", name: "Master Builders Association of Victoria" },
  foundingDate: "2007",
  identifier: { "@type": "PropertyValue", name: "ABN", value: "60 122 151 679" },
  image: "https://cherrybuilds.com.au/og-image.jpg",
  logo: { "@type": "ImageObject", url: "https://cherrybuilds.com.au/logos/cherry-builds-navbar.png" },
  sameAs: ["https://www.facebook.com/cherrybuilds"],
  priceRange: "$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "21",
    reviewCount: "21",
  },
};

const schemaServices = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://cherrybuilds.com.au/#services",
  name: "Renovation Services by Cherry Builds",
  url: "https://cherrybuilds.com.au/#services",
  numberOfItems: SERVICES.length,
  itemListElement: SERVICES.map((svc, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      "@id": `https://cherrybuilds.com.au/services/${svc.slug}`,
      name: svc.title,
      description: svc.desc,
      url: `https://cherrybuilds.com.au/services/${svc.slug}`,
      provider: { "@id": "https://cherrybuilds.com.au/#business" },
      areaServed: "Melbourne, Victoria, Australia",
      serviceType: "Home Renovation",
    },
  })),
};

const schemaFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://cherrybuilds.com.au/#faq",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

// ─── Design tokens ────────────────────────────────────────────────────────────
const CHERRY  = "#c73e49";
const CHERRY_DIM = "#a3343e";
const GOLD    = "#d4a853";
const DARK_BASE   = "#0d0d0d";
const DARK_1  = "#111111";
const DARK_2  = "#141414";
const DARK_3  = "#1a1a1a";

const glassCard = {
  background: "rgba(255,255,255,0.035)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const glassCardHover = {
  background: "rgba(255,255,255,0.055)",
  border: `1px solid rgba(199,62,73,0.3)`,
  boxShadow: "0 0 28px rgba(199,62,73,0.12), 0 8px 32px rgba(0,0,0,0.5)",
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 140]);
  const [cardStyle, setCardStyle] = React.useState({});

  return (
    <section
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      style={{ backgroundColor: DARK_BASE }}
    >
      {/* Full-bleed photo with parallax */}
      <motion.img
        src="/images/melbourne-home-renovations-cherry-builds.jpg"
        alt="Cherry Builds Melbourne renovation"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ y: bgY, scale: 1.06 }}
      />

      {/* Gradient: heavy left, photo shows on right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(13,13,13,0.97) 0%, rgba(13,13,13,0.90) 28%, rgba(13,13,13,0.60) 56%, rgba(13,13,13,0.16) 80%, transparent 100%)",
        }}
      />

      {/* Radial cherry glow behind the text area */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 26% 52%, rgba(199,62,73,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Bottom vignette */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(13,13,13,0.75), transparent)" }}
      />

      {/* Left-aligned content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full pt-28 pb-20 sm:pt-32 sm:pb-28">
        <div className="max-w-[560px]">

          {/* Gold credential badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide mb-7 border"
            style={{ backgroundColor: "rgba(212,168,83,0.1)", borderColor: "rgba(212,168,83,0.28)", color: GOLD }}
          >
            <Award className="w-3.5 h-3.5" />
            VBA Licensed · Master Builders · 30+ Years
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-bold text-white leading-[1.04] tracking-tight mb-5"
            style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.25rem)" }}
          >
            Melbourne&rsquo;s Trusted
            <br />
            <span
              style={{
                color: CHERRY,
                textShadow: `0 0 35px rgba(199,62,73,0.45), 0 0 70px rgba(199,62,73,0.18)`,
              }}
            >
              Renovation
            </span>
            {" Specialists"}
          </motion.h1>

          {/* Gold rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.34 }}
            className="mb-6 origin-left"
            style={{ width: 64, height: 2, background: `linear-gradient(to right, ${GOLD}, rgba(212,168,83,0.15), transparent)` }}
          />

          {/* Subtext — 19 words */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg leading-relaxed mb-10 max-w-md"
            style={{ color: "rgba(232,232,232,0.72)" }}
          >
            Kitchens, bathrooms, full home renovations and outdoor living.
            Expert craftsmanship across Bayside and the Mornington Peninsula.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.50, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3.5"
          >
            <a
              href="#contact"
              className="glow-cherry inline-flex items-center justify-center gap-2 text-white font-semibold px-7 py-3.5 rounded-xl transition-all"
              style={{ backgroundColor: CHERRY_DIM }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#8a2b34")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = CHERRY_DIM)}
            >
              Get a Free Quote
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:0438499146"
              className="inline-flex items-center justify-center gap-2 border text-white font-semibold px-7 py-3.5 rounded-xl transition-all"
              style={{ backgroundColor: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.18)" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.11)"; e.currentTarget.style.borderColor = `rgba(212,168,83,0.4)`;}}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; }}
            >
              <Phone className="w-4 h-4" />
              0438 499 146
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
        style={{ color: "rgba(255,255,255,0.25)" }}
      >
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </motion.div>
    </section>
  );
}

// ─── Stats Strip ──────────────────────────────────────────────────────────────

function StatsStrip() {
  const stats = [
    { val: "30+",  label: "Years of industry experience", sub: "Est. 1994",    color: GOLD },
    { val: "500+", label: "Completed renovations",        sub: "Melbourne-wide", color: CHERRY },
    { val: "100%", label: "Licensed, insured & certified", sub: "VBA DB-71349", color: GOLD },
  ];

  return (
    <section className="py-12 sm:py-16" style={{ backgroundColor: DARK_1, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-3 gap-4 sm:gap-12">
          {stats.map((s, i) => (
            <motion.div key={s.label} {...fadeUp(i * 0.07)} className="border-l-2 pl-4 sm:pl-7" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              <CountUp
                value={s.val}
                className="font-serif font-bold leading-none block"
                style={{ color: s.color, fontSize: "clamp(1.6rem, 3.8vw, 2.6rem)" }}
              />
              <p className="text-[11px] sm:text-sm mt-1.5 leading-snug" style={{ color: "rgba(232,232,232,0.55)" }}>{s.label}</p>
              <p className="hidden sm:block text-[10px] mt-0.5 font-mono tracking-wider" style={{ color: "rgba(232,232,232,0.28)" }}>{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
// Right side: editorial stat display with gold→cherry gradient on the feature number

function About() {
  return (
    <section id="about" className="py-24" style={{ backgroundColor: DARK_BASE }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: copy + credentials */}
          <motion.div {...fadeUp(0.1)}>
            {/* Gold divider */}
            <div className="mb-5" style={{ width: 48, height: 2, background: `linear-gradient(to right, ${GOLD}, transparent)` }} />
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Building Melbourne
              <br />homes since 2007
            </h2>
            <p className="leading-relaxed mb-4" style={{ color: "rgba(232,232,232,0.6)" }}>
              Originally established as Cherry Properties in 2007, we rebranded to Cherry Building
              and Construction Services in 2020 — bringing the same trusted team and quality
              workmanship that Melbourne homeowners have relied on for decades.
            </p>
            <p className="leading-relaxed mb-8" style={{ color: "rgba(232,232,232,0.6)" }}>
              With over 30 years of industry experience, our portfolio spans hundreds of full
              renovations, period homes, custom kitchens, and outdoor living projects across
              Bayside and the Mornington Peninsula.
            </p>

            <div className="grid grid-cols-2 gap-2.5 mb-8">
              {CREDENTIALS.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(232,232,232,0.75)" }}>
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.22)" }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: GOLD }} />
                  </div>
                  {text}
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="glow-cherry inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl transition-all"
              style={{ backgroundColor: CHERRY_DIM }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#8a2b34")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = CHERRY_DIM)}
            >
              Talk to Us
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Right: editorial stats with gradient number */}
          <motion.div {...fadeUp(0.25)}>
            <div className="pb-8 mb-8" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <CountUp
                value="30+"
                className="font-serif font-bold leading-none tracking-tight block"
                style={{
                  fontSize: "clamp(4rem, 8vw, 6.5rem)",
                  background: `linear-gradient(135deg, ${GOLD} 0%, ${CHERRY} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              />
              <p className="text-base mt-3" style={{ color: "rgba(232,232,232,0.55)" }}>years of industry expertise</p>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              {[
                { val: "2007", label: "Year established", color: GOLD },
                { val: "500+", label: "Projects completed", color: CHERRY },
              ].map(s => (
                <div key={s.label}>
                  <CountUp
                    value={s.val}
                    className="font-serif font-bold leading-none block"
                    style={{ color: s.color, fontSize: "clamp(2rem, 4vw, 2.75rem)" }}
                  />
                  <p className="text-sm mt-2 leading-snug" style={{ color: "rgba(232,232,232,0.5)" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose ───────────────────────────────────────────────────────────────
// Horizontal numbered editorial rows on dark

const WHY_ITEMS = [
  { icon: Hammer,          title: "Expert Craftsmanship",               desc: "Our team of seasoned professionals brings years of experience and expertise to every project, ensuring impeccable results that exceed your expectations. From concept to completion, trust Cherry Builds to deliver excellence at every step." },
  { icon: SlidersHorizontal, title: "Tailored Solutions for Every Budget", desc: "At Cherry Builds, we believe exceptional quality should be accessible to all. We offer personalised renovation solutions designed to accommodate a range of budgets, whether a modest update or a full-scale transformation." },
  { icon: LayoutGrid,      title: "Comprehensive Services",             desc: "From full home renovations to custom kitchen and bathroom remodels, Cherry Builds offers a comprehensive range of services including full project management. We handle every aspect of your project with precision and care." },
  { icon: Eye,             title: "Unmatched Attention to Detail",      desc: "We understand that the difference is in the details. That's why we take pride in our meticulous approach to every aspect of your project, ensuring every corner is crafted to perfection. No detail is overlooked." },
  { icon: ThumbsUp,        title: "Customer Satisfaction Guaranteed",   desc: "Your satisfaction is our top priority. We go above and beyond to ensure that you're thrilled with the results of your renovation, providing unparalleled service and support every step of the way." },
];

function WhyChoose() {
  return (
    <section className="py-24" style={{ backgroundColor: DARK_2 }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div {...fadeUp(0.05)} className="mb-14">
          <div className="mb-5" style={{ width: 48, height: 2, background: `linear-gradient(to right, ${GOLD}, transparent)` }} />
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight max-w-lg">
            Why Melbourne homeowners choose Cherry Builds
          </h2>
        </motion.div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          {WHY_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              {...fadeUp(0.04 + i * 0.05)}
              className="py-7 grid md:grid-cols-[2rem_220px_1fr] gap-4 md:gap-10 items-start"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              {/* Sequence number */}
              <span className="hidden md:block text-xs font-mono tabular-nums select-none pt-1.5" style={{ color: "rgba(212,168,83,0.4)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* Icon + title */}
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: "rgba(199,62,73,0.14)", border: "1px solid rgba(199,62,73,0.22)" }}
                >
                  <item.icon className="w-4 h-4" style={{ color: "#f49ba0" }} />
                </div>
                <h3 className="font-semibold text-white text-sm sm:text-base leading-snug pt-1">{item.title}</h3>
              </div>
              {/* Description */}
              <p className="text-sm leading-relaxed" style={{ color: "rgba(232,232,232,0.52)" }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
// Tiered dark-glass layout: 1 featured + 3 mid + 4 compact

function ServiceCard({ svc, size = "mid" }) {
  const [hovered, setHovered] = React.useState(false);

  const imgHeight = size === "mid" ? "h-44" : "h-24";
  const iconSize  = size === "mid" ? "w-8 h-8 rounded-lg" : "w-6 h-6 rounded-md";
  const iconInner = size === "mid" ? "w-4 h-4" : "w-3 h-3";
  const rounding  = size === "mid" ? "rounded-2xl" : "rounded-xl";

  return (
    <motion.div
      variants={slideUp}
      whileHover={{ y: size === "mid" ? -5 : -3 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group"
    >
      <Link
        to={`/services/${svc.slug}`}
        className={`flex flex-col h-full ${rounding} overflow-hidden transition-all duration-300`}
        style={hovered ? glassCardHover : glassCard}
      >
        <div className={`${imgHeight} relative overflow-hidden flex-shrink-0`}>
          {svc.heroImage && (
            <img
              src={svc.heroImage}
              alt={svc.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />
          <div className={`absolute bottom-2.5 left-3 ${iconSize} flex items-center justify-center`} style={{ backgroundColor: CHERRY_DIM }}>
            <svc.icon className={`${iconInner} text-white`} />
          </div>
        </div>
        <div className={`flex flex-col flex-1 ${size === "mid" ? "p-5" : "p-4"}`}>
          <h3 className={`font-semibold text-white ${size === "mid" ? "text-sm mb-2" : "text-xs mb-1.5"}`}>{svc.title}</h3>
          <p className={`leading-relaxed flex-1 ${size === "mid" ? "text-xs mb-4" : "text-[11px] mb-3"}`} style={{ color: "rgba(232,232,232,0.48)" }}>{svc.desc}</p>
          <div className="inline-flex items-center gap-1 font-semibold" style={{ color: CHERRY, fontSize: size === "mid" ? 12 : 11 }}>
            Learn More
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function Services() {
  const [featured, ...rest] = SERVICES;
  const midTier  = rest.slice(0, 3);
  const baseTier = rest.slice(3);
  const [featHovered, setFeatHovered] = React.useState(false);

  return (
    <section id="services" className="py-24" style={{ backgroundColor: DARK_1 }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8">

        {/* Header */}
        <motion.div {...fadeUp(0.05)} className="mb-12">
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD }}>What We Do</span>
          <RevealText className="mt-2 font-serif text-4xl sm:text-5xl font-bold text-white">Our Services</RevealText>
          <p className="mt-3 text-sm sm:text-base max-w-md" style={{ color: "rgba(232,232,232,0.5)" }}>
            From a single bathroom to a complete home transformation — one team manages every trade.
          </p>
        </motion.div>

        {/* Featured: Full Home Renovations */}
        <motion.div {...fadeUp(0.1)} className="mb-5">
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onHoverStart={() => setFeatHovered(true)}
            onHoverEnd={() => setFeatHovered(false)}
            className="group"
          >
            <Link
              to={`/services/${featured.slug}`}
              className="flex flex-col md:flex-row rounded-2xl overflow-hidden transition-all duration-300"
              style={featHovered
                ? { ...glassCardHover, boxShadow: "0 0 40px rgba(199,62,73,0.15), 0 12px 40px rgba(0,0,0,0.6)" }
                : { ...glassCard }
              }
            >
              <div className="md:w-[52%] h-64 md:h-auto min-h-[260px] relative overflow-hidden flex-shrink-0">
                <img
                  src={featured.heroImage}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.2), transparent 60%)" }} />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10 md:w-[48%]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: CHERRY_DIM }}>
                  <featured.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-[11px] font-bold tracking-[0.16em] uppercase mb-2" style={{ color: GOLD }}>Flagship Service</p>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight mb-3">{featured.title}</h3>
                <p className="text-sm sm:text-base leading-relaxed mb-6 max-w-sm" style={{ color: "rgba(232,232,232,0.58)" }}>{featured.desc}</p>
                <div className="inline-flex items-center gap-2 font-semibold text-sm transition-all group-hover:gap-3" style={{ color: CHERRY }}>
                  Explore Service
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Mid tier: 3-col */}
        <motion.div className="grid sm:grid-cols-3 gap-4 mb-4" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
          {midTier.map(svc => <ServiceCard key={svc.title} svc={svc} size="mid" />)}
        </motion.div>

        {/* Base tier: 4-col compact */}
        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
          {baseTier.map(svc => <ServiceCard key={svc.title} svc={svc} size="compact" />)}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Photo Gallery ────────────────────────────────────────────────────────────

const GALLERY_PHOTOS = [
  { src: "/images/melbourne-bathroom-renovation-shower.jpg",          alt: "Herringbone brass bathroom, Marina Rd" },
  { src: "/images/melbourne-kitchen-renovation-island-bench.jpg",     alt: "Kitchen island bench, Brighton" },
  { src: "/images/melbourne-full-home-renovation-living-wide.jpg",    alt: "Open plan kitchen and living, Brighton" },
  { src: "/images/melbourne-bathroom-tiling-mosaic-shower.jpg",       alt: "Mosaic tile shower, Albert Park" },
  { src: "/images/melbourne-full-home-renovation-living-room.jpg",    alt: "Living room with fireplace, Brighton" },
  { src: "/images/melbourne-kitchen-renovation-splashback-tiles.jpg", alt: "Patchwork splashback kitchen, Albert Park" },
  { src: "/images/melbourne-bathroom-renovation-vanity.jpg",          alt: "Double vanity bathroom, Hampton" },
  { src: "/images/melbourne-kitchen-renovation-albert-park.jpg",      alt: "White kitchen renovation, Albert Park" },
  { src: "/images/melbourne-kitchen-renovation-dining.jpg",           alt: "Kitchen and dining area, Brighton" },
  { src: "/images/melbourne-home-renovation-entry.jpg",               alt: "Herringbone entry tiling, Mentone" },
  { src: "/images/melbourne-bathroom-renovation-frameless-shower.jpg", alt: "Frameless glass shower, Hampton" },
  { src: "/images/melbourne-timber-decking-sandringham.jpg",          alt: "Jarrah timber decking, Sandringham" },
  { src: "/images/melbourne-living-room-renovation-albert-park.jpg",  alt: "Living room renovation, Albert Park" },
  { src: "/images/melbourne-kitchen-renovation-wide-angle.jpg",       alt: "Kitchen renovation wide view, Brighton" },
  { src: "/images/melbourne-balcony-waterproofing-tiling.jpg",        alt: "Balcony waterproofing, Hampton" },
  { src: "/images/melbourne-kitchen-renovation-galley-white.jpg",     alt: "White galley kitchen, Toorak" },
  { src: "/images/melbourne-kitchen-renovation-open-plan.jpg",        alt: "Open plan kitchen, Brighton" },
  { src: "/images/melbourne-renovation-laundry-white-cabinetry.jpg",  alt: "White cabinetry laundry, Mentone" },
];

function PhotoGallery() {
  const [lightboxIdx, setLightboxIdx] = React.useState(null);
  const count = GALLERY_PHOTOS.length;

  React.useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft")  setLightboxIdx(i => (i - 1 + count) % count);
      if (e.key === "ArrowRight") setLightboxIdx(i => (i + 1) % count);
      if (e.key === "Escape")     setLightboxIdx(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx, count]);

  return (
    <section id="gallery" className="py-24" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div {...fadeUp(0.1)} className="mb-12">
          <div className="mb-5" style={{ width: 48, height: 2, background: `linear-gradient(to right, ${GOLD}, transparent)` }} />
          <RevealText className="font-serif text-4xl sm:text-5xl font-bold text-white">Our Work</RevealText>
          <p className="mt-4 max-w-xl text-sm sm:text-base" style={{ color: "rgba(232,232,232,0.5)" }}>
            Real projects, real results — kitchens, bathrooms, full homes and outdoor living
            across Melbourne&rsquo;s Bayside and Mornington Peninsula.
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.15)} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2.5">
          {GALLERY_PHOTOS.map((photo, i) => (
            <div
              key={i}
              className="aspect-[4/3] cursor-pointer group relative overflow-hidden rounded-xl"
              onClick={() => setLightboxIdx(i)}
              style={{ border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                style={{ background: "rgba(0,0,0,0)", }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(13,13,13,0.45)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0)"}
              >
                <Eye className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: "rgba(8,8,8,0.97)" }}
            onClick={() => setLightboxIdx(null)}
          >
            <button className="absolute top-4 right-4 p-2 rounded-full transition-colors" style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
              onClick={e => { e.stopPropagation(); setLightboxIdx(null); }}>
              <X className="w-5 h-5" />
            </button>
            <button className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full transition-colors" style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
              onClick={e => { e.stopPropagation(); setLightboxIdx(i => (i - 1 + count) % count); }}>
              <ChevronLeft className="w-6 h-6" />
            </button>
            <motion.img key={lightboxIdx} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.18 }}
              src={GALLERY_PHOTOS[lightboxIdx].src} alt={GALLERY_PHOTOS[lightboxIdx].alt}
              className="max-h-[88vh] max-w-[88vw] object-contain rounded-lg shadow-2xl"
              onClick={e => e.stopPropagation()}
            />
            <button className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full transition-colors" style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
              onClick={e => { e.stopPropagation(); setLightboxIdx(i => (i + 1) % count); }}>
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm tabular-nums select-none" style={{ color: "rgba(255,255,255,0.3)" }}>
              {lightboxIdx + 1} / {count}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

function Projects() {
  return (
    <section id="projects" className="py-24" style={{ backgroundColor: DARK_BASE }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div {...fadeUp(0.1)} className="mb-12">
          <div className="mb-5" style={{ width: 48, height: 2, background: `linear-gradient(to right, ${CHERRY}, transparent)` }} />
          <RevealText className="font-serif text-4xl sm:text-5xl font-bold text-white">Recent Projects</RevealText>
          <p className="mt-4 text-sm sm:text-base max-w-lg" style={{ color: "rgba(232,232,232,0.5)" }}>
            A selection of completed renovations across Melbourne&rsquo;s Bayside and Mornington Peninsula.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {PROJECTS.map((p) => (
            <motion.div
              key={p.slug}
              variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                e.currentTarget.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${y * -6}deg) translateZ(6px)`;
                e.currentTarget.style.boxShadow = `0 0 32px rgba(199,62,73,0.16), ${x * 12}px ${y * 12}px 40px rgba(0,0,0,0.55)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "perspective(800px) rotateY(0) rotateX(0) translateZ(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
              className="group"
              style={{ transformStyle: "preserve-3d", transition: "transform 0.22s ease, box-shadow 0.22s ease" }}
            >
              <Link
                to={`/projects/${p.slug}`}
                className="flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300"
                style={glassCard}
              >
                <div className="h-48 relative overflow-hidden">
                  {p.image ? (
                    <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ color: "rgba(232,232,232,0.25)" }}>
                      <div className="text-center text-xs">Photo coming soon</div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-white">{p.title}</h3>
                      <div className="flex items-center gap-1 text-xs mt-0.5" style={{ color: CHERRY }}>
                        <MapPin className="w-3 h-3" />{p.location}
                      </div>
                    </div>
                    {p.value && <span className="text-xs font-medium" style={{ color: "rgba(232,232,232,0.35)" }}>{p.value}</span>}
                  </div>
                  <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: "rgba(232,232,232,0.5)" }}>{p.summary}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags.map(t => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(199,62,73,0.12)", color: "#f49ba0", border: "1px solid rgba(199,62,73,0.22)" }}>{t}</span>
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2 transition-all" style={{ color: CHERRY }}>
                    View Project <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <section className="py-24" style={{ backgroundColor: DARK_2 }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div {...fadeUp(0.1)} className="mb-14">
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD }}>Client Reviews</span>
          <RevealText className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-white">What Our Clients Say</RevealText>
          {/* 5-star row */}
          <div className="flex items-center gap-1.5 mt-4">
            {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" style={{ color: GOLD }} />)}
            <span className="text-sm ml-1.5 font-semibold" style={{ color: GOLD }}>5.0</span>
            <span className="text-sm ml-1" style={{ color: "rgba(232,232,232,0.35)" }}>· 21 reviews</span>
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.15)}>
          <TestimonialsCarousel
            testimonials={TESTIMONIALS.slice(0, 4)}
            cardBg="rgba(255,255,255,0.04)"
            cardWidth="clamp(280px, 70vw, 340px)"
          />
        </motion.div>
      </div>
    </section>
  );
}

// ─── One Stop ─────────────────────────────────────────────────────────────────

function OneStop() {
  return (
    <section id="one-stop" className="py-24" style={{ backgroundColor: DARK_1 }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="rounded-3xl p-8 sm:p-14 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #161616 0%, #1e1e1e 100%)", border: `1px solid rgba(255,255,255,0.07)` }}>
          {/* Gold accent ring */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(212,168,83,0.04) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(199,62,73,0.05) 0%, transparent 70%)" }} />

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp(0.1)}>
              <div className="mb-4" style={{ width: 48, height: 2, background: `linear-gradient(to right, ${GOLD}, transparent)` }} />
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
                One team. Every trade. Start to finish.
              </h2>
              <p className="leading-relaxed mb-8" style={{ color: "rgba(232,232,232,0.55)" }}>
                Cherry Builds manages every aspect of your renovation under one roof. No coordinating
                multiple contractors, no gaps between trades. From your first consultation through
                to final handover, one experienced team handles it all.
              </p>
              <a
                href="#contact"
                className="glow-cherry inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl transition-all"
                style={{ backgroundColor: CHERRY_DIM }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#8a2b34")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = CHERRY_DIM)}
              >
                Get a Quote <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="grid grid-cols-2 gap-4">
              {[
                { icon: Hammer,     title: "Full Renovations",   desc: "Kitchens, bathrooms, complete home transformations" },
                { icon: LayoutGrid, title: "Project Management", desc: "One point of contact coordinating every trade" },
                { icon: Droplets,   title: "Waterproofing",      desc: "Certified AS3740 waterproofing in-house" },
                { icon: Shield,     title: "Licensed Builder",   desc: "VBA Licensed, 30+ years experience" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-xl p-4" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <Icon className="w-5 h-5 mb-2" style={{ color: GOLD }} />
                  <div className="font-semibold text-white text-sm mb-0.5">{title}</div>
                  <div className="text-xs" style={{ color: "rgba(232,232,232,0.45)" }}>{desc}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── AquaTight ────────────────────────────────────────────────────────────────

function AquaTight() {
  return (
    <section id="aquatight" className="py-24" style={{ backgroundColor: DARK_BASE }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #a3343e 0%, #72232b 100%)" }}>
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <motion.div {...fadeUp(0.1)}>
              <img src="/logos/aqua-tight.png" alt="Aquatight" className="h-14 w-auto mb-5" style={{ filter: "brightness(0) invert(1)" }} />
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-3 py-1 text-sm font-medium mb-5">
                <Droplets className="w-4 h-4" /> Certified Division
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold leading-tight mb-5">Aquatight Waterproofing</h2>
              <p className="text-red-100 leading-relaxed mb-5">
                Our certified waterproofing division, Aquatight, provides AS3740-compliant waterproofing
                for showers, bathrooms, balconies, and all domestic wet areas. All work comes with
                certificates and warranties on completion.
              </p>
              <ul className="space-y-2.5 mb-8">
                {["Shower & bathroom waterproofing","Balcony & outdoor wet areas","Versipave Pod System for balconies","Rectification of failed waterproofing","Free inspections & obligation-free quotes"].map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-red-100">
                    <Check className="w-4 h-4 text-red-200 flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
              <a href="https://www.aquatightwaterproofing.au/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white font-semibold px-6 py-3 rounded-xl hover:bg-red-50 transition-colors shadow-lg" style={{ color: CHERRY_DIM }}>
                Visit Aquatight <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
            <motion.div {...fadeUp(0.25)} className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield,   title: "AS3740 Compliant",  desc: "All work meets Australian Standards" },
                { icon: Award,    title: "Certified Team",    desc: "Licensed waterproofers & tilers" },
                { icon: Check,    title: "Warranties Issued", desc: "Certificates on every job" },
                { icon: Droplets, title: "All Wet Areas",     desc: "Showers, balconies, laundries" },
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

// ─── Combined Expertise ───────────────────────────────────────────────────────

function CombinedExpertise() {
  return (
    <section className="py-24" style={{ backgroundColor: DARK_2 }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp(0.1)}>
            <RevealText className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">
              Complete renovations and waterproofing, coordinated by one team.
            </RevealText>
            <div className="flex items-center gap-6 mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <img src="/logos/cherry-builds-navbar.png" alt="Cherry Builds" className="h-14 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "1.5rem", fontWeight: 200 }}>×</span>
              <img src="/logos/aqua-tight.png" alt="Aquatight" className="h-14 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="space-y-5">
            <p className="leading-relaxed" style={{ color: "rgba(232,232,232,0.6)" }}>
              By combining a fully licensed builder with a master waterproofer, Cherry Builds and Aquatight
              offer a seamless, end-to-end service. From identifying the source of damage through to quoting,
              project management, and completion. We handle everything.
            </p>
            <p className="leading-relaxed" style={{ color: "rgba(232,232,232,0.6)" }}>
              With over 30 years of building experience and more than 18 years of specialised waterproofing
              expertise, we pride ourselves on exceptional workmanship and meticulous attention to detail.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              {[
                { val: "30+", label: "Years building experience",        color: GOLD },
                { val: "18+", label: "Years waterproofing expertise",    color: CHERRY },
              ].map(s => (
                <div key={s.label} className="rounded-2xl p-5 text-center" style={glassCard}>
                  <CountUp value={s.val} className="font-serif text-3xl font-bold block" style={{ color: s.color }} />
                  <div className="text-xs mt-1.5 leading-snug" style={{ color: "rgba(232,232,232,0.5)" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a href="#contact" className="glow-cherry inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3 rounded-xl transition-all"
                style={{ backgroundColor: CHERRY_DIM }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#8a2b34")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = CHERRY_DIM)}>
                Get a Quote <ArrowRight className="w-4 h-4" />
              </a>
              <a href="https://www.aquatightwaterproofing.au/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-xl transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(232,232,232,0.8)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `rgba(212,168,83,0.35)`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}>
                Visit Aquatight <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQ() {
  const [open, setOpen] = React.useState(null);

  return (
    <section id="faq" className="py-24" style={{ backgroundColor: DARK_1 }}>
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <motion.div {...fadeUp(0.1)} className="mb-14">
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GOLD }}>FAQ</span>
          <RevealText className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-white">Common Questions</RevealText>
        </motion.div>

        <div className="space-y-2.5">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.04 + i * 0.04)}
              className="rounded-2xl overflow-hidden transition-all"
              style={{ backgroundColor: open === i ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.03)", border: open === i ? `1px solid rgba(212,168,83,0.22)` : "1px solid rgba(255,255,255,0.07)" }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-medium text-white">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                  style={{ color: open === i ? GOLD : CHERRY }}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "rgba(232,232,232,0.58)" }}>{faq.a}</p>
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

// ─── Contact ──────────────────────────────────────────────────────────────────

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
    if (window.gtag) {
      window.gtag("event", "conversion", { send_to: "AW-17973575816/eCcUCJqgsLQcEIiBvPpC" });
    }
  };

  const inputStyle = {
    backgroundColor: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 8,
    color: "#f0f0f0",
    width: "100%",
    padding: "10px 12px",
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s",
  };
  const focusInput = e => (e.target.style.borderColor = `rgba(212,168,83,0.4)`);
  const blurInput  = e => (e.target.style.borderColor = "rgba(255,255,255,0.12)");

  return (
    <section id="contact" className="py-24" style={{ backgroundColor: DARK_2 }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid md:grid-cols-2 gap-14 items-start">
          <motion.div {...fadeUp(0.1)}>
            <div className="mb-5" style={{ width: 48, height: 2, background: `linear-gradient(to right, ${GOLD}, transparent)` }} />
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              Ready to start your renovation?
            </h2>
            <p className="leading-relaxed mb-8" style={{ color: "rgba(232,232,232,0.55)" }}>
              Tell us about your project and we&rsquo;ll get back to you with an obligation-free quote.
              We service Melbourne&rsquo;s Bayside suburbs, Mornington Peninsula, and inner-city areas.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: Phone,  label: "Phone",  value: "0438 499 146",                href: "tel:0438499146" },
                { icon: Mail,   label: "Email",  value: "info@cherrybuilds.com.au",    href: "mailto:info@cherrybuilds.com.au" },
                { icon: MapPin, label: "Postal", value: "PO BOX 3109, Mentone East VIC 3194", href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.2)" }}>
                    <Icon className="w-4 h-4" style={{ color: GOLD }} />
                  </div>
                  <div>
                    <div className="text-xs font-medium" style={{ color: "rgba(232,232,232,0.4)" }}>{label}</div>
                    {href
                      ? <a href={href} className="text-sm font-medium text-white hover:opacity-75 transition-opacity">{value}</a>
                      : <span className="text-sm text-white">{value}</span>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm mb-6" style={{ color: "rgba(232,232,232,0.45)" }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <a href="https://www.facebook.com/cherrybuilds" target="_blank" rel="noopener noreferrer"
                className="hover:text-white transition-colors">Follow us on Facebook</a>
            </div>

            <div className="pt-5 text-xs space-y-0.5" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", color: "rgba(232,232,232,0.3)" }}>
              <div>ABN: 60 122 151 679</div>
              <div>VBA Licence: DB-71349</div>
            </div>
          </motion.div>

          {/* Glass form card */}
          <motion.div
            {...fadeUp(0.2)}
            className="rounded-2xl p-8"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", backdropFilter: "blur(12px)" }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(212,168,83,0.12)", border: `1px solid rgba(212,168,83,0.28)` }}>
                  <Check className="w-7 h-7" style={{ color: GOLD }} />
                </div>
                <h3 className="text-lg font-semibold text-white">Enquiry sent!</h3>
                <p className="text-sm" style={{ color: "rgba(232,232,232,0.55)" }}>
                  Thanks for reaching out. We&rsquo;ll be in touch shortly with your obligation-free quote.
                </p>
              </div>
            ) : (
              <form action="https://formspree.io/f/placeholder" method="POST" onSubmit={handleSubmit} className="space-y-4 text-sm">
                <input type="text" name="_gotcha" className="hidden" />
                <input type="hidden" name="_subject" value="New enquiry from Cherry Builds website" />

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cb-first" className="block text-xs font-semibold mb-1" style={{ color: "rgba(232,232,232,0.5)" }}>First name</label>
                    <input id="cb-first" type="text" name="first_name" required style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
                  </div>
                  <div>
                    <label htmlFor="cb-last" className="block text-xs font-semibold mb-1" style={{ color: "rgba(232,232,232,0.5)" }}>Last name</label>
                    <input id="cb-last" type="text" name="last_name" required style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
                  </div>
                </div>
                <div>
                  <label htmlFor="cb-email" className="block text-xs font-semibold mb-1" style={{ color: "rgba(232,232,232,0.5)" }}>Email</label>
                  <input id="cb-email" type="email" name="email" required style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
                </div>
                <div>
                  <label htmlFor="cb-phone" className="block text-xs font-semibold mb-1" style={{ color: "rgba(232,232,232,0.5)" }}>Phone</label>
                  <input id="cb-phone" type="tel" name="phone" required style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
                </div>
                <div>
                  <label htmlFor="cb-suburb" className="block text-xs font-semibold mb-1" style={{ color: "rgba(232,232,232,0.5)" }}>Suburb / location of work</label>
                  <input id="cb-suburb" type="text" name="suburb" style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
                </div>
                <div>
                  <label htmlFor="cb-message" className="block text-xs font-semibold mb-1" style={{ color: "rgba(232,232,232,0.5)" }}>Tell us about your project</label>
                  <textarea id="cb-message" name="message" rows={4} style={{ ...inputStyle, resize: "none" }} onFocus={focusInput} onBlur={blurInput} />
                </div>

                <button type="submit" disabled={submitting}
                  className="glow-cherry w-full inline-flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50"
                  style={{ backgroundColor: CHERRY_DIM }}
                  onMouseEnter={e => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = "#8a2b34")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = CHERRY_DIM)}
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

// ─── Floating Call ────────────────────────────────────────────────────────────

function FloatingCall() {
  return (
    <motion.a
      href="tel:0438499146"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="glow-cherry fixed bottom-20 right-5 z-50 md:hidden flex items-center gap-2 text-white font-semibold text-sm px-4 py-3 rounded-full shadow-lg"
      style={{ backgroundColor: CHERRY_DIM }}
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
      <Helmet>
        <title>Cherry Builds | VBA Licensed Renovation Builder Melbourne</title>
        <meta name="description" content="VBA Licensed renovation builder in Melbourne — kitchens, bathrooms, full home renovations, heritage homes, decking and waterproofing. Bayside, Mornington Peninsula and inner suburbs. Fixed prices. Free quote." />
        <meta property="og:title" content="Cherry Builds | VBA Licensed Renovation Builder Melbourne" />
        <meta property="og:description" content="VBA Licensed renovation builder in Melbourne — kitchens, bathrooms, full home renovations, heritage homes, decking and waterproofing. Bayside, Mornington Peninsula and inner suburbs. Fixed prices. Free quote." />
        <meta property="og:url" content="https://cherrybuilds.com.au/" />
        <link rel="canonical" href="https://cherrybuilds.com.au/" />

        {/* ── Structured Data (SEO schema audit: zero markup on live site) ── */}
        {/* GeneralContractor + LocalBusiness */}
        <script type="application/ld+json">{JSON.stringify(schemaLocalBusiness)}</script>
        {/* Service ItemList */}
        <script type="application/ld+json">{JSON.stringify(schemaServices)}</script>
        {/* FAQPage — AI/LLM citation benefit (not Google rich results, commercial restriction Aug 2023) */}
        <script type="application/ld+json">{JSON.stringify(schemaFAQ)}</script>
      </Helmet>

      <Hero />
      <StatsStrip />
      <TrustBar />
      <About />
      <WhyChoose />
      <Services />
      <Projects />
      <PhotoGallery />
      <Testimonials />
      <OneStop />
      <AquaTight />
      <CombinedExpertise />
      <FAQ />
      <Contact />
      <FloatingCall />
    </>
  );
}
