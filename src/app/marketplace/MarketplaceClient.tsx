"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { 
  Search, 
  SlidersHorizontal, 
  ChevronDown, 
  Filter, 
  Maximize,
  Flame,
  Eye,
} from "lucide-react";
import { Billboard } from "./page";

// Dynamically import the Map component with SSR disabled
const DynamicMap = dynamic(() => import('./MapComponent'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-surface-container-high flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <Image src="/images/premium_map_placeholder.png" alt="Loading Map" fill className="object-cover" />
      </div>
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin z-10"></div>
    </div>
  )
});

type MarketplaceClientProps = {
  initialBillboards: Billboard[];
};

export default function MarketplaceClient({ initialBillboards }: MarketplaceClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);
  
  // Initial viewport for Mumbai area (matching our mock data coordinates)
  const [viewState, setViewState] = useState({
    longitude: 72.85,
    latitude: 19.06,
    zoom: 11
  });

  return (
    <div className="flex-1 flex flex-col lg:flex-row w-full h-[calc(100vh-64px)] min-h-[600px] relative mt-16 overflow-hidden">
      {/* Left: Interactive Map (60%) */}
      <section className="hidden lg:flex flex-[0.6] h-full relative border-r border-outline-variant/30 bg-surface-container-high">
        {/* Interactive Map Component */}
        <div className="relative w-full h-full z-0 flex-1 min-h-[600px]">
          <DynamicMap 
            billboards={initialBillboards} 
            hoveredPin={hoveredPin} 
            setHoveredPin={setHoveredPin} 
            viewState={viewState} 
            setViewState={setViewState} 
          />
        </div>

        {/* Floating Search Overlay on Map */}
        <div className="absolute top-6 left-6 right-6 flex justify-center pointer-events-none z-20">
          <div className="glass-panel rounded-full flex items-center px-6 py-4 shadow-lg ambient-shadow pointer-events-auto max-w-lg w-full">
            <Search className="w-5 h-5 text-outline mr-3" aria-hidden="true" />
            <input 
              type="text"
              placeholder="Search areas, landmarks..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-on-surface w-full font-body-md text-sm placeholder:text-outline-variant outline-none"
              aria-label="Search map"
            />
            <button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-variant transition-colors ml-3 border border-outline-variant/30">
              <SlidersHorizontal className="w-4 h-4 text-on-surface-variant" aria-hidden="true" />
            </button>
          </div>
        </div>


      </section>

      {/* Right: Listings Panel (40%) */}
      <section className="flex-1 lg:flex-[0.4] h-full bg-surface-bright flex flex-col shadow-[-20px_0_40px_-10px_rgba(0,0,0,0.05)] z-30">
        
        {/* Mobile Search/Filter Bar (visible only on small screens) */}
        <div className="lg:hidden p-4 border-b border-outline-variant/30 bg-surface-bright sticky top-0 z-20">
          <div className="glass-panel rounded-full flex items-center px-4 py-3 shadow-sm border border-outline-variant/40">
            <Search className="w-4 h-4 text-outline mr-2" aria-hidden="true" />
            <input 
              type="text"
              placeholder="Search areas..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-on-surface w-full font-body-md text-sm placeholder:text-outline-variant outline-none"
            />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-4 lg:p-6 border-b border-outline-variant/30 bg-surface-bright/90 backdrop-blur-md sticky top-[64px] lg:top-0 z-40">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide items-center">
            <button className="glass-button-secondary rounded-full px-5 py-2 text-sm whitespace-nowrap flex items-center gap-2">
              Size <ChevronDown className="w-4 h-4" />
            </button>
            <button className="glass-button-secondary rounded-full px-5 py-2 text-sm whitespace-nowrap flex items-center gap-2">
              Type <ChevronDown className="w-4 h-4" />
            </button>
            <button className="glass-button-secondary rounded-full px-5 py-2 text-sm whitespace-nowrap flex items-center gap-2">
              Price <ChevronDown className="w-4 h-4" />
            </button>
            <button className="bg-surface-container rounded-full px-5 py-2 text-sm text-on-surface-variant whitespace-nowrap flex items-center gap-2 hover:bg-surface-variant transition-colors border border-outline-variant/30">
              More Filters <Filter className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 lg:mt-4 text-sm text-on-surface-variant font-medium">
            Showing <span className="text-on-surface font-semibold">{initialBillboards.length}</span> billboards
          </div>
        </div>

        {/* Listings Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 flex flex-col gap-6 lg:gap-8 h-full">
          
          {initialBillboards.map((bb, idx) => (
            <article 
              key={bb.id}
              className={`glass-panel rounded-2xl overflow-hidden ambient-shadow flex flex-col group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${hoveredPin === bb.id ? 'ring-2 ring-primary scale-[1.02]' : ''} ${idx === 1 ? 'opacity-95' : ''}`}
              onMouseEnter={() => setHoveredPin(bb.id)}
              onMouseLeave={() => setHoveredPin(null)}
            >
              {/* Image Section */}
              <div className="h-48 w-full relative overflow-hidden bg-surface-container-high">
                <Image 
                  src={bb.image} 
                  alt={bb.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                
                {/* Badge */}
                <div className={`absolute top-4 left-4 backdrop-blur-md border px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                  idx === 0 
                    ? 'bg-secondary/10 border-secondary/20 text-secondary' 
                    : 'bg-tertiary/10 border-tertiary/20 text-tertiary'
                }`}>
                  {idx === 0 && <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" aria-hidden="true"></div>}
                  <span className="text-[10px] font-semibold uppercase tracking-wider">{bb.available}</span>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-5 flex flex-col gap-4 bg-surface/50">
                <div>
                  <h3 className="text-lg font-heading font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">{bb.title}</h3>
                  <p className="text-sm text-on-surface-variant flex items-center gap-2 flex-wrap">
                    <Maximize className="w-4 h-4" aria-hidden="true" /> {bb.size} 
                    <span className="text-outline-variant">•</span> {bb.type} 
                    <span className="text-outline-variant">•</span> {bb.facing} Facing
                  </p>
                </div>
                
                {/* Impressions Box */}
                <div className="bg-surface-container-lowest rounded-xl p-3 border border-outline-variant/30 flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    idx === 0 ? 'bg-tertiary/10 text-tertiary' : 'bg-primary/10 text-primary'
                  }`}>
                    {idx === 0 ? <Flame className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </div>
                  <p className="text-sm text-on-surface">
                    <span className="font-semibold">~{bb.impressions >= 1000 ? `${bb.impressions/1000}k` : bb.impressions}</span> daily impressions
                  </p>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20 mt-1">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold mb-0.5">Price</span>
                    <span className="text-xl font-heading text-primary font-bold">
                      ₹{bb.price.toLocaleString()} <span className="text-sm font-normal text-on-surface-variant">/ day</span>
                    </span>
                  </div>
                  {idx === 0 ? (
                    <button className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg active:scale-95">
                      Book Now
                    </button>
                  ) : (
                    <button className="glass-button-secondary px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm active:scale-95">
                      View Details
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
          
        </div>
      </section>
    </div>
  );
}
