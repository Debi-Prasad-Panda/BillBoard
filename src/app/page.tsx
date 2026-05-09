"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, ShieldCheck, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-24 pb-32">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40 dark:opacity-20 blur-[120px] mix-blend-screen">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-secondary rounded-full" />
        </div>

        <div className="container relative z-10 mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium">The Premium OOH Marketplace</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading font-bold tracking-tight text-foreground max-w-4xl"
          >
            Dominate the Skyline with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">AdSpace</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            Discover, book, and manage premium out-of-home advertising campaigns with real-time analytics and seamless logistics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <button className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]">
              Explore Inventory <ArrowRight className="w-5 h-5" />
            </button>
            <button className="h-14 px-8 bg-background border border-border hover:bg-accent text-foreground font-medium rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
              For Billboard Owners
            </button>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">Prime Locations</h3>
              <p className="text-muted-foreground leading-relaxed">
                Access thousands of high-visibility billboard locations across major cities and highways.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">Verified Proof of Play</h3>
              <p className="text-muted-foreground leading-relaxed">
                Guaranteed installation with GPS-stamped photo verification and automated illumination checks.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">Data-Driven Insights</h3>
              <p className="text-muted-foreground leading-relaxed">
                Track impressions, demographics, and campaign ROI with our advanced analytics dashboard.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
