"use client";

import { useEffect } from "react";
import Image from "next/image";
import Map, { Marker, NavigationControl } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Billboard } from "./page";

type MapComponentProps = {
  billboards: Billboard[];
  hoveredPin: string | null;
  setHoveredPin: (id: string | null) => void;
  viewState: any;
  setViewState: (viewState: any) => void;
};

export default function MapComponent({ billboards, hoveredPin, setHoveredPin, viewState, setViewState }: MapComponentProps) {
  // Ensure we only render the map if window is available
  if (typeof window === 'undefined') return null;

  return (
    <Map
      initialViewState={viewState}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      style={{ width: '100%', height: '100%' }}
    >
      <NavigationControl position="top-right" />
      {billboards.map((bb) => (
        <Marker
          key={bb.id}
          longitude={bb.lng}
          latitude={bb.lat}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setHoveredPin(hoveredPin === bb.id ? null : bb.id);
          }}
        >
          <div 
            className={`w-12 h-12 rounded-full border-2 border-white shadow-xl flex items-center justify-center relative cursor-pointer transition-transform hover:scale-105 z-10 ${hoveredPin === bb.id ? 'bg-primary ring-4 ring-primary/20 scale-110' : 'bg-primary/80 hover:bg-primary'}`}
            onMouseEnter={() => setHoveredPin(bb.id)}
            onMouseLeave={() => setHoveredPin(null)}
          >
            <MapPin className="w-5 h-5 text-white" aria-hidden="true" />
            
            {/* Glassmorphic Tooltip */}
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ 
                opacity: hoveredPin === bb.id ? 1 : 0, 
                y: hoveredPin === bb.id ? 0 : 10, 
                scale: hoveredPin === bb.id ? 1 : 0.95 
              }}
              className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 glass-panel rounded-xl p-3 shadow-2xl flex flex-col gap-2 min-w-[160px] ambient-shadow pointer-events-none ${hoveredPin === bb.id ? 'z-50' : '-z-10'}`}
            >
              <div className="w-full h-20 rounded-lg bg-surface-variant overflow-hidden relative">
                <Image 
                  src={bb.image} 
                  alt={bb.title} 
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
              <div className="flex justify-between items-center px-1">
                <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">{bb.available.split(' ')[1] || 'Now'}</span>
                <span className="text-sm font-semibold text-primary">₹{bb.price}<span className="text-[10px] font-normal text-on-surface-variant">/day</span></span>
              </div>
            </motion.div>
          </div>
        </Marker>
      ))}
    </Map>
  );
}
