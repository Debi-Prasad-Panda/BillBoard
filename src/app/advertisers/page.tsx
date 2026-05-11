"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  PlayCircle,
  BarChart3,
  Shield,
  Zap,
  MapPin,
  Target,
  Clock,
  Star,
  TrendingUp,
  Building2,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const steps = [
  {
    step: "01",
    title: "Define your audience & budget",
    desc: "Tell us your target cities, audience demographics, and campaign duration. Our AI suggests the best OOH formats for your goal.",
    icon: <Target className="w-6 h-6" />,
  },
  {
    step: "02",
    title: "Browse & book verified inventory",
    desc: "Filter by format, location, traffic density, and CPM. Confirm in real-time — no waiting for callbacks from brokers.",
    icon: <MapPin className="w-6 h-6" />,
  },
  {
    step: "03",
    title: "Go live & track real attribution",
    desc: "Upload your creative. We handle scheduling, printing coordination, and GPS-verified installation proofs.",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    step: "04",
    title: "Measure ROI & optimise",
    desc: "Get real footfall data, audience age breakdowns, and hour-by-hour performance — not just estimated reach.",
    icon: <BarChart3 className="w-6 h-6" />,
  },
];

const features = [
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "GPS Proof of Installation",
    desc: "Every campaign is verified by geo-tagged photographs uploaded by the vendor within 24 hours of installation.",
  },
  {
    icon: <Clock className="w-6 h-6 text-secondary" />,
    title: "Go Live in 48 Hours",
    desc: "From booking to billboard — faster than any traditional media agency. Digital screens go live instantly.",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-tertiary" />,
    title: "Real Footfall Attribution",
    desc: "We partner with mobile signal aggregators to give you actual footfall counts near your hoarding — not panel estimates.",
  },
  {
    icon: <Target className="w-6 h-6 text-purple-500" />,
    title: "Audience Layer Targeting",
    desc: "Overlay demographic data on your location selection — target billboards near offices, malls, schools, or highways.",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-primary" />,
    title: "Campaign Analytics Dashboard",
    desc: "Track impressions, engagement, footfall, and CPM trends — all in real-time, with exportable PDF reports.",
  },
  {
    icon: <Building2 className="w-6 h-6 text-secondary" />,
    title: "Multi-Format Support",
    desc: "Book static hoardings, LED digital boards, metro station panels, mall kiosks, and transit media in one flow.",
  },
];

const formats = [
  { label: "Static Hoardings", desc: "12×8 ft to 60×20 ft, single or double-sided", tag: "Most Popular" },
  { label: "LED Digital Screens", desc: "Dynamic creatives, daypart scheduling, 10-sec slots", tag: "Best ROI" },
  { label: "Transit Media", desc: "Bus shelter wraps, metro station branding, cab wraps", tag: "High Frequency" },
  { label: "Mall & Airport", desc: "Indoor kiosks, atrium banners, concourse screens", tag: "Captive Audience" },
];

const testimonials = [
  {
    quote: "We ran our festive season campaign across 12 cities in under 3 days. The GPS proofs were a game-changer for our board approvals.",
    name: "Priya Nair",
    role: "Head of Marketing, Bangalore-based D2C Brand",
    rating: 5,
  },
  {
    quote: "AdSpace gave us actual footfall data instead of 'estimated reach'. That credibility completely changed how we justify OOH budgets internally.",
    name: "Rohan Mehta",
    role: "Media Planner, Ogilvy Mumbai",
    rating: 5,
  },
];

export default function AdvertisersPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <Building2 className="w-4 h-4" />
              For Brands, Businesses & Agencies
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-on-background tracking-tight mb-6 leading-tight">
              Advertise outdoors without the{" "}
              <span className="text-primary">agency markup.</span>
            </h1>
            <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
              Book verified billboard space across India in minutes. GPS-confirmed installation,
              real footfall data, and a live analytics dashboard — all without speaking to a single broker.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/marketplace"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
              >
                Browse Inventory
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all">
                <PlayCircle className="w-4 h-4" />
                Watch Demo
              </button>
            </div>
          </motion.div>

          {/* Hero Visual — Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="surface-card p-8 ambient-shadow-lg"
          >
            <h3 className="font-bold text-on-surface mb-6 text-lg">Campaign at a Glance</h3>
            <div className="space-y-5">
              {[
                { label: "Total Impressions", value: "2.4M", color: "bg-primary" },
                { label: "Verified Footfall", value: "860K", color: "bg-secondary" },
                { label: "Cities Live", value: "7", color: "bg-tertiary" },
                { label: "Billboards Active", value: "23", color: "bg-purple-500" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm text-on-surface-variant">{item.label}</span>
                  </div>
                  <span className="font-bold text-on-surface">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-outline-variant/30">
              <div className="flex justify-between items-center">
                <span className="text-sm text-on-surface-variant">Avg. CPM</span>
                <span className="text-lg font-bold text-secondary">₹185</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-1">62% lower than agency-booked OOH</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section className="bg-surface-container-low border-y border-outline-variant/30 py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-3xl font-bold text-on-surface mb-3">How it works</h2>
            <p className="text-on-surface-variant max-w-lg mx-auto">From zero to live billboard campaign in 4 simple steps.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.15 }}
                className="surface-card p-6 relative"
              >
                <span className="text-5xl font-black text-primary/10 absolute top-4 right-5">{s.step}</span>
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {s.icon}
                </div>
                <h3 className="font-bold text-on-surface mb-2">{s.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formats ──────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-20">
        <motion.div {...fadeUp} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-on-surface mb-3">Inventory Formats</h2>
          <p className="text-on-surface-variant max-w-lg mx-auto">Every OOH format under one roof. Mix and match to build multi-format campaigns.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {formats.map((f, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.1 }}
              className="surface-card p-6 flex items-start gap-4 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-on-surface">{f.label}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-wide">
                    {f.tag}
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features Grid ────────────────────────────────────── */}
      <section className="bg-surface-container-low border-y border-outline-variant/30 py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-on-surface mb-3">What makes us different</h2>
            <p className="text-on-surface-variant max-w-lg mx-auto">Every feature is built to give you more control, more transparency, and better ROI.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="surface-card p-6 flex flex-col gap-3"
              >
                <div className="w-11 h-11 rounded-xl bg-surface-variant/50 flex items-center justify-center">
                  {f.icon}
                </div>
                <h3 className="font-bold text-on-surface">{f.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-20">
        <motion.div {...fadeUp} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-on-surface mb-3">What advertisers say</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.15 }}
              className="surface-card p-7 flex flex-col gap-4"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-on-surface italic leading-relaxed">"{t.quote}"</p>
              <div>
                <p className="font-semibold text-on-surface">{t.name}</p>
                <p className="text-sm text-on-surface-variant">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-12">
        <motion.div
          {...fadeUp}
          className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-3xl p-10 text-center"
        >
          <h2 className="text-3xl font-bold text-on-surface mb-4">Ready to book your first campaign?</h2>
          <p className="text-on-surface-variant mb-8 max-w-md mx-auto">
            No agency. No markup. Just great billboards, verified data, and full control.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/marketplace"
              className="px-8 py-3.5 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
            >
              Browse All Inventory
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-3.5 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all inline-flex items-center gap-2"
            >
              See Pricing
              <CheckCircle className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
