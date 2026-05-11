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
  setViewState: (vs: { longitude: number; latitude: number; zoom: number }) => void;
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

/* ─── Format price as compact string ────────────────────── */
function formatPrice(price: number) {
  if (price >= 100_000) return `₹${(price / 100_000).toFixed(1)}L`;
  if (price >= 1_000) return `₹${Math.round(price / 1_000)}k`;
  return `₹${price}`;
}

/* ─── Premium Airbnb-style price chip pin ─────────────────
   Active: filled brand colour + white text + scale-up
   Normal: white pill + dark text + shadow
   The tiny downward triangle acts as a pointer.
────────────────────────────────────────────────────────── */
function createPricePin(bb: Billboard, active = false) {
  const label = formatPrice(bb.price);
  const chipW = Math.max(label.length * 9 + 24, 64);
  const chipH = 34;
  const totalH = chipH + 8;

  const bg = active ? "#6366f1" : "#ffffff";
  const textColor = active ? "#ffffff" : "#111111";
  const border = active ? "none" : "1.5px solid rgba(0,0,0,0.12)";
  const shadow = active
    ? "0 4px 20px rgba(99,102,241,0.45), 0 2px 8px rgba(0,0,0,0.2)"
    : "0 2px 8px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.08)";
  const scale = active ? "scale(1.12)" : "scale(1)";
  const zIdx = active ? 9999 : 1;
  const fw = active ? "700" : "600";

  const html = `
    <div style="
      position:relative;
      width:${chipW}px;
      height:${totalH}px;
      transform:${scale};
      transform-origin:center bottom;
      transition:transform 0.18s cubic-bezier(0.34,1.56,0.64,1);
      z-index:${zIdx};
      cursor:pointer;
    ">
      <div style="
        position:absolute;top:0;left:0;
        width:${chipW}px;height:${chipH}px;
        background:${bg};
        border-radius:20px;
        border:${border};
        box-shadow:${shadow};
        display:flex;align-items:center;justify-content:center;
        transition:background 0.18s,box-shadow 0.18s;
        overflow:hidden;
      ">
        <span style="
          font-size:13px;
          font-weight:${fw};
          color:${textColor};
          letter-spacing:-0.2px;
          font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif;
          white-space:nowrap;
          transition:color 0.18s;
          user-select:none;
        ">${label}</span>
      </div>
      <div style="
        position:absolute;
        bottom:0;
        left:50%;
        transform:translateX(-50%);
        width:0;height:0;
        border-left:6px solid transparent;
        border-right:6px solid transparent;
        border-top:8px solid ${active ? "#6366f1" : "#ffffff"};
        filter:${active ? "none" : "drop-shadow(0 2px 1px rgba(0,0,0,0.08))"};
        transition:border-top-color 0.18s;
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

/* ─── Premium popup card ─────────────────────────────────── */
function createPopupContent(bb: Billboard) {
  const badge =
    bb.availability === "available"
      ? '<span style="background:#d1fae5;color:#065f46;padding:2px 8px;border-radius:99px;font-size:10px;font-weight:600;letter-spacing:0.3px;">Available</span>'
      : '<span style="background:#fee2e2;color:#991b1b;padding:2px 8px;border-radius:99px;font-size:10px;font-weight:600;letter-spacing:0.3px;">Booked</span>';

  return `
    <div style="
      width:230px;
      font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif;
      border-radius:14px;
      overflow:hidden;
    ">
      <div style="position:relative;height:110px;background:#e2e8f0;overflow:hidden;">
        <img src="${bb.image}" alt="${bb.title}"
          style="width:100%;height:100%;object-fit:cover;display:block;"
          onerror="this.parentElement.style.background='linear-gradient(135deg,#6366f1,#8b5cf6)'" />
        <div style="position:absolute;top:8px;left:8px;">${badge}</div>
      </div>
      <div style="padding:12px 14px 14px;">
        <p style="
          font-size:13.5px;font-weight:700;color:#111;
          margin:0 0 3px;line-height:1.3;
          white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
        ">${bb.title}</p>
        <p style="font-size:11.5px;color:#6b7280;margin:0 0 10px;">
          ${bb.type} &middot; ${bb.size} &middot; ${bb.facing} Facing
        </p>
        <div style="display:flex;align-items:baseline;gap:3px;">
          <span style="font-size:20px;font-weight:800;color:#6366f1;letter-spacing:-0.5px;">
            ${formatPrice(bb.price)}
          </span>
          <span style="font-size:11px;color:#9ca3af;font-weight:500;">/day</span>
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
}: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const [ready, setReady] = useState(false);
  const [dark, setDark] = useState(false);

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
    tileLayerRef.current = L.tileLayer(t.url, { subdomains: t.subdomains, maxZoom: 19 }).addTo(map);
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
    tileLayerRef.current = L.tileLayer(t.url, { subdomains: t.subdomains, maxZoom: 19 }).addTo(map);

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

  /* ── Render markers ──────────────────────────────────── */
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();

    billboards.forEach((bb) => {
      const marker = L.marker([bb.lat, bb.lng], {
        icon: createPricePin(bb, false),
      }).addTo(map);

      marker.bindPopup(createPopupContent(bb), {
        closeButton: false,
        className: "adspace-leaflet-popup",
        maxWidth: 250,
        offset: [0, -4],
      });

      marker.on("mouseover", () => {
        setHoveredPin(bb.id);
        marker.setIcon(createPricePin(bb, true));
        marker.openPopup();
      });

      marker.on("mouseout", () => {
        setHoveredPin(null);
        marker.setIcon(createPricePin(bb, false));
        marker.closePopup();
      });

      marker.on("click", () => {
        map.flyTo([bb.lat, bb.lng], 15, {
          animate: true,
          duration: 1.4,
          easeLinearity: 0.2,
        });
      });

      markersRef.current.set(bb.id, marker);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, billboards]);

  /* ── Sync hover from listings panel ─────────────────── */
  useEffect(() => {
    if (!ready) return;
    markersRef.current.forEach((marker, id) => {
      const bb = billboards.find((b) => b.id === id);
      if (!bb) return;
      if (id === hoveredPin) {
        marker.setIcon(createPricePin(bb, true));
        marker.openPopup();
      } else {
        marker.setIcon(createPricePin(bb, false));
        marker.closePopup();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredPin, ready]);

  return (
    <div className="absolute inset-0 w-full h-full min-h-[600px]">
      {!ready && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-[1000]"
          style={{
            background: dark
              ? "linear-gradient(135deg, #1e1e2e, #2d2d42)"
              : "linear-gradient(135deg, #f0f4f8, #e8eef5)",
          }}
        >
          <div
            className="w-10 h-10 border-4 rounded-full animate-spin"
            style={{ borderColor: "#6366f1", borderTopColor: "transparent" }}
          />
          <p className="text-sm font-medium tracking-wide"
            style={{ color: dark ? "#a0aec0" : "#6b7280" }}>
            Loading map…
          </p>
        </div>
      )}
      <div ref={mapContainer} className="w-full h-full z-[1] min-h-[600px]" />
    </div>
  );
}
