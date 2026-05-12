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
  setViewState: (vs: {
    longitude: number;
    latitude: number;
    zoom: number;
  }) => void;
  onBookNow?: (billboardId: string) => void;
};

/* ─── Tile URLs ─────────────────────────────────────────── */
const TILES = {
  light: {
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    subdomains: "abcd",
  },
  dark: {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    subdomains: "abcd",
  },
};

/* ─── Billboard type → color mapping ─────────────────────── */
const TYPE_COLORS: Record<string, { bg: string; glow: string; ring: string }> =
  {
    LED: {
      bg: "#8b5cf6",
      glow: "rgba(139,92,246,0.4)",
      ring: "rgba(139,92,246,0.25)",
    },
    Digital: {
      bg: "#3b82f6",
      glow: "rgba(59,130,246,0.4)",
      ring: "rgba(59,130,246,0.25)",
    },
    Static: {
      bg: "#10b981",
      glow: "rgba(16,185,129,0.4)",
      ring: "rgba(16,185,129,0.25)",
    },
    Unipole: {
      bg: "#f59e0b",
      glow: "rgba(245,158,11,0.4)",
      ring: "rgba(245,158,11,0.25)",
    },
  };

function getTypeColor(type: string) {
  return (
    TYPE_COLORS[type] || {
      bg: "#6366f1",
      glow: "rgba(99,102,241,0.4)",
      ring: "rgba(99,102,241,0.25)",
    }
  );
}

/* ─── Format price as compact string ────────────────────── */
function formatPrice(price: number) {
  if (price >= 100_000) return `₹${(price / 100_000).toFixed(1)}L`;
  if (price >= 1_000) return `₹${Math.round(price / 1_000)}k`;
  return `₹${price}`;
}

/* ─── Impression reach radius (in meters) ────────────────── */
function getReachRadius(bb: Billboard) {
  // Use real OSM-calculated radius if available
  if (bb.reachRadius) return bb.reachRadius;
  // Fallback to impression-based estimate
  const imp = bb.estimatedImpressions || bb.impressions;
  if (imp >= 150_000) return 1800;
  if (imp >= 80_000) return 1400;
  if (imp >= 40_000) return 1000;
  return 700;
}

/* ─── Premium Price Pin with animated pulse ring ──────────
   Active: brand colour + white text + scale-up + glow
   Normal: white pill + dark text + shadow + subtle pulse
────────────────────────────────────────────────────────── */
function createPricePin(bb: Billboard, active = false) {
  const label = formatPrice(bb.price);
  const chipW = Math.max(label.length * 9 + 28, 68);
  const chipH = 36;
  const totalH = chipH + 10;
  const tc = getTypeColor(bb.type);

  const bg = active ? tc.bg : "#ffffff";
  const textColor = active ? "#ffffff" : "#111111";
  const border = active ? "none" : "1.5px solid rgba(0,0,0,0.10)";
  const shadow = active
    ? `0 4px 24px ${tc.glow}, 0 2px 8px rgba(0,0,0,0.2)`
    : "0 2px 10px rgba(0,0,0,0.14), 0 1px 3px rgba(0,0,0,0.06)";
  const scale = active ? "scale(1.18)" : "scale(1)";
  const zIdx = active ? 9999 : 1;
  const fw = active ? "700" : "600";

  // Type indicator dot
  const typeDot = !active
    ? `<div style="width:6px;height:6px;border-radius:50%;background:${tc.bg};margin-right:4px;flex-shrink:0;"></div>`
    : "";

  // Animated pulse ring behind pin (only on active)
  const pulseRing = active
    ? `<div style="
        position:absolute;top:50%;left:50%;
        width:${chipW + 20}px;height:${chipH + 20}px;
        transform:translate(-50%,-55%);
        border-radius:30px;
        border:2px solid ${tc.bg};
        opacity:0;
        animation:adspace-ping 1.5s cubic-bezier(0,0,0.2,1) infinite;
        pointer-events:none;
      "></div>`
    : "";

  const html = `
    <div style="
      position:relative;
      width:${chipW}px;
      height:${totalH}px;
      transform:${scale};
      transform-origin:center bottom;
      transition:transform 0.22s cubic-bezier(0.34,1.56,0.64,1);
      z-index:${zIdx};
      cursor:pointer;
      filter:${active ? `drop-shadow(0 0 12px ${tc.glow})` : "none"};
    ">
      ${pulseRing}
      <div style="
        position:absolute;top:0;left:0;
        width:${chipW}px;height:${chipH}px;
        background:${bg};
        border-radius:22px;
        border:${border};
        box-shadow:${shadow};
        display:flex;align-items:center;justify-content:center;gap:2px;
        transition:background 0.2s,box-shadow 0.2s;
        overflow:hidden;
      ">
        ${typeDot}
        <span style="
          font-size:13px;
          font-weight:${fw};
          color:${textColor};
          letter-spacing:-0.2px;
          font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif;
          white-space:nowrap;
          transition:color 0.2s;
          user-select:none;
        ">${label}</span>
      </div>
      <div style="
        position:absolute;
        bottom:0;
        left:50%;
        transform:translateX(-50%);
        width:0;height:0;
        border-left:7px solid transparent;
        border-right:7px solid transparent;
        border-top:10px solid ${active ? tc.bg : "#ffffff"};
        filter:${active ? "none" : "drop-shadow(0 2px 1px rgba(0,0,0,0.06))"};
        transition:border-top-color 0.2s;
      "></div>
    </div>
  `;

  return L.divIcon({
    className: "",
    iconSize: [chipW, totalH],
    iconAnchor: [chipW / 2, totalH],
    popupAnchor: [0, -totalH - 4],
    html,
  });
}

