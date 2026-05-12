import { NextResponse } from "next/server";
import { estimateTraffic, batchEstimateTraffic } from "@/lib/traffic-estimate";

/**
 * GET /api/traffic-estimate?lat=19.076&lng=72.877
 * Returns traffic estimate for a single location.
 *
 * POST /api/traffic-estimate
 * Body: { locations: [{ id: "bb-1", lat: 19.076, lng: 72.877 }, ...] }
 * Returns batch traffic estimates for multiple locations.
 */

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = parseFloat(searchParams.get("lat") || "");
  const lng = parseFloat(searchParams.get("lng") || "");

  if (isNaN(lat) || isNaN(lng)) {
    return NextResponse.json(
      { error: "Missing or invalid lat/lng query parameters" },
      { status: 400 }
    );
  }

  try {
    const estimate = await estimateTraffic(lat, lng);
    return NextResponse.json(estimate, {
      headers: {
        // Cache for 24 hours — OSM data doesn't change often
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("Traffic estimate failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch traffic estimate" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const locations = body.locations;

    if (!Array.isArray(locations) || locations.length === 0) {
      return NextResponse.json(
        { error: "Body must include a non-empty 'locations' array with { id, lat, lng }" },
        { status: 400 }
      );
    }

    if (locations.length > 20) {
      return NextResponse.json(
        { error: "Maximum 20 locations per batch request" },
        { status: 400 }
      );
    }

    const results = await batchEstimateTraffic(locations);

    // Convert Map to plain object for JSON
    const output: Record<string, unknown> = {};
    results.forEach((val, key) => {
      output[key] = val;
    });

    return NextResponse.json(output, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("Batch traffic estimate failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch batch traffic estimates" },
      { status: 500 }
    );
  }
}
