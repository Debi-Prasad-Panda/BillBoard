"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Calendar,
  MapPin,
  Eye,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  PauseCircle,
  ArrowUpRight,
  MoreVertical,
  BarChart3,
  Target,
  ChevronDown,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

/* ── Mock Campaign Data ──────────────────────────────────── */
const campaigns = [
  {
    id: 1,
    name: "Festive Season Mega Sale",
    status: "active",
    cities: ["Mumbai", "Delhi", "Bengaluru"],
    format: "Digital Screen",
    boards: 18,
    startDate: "Apr 15, 2026",
    endDate: "May 30, 2026",
    budget: "₹8,40,000",
    spent: "₹5,20,000",
    impressions: "4.2M",
    cpm: "₹124",
    progress: 62,
  },
  {
    id: 2,
    name: "App Launch — Phase 2",
    status: "active",
    cities: ["Hyderabad", "Pune"],
    format: "Static Hoarding",
    boards: 12,
    startDate: "May 1, 2026",
    endDate: "Jun 15, 2026",
    budget: "₹3,60,000",
    spent: "₹1,10,000",
    impressions: "1.8M",
    cpm: "₹61",
    progress: 30,
  },
  {
    id: 3,
    name: "Brand Awareness — Bhubaneswar",
    status: "scheduled",
    cities: ["Bhubaneswar"],
    format: "Transit Media",
    boards: 8,
    startDate: "Jun 1, 2026",
    endDate: "Jul 1, 2026",
    budget: "₹1,20,000",
    spent: "₹0",
    impressions: "—",
    cpm: "—",
    progress: 0,
  },
  {
    id: 4,
    name: "Winter Collection Push",
    status: "completed",
    cities: ["Delhi", "Jaipur", "Lucknow"],
    format: "Digital Screen",
    boards: 22,
    startDate: "Jan 5, 2026",
    endDate: "Feb 28, 2026",
    budget: "₹12,00,000",
    spent: "₹11,80,000",
    impressions: "9.6M",
    cpm: "₹123",
    progress: 100,
  },
  {
    id: 5,
    name: "Real Estate Expo",
    status: "paused",
    cities: ["Pune"],
    format: "Static Hoarding",
    boards: 4,
    startDate: "May 5, 2026",
    endDate: "May 20, 2026",
    budget: "₹80,000",
    spent: "₹35,000",
    impressions: "320K",
    cpm: "₹109",
    progress: 44,
  },
];

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  active: { label: "Active", color: "text-secondary", bg: "bg-secondary/10", icon: <PlayCircle className="w-3.5 h-3.5" /> },
  scheduled: { label: "Scheduled", color: "text-primary", bg: "bg-primary/10", icon: <Clock className="w-3.5 h-3.5" /> },
  completed: { label: "Completed", color: "text-on-surface-variant", bg: "bg-surface-variant/50", icon: <CheckCircle className="w-3.5 h-3.5" /> },
  paused: { label: "Paused", color: "text-tertiary", bg: "bg-tertiary/10", icon: <PauseCircle className="w-3.5 h-3.5" /> },
};

const summaryStats = [
  { label: "Active Campaigns", value: "2", icon: <PlayCircle className="w-5 h-5 text-secondary" />, trend: null },
  { label: "Total Impressions", value: "16.0M", icon: <Eye className="w-5 h-5 text-primary" />, trend: "+18%" },
  { label: "Total Spend", value: "₹18.45L", icon: <TrendingUp className="w-5 h-5 text-tertiary" />, trend: null },
  { label: "Avg. CPM", value: "₹104", icon: <Target className="w-5 h-5 text-purple-500" />, trend: "-8%" },
];