/* ─── Premium popup card with richer details ──────────────── */
function createPopupContent(bb: Billboard) {
  const tc = getTypeColor(bb.type);
  const isAvailable = bb.available?.includes("Now");

  const badge = isAvailable
    ? '<span style="background:#d1fae5;color:#065f46;padding:3px 10px;border-radius:99px;font-size:10px;font-weight:700;letter-spacing:0.4px;display:flex;align-items:center;gap:4px;"><span style="width:5px;height:5px;border-radius:50%;background:#10b981;animation:adspace-blink 1.4s infinite;"></span>LIVE</span>'
    : '<span style="background:#fef3c7;color:#92400e;padding:3px 10px;border-radius:99px;font-size:10px;font-weight:700;letter-spacing:0.4px;">UPCOMING</span>';

  const impSource = bb.estimatedImpressions || bb.impressions;
  const impStr =
    impSource >= 1000 ? `${(impSource / 1000).toFixed(0)}k` : String(impSource);
  const isOSM = !!bb.estimatedImpressions;

  // Traffic score bar (shows loading state until OSM data arrives)
  const trafficBar =
    bb.trafficScore != null
      ? `
    <div style="margin-top:8px;padding-top:8px;border-top:1px solid #f1f5f9;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
        <span style="font-size:10px;color:#6b7280;font-weight:600;">Traffic Score</span>
        <span style="font-size:10px;font-weight:700;color:${bb.trafficScore >= 70 ? "#059669" : bb.trafficScore >= 40 ? "#d97706" : "#ef4444"};">${bb.trafficScore}/100</span>
      </div>
      <div style="height:4px;background:#f1f5f9;border-radius:99px;overflow:hidden;">
        <div style="height:100%;width:${bb.trafficScore}%;background:linear-gradient(90deg,${bb.trafficScore >= 70 ? "#10b981" : bb.trafficScore >= 40 ? "#f59e0b" : "#ef4444"},${tc.bg});border-radius:99px;"></div>
      </div>
      <div style="display:flex;gap:6px;margin-top:6px;flex-wrap:wrap;">
        ${bb.nearestRoad ? `<span style="background:#eff6ff;color:#1d4ed8;padding:2px 6px;border-radius:4px;font-size:9px;font-weight:600;">📍 ${bb.nearestRoad.replace(/_/g, " ")}</span>` : ""}
        ${bb.poiCount ? `<span style="background:#fdf2f8;color:#be185d;padding:2px 6px;border-radius:4px;font-size:9px;font-weight:600;">🏪 ${bb.poiCount} POIs nearby</span>` : ""}
      </div>
    </div>
  `
      : `
    <div style="margin-top:8px;padding-top:8px;border-top:1px solid #f1f5f9;">
      <div style="display:flex;align-items:center;gap:6px;">
        <div style="width:12px;height:12px;border:2px solid #d1d5db;border-top-color:#6366f1;border-radius:50%;animation:adspace-blink 1s linear infinite;"></div>
        <span style="font-size:10px;color:#9ca3af;font-weight:500;">Loading traffic data...</span>
      </div>
    </div>
  `;

  return `
    <div style="
      width:260px;
      font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif;
      border-radius:16px;
      overflow:hidden;
    ">
      <div style="position:relative;height:120px;background:linear-gradient(135deg,${tc.bg}22,${tc.bg}44);overflow:hidden;">
        <img src="${bb.image}" alt="${bb.title}"
          style="width:100%;height:100%;object-fit:cover;display:block;"
          onerror="this.parentElement.style.background='linear-gradient(135deg,${tc.bg},${tc.bg}cc)'" />
        <div style="position:absolute;top:8px;left:8px;">${badge}</div>
        <div style="position:absolute;top:8px;right:8px;background:${tc.bg};color:#fff;padding:3px 10px;border-radius:99px;font-size:9px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">${bb.type}</div>
        <div style="position:absolute;bottom:0;left:0;right:0;height:40px;background:linear-gradient(to top,rgba(0,0,0,0.5),transparent);"></div>
      </div>
      <div style="padding:14px 16px 16px;">
        <p style="
          font-size:14px;font-weight:700;color:#111;
          margin:0 0 6px;line-height:1.3;
          white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
        ">${bb.title}</p>
        <div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap;">
          <span style="background:#f1f5f9;color:#475569;padding:2px 8px;border-radius:6px;font-size:10px;font-weight:600;">${bb.size}</span>
          <span style="background:#f1f5f9;color:#475569;padding:2px 8px;border-radius:6px;font-size:10px;font-weight:600;">${bb.facing} Facing</span>
          <span style="background:${tc.bg}15;color:${tc.bg};padding:2px 8px;border-radius:6px;font-size:10px;font-weight:600;">~${impStr}/day${isOSM ? " ✓" : ""}</span>
        </div>
        ${trafficBar}
        <div style="display:flex;align-items:center;justify-content:space-between;padding-top:10px;border-top:1px solid #f1f5f9;">
          <div>
            <span style="font-size:22px;font-weight:800;color:${tc.bg};letter-spacing:-0.5px;">${formatPrice(bb.price)}</span>
            <span style="font-size:11px;color:#9ca3af;font-weight:500;margin-left:2px;">/day</span>
          </div>
          <div data-book-id="${bb.id}" style="background:${tc.bg};color:#fff;padding:6px 14px;border-radius:99px;font-size:11px;font-weight:700;cursor:pointer;letter-spacing:0.3px;">
            ${isAvailable ? "Book Now" : "Details"}
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ─── Read current theme from <html> class ───────────────── */
function isDarkMode() {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

export default function MapComponent({
  billboards,
  hoveredPin,
  setHoveredPin,
  viewState,
  setViewState,
  onBookNow,
}: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const circlesRef = useRef<Map<string, L.Circle>>(new Map());
  const [ready, setReady] = useState(false);
  const [dark, setDark] = useState(false);
  const [showLegend, setShowLegend] = useState(true);
  const [showReach, setShowReach] = useState(false);

  /* ── Delegate popup "Book Now" clicks to React ──────── */
  useEffect(() => {
    const container = mapContainer.current;
    if (!container) return;
    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-book-id]");
      if (target) {
        e.preventDefault();
        e.stopPropagation();
        const id = target.getAttribute("data-book-id");
        if (id && onBookNow) onBookNow(id);
      }
    };
    container.addEventListener("click", handler);
    return () => container.removeEventListener("click", handler);
  }, [onBookNow]);

  /* ── Prevent map interactions from bubbling to page scroll ───────── */
  useEffect(() => {
    const container = mapContainer.current;
    if (!container) return;
    L.DomEvent.disableScrollPropagation(container);
    L.DomEvent.disableClickPropagation(container);
  }, []);

  /* ── Detect theme changes via MutationObserver ───────── */
  useEffect(() => {
    setDark(isDarkMode());
    const observer = new MutationObserver(() => setDark(isDarkMode()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  /* ── Swap tile layer when theme changes ──────────────── */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (tileLayerRef.current) map.removeLayer(tileLayerRef.current);
    const t = dark ? TILES.dark : TILES.light;
    tileLayerRef.current = L.tileLayer(t.url, {
      subdomains: t.subdomains,
      maxZoom: 19,
    }).addTo(map);
  }, [dark]);

  /* ── Initialize Leaflet ──────────────────────────────── */
  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    const map = L.map(mapContainer.current, {
      center: [viewState.latitude, viewState.longitude],
      zoom: viewState.zoom,
      zoomControl: false,
      attributionControl: false,
      zoomSnap: 0.25,
      zoomDelta: 0.5,
      wheelDebounceTime: 80,
      wheelPxPerZoomLevel: 80,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);

    const t = isDarkMode() ? TILES.dark : TILES.light;
    tileLayerRef.current = L.tileLayer(t.url, {
      subdomains: t.subdomains,
      maxZoom: 19,
    }).addTo(map);

    map.on("moveend", () => {
      const c = map.getCenter();
      setViewState({ longitude: c.lng, latitude: c.lat, zoom: map.getZoom() });
    });

    map.whenReady(() => {
      setReady(true);
      setTimeout(() => map.invalidateSize(), 50);
    });

    const ro = new ResizeObserver(() => {
      if (mapContainer.current && mapContainer.current.offsetHeight > 0) {
        map.invalidateSize();
      }
    });
    ro.observe(mapContainer.current);

    mapRef.current = map;

    return () => {
      ro.disconnect();
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Render markers + reach circles ─────────────────── */
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();
    circlesRef.current.forEach((c) => c.remove());
    circlesRef.current.clear();

    billboards.forEach((bb) => {
      const tc = getTypeColor(bb.type);

      // Reach radius circle
      if (showReach) {
        const circle = L.circle([bb.lat, bb.lng], {
          radius: getReachRadius(bb),
          color: tc.bg,
          weight: 1.5,
          opacity: 0.35,
          fillColor: tc.bg,
          fillOpacity: 0.08,
          interactive: false,
          className: "adspace-reach-circle",
        }).addTo(map);
        circlesRef.current.set(bb.id, circle);
      }

      // Marker
      const marker = L.marker([bb.lat, bb.lng], {
        icon: createPricePin(bb, false),
      }).addTo(map);

      marker.bindPopup(createPopupContent(bb), {
        closeButton: false,
        className: "adspace-leaflet-popup",
        maxWidth: 280,
        offset: [0, -4],
      });

      marker.on("mouseover", () => {
        setHoveredPin(bb.id);
        marker.setIcon(createPricePin(bb, true));
        // Brighten the reach circle on hover
        const c = circlesRef.current.get(bb.id);
        if (c) {
          c.setStyle({ fillOpacity: 0.18, opacity: 0.6, weight: 2 });
        }
      });

      marker.on("mouseout", () => {
        // Don't reset if this marker's popup is currently open
        if (marker.isPopupOpen()) return;
        setHoveredPin(null);
        marker.setIcon(createPricePin(bb, false));
        const c = circlesRef.current.get(bb.id);
        if (c) {
          c.setStyle({ fillOpacity: 0.08, opacity: 0.35, weight: 1.5 });
        }
      });

      // Open popup on click (not hover) so users can interact with Book Now
      marker.on("click", (e: L.LeafletMouseEvent) => {
        if (e.originalEvent) {
          L.DomEvent.preventDefault(e.originalEvent);
          L.DomEvent.stopPropagation(e.originalEvent);
        }
        marker.openPopup();
      });

      // Reset pin style when popup is closed
      marker.on("popupclose", () => {
        setHoveredPin(null);
        marker.setIcon(createPricePin(bb, false));
        const c = circlesRef.current.get(bb.id);
        if (c) {
          c.setStyle({ fillOpacity: 0.08, opacity: 0.35, weight: 1.5 });
        }
      });

      markersRef.current.set(bb.id, marker);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, billboards, showReach]);

  /* ── Sync hover from listings panel (highlight only, no popup) */
  useEffect(() => {
    if (!ready) return;
    markersRef.current.forEach((marker, id) => {
      const bb = billboards.find((b) => b.id === id);
      if (!bb) return;
      // Skip if popup is currently open — don't override user's click
      if (marker.isPopupOpen()) return;
      if (id === hoveredPin) {
        marker.setIcon(createPricePin(bb, true));
        const c = circlesRef.current.get(bb.id);
        if (c) c.setStyle({ fillOpacity: 0.18, opacity: 0.6, weight: 2 });
      } else {
        marker.setIcon(createPricePin(bb, false));
        const c = circlesRef.current.get(bb.id);
        if (c) c.setStyle({ fillOpacity: 0.08, opacity: 0.35, weight: 1.5 });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredPin, ready]);

  /* ── Toggle reach circles visibility ────────────────── */
  useEffect(() => {
    circlesRef.current.forEach((c) => {
      const el = (c as unknown as { _path?: HTMLElement })._path;
      if (el) el.style.display = showReach ? "" : "none";
    });
  }, [showReach]);


  // Unique types present
  const presentTypes = [...new Set(billboards.map((b) => b.type))];

  return (
    <div className="absolute inset-0 w-full h-full" style={{ overflow: "hidden" }}>
      {/* Loading state */}
      {!ready && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-[1000]"
          style={{
            background: dark
              ? "linear-gradient(135deg, #1e1e2e, #2d2d42)"
              : "linear-gradient(135deg, #f0f4f8, #e8eef5)",
          }}
        >
          <div className="relative">
            <div
              className="w-12 h-12 border-4 rounded-full animate-spin"
              style={{ borderColor: "#6366f1", borderTopColor: "transparent" }}
            />
            <div
              className="absolute inset-0 w-12 h-12 border-4 rounded-full animate-spin"
              style={{
                borderColor: "transparent",
                borderBottomColor: "#8b5cf6",
                animationDirection: "reverse",
                animationDuration: "1.5s",
              }}
            />
          </div>
          <p
            className="text-sm font-medium tracking-wide"
            style={{ color: dark ? "#a0aec0" : "#6b7280" }}
          >
            Loading map…
          </p>
        </div>
      )}

      {/* Map */}
      <div ref={mapContainer} className="w-full h-full z-[1]" />

      {/* ── Map Legend (bottom-left floating panel) ─────────── */}
      {ready && showLegend && (
        <div
          className="absolute bottom-20 left-4 z-[1000] glass-panel rounded-2xl shadow-lg px-4 py-3 transition-all"
          style={{ minWidth: 160 }}
        >
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
              Billboard Types
            </span>
            <button
              onClick={() => setShowLegend(false)}
              className="w-5 h-5 rounded-full bg-surface-variant flex items-center justify-center hover:bg-surface-container-highest transition-colors"
              aria-label="Close legend"
            >
              <svg
                className="w-3 h-3 text-on-surface-variant"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {presentTypes.map((type) => {
              const tc = getTypeColor(type);
              return (
                <div key={type} className="flex items-center gap-2.5">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{
                      background: tc.bg,
                      boxShadow: `0 0 6px ${tc.glow}`,
                    }}
                  />
                  <span className="text-xs font-medium text-on-surface">
                    {type}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Reach toggle */}
          <div className="mt-3 pt-2.5 border-t border-outline-variant/30">
            <button
              onClick={() => setShowReach((v) => !v)}
              className="flex items-center gap-2 w-full group"
            >
              <div
                className={`w-8 h-[18px] rounded-full relative transition-colors duration-200 ${
                  showReach ? "bg-primary" : "bg-surface-variant"
                }`}
              >
                <div
                  className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    showReach ? "translate-x-[16px]" : "translate-x-[2px]"
                  }`}
                />
              </div>
              <span className="text-[11px] font-semibold text-on-surface-variant group-hover:text-on-surface transition-colors">
                Reach Zones
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Re-open legend button if closed */}
      {ready && !showLegend && (
        <button
          onClick={() => setShowLegend(true)}
          className="absolute bottom-20 left-4 z-[1000] glass-panel rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
          aria-label="Show legend"
        >
          <svg
            className="w-4 h-4 text-on-surface"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
        </button>
      )}

      {/* ── Inject keyframe animations ─────────────────────── */}
      <style jsx global>{`
        @keyframes adspace-ping {
          0% {
            transform: translate(-50%, -55%) scale(1);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -55%) scale(1.6);
            opacity: 0;
          }
        }
        @keyframes adspace-blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
        .adspace-reach-circle {
          transition:
            fill-opacity 0.3s,
            stroke-opacity 0.3s,
            stroke-width 0.3s;
        }
      `}</style>
    </div>
  );
}
