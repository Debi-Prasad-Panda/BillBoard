"use client";
import { useEffect, useRef } from "react";

export default function MapTest() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    let map: any = null;
    
    (async () => {
      try {
        // @ts-ignore - maplibre-gl may not be installed
        const maplibregl = (await import("maplibre-gl")).default;
        // @ts-ignore
        await import("maplibre-gl/dist/maplibre-gl.css");
        
        console.log("[MapTest] maplibregl version:", maplibregl.version);
        console.log("[MapTest] container size:", 
          containerRef.current?.offsetWidth, "x", containerRef.current?.offsetHeight);
        console.log("[MapTest] WebGL support:", maplibregl.supported());
        
        if (!containerRef.current) return;
        
        map = new maplibregl.Map({
          container: containerRef.current,
          style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
          center: [72.85, 19.06],
          zoom: 11,
        });
        
        map.on("load", () => {
          console.log("[MapTest] ✅ Map loaded successfully!");
        });
        
        map.on("error", (e: any) => {
          console.error("[MapTest] ❌ Map error:", e.error?.message || e);
        });
        
      } catch (err) {
        console.error("[MapTest] ❌ Failed to init map:", err);
      }
    })();
    
    return () => { map?.remove(); };
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <h1 style={{ position: "absolute", top: 10, left: 10, zIndex: 99, background: "red", color: "white", padding: "8px 16px", fontSize: 20 }}>
        MAP TEST PAGE - container below should show map
      </h1>
      <div 
        ref={containerRef} 
        style={{ width: "100%", height: "100%", background: "#e0e0e0" }} 
      />
    </div>
  );
}
