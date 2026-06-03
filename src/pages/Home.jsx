import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Phone, Mail, MapPin, ChevronDown, ChevronRight, ChevronLeft, X,
  Award, Check, ArrowRight, ExternalLink, Droplets, Shield,
  Hammer, SlidersHorizontal, LayoutGrid, Eye, ThumbsUp,
} from "lucide-react";
import { BlossomCarousel } from "@blossom-carousel/react";
import "@blossom-carousel/core/dist/blossom-carousel-core.css";
import { SERVICES, PROJECTS, TESTIMONIALS, FAQS, CREDENTIALS } from "../data/index.js";
import RevealText from "../components/RevealText.jsx";
import CountUp from "../components/CountUp.jsx";
import TrustBar from "../components/TrustBar.jsx";
import TestimonialsCarousel from "../components/TestimonialsCarousel.jsx";

// ─── Schema.org Structured Data ───────────────────────────────────────────────
// seo-schema audit: zero structured data on live site (cherrybuilds.com.au).
// Added: GeneralContractor + LocalBusiness, Service ItemList, FAQPage.
// FAQPage note: included for AI/LLM citation benefit (ChatGPT, Perplexity,
// AI Overviews) — NOT for Google rich results (commercial restriction Aug 2023).

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
    recognizedBy: {
      "@type": "GovernmentOrganization",
      name: "Victorian Building Authority",
    },
  },
  memberOf: {
    "@type": "Organization",
    name: "Master Builders Association of Victoria",
  },
  foundingDate: "2007",
  identifier: { "@type": "PropertyValue", name: "ABN", value: "60 122 151 679" },
  image: "https://cherrybuilds.com.au/og-image.jpg",
  logo: {
    "@type": "ImageObject",
    url: "https://cherrybuilds.com.au/logos/cherry-builds-navbar.png",
  },
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

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 700], [0, 180]);
  const gridY = useTransform(scrollY, [0, 700], [0, 80]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: "#1a1a1a" }}>
      {/* Hero photo with parallax */}
      <motion.img
        src="/images/hero-banner-gemini-original.jpg"
        alt="Cherry Builds renovation — kitchens, bathrooms, outdoor living"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ y: bgY, scale: 1.08 }}
      />
      {/* Heavier overlay — banner is bright so needs more contrast for text */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,26,26,0.78) 0%, rgba(26,26,26,0.68) 50%, rgba(26,26,26,0.78) 100%)" }} />
      <motion.div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(255,255,255,1) 60px,rgba(255,255,255,1) 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(255,255,255,1) 60px,rgba(255,255,255,1) 61px)",
          y: gridY,
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
          From full home renovations to kitchens, bathrooms, decking, and landscaping.
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
              <CountUp value={s.val} delay={1400} className="font-serif text-3xl font-bold" style={{ color: "#a3343e" }} />
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
              Construction Services in 2020, bringing the same trusted team and quality workmanship
              that Melbourne homeowners have relied on for decades.
            </p>
            <p className="mt-4 text-neutral-600 leading-relaxed">
              With over 30 years of industry experience, our portfolio spans hundreds of full renovations from period homes to architectural homes, bathroom renovations, custom kitchens, and outdoor living projects across Melbourne's Bayside, inner city, and the Mornington Peninsula.
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

// ─── Why Choose ──────────────────────────────────────────────────────────────

