export type Vendor = {
  name: string; rating: number; totalListings: number;
  verified: boolean; since: string; responseTime: string;
};
export type Scores = {
  visibility: number; readability: number; dwellTime: number;
  illumination: number; angle: number;
};
export type TrafficData = {
  hourly: number[]; // 24 values (0-23h)
  weekdayAvg: number; weekendAvg: number; peakHour: string;
};
export type CampaignData = {
  totalRuns: number; avgDuration: number; renewalRate: number;
  topBrands: string[]; avgCTR: number;
};
export type MarketData = {
  rank: number; totalInArea: number; percentile: number; priceVsAvg: number;
};

export type Billboard = {
  id: string; title: string; size: string; type: string; facing: string;
  impressions: number; price: number; image: string; available: string;
  lat: number; lng: number; availability: "available" | "booked" | "upcoming";
  location: string; vendor: Vendor; scores: Scores; traffic: TrafficData;
  campaigns: CampaignData; market: MarketData;
  demographics: { twoWheeler: number; car: number; bus: number; pedestrian: number; incomeZone: string; };
  weatherScore: number; proofImages: string[];
  bookedDates: string[]; // "YYYY-MM-DD" strings
};

const IMG_A = "https://lh3.googleusercontent.com/aida-public/AB6AXuClrIlKUzUApEcejLdaZWiZdlTq8tJEcf-mzwJ1Exa6szUvbvAhQi-T3wBTxjomngmizDz5KuHqZFI0oEeCAw3JwWvTO99JFr_4Bq0WGeUKVq44h6GRs5WiTEJ5fzgFBDJJurCj1uwd-oWS4wvlNkZyetb6ch1Cjp_HmKcHilaKqetC_9JTr_K5zWafGafyFOThtCIzDHFcyI_q6Wcbu2Qlp-qzXLIwXooCuXnvBI8rY90W4s9okCgbnDInVYlWBcAlDOMjIBEz_g";
const IMG_B = "https://lh3.googleusercontent.com/aida-public/AB6AXuBspRisLqJkR76Hpxuq-Cd0vDuwzwbT3qpvH8jtriRAxdDdhkYnZ68sKsHjG9yW1b_pHUI6aNbnLk6bE40xrEHTQXpG1jgwGrh43DFBcaBZCgZG3g7d4e7z7snoaQb963Ep4c_TnjLfVbVb_vtn6f4obGlUnSopwCcxEHFGLpuPhD2MgplnJMzkCAxO7rh5ltyW2akeS9VDEQZgDitQ-29GVTBbdPOyvLHODoAnecferNOKyCSnb8_Nz5YGbHIS9JmemnNnxsLX2g";

function makeHourly(peak: number, base: number): number[] {
  return Array.from({ length: 24 }, (_, h) => {
    const dist = Math.min(Math.abs(h - peak), Math.abs(h - peak + 24));
    return Math.round(base * Math.max(0.1, 1 - dist * 0.08) + Math.random() * base * 0.1);
  });
}

