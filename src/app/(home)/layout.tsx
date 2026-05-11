import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AdSpace | #1 Premium OOH Billboard Advertising Marketplace in India",
  description:
    "Book premium out-of-home billboard advertising across India. Discover thousands of verified billboards, get real-time analytics, GPS-verified installations, and transparent pricing. Dominate your market with AdSpace.",
  keywords:
    "billboard advertising, OOH advertising, outdoor advertising, billboard rental India, hoarding booking, digital billboard, transit advertising, AdSpace marketplace",
  authors: [{ name: "AdSpace" }],
  creator: "AdSpace",
  publisher: "AdSpace",
  metadataBase: new URL("https://adspace.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AdSpace | Premium OOH Billboard Marketplace",
    description:
      "Book premium billboards across India. Verified vendors, GPS-proof of installation, and real-time campaign analytics — all in one platform.",
    url: "https://adspace.in",
    siteName: "AdSpace",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AdSpace - Premium OOH Billboard Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AdSpace | Premium OOH Billboard Marketplace",
    description:
      "Book premium billboards across India with verified vendors, GPS proof, and real-time analytics.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