export default function CampaignsPage() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = campaigns.filter((c) => {
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.cities.some((city) => city.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 lg:px-16">
      <div className="max-w-[1440px] mx-auto space-y-8">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-on-background tracking-tight mb-2">
              Campaign <span className="text-primary">Manager</span>
            </h1>
            <p className="text-on-surface-variant">
              Track, manage, and optimize every outdoor campaign from one place.
            </p>
          </div>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg self-start"
          >
            <Plus className="w-4 h-4" />
            New Campaign
          </Link>
        </div>

        {/* ── Summary Stats ──────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="surface-card p-5 flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-full bg-surface-variant/50 flex items-center justify-center">
                  {stat.icon}
                </div>
                {stat.trend && (
                  <span className={`text-xs font-bold flex items-center gap-0.5 ${stat.trend.startsWith("+") ? "text-secondary" : "text-primary"}`}>
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.trend}
                  </span>
                )}
              </div>
              <span className="text-xs text-on-surface-variant mb-1">{stat.label}</span>
              <span className="text-2xl font-bold text-on-background">{stat.value}</span>
            </motion.div>
          ))}
        </div>

        {/* ── Filters & Search ───────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search by campaign name or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-surface-container text-on-surface text-sm placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
            />
          </div>

          {/* Status Filters */}
          <div className="flex items-center bg-surface-container rounded-full p-1 self-start">
            {["all", "active", "scheduled", "paused", "completed"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
                  filterStatus === s
                    ? "bg-primary text-white shadow-md"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ── Campaign Cards ─────────────────────────────────── */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((campaign) => {
              const status = statusConfig[campaign.status];
              return (
                <motion.div
                  key={campaign.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="surface-card p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                >
                  {/* Top Row: Name + Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                        {campaign.name}
                      </h3>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${status.color} ${status.bg}`}>
                        {status.icon}
                        {status.label}
                      </span>
                    </div>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors self-end sm:self-auto">
                      <MoreVertical className="w-4 h-4 text-on-surface-variant" />
                    </button>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-5">
                    <div>
                      <span className="text-[11px] text-on-surface-variant uppercase tracking-wider block mb-1">Cities</span>
                      <div className="flex flex-wrap gap-1">
                        {campaign.cities.map((city) => (
                          <span key={city} className="inline-flex items-center gap-1 text-xs text-on-surface font-medium bg-surface-variant/50 px-2 py-0.5 rounded-full">
                            <MapPin className="w-3 h-3 text-primary" />
                            {city}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-[11px] text-on-surface-variant uppercase tracking-wider block mb-1">Format</span>
                      <span className="text-sm font-medium text-on-surface">{campaign.format}</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-on-surface-variant uppercase tracking-wider block mb-1">Boards</span>
                      <span className="text-sm font-medium text-on-surface">{campaign.boards}</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-on-surface-variant uppercase tracking-wider block mb-1">Duration</span>
                      <span className="text-xs text-on-surface">{campaign.startDate} — {campaign.endDate}</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-on-surface-variant uppercase tracking-wider block mb-1">Impressions</span>
                      <span className="text-sm font-bold text-primary">{campaign.impressions}</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-on-surface-variant uppercase tracking-wider block mb-1">CPM</span>
                      <span className="text-sm font-bold text-secondary">{campaign.cpm}</span>
                    </div>
                  </div>

                  {/* Budget Progress Bar */}
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-on-surface-variant">
                        Budget: <span className="font-semibold text-on-surface">{campaign.spent}</span> / {campaign.budget}
                      </span>
                      <span className="font-semibold text-on-surface">{campaign.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${campaign.progress}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`h-full rounded-full ${
                          campaign.status === "completed" ? "bg-on-surface-variant" :
                          campaign.status === "paused" ? "bg-tertiary" :
                          "bg-primary"
                        }`}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="surface-card p-12 text-center">
              <AlertCircle className="w-10 h-10 text-on-surface-variant/50 mx-auto mb-3" />
              <h3 className="font-bold text-on-surface mb-1">No campaigns found</h3>
              <p className="text-sm text-on-surface-variant">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
