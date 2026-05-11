"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, MapPin, ShieldCheck, TrendingUp, Search,
  Star, Building2, Users, Zap, ChevronRight, CheckCircle2,
  X, ChevronDown
} from "lucide-react";

/* ── Data ─────────────────────────────────────────────── */
const stats = [
  { label: "Active Billboards", value: "12,000+", icon: <Building2 className="w-5 h-5" />, bg: "bg-primary/10", color: "text-primary" },
  { label: "Cities Covered", value: "120+", icon: <MapPin className="w-5 h-5" />, bg: "bg-secondary/10", color: "text-secondary" },
  { label: "Happy Advertisers", value: "4,800+", icon: <Users className="w-5 h-5" />, bg: "bg-tertiary/10", color: "text-tertiary" },
  { label: "Campaigns Delivered", value: "25,000+", icon: <Zap className="w-5 h-5" />, bg: "bg-primary/10", color: "text-primary" },
];

const features = [
  {
    icon: <MapPin className="w-6 h-6" />,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    title: "Prime Locations",
    desc: "Access thousands of high-visibility billboard locations across major cities and national highways in India.",
    badge: "12,000+ Verified",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    title: "GPS Proof of Play",
    desc: "GPS-stamped photo verification and automated post-sunset illumination checks eliminate vendor fraud entirely.",
    badge: "100% Verified",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    title: "Real-Time Analytics",
    desc: "Track impressions, audience demographics, and campaign ROI live with our advanced analytics dashboard.",
    badge: "Live Data",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    title: "Instant Booking",
    desc: "Book any billboard in under 5 minutes. Secure payments with milestone-based vendor payouts built in.",
    badge: "5-Minute Booking",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Marketing Head, NourishCo",
    initials: "PS",
    rating: 5,
    text: "AdSpace transformed our OOH campaigns. The GPS verification gave us complete confidence our ads were actually up and running perfectly.",
  },
  {
    name: "Rahul Mehta",
    role: "Founder, QuickBite",
    initials: "RM",
    rating: 5,
    text: "We booked 12 prime billboards across Mumbai in a single afternoon. The analytics dashboard is genuinely impressive — real-time data that actually works.",
  },
  {
    name: "Sneha Iyer",
    role: "Brand Manager, LuxeWear",
    initials: "SI",
    rating: 5,
    text: "The illumination proof feature is brilliant. Our previous vendor never lit up the board at night — AdSpace fixed that completely with GPS-verified proof.",
  },
];

const cities = ["Bhubaneswar", "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Pune"];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.09, duration: 0.5, ease: "easeOut" as const } }),
};

