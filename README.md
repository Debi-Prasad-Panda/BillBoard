# AdSpace — OOH Billboard Marketplace

AdSpace is a premium Out-of-Home (OOH) billboard advertising marketplace built with Next.js. It features an interactive map-based browsing experience, real-time filtering, and a glassmorphic design system with full dark mode support.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss)

---

## Features

- **Interactive Map** — Leaflet-powered map with color-coded billboard pins, animated hover effects, and impression reach radius visualization
- **Smart Filtering** — Filter by size, type, facing direction, availability, and price range with a dual-range slider
- **Dark Mode** — Full theme support with automatic map tile switching (Carto light/dark)
- **Glassmorphic UI** — Material Design 3 color tokens with frosted glass panels
- **SEO Optimized** — Server-side rendering, JSON-LD structured data, meta tags, sitemap, and robots.txt
- **Responsive** — Works on desktop and mobile with adaptive layouts

## Tech Stack

| Category       | Technology                              |
| -------------- | --------------------------------------- |
| Framework      | Next.js 16 (App Router, Turbopack)      |
| Language       | TypeScript 5                            |
| Styling        | Tailwind CSS 4, Custom CSS Variables    |
| Map            | Leaflet + Carto Basemaps                |
| Animations     | Framer Motion                           |
| Icons          | Lucide React                            |
| Charts         | Recharts                                |
| Theme          | next-themes                             |

---

## Prerequisites

- **Node.js** — v18.18 or later (built and tested on v24.13)
- **npm** — v9 or later (comes with Node.js)

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Billboard/Project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

The app will start at **[http://localhost:3000](http://localhost:3000)**.

### 4. Open in your browser

| Page            | URL                                     |
| --------------- | --------------------------------------- |
| Home (Landing)  | http://localhost:3000                    |
| Marketplace     | http://localhost:3000/marketplace        |
| Advertisers     | http://localhost:3000/advertisers        |
| Vendors         | http://localhost:3000/vendors            |
| Pricing         | http://localhost:3000/pricing            |
| Analytics       | http://localhost:3000/analytics          |
| Campaigns       | http://localhost:3000/campaigns          |
| Contact         | http://localhost:3000/contact            |

---

## Available Scripts

| Command          | Description                                      |
| ---------------- | ------------------------------------------------ |
| `npm run dev`    | Start development server with Turbopack (HMR)    |
| `npm run build`  | Create production build                          |
| `npm run start`  | Start production server (run `build` first)       |
| `npm run lint`   | Run ESLint                                       |

### Production Build

```bash
npm run build
npm run start
```

This builds the app to `.next/` and starts a production server at http://localhost:3000.

---

## Project Structure

```
Project/
├── public/                  # Static assets (images, fonts)
├── src/
│   ├── app/
│   │   ├── (home)/          # Home route group
│   │   ├── marketplace/     # Billboard marketplace (map + listings)
│   │   │   ├── page.tsx           # Server component — data + SEO schema
│   │   │   ├── MarketplaceClient.tsx  # Client component — filters + listings
│   │   │   └── MapComponent.tsx       # Leaflet map with creative overlays
│   │   ├── advertisers/     # Advertisers landing page
│   │   ├── vendors/         # Vendors landing page
│   │   ├── pricing/         # Pricing page
│   │   ├── analytics/       # Analytics dashboard
│   │   ├── campaigns/       # Campaigns page
│   │   ├── contact/         # Contact page
│   │   ├── layout.tsx       # Root layout (fonts, theme, nav)
│   │   ├── page.tsx         # Landing page
│   │   ├── globals.css      # Design system (MD3 tokens, glass utils)
│   │   ├── robots.ts        # SEO robots.txt
│   │   └── sitemap.ts       # SEO sitemap
│   ├── components/
│   │   ├── layout/          # Layout components (header, footer)
│   │   ├── ui/              # Reusable UI components
│   │   ├── ThemeProvider.tsx # Dark/light theme provider
│   │   └── ThemeToggle.tsx   # Theme switch button
│   ├── lib/                 # Utilities and helpers
│   └── types/               # TypeScript type definitions
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── postcss.config.mjs       # PostCSS (Tailwind CSS plugin)
├── eslint.config.mjs        # ESLint configuration
└── package.json             # Dependencies and scripts
```

---

## Environment Variables

No environment variables are required to run the project locally. The app uses mock billboard data and free Carto basemap tiles.

If deploying to production with a real backend, you would add a `.env.local` file:

```env
# Example (not required for local dev)
NEXT_PUBLIC_API_URL=https://api.adspace.in
NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here
```

---

## Troubleshooting

| Issue                          | Solution                                              |
| ------------------------------ | ----------------------------------------------------- |
| `npm install` fails            | Delete `node_modules` and `package-lock.json`, re-run |
| Port 3000 already in use       | Run `npm run dev -- -p 3001` to use a different port  |
| Map tiles not loading          | Check internet connection — tiles load from CDN       |
| Dark mode not working          | Clear browser localStorage and refresh                |
| Build type errors              | Run `npm run lint` to see issues, then fix             |

---

## License

This project is private and proprietary.
