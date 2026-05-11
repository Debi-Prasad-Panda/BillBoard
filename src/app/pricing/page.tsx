"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, X, Zap } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const plans = [
  {
    name: "Starter",
    tag: null,
    tagline: "Perfect for local businesses & first-time advertisers",
    price: "₹0",
    priceSub: "Platform fee",
    billing: "Pay only per campaign",
    color: "border-outline-variant",
    btnClass: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    features: [
      { text: "Browse full inventory", yes: true },
      { text: "Book single-city campaigns", yes: true },
      { text: "GPS installation proof", yes: true },
      { text: "Basic analytics (impressions)", yes: true },
      { text: "Email support", yes: true },
      { text: "Multi-city bulk booking", yes: false },
      { text: "Footfall attribution data", yes: false },
      { text: "AI campaign optimizer", yes: false },
      { text: "White-label report exports", yes: false },
      { text: "Dedicated account manager", yes: false },
    ],
  },
  {
    name: "Growth",
    tag: "Most Popular",
    tagline: "For growing brands running regular OOH campaigns",
    price: "₹4,999",
    priceSub: "per month",
    billing: "or ₹49,999/year (save 17%)",
    color: "border-primary ring-2 ring-primary/30",
    btnClass: "bg-primary text-white hover:bg-primary/90",
    features: [
      { text: "Browse full inventory", yes: true },
      { text: "Book single-city campaigns", yes: true },
      { text: "GPS installation proof", yes: true },
      { text: "Full analytics dashboard", yes: true },
      { text: "Priority email & chat support", yes: true },
      { text: "Multi-city bulk booking (up to 10)", yes: true },
      { text: "Footfall attribution data", yes: true },
      { text: "AI campaign optimizer", yes: true },
      { text: "White-label report exports", yes: false },
      { text: "Dedicated account manager", yes: false },
    ],
  },
  {
    name: "Enterprise",
    tag: "For Agencies",
    tagline: "Unlimited scale for agencies & large advertisers",
    price: "Custom",
    priceSub: "contact us",
    billing: "Volume discounts available",
    color: "border-outline-variant",
    btnClass: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    features: [
      { text: "Browse full inventory", yes: true },
      { text: "Book single-city campaigns", yes: true },
      { text: "GPS installation proof", yes: true },
      { text: "Full analytics dashboard", yes: true },
      { text: "24/7 priority support line", yes: true },
      { text: "Unlimited multi-city bulk booking", yes: true },
      { text: "Footfall attribution data", yes: true },
      { text: "AI campaign optimizer", yes: true },
      { text: "White-label report exports", yes: true },
      { text: "Dedicated account manager", yes: true },
    ],
  },
];

const faqs = [
  {
    q: "Are there any hidden fees?",
    a: "None. Our platform fee is shown above. Campaign costs are the direct rate-card price from the vendor — no agency markup, no broker commission on top.",
  },
  {
    q: "What do I pay per campaign?",
    a: "You pay the vendor's listed rate for the billboard, for the duration you book. The platform fee (if on a paid plan) is billed separately from your campaign spend.",
  },
  {
    q: "Can I cancel a campaign after booking?",
    a: "Yes. Cancellations more than 14 days before the campaign start are fully refunded. Within 14 days, a 50% payout applies to the vendor.",
  },
  {
    q: "How does vendor pricing work?",
    a: "Vendors set their own base rates. Our AI adjusts CPM dynamically based on traffic, demand, and time of day. You always see the final price before confirming.",
  },
  {
    q: "Is the Starter plan really free?",
    a: "Yes. There is zero platform fee on the Starter plan. You only pay the campaign cost directly to the vendor via our secure escrow system.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-16 text-center">
        <motion.div {...fadeUp}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-6">
            <Zap className="w-4 h-4" />
            Honest, Transparent Pricing
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-on-background tracking-tight mb-6 leading-tight">
            No broker fees. <br className="hidden md:block" />
            <span className="text-primary">No surprises.</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-xl mx-auto">
            Choose the platform plan that fits your scale. Your campaign spend goes directly to verified media owners — we just power the platform.
          </p>
        </motion.div>
      </section>

      {/* ── Plans ────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.15 }}
              className={`surface-card border-2 ${plan.color} p-8 flex flex-col rounded-2xl`}
            >
              {plan.tag && (
                <span className="self-start mb-4 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider">
                  {plan.tag}
                </span>
              )}
              <h2 className="text-2xl font-bold text-on-surface mb-1">{plan.name}</h2>
              <p className="text-sm text-on-surface-variant mb-6 leading-snug">{plan.tagline}</p>

              <div className="mb-1">
                <span className="text-4xl font-black text-on-background">{plan.price}</span>
                <span className="text-on-surface-variant text-sm ml-2">{plan.priceSub}</span>
              </div>
              <p className="text-xs text-on-surface-variant mb-8">{plan.billing}</p>

              <Link
                href={plan.name === "Enterprise" ? "#contact" : "/marketplace"}
                className={`w-full text-center px-6 py-3 rounded-full font-semibold text-sm transition-all mb-8 ${plan.btnClass}`}
              >
                {plan.name === "Enterprise" ? "Contact Sales" : "Get Started Free"}
              </Link>

              <div className="space-y-3">
                {plan.features.map((f, j) => (
                  <div key={j} className="flex items-start gap-3">
                    {f.yes ? (
                      <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-4 h-4 text-outline flex-shrink-0 mt-0.5" />
                    )}
                    <span className={`text-sm ${f.yes ? "text-on-surface" : "text-on-surface-variant/60"}`}>
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── What You Always Get ──────────────────────────────── */}
      <section className="bg-surface-container-low border-y border-outline-variant/30 py-16 mt-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <motion.div {...fadeUp} className="text-center mb-10">
            <h2 className="text-2xl font-bold text-on-surface">Included on every plan, always</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              "Secure escrow payment system",
              "GPS-verified installation proof",
              "Fraud-protected vendor reviews",
              "Real-time booking confirmation",
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-on-surface">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-20">
        <motion.div {...fadeUp} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-on-surface mb-3">Pricing FAQs</h2>
          <p className="text-on-surface-variant">Everything you need to know about how we charge.</p>
        </motion.div>
        <div className="max-w-2xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.1 }}
              className="surface-card p-6"
            >
              <h3 className="font-bold text-on-surface mb-2">{faq.q}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <motion.div
          {...fadeUp}
          className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-3xl p-10 text-center"
        >
          <h2 className="text-2xl font-bold text-on-surface mb-3">Still have questions?</h2>
          <p className="text-on-surface-variant mb-6 max-w-md mx-auto">
            Our team is happy to walk you through the right plan for your business — no pushy sales calls.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all shadow-md"
          >
            Talk to Our Team
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
