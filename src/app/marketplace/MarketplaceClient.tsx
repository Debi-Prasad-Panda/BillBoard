"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Search, SlidersHorizontal, ChevronDown, X, Maximize, Flame, Eye, MapPin, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Billboard } from "./page";

const DynamicMap = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-surface-container-high flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <Image src="/images/premium_map_placeholder.png" alt="Loading Map" fill className="object-cover" />
      </div>
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin z-10" />
    </div>
  )
});


type SortOption = "default" | "price-asc" | "price-desc" | "impressions-desc";
type Filters = {
  sizes: string[];
  types: string[];
  facing: string[];
  availability: string[];
  minPrice: number;
  maxPrice: number;
  sortBy: SortOption;
};

// ── Compute dropdown position (synchronous, called inside pointer handler) ───
function calcDropPos(btnEl: HTMLButtonElement, dropW: number) {
  const r = btnEl.getBoundingClientRect();
  // r.left/right/bottom are CSS viewport pixels — use directly with position:fixed
  const wouldOverflow = r.right + dropW > window.innerWidth;
  return {
    top: r.bottom + 6,
    left: wouldOverflow ? Math.max(8, r.right - dropW) : r.left,
  };
}

// ── Dual Range Slider ────────────────────────────────────────────────────────
function DualRangeSlider({
  min, max, low, high, onChange,
}: {
  min: number; max: number; low: number; high: number;
  onChange: (low: number, high: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<"low" | "high" | null>(null);

  // Local editable strings for the input fields
  const [lowStr, setLowStr] = useState(String(low));
  const [highStr, setHighStr] = useState(String(high));

  // Keep local strings in sync when external value changes (e.g. reset)
  useEffect(() => { setLowStr(String(low)); }, [low]);
  useEffect(() => { setHighStr(String(high)); }, [high]);

  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  const valueFromPct = (clientX: number) => {
    const rect = trackRef.current!.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const raw = min + ratio * (max - min);
    return Math.round(raw / 100) * 100;
  };

  const onTrackPointerDown = (e: React.PointerEvent) => {
    const val = valueFromPct(e.clientX);
    const distLow = Math.abs(val - low);
    const distHigh = Math.abs(val - high);
    dragging.current = distLow <= distHigh ? "low" : "high";
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    if (dragging.current === "low") onChange(Math.min(val, high - 100), high);
    else onChange(low, Math.max(val, low + 100));
  };

  const onTrackPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const val = valueFromPct(e.clientX);
    if (dragging.current === "low") onChange(Math.min(val, high - 100), high);
    else onChange(low, Math.max(val, low + 100));
  };

  const onTrackPointerUp = () => { dragging.current = null; };

  // Commit typed value on blur or Enter
  const commitLow = (raw: string) => {
    const v = parseInt(raw.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(v)) {
      const clamped = Math.max(min, Math.min(v, high - 100));
      onChange(clamped, high);
      setLowStr(String(clamped));
    } else {
      setLowStr(String(low));
    }
  };

  const commitHigh = (raw: string) => {
    const v = parseInt(raw.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(v)) {
      const clamped = Math.min(max, Math.max(v, low + 100));
      onChange(low, clamped);
      setHighStr(String(clamped));
    } else {
      setHighStr(String(high));
    }
  };

  return (
    <div className="px-1 pt-2 pb-1 select-none">
      {/* Editable price inputs row */}
      <div className="flex justify-between items-center mb-3 gap-2">
        {/* Min price input */}
        <div className="flex items-center gap-1 bg-primary/10 border border-primary/20 rounded-full px-2.5 py-1 focus-within:ring-2 focus-within:ring-primary/30 transition-all">
          <span className="text-xs font-semibold text-primary">₹</span>
          <input
            type="text"
            inputMode="numeric"
            value={lowStr}
            onChange={e => setLowStr(e.target.value)}
            onBlur={e => commitLow(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && commitLow(lowStr)}
            className="w-16 bg-transparent text-xs font-semibold text-primary outline-none border-none p-0 text-center"
            aria-label="Minimum price"
          />
        </div>

        <span className="text-xs text-on-surface-variant font-medium">Price / day</span>

        {/* Max price input */}
        <div className="flex items-center gap-1 bg-primary/10 border border-primary/20 rounded-full px-2.5 py-1 focus-within:ring-2 focus-within:ring-primary/30 transition-all">
          <span className="text-xs font-semibold text-primary">₹</span>
          <input
            type="text"
            inputMode="numeric"
            value={highStr}
            onChange={e => setHighStr(e.target.value)}
            onBlur={e => commitHigh(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && commitHigh(highStr)}
            className="w-16 bg-transparent text-xs font-semibold text-primary outline-none border-none p-0 text-center"
            aria-label="Maximum price"
          />
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-7 flex items-center cursor-pointer"
        onPointerDown={onTrackPointerDown}
        onPointerMove={onTrackPointerMove}
        onPointerUp={onTrackPointerUp}
        onPointerCancel={onTrackPointerUp}
      >
        <div className="absolute w-full h-1.5 rounded-full bg-surface-variant" />
        <div
          className="absolute h-1.5 rounded-full bg-primary"
          style={{ left: `${pct(low)}%`, right: `${100 - pct(high)}%` }}
        />
        <div
          className="absolute w-5 h-5 rounded-full bg-primary border-2 border-white shadow-lg ring-2 ring-primary/20 hover:scale-110 -translate-x-1/2 cursor-grab active:cursor-grabbing z-10"
          style={{ left: `${pct(low)}%` }}
        />
        <div
          className="absolute w-5 h-5 rounded-full bg-primary border-2 border-white shadow-lg ring-2 ring-primary/20 hover:scale-110 -translate-x-1/2 cursor-grab active:cursor-grabbing z-10"
          style={{ left: `${pct(high)}%` }}
        />
      </div>

      <div className="flex justify-between mt-0.5">
        <span className="text-[10px] text-outline-variant">₹{min.toLocaleString()}</span>
        <span className="text-[10px] text-outline-variant">₹{max.toLocaleString()}</span>
      </div>
    </div>
  );
}


// ── Multi-Select Dropdown ────────────────────────────────────────────────────
function FilterDropdown({ label, options, selected, onChange }: {
  label: string; options: string[]; selected: string[];
  onChange: (v: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const h = (e: PointerEvent) => {
      const menu = document.querySelector('[data-ddmenu]');
      if (!menu?.contains(e.target as Node) && !btnRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", h);
    return () => document.removeEventListener("pointerdown", h);
  }, []);

  const toggle = (v: string) =>
    onChange(selected.includes(v) ? selected.filter(x => x !== v) : [...selected, v]);

  const handleToggle = (e: React.PointerEvent) => {
    e.stopPropagation();
    if (!open && btnRef.current) {
      setPos(calcDropPos(btnRef.current, 200));
    }
    setOpen(o => !o);
  };

  const isActive = selected.length > 0;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative flex-shrink-0">
      <button
        ref={btnRef}
        onPointerDown={handleToggle}
        className={`rounded-full px-4 py-2 text-sm flex items-center gap-2 transition-all border font-medium whitespace-nowrap ${
          isActive ? "bg-primary text-white border-primary shadow-md" : "bg-surface-container border-outline-variant/30 text-on-surface hover:bg-surface-variant"
        }`}
      >
        {label}
        {isActive && (
          <span className="bg-white/25 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {selected.length}
          </span>
        )}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {mounted && open && pos && createPortal(
        <AnimatePresence>
          <motion.div
            key="filter-menu"
            data-ddmenu
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 99999, minWidth: 200 }}
            className="glass-panel rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-1.5 flex flex-col gap-0.5">
              {options.map(opt => (
                <button
                  key={opt}
                  onPointerDown={e => { e.stopPropagation(); toggle(opt); }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm w-full text-left transition-colors ${
                    selected.includes(opt) ? "bg-primary/10 text-primary font-semibold" : "text-on-surface hover:bg-surface-variant"
                  }`}
                >
                  <span className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    selected.includes(opt) ? "bg-primary border-primary" : "border-outline-variant/60"
                  }`}>
                    {selected.includes(opt) && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

// ── Sort Dropdown ────────────────────────────────────────────────────────────
function SortDropdown({ value, onChange }: { value: SortOption; onChange: (v: SortOption) => void }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const sortOptions: { label: string; value: SortOption }[] = [
    { label: "Recommended", value: "default" },
    { label: "Price: Low → High", value: "price-asc" },
    { label: "Price: High → Low", value: "price-desc" },
    { label: "Most Impressions", value: "impressions-desc" },
  ];

  useEffect(() => {
    const h = (e: PointerEvent) => {
      const menu = document.querySelector('[data-ddmenu]');
      if (!menu?.contains(e.target as Node) && !btnRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", h);
    return () => document.removeEventListener("pointerdown", h);
  }, []);

  const handleToggle = (e: React.PointerEvent) => {
    e.stopPropagation();
    if (!open && btnRef.current) setPos(calcDropPos(btnRef.current, 220));
    setOpen(o => !o);
  };

  const current = sortOptions.find(o => o.value === value)?.label ?? "Recommended";
  const isActive = value !== "default";

  return (
    <div className="relative flex-shrink-0">
      <button
        ref={btnRef}
        onPointerDown={handleToggle}
        className={`rounded-full px-4 py-2 text-sm flex items-center gap-2 transition-all border font-medium whitespace-nowrap ${
          isActive ? "bg-primary text-white border-primary shadow-md" : "bg-surface-container border-outline-variant/30 text-on-surface hover:bg-surface-variant"
        }`}
      >
        {current}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {mounted && open && pos && createPortal(
        <AnimatePresence>
          <motion.div
            key="sort-menu"
            data-ddmenu
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 99999, minWidth: 220 }}
            className="glass-panel rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-1.5 flex flex-col gap-0.5">
              {sortOptions.map(opt => (
                <button
                  key={opt.value}
                  onPointerDown={e => { e.stopPropagation(); onChange(opt.value); setOpen(false); }}
                  className={`px-3 py-2.5 rounded-xl text-sm w-full text-left transition-colors ${
                    value === opt.value ? "bg-primary/10 text-primary font-semibold" : "text-on-surface hover:bg-surface-variant"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function MarketplaceClient({ initialBillboards }: { initialBillboards: Billboard[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);
  const [viewState, setViewState] = useState({ longitude: 72.87, latitude: 19.06, zoom: 11 });
  const [billboards, setBillboards] = useState(initialBillboards);

  // Fetch real billboard locations from OpenStreetMap on mount
  useEffect(() => {
    const fetchReal = async () => {
      try {
        const res = await fetch("/api/real-billboards");
        if (!res.ok) return;
        const data = await res.json();
        if (!data.billboards?.length) return;

        // Convert OSM billboards to full Billboard type
        const defaultVendor = { name: "OSM Verified", rating: 0, totalListings: 0, verified: false, since: "2024", responseTime: "N/A" };
        const defaultScores = { visibility: 50, readability: 50, dwellTime: 50, illumination: 50, angle: 50 };
        const defaultTraffic = { hourly: Array(24).fill(0), weekdayAvg: 0, weekendAvg: 0, peakHour: "N/A" };
        const defaultCampaigns = { totalRuns: 0, avgDuration: 0, renewalRate: 0, topBrands: [], avgCTR: 0 };
        const defaultMarket = { rank: 0, totalInArea: 0, percentile: 0, priceVsAvg: 0 };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const realBillboards: Billboard[] = data.billboards.map((rb: any) => ({
          id: rb.id,
          title: rb.title,
          size: rb.size || "20x10",
          type: rb.type || "Static",
          facing: rb.facing || "North",
          impressions: rb.impressions || 0,
          price: rb.price || 500,
          image: rb.image,
          available: rb.available || "Available Now",
          lat: rb.lat,
          lng: rb.lng,
          availability: rb.availability || "available",
          location: `${rb.area || "Mumbai"}`,
          vendor: defaultVendor,
          scores: defaultScores,
          traffic: defaultTraffic,
          campaigns: defaultCampaigns,
          market: defaultMarket,
          demographics: { twoWheeler: 30, car: 35, bus: 20, pedestrian: 15, incomeZone: "Mid" },
          weatherScore: 70,
          proofImages: [rb.image],
          bookedDates: [],
        }));

        setBillboards(prev => {
          // Merge: keep existing, add new real ones (avoid duplicates)
          const existingIds = new Set(prev.map(b => b.id));
          const newOnes = realBillboards.filter(rb => !existingIds.has(rb.id));
          return [...prev, ...newOnes];
        });
      } catch (err) {
        console.warn("Real billboard fetch failed (non-critical):", err);
      }
    };
    fetchReal();
  }, []);

  // Fetch real traffic data from OSM for all billboards (in batches of 20)
  useEffect(() => {
    const fetchTraffic = async () => {
      try {
        // Only fetch for billboards missing traffic data
        const needsTraffic = billboards.filter(b => b.trafficScore === undefined);
        if (needsTraffic.length === 0) return;

        const locations = needsTraffic.map(b => ({ id: b.id, lat: b.lat, lng: b.lng }));

        // Process in batches of 20 (API limit)
        for (let i = 0; i < locations.length; i += 20) {
          const batch = locations.slice(i, i + 20);
          const res = await fetch("/api/traffic-estimate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ locations: batch }),
          });
          if (!res.ok) continue;
          const data = await res.json();

          setBillboards(prev => prev.map(bb => {
            const est = data[bb.id];
            if (!est) return bb;
            return {
              ...bb,
              trafficScore: est.trafficScore,
              estimatedImpressions: est.estimatedDailyImpressions,
              reachRadius: est.reachRadiusMeters,
              nearestRoad: est.nearestRoad,
              poiCount: est.breakdown?.nearbyPOIs?.reduce((s: number, p: { count: number }) => s + p.count, 0) || 0,
            };
          }));
        }
      } catch (err) {
        console.warn("Traffic estimate fetch failed (non-critical):", err);
      }
    };
    // Wait a bit for real billboards to potentially load first
    const timer = setTimeout(fetchTraffic, 2000);
    return () => clearTimeout(timer);
  }, [billboards.length]); // Re-run when billboard count changes (real ones added)

  const minPriceInData = useMemo(() => Math.min(...initialBillboards.map(b => b.price)), [initialBillboards]);
  const maxPriceInData = useMemo(() => Math.max(...initialBillboards.map(b => b.price)), [initialBillboards]);

  const [filters, setFilters] = useState<Filters>({
    sizes: [], types: [], facing: [], availability: [],
    minPrice: minPriceInData, maxPrice: maxPriceInData, sortBy: "default",
  });

  // Derived options
  const sizes = useMemo(() => [...new Set(initialBillboards.map(b => b.size))].sort(), [initialBillboards]);
  const types = useMemo(() => [...new Set(initialBillboards.map(b => b.type))].sort(), [initialBillboards]);
  const facings = useMemo(() => [...new Set(initialBillboards.map(b => b.facing))].sort(), [initialBillboards]);
  const availabilities = useMemo(() => [...new Set(initialBillboards.map(b => b.available))].sort(), [initialBillboards]);

  // Filtering + sorting — use enriched billboards
  const filteredBillboards = useMemo(() => {
    let list = billboards.filter(bb => {
      const q = searchQuery.toLowerCase();
      if (q && !bb.title.toLowerCase().includes(q) && !bb.type.toLowerCase().includes(q) &&
          !bb.size.toLowerCase().includes(q) && !bb.facing.toLowerCase().includes(q)) return false;
      if (filters.sizes.length && !filters.sizes.includes(bb.size)) return false;
      if (filters.types.length && !filters.types.includes(bb.type)) return false;
      if (filters.facing.length && !filters.facing.includes(bb.facing)) return false;
      if (filters.availability.length && !filters.availability.includes(bb.available)) return false;
      if (bb.price < filters.minPrice || bb.price > filters.maxPrice) return false;
      return true;
    });

    if (filters.sortBy === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (filters.sortBy === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (filters.sortBy === "impressions-desc") list = [...list].sort((a, b) => b.impressions - a.impressions);

    return list;
  }, [billboards, searchQuery, filters]);

  const activeFilterCount =
    filters.sizes.length + filters.types.length + filters.facing.length +
    filters.availability.length +
    (filters.minPrice > minPriceInData || filters.maxPrice < maxPriceInData ? 1 : 0) +
    (filters.sortBy !== "default" ? 1 : 0);

  const resetFilters = () => {
    setFilters({ sizes: [], types: [], facing: [], availability: [], minPrice: minPriceInData, maxPrice: maxPriceInData, sortBy: "default" });
    setSearchQuery("");
  };

  const set = useCallback(<K extends keyof Filters>(k: K, v: Filters[K]) =>
    setFilters(f => ({ ...f, [k]: v })), []);

  /* ── Booking Modal State ─────────────────────────────── */
  const [bookingBillboard, setBookingBillboard] = useState<Billboard | null>(null);
  const [bookingForm, setBookingForm] = useState({ name: "", email: "", phone: "", company: "", startDate: "", duration: 7, requirements: "" });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<{ id: string; estimatedTotal: number } | null>(null);
  const [bookingErrors, setBookingErrors] = useState<string[]>([]);

  const handleBookNow = useCallback((billboardId: string) => {
    const bb = billboards.find(b => b.id === billboardId);
    if (bb) {
      setBookingBillboard(bb);
      setBookingSuccess(null);
      setBookingErrors([]);
    }
  }, [billboards]);

  const submitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingBillboard) return;
    setBookingLoading(true);
    setBookingErrors([]);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...bookingForm, billboardId: bookingBillboard.id }),
      });
      const data = await res.json();
      if (data.success) {
        setBookingSuccess({ id: data.booking.id, estimatedTotal: data.booking.estimatedTotal });
      } else {
        setBookingErrors(data.errors || ["Something went wrong."]);
      }
    } catch {
      setBookingErrors(["Network error. Please try again."]);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
<div className="flex-1 flex flex-col lg:flex-row w-full h-[calc(100vh-64px)] min-h-[600px] relative mt-16 items-stretch overflow-hidden">

      {/* ── Booking Modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {bookingBillboard && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setBookingBillboard(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="surface-card w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {bookingSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-2">Booking Inquiry Submitted!</h3>
                  <p className="text-on-surface-variant mb-1">Reference: <span className="font-mono font-bold text-primary">{bookingSuccess.id}</span></p>
                  <p className="text-on-surface-variant mb-4">Estimated Total: <span className="font-bold text-on-surface">₹{bookingSuccess.estimatedTotal.toLocaleString("en-IN")}</span></p>
                  <p className="text-sm text-on-surface-variant mb-6">Our concierge team will contact you within 2 hours.</p>
                  <button onClick={() => { setBookingBillboard(null); setBookingForm({ name: "", email: "", phone: "", company: "", startDate: "", duration: 7, requirements: "" }); }} className="px-6 py-2.5 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all">Done</button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-lg font-bold text-on-surface">Book Billboard</h3>
                      <p className="text-sm text-on-surface-variant">{bookingBillboard.title}</p>
                    </div>
                    <button onClick={() => setBookingBillboard(null)} className="w-8 h-8 rounded-full bg-surface-variant/50 flex items-center justify-center hover:bg-surface-variant transition-colors">
                      <X className="w-4 h-4 text-on-surface-variant" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container mb-5">
                    <div className="text-2xl font-bold text-primary">₹{bookingBillboard.price.toLocaleString("en-IN")}</div>
                    <span className="text-sm text-on-surface-variant">/day</span>
                    <span className="ml-auto text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-semibold">{bookingBillboard.type}</span>
                  </div>

                  {bookingErrors.length > 0 && (
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 mb-4">
                      {bookingErrors.map((err, i) => <p key={i} className="text-sm text-red-600 dark:text-red-400">{err}</p>)}
                    </div>
                  )}

                  <form onSubmit={submitBooking} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-on-surface-variant block mb-1">Full Name *</label>
                        <input required value={bookingForm.name} onChange={e => setBookingForm(f => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-surface-container text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="Your name" />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-on-surface-variant block mb-1">Company</label>
                        <input value={bookingForm.company} onChange={e => setBookingForm(f => ({ ...f, company: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-surface-container text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="Optional" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-on-surface-variant block mb-1">Email *</label>
                        <input required type="email" value={bookingForm.email} onChange={e => setBookingForm(f => ({ ...f, email: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-surface-container text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="you@company.com" />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-on-surface-variant block mb-1">Phone *</label>
                        <input required type="tel" value={bookingForm.phone} onChange={e => setBookingForm(f => ({ ...f, phone: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-surface-container text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="+91 98765 43210" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-on-surface-variant block mb-1">Start Date *</label>
                        <input required type="date" value={bookingForm.startDate} onChange={e => setBookingForm(f => ({ ...f, startDate: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-surface-container text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" min={new Date().toISOString().split("T")[0]} />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-on-surface-variant block mb-1">Duration (days) *</label>
                        <input required type="number" min={1} max={365} value={bookingForm.duration} onChange={e => setBookingForm(f => ({ ...f, duration: parseInt(e.target.value) || 7 }))} className="w-full px-3 py-2 rounded-lg bg-surface-container text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-on-surface-variant block mb-1">Requirements</label>
                      <textarea rows={3} value={bookingForm.requirements} onChange={e => setBookingForm(f => ({ ...f, requirements: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-surface-container text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none" placeholder="Special requirements, creative specs, etc." />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <p className="text-xs text-on-surface-variant">Estimated Total</p>
                        <p className="text-lg font-bold text-on-surface">₹{(bookingBillboard.price * bookingForm.duration).toLocaleString("en-IN")}</p>
                      </div>
                      <button type="submit" disabled={bookingLoading} className="px-6 py-2.5 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all disabled:opacity-60 flex items-center gap-2">
                        {bookingLoading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Submitting...</> : "Submit Inquiry"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Map Panel ────────────────────────────────────────────────────── */}
      <section className="flex-none w-full h-[400px] lg:w-[60%] lg:h-auto relative border-b lg:border-b-0 lg:border-r border-outline-variant/30 z-0 bg-surface-container-high">
        <div className="relative w-full h-full z-0">
          <DynamicMap billboards={filteredBillboards} hoveredPin={hoveredPin}
            setHoveredPin={setHoveredPin} viewState={viewState} setViewState={setViewState}
            onBookNow={handleBookNow} />
        </div>

        {/* Search overlay */}
        <div className="absolute top-6 left-6 right-6 flex justify-center pointer-events-none z-20">
          <div className="glass-panel rounded-full flex items-center px-5 py-3.5 shadow-lg pointer-events-auto max-w-lg w-full">
            <Search className="w-4 h-4 text-outline mr-3 flex-shrink-0" />
            <input type="text" placeholder="Search areas, types, sizes..."
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-on-surface w-full text-sm placeholder:text-outline-variant outline-none"

            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="ml-2 flex-shrink-0">
                <X className="w-4 h-4 text-outline-variant hover:text-on-surface" />
              </button>
            )}
            <button className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-variant transition-colors ml-2 border border-outline-variant/30 flex-shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-on-surface-variant" />
            </button>
          </div>
        </div>
{/* Pin count */}
        <div className="absolute bottom-6 left-6 z-20">
          <div className="glass-panel rounded-full px-4 py-2 flex items-center gap-2 shadow text-sm font-medium text-on-surface">
            <MapPin className="w-4 h-4 text-primary" />
            {filteredBillboards.length} locations on map
          </div>
        </div>
      </section>

      {/* ── Listings Panel ────────────────────────────────────────────────── */}
      <section className="flex-1 lg:flex-[0.4] h-full bg-surface-bright flex flex-col z-30 shadow-[-20px_0_40px_-10px_rgba(0,0,0,0.05)]">

        {/* Mobile search */}

        <div className="lg:hidden p-4 border-b border-outline-variant/30 bg-surface-bright sticky top-0 z-20">
          <div className="glass-panel rounded-full flex items-center px-4 py-3 border border-outline-variant/40">
            <Search className="w-4 h-4 text-outline mr-2 flex-shrink-0" />
            <input type="text" placeholder="Search..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-on-surface w-full text-sm placeholder:text-outline-variant outline-none"
            />
            {searchQuery && <button onClick={() => setSearchQuery("")}><X className="w-4 h-4 text-outline-variant" /></button>}
          </div>
        </div>

        {/* ── Filter Bar ───────────────────────────────────────────────────── */}
        <div className="p-4 lg:px-5 lg:pt-5 lg:pb-3 border-b border-outline-variant/30 bg-surface-bright/95 backdrop-blur-md sticky top-[64px] lg:top-0 z-40">

          {/* Filter chips row */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide items-center">
            <FilterDropdown label="Size" options={sizes} selected={filters.sizes} onChange={v => set("sizes", v)} />
            <FilterDropdown label="Type" options={types} selected={filters.types} onChange={v => set("types", v)} />
            <FilterDropdown label="Facing" options={facings} selected={filters.facing} onChange={v => set("facing", v)} />
            <FilterDropdown label="Availability" options={availabilities} selected={filters.availability} onChange={v => set("availability", v)} />
            <SortDropdown value={filters.sortBy} onChange={v => set("sortBy", v)} />
            {activeFilterCount > 0 && (
              <button onClick={resetFilters}
                className="rounded-full px-3.5 py-2 text-sm flex items-center gap-1.5 border border-error/40 text-error bg-error/5 hover:bg-error/10 transition-colors font-medium flex-shrink-0">
                <RotateCcw className="w-3.5 h-3.5" />
                Reset ({activeFilterCount})
              </button>
            )}
          </div>

          {/* ── Dual Price Range Slider ─────────────────────────────────── */}
          <div className="mt-3 bg-surface-container/50 rounded-2xl px-4 py-3 border border-outline-variant/20">
            <DualRangeSlider
              min={minPriceInData} max={maxPriceInData}
              low={filters.minPrice} high={filters.maxPrice}
              onChange={(lo, hi) => setFilters(f => ({ ...f, minPrice: lo, maxPrice: hi }))}
            />
          </div>

          {/* Result count */}
          <div className="mt-2.5 flex items-center gap-2 text-sm text-on-surface-variant">
            Showing <span className="text-on-surface font-bold">{filteredBillboards.length}</span>
            {" "}of <span className="font-medium">{initialBillboards.length}</span> billboards
            {activeFilterCount > 0 && (
              <span className="ml-auto text-[11px] bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-semibold">
                {activeFilterCount} active
              </span>
            )}
          </div>
        </div>

        {/* ── Listings ────────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-5 flex flex-col gap-4 h-full">
          <AnimatePresence mode="wait">
            {filteredBillboards.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center gap-4 py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center">
                  <Search className="w-7 h-7 text-outline" />
                </div>
                <div>
                  <p className="font-semibold text-on-surface mb-1">No billboards found</p>
                  <p className="text-sm text-on-surface-variant">Try adjusting your filters or price range</p>
                </div>
                <button onClick={resetFilters}
                  className="mt-2 bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all">
                  Clear all filters
                </button>
              </motion.div>
            ) : (
              <motion.div key="list" className="flex flex-col gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {filteredBillboards.map(bb => {
                  const isNow = bb.available === "Available Now";
                  return (
                    <Link href={`/marketplace/${bb.id}`} key={bb.id}
                      className={`glass-panel rounded-2xl overflow-hidden flex flex-col group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
                        hoveredPin === bb.id ? "ring-2 ring-primary shadow-xl -translate-y-0.5" : ""
                      }`}
                      onMouseEnter={() => setHoveredPin(bb.id)}
                      onMouseLeave={() => setHoveredPin(null)}
                    >
                      {/* Image */}
                      <div className="h-44 w-full relative overflow-hidden bg-surface-container-high">
                        <Image src={bb.image} alt={bb.title} fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 40vw" />
                        <div className={`absolute top-3 left-3 backdrop-blur-md border px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                          isNow ? "bg-green-500/10 border-green-500/20 text-green-600" : "bg-surface/60 border-outline-variant/30 text-on-surface-variant"
                        }`}>
                          {isNow && <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
                          <span className="text-[10px] font-semibold uppercase tracking-wider">{bb.available}</span>
                        </div>
                        <div className="absolute top-3 right-3 backdrop-blur-md bg-surface/70 border border-outline-variant/20 px-2.5 py-1 rounded-full">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface">{bb.type}</span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="p-4 flex flex-col gap-3">
                        <div>
                          <h3 className="text-base font-bold text-on-surface mb-0.5 group-hover:text-primary transition-colors leading-snug">
                            {bb.title}
                          </h3>
                          <p className="text-xs text-on-surface-variant flex items-center gap-1.5 flex-wrap">
                            <Maximize className="w-3 h-3" /> {bb.size}
                            <span className="text-outline-variant">•</span>
                            {bb.facing} Facing
                          </p>
                        </div>

                        <div className="bg-surface-container-lowest rounded-xl px-3 py-2.5 border border-outline-variant/20 flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            {bb.impressions >= 100000 ? <Flame className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </div>
                          <p className="text-sm text-on-surface">
                            <span className="font-semibold">~{bb.impressions >= 1000 ? `${(bb.impressions / 1000).toFixed(0)}k` : bb.impressions}</span> daily impressions
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
                          <div>
                            <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Price / day</p>
                            <p className="text-lg font-bold text-primary">₹{bb.price.toLocaleString()}</p>
                          </div>
                          <button className={`px-4 py-2 rounded-full text-sm font-semibold transition-all active:scale-95 ${
                            isNow ? "bg-primary text-white hover:bg-primary/90 shadow-md" : "glass-button-secondary"
                          }`}>
                            {isNow ? "View Analytics" : "View Details"}
                          </button>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
