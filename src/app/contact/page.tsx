"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Building2,
  Users,
  HelpCircle,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const inquiryTypes = [
  { value: "advertiser", label: "I want to advertise", icon: <Building2 className="w-4 h-4" /> },
  { value: "vendor", label: "I want to list my inventory", icon: <MapPin className="w-4 h-4" /> },
  { value: "agency", label: "Agency partnership", icon: <Users className="w-4 h-4" /> },
  { value: "support", label: "General support", icon: <HelpCircle className="w-4 h-4" /> },
];

const contactInfo = [
  { icon: <Mail className="w-5 h-5 text-primary" />, label: "Email", value: "hello@adspace.in", href: "mailto:hello@adspace.in" },
  { icon: <Phone className="w-5 h-5 text-secondary" />, label: "Phone", value: "+91 90000-00000", href: "tel:+919000000000" },
  { icon: <MapPin className="w-5 h-5 text-tertiary" />, label: "Office", value: "Bhubaneswar, Odisha, India", href: null },
  { icon: <Clock className="w-5 h-5 text-purple-500" />, label: "Hours", value: "Mon — Sat, 9 AM — 7 PM IST", href: null },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setErrors(data.errors || ["Something went wrong. Please try again."]);
      }
    } catch {
      setErrors(["Network error. Please check your connection and try again."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-16 text-center">
        <motion.div {...fadeUp}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            <MessageSquare className="w-4 h-4" />
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-on-background tracking-tight mb-4">
            We'd love to hear <span className="text-primary">from you</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-lg mx-auto">
            Whether you're an advertiser, media owner, or agency — our team responds within 24 hours.
          </p>
        </motion.div>
      </section>

      {/* ── Main Grid ────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-16 pb-20">
        <div className="grid lg:grid-cols-5 gap-8">

          {/* Left: Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div {...fadeUp} className="surface-card p-7 space-y-6">
              <h2 className="text-lg font-bold text-on-surface">Contact Information</h2>
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-surface-variant/50 flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-medium text-on-surface hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-on-surface">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="surface-card p-7">
              <h2 className="text-lg font-bold text-on-surface mb-4">Quick Links</h2>
              <div className="space-y-3">
                {[
                  { label: "Browse billboard marketplace", href: "/marketplace" },
                  { label: "View transparent pricing", href: "/pricing" },
                  { label: "Vendor onboarding portal", href: "/vendors" },
                  { label: "Campaign analytics demo", href: "/analytics" },
                ].map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-surface-container transition-colors group"
                  >
                    <span className="text-sm text-on-surface group-hover:text-primary transition-colors">{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="lg:col-span-3">
            <div className="surface-card p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-8 h-8 text-secondary" />
                  </div>
                  <h2 className="text-2xl font-bold text-on-surface mb-2">Message sent!</h2>
                  <p className="text-on-surface-variant mb-6">We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", type: "", message: "" }); }}
                    className="px-6 py-2.5 rounded-full border-2 border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-xl font-bold text-on-surface mb-1">Send us a message</h2>
                  <p className="text-sm text-on-surface-variant mb-6">Fill out the form below and our team will respond within one business day.</p>

                  {/* Inquiry Type */}
                  <div>
                    <label className="text-sm font-medium text-on-surface block mb-2">I am a...</label>
                    <div className="grid grid-cols-2 gap-2">
                      {inquiryTypes.map((t) => (
                        <button
                          type="button"
                          key={t.value}
                          onClick={() => setFormData({ ...formData, type: t.value })}
                          className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                            formData.type === t.value
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-outline-variant text-on-surface-variant hover:border-primary/50"
                          }`}
                        >
                          {t.icon}
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="text-sm font-medium text-on-surface block mb-1.5">Full Name</label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-surface-container text-on-surface text-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-sm font-medium text-on-surface block mb-1.5">Email</label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-surface-container text-on-surface text-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="text-sm font-medium text-on-surface block mb-1.5">Phone (optional)</label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-container text-on-surface text-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="text-sm font-medium text-on-surface block mb-1.5">Message</label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-container text-on-surface text-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                      placeholder="Tell us about your project, campaign goals, or how we can help..."
                    />
                  </div>

                  {errors.length > 0 && (
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                      {errors.map((err, i) => (
                        <p key={i} className="text-sm text-red-600 dark:text-red-400">{err}</p>
                      ))}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