export const BILLBOARDS: Billboard[] = [
  {
    id: "bb-1", title: "Khandagiri Main Road Hoarding", size: "20x40", type: "Static",
    facing: "South", impressions: 45000, price: 850, image: IMG_A,
    available: "Available Now", lat: 19.076, lng: 72.8777, availability: "available",
    location: "Khandagiri, Bhubaneswar",
    vendor: { name: "OOH Prime Media", rating: 4.6, totalListings: 34, verified: true, since: "2019", responseTime: "< 2 hrs" },
    scores: { visibility: 82, readability: 78, dwellTime: 71, illumination: 60, angle: 88 },
    traffic: { hourly: makeHourly(9, 1800), weekdayAvg: 45000, weekendAvg: 38000, peakHour: "9 AM – 10 AM" },
    campaigns: { totalRuns: 48, avgDuration: 21, renewalRate: 62, topBrands: ["Reliance Jio", "BigBazaar", "HDFC Bank"], avgCTR: 0.9 },
    market: { rank: 4, totalInArea: 18, percentile: 78, priceVsAvg: -12 },
    demographics: { twoWheeler: 38, car: 32, bus: 18, pedestrian: 12, incomeZone: "Mid-High" },
    weatherScore: 74, proofImages: [IMG_A, IMG_B, IMG_A],
    bookedDates: ["2025-06-01","2025-06-02","2025-06-03","2025-06-15","2025-06-16","2025-07-04","2025-07-05"],
  },
  {
    id: "bb-2", title: "Downtown Digital Display", size: "10x20", type: "Digital",
    facing: "East", impressions: 80000, price: 1200, image: IMG_B,
    available: "Available Tomorrow", lat: 19.0522, lng: 72.8315, availability: "upcoming",
    location: "Fort, Mumbai",
    vendor: { name: "CityLights OOH", rating: 4.8, totalListings: 67, verified: true, since: "2016", responseTime: "< 1 hr" },
    scores: { visibility: 91, readability: 93, dwellTime: 85, illumination: 98, angle: 79 },
    traffic: { hourly: makeHourly(18, 3200), weekdayAvg: 80000, weekendAvg: 55000, peakHour: "6 PM – 7 PM" },
    campaigns: { totalRuns: 112, avgDuration: 14, renewalRate: 78, topBrands: ["Swiggy", "Zomato", "Myntra", "CRED"], avgCTR: 2.1 },
    market: { rank: 2, totalInArea: 24, percentile: 92, priceVsAvg: 8 },
    demographics: { twoWheeler: 22, car: 45, bus: 14, pedestrian: 19, incomeZone: "High" },
    weatherScore: 88, proofImages: [IMG_B, IMG_A, IMG_B],
    bookedDates: ["2025-05-15","2025-05-16","2025-05-17","2025-05-18","2025-06-20","2025-06-21"],
  },
  {
    id: "bb-3", title: "Bandra Flyover Premium LED", size: "30x60", type: "LED",
    facing: "North", impressions: 120000, price: 3500, image: IMG_A,
    available: "Available Now", lat: 19.0596, lng: 72.8295, availability: "available",
    location: "Bandra West, Mumbai",
    vendor: { name: "SkySign India", rating: 4.9, totalListings: 22, verified: true, since: "2018", responseTime: "< 30 min" },
    scores: { visibility: 96, readability: 89, dwellTime: 92, illumination: 99, angle: 95 },
    traffic: { hourly: makeHourly(8, 4800), weekdayAvg: 120000, weekendAvg: 98000, peakHour: "8 AM – 9 AM" },
    campaigns: { totalRuns: 86, avgDuration: 28, renewalRate: 85, topBrands: ["Samsung", "Apple", "Tata Motors", "Hyundai"], avgCTR: 3.2 },
    market: { rank: 1, totalInArea: 24, percentile: 98, priceVsAvg: 22 },
    demographics: { twoWheeler: 18, car: 55, bus: 12, pedestrian: 15, incomeZone: "Premium" },
    weatherScore: 91, proofImages: [IMG_A, IMG_B, IMG_A],
    bookedDates: ["2025-06-10","2025-06-11","2025-06-12"],
  },
  {
    id: "bb-4", title: "Andheri Station Bus Shelter", size: "6x4", type: "Static",
    facing: "West", impressions: 25000, price: 350, image: IMG_B,
    available: "Available Now", lat: 19.1197, lng: 72.8468, availability: "available",
    location: "Andheri West, Mumbai",
    vendor: { name: "StreetView Ads", rating: 4.1, totalListings: 89, verified: false, since: "2021", responseTime: "< 6 hrs" },
    scores: { visibility: 65, readability: 72, dwellTime: 88, illumination: 55, angle: 61 },
    traffic: { hourly: makeHourly(9, 1000), weekdayAvg: 25000, weekendAvg: 18000, peakHour: "9 AM – 10 AM" },
    campaigns: { totalRuns: 31, avgDuration: 10, renewalRate: 40, topBrands: ["D-Mart","Local Brands"], avgCTR: 0.6 },
    market: { rank: 14, totalInArea: 18, percentile: 24, priceVsAvg: -38 },
    demographics: { twoWheeler: 45, car: 20, bus: 25, pedestrian: 10, incomeZone: "Mid" },
    weatherScore: 58, proofImages: [IMG_B, IMG_A],
    bookedDates: [],
  },
  {
    id: "bb-5", title: "Juhu Beach Road Unipole", size: "20x30", type: "Unipole",
    facing: "South", impressions: 60000, price: 1800, image: IMG_A,
    available: "Available Next Week", lat: 19.1021, lng: 72.827, availability: "upcoming",
    location: "Juhu, Mumbai",
    vendor: { name: "BeachFront Media", rating: 4.5, totalListings: 15, verified: true, since: "2020", responseTime: "< 3 hrs" },
    scores: { visibility: 88, readability: 81, dwellTime: 76, illumination: 72, angle: 84 },
    traffic: { hourly: makeHourly(19, 2400), weekdayAvg: 60000, weekendAvg: 82000, peakHour: "7 PM – 8 PM" },
    campaigns: { totalRuns: 54, avgDuration: 18, renewalRate: 70, topBrands: ["Titan","Tanishq","MakeMyTrip"], avgCTR: 1.8 },
    market: { rank: 3, totalInArea: 12, percentile: 83, priceVsAvg: 5 },
    demographics: { twoWheeler: 28, car: 42, bus: 8, pedestrian: 22, incomeZone: "High" },
    weatherScore: 79, proofImages: [IMG_A, IMG_B],
    bookedDates: ["2025-05-13","2025-05-14","2025-05-15","2025-05-16","2025-05-17","2025-05-18","2025-05-19"],
  },
  {
    id: "bb-6", title: "Powai IT Park Digital Screen", size: "15x25", type: "Digital",
    facing: "East", impressions: 95000, price: 2200, image: IMG_B,
    available: "Available Now", lat: 19.1176, lng: 72.906, availability: "available",
    location: "Powai, Mumbai",
    vendor: { name: "TechZone Displays", rating: 4.7, totalListings: 28, verified: true, since: "2017", responseTime: "< 1 hr" },
    scores: { visibility: 93, readability: 95, dwellTime: 80, illumination: 97, angle: 88 },
    traffic: { hourly: makeHourly(17, 3800), weekdayAvg: 95000, weekendAvg: 42000, peakHour: "5 PM – 6 PM" },
    campaigns: { totalRuns: 94, avgDuration: 20, renewalRate: 82, topBrands: ["Infosys","Wipro","Razorpay","Zerodha"], avgCTR: 2.8 },
    market: { rank: 1, totalInArea: 9, percentile: 95, priceVsAvg: 15 },
    demographics: { twoWheeler: 20, car: 58, bus: 10, pedestrian: 12, incomeZone: "Premium" },
    weatherScore: 86, proofImages: [IMG_B, IMG_A, IMG_B],
    bookedDates: ["2025-06-05","2025-06-06","2025-06-07"],
  },
  {
    id: "bb-7", title: "Nariman Point Skyline LED", size: "40x80", type: "LED",
    facing: "North", impressions: 200000, price: 7500, image: IMG_A,
    available: "Available Now", lat: 18.927, lng: 72.8233, availability: "available",
    location: "Nariman Point, Mumbai",
    vendor: { name: "SkySign India", rating: 4.9, totalListings: 22, verified: true, since: "2018", responseTime: "< 30 min" },
    scores: { visibility: 99, readability: 94, dwellTime: 96, illumination: 100, angle: 97 },
    traffic: { hourly: makeHourly(9, 8000), weekdayAvg: 200000, weekendAvg: 160000, peakHour: "9 AM – 11 AM" },
    campaigns: { totalRuns: 140, avgDuration: 30, renewalRate: 91, topBrands: ["BMW","Rolex","LIC","SBI"], avgCTR: 4.1 },
    market: { rank: 1, totalInArea: 30, percentile: 99, priceVsAvg: 45 },
    demographics: { twoWheeler: 10, car: 65, bus: 15, pedestrian: 10, incomeZone: "Ultra Premium" },
    weatherScore: 95, proofImages: [IMG_A, IMG_B, IMG_A],
    bookedDates: ["2025-07-01","2025-07-02","2025-07-03","2025-07-04","2025-07-05"],
  },
  {
    id: "bb-8", title: "Dadar West Junction Hoarding", size: "20x40", type: "Static",
    facing: "West", impressions: 55000, price: 950, image: IMG_B,
    available: "Available Tomorrow", lat: 19.0176, lng: 72.8429, availability: "upcoming",
    location: "Dadar West, Mumbai",
    vendor: { name: "OOH Prime Media", rating: 4.6, totalListings: 34, verified: true, since: "2019", responseTime: "< 2 hrs" },
    scores: { visibility: 79, readability: 75, dwellTime: 82, illumination: 65, angle: 77 },
    traffic: { hourly: makeHourly(8, 2200), weekdayAvg: 55000, weekendAvg: 48000, peakHour: "8 AM – 9 AM" },
    campaigns: { totalRuns: 62, avgDuration: 16, renewalRate: 65, topBrands: ["Pidilite","Asian Paints","Haldirams"], avgCTR: 1.1 },
    market: { rank: 6, totalInArea: 18, percentile: 67, priceVsAvg: -8 },
    demographics: { twoWheeler: 35, car: 38, bus: 20, pedestrian: 7, incomeZone: "Mid-High" },
    weatherScore: 68, proofImages: [IMG_B, IMG_A],
    bookedDates: ["2025-05-13","2025-05-14"],
  },
];

export function getBillboardById(id: string): Billboard | undefined {
  return BILLBOARDS.find(b => b.id === id);
}
