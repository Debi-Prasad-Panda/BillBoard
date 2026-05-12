/**
 * OSM-based Traffic & Impression Estimator
 *
 * Queries the free OpenStreetMap Overpass API to get:
 *  1. Road classification near the billboard (motorway > trunk > primary > secondary > …)
 *  2. Nearby POI density (shops, transit, amenities within 500m)
 *
 * Combines these into a daily impression estimate.
 * No API key needed — completely free.
 */

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

/* ── Required headers for Overpass API ────────────────── */
const OVERPASS_HEADERS = {
  "Content-Type": "application/x-www-form-urlencoded",
  "User-Agent": "AdSpace-OOH-Marketplace/1.0",
  "Accept": "application/json",
};

/* ── Road type → estimated daily vehicles ─────────────── */
const ROAD_WEIGHTS: Record<string, number> = {
  motorway:       90_000,
  motorway_link:  60_000,
  trunk:          70_000,
  trunk_link:     50_000,
  primary:        40_000,
  primary_link:   30_000,
  secondary:      25_000,
  secondary_link: 18_000,
  tertiary:       15_000,
  tertiary_link:  10_000,
  residential:     5_000,
  unclassified:    3_000,
  service:         1_500,
  living_street:   1_000,
};

/* ── POI type → foot traffic per day ──────────────────── */
const POI_MULTIPLIERS: Record<string, number> = {
  railway_station:  5000,
  bus_station:      3000,
  subway_entrance:  4000,
  bus_stop:         800,
  mall:             4000,
  marketplace:      3000,
  hospital:         2000,
  university:       2500,
  college:          1800,
  school:           1000,
  cinema:           1500,
  restaurant:        200,
  fast_food:         200,
  shop:              150,
  cafe:              150,
  bank:              300,
  atm:               100,
  fuel:              400,
  place_of_worship:  500,
  park:              800,
  hotel:             600,
  supermarket:       500,
  pharmacy:          200,
  clinic:            300,
  parking:           200,
};

export type TrafficEstimate = {
  lat: number;
  lng: number;
  nearestRoad: string | null;
  roadTraffic: number;
  poiCount: number;
  poiTraffic: number;
  estimatedDailyImpressions: number;
  trafficScore: number;       // 0–100
  reachRadiusMeters: number;
  breakdown: {
    roadType: string;
    roadContribution: number;
    poiContribution: number;
    nearbyPOIs: { type: string; count: number }[];
  };
};

/**
 * Query OSM Overpass for the nearest road type within `radiusM` meters.
 * Uses progressively wider search: 200m → 500m → 1000m.
 */
async function fetchNearestRoad(lat: number, lng: number, radiusM = 200): Promise<{ type: string; name: string | null }> {
  const query = `
    [out:json][timeout:15];
    way(around:${radiusM},${lat},${lng})["highway"~"^(motorway|trunk|primary|secondary|tertiary|residential|unclassified|service|living_street|motorway_link|trunk_link|primary_link|secondary_link|tertiary_link)$"];
    out tags 5;
  `;

  try {
    const res = await fetch(OVERPASS_URL, {
      method: "POST",
      headers: OVERPASS_HEADERS,
      body: `data=${encodeURIComponent(query)}`,
    });

    if (!res.ok) throw new Error(`Overpass HTTP ${res.status}`);
    const data = await res.json();

    if (!data.elements?.length) {
      // Widen search progressively
      if (radiusM < 500) return fetchNearestRoad(lat, lng, 500);
      if (radiusM < 1000) return fetchNearestRoad(lat, lng, 1000);
      return { type: "residential", name: null }; // fallback to residential instead of unclassified
    }

    // Pick the highest-traffic road found
    const roads = data.elements
      .map((el: { tags?: Record<string, string> }) => ({
        type: el.tags?.highway || "unclassified",
        name: el.tags?.name || null,
      }))
      .sort((a: { type: string }, b: { type: string }) =>
        (ROAD_WEIGHTS[b.type] || 0) - (ROAD_WEIGHTS[a.type] || 0)
      );

    return roads[0];
  } catch {
    return { type: "residential", name: null };
  }
}

/**
 * Query OSM Overpass for POIs within `radiusM` meters.
 * Searches both nodes AND ways (buildings mapped as polygons).
 */
