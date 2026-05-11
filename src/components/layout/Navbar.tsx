"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  MapPin,
  BarChart3,
  Sparkles,
  Bell,
  UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    label: "Marketplace",
    href: "/marketplace",
    icon: <MapPin className="w-4 h-4" />,
    submenu: [
      { label: "Browse Billboards", href: "/marketplace", desc: "Explore all available inventory" },
      { label: "Map Discovery", href: "/marketplace/map", desc: "Find billboards near you on the map" },
      { label: "Digital Screens", href: "/marketplace?type=digital", desc: "LED & digital billboard listings" },
      { label: "Transit Advertising", href: "/marketplace?type=transit", desc: "Bus shelters, metros & more" },
    ],
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: <BarChart3 className="w-4 h-4" />,
  },
  {
    label: "Solutions",
    href: "/solutions",
    icon: <Sparkles className="w-4 h-4" />,
    submenu: [
      { label: "For Advertisers", href: "/advertisers", desc: "Run powerful outdoor campaigns" },
      { label: "For Vendors", href: "/vendors", desc: "List and manage your inventory" },
      { label: "Pricing", href: "/pricing", desc: "Transparent, competitive rates" },
    ],
  },
  { label: "Campaigns", href: "/campaigns" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass-nav shadow-sm" : "bg-transparent"
      )}
      role="banner"
    >
      <nav
        className="max-w-[1440px] mx-auto px-6 lg:px-16 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group flex-shrink-0"
          aria-label="AdSpace — OOH Billboard Marketplace Home"
        >
          {/* Stitch-style "AS" monogram badge */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold font-heading transition-transform group-hover:scale-105"
            style={{ background: "linear-gradient(135deg, #004ac6 0%, #2563eb 100%)" }}
            aria-hidden="true"
          >
            AS
          </div>
          <span className="text-xl font-heading font-bold tracking-tight text-on-background">
            Ad<span className="text-primary">Space</span>
          </span>
        </Link>

        {/* Desktop Nav — center */}
        <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.submenu && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all duration-150"
              >
                {link.label}
                {link.submenu && (
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-150",
                      activeDropdown === link.label && "rotate-180"
                    )}
                  />
                )}
              </Link>

              {/* Glassmorphic Dropdown */}
              <AnimatePresence>
                {link.submenu && activeDropdown === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-72 rounded-2xl glass-panel ambient-shadow overflow-hidden"
                    role="menu"
                  >
                    {link.submenu.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        role="menuitem"
                        className="flex flex-col px-5 py-3.5 hover:bg-surface-container transition-colors border-b border-outline-variant/20 last:border-0"
                      >
                        <span className="text-sm font-semibold text-on-surface">{item.label}</span>
                        <span className="text-xs text-on-surface-variant mt-0.5">{item.desc}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Desktop CTA — right */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          {/* Notification Bell */}
          <button
            aria-label="Notifications"
            className="w-9 h-9 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <Bell className="w-5 h-5" />
          </button>

          {/* User Avatar */}
          <button
            aria-label="User account"
            className="w-9 h-9 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <UserCircle className="w-5 h-5" />
          </button>

          {/* Vendor Portal — Stitch outlined pill button */}
          <Link
            href="/vendors"
            id="vendor-portal-btn"
            className="px-5 py-2 rounded-full text-sm font-semibold text-primary border-2 border-primary hover:bg-primary hover:text-white transition-all duration-200 hover:shadow-md"
          >
            Vendor Portal
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-nav border-t border-outline-variant/30 overflow-hidden"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="max-w-[1440px] mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-3 rounded-full text-sm font-medium text-on-surface hover:bg-surface-container transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-outline-variant/30">
                <Link
                  href="/login"
                  className="px-4 py-3 text-sm text-center rounded-full border-2 border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/vendors"
                  className="px-4 py-3 text-sm text-center rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Vendor Portal
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
