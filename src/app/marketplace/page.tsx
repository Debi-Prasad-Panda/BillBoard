import { Metadata } from "next";
import MarketplaceClient from "./MarketplaceClient";

// Export the type so the client can use it
export type Billboard = {
  id: string;
  title: string;
  size: string;
  type: string;
  facing: string;
  impressions: number;
  price: number;
  image: string;
  available: string;
  lat: number;
  lng: number;
};

// Mock data moved to server for SSR and SEO Schema Generation
export const BILLBOARDS: Billboard[] = [
  {
    id: "bb-1",
    title: "Khandagiri Main Road Hoarding",
    size: "20x40",
    type: "Static",
    facing: "South",
    impressions: 45000,
    price: 850,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuClrIlKUzUApEcejLdaZWiZdlTq8tJEcf-mzwJ1Exa6szUvbvAhQi-T3wBTxjomngmizDz5KuHqZFI0oEeCAw3JwWvTO99JFr_4Bq0WGeUKVq44h6GRs5WiTEJ5fzgFBDJJurCj1uwd-oWS4wvlNkZyetb6ch1Cjp_HmKcHilaKqetC_9JTr_K5zWafGafyFOThtCIzDHFcyI_q6Wcbu2Qlp-qzXLIwXooCuXnvBI8rY90W4s9okCgbnDInVYlWBcAlDOMjIBEz_g",
    available: "Available Now",
    lat: 19.0760, // Example: Mumbai coordinates
    lng: 72.8777
  },
  {
    id: "bb-2",
    title: "Downtown Digital Display",
    size: "10x20",
    type: "Digital",
    facing: "East",
    impressions: 80000,
    price: 1200,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBspRisLqJkR76Hpxuq-Cd0vDuwzwbT3qpvH8jtriRAxdDdhkYnZ68sKsHjG9yW1b_pHUI6aNbnLk6bE40xrEHTQXpG1jgwGrh43DFBcaBZCgZG3g7d4e7z7snoaQb963Ep4c_TnjLfVbVb_vtn6f4obGlUnSopwCcxEHFGLpuPhD2MgplnJMzkCAxO7rh5ltyW2akeS9VDEQZgDitQ-29GVTBbdPOyvLHODoAnecferNOKyCSnb8_Nz5YGbHIS9JmemnNnxsLX2g",
    available: "Available Tomorrow",
    lat: 19.0522, // Slightly offset in Mumbai
    lng: 72.8315
  }
];

export const metadata: Metadata = {
  title: "Browse Billboards | AdSpace Marketplace",
  description: "Explore premium OOH billboards across India. Filter by city, size, format, and estimated daily impressions to find the perfect location for your next campaign.",
  openGraph: {
    title: "Browse Premium Billboards on AdSpace",
    description: "Interactive map and listings for India's top OOH advertising inventory. Book instantly with GPS-verified proof of play.",
    url: "https://adspace.in/marketplace",
  },
  alternates: {
    canonical: "https://adspace.in/marketplace",
  }
};

export default function MarketplacePage() {
  // Dynamically generate JSON-LD based on Server data
  const marketplaceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Premium Billboard Inventory",
    "description": "List of available billboards for advertising across India.",
    "url": "https://adspace.in/marketplace",
    "itemListElement": BILLBOARDS.map((bb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": bb.title,
        "description": `${bb.size} ${bb.type} Billboard, ${bb.facing} Facing. ~${bb.impressions} daily impressions.`,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": bb.price.toString(),
          "availability": bb.available.includes("Now") ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
          "url": `https://adspace.in/marketplace/${bb.id}`
        }
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(marketplaceSchema) }}
      />
      <main className="w-full flex-1 flex flex-col" id="main-content">
        <MarketplaceClient initialBillboards={BILLBOARDS} />
      </main>
    </>
  );
}
