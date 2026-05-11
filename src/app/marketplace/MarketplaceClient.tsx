"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Search, SlidersHorizontal, ChevronDown, X, Maximize, Flame, Eye, MapPin, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Billboard } from "./page";

<<<<<<< HEAD
const DynamicMap = dynamic(() => import('./MapComponent'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-surface-container-high flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-on-surface-variant font-medium">Loading map...</p>
=======
const DynamicMap = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-surface-container-high flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <Image src="/images/premium_map_placeholder.png" alt="Loading Map" fill className="object-cover" />
      </div>
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin z-10" />
>>>>>>> cc92fe98c672ce1b5abc9c6bf143add62d35ff04
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

// ── Dual Range Slider ────────────────────────────────────────────────────────
function DualRangeSlider({
  min, max, low, high, onChange,
}: {
  min: number; max: number; low: number; high: number;
  onChange: (low: number, high: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<"low" | "high" | null>(null);

  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  const valueFromPct = (clientX: number) => {
    const rect = trackRef.current!.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const raw = min + ratio * (max - min);
    return Math.round(raw / 100) * 100; // snap to step of 100
  };

  const onTrackPointerDown = (e: React.PointerEvent) => {
    const val = valueFromPct(e.clientX);
    // Pick whichever thumb is closer
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

  return (
    <div className="px-1 pt-2 pb-1 select-none">
      {/* Labels */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
          ₹{low.toLocaleString()}
        </span>
        <span className="text-xs text-on-surface-variant font-medium">Price / day</span>
        <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
          ₹{high.toLocaleString()}
        </span>
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
        {/* Background track */}
        <div className="absolute w-full h-1.5 rounded-full bg-surface-variant" />
        {/* Active range */}
        <div
          className="absolute h-1.5 rounded-full bg-primary"
          style={{ left: `${pct(low)}%`, right: `${100 - pct(high)}%` }}
        />
        {/* Low thumb */}
        <div
          className="absolute w-5 h-5 rounded-full bg-primary border-2 border-white shadow-lg ring-2 ring-primary/20 transition-transform hover:scale-110 -translate-x-1/2 cursor-grab active:cursor-grabbing z-10"
          style={{ left: `${pct(low)}%` }}
        />
        {/* High thumb */}
        <div
          className="absolute w-5 h-5 rounded-full bg-primary border-2 border-white shadow-lg ring-2 ring-primary/20 transition-transform hover:scale-110 -translate-x-1/2 cursor-grab active:cursor-grabbing z-10"
          style={{ left: `${pct(high)}%` }}
        />
      </div>

      {/* Min / Max labels */}
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", h);
    return () => document.removeEventListener("pointerdown", h);
  }, []);

  const toggle = (v: string) =>
    onChange(selected.includes(v) ? selected.filter(x => x !== v) : [...selected, v]);

  const isActive = selected.length > 0;

  return (
    <div className="relative flex-shrink-0" ref={ref}>
      <button
        onPointerDown={e => { e.stopPropagation(); setOpen(o => !o); }}
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full left-0 mt-2 z-[60] glass-panel rounded-2xl shadow-2xl min-w-[170px] overflow-hidden"
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
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Sort Dropdown ────────────────────────────────────────────────────────────
function SortDropdown({ value, onChange }: { value: SortOption; onChange: (v: SortOption) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const options: { label: string; value: SortOption }[] = [
    { label: "Recommended", value: "default" },
    { label: "Price: Low → High", value: "price-asc" },
    { label: "Price: High → Low", value: "price-desc" },
    { label: "Most Impressions", value: "impressions-desc" },
  ];

  useEffect(() => {
    const h = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", h);
    return () => document.removeEventListener("pointerdown", h);
  }, []);

  const current = options.find(o => o.value === value)?.label ?? "Sort";
  const isActive = value !== "default";

  return (
    <div className="relative flex-shrink-0" ref={ref}>
      <button
        onPointerDown={e => { e.stopPropagation(); setOpen(o => !o); }}
        className={`rounded-full px-4 py-2 text-sm flex items-center gap-2 transition-all border font-medium whitespace-nowrap ${
          isActive ? "bg-primary text-white border-primary shadow-md" : "bg-surface-container border-outline-variant/30 text-on-surface hover:bg-surface-variant"
        }`}
      >
        {current}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full right-0 mt-2 z-[60] glass-panel rounded-2xl shadow-2xl min-w-[200px] overflow-hidden"
          >
            <div className="p-1.5 flex flex-col gap-0.5">
              {options.map(opt => (
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
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function MarketplaceClient({ initialBillboards }: { initialBillboards: Billboard[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);
  const [viewState, setViewState] = useState({ longitude: 72.87, latitude: 19.06, zoom: 11 });

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

  // Filtering + sorting
  const filteredBillboards = useMemo(() => {
    let list = initialBillboards.filter(bb => {
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
  }, [initialBillboards, searchQuery, filters]);

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

  return (
<<<<<<< HEAD
    <div className="flex-1 flex flex-col lg:flex-row w-full h-[calc(100vh-64px)] min-h-[600px] relative mt-16 items-stretch">
      {/* Interactive Map (Top on mobile, Left on desktop) */}
      <section className="flex-none w-full h-[400px] lg:w-[60%] lg:h-auto relative border-b lg:border-b-0 lg:border-r border-outline-variant/30 z-0">
        {/* Map fills the entire panel */}
        <div className="absolute inset-0">
          <DynamicMap 
            billboards={initialBillboards} 
            hoveredPin={hoveredPin} 
            setHoveredPin={setHoveredPin} 
            viewState={viewState} 
            setViewState={setViewState} 
          />
        </div>

        {/* Floating Search Overlay on Map (Desktop only) */}
        <div className="hidden lg:flex absolute top-6 left-6 right-6 justify-center pointer-events-none z-10">
          <div className="glass-panel rounded-full flex items-center px-6 py-4 shadow-lg ambient-shadow pointer-events-auto max-w-lg w-full">
            <Search className="w-5 h-5 text-outline mr-3" aria-hidden="true" />
            <input 
              type="text"
              placeholder="Search areas, landmarks..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-on-surface w-full font-body-md text-sm placeholder:text-outline-variant outline-none"
              aria-label="Search map"
=======
    <div className="flex-1 flex flex-col lg:flex-row w-full h-[calc(100vh-64px)] min-h-[600px] relative mt-16 overflow-hidden">

      {/* ── Map Panel ────────────────────────────────────────────────────── */}
      <section className="hidden lg:flex flex-[0.6] h-full relative border-r border-outline-variant/30 bg-surface-container-high">
        <div className="relative w-full h-full z-0">
          <DynamicMap billboards={filteredBillboards} hoveredPin={hoveredPin}
            setHoveredPin={setHoveredPin} viewState={viewState} setViewState={setViewState} />
        </div>

        {/* Search overlay */}
        <div className="absolute top-6 left-6 right-6 flex justify-center pointer-events-none z-20">
          <div className="glass-panel rounded-full flex items-center px-5 py-3.5 shadow-lg pointer-events-auto max-w-lg w-full">
            <Search className="w-4 h-4 text-outline mr-3 flex-shrink-0" />
            <input type="text" placeholder="Search areas, types, sizes..."
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-on-surface w-full text-sm placeholder:text-outline-variant outline-none"
>>>>>>> cc92fe98c672ce1b5abc9c6bf143add62d35ff04
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
<<<<<<< HEAD
      </section>

      {/* Listings Panel (Bottom on mobile, Right on desktop) */}
      <section className="flex-1 lg:flex-none lg:w-[40%] bg-surface-bright flex flex-col overflow-hidden shadow-[-20px_0_40px_-10px_rgba(0,0,0,0.05)] relative z-10">
        
        {/* Mobile Search/Filter Bar (visible only on small screens) */}
=======

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
>>>>>>> cc92fe98c672ce1b5abc9c6bf143add62d35ff04
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
                    <article key={bb.id}
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
                            {isNow ? "Book Now" : "View Details"}
                          </button>
                        </div>
                      </div>
                    </article>
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
