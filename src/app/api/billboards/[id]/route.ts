import { NextResponse } from "next/server";

/**
 * GET /api/billboards/[id]
 *
 * Returns detailed information for a single billboard.
 */

// Same data source — in production this would be a DB lookup
const BILLBOARDS: Record<string, {
  id: string; title: string; size: string; type: string; facing: string;
  impressions: number; price: number; image: string; available: string;
  lat: number; lng: number; description: string; vendor: string;
  specifications: Record<string, string>;
}> = {
  "bb-1": { id: "bb-1", title: "Marine Drive Premium Hoarding", size: "40x20", type: "Static", facing: "East", impressions: 85000, price: 4500, image: "", available: "Available Now", lat: 18.9438, lng: 72.8235, description: "Prime sea-facing hoarding along Marine Drive, Mumbai's iconic promenade. High visibility from both vehicular and pedestrian traffic.", vendor: "OutdoorMedia Co.", specifications: { material: "Flex vinyl", illumination: "Front-lit", structure: "Cantilever", installationTime: "3-4 days" } },
  "bb-2": { id: "bb-2", title: "Andheri Highway LED Billboard", size: "30x15", type: "LED", facing: "West", impressions: 120000, price: 7200, image: "", available: "Available Now", lat: 19.1197, lng: 72.8464, description: "High-impact LED board on Western Express Highway near Andheri flyover. 24/7 digital display with 15-second ad slots.", vendor: "BrightSign Media", specifications: { resolution: "1920x960px", brightness: "7000 nits", slots: "15-sec rotation", displayHours: "24/7" } },
  "bb-3": { id: "bb-3", title: "Bandra Linking Road Digital", size: "20x10", type: "Digital", facing: "North", impressions: 65000, price: 3200, image: "", available: "From Jan 2025", lat: 19.0596, lng: 72.8295, description: "Digital screen on busy Linking Road shopping district. Perfect for fashion, retail, and lifestyle brands.", vendor: "DigitalOOH Pvt Ltd", specifications: { resolution: "1280x640px", brightness: "5500 nits", slots: "10-sec rotation", displayHours: "6AM–12AM" } },
  "bb-4": { id: "bb-4", title: "Juhu Beach Rd Unipole", size: "60x30", type: "Unipole", facing: "South", impressions: 95000, price: 8500, image: "", available: "Available Now", lat: 19.0988, lng: 72.8267, description: "Massive unipole near Juhu Beach entrance. Landmark visibility from airport road and beach approach.", vendor: "SkyHigh Outdoors", specifications: { material: "Back-lit flex", height: "80ft", illumination: "Internal LED", structure: "Mono-pole steel" } },
  "bb-5": { id: "bb-5", title: "Dadar TT Flyover Static", size: "20x10", type: "Static", facing: "East", impressions: 72000, price: 2800, image: "", available: "Available Now", lat: 19.0178, lng: 72.8478, description: "Classic hoarding on Dadar TT Circle flyover. Dense commercial area with heavy daily commuter traffic.", vendor: "OutdoorMedia Co.", specifications: { material: "Flex vinyl", illumination: "Front-lit", structure: "Wall-mounted", installationTime: "2 days" } },
  "bb-6": { id: "bb-6", title: "Powai Lake LED", size: "30x15", type: "LED", facing: "North", impressions: 55000, price: 5600, image: "", available: "From Feb 2025", lat: 19.1176, lng: 72.9060, description: "LED board facing Powai Lake, visible from IIT Bombay campus and Hiranandani Business Park.", vendor: "BrightSign Media", specifications: { resolution: "1920x960px", brightness: "6000 nits", slots: "15-sec rotation", displayHours: "24/7" } },
  "bb-7": { id: "bb-7", title: "CST Station Digital Screen", size: "15x10", type: "Digital", facing: "West", impressions: 180000, price: 6800, image: "", available: "Available Now", lat: 18.9398, lng: 72.8355, description: "Digital display at Chhatrapati Shivaji Terminus — Mumbai's busiest railway station with 3M+ daily commuters.", vendor: "RailMedia India", specifications: { resolution: "1920x1080px", brightness: "5000 nits", slots: "10-sec rotation", displayHours: "5AM–1AM" } },
  "bb-8": { id: "bb-8", title: "Thane Ghodbunder Rd Unipole", size: "60x30", type: "Unipole", facing: "East", impressions: 45000, price: 3800, image: "", available: "Available Now", lat: 19.2183, lng: 72.9781, description: "Large unipole on Ghodbunder Road, Thane's fastest-growing residential corridor.", vendor: "SkyHigh Outdoors", specifications: { material: "Back-lit flex", height: "60ft", illumination: "Internal LED", structure: "Mono-pole steel" } },
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const billboard = BILLBOARDS[id];

  if (!billboard) {
    return NextResponse.json(
      { error: "Billboard not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(billboard, {
    headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200" },
  });
}