async function fetchNearbyPOIs(lat: number, lng: number, radiusM = 500): Promise<{ type: string; count: number }[]> {
  const query = `
    [out:json][timeout:20];
    (
      node(around:${radiusM},${lat},${lng})["amenity"];
      way(around:${radiusM},${lat},${lng})["amenity"];
      node(around:${radiusM},${lat},${lng})["shop"];
      way(around:${radiusM},${lat},${lng})["shop"];
      node(around:${radiusM},${lat},${lng})["tourism"];
      node(around:${radiusM},${lat},${lng})["public_transport"];
      node(around:${radiusM},${lat},${lng})["railway"~"station|halt|subway_entrance"];
      node(around:${radiusM},${lat},${lng})["highway"="bus_stop"];
      way(around:${radiusM},${lat},${lng})["building"~"commercial|retail|hospital|university|school|college"];
      node(around:${radiusM},${lat},${lng})["leisure"~"park|playground|sports_centre"];
    );
    out tags;
  `;

  try {
    const res = await fetch(OVERPASS_URL, {
      method: "POST",
      headers: OVERPASS_HEADERS,
      body: `data=${encodeURIComponent(query)}`,
    });

    if (!res.ok) throw new Error(`Overpass HTTP ${res.status}`);
    const data = await res.json();

    // Categorize POIs
    const counts: Record<string, number> = {};

    for (const el of data.elements || []) {
      const tags = el.tags || {};
      // Determine category
      let category = "other";
      if (tags.railway === "station" || tags.railway === "halt") category = "railway_station";
      else if (tags.railway === "subway_entrance") category = "subway_entrance";
      else if (tags.public_transport === "station" || tags.public_transport === "stop_position") category = "bus_station";
      else if (tags.highway === "bus_stop") category = "bus_stop";
      else if (tags.shop === "mall" || tags.shop === "department_store" || tags.building === "retail" || tags.building === "commercial") category = "mall";
      else if (tags.shop === "supermarket") category = "supermarket";
      else if (tags.amenity === "hospital" || tags.building === "hospital") category = "hospital";
      else if (tags.amenity === "university" || tags.building === "university") category = "university";
      else if (tags.amenity === "college" || tags.building === "college") category = "college";
      else if (tags.amenity === "school" || tags.building === "school") category = "school";
      else if (tags.amenity === "cinema") category = "cinema";
      else if (tags.amenity === "restaurant" || tags.amenity === "fast_food") category = "restaurant";
      else if (tags.amenity === "cafe") category = "cafe";
      else if (tags.amenity === "bank") category = "bank";
      else if (tags.amenity === "atm") category = "atm";
      else if (tags.amenity === "fuel") category = "fuel";
      else if (tags.amenity === "pharmacy") category = "pharmacy";
      else if (tags.amenity === "clinic" || tags.amenity === "doctors") category = "clinic";
      else if (tags.amenity === "parking") category = "parking";
      else if (tags.amenity === "place_of_worship") category = "place_of_worship";
      else if (tags.amenity === "marketplace") category = "marketplace";
      else if (tags.leisure === "park" || tags.leisure === "playground") category = "park";
      else if (tags.tourism === "hotel" || tags.tourism === "guest_house") category = "hotel";
      else if (tags.shop) category = "shop";

      counts[category] = (counts[category] || 0) + 1;
    }

    return Object.entries(counts)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count);
  } catch {
    return [];
  }
}

/**
 * Calculate the estimated daily impressions for a location.
 */
export async function estimateTraffic(lat: number, lng: number): Promise<TrafficEstimate> {
  // Fetch both in parallel
  const [road, pois] = await Promise.all([
    fetchNearestRoad(lat, lng),
    fetchNearbyPOIs(lat, lng, 500),
  ]);

  // Road-based traffic
  const roadTraffic = ROAD_WEIGHTS[road.type] || 3000;

  // POI-based foot traffic
  let poiTraffic = 0;
  for (const poi of pois) {
    const mult = POI_MULTIPLIERS[poi.type] || 100;
    poiTraffic += mult * Math.min(poi.count, 10); // cap per category at 10
  }

  const totalPOICount = pois.reduce((sum, p) => sum + p.count, 0);

  // Combined estimate: road vehicles × visibility factor + foot traffic
  // Visibility factor: ~30% of passing vehicles actually see the billboard
  const vehicleImpressions = Math.round(roadTraffic * 0.3);
  const estimatedDailyImpressions = vehicleImpressions + poiTraffic;

  // Normalize to 0–100 score
  // Scale: 1k = ~5, 5k = ~20, 15k = ~45, 30k = ~70, 50k+ = ~90+
  const trafficScore = Math.min(100, Math.round(
    Math.sqrt(estimatedDailyImpressions / 500) * 10
  ));

  // Reach radius based on score
  const reachRadiusMeters = trafficScore >= 80 ? 1800
    : trafficScore >= 60 ? 1400
    : trafficScore >= 40 ? 1000
    : trafficScore >= 20 ? 700
    : 400;

  return {
    lat,
    lng,
    nearestRoad: road.type,
    roadTraffic,
    poiCount: totalPOICount,
    poiTraffic,
    estimatedDailyImpressions,
    trafficScore,
    reachRadiusMeters,
    breakdown: {
      roadType: road.type.replace(/_/g, " "),
      roadContribution: vehicleImpressions,
      poiContribution: poiTraffic,
      nearbyPOIs: pois.slice(0, 10), // top 10
    },
  };
}

/**
 * Batch estimate for multiple locations.
 * Adds a small delay between requests to respect Overpass rate limits.
 */
export async function batchEstimateTraffic(
  locations: { id: string; lat: number; lng: number }[]
): Promise<Map<string, TrafficEstimate>> {
  const results = new Map<string, TrafficEstimate>();

  for (const loc of locations) {
    const estimate = await estimateTraffic(loc.lat, loc.lng);
    results.set(loc.id, estimate);
    // Small delay to avoid Overpass rate limiting (max ~2 req/sec)
    await new Promise((r) => setTimeout(r, 600));
  }

  return results;
}
