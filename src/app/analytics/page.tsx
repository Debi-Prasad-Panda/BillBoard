"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  TrendingUp,
  Users,
  Eye,
  Target,
  Calendar,
  Download,
  Filter,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  Clock,
  Activity,
} from "lucide-react";

/* ── MOCK DATA ────────────────────────────────────────────── */
const trendData = [
  { name: "Mon", impressions: 1200000, footfall: 450000, interactions: 2400 },
  { name: "Tue", impressions: 1350000, footfall: 520000, interactions: 2800 },
  { name: "Wed", impressions: 1100000, footfall: 410000, interactions: 2100 },
  { name: "Thu", impressions: 1500000, footfall: 580000, interactions: 3200 },
  { name: "Fri", impressions: 1900000, footfall: 750000, interactions: 4500 },
  { name: "Sat", impressions: 2400000, footfall: 950000, interactions: 6200 },
  { name: "Sun", impressions: 2100000, footfall: 850000, interactions: 5800 },
];

const demographicData = [
  { name: "Age 18-24", value: 25 },
  { name: "Age 25-34", value: 40 },
  { name: "Age 35-44", value: 20 },
  { name: "Age 45+", value: 15 },
];
const COLORS = ["#3b82f6", "#10b981", "#f97316", "#8b5cf6"];

const locationData = [
  { name: "Mumbai", value: 85 },
  { name: "Delhi", value: 72 },
  { name: "Bengaluru", value: 65 },
  { name: "Hyderabad", value: 50 },
  { name: "Pune", value: 38 },
];

const hourlyTraffic = [
  { time: "6AM", traffic: 20 },
  { time: "9AM", traffic: 85 },
  { time: "12PM", traffic: 60 },
  { time: "3PM", traffic: 55 },
  { time: "6PM", traffic: 100 },
  { time: "9PM", traffic: 70 },
  { time: "12AM", traffic: 15 },
];

const kpis = [
  {
    title: "Total Impressions",
    value: "11.5M",
    trend: "+14.2%",
    isUp: true,
    icon: <Eye className="w-5 h-5 text-primary" />,
  },
  {
    title: "Verified Footfall",
    value: "4.2M",
    trend: "+8.4%",
    isUp: true,
    icon: <Users className="w-5 h-5 text-secondary" />,
  },
  {
    title: "QR Interactions",
    value: "27.4K",
    trend: "+22.1%",
    isUp: true,
    icon: <Target className="w-5 h-5 text-tertiary" />,
  },
  {
    title: "Cost Per Mille (CPM)",
    value: "₹185",
    trend: "-4.3%",
    isUp: true, // Lower cost is better
    icon: <TrendingUp className="w-5 h-5 text-purple-500" />,
  },
];

