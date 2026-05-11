"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Billboard } from "./page";

type MapComponentProps = {
  billboards: Billboard[];
  hoveredPin: string | null;
  setHoveredPin: (id: string | null) => void;
  viewState: { longitude: number; latitude: number; zoom: number };
  setViewState: (vs: any) => void;
};

/* Custom pin icon (blue circle with map-pin SVG) */
function createPinIcon(active = false) {
  const size = active ? 50 : 44;
  const bg = active ? "#1d4ed8" : "#2563eb";
  const ring = active ? "box-shadow:0 0 0 6px rgba(37,99,235,0.25),0 4px 14px rgba(0,0,0,0.35);" : "box-shadow:0 4px 14px rgba(0,0,0,0.35);";

  return L.divIcon({
    className: "", // disable default leaflet styles
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 6],
    html: `
      <div style="
        width:${size}px;height:${size}px;border-radius:50%;
        border:3px solid white;${ring}
        display:flex;align-items:center;justify-content:center;
        cursor:pointer;background:${bg};transition:all 0.2s;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      </div>
    `,
  });
}

function createPopupContent(bb: Billboard) {
  return `
    <div style="min-width:200px;font-family:system-ui,-apple-system,sans-serif;">
      <img src="${bb.image}" alt="${bb.title}"
        style="width:100%;height:90px;object-fit:cover;border-radius:8px;margin-bottom:10px;"
        onerror="this.style.display='none'" />
      <p style="font-weight:700;font-size:14px;color:#111;margin:0 0 4px;line-height:1.3;
        white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${bb.title}</p>
      <p style="font-size:11px;color:#666;margin:0 0 8px;">${bb.type} · ${bb.size} · ${bb.facing} Facing</p>
      <div style="display:flex;align-items:baseline;gap:4px;">
        <span style="font-size:18px;font-weight:800;color:#2563eb;">₹${bb.price.toLocaleString()}</span>
        <span style="font-size:11px;color:#999;">/day</span>
      </div>
    </div>
  `;
}

export default function MapComponent({
  billboards,
  hoveredPin,
  setHoveredPin,
  viewState,
  setViewState,
}: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const [ready, setReady] = useState(false);

  /* ── Initialize Leaflet map ──────────────────────────── */
  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    console.log("[AdSpace Map] Initializing Leaflet...");
    console.log("[AdSpace Map] Container:", mapContainer.current.offsetWidth, "x", mapContainer.current.offsetHeight);

    const map = L.map(mapContainer.current, {
      center: [viewState.latitude, viewState.longitude],
      zoom: viewState.zoom,
      zoomControl: false, // we'll add our own
      attributionControl: false,
    });

    // Add zoom control to top-right (like the design)
    L.control.zoom({ position: "topright" }).addTo(map);

    // CartoDB Positron tiles (free, beautiful, matches our light theme)
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    map.on("moveend", () => {
      const center = map.getCenter();
      setViewState({
        longitude: center.lng,
        latitude: center.lat,
        zoom: map.getZoom(),
      });
    });

    map.whenReady(() => {
      console.log("[AdSpace Map] ✅ Map ready!");
      setReady(true);
      // Force an immediate size recalculation in case of delayed CSS layout
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    });

    // Handle container resize (e.g. window resize or Next.js layout shifts)
    const resizeObserver = new ResizeObserver(() => {
      if (mapContainer.current) {
        if (mapContainer.current.offsetHeight > 0) {
          map.invalidateSize();
        }
      }
    });
    resizeObserver.observe(mapContainer.current);

    mapRef.current = map;

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Add markers when map is ready or billboards change ─ */
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();

    billboards.forEach((bb) => {
      const marker = L.marker([bb.lat, bb.lng], {
        icon: createPinIcon(false),
      }).addTo(map);

      // Rich popup
      marker.bindPopup(createPopupContent(bb), {
        closeButton: false,
        className: "adspace-leaflet-popup",
        maxWidth: 240,
        offset: [0, -8],
      });

      // Hover interactions
      marker.on("mouseover", () => {
        setHoveredPin(bb.id);
        marker.setIcon(createPinIcon(true));
        marker.openPopup();
      });

      marker.on("mouseout", () => {
        setHoveredPin(null);
        marker.setIcon(createPinIcon(false));
        marker.closePopup();
      });

      marker.on("click", () => {
        map.flyTo([bb.lat, bb.lng], 15, { duration: 0.8 });
      });

      markersRef.current.set(bb.id, marker);
    });
  }, [ready, billboards, setHoveredPin]);

  /* ── Sync hover state from listings panel ──────────── */
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;

    markersRef.current.forEach((marker, id) => {
      if (id === hoveredPin) {
        marker.setIcon(createPinIcon(true));
        marker.openPopup();
      } else {
        marker.setIcon(createPinIcon(false));
        marker.closePopup();
      }
    });
  }, [hoveredPin, ready]);

  return (
    <div className="absolute inset-0 w-full h-full min-h-[600px]">
      {/* Loading state */}
      {!ready && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-[1000] min-h-[600px]"
          style={{ background: "linear-gradient(135deg, #f0f4f8, #e8eef5)" }}
        >
          <div
            className="w-10 h-10 border-4 border-blue-600 rounded-full animate-spin"
            style={{ borderTopColor: "transparent" }}
          />
          <p className="text-gray-600 text-sm font-medium">Loading map…</p>
        </div>
      )}

      {/* Leaflet attaches here */}
      <div ref={mapContainer} className="w-full h-full z-[1] min-h-[600px]" />
    </div>
  );
}
