import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AdSpace | Premium OOH Billboard Marketplace in India",
    template: "%s | AdSpace",
  },
  description:
    "India's #1 premium OOH billboard advertising marketplace. Book verified billboards with GPS proof of installation, real-time analytics, and transparent pricing across 120+ cities.",
  metadataBase: new URL("https://adspace.in"),
  keywords:
    "billboard advertising, OOH advertising, outdoor advertising, billboard rental India, hoarding booking, digital billboard, transit advertising, AdSpace marketplace, billboard Mumbai, billboard Delhi, billboard Bengaluru",
  authors: [{ name: "AdSpace Technologies" }],
  creator: "AdSpace Technologies",
  publisher: "AdSpace Technologies",
  alternates: {
    canonical: "https://adspace.in",
  },
  openGraph: {
    title: "AdSpace | Premium OOH Billboard Marketplace",
    description:
      "Book premium billboards across India. Verified vendors, GPS proof of installation, and real-time campaign analytics — all in one platform.",
    url: "https://adspace.in",
    siteName: "AdSpace",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AdSpace — Premium OOH Billboard Marketplace in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AdSpace | Premium OOH Billboard Marketplace",
    description:
      "Book premium billboards across India with verified vendors, GPS proof, and real-time analytics.",
    images: ["/og-image.png"],
    site: "@adspace_in",
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
};

/* ── JSON-LD Structured Data ──────────────────────────── */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://adspace.in/#organization",
  name: "AdSpace",
  url: "https://adspace.in",
  logo: {
    "@type": "ImageObject",
    url: "https://adspace.in/logo.png",
    width: 300,
    height: 300,
  },
  description:
    "India's #1 premium OOH billboard advertising marketplace connecting advertisers with verified inventory across 120+ cities.",
  foundingDate: "2024",
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-90000-00000",
    email: "hello@adspace.in",
    contactType: "Customer Service",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://twitter.com/adspace_in",
    "https://linkedin.com/company/adspace-in",
    "https://instagram.com/adspace.in",
    "https://facebook.com/adspacein",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://adspace.in/#website",
  url: "https://adspace.in",
  name: "AdSpace — OOH Billboard Marketplace",
  description: "India's premium outdoor billboard advertising marketplace",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://adspace.in/marketplace?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AdSpace",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    description: "Free to browse and book billboard advertising",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "4800",
    bestRating: "5",
    worstRating: "1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Canonical hreflang for India */}
        <link rel="alternate" hrefLang="en-IN" href="https://adspace.in" />
        <link rel="alternate" hrefLang="x-default" href="https://adspace.in" />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* WebSite Schema with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* SoftwareApplication Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[9999] px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium"
          >
            Skip to main content
          </a>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
