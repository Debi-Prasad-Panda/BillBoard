import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Media Owners & Vendors | Monetize Your OOH Inventory | AdSpace",
  description: "List your empty billboards, digital screens, and transit media on India's #1 OOH platform. Get guaranteed payouts, zero listing fees, and secure milestone escrow.",
  alternates: {
    canonical: "https://www.adspace.com/vendors",
  },
  openGraph: {
    title: "AdSpace for Media Owners | Maximize Billboard Revenue",
    description: "Join hundreds of media owners increasing their occupancy rates. Guaranteed 7-day payouts, zero bad debts, and access to 4,800+ national brands.",
    url: "https://www.adspace.com/vendors",
    siteName: "AdSpace",
    type: "website",
    images: [
      {
        url: "https://www.adspace.com/og-vendors.jpg",
        width: 1200,
        height: 630,
        alt: "AdSpace Vendor Portal - Dashboard preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "List Your Billboards on AdSpace",
    description: "Zero listing fees and automated escrow payouts for media owners.",
    images: ["https://www.adspace.com/twitter-vendors.jpg"],
  },
};

export default function VendorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is there a fee to join?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, listing your inventory is completely free. We only charge a small platform commission when a successful booking is made."
        }
      },
      {
        "@type": "Question",
        name: "How do I receive payments?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Payments are processed via NEFT/RTGS directly to your registered bank account. Escrow funds are released immediately upon GPS verification of the installation."
        }
      },
      {
        "@type": "Question",
        name: "Who provides the flex printing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Brands typically provide the design. Depending on your preference, you can offer a bundled print+mount service or require the brand to ship the printed flex to your warehouse."
        }
      },
      {
        "@type": "Question",
        name: "What if an agency cancels last minute?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our smart contract system protects vendors. Cancellations within 14 days of the campaign start date result in a 50% payout to you."
        }
      }
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "For Media Owners & Vendors | AdSpace",
    description: "The premier platform for OOH media owners to list and monetize their billboard inventory.",
    url: "https://www.adspace.com/vendors",
    publisher: {
      "@type": "Organization",
      name: "AdSpace",
      logo: {
        "@type": "ImageObject",
        url: "https://www.adspace.com/logo.png"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      {children}
    </>
  );
}