const WHY_ITEMS = [
  {
    icon: Hammer,
    title: "Expert Craftsmanship",
    desc: "Our team of seasoned professionals brings years of experience and expertise to every project, ensuring impeccable results that exceed your expectations. From concept to completion, trust Cherry Builds to deliver excellence at every step.",
  },
  {
    icon: SlidersHorizontal,
    title: "Tailored Solutions for Every Budget",
    desc: "At Cherry Builds, we believe that exceptional quality should be accessible to all. We offer personalised renovation solutions designed to accommodate a range of budgets, whether a modest update or a full-scale transformation.",
  },
  {
    icon: LayoutGrid,
    title: "Comprehensive Services",
    desc: "From full home renovations to custom kitchen and bathroom remodels, Cherry Builds offers a comprehensive range of services, including full project management. We handle every aspect of your project with precision and care, ensuring a seamless experience from start to finish.",
  },
  {
    icon: Eye,
    title: "Unmatched Attention to Detail",
    desc: "We understand that the difference is in the details. That's why we take pride in our meticulous approach to every aspect of your project, ensuring that every corner is crafted to perfection. No detail is overlooked.",
  },
  {
    icon: ThumbsUp,
    title: "Customer Satisfaction Guaranteed",
    desc: "Your satisfaction is our top priority. We go above and beyond to ensure that you're thrilled with the results of your renovation, providing unparalleled service and support every step of the way.",
  },
];

