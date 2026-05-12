import { Metadata } from "next";
import MarketplaceClient from "./MarketplaceClient";
import { BILLBOARDS } from "./data";

// Re-export type for client components
export type { Billboard } from "./data";

export const metadata: Metadata = {
  title: "Browse Billboards | AdSpace Marketplace",
  description: "Explore premium OOH billboards across India. Filter by city, size, format, and estimated daily impressions to find the perfect location for your next campaign.",
  openGraph: {
    title: "Browse Premium Billboards on AdSpace",
    description: "Interactive map and listings for India's top OOH advertising inventory. Book instantly with GPS-verified proof of play.",
    url: "https://adspace.in/marketplace",
  },
  alternates: { canonical: "https://adspace.in/marketplace" },
};

export default function MarketplacePage() {
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
        "description": `${bb.size} ${bb.type} Billboard, ${bb.facing} Facing. ~${bb.impressions.toLocaleString()} daily impressions.`,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": bb.price.toString(),
          "availability": bb.available.includes("Now") ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
          "url": `https://adspace.in/marketplace/${bb.id}`,
        },
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(marketplaceSchema) }} />
      <main className="w-full flex-1 flex flex-col" id="main-content">
        <MarketplaceClient initialBillboards={BILLBOARDS} />
      </main>
    </>
  );
}
