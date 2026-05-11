"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
  MapPin,
  ChevronDown,
  Building2,
  IndianRupee
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function VendorsPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      {/* ─── HERO SECTION ─────────────────────────────────── */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col items-center text-center px-6" aria-labelledby="hero-heading">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
          <div className="w-[800px] h-[600px] bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-[120px] opacity-70 mix-blend-multiply" />
        </div>

        <motion.div
          className="relative z-10 max-w-[1000px] mx-auto"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold text-secondary"
              style={{ background: "rgba(0,108,73,0.08)", border: "1px solid rgba(0,108,73,0.15)" }}>
              <Building2 className="w-4 h-4" /> For Media Owners & Property Landlords
            </span>
          </motion.div>

          <motion.h1
            id="hero-heading"
            variants={fadeUp}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-on-surface tracking-tight leading-[1.1] mb-6"
          >
            Turn empty billboards into<br className="hidden md:block" />
            <span className="gradient-text">guaranteed revenue.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Join India&apos;s fastest-growing OOH network. List your inventory for free, get booked by national brands, and receive on-time payments—no chasing invoices.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup/vendor"
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto justify-center shadow-lg shadow-primary/20"
            >
              Start Earning Today <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-6 text-xs font-semibold text-on-surface-variant uppercase tracking-widest">
            0% Listing Fees · Instant Approvals
          </motion.p>
        </motion.div>
      </section>

      {/* ─── VENDOR TRACTION / STATS ──────────────────────── */}
      <section className="py-12 border-y border-outline-variant/40 bg-surface-container-low" aria-label="Platform metrics">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-outline-variant/30 text-center">
            {[
              { label: "Active Brands", value: "4,800+" },
              { label: "Payouts Processed", value: "₹120Cr+" },
              { label: "Average Yield Increase", value: "34%" },
              { label: "Payment Default Rate", value: "0%" }
            ].map((stat, i) => (
              <motion.div key={stat.label} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i} className="px-4">
                <p className="text-3xl md:text-4xl font-heading font-black text-primary mb-2">{stat.value}</p>
                <p className="text-xs md:text-sm font-medium text-on-surface-variant uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VALUE PROPOSITION ────────────────────────────── */}
      <section className="py-24 bg-surface-container-low border-y border-outline-variant/40" aria-labelledby="value-heading">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 id="value-heading" className="text-3xl md:text-4xl font-heading font-bold text-on-surface">
              Why partner with <span className="gradient-text">AdSpace?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <IndianRupee className="w-6 h-6" />,
                title: "Guaranteed Payouts",
                desc: "No more following up for payments. Once you upload GPS-verified installation photos, funds are released from escrow automatically.",
                bg: "bg-emerald-500/10",
                color: "text-emerald-600"
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Maximize Occupancy",
                desc: "Get your inventory in front of thousands of top-tier national brands and agencies actively looking for spaces in your city.",
                bg: "bg-blue-500/10",
                color: "text-blue-600"
              },
              {
                icon: <ShieldCheck className="w-6 h-6" />,
                title: "Zero Risk & Free to List",
                desc: "We only make money when you do. There are no subscription fees or hidden charges to list your hoardings on our platform.",
                bg: "bg-purple-500/10",
                color: "text-purple-600"
              }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="p-8 rounded-2xl glass-panel ambient-shadow border border-outline-variant/50 hover:-translate-y-1 transition-transform"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-on-surface mb-3">{feature.title}</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ACCEPTED INVENTORY ───────────────────────────── */}
      <section className="py-24 bg-background border-b border-outline-variant/40" aria-labelledby="inventory-heading">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3 px-4 py-1.5 rounded-full"
              style={{ background: "rgba(0,74,198,0.08)", border: "1px solid rgba(0,74,198,0.15)" }}>
              What You Can List
            </span>
            <h2 id="inventory-heading" className="text-3xl md:text-4xl font-heading font-bold text-on-surface mt-2">
              We monetize all <span className="gradient-text">OOH formats</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Static Hoardings", icon: <Building2 className="w-8 h-8" />, desc: "Traditional billboards, unipoles, and wall wraps." },
              { title: "Digital Screens (DOOH)", icon: <Zap className="w-8 h-8" />, desc: "LED displays and programmatic-ready screens." },
              { title: "Transit Media", icon: <MapPin className="w-8 h-8" />, desc: "Bus shelters, metro pillars, and railway advertising." },
              { title: "Mall & Airport", icon: <TrendingUp className="w-8 h-8" />, desc: "High-footfall indoor digital and static kiosks." }
            ].map((type, i) => (
              <motion.div key={type.title} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="p-6 rounded-2xl border border-outline-variant/50 bg-surface hover:bg-surface-container-low transition-colors group cursor-default"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {type.icon}
                </div>
                <h3 className="font-heading font-bold text-lg text-on-surface mb-2">{type.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{type.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS FOR VENDORS ─────────────────────── */}
      <section className="py-24 bg-background" aria-labelledby="process-heading">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3 px-4 py-1.5 rounded-full"
                style={{ background: "rgba(0,74,198,0.08)", border: "1px solid rgba(0,74,198,0.15)" }}>
                Vendor Workflow
              </span>
              <h2 id="process-heading" className="text-3xl md:text-5xl font-heading font-bold text-on-surface mt-4 mb-8">
                Seamless management from <span className="gradient-text">booking to billing.</span>
              </h2>
              
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-outline-variant before:to-transparent">
                {[
                  { step: "01", title: "List Your Inventory", desc: "Upload photos, dimensions, and pricing for your static or digital boards." },
                  { step: "02", title: "Accept Bookings", desc: "Receive booking requests directly via SMS/Email and approve them with one tap." },
                  { step: "03", title: "Upload GPS Proof", desc: "Once the flex is mounted, use our vendor app to take a geo-tagged photo." },
                  { step: "04", title: "Get Paid", desc: "Payment is processed immediately to your registered bank account upon verification." }
                ].map((item, i) => (
                  <motion.div key={item.step} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i} className="relative flex items-start gap-6">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center font-heading font-bold text-primary relative z-10 shadow-sm">
                      {item.step}
                    </div>
                    <div className="pt-2">
                      <h3 className="text-xl font-heading font-bold text-on-surface mb-2">{item.title}</h3>
                      <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <div className="glass-panel rounded-3xl p-8 ambient-shadow relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                <div className="relative z-10 space-y-4">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="font-heading font-bold text-on-surface">Recent Activity</h4>
                    <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2 py-1 rounded">Live Updates</span>
                  </div>
                  
                  {[
                    { action: "Booking Received", loc: "Bhubaneswar Airport Road", amount: "₹35,000", time: "2m ago" },
                    { action: "Payment Released", loc: "Connaught Place, Delhi", amount: "₹85,000", time: "1hr ago" },
                    { action: "Proof Verified", loc: "Bandra Kurla Complex", amount: "-", time: "3hrs ago" }
                  ].map((activity, i) => (
                    <div key={i} className="p-4 rounded-xl bg-surface border border-outline-variant/30 flex justify-between items-center shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-on-surface">{activity.action}</p>
                          <p className="text-xs text-on-surface-variant">{activity.loc}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm text-on-surface">{activity.amount}</p>
                        <p className="text-[10px] text-on-surface-variant">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ESCROW & SECURITY ────────────────────────────── */}
      <section className="py-24 bg-surface-container-low border-y border-outline-variant/40" aria-labelledby="security-heading">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 w-full">
            <div className="relative w-full max-w-sm mx-auto aspect-square rounded-full border border-dashed border-primary/30 flex items-center justify-center p-8">
               <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse" />
               <div className="w-full h-full rounded-full border border-secondary/30 flex items-center justify-center p-8 relative z-10 bg-background/50 backdrop-blur-sm">
                 <div className="text-center">
                   <ShieldCheck className="w-16 h-16 text-secondary mx-auto mb-4" />
                   <h3 className="font-heading font-bold text-xl text-on-surface mb-2">Automated Escrow</h3>
                   <p className="text-xs text-on-surface-variant px-4">Funds are secured in a nodal account before your campaign begins.</p>
                 </div>
               </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 id="security-heading" className="text-3xl md:text-4xl font-heading font-bold text-on-surface mb-6">
              Say goodbye to <span className="gradient-text">bad debts.</span>
            </h2>
            <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
              The biggest challenge in outdoor advertising is collections. AdSpace solves this with our <strong className="text-on-surface">Milestone Escrow System</strong>.
            </p>
            <ul className="space-y-6">
              {[
                "Agencies pay 100% upfront into a secure RBI-regulated nodal account.",
                "You receive an instant notification that funds are secured.",
                "Upload your GPS-stamped installation photos via the AdSpace Vendor App.",
                "Funds are automatically released to your bank account within 24 hours of verification."
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-secondary/20 text-secondary flex items-center justify-center text-sm font-bold mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-base text-on-surface font-medium leading-relaxed">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── VENDOR TESTIMONIALS ──────────────────────────── */}
      <section className="py-24 bg-background" aria-labelledby="vendor-testimonials-heading">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 id="vendor-testimonials-heading" className="text-3xl md:text-4xl font-heading font-bold text-on-surface">
              Built for <span className="gradient-text">Media Owners</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "Before AdSpace, my team spent 40% of their time chasing payments and sending Excel sheets. Now, everything is automated. We've seen a 30% jump in occupancy from national brands we couldn't reach before.",
                name: "Rajesh Kumar",
                role: "Director, Metro Ads Media",
                initials: "RK"
              },
              {
                quote: "The GPS verification system is brilliant. It completely eliminates disputes with agencies. I upload the photos, and the money hits my account the next day. No more 90-day payment cycles.",
                name: "Priya Sharma",
                role: "Founder, Skyline OOH",
                initials: "PS"
              }
            ].map((t, i) => (
              <motion.blockquote key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i} className="p-8 rounded-2xl glass-panel ambient-shadow border border-outline-variant/30">
                <p className="text-lg text-on-surface-variant italic mb-8">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold font-heading shadow-md">
                    {t.initials}
                  </div>
                  <div>
                    <cite className="not-italic font-bold text-on-surface block">{t.name}</cite>
                    <span className="text-sm text-on-surface-variant">{t.role}</span>
                  </div>
                </div>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VENDOR FAQ ───────────────────────────────────── */}
      <section className="py-24 border-t border-outline-variant/40" style={{ background: "var(--surface-container-low)" }} aria-labelledby="faq-heading">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 id="faq-heading" className="text-3xl font-heading font-bold text-on-surface">Vendor FAQ</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Is there a fee to join?", a: "No, listing your inventory is completely free. We only charge a small platform commission when a successful booking is made." },
              { q: "How do I receive payments?", a: "Payments are processed via NEFT/RTGS directly to your registered bank account. Escrow funds are released immediately upon GPS verification of the installation." },
              { q: "Who provides the flex printing?", a: "Brands typically provide the design. Depending on your preference, you can offer a bundled print+mount service or require the brand to ship the printed flex to your warehouse." },
              { q: "What if an agency cancels last minute?", a: "Our smart contract system protects vendors. Cancellations within 14 days of the campaign start date result in a 50% payout to you." }
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

      {/* ─── CTA BANNER ───────────────────────────────────── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgba(0,74,198,0.06) 0%, var(--surface-container-low) 50%, rgba(0,108,73,0.06) 100%)" }}
      >
        <div className="max-w-[1000px] relative z-10 mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-on-surface mb-6">
            Ready to monetize your inventory?
          </h2>
          <p className="text-on-surface-variant max-w-xl mx-auto leading-relaxed mb-8">
            Join hundreds of media owners who have increased their occupancy rates and streamlined their operations with AdSpace.
          </p>
          <Link
            href="/signup/vendor"
            className="inline-flex px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-lg shadow-primary/20"
          >
            Create Vendor Account <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