function WhyChoose() {
  return (
    <section className="py-24" style={{ backgroundColor: "#1a1a1a" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div {...fadeUp(0.1)} className="text-center mb-14">
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#f49ba0" }}>
            Why Cherry Builds
          </span>
          <RevealText className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-white">
            Why Choose Cherry Builds?
          </RevealText>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
        >
          {WHY_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }}
              className={`rounded-2xl p-6 border${i === WHY_ITEMS.length - 1 ? " sm:col-span-2 flex flex-col items-center text-center" : ""}`}
              style={{ backgroundColor: "#2a2a2a", borderColor: "rgba(255,255,255,0.07)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(163,52,62,0.2)", border: "1px solid rgba(163,52,62,0.3)" }}
              >
                <item.icon className="w-5 h-5" style={{ color: "#f49ba0" }} />
              </div>
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              <p className={`text-sm text-neutral-400 leading-relaxed${i === WHY_ITEMS.length - 1 ? " max-w-xl" : ""}`}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
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
            From a single bathroom through to a full home renovation. We manage every trade in-house.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {SERVICES.map((svc) => (
            <motion.div
              key={svc.title}
              variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Link
                to={`/services/${svc.slug}`}
                className="flex flex-col h-full bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-cherry-100 transition-shadow transition-colors"
              >
                {/* Photo / icon header */}
                <div className="h-36 relative overflow-hidden flex-shrink-0" style={{ backgroundColor: "#fdf2f3" }}>
                  {svc.heroImage ? (
                    <img src={svc.heroImage} alt={svc.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "#fdf2f3" }}>
                      <svc.icon className="w-10 h-10" style={{ color: "#a3343e", opacity: 0.35 }} />
                    </div>
                  )}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 55%)" }} />
                  <div className="absolute bottom-3 left-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#a3343e" }}>
                      <svc.icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="font-semibold text-neutral-900 mb-2 text-sm">{svc.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed mb-4 flex-1">{svc.desc}</p>
                  <div className="inline-flex items-center gap-1 text-xs font-semibold group-hover:gap-1.5 transition-all" style={{ color: "#a3343e" }}>
                    Learn More
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
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

// ─── Photo Gallery ───────────────────────────────────────────────────────────

const GALLERY_PHOTOS = [
  { src: "/images/melbourne-bathroom-renovation-shower.jpg",        alt: "Herringbone brass bathroom, Marina Rd renovation" },
  { src: "/images/melbourne-kitchen-renovation-island-bench.jpg",   alt: "Kitchen island bench with navy stools, Brighton" },
  { src: "/images/melbourne-full-home-renovation-living-wide.jpg",  alt: "Open plan kitchen and living, Brighton" },
  { src: "/images/melbourne-bathroom-tiling-mosaic-shower.jpg",     alt: "Mosaic tile shower, Albert Park renovation" },
  { src: "/images/melbourne-full-home-renovation-living-room.jpg",  alt: "Living room with fireplace, Brighton" },
  { src: "/images/melbourne-kitchen-renovation-splashback-tiles.jpg", alt: "Kitchen with patchwork splashback tiles, Albert Park" },
  { src: "/images/melbourne-bathroom-renovation-vanity.jpg",        alt: "Double vanity bathroom, Hampton renovation" },
  { src: "/images/melbourne-kitchen-renovation-albert-park.jpg",    alt: "White kitchen renovation, Albert Park" },
  { src: "/images/melbourne-kitchen-renovation-dining.jpg",         alt: "Kitchen and dining area, Brighton" },
  { src: "/images/melbourne-home-renovation-entry.jpg",             alt: "Herringbone tiling, Mentone renovation" },
  { src: "/images/melbourne-bathroom-renovation-frameless-shower.jpg", alt: "Frameless glass shower, Hampton renovation" },
  { src: "/images/melbourne-timber-decking-sandringham.jpg",        alt: "Oiled jarrah timber decking, Sandringham" },
  { src: "/images/melbourne-living-room-renovation-albert-park.jpg", alt: "Living room renovation, Albert Park" },
  { src: "/images/melbourne-kitchen-renovation-wide-angle.jpg",     alt: "Kitchen renovation wide view, Brighton" },
  { src: "/images/melbourne-balcony-waterproofing-tiling.jpg",      alt: "Balcony waterproofing and porcelain tiling, Hampton" },
  { src: "/images/melbourne-kitchen-renovation-galley-white.jpg",   alt: "White galley kitchen renovation, Toorak" },
  { src: "/images/melbourne-kitchen-renovation-open-plan.jpg",      alt: "Open plan kitchen, Brighton" },
  { src: "/images/melbourne-renovation-laundry-white-cabinetry.jpg", alt: "Laundry with white cabinetry, Mentone renovation" },
];

function PhotoGallery() {
  const carouselRef = React.useRef(null);
  const [lightboxIdx, setLightboxIdx] = React.useState(null);
  const count = GALLERY_PHOTOS.length;

  React.useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft")  setLightboxIdx((i) => (i - 1 + count) % count);
      if (e.key === "ArrowRight") setLightboxIdx((i) => (i + 1) % count);
      if (e.key === "Escape")     setLightboxIdx(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx, count]);

  const NavBtn = ({ dir }) => (
    <button
      onClick={() => carouselRef.current?.[dir]({ align: "start" })}
      aria-label={dir === "prev" ? "Previous" : "Next"}
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all border border-neutral-700 text-neutral-400 hover:border-neutral-400 hover:text-white"
    >
      {dir === "prev"
        ? <ChevronLeft className="w-5 h-5" />
        : <ChevronRight className="w-5 h-5" />
      }
    </button>
  );

  return (
    <section id="gallery" className="py-24 bg-neutral-950 overflow-hidden">
      {/* Header + desktop nav — constrained to page container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div {...fadeUp(0.1)} className="flex items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#f49ba0" }}>Portfolio</span>
            <RevealText className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-white">Our Work</RevealText>
            <p className="mt-3 max-w-xl text-neutral-400 text-sm sm:text-base">
              Kitchens, bathrooms, full homes and outdoor living across Melbourne&apos;s Bayside and Mornington Peninsula.
            </p>
          </div>
          {/* Prev / Next — desktop only, shown beside heading */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0 pb-1">
            <NavBtn dir="prev" />
            <NavBtn dir="next" />
          </div>
        </motion.div>
      </div>

      {/* Blossom carousel — full-width, drag on mouse / native scroll on touch */}
      <motion.div {...fadeUp(0.15)}>
        <BlossomCarousel ref={carouselRef} as="ul" className="gallery-carousel">
          {GALLERY_PHOTOS.map((photo, i) => (
            <li
              key={i}
              className="gallery-slide"
              onClick={() => setLightboxIdx(i)}
            >
              <div className="relative overflow-hidden rounded-2xl h-full cursor-pointer group">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  draggable="false"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Eye className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                </div>
              </div>
            </li>
          ))}
        </BlossomCarousel>
      </motion.div>

      {/* Mobile nav — centred below carousel */}
      <div className="flex sm:hidden items-center justify-center gap-3 mt-6">
        <NavBtn dir="prev" />
        <NavBtn dir="next" />
      </div>

      {/* Lightbox — unchanged */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxIdx(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/60 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightboxIdx(null); }}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + count) % count); }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <motion.img
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.18 }}
              src={GALLERY_PHOTOS[lightboxIdx].src}
              alt={GALLERY_PHOTOS[lightboxIdx].alt}
              className="max-h-[88vh] max-w-[88vw] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % count); }}
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-neutral-500 text-sm tabular-nums select-none">
              {lightboxIdx + 1} / {count}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
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
                e.currentTarget.style.transform = `perspective(800px) rotateY(${x * 7}deg) rotateX(${y * -7}deg) translateZ(4px)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
              }}
              className="group"
              style={{ transformStyle: "preserve-3d", transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
            >
              <Link
                to={`/projects/${p.slug}`}
                className="flex flex-col h-full bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 relative overflow-hidden" style={{ backgroundColor: "#ededed" }}>
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                      <div className="text-center">
                        <div className="text-3xl mb-1">🏗</div>
                        <div className="text-xs">Photo coming soon</div>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-6 flex flex-col flex-1">
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
                  <p className="text-xs text-neutral-500 leading-relaxed mb-4 flex-1">{p.summary}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "#fdf2f3", color: "#a3343e", border: "1px solid #fce4e5" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2 transition-all" style={{ color: "#a3343e" }}>
                    View Project
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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

// ─── Testimonials ────────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <section className="py-24" style={{ backgroundColor: "#1a1a1a" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div {...fadeUp(0.1)} className="text-center mb-14">
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#f49ba0" }}>Reviews</span>
          <RevealText className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-white">What Our Clients Say</RevealText>
        </motion.div>

        <motion.div {...fadeUp(0.15)}>
          <TestimonialsCarousel
            testimonials={TESTIMONIALS.slice(0, 4)}
            cardBg="#2a2a2a"
            cardWidth="clamp(280px, 70vw, 340px)"
          />
        </motion.div>
      </div>
    </section>
  );
}

// ─── One Stop ────────────────────────────────────────────────────────────────

function OneStop() {
  return (
    <section id="one-stop" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)" }}>
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp(0.1)}>
              <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#f49ba0" }}>One Stop Service</span>
              <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">
                One team. Every trade. Start to finish.
              </h2>
              <p className="mt-5 text-neutral-400 leading-relaxed">
                Cherry Builds manages every aspect of your renovation under one roof. No coordinating multiple contractors, no gaps between trades. From your first consultation through to final handover, one experienced team handles it all.
              </p>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                style={{ backgroundColor: "#a3343e" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#8a2b34")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#a3343e")}
              >
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
            <motion.div {...fadeUp(0.2)} className="grid grid-cols-2 gap-4">
              {[
                { icon: Hammer, title: "Full Renovations", desc: "Kitchens, bathrooms, and complete home transformations" },
                { icon: LayoutGrid, title: "Project Management", desc: "One point of contact coordinating every trade" },
                { icon: Droplets, title: "Waterproofing", desc: "Certified AS3740 waterproofing in-house" },
                { icon: Shield, title: "Licensed Builder", desc: "VBA Licensed with 30+ years industry experience" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white/10 border border-white/20 rounded-xl p-4">
                  <Icon className="w-5 h-5 mb-2" style={{ color: "#f49ba0" }} />
                  <div className="font-semibold text-white text-sm mb-0.5">{title}</div>
                  <div className="text-xs text-neutral-400">{desc}</div>
                </div>
              ))}
            </motion.div>
          </div>
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
              <img
                src="/logos/aqua-tight.png"
                alt="Aquatight"
                className="h-16 w-auto mb-5"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-3 py-1 text-sm font-medium mb-5">
                <Droplets className="w-4 h-4" />
                Certified Division
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold leading-tight mb-5">
                Aquatight Waterproofing
              </h2>
              <p className="text-red-100 leading-relaxed mb-5">
                Our certified waterproofing division, Aquatight, provides AS3740-compliant waterproofing
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
                Visit Aquatight
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

// ─── Combined expertise ───────────────────────────────────────────────────────

function CombinedExpertise() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp(0.1)}>
            <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#a3343e" }}>
              The Complete Solution
            </span>
            <RevealText className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-neutral-900 leading-tight">
              Complete renovations and waterproofing, coordinated by one team.
            </RevealText>
            <div className="flex items-center gap-6 mt-8 pt-6 border-t border-neutral-200">
              <img src="/logos/cherry-builds-navbar.png" alt="Cherry Builds" className="h-14 w-auto" />
              <span className="text-neutral-300 text-lg font-light">×</span>
              <img src="/logos/aqua-tight.png" alt="Aquatight" className="h-14 w-auto" />
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="space-y-5">
            <p className="text-neutral-600 leading-relaxed">
              By combining a fully licensed builder with a master waterproofer, Cherry Builds and Aquatight
              Waterproofing offer a seamless, end-to-end service. From identifying the source of damage and
              assessing the required repairs, through to quoting, project management, and completion of all
              works. We handle everything.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              With over 30 years of building experience and more than 18 years of specialised waterproofing
              expertise, we pride ourselves on delivering exceptional workmanship and meticulous attention
              to detail.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              {[
                { val: "30+", label: "Years building experience" },
                { val: "18+", label: "Years waterproofing expertise" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl p-5 text-center" style={{ backgroundColor: "#ededed" }}>
                  <CountUp value={s.val} className="font-serif text-3xl font-bold" style={{ color: "#a3343e" }} />
                  <div className="text-xs text-neutral-500 mt-1.5 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                style={{ backgroundColor: "#a3343e" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#8a2b34")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#a3343e")}
              >
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://www.aquatightwaterproofing.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-neutral-300 text-neutral-700 hover:border-neutral-400 font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Visit Aquatight
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
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
    // Fire Google Ads "Form Enquiry" conversion
    if (window.gtag) {
      window.gtag('event', 'conversion', { send_to: 'AW-17973575816/eCcUCJqgsLQcEIiBvPpC' });
    }
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
              <div>VBA Licence: DB-71349</div>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: "#fdf2f3", border: "1px solid #fce4e5" }}>
                  <Check className="w-7 h-7" style={{ color: "#a3343e" }} />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">Enquiry sent!</h3>
                <p className="text-neutral-500 text-sm">Thanks for reaching out. We'll be in touch shortly with your obligation-free quote.</p>
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
      <Helmet>
        <title>Cherry Builds | VBA Licensed Renovation Builder Melbourne</title>
        <meta name="description" content="VBA Licensed renovation builder in Melbourne — kitchens, bathrooms, full home renovations, heritage homes, decking and waterproofing. Bayside, Mornington Peninsula and inner suburbs. Fixed prices. Free quote." />
        <meta property="og:title" content="Cherry Builds | VBA Licensed Renovation Builder Melbourne" />
        <meta property="og:description" content="VBA Licensed renovation builder in Melbourne — kitchens, bathrooms, full home renovations, heritage homes, decking and waterproofing. Bayside, Mornington Peninsula and inner suburbs. Fixed prices. Free quote." />
        <meta property="og:url" content="https://cherrybuilds.com.au/" />
        <link rel="canonical" href="https://cherrybuilds.com.au/" />
        {/* Structured data — GeneralContractor + LocalBusiness */}
        <script type="application/ld+json">{JSON.stringify(schemaLocalBusiness)}</script>
        {/* Service ItemList — all 8 renovation services */}
        <script type="application/ld+json">{JSON.stringify(schemaServices)}</script>
        {/* FAQPage — AI/LLM citation benefit only (not Google rich results) */}
        <script type="application/ld+json">{JSON.stringify(schemaFAQ)}</script>
      </Helmet>
      <Hero />
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