/* ── Page ─────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <main className="flex-1 bg-background" id="main-content">

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-16"
        aria-labelledby="hero-heading"
      >
        {/* Ambient glow orbs — Stitch style */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, rgba(0,74,198,0.18) 0%, transparent 70%)" }} />
          <div className="absolute top-24 right-1/4 w-[450px] h-[450px] rounded-full opacity-25"
            style={{ background: "radial-gradient(circle, rgba(0,108,73,0.16) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 left-1/3 w-[350px] h-[350px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, rgba(0,74,198,0.12) 0%, transparent 70%)" }} />
        </div>

        {/* Subtle dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #004ac6 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="max-w-[1440px] relative z-10 mx-auto px-6 lg:px-16 flex flex-col items-center text-center">

          {/* Available-now badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium mb-8"
            style={{
              background: "rgba(0,74,198,0.08)",
              border: "1px solid rgba(0,74,198,0.2)",
              color: "#004ac6",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" aria-hidden />
            India&apos;s #1 OOH Billboard Marketplace · 12,000+ Verified Boards
          </motion.div>

          {/* H1 — primary SEO headline */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-heading font-bold tracking-tight text-on-background max-w-5xl leading-[1.05]"
          >
            Dominate Every{" "}
            <span className="gradient-text">Skyline</span>{" "}
            in India
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-6 text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed"
          >
            Discover 12,000+ high-visibility billboards. Book instantly, get GPS-verified
            proof of installation, and measure real campaign impact — all in one platform.
          </motion.p>

          {/* Glassmorphic search bar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-10 w-full max-w-2xl"
          >
            <div className="glass-panel rounded-full flex items-center px-6 py-3 ambient-shadow gap-3">
              <Search className="w-5 h-5 text-on-surface-variant flex-shrink-0" aria-hidden />
              <input
                id="hero-search"
                type="search"
                placeholder="Search city, area, or billboard type…"
                aria-label="Search billboards by city, area, or type"
                className="flex-1 bg-transparent text-on-surface placeholder:text-on-surface-variant text-sm outline-none py-1"
              />
              <Link
                href="/marketplace"
                className="flex-shrink-0 px-6 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-full transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                aria-label="Search billboards in marketplace"
              >
                Search
              </Link>
            </div>

            {/* Quick city links — SEO anchor links */}
            <nav aria-label="Quick search by city" className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <span className="text-xs text-on-surface-variant">Popular:</span>
              {cities.map((city) => (
                <Link
                  key={city}
                  href={`/marketplace?city=${city.toLowerCase()}`}
                  className="text-xs px-3 py-1 rounded-full border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary/60 transition-colors"
                  title={`Billboard advertising in ${city}`}
                >
                  {city}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/marketplace"
              id="hero-cta-primary"
              className="h-13 px-8 py-3.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              style={{ boxShadow: "0 8px 24px rgba(0,74,198,0.25)" }}
            >
              Browse Inventory <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/vendors"
              id="hero-cta-secondary"
              className="h-13 px-8 py-3.5 glass-button-secondary font-semibold rounded-full flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              List Your Billboard
            </Link>
          </motion.div>

          {/* Trust signals below CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-on-surface-variant"
          >
            {["No commitment required", "GPS-verified installations", "Instant booking"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary" aria-hidden />
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Floating Billboard Card — right side */}
        <motion.article
          initial={{ opacity: 0, y: 40, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="hidden xl:block absolute right-12 bottom-24 w-64 glass-panel rounded-2xl ambient-shadow p-4"
          aria-label="Sample billboard listing: MG Road Bengaluru"
        >
          <div className="w-full h-32 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center mb-3 border border-outline-variant/30">
            <Building2 className="w-10 h-10 text-primary/50" aria-hidden />
          </div>
          <p className="text-sm font-semibold text-on-surface">MG Road, Bengaluru</p>
          <p className="text-xs text-on-surface-variant mt-0.5">40×20 ft · Backlit · GPS Verified ✓</p>
          <p className="text-primary font-bold text-sm mt-2 font-heading">₹45,000 / month</p>
          <div className="mt-3 px-3 py-1.5 rounded-full text-xs font-medium text-center"
            style={{ background: "rgba(0,108,73,0.1)", color: "#006c49" }}>
            ● Available Now
          </div>
        </motion.article>

        {/* Floating GPS Verified Card — left side */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 2 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="hidden xl:block absolute left-12 bottom-32 w-56 glass-panel rounded-2xl ambient-shadow p-4"
          aria-hidden
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(0,108,73,0.1)" }}>
              <ShieldCheck className="w-4 h-4 text-secondary" />
            </div>
            <p className="text-xs font-semibold text-on-surface">GPS Verified</p>
          </div>
          <p className="text-xs text-on-surface-variant">Installation confirmed at 2:34 PM</p>
          <div className="mt-2.5 w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
            <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-secondary to-primary" />
          </div>
          <p className="text-xs text-on-surface-variant mt-1.5">Campaign 80% complete</p>
        </motion.div>
      </section>

      {/* ─── TRUSTED BY MARQUEE ─────────────────────────────── */}
      <section className="py-10 bg-background border-t border-outline-variant/30 overflow-hidden" aria-label="Trusted brands">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-6">
          Trusted by India's fastest-growing brands
        </p>
        <div className="relative flex w-full overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
          <motion.div
            className="flex gap-16 items-center whitespace-nowrap px-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          >
            {[1, 2].map((set) => (
              <div key={set} className="flex gap-16 items-center">
                {["NourishCo", "QuickBite", "LuxeWear", "TechNova", "UrbanRoots", "FinServe"].map((brand) => (
                  <span key={brand} className="text-2xl font-heading font-bold text-on-surface-variant/40">
                    {brand}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────────── */}
      <section
        className="py-14 border-y border-outline-variant/40"
        style={{ background: "var(--surface-container-low)" }}
        aria-label="AdSpace platform statistics"
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex flex-col items-center text-center p-6 rounded-2xl surface-card ambient-shadow"
              >
                <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} flex items-center justify-center mb-3`}>
                  {s.icon}
                </div>
                <p className="text-3xl font-heading font-bold text-on-surface">{s.value}</p>
                <p className="text-sm text-on-surface-variant mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED INVENTORY ────────────────────────────── */}
      <section className="py-24 bg-background border-t border-outline-variant/40" aria-labelledby="featured-heading">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3 px-4 py-1.5 rounded-full"
                style={{ background: "rgba(0,74,198,0.08)", border: "1px solid rgba(0,74,198,0.15)" }}>
                Featured Spots
              </span>
              <h2 id="featured-heading" className="text-3xl md:text-4xl font-heading font-bold text-on-surface mt-2">
                High-Impact <span className="gradient-text">Available Now</span>
              </h2>
            </div>
            <Link href="/marketplace" className="text-sm font-semibold text-primary hover:underline mt-4 md:mt-0 flex items-center gap-1">
              View all inventory <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 1, loc: "Bhubaneswar Airport Road", type: "Digital · 40x20 ft", price: "₹35,000" },
              { id: 2, loc: "Bandra Kurla Complex, Mumbai", type: "Static · 60x30 ft", price: "₹1,20,000" },
              { id: 3, loc: "Connaught Place, Delhi", type: "Digital · 30x15 ft", price: "₹85,000" }
            ].map((spot, i) => (
              <motion.div key={spot.id} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="glass-panel rounded-2xl overflow-hidden ambient-shadow group cursor-pointer hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-48 bg-surface-variant flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 group-hover:scale-105 transition-transform duration-500" />
                  <Building2 className="w-12 h-12 text-on-surface-variant/30 relative z-10" />
                  <span className="absolute top-3 left-3 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded">AVAILABLE</span>
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-semibold text-lg text-on-surface">{spot.loc}</h3>
                  <p className="text-sm text-on-surface-variant mt-1">{spot.type} · GPS Verified</p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-primary font-bold">{spot.price} <span className="text-xs font-normal text-on-surface-variant">/ mo</span></p>
                    <button className="px-4 py-1.5 rounded-full border border-primary text-primary text-xs font-semibold group-hover:bg-primary group-hover:text-white transition-colors">Book</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─────────────────────────────────────── */}
      <section
        className="py-24 bg-background"
        aria-labelledby="features-heading"
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3 px-4 py-1.5 rounded-full"
              style={{ background: "rgba(0,74,198,0.08)", border: "1px solid rgba(0,74,198,0.15)" }}>
              Why AdSpace
            </span>
            <h2 id="features-heading" className="text-3xl md:text-5xl font-heading font-bold text-on-surface mt-4">
              Everything you need to run<br />
              <span className="gradient-text">powerful OOH campaigns</span>
            </h2>
            <p className="mt-4 text-on-surface-variant max-w-xl mx-auto">
              The only platform purpose-built for India&apos;s outdoor advertising market.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group relative p-6 rounded-2xl glass-panel ambient-shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-default"
              >
                {/* Badge */}
                <span className="absolute top-5 right-5 text-[10px] font-semibold px-2.5 py-1 rounded-full text-secondary"
                  style={{ background: "rgba(0,108,73,0.08)", border: "1px solid rgba(0,108,73,0.15)" }}>
                  {f.badge}
                </span>

                <div className={`w-12 h-12 rounded-xl ${f.iconBg} ${f.iconColor} flex items-center justify-center mb-5`}>
                  {f.icon}
                </div>
                <h3 className="font-heading font-semibold text-lg text-on-surface mb-2">{f.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────── */}
      <section
        className="py-24 border-y border-outline-variant/40"
        style={{ background: "var(--surface-container-low)" }}
        aria-labelledby="how-it-works-heading"
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-secondary mb-3 px-4 py-1.5 rounded-full"
              style={{ background: "rgba(0,108,73,0.08)", border: "1px solid rgba(0,108,73,0.15)" }}>
              Simple Process
            </span>
            <h2 id="how-it-works-heading" className="text-3xl md:text-5xl font-heading font-bold text-on-surface mt-4">
              Go live in <span className="gradient-text">3 easy steps</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-14 left-1/3 right-1/3 h-px bg-gradient-to-r from-primary/30 to-secondary/30" aria-hidden />

            {[
              {
                step: "01",
                title: "Discover",
                desc: "Browse verified billboards by city, size, format, or footfall. Use our map view to find the perfect spot.",
                icon: <Search className="w-6 h-6" />,
              },
              {
                step: "02",
                title: "Book & Pay",
                desc: "Secure your dates and pay in full. Your money is held safely until each milestone is confirmed.",
                icon: <Zap className="w-6 h-6" />,
              },
              {
                step: "03",
                title: "Track & Verify",
                desc: "Get GPS-stamped installation photos and real-time impression data. Dispute-free, always.",
                icon: <ShieldCheck className="w-6 h-6" />,
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex flex-col items-center text-center p-8 rounded-2xl glass-panel ambient-shadow"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    {item.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center font-heading">
                    {i + 1}
                  </span>
                </div>
                <span className="text-4xl font-heading font-black text-primary/10 mb-2 leading-none">{item.step}</span>
                <h3 className="text-xl font-heading font-bold text-on-surface mb-3">{item.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── US VS TRADITIONAL ────────────────────────────── */}
      <section className="py-24 bg-background border-t border-outline-variant/40" aria-labelledby="compare-heading">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 id="compare-heading" className="text-3xl md:text-4xl font-heading font-bold text-on-surface">
              The AdSpace <span className="gradient-text">Advantage</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border border-outline-variant bg-surface-container-low opacity-80">
              <h3 className="font-heading font-semibold text-xl text-on-surface-variant mb-6 border-b border-outline-variant pb-4">Traditional OOH</h3>
              <ul className="space-y-4">
                {["Opaque, hidden pricing", "Slow, manual phone bookings", "No proof of installation", "High risk of vendor fraud", "No performance data"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-on-surface-variant text-sm">
                    <X className="w-5 h-5 text-error flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-8 rounded-2xl glass-panel ambient-shadow border-primary/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
              <h3 className="font-heading font-bold text-xl text-primary mb-6 border-b border-primary/20 pb-4">AdSpace Platform</h3>
              <ul className="space-y-4">
                {["100% transparent pricing", "Instant 5-minute booking", "GPS-stamped photo verification", "Secure milestone payouts", "Real-time analytics dashboard"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-on-surface text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────── */}
      <section className="py-24 border-t border-outline-variant/40" style={{ background: "var(--surface-container-low)" }} aria-labelledby="faq-heading">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 id="faq-heading" className="text-3xl font-heading font-bold text-on-surface">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "How does GPS verification work?", a: "Vendors must upload photos of the installed flex through our app. The app automatically captures the exact GPS coordinates and timestamp, matching it against the billboard's listed location." },
              { q: "Are the prices negotiable?", a: "Our platform offers a transparent bidding system for select high-visibility locations, but most inventory is available at guaranteed lowest upfront prices." },
              { q: "How quickly can my campaign go live?", a: "Once your design is approved and payment is escrowed, printing and mounting typically takes 48-72 hours. Digital screens can go live in under 2 hours." },
              { q: "What happens if a vendor doesn't install my ad?", a: "Your payment is held in escrow. If the vendor fails to provide GPS proof within the deadline, you receive an immediate, 100% refund." }
            ].map((faq, i) => (
              <details key={i} className="group glass-panel rounded-xl border border-outline-variant/50 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-on-surface">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-on-surface-variant group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-sm text-on-surface-variant leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────── */}
      <section className="py-24 bg-background" aria-labelledby="testimonials-heading">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3 px-4 py-1.5 rounded-full"
              style={{ background: "rgba(0,74,198,0.08)", border: "1px solid rgba(0,74,198,0.15)" }}>
              Testimonials
            </span>
            <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-heading font-bold text-on-surface mt-4">
              Trusted by <span className="gradient-text">4,800+ brands</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.blockquote
                key={t.name}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-7 rounded-2xl glass-panel ambient-shadow flex flex-col"
              >
                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden />
                  ))}
                </div>
                <p className="text-sm text-on-surface leading-relaxed mb-6 flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <footer className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold font-heading"
                    style={{ background: "linear-gradient(135deg, #004ac6 0%, #006c49 100%)" }}
                    aria-hidden
                  >
                    {t.initials}
                  </div>
                  <div>
                    <cite className="text-sm font-semibold text-on-surface not-italic">{t.name}</cite>
                    <p className="text-xs text-on-surface-variant">{t.role}</p>
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VENDOR SPLIT ─────────────────────────────────── */}
      <section className="py-24 bg-background border-t border-outline-variant/40" aria-labelledby="vendor-heading">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="glass-panel rounded-3xl ambient-shadow overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-12 md:p-16 flex flex-col justify-center">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-secondary mb-4">For Media Owners</span>
              <h2 id="vendor-heading" className="text-3xl md:text-4xl font-heading font-bold text-on-surface mb-4">
                Maximize your <span className="gradient-text">yield.</span>
              </h2>
              <p className="text-on-surface-variant leading-relaxed mb-8">
                Stop chasing payments. List your empty billboards on AdSpace and connect with thousands of national brands. We guarantee on-time payouts for verified installations.
              </p>
              <ul className="space-y-3 mb-8">
                {["Zero listing fees", "Guaranteed 7-day payouts", "Digital contract management"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm font-medium text-on-surface">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> {item}
                  </li>
                ))}
              </ul>
              <div>
                <Link href="/vendors" className="inline-flex items-center gap-2 px-6 py-3 bg-on-background text-background font-semibold rounded-full hover:bg-on-background/90 transition-transform hover:scale-[1.02]">
                  Become a Vendor <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 bg-surface-container flex items-center justify-center p-12">
              <div className="w-full max-w-sm glass-panel rounded-2xl p-6 shadow-xl rotate-2">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-semibold text-on-surface">Recent Booking</span>
                  <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-1 rounded">₹1,45,000 added</span>
                </div>
                <div className="h-2 w-3/4 bg-surface-variant rounded-full mb-3" />
                <div className="h-2 w-1/2 bg-surface-variant rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────────── */}
      <section
        className="py-24 relative overflow-hidden"
        aria-labelledby="cta-heading"
        style={{ background: "linear-gradient(135deg, rgba(0,74,198,0.06) 0%, var(--surface-container-low) 50%, rgba(0,108,73,0.06) 100%)" }}
      >
        {/* Large ambient glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, rgba(0,74,198,0.12) 0%, transparent 70%)" }} />
        </div>

        <div className="max-w-[1440px] relative z-10 mx-auto px-6 lg:px-16 flex flex-col items-center text-center">
          <motion.h2
            id="cta-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-heading font-bold text-on-surface max-w-3xl"
          >
            Ready to put your brand{" "}
            <span className="gradient-text">on the map?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-on-surface-variant max-w-xl leading-relaxed"
          >
            Join thousands of brands driving real-world impact. Start your first
            billboard campaign today — no commitment required.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/signup"
              id="cta-signup-btn"
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ boxShadow: "0 8px 24px rgba(0,74,198,0.25)" }}
            >
              Start for Free <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/marketplace"
              id="cta-browse-btn"
              className="px-8 py-4 glass-button-secondary font-semibold rounded-full flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Inventory
            </Link>
          </motion.div>

          {/* Micro trust row */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-xs text-on-surface-variant"
          >
            Trusted by brands like NourishCo, QuickBite, and LuxeWear · SOC2 Compliant · GDPR Ready
          </motion.p>
        </div>
      </section>

    </main>
  );
}