/* ── HELPER COMPONENTS ────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-4 rounded-xl shadow-xl border border-outline-variant/30">
        <p className="font-semibold text-on-surface mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-on-surface-variant capitalize">
              {entry.name}:
            </span>
            <span className="font-bold text-on-surface">
              {entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7D");

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 lg:px-16">
      <div className="max-w-[1440px] mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-on-background tracking-tight mb-2">
              Command <span className="text-primary">Center</span>
            </h1>
            <p className="text-on-surface-variant">
              Real-time intelligence and footfall attribution for your OOH campaigns.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-surface-container rounded-full p-1">
              {["24H", "7D", "30D", "YTD"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    timeRange === range
                      ? "bg-primary text-white shadow-md"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-surface-container hover:bg-surface-variant text-on-surface rounded-full transition-colors font-medium text-sm">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* AI Insights Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-tertiary/10 border border-primary/20 p-6 flex flex-col md:flex-row items-start md:items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-on-surface mb-1 flex items-center gap-2">
              AI Campaign Insight
              <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[10px] uppercase tracking-wider font-bold">
                Live
              </span>
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Your digital billboards in <strong className="text-primary">Andheri West (Mumbai)</strong> are overperforming by 34% during evening rush hours (6 PM - 9 PM). Consider reallocating 15% of your daytime budget to evening slots for optimal ROI.
            </p>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="surface-card p-6 flex flex-col hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-surface-variant/50 flex items-center justify-center">
                  {kpi.icon}
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    kpi.isUp ? "text-secondary" : "text-error"
                  }`}
                >
                  {kpi.isUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {kpi.trend}
                </div>
              </div>
              <h4 className="text-on-surface-variant text-sm font-medium mb-1">
                {kpi.title}
              </h4>
              <span className="text-3xl font-bold text-on-background">
                {kpi.value}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Trend Area Chart */}
          <div className="lg:col-span-2 surface-card p-6 flex flex-col min-h-[400px]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg text-on-surface">Performance Trends</h3>
                <p className="text-sm text-on-surface-variant">Impressions vs Footfall Traffic</p>
              </div>
            </div>
            <div className="flex-1 w-full h-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorFootfall" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--outline-variant)" opacity={0.5} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--on-surface-variant)', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--on-surface-variant)', fontSize: 12 }} tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="impressions" name="Impressions" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorImpressions)" />
                  <Area type="monotone" dataKey="footfall" name="Verified Footfall" stroke="var(--secondary)" strokeWidth={3} fillOpacity={1} fill="url(#colorFootfall)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Traffic by Time of Day */}
          <div className="surface-card p-6 flex flex-col min-h-[400px]">
            <div className="mb-6">
              <h3 className="font-bold text-lg text-on-surface flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Hourly Traffic Heat
              </h3>
              <p className="text-sm text-on-surface-variant">Relative footfall by hour</p>
            </div>
            <div className="flex-1 w-full h-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyTraffic} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--outline-variant)" opacity={0.5} />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: 'var(--on-surface-variant)', fontSize: 12 }} dy={10} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: 'var(--surface-variant)', opacity: 0.4 }} content={<CustomTooltip />} />
                  <Bar dataKey="traffic" name="Traffic Index" radius={[4, 4, 0, 0]}>
                    {hourlyTraffic.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.traffic > 80 ? 'var(--primary)' : 'var(--primary-fixed-dim)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Secondary Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performing Locations */}
          <div className="surface-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg text-on-surface flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-secondary" />
                  Top Locations (Share of Voice)
                </h3>
              </div>
            </div>
            <div className="space-y-5">
              {locationData.map((loc, index) => (
                <div key={loc.name} className="relative">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-on-surface">{loc.name}</span>
                    <span className="text-on-surface-variant">{loc.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${loc.value}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-secondary rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Demographics Pie */}
          <div className="surface-card p-6 flex flex-col">
            <div className="mb-2">
              <h3 className="font-bold text-lg text-on-surface flex items-center gap-2">
                <Users className="w-5 h-5 text-tertiary" />
                Audience Demographics (Age Group)
              </h3>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-[250px]">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={demographicData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {demographicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: 'var(--on-surface-variant)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Detailed Data Table */}
        <div className="surface-card overflow-hidden">
          <div className="p-6 border-b border-outline-variant/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-bold text-lg text-on-surface flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Active Campaigns
            </h3>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-xs uppercase tracking-wider text-on-surface-variant">
                  <th className="p-4 font-semibold">Campaign Name</th>
                  <th className="p-4 font-semibold">Location</th>
                  <th className="p-4 font-semibold">Format</th>
                  <th className="p-4 font-semibold">Impressions</th>
                  <th className="p-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-outline-variant/30">
                {[
                  { name: "Summer Sale 2024", loc: "Mumbai - Bandra", fmt: "Digital Screen", imp: "2.4M", status: "Active" },
                  { name: "Brand Refresh", loc: "Delhi - CP", fmt: "Static Hoarding", imp: "1.8M", status: "Active" },
                  { name: "App Launch", loc: "Bengaluru - Indiranagar", fmt: "Transit (Bus)", imp: "850K", status: "Optimizing" },
                  { name: "Real Estate Expo", loc: "Pune - Koregaon Park", fmt: "Digital Screen", imp: "420K", status: "Ending Soon" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-surface-container/50 transition-colors">
                    <td className="p-4 font-medium text-on-surface">{row.name}</td>
                    <td className="p-4 text-on-surface-variant">{row.loc}</td>
                    <td className="p-4 text-on-surface-variant">{row.fmt}</td>
                    <td className="p-4 font-semibold text-primary">{row.imp}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        row.status === "Active" ? "bg-secondary/10 text-secondary" :
                        row.status === "Optimizing" ? "bg-tertiary/10 text-tertiary" :
                        "bg-outline-variant/30 text-on-surface-variant"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
