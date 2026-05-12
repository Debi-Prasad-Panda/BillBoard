import { NextResponse } from "next/server";

/**
 * GET /api/billboards
 *
 * Returns the full billboard inventory with optional filtering.
 * Query params: type, size, facing, available, minPrice, maxPrice, search
 *
 * GET /api/billboards/[id]  — handled by /api/billboards/[id]/route.ts
 */

// Billboard data — same source as page.tsx but accessible via API
// In production, this would be a database query
const BILLBOARDS = [
  { id: "bb-1", title: "Marine Drive Premium Hoarding", size: "40x20", type: "Static", facing: "East", impressions: 85000, price: 4500, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBspRisLqJkR76Hpxuq-Cd0vDuwzwbT3qpvH8jtriRAxdDdhkYnZ68sKsHjG9yW1b_pHUI6aNbnLk6bE40xrEHTQXpG1jgwGrh43DFBcaBZCgZG3g7d4e7z7snoaQb963Ep4c_TnjLfVbVb_vtn6f4obGlUnSopwCcxEHFGLpuPhD2MgplnJMzkCAxO7rh5ltyW2akeS9VDEQZgDitQ-29GVTBbdPOyvLHODoAnecferNOKyCSnb8_Nz5YGbHIS9JmemnNnxsLX2g", available: "Available Now", lat: 18.9438, lng: 72.8235 },
  { id: "bb-2", title: "Andheri Highway LED Billboard", size: "30x15", type: "LED", facing: "West", impressions: 120000, price: 7200, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBspRisLqJkR76Hpxuq-Cd0vDuwzwbT3qpvH8jtriRAxdDdhkYnZ68sKsHjG9yW1b_pHUI6aNbnLk6bE40xrEHTQXpG1jgwGrh43DFBcaBZCgZG3g7d4e7z7snoaQb963Ep4c_TnjLfVbVb_vtn6f4obGlUnSopwCcxEHFGLpuPhD2MgplnJMzkCAxO7rh5ltyW2akeS9VDEQZgDitQ-29GVTBbdPOyvLHODoAnecferNOKyCSnb8_Nz5YGbHIS9JmemnNnxsLX2g", available: "Available Now", lat: 19.1197, lng: 72.8464 },
  { id: "bb-3", title: "Bandra Linking Road Digital", size: "20x10", type: "Digital", facing: "North", impressions: 65000, price: 3200, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBspRisLqJkR76Hpxuq-Cd0vDuwzwbT3qpvH8jtriRAxdDdhkYnZ68sKsHjG9yW1b_pHUI6aNbnLk6bE40xrEHTQXpG1jgwGrh43DFBcaBZCgZG3g7d4e7z7snoaQb963Ep4c_TnjLfVbVb_vtn6f4obGlUnSopwCcxEHFGLpuPhD2MgplnJMzkCAxO7rh5ltyW2akeS9VDEQZgDitQ-29GVTBbdPOyvLHODoAnecferNOKyCSnb8_Nz5YGbHIS9JmemnNnxsLX2g", available: "From Jan 2025", lat: 19.0596, lng: 72.8295 },
  { id: "bb-4", title: "Juhu Beach Rd Unipole", size: "60x30", type: "Unipole", facing: "South", impressions: 95000, price: 8500, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBspRisLqJkR76Hpxuq-Cd0vDuwzwbT3qpvH8jtriRAxdDdhkYnZ68sKsHjG9yW1b_pHUI6aNbnLk6bE40xrEHTQXpG1jgwGrh43DFBcaBZCgZG3g7d4e7z7snoaQb963Ep4c_TnjLfVbVb_vtn6f4obGlUnSopwCcxEHFGLpuPhD2MgplnJMzkCAxO7rh5ltyW2akeS9VDEQZgDitQ-29GVTBbdPOyvLHODoAnecferNOKyCSnb8_Nz5YGbHIS9JmemnNnxsLX2g", available: "Available Now", lat: 19.0988, lng: 72.8267 },
  { id: "bb-5", title: "Dadar TT Flyover Static", size: "20x10", type: "Static", facing: "East", impressions: 72000, price: 2800, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBspRisLqJkR76Hpxuq-Cd0vDuwzwbT3qpvH8jtriRAxdDdhkYnZ68sKsHjG9yW1b_pHUI6aNbnLk6bE40xrEHTQXpG1jgwGrh43DFBcaBZCgZG3g7d4e7z7snoaQb963Ep4c_TnjLfVbVb_vtn6f4obGlUnSopwCcxEHFGLpuPhD2MgplnJMzkCAxO7rh5ltyW2akeS9VDEQZgDitQ-29GVTBbdPOyvLHODoAnecferNOKyCSnb8_Nz5YGbHIS9JmemnNnxsLX2g", available: "Available Now", lat: 19.0178, lng: 72.8478 },
  { id: "bb-6", title: "Powai Lake LED", size: "30x15", type: "LED", facing: "North", impressions: 55000, price: 5600, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBspRisLqJkR76Hpxuq-Cd0vDuwzwbT3qpvH8jtriRAxdDdhkYnZ68sKsHjG9yW1b_pHUI6aNbnLk6bE40xrEHTQXpG1jgwGrh43DFBcaBZCgZG3g7d4e7z7snoaQb963Ep4c_TnjLfVbVb_vtn6f4obGlUnSopwCcxEHFGLpuPhD2MgplnJMzkCAxO7rh5ltyW2akeS9VDEQZgDitQ-29GVTBbdPOyvLHODoAnecferNOKyCSnb8_Nz5YGbHIS9JmemnNnxsLX2g", available: "From Feb 2025", lat: 19.1176, lng: 72.9060 },
  { id: "bb-7", title: "CST Station Digital Screen", size: "15x10", type: "Digital", facing: "West", impressions: 180000, price: 6800, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBspRisLqJkR76Hpxuq-Cd0vDuwzwbT3qpvH8jtriRAxdDdhkYnZ68sKsHjG9yW1b_pHUI6aNbnLk6bE40xrEHTQXpG1jgwGrh43DFBcaBZCgZG3g7d4e7z7snoaQb963Ep4c_TnjLfVbVb_vtn6f4obGlUnSopwCcxEHFGLpuPhD2MgplnJMzkCAxO7rh5ltyW2akeS9VDEQZgDitQ-29GVTBbdPOyvLHODoAnecferNOKyCSnb8_Nz5YGbHIS9JmemnNnxsLX2g", available: "Available Now", lat: 18.9398, lng: 72.8355 },
  { id: "bb-8", title: "Thane Ghodbunder Rd Unipole", size: "60x30", type: "Unipole", facing: "East", impressions: 45000, price: 3800, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBspRisLqJkR76Hpxuq-Cd0vDuwzwbT3qpvH8jtriRAxdDdhkYnZ68sKsHjG9yW1b_pHUI6aNbnLk6bE40xrEHTQXpG1jgwGrh43DFBcaBZCgZG3g7d4e7z7snoaQb963Ep4c_TnjLfVbVb_vtn6f4obGlUnSopwCcxEHFGLpuPhD2MgplnJMzkCAxO7rh5ltyW2akeS9VDEQZgDitQ-29GVTBbdPOyvLHODoAnecferNOKyCSnb8_Nz5YGbHIS9JmemnNnxsLX2g", available: "Available Now", lat: 19.2183, lng: 72.9781 },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  let results = [...BILLBOARDS];

  // Filters
  const type = searchParams.get("type");
  if (type) results = results.filter(b => b.type.toLowerCase() === type.toLowerCase());

  const size = searchParams.get("size");
  if (size) results = results.filter(b => b.size === size);

  const facing = searchParams.get("facing");
  if (facing) results = results.filter(b => b.facing.toLowerCase() === facing.toLowerCase());

  const available = searchParams.get("available");
  if (available === "now") results = results.filter(b => b.available.includes("Now"));

  const minPrice = parseFloat(searchParams.get("minPrice") || "");
  if (!isNaN(minPrice)) results = results.filter(b => b.price >= minPrice);

  const maxPrice = parseFloat(searchParams.get("maxPrice") || "");
  if (!isNaN(maxPrice)) results = results.filter(b => b.price <= maxPrice);

  const search = searchParams.get("search")?.toLowerCase();
  if (search) results = results.filter(b =>
    b.title.toLowerCase().includes(search) ||
    b.type.toLowerCase().includes(search) ||
    b.size.toLowerCase().includes(search)
  );

  // Sorting
  const sortBy = searchParams.get("sort");
  if (sortBy === "price_asc") results.sort((a, b) => a.price - b.price);
  else if (sortBy === "price_desc") results.sort((a, b) => b.price - a.price);
  else if (sortBy === "impressions") results.sort((a, b) => b.impressions - a.impressions);

  return NextResponse.json({
    total: results.length,
    billboards: results,
    filters: {
      types: [...new Set(BILLBOARDS.map(b => b.type))],
      sizes: [...new Set(BILLBOARDS.map(b => b.size))],
      facings: [...new Set(BILLBOARDS.map(b => b.facing))],
      priceRange: {
        min: Math.min(...BILLBOARDS.map(b => b.price)),
        max: Math.max(...BILLBOARDS.map(b => b.price)),
      },
    },
  }, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
  });
}
