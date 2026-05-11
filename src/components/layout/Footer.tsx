"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";

/* Inline social SVG icons (lucide-react removed brand icons) */
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const footerLinks = {
  Marketplace: [
    { label: "Browse Billboards", href: "/marketplace" },
    { label: "Map Discovery", href: "/marketplace/map" },
    { label: "Digital Screens", href: "/marketplace?type=digital" },
    { label: "Transit Advertising", href: "/marketplace?type=transit" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Press Kit", href: "/press" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact Us", href: "/contact" },
    { label: "Partner With Us", href: "/partner" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Refund Policy", href: "/refund" },
  ],
};

/* SEO city links — kept intentionally for city-level indexing */
const cities = [
  "Bhubaneswar", "Mumbai", "Delhi", "Bengaluru", "Chennai", "Hyderabad", "Pune",
  "Kolkata", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kochi",
];

export default function Footer() {
  const pathname = usePathname();
  
  // Hide footer on dashboard-like pages where we want a full screen layout
  if (pathname?.startsWith('/marketplace')) {
    return null;
  }

  return (
    <footer
      className="border-t border-outline-variant/40"
      style={{ background: "var(--surface-container-low)" }}
      role="contentinfo"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-16">

        {/* Top grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 pb-12 border-b border-outline-variant/40">

          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 mb-5 group" aria-label="AdSpace — OOH Billboard Marketplace Home">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold font-heading transition-transform group-hover:scale-105"
                style={{ background: "linear-gradient(135deg, #004ac6 0%, #2563eb 100%)" }}
                aria-hidden="true"
              >
                AS
              </div>
              <span className="text-xl font-heading font-bold tracking-tight text-on-surface">
                Ad<span className="text-primary">Space</span>
              </span>
            </Link>

            <p className="text-sm text-on-surface-variant leading-relaxed max-w-xs mb-6">
              India&apos;s #1 premium OOH billboard marketplace connecting advertisers
              with verified premium inventory and GPS-verified proof of installation.
            </p>

            {/* Contact info — schema-friendly */}
            <address className="not-italic flex flex-col gap-2 text-sm text-on-surface-variant">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" aria-hidden />
                Mumbai, Maharashtra, India
              </span>
              <a
                href="tel:+919000000000"
                className="flex items-center gap-2 hover:text-primary transition-colors"
                aria-label="Call AdSpace support at +91 90000 00000"
              >
                <Phone className="w-4 h-4 text-primary flex-shrink-0" aria-hidden />
                +91 90000 00000
              </a>
              <a
                href="mailto:hello@adspace.in"
                className="flex items-center gap-2 hover:text-primary transition-colors"
                aria-label="Email AdSpace at hello@adspace.in"
              >
                <Mail className="w-4 h-4 text-primary flex-shrink-0" aria-hidden />
                hello@adspace.in
              </a>
            </address>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: <TwitterIcon className="w-4 h-4" />, href: "https://twitter.com/adspace_in", label: "AdSpace on X (Twitter)" },
                { icon: <LinkedinIcon className="w-4 h-4" />, href: "https://linkedin.com/company/adspace-in", label: "AdSpace on LinkedIn" },
                { icon: <InstagramIcon className="w-4 h-4" />, href: "https://instagram.com/adspace.in", label: "AdSpace on Instagram" },
                { icon: <FacebookIcon className="w-4 h-4" />, href: "https://facebook.com/adspacein", label: "AdSpace on Facebook" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <nav key={category} aria-label={`${category} links`}>
              <h3 className="text-sm font-semibold text-on-surface mb-4">{category}</h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-on-surface-variant hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* SEO City Links — critical for local SEO ranking */}
        <div className="py-8 border-b border-outline-variant/40">
          <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-4">
            Billboard Advertising in Top Indian Cities
          </p>
          <nav aria-label="Billboard advertising by city">
            <ul className="flex flex-wrap gap-2" role="list">
              {cities.map((city) => (
                <li key={city}>
                  <Link
                    href={`/marketplace?city=${city.toLowerCase()}`}
                    className="text-xs px-3 py-1.5 rounded-full border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary/60 transition-colors"
                    title={`Outdoor billboard advertising in ${city}`}
                  >
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
          <p>© {new Date().getFullYear()} AdSpace Technologies Pvt. Ltd. All rights reserved.</p>
          <p>
            Built with ❤️ in India &nbsp;·&nbsp; CIN: U74900MH2024PTC123456
          </p>
        </div>
      </div>
    </footer>
  );
}
