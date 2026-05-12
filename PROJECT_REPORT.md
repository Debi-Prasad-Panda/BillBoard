# AdSpace Project Report

## Overview

AdSpace is a premium Out-of-Home (OOH) billboard marketplace built with Next.js. The project delivers a discovery-first experience with map-based inventory, smart filtering, and rich billboard detail pages. It integrates real billboard locations and traffic estimation using OpenStreetMap-based APIs to generate live impressions and traffic scores.

## What Has Been Built So Far

- Marketplace discovery
  - Interactive map with custom price pins, hover effects, and popups
  - Listings with filters (size, type, facing, availability) and dual-range price slider
  - Real billboards from OSM merged with seeded inventory
- Data enrichment
  - Live traffic estimate API for impressions and traffic score
  - API data surfaced in listings and billboard detail pages
- Billboard detail experience
  - Hero media, key facts, pricing, and vendor profile
  - Traffic tab with API-driven impressions and traffic score
  - Campaign ROI calculator and market comparison
- General site structure
  - Advertisers, vendors, pricing, campaigns, analytics pages
  - Global layout, navigation, theming, and SEO scaffolding

## Tech Stack and Feature Mapping

- Next.js 16 (App Router, Turbopack)
  - Routing, server components, API routes, and SSR
- React 19 + TypeScript 5
  - Client interactivity and strict typing for billboard data
- Tailwind CSS 4 + custom CSS variables
  - Design system, glassmorphism, responsive layout
- Leaflet + react-leaflet
  - Map tiles, markers, popups, and map interactions
- Framer Motion
  - UI animations (dropdowns, list transitions)
- Lucide React
  - Iconography across UI
- Recharts
  - Analytics and traffic chart visualizations
- next-themes
  - Dark/light theme support

## Data Sources and APIs

- /api/real-billboards
  - Fetches real billboard locations from OpenStreetMap via Overpass
  - Enriches data with reverse geocoding (Nominatim)
- /api/traffic-estimate
  - Generates traffic estimates (impressions, traffic score, reach radius)
  - Uses Overpass for nearby road and POI density
- Local seed data
  - Starter inventory with pricing, vendor profiles, and campaign data

## Where API Data Is Used

- Marketplace listings
  - Estimated impressions, traffic score, and nearest road shown in cards
- Map popups
  - Live traffic score and reach radius displayed on map
- Billboard detail page
  - Key facts panel uses live impressions and traffic score
  - Traffic tab includes live estimates and KPI cards

## Current Status

- Core marketplace flow works end-to-end
- API data is integrated into discovery and detail views
- Layout and content are stable, with responsive behavior on mobile and desktop

## Known Limitations

- Analytics and campaigns pages are still using mock datasets
- No backend persistence (bookings and data are in-memory in MVP)
- Traffic estimation depends on public OSM services and rate limits

## Next Recommended Steps

1. Replace analytics and campaign charts with API-driven values
2. Add caching and backoff strategy for OSM traffic and reverse geocoding
3. Persist bookings and vendor inventory in a database
4. Add user authentication and role-based access
5. Add observability (API latency, errors, rate limits)

## Quick Start

1. npm install
2. npm run dev
3. Open http://localhost:3000

## Project Structure (Key Paths)

- src/app/marketplace
  - Marketplace listing, map, and detail pages
- src/app/api/real-billboards
  - OSM billboard fetcher endpoint
- src/app/api/traffic-estimate
  - Traffic estimate endpoint
- src/lib
  - OSM and traffic estimation utilities
- src/components
  - Layout, theme provider, and UI elements
