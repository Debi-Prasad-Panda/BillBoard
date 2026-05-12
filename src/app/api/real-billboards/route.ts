import { NextResponse } from "next/server";
import { fetchRealBillboards, type RealBillboard } from "@/lib/real-billboards";

/**
 * GET /api/real-billboards
 *
 * Fetches actual billboard locations from OpenStreetMap.
 * Data is 100% real — GPS coordinates of mapped advertising structures.
 *
 * Cached in-memory for 1 hour to avoid hitting OSM rate limits.
 */

let cachedBillboards: RealBillboard[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour
let fetchInProgress: Promise<RealBillboard[]> | null = null;

export async function GET() {
  // Return from cache if fresh
  if (cachedBillboards && Date.now() - cacheTimestamp < CACHE_TTL) {
    return NextResponse.json({
      source: "openstreetmap",
      cached: true,
      total: cachedBillboards.length,
      billboards: cachedBillboards,
    });
  }

  try {
    // Prevent duplicate concurrent fetches
    if (!fetchInProgress) {
      fetchInProgress = fetchRealBillboards();
    }

    const billboards = await fetchInProgress;
    fetchInProgress = null;

    // Cache the results
    cachedBillboards = billboards;
    cacheTimestamp = Date.now();

    return NextResponse.json({
      source: "openstreetmap",
      cached: false,
      total: billboards.length,
      billboards,
    });
  } catch (error) {
    fetchInProgress = null;
    console.error("Failed to fetch real billboards:", error);
    return NextResponse.json(
      { error: "Failed to fetch billboard data from OpenStreetMap" },
      { status: 500 }
    );
  }
}
