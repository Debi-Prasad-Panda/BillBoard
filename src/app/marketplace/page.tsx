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
    lat: 19.0760,
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
    lat: 19.0522,
    lng: 72.8315
  },
  {
    id: "bb-3",
    title: "Bandra Flyover Premium LED",
    size: "30x60",
    type: "LED",
    facing: "North",
    impressions: 120000,
    price: 3500,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuClrIlKUzUApEcejLdaZWiZdlTq8tJEcf-mzwJ1Exa6szUvbvAhQi-T3wBTxjomngmizDz5KuHqZFI0oEeCAw3JwWvTO99JFr_4Bq0WGeUKVq44h6GRs5WiTEJ5fzgFBDJJurCj1uwd-oWS4wvlNkZyetb6ch1Cjp_HmKcHilaKqetC_9JTr_K5zWafGafyFOThtCIzDHFcyI_q6Wcbu2Qlp-qzXLIwXooCuXnvBI8rY90W4s9okCgbnDInVYlWBcAlDOMjIBEz_g",
    available: "Available Now",
    lat: 19.0596,
    lng: 72.8295
  },
  {
    id: "bb-4",
    title: "Andheri Station Bus Shelter",
    size: "6x4",
    type: "Static",
    facing: "West",
    impressions: 25000,
    price: 350,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBspRisLqJkR76Hpxuq-Cd0vDuwzwbT3qpvH8jtriRAxdDdhkYnZ68sKsHjG9yW1b_pHUI6aNbnLk6bE40xrEHTQXpG1jgwGrh43DFBcaBZCgZG3g7d4e7z7snoaQb963Ep4c_TnjLfVbVb_vtn6f4obGlUnSopwCcxEHFGLpuPhD2MgplnJMzkCAxO7rh5ltyW2akeS9VDEQZgDitQ-29GVTBbdPOyvLHODoAnecferNOKyCSnb8_Nz5YGbHIS9JmemnNnxsLX2g",
    available: "Available Now",
    lat: 19.1197,
    lng: 72.8468
  },
  {
    id: "bb-5",
    title: "Juhu Beach Road Unipole",
    size: "20x30",
    type: "Unipole",
    facing: "South",
    impressions: 60000,
    price: 1800,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuClrIlKUzUApEcejLdaZWiZdlTq8tJEcf-mzwJ1Exa6szUvbvAhQi-T3wBTxjomngmizDz5KuHqZFI0oEeCAw3JwWvTO99JFr_4Bq0WGeUKVq44h6GRs5WiTEJ5fzgFBDJJurCj1uwd-oWS4wvlNkZyetb6ch1Cjp_HmKcHilaKqetC_9JTr_K5zWafGafyFOThtCIzDHFcyI_q6Wcbu2Qlp-qzXLIwXooCuXnvBI8rY90W4s9okCgbnDInVYlWBcAlDOMjIBEz_g",
    available: "Available Next Week",
    lat: 19.1021,
    lng: 72.8270
  },
  {
    id: "bb-6",
    title: "Powai IT Park Digital Screen",
    size: "15x25",
    type: "Digital",
    facing: "East",
    impressions: 95000,
    price: 2200,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBspRisLqJkR76Hpxuq-Cd0vDuwzwbT3qpvH8jtriRAxdDdhkYnZ68sKsHjG9yW1b_pHUI6aNbnLk6bE40xrEHTQXpG1jgwGrh43DFBcaBZCgZG3g7d4e7z7snoaQb963Ep4c_TnjLfVbVb_vtn6f4obGlUnSopwCcxEHFGLpuPhD2MgplnJMzkCAxO7rh5ltyW2akeS9VDEQZgDitQ-29GVTBbdPOyvLHODoAnecferNOKyCSnb8_Nz5YGbHIS9JmemnNnxsLX2g",
    available: "Available Now",
    lat: 19.1176,
    lng: 72.9060
  },
  {
    id: "bb-7",
    title: "Nariman Point Skyline LED",
    size: "40x80",
    type: "LED",
    facing: "North",
    impressions: 200000,
    price: 7500,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuClrIlKUzUApEcejLdaZWiZdlTq8tJEcf-mzwJ1Exa6szUvbvAhQi-T3wBTxjomngmizDz5KuHqZFI0oEeCAw3JwWvTO99JFr_4Bq0WGeUKVq44h6GRs5WiTEJ5fzgFBDJJurCj1uwd-oWS4wvlNkZyetb6ch1Cjp_HmKcHilaKqetC_9JTr_K5zWafGafyFOThtCIzDHFcyI_q6Wcbu2Qlp-qzXLIwXooCuXnvBI8rY90W4s9okCgbnDInVYlWBcAlDOMjIBEz_g",
    available: "Available Now",
    lat: 18.9270,
    lng: 72.8233
  },
  {
    id: "bb-8",
    title: "Dadar West Junction Hoarding",
    size: "20x40",
    type: "Static",
    facing: "West",
    impressions: 55000,
    price: 950,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBspRisLqJkR76Hpxuq-Cd0vDuwzwbT3qpvH8jtriRAxdDdhkYnZ68sKsHjG9yW1b_pHUI6aNbnLk6bE40xrEHTQXpG1jgwGrh43DFBcaBZCgZG3g7d4e7z7snoaQb963Ep4c_TnjLfVbVb_vtn6f4obGlUnSopwCcxEHFGLpuPhD2MgplnJMzkCAxO7rh5ltyW2akeS9VDEQZgDitQ-29GVTBbdPOyvLHODoAnecferNOKyCSnb8_Nz5YGbHIS9JmemnNnxsLX2g",
    available: "Available Tomorrow",
    lat: 19.0176,
    lng: 72.8429
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
