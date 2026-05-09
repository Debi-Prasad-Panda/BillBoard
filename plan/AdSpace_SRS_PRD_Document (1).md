# SOFTWARE REQUIREMENTS SPECIFICATION (SRS) & PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Out-of-Home (OOH) Billboard Advertising Platform
## "AdSpace" - Democratizing Billboard Advertising

---

# DOCUMENT CONTROL

| Attribute | Value |
|-----------|-------|
| Document Version | 1.0 |
| Date | May 9, 2026 |
| Author | Product & Engineering Team |
| Status | Draft for Review |
| Confidentiality | Internal |

---

# TABLE OF CONTENTS

1. Executive Summary
2. Product Vision & Objectives
3. User Personas & Stakeholders
4. Functional Requirements
5. Non-Functional Requirements
6. System Architecture & Tech Stack (100% Free/Open Source)
7. Database Schema Design
8. API Specifications
9. User Interface Requirements
10. Security Requirements
11. Compliance & Legal Requirements
12. Phase-wise Development Roadmap
13. Risk Analysis & Mitigation
14. Appendices

---

# 1. EXECUTIVE SUMMARY

## 1.1 Problem Statement

Out-of-Home (OOH) advertising remains one of the most fragmented industries globally. In India specifically:
- Booking a billboard requires 4-6 weeks of negotiation via brokers
- Pricing is completely opaque (same board quoted at 2-3x different rates)
- No standardized artwork validation exists
- Physical fulfillment (printing + installation) is handled entirely offline via WhatsApp
- No escrow or trust mechanism protects advertisers
- Small businesses (SMEs) are completely excluded due to high minimums and complexity

## 1.2 Solution Overview

AdSpace is an end-to-end marketplace platform that democratizes billboard advertising by enabling:
- **Discovery**: Interactive map-based browsing with real availability and transparent pricing
- **Booking**: Self-serve checkout with milestone-based escrow payments
- **Fulfillment**: Automated routing of artwork to local printers and installers
- **Verification**: Geo-tagged photo proof triggering payment release
- **Analytics**: AI-powered design validation and impression estimation

## 1.3 Key Differentiators

| Feature | Competitors | AdSpace |
|---------|------------|---------|
| End-to-end static billboard logistics | None in India | Core feature |
| Escrow tied to geo-verified proof | None | Core feature |
| AI design validation (legibility, contrast) | Premium tools only | Free for all users |
| Dynamic last-minute pricing | None for static | Automated |
| Municipal permit verification | None | Mandatory for listing |
| Hybrid static + DOOH booking | Separate platforms | Unified cart |

---

# 2. PRODUCT VISION & OBJECTIVES

## 2.1 Vision Statement

"To become India's most trusted and comprehensive OOH advertising platform, making billboard advertising as easy as booking a hotel room."

## 2.2 Product Objectives

### Primary Objectives (Year 1)
1. Launch in Bhubaneswar with 50+ verified billboard inventory
2. Process 100+ campaigns with 95% on-time installation rate
3. Achieve 4.5+ star vendor rating average
4. Reduce billboard booking time from 4 weeks to 48 hours

### Secondary Objectives (Year 2)
1. Expand to 5 Tier-2 cities (Indore, Kochi, Chandigarh, Jaipur, Lucknow)
2. Onboard 500+ verified vendors
3. Launch DOOH programmatic integration
4. Achieve break-even on operational costs

## 2.3 Success Metrics (KPIs)

| Metric | Target (M3) | Target (M6) | Target (M12) |
|--------|-------------|-------------|--------------|
| Total Listings | 50 | 150 | 500 |
| Campaigns Completed | 10 | 75 | 300 |
| Average Booking Time | 72 hours | 48 hours | 24 hours |
| On-time Installation Rate | 90% | 93% | 95% |
| Advertiser NPS | 40 | 50 | 60 |
| Vendor NPS | 40 | 50 | 60 |
| Platform Commission Rate | 15% | 15% | 12% |
| Artwork Rejection Rate | 25% | 15% | 8% |

---

# 3. USER PERSONAS & STAKEHOLDERS

## 3.1 Primary Personas

### Persona 1: SME Advertiser ("Rahul")
- **Role**: Marketing manager at a local hospital/real estate developer
- **Age**: 28-40
- **Tech Savviness**: Medium (uses Facebook Ads, not a designer)
- **Pain Points**: 
  - Doesn't know which billboard to choose
  - No time to negotiate with 10 different vendors
  - Previous campaign had artwork rejected after printing (Rs.15,000 loss)
  - Can't measure if billboard actually worked
- **Goals**: Book a campaign in 30 minutes, know exactly what it costs, see proof it's live
- **Frequency**: 2-4 campaigns per year

### Persona 2: Billboard Vendor ("Suresh")
- **Role**: Owner of 5-20 billboards in Bhubaneswar
- **Age**: 35-55
- **Tech Savviness**: Low-Medium (uses WhatsApp, basic smartphone)
- **Pain Points**:
  - 40% of inventory sits unsold every month
  - Chasing payments from advertisers takes 60+ days
  - Artwork quality is terrible, but he doesn't know until print day
  - No-shows for installation waste his installer's time
- **Goals**: Fill inventory, get paid faster, reduce artwork back-and-forth
- **Frequency**: Manages listings daily, approves artwork 3-5x per week

### Persona 3: Print Partner ("Prakash")
- **Role**: Owner of a flex/vinyl printing shop
- **Age**: 30-50
- **Tech Savviness**: Low (uses WhatsApp for orders)
- **Pain Points**:
  - Irregular order flow
  - Clients change artwork last minute
  - Delivery coordination is chaotic
- **Goals**: Steady order flow, clear artwork specs, on-time delivery
- **Frequency**: Receives 5-15 print jobs per week

### Persona 4: Installation Partner ("Ramesh")
- **Role**: Billboard installer with 3-person crew
- **Age**: 25-45
- **Tech Savviness**: Low (basic smartphone user)
- **Pain Points**:
  - Doesn't know exact install location until he arrives
  - No proof that work was completed
  - Payment delays from vendors
- **Goals**: Clear job details, photo proof system, faster payment
- **Frequency**: 2-4 installations per day

### Persona 5: Platform Admin ("AdSpace Team")
- **Role**: Operations and support team
- **Pain Points**:
  - Manual dispute resolution
  - Fake listings
  - Payment reconciliation
- **Goals**: Automated operations, minimal manual intervention

## 3.2 Stakeholder Matrix

| Stakeholder | Interest | Influence | Engagement Strategy |
|-------------|----------|-----------|---------------------|
| SME Advertisers | High | High | Self-serve UX, transparent pricing, support chat |
| Billboard Vendors | High | High | Mobile-first vendor app, fast payouts |
| Print Partners | Medium | Medium | Simple job dashboard, clear specs |
| Install Partners | Medium | Medium | Mobile PWA, GPS verification |
| Municipal Corporations | Low | High | Compliance reporting, permit verification |
| Investors (Future) | Medium | High | Metrics dashboard, growth data |

---

# 4. FUNCTIONAL REQUIREMENTS

## 4.1 Module: User Management & Authentication

### FR-UM-001: Multi-Role Registration
- System shall support registration for Advertiser, Vendor, Print Partner, and Installer roles
- Each role shall have a tailored onboarding flow
- Email verification required before account activation
- GSTIN/PAN verification for Indian business accounts (optional for individuals)

### FR-UM-002: Role-Based Access Control (RBAC)
- System shall implement granular permissions per role
- Admin can create custom roles with specific permission sets
- JWT-based session management with 24-hour expiry
- Refresh token mechanism for extended sessions

### FR-UM-003: Profile Management
- Users can update profile information, business details, and notification preferences
- Vendors can add multiple team members with sub-roles (Owner, Manager, Viewer)
- Profile completion percentage shown with required fields highlighted

### FR-UM-004: KYC & Verification
- Vendors must upload: Municipal permit, land lease, structural certificate, site photo with GPS
- Print Partners must upload: Business registration, sample print quality photo
- Installers must upload: ID proof, previous work photos
- Admin reviews and approves within 24 hours

## 4.2 Module: Discovery & Search

### FR-DS-001: Interactive Map Interface
- Map-based browsing using OpenStreetMap (free alternative to Google Maps)
- Cluster view for dense billboard areas
- Click on pin shows: photo, size, type, price, availability, traffic data
- Filter by: city, area, size (10x20, 20x40, etc.), type (static/digital), price range, availability dates
- "Street View" integration using Mapillary or vendor-uploaded 360 photos

### FR-DS-002: Campaign Planner Wizard
- Step 1: Budget input (slider from Rs.5,000 to Rs.5,00,000)
- Step 2: Goal selection (Brand Awareness / Foot Traffic / Product Launch / Event Promotion)
- Step 3: Target audience (age, income, locality preference)
- Step 4: Duration (1 week to 6 months)
- Step 5: System recommends 2-5 optimal billboard combinations with estimated reach

### FR-DS-003: Billboard Detail Page
- High-resolution photos (minimum 5: front, side, night, close-up, context)
- 360 panoramic view if available
- Pricing: Daily rate, weekly rate, monthly rate with breakdown
- Availability calendar (green = available, red = booked, yellow = pending)
- Traffic & demographic data panel
- Vendor rating and review summary
- "Similar Billboards" recommendation
- "Save to Shortlist" functionality

### FR-DS-004: Traffic & Demographic Data
- Estimated daily impressions (vehicle + foot traffic)
- Peak hour traffic breakdown
- Demographic overlay: age, income, education level
- Data sources: OpenStreetMap traffic data, census data, mobile location aggregates (future)
- Clearly labeled as "Estimated" with confidence intervals

## 4.3 Module: Booking & Checkout

### FR-BC-001: Date Selection & Pricing
- Interactive calendar showing real-time availability
- Date range picker with minimum 7-day advance booking
- Dynamic pricing: base rate + seasonal multiplier + last-minute discount
- Price breakdown: rental + printing + installation + platform fee + GST
- "Hold for 24 hours" option (no payment, blocks dates)

### FR-BC-002: Cart & Checkout
- Multi-billboard cart (book multiple locations in single transaction)
- Promo code / referral code support
- Payment options: UPI, Credit/Debit Card, Net Banking (via Razorpay test mode initially, then live)
- Invoice generation with HSN codes
- Booking confirmation email + SMS

### FR-BC-003: Milestone-Based Escrow
- Payment flow:
  - 100% advertiser payment held in escrow on booking
  - 40% released to vendor on "Artwork Approved & Sent to Print"
  - 30% released to vendor on "Printed & Ready for Install"
  - 30% released to vendor on "Live Proof Uploaded & Verified"
- Auto-release after 48 hours if no dispute raised
- Dispute resolution workflow with admin arbitration

### FR-BC-004: Booking Management
- Advertiser dashboard: Upcoming, Active, Completed, Cancelled campaigns
- Vendor dashboard: Pending approvals, Confirmed bookings, Installation queue
- Cancellation policy: Full refund if cancelled >14 days, 50% if 7-14 days, 0% if <7 days
- Rescheduling: Advertiser can request date change, vendor approves

## 4.4 Module: Artwork Management

### FR-AM-001: Artwork Upload Portal
- Supported formats: PDF, AI, EPS, TIFF, PNG, JPG
- Auto-validation checks:
  - Dimensions match billboard size (+/-2% tolerance)
  - Resolution: minimum 150 DPI at actual size
  - Color mode: CMYK (warn if RGB)
  - File size: maximum 500MB
  - Bleed area: minimum 2 inches on all sides
- Upload progress indicator with estimated time
- Cloud storage with version history (keep last 5 versions)

### FR-AM-002: AI Design Validation
- **Contrast Check**: WCAG 2.1 AA compliance for text vs background
- **Text Size Validation**: Minimum text height based on viewing distance (e.g., headline must be readable from 50m)
- **Legibility Simulation**: 
  - Simulate at 40 km/h (urban) and 80 km/h (highway)
  - Apply motion blur based on speed
  - Score: "Readable / Borderline / Not Readable"
- **Color Blindness Check**: Simulate protanopia, deuteranopia, tritanopia
- **Night Mode Simulation**: Simulate under sodium vapor and LED lighting
- **Safety Check**: Flag if text is too close to edges (potential trimming issue)
- Generate PDF report with scores and specific recommendations

### FR-AM-003: Template Marketplace
- 50+ free billboard templates categorized by industry
- Drag-and-drop editor (using Fabric.js or similar open-source library)
- Template customization: text, colors, images, logo upload
- Auto-resize to selected billboard dimensions
- Export to print-ready PDF with bleed marks

### FR-AM-004: Approval Workflow
- Vendor receives notification when artwork is submitted
- One-click approve/reject with reason selection:
  - "Approved"
  - "Rejected: Content violates local guidelines"
  - "Rejected: Poor resolution"
  - "Rejected: Text too small"
  - "Rejected: Other (custom comment)"
- Auto-approval if vendor doesn't respond within 48 hours
- Revision loop: Advertiser uploads new version, vendor re-reviews
- Maximum 3 revision cycles before admin intervention

## 4.5 Module: Vendor Management

### FR-VM-001: Inventory Management
- Add new billboard: Location (map pin), Size, Type, Facing direction, Photos
- Pricing configuration: Daily/Weekly/Monthly rates, seasonal multipliers
- Availability calendar: Block dates, mark sold offline
- Inventory analytics: Fill rate, revenue per board, average booking lead time
- Bulk upload via CSV for vendors with 10+ boards

### FR-VM-002: Municipal Permit Management
- Upload permit documents with expiry dates
- Auto-reminder 30 days before expiry
- Board automatically delisted if permit expires
- Permit verification status badge on listing

### FR-VM-003: Team Management
- Add team members: Owner, Manager, Viewer roles
- Permission matrix:
  - Owner: Full access
  - Manager: Can approve artwork, manage pricing, view analytics
  - Viewer: Read-only access to bookings and analytics

## 4.6 Module: Fulfillment & Logistics

### FR-FL-001: Print Partner Network
- Print partner registration and verification
- Service area definition (pincode-based)
- Capacity management: Max jobs per day, current queue
- Rating system: Quality, turnaround time, communication

### FR-FL-002: Automated Print Routing
- On artwork approval, system auto-assigns nearest verified print partner
- Assignment criteria: Proximity, capacity, rating, price
- Print job notification to partner with:
  - Artwork file (watermarked until payment release)
  - Billboard specifications
  - Delivery deadline
  - Delivery location (vendor address or direct to site)
- Print partner confirms acceptance or declines with reason

### FR-FL-003: Installation Management
- Installer assignment: Vendor assigns or system suggests based on availability
- Job card generation with:
  - Billboard location (GPS coordinates + address)
  - Installation date and time window
  - Artwork reference number
  - Previous installation photos for reference
  - Emergency contact numbers

### FR-FL-004: Mobile Proofing (Installer App via Expo)
- Native Mobile App built with Expo (React Native)
- Login with OTP
- Today's jobs list with GPS navigation
- Pre-installation checklist:
  - Site condition photo (before)
  - **Weather Delay**: Button to flag "Cannot install due to heavy rain/cyclone" (pauses SLA timer and auto-notifies advertiser to prevent disputes)
  - Safety equipment confirmation
- Geo-fenced photo capture:
  - Must be within 50 meters of billboard GPS coordinates
  - Timestamp + GPS metadata auto-embedded
  - Minimum 3 photos: wide shot, close-up, angle shot
  - **Illumination Proof**: If the board is priced for being "Front-lit" or "Back-lit," require one photo taken after sunset to prove lights are functional.
- Post-installation checklist:
  - Clean-up confirmation
  - Damage check
  - Signature capture (if vendor representative present)
- Offline mode: Save photos locally, sync when network available

### FR-FL-005: Quality Assurance
- Admin reviews 10% of installation proofs randomly
- Advertiser can request re-install if quality issues (wrinkles, misalignment)
- Re-installation cost borne by vendor if fault confirmed

## 4.7 Module: Payments & Financials

### FR-PF-001: Escrow Management
- Integration with payment gateway (Razorpay for India)
- Escrow wallet per transaction
- Milestone release triggers:
  - Artwork approved -> 40% release
  - Print confirmed -> 30% release
  - Live proof verified -> 30% release
- Failed payment handling: 3 retry attempts, then booking auto-cancelled

### FR-PF-002: Payout Management
- Vendor payout schedule: Weekly (every Monday)
- Minimum payout threshold: Rs.1,000
- Payout methods: Bank transfer (NEFT/IMPS), UPI
- Payout statement with transaction breakdown
- TDS deduction (10% if PAN provided, 20% if not)

### FR-PF-003: Invoicing
- Auto-generated GST-compliant invoices
- HSN code: 998361 (Advertising services)
- Invoice includes: Platform fee, GST breakdown, vendor details
- Download as PDF, email copy to advertiser

### FR-PF-004: Dynamic Pricing Engine
- Base price set by vendor
- Auto-adjustments:
  - Seasonal multiplier (Diwali +30%, Monsoon -15%)
  - Last-minute discount: 7 days out = -10%, 3 days out = -20%
  - Demand multiplier: If 3+ bookings in same area within 7 days, +10%
- Vendor can opt-in/opt-out of dynamic pricing per board

## 4.8 Module: Analytics & Reporting

### FR-AR-001: Advertiser Analytics Dashboard
- Campaign performance summary:
  - Impressions delivered (estimated)
  - Cost per thousand impressions (CPM)
  - Campaign status timeline
  - Live proof photos with date stamp
- Historical campaign comparison
- Export to PDF/Excel

### FR-AR-002: Vendor Analytics Dashboard
- Revenue analytics: Monthly, quarterly, yearly
- Fill rate by board
- Average booking lead time
- Customer satisfaction score
- Top performing boards
- Revenue forecasting based on current bookings

### FR-AR-003: Platform Analytics
- Total GMV (Gross Merchandise Value)
- Commission revenue
- Active campaigns
- Vendor retention rate
- Advertiser repeat rate
- Geographic heat map of bookings

## 4.9 Module: Communication & Notifications

### FR-CN-001: Multi-Channel Notifications
- Email notifications (SendGrid free tier / AWS SES free tier)
- SMS notifications (Twilio free trial / Exotel / MSG91)
- In-app notification center
- WhatsApp Business API for critical updates (future)

### FR-CN-002: Notification Triggers
| Event | Recipients | Channels |
|-------|-----------|----------|
| Booking confirmed | Advertiser, Vendor | Email, SMS, In-app |
| Artwork submitted | Vendor | Email, In-app |
| Artwork approved/rejected | Advertiser | Email, SMS, In-app |
| Print job assigned | Print Partner | Email, SMS |
| Installation scheduled | Installer, Vendor | SMS |
| Live proof uploaded | Advertiser, Vendor | Email, In-app |
| Payment released | Vendor | Email, SMS |
| Dispute raised | Admin, Both parties | Email, SMS |

### FR-CN-003: In-App Messaging
- Chat between advertiser and vendor (post-booking)
- File sharing (artwork, documents)
- Message history retained for 1 year
- Admin can monitor all conversations for dispute resolution

### FR-CN-004: AI Chatbot Assistant (Next.js API Routes)
- Automated AI assistant (via OpenAI/Gemini API) embedded in the Next.js app to help advertisers.
- Can answer FAQs, guide advertisers through the booking process, and explain AI validation failures.
- Easy API integration directly through Next.js serverless functions.
- Handoff to human support agent when requested.

## 4.10 Module: Dispute Resolution

### FR-DR-001: Dispute Types
- Artwork rejection dispute
- Installation quality dispute
- Late installation dispute
- Billboard condition dispute
- Payment dispute

### FR-DR-002: Resolution Workflow
1. Party A raises dispute with evidence (photos, messages)
2. Party B notified, has 48 hours to respond
3. If resolved mutually, both confirm, case closed
4. If unresolved, escalated to admin within 72 hours
5. Admin reviews evidence, makes binding decision
6. Decision executed automatically (refund, re-install, penalty)

## 4.11 Module: DOOH Integration (Phase 2)

### FR-DO-001: Digital Screen Inventory
- Separate inventory type for digital screens
- Specifications: Resolution, aspect ratio, brightness, operating hours
- Content scheduling: Date + time slots
- File format: Video (MP4, MOV), HTML5

### FR-DO-002: Programmatic Integration
- API hooks for SSP integration (Broadsign, Vistar)
- Real-time bidding for premium slots
- Campaign analytics: Play count, impression verification

---

# 5. NON-FUNCTIONAL REQUIREMENTS

## 5.1 Performance Requirements

| Metric | Requirement |
|--------|-------------|
| Page Load Time | < 3 seconds (95th percentile) |
| Map Interaction | < 500ms for pin rendering |
| Search Results | < 1 second for filtered queries |
| File Upload | < 30 seconds for 100MB file |
| API Response Time | < 200ms for 95% of requests |
| Concurrent Users | Support 1,000 simultaneous users |
| Database Queries | < 100ms for standard queries |

## 5.2 Scalability Requirements
- Horizontal scaling capability via containerization
- Database read replicas for reporting queries
- CDN for static assets and artwork files
- Auto-scaling for peak campaign booking periods

## 5.3 Availability & Reliability
- Uptime SLA: 99.5% (maximum 3.6 hours downtime/month)
- Scheduled maintenance windows: Sunday 2-4 AM IST
- Database backups: Daily automated, 30-day retention
- Disaster recovery: RPO < 1 hour, RTO < 4 hours

## 5.4 Security Requirements

### SR-001: Data Protection
- All data encrypted at rest (AES-256)
- All data in transit (TLS 1.3)
- PCI-DSS compliance for payment data (handled by payment gateway)
- GDPR compliance for international users

### SR-002: Authentication & Authorization
- OAuth 2.0 / OpenID Connect for social login
- Multi-factor authentication (MFA) for admin accounts
- Password policy: Minimum 8 characters, complexity requirements
- Account lockout after 5 failed attempts (30-minute lockout)

### SR-003: Input Validation
- SQL injection prevention (parameterized queries)
- XSS prevention (output encoding)
- CSRF protection (tokens)
- File upload validation (type, size, malware scanning)

### SR-004: Audit Logging
- All financial transactions logged immutably
- Admin actions logged with before/after states
- Log retention: 7 years for financial, 1 year for operational

## 5.5 Usability Requirements
- Mobile-responsive design (mobile-first for vendor/installer apps)
- WCAG 2.1 Level AA accessibility compliance
- Support for Hindi, Odia, and English (Phase 1)
- Contextual help tooltips throughout the interface
- Onboarding tutorial for first-time users

## 5.6 Maintainability Requirements
- Code coverage: Minimum 80% unit test coverage
- API documentation: OpenAPI 3.0 specification
- Deployment: CI/CD pipeline with automated testing
- Monitoring: Application performance monitoring (APM) with alerts

---

# 6. SYSTEM ARCHITECTURE & TECH STACK (100% FREE)

## 6.1 Architecture Overview

```
CLIENT LAYER
  - Web App (Next.js / TypeScript)
  - Vendor Portal (Next.js)
  - Installer Mobile App (Expo / React Native)

API GATEWAY LAYER
  - Nginx (Reverse Proxy + Load Balancer)
  - Rate Limiting | SSL Termination | Caching

APPLICATION LAYER
  - Node.js / Express.js Backend
    - Auth Service
    - Booking Service
    - Artwork Service
    - Notification Service
    - Payment Service
    - Vendor Service
    - Admin Service
    - Analytics Service

DATA LAYER
  - PostgreSQL (Primary DB)
  - Redis (Cache/Session)
  - MinIO (S3-compatible File Storage)

EXTERNAL SERVICES (Free Tier)
  - Razorpay (Payments)
  - SendGrid (Email)
  - OpenStreetMap / MapLibre (Maps)
  - OpenCV/Pillow (AI)
  - TensorFlow Lite (AI)
  - Let's Encrypt (SSL)
```

## 6.2 Technology Stack (Zero Cost)

### Frontend
| Component | Technology | Cost | Alternative |
|-----------|-----------|------|-------------|
| Language | TypeScript | Free | JavaScript (Legacy) |
| Web Framework | Next.js 14 (App Router) | Free | React 18 + Vite |
| Mobile App | Expo (React Native) | Free | Flutter |
| UI Library | Tailwind CSS | Free | Bootstrap 5 |
| Component Library | Headless UI / Radix UI | Free | Chakra UI |
| Maps | MapLibre GL JS + OpenStreetMap | Free | Leaflet.js |
| State Management | Zustand | Free | Redux Toolkit |
| Charts | Recharts | Free | Chart.js |
| Image Editor | Fabric.js | Free | Konva.js |
| Date Picker | react-datepicker | Free | Custom |
| Calendar | react-big-calendar | Free | FullCalendar (free for non-commercial) |

### Backend
| Component | Technology | Cost | Alternative |
|-----------|-----------|------|-------------|
| Runtime | Node.js 20 LTS | Free | Python 3.11 + FastAPI |
| Framework | Express.js 4.x | Free | FastAPI |
| ORM | Prisma ORM | Free | Drizzle ORM |
| Validation | Zod | Free | Joi |
| Authentication | Passport.js + JWT | Free | Auth.js |
| API Documentation | Swagger UI + JSDoc | Free | - |
| Task Queue | Bull (Redis-based) | Free | Agenda |
| PDF Generation | Puppeteer + HTML templates | Free | PDFKit |
| Image Processing | Sharp (Node.js) | Free | Jimp |

### Database & Storage
| Component | Technology | Cost | Alternative |
|-----------|-----------|------|-------------|
| Primary Database | PostgreSQL 15 | Free | MySQL 8 |
| Cache & Sessions | Redis 7 | Free | Memcached |
| File Storage | Cloudflare R2 / AWS S3 | Free | MinIO |
| Search | PostgreSQL Full-Text Search | Free | Meilisearch (free self-hosted) |
| Backup | pg_dump cron job | Free | - |

### AI & Analytics
| Component | Technology | Cost | Purpose |
|-----------|-----------|------|---------|
| Image Processing | OpenCV (Python) + Pillow | Free | Artwork validation |
| ML Model | TensorFlow Lite | Free | Legibility scoring |
| Color Analysis | ColorThief + Delta-E | Free | Contrast checking |
| OCR | Tesseract.js | Free | Text extraction for validation |
| Traffic Data | OpenStreetMap + Census | Free | Demographic estimation |

### DevOps & Infrastructure
| Component | Technology | Cost | Alternative |
|-----------|-----------|------|-------------|
| Cloud Provider | Oracle Cloud Free Tier | Free | AWS Free Tier, Google Cloud Free Tier |
| Server | Ubuntu 22.04 LTS | Free | Debian |
| Containerization | Docker + Docker Compose | Free | Podman |
| Reverse Proxy | Nginx | Free | Caddy |
| SSL Certificates | Let's Encrypt (Certbot) | Free | - |
| Monitoring | Prometheus + Grafana | Free | Netdata |
| Log Management | Loki + Grafana | Free | - |
| CI/CD | GitHub Actions | Free | GitLab CI |
| Version Control | GitHub | Free | GitLab |
| Documentation | Docusaurus / MkDocs | Free | GitBook (free tier) |

### Communication & External Services
| Service | Provider | Free Tier | Limitations |
|---------|----------|-----------|-------------|
| Email | SendGrid | 100 emails/day | Sufficient for MVP |
| SMS | Twilio | $15.50 trial credit | ~500 SMS India |
| Maps | OpenStreetMap + MapLibre | Unlimited | Self-host tiles if needed |
| Payments | Razorpay | Transaction fees only | 2% per transaction |
| Push Notifications | Firebase Cloud Messaging | Free | Unlimited |
| Analytics | Plausible (self-hosted) | Free | Privacy-focused |

## 6.3 Development Environment Setup (Free)

### Local Development
- **OS**: Ubuntu 22.04 (WSL2 on Windows, native on Mac/Linux)
- **IDE**: VS Code (free) with extensions:
  - ESLint, Prettier, Thunder Client (API testing)
  - Prisma extension, Docker extension
- **Database**: Docker Compose with PostgreSQL + Redis
- **Node Version Manager**: nvm (free)
- **API Testing**: Thunder Client / Postman (free tier)

### Free Cloud Hosting Strategy
1. **Oracle Cloud Free Tier**: 2 AMD-based Compute VMs (1/8 OCPU, 1 GB RAM each) + 4 ARM-based Ampere A1 cores, 24 GB RAM + 200 GB block storage
2. **AWS Free Tier** (first 12 months): 750 hours/month t2.micro EC2 + 5 GB S3
3. **Google Cloud Free Tier**: f1-micro instance + 5 GB Cloud Storage
4. **Database**: Self-hosted PostgreSQL on Oracle Cloud (ARM instance has enough RAM)
5. **CDN**: Cloudflare Free Plan (unlimited bandwidth, DDoS protection)

### Cost-Free Production Architecture
```
Cloudflare (Free)
  CDN + DNS + DDoS + SSL + Caching
       |
       v
Oracle Cloud Free Tier (ARM)
  Nginx (Reverse Proxy)
  Docker Compose Stack
    - App (Node.js)
    - DB (PostgreSQL)
    - Cache (Redis)
       |
       v
  MinIO (S3-compatible)
  Self-hosted file storage
```

---

# 7. DATABASE SCHEMA DESIGN

## 7.1 Entity Relationship Diagram (Key Entities)

```
users ----> vendors ----> billboards ----> bookings ----> artworks ----> ai_validations
  |           |              |                |            |
  |           |              |                |            v
  |           |              |                |      print_jobs
  |           |              |                |            |
  |           |              |                v            v
  |           |              |          campaigns ----> install_proofs
  |           |              |                |
  |           |              |                v
  |           |              |          payments
  |           |              |
  |           |              v
  |           |      billboard_images
  |           |
  |           v
  |      print_partners
  |
  v
advertisers

users ----> installers

users ----> reviews
  |
  v
disputes

users ----> notifications
```

## 7.2 Key Table Definitions

### users
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| password_hash | VARCHAR(255) | NOT NULL |
| phone | VARCHAR(20) | UNIQUE |
| role | ENUM | advertiser, vendor, print_partner, installer, admin |
| kyc_status | ENUM | pending, verified, rejected |
| is_active | BOOLEAN | DEFAULT true |
| created_at | TIMESTAMP | DEFAULT NOW() |
| updated_at | TIMESTAMP | DEFAULT NOW() |

### vendors
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY |
| user_id | UUID | FOREIGN KEY -> users.id |
| business_name | VARCHAR(255) | NOT NULL |
| gstin | VARCHAR(15) | UNIQUE |
| pan_number | VARCHAR(10) | |
| address | TEXT | |
| city | VARCHAR(100) | |
| verification_status | ENUM | pending, approved, rejected |
| rating | DECIMAL(2,1) | DEFAULT 0 |
| total_campaigns | INTEGER | DEFAULT 0 |
| created_at | TIMESTAMP | DEFAULT NOW() |

### billboards
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY |
| vendor_id | UUID | FOREIGN KEY -> vendors.id |
| title | VARCHAR(255) | NOT NULL |
| description | TEXT | |
| size | VARCHAR(50) | NOT NULL |
| type | ENUM | static, digital |
| facing_direction | VARCHAR(20) | |
| latitude | DECIMAL(10,8) | NOT NULL |
| longitude | DECIMAL(11,8) | NOT NULL |
| address | TEXT | NOT NULL |
| city | VARCHAR(100) | NOT NULL |
| state | VARCHAR(100) | |
| pincode | VARCHAR(10) | |
| daily_rate | DECIMAL(10,2) | NOT NULL |
| weekly_rate | DECIMAL(10,2) | |
| monthly_rate | DECIMAL(10,2) | |
| status | ENUM | active, inactive, pending |
| permit_status | ENUM | verified, pending, expired |
| traffic_estimate | INTEGER | |
| created_at | TIMESTAMP | DEFAULT NOW() |

### bookings
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY |
| billboard_id | UUID | FOREIGN KEY -> billboards.id |
| advertiser_id | UUID | FOREIGN KEY -> users.id |
| vendor_id | UUID | FOREIGN KEY -> vendors.id |
| start_date | DATE | NOT NULL |
| end_date | DATE | NOT NULL |
| total_amount | DECIMAL(12,2) | NOT NULL |
| platform_fee | DECIMAL(10,2) | NOT NULL |
| gst_amount | DECIMAL(10,2) | NOT NULL |
| status | ENUM | pending_payment, confirmed, artwork_pending, artwork_approved, printing, installing, live, completed, cancelled |
| payment_status | ENUM | pending, paid, refunded, failed |
| escrow_status | ENUM | held, partially_released, fully_released |
| artwork_status | ENUM | pending, submitted, validated, approved, rejected |
| created_at | TIMESTAMP | DEFAULT NOW() |

### artworks
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY |
| booking_id | UUID | FOREIGN KEY -> bookings.id |
| file_url | VARCHAR(500) | NOT NULL |
| file_name | VARCHAR(255) | NOT NULL |
| file_size | INTEGER | |
| dimensions | VARCHAR(50) | |
| dpi | INTEGER | CHECK (dpi >= 150) |
| color_mode | VARCHAR(20) | |
| validation_score | INTEGER | |
| ai_report | JSONB | |
| status | ENUM | uploading, validating, passed, failed, approved, rejected |
| created_at | TIMESTAMP | DEFAULT NOW() |

### ai_validations
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY |
| artwork_id | UUID | FOREIGN KEY -> artworks.id |
| contrast_score | INTEGER | |
| legibility_score | INTEGER | |
| text_size_score | INTEGER | |
| safety_score | INTEGER | |
| overall_score | INTEGER | |
| recommendations | JSONB | |
| created_at | TIMESTAMP | DEFAULT NOW() |

### payments
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY |
| booking_id | UUID | FOREIGN KEY -> bookings.id |
| amount | DECIMAL(12,2) | NOT NULL |
| type | ENUM | full, milestone_1, milestone_2, milestone_3 |
| status | ENUM | pending, processing, completed, failed, refunded |
| gateway | VARCHAR(50) | |
| transaction_id | VARCHAR(255) | |
| milestone | VARCHAR(50) | |
| released_at | TIMESTAMP | |
| created_at | TIMESTAMP | DEFAULT NOW() |

### install_proofs
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY |
| campaign_id | UUID | FOREIGN KEY -> campaigns.id |
| installer_id | UUID | FOREIGN KEY -> users.id |
| photo_url | VARCHAR(500) | NOT NULL |
| gps_latitude | DECIMAL(10,8) | |
| gps_longitude | DECIMAL(11,8) | |
| timestamp | TIMESTAMP | |
| verified | BOOLEAN | DEFAULT false |
| created_at | TIMESTAMP | DEFAULT NOW() |

## 7.3 Key Indexes

```sql
-- Performance-critical indexes
CREATE INDEX idx_billboards_location ON billboards USING GIST (ll_to_earth(latitude, longitude));
CREATE INDEX idx_billboards_city_status ON billboards(city, status);
CREATE INDEX idx_bookings_dates ON bookings(start_date, end_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_payments_status ON payments(status, milestone);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_artworks_booking ON artworks(booking_id);
CREATE INDEX idx_install_proofs_campaign ON install_proofs(campaign_id);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
```

## 7.4 Key Constraints

```sql
-- Prevent double-booking
CREATE UNIQUE INDEX idx_no_overlap 
ON bookings(billboard_id, start_date, end_date) 
WHERE status IN ('confirmed', 'active');

-- Ensure artwork meets billboard specs
ALTER TABLE artworks ADD CONSTRAINT chk_dpi 
CHECK (dpi >= 150);

-- Ensure valid coordinates
ALTER TABLE billboards ADD CONSTRAINT chk_lat 
CHECK (latitude BETWEEN -90 AND 90);
ALTER TABLE billboards ADD CONSTRAINT chk_lng 
CHECK (longitude BETWEEN -180 AND 180);
```

---

# 8. API SPECIFICATIONS

## 8.1 Authentication APIs

### POST /api/v1/auth/register
**Request:**
```json
{
  "email": "rahul@hospital.com",
  "password": "SecurePass123!",
  "phone": "+919876543210",
  "role": "advertiser",
  "business_name": "City Care Hospital",
  "gstin": "21ABCDE1234F1Z5"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user_id": "usr_123456",
    "email": "rahul@hospital.com",
    "role": "advertiser",
    "kyc_status": "pending",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### POST /api/v1/auth/login
**Request:**
```json
{
  "email": "rahul@hospital.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user_id": "usr_123456",
    "role": "advertiser",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

## 8.2 Billboard APIs

### GET /api/v1/billboards
**Query Parameters:**
- city (string): Filter by city
- lat, lng, radius (float, float, int): Geo-search
- size (string): 10x20, 20x40, etc.
- type (string): static, digital
- min_price, max_price (int): Price range
- start_date, end_date (date): Availability
- page, limit (int): Pagination

**Response:**
```json
{
  "success": true,
  "data": {
    "billboards": [
      {
        "id": "bbrd_789",
        "title": "Khandagiri Main Road Hoarding",
        "size": "20x40",
        "type": "static",
        "daily_rate": 850,
        "weekly_rate": 5200,
        "monthly_rate": 18000,
        "latitude": 20.2961,
        "longitude": 85.8245,
        "city": "Bhubaneswar",
        "address": "Near Khandagiri Square",
        "traffic_estimate": {
          "daily_impressions": 45000,
          "peak_hours": "8-10 AM, 5-8 PM"
        },
        "rating": 4.7,
        "review_count": 23,
        "primary_image": "https://cdn.adspace.in/bbrd_789_1.jpg",
        "is_available": true
      }
    ],
    "pagination": {
      "total": 156,
      "page": 1,
      "limit": 20,
      "total_pages": 8
    }
  }
}
```

### GET /api/v1/billboards/:id
**Response:**
```json
{
  "success": true,
  "data": {
    "id": "bbrd_789",
    "title": "Khandagiri Main Road Hoarding",
    "description": "Premium location facing east, visible to southbound traffic...",
    "vendor": {
      "id": "vnd_456",
      "business_name": "Odisha Outdoor Media",
      "rating": 4.8,
      "total_campaigns": 127
    },
    "images": [
      {"url": "...", "type": "front", "is_primary": true},
      {"url": "...", "type": "night"},
      {"url": "...", "type": "context"}
    ],
    "availability_calendar": {
      "2026-06-01": "available",
      "2026-06-02": "booked",
      "2026-06-03": "available"
    },
    "pricing": {
      "base_daily": 850,
      "current_discount": 10,
      "discounted_daily": 765
    }
  }
}
```

## 8.3 Booking APIs

### POST /api/v1/bookings
**Request:**
```json
{
  "billboard_id": "bbrd_789",
  "start_date": "2026-06-15",
  "end_date": "2026-06-29",
  "campaign_name": "Monsoon Health Camp",
  "notes": "Please ensure installation before 8 AM"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "booking_id": "bk_987654",
    "status": "pending_payment",
    "price_breakdown": {
      "rental": 11900,
      "printing": 3500,
      "installation": 1200,
      "platform_fee": 1660,
      "gst_18": 3133,
      "total": 21393
    },
    "payment_link": "https://rzp.io/l/adspace_bk_987654",
    "expires_at": "2026-05-10T12:00:00Z"
  }
}
```

### GET /api/v1/bookings/:id
**Response:**
```json
{
  "success": true,
  "data": {
    "booking_id": "bk_987654",
    "status": "artwork_pending",
    "timeline": [
      {"status": "booked", "timestamp": "2026-05-09T10:30:00Z", "note": "Payment received"},
      {"status": "artwork_pending", "timestamp": "2026-05-09T10:31:00Z", "note": "Awaiting artwork upload"}
    ],
    "escrow_status": {
      "total": 21393,
      "released": 0,
      "held": 21393
    }
  }
}
```

## 8.4 Artwork APIs

### POST /api/v1/artworks
**Request (multipart/form-data):**
- booking_id: bk_987654
- file: [binary file]
- notes: "Please use high-gloss vinyl"

**Response:**
```json
{
  "success": true,
  "data": {
    "artwork_id": "art_555",
    "status": "validating",
    "file_url": "https://cdn.adspace.in/art_555.pdf",
    "validation_queue_position": 3,
    "estimated_validation_time": "2 minutes"
  }
}
```

### GET /api/v1/artworks/:id/validation
**Response:**
```json
{
  "success": true,
  "data": {
    "artwork_id": "art_555",
    "status": "passed",
    "scores": {
      "contrast": 92,
      "legibility_urban": 88,
      "legibility_highway": 65,
      "text_size": 95,
      "safety_margin": 100,
      "overall": 88
    },
    "warnings": [
      {
        "type": "legibility",
        "severity": "medium",
        "message": "Body text may be difficult to read at highway speeds (80 km/h). Consider increasing font size by 20%."
      }
    ],
    "recommendations": [
      "Increase headline font to 72pt minimum",
      "Add 3-inch bleed on all sides",
      "Use higher contrast for call-to-action text"
    ],
    "simulations": {
      "day_clear": "https://cdn.adspace.in/sim_art_555_day.jpg",
      "night_sodium": "https://cdn.adspace.in/sim_art_555_night.jpg",
      "motion_blur_60kmh": "https://cdn.adspace.in/sim_art_555_blur.jpg"
    }
  }
}
```

## 8.5 Vendor APIs

### POST /api/v1/vendor/billboards
**Request:**
```json
{
  "title": "New Panthan Hoarding",
  "size": "20x40",
  "type": "static",
  "facing_direction": "south",
  "latitude": 20.3123,
  "longitude": 85.8199,
  "address": "Panthan Square, Bhubaneswar",
  "city": "Bhubaneswar",
  "state": "Odisha",
  "pincode": "751013",
  "daily_rate": 750,
  "weekly_rate": 4500,
  "monthly_rate": 16000,
  "photos": ["https://...", "https://..."],
  "permit_document": "https://...",
  "permit_expiry": "2027-03-31"
}
```

### GET /api/v1/vendor/dashboard
**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "total_boards": 12,
      "active_campaigns": 3,
      "pending_approvals": 2,
      "monthly_revenue": 48500,
      "fill_rate": 73
    },
    "recent_bookings": [...],
    "revenue_chart": {
      "labels": ["Jan", "Feb", "Mar", "Apr", "May"],
      "data": [32000, 38000, 41000, 45000, 48500]
    }
  }
}
```

## 8.6 Installer APIs (Mobile PWA)

### GET /api/v1/installer/jobs
**Headers:** Authorization: Bearer {token}

**Response:**
```json
{
  "success": true,
  "data": {
    "today": [
      {
        "job_id": "job_777",
        "campaign_id": "camp_888",
        "billboard": {
          "title": "Khandagiri Main Road Hoarding",
          "address": "Near Khandagiri Square, Bhubaneswar",
          "latitude": 20.2961,
          "longitude": 85.8245
        },
        "install_date": "2026-06-16",
        "time_window": "6:00 AM - 10:00 AM",
        "artwork_reference": "ART-555",
        "status": "assigned"
      }
    ],
    "upcoming": [...]
  }
}
```

### POST /api/v1/installer/jobs/:id/proof
**Request (multipart/form-data):**
- photo_1: [binary - wide shot]
- photo_2: [binary - close-up]
- photo_3: [binary - angle shot]
- gps_latitude: 20.2961
- gps_longitude: 85.8245
- notes: "Installation completed at 7:30 AM"

**Response:**
```json
{
  "success": true,
  "data": {
    "proof_id": "prf_999",
    "status": "pending_verification",
    "gps_verified": true,
    "distance_from_pin": 12,
    "photos_uploaded": 3,
    "next_step": "Admin review and payment release"
  }
}
```

---

# 9. USER INTERFACE REQUIREMENTS

## 9.1 Design System

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| Primary | #2563EB | Buttons, links, active states |
| Primary Dark | #1D4ED8 | Hover states |
| Secondary | #10B981 | Success, confirmation |
| Warning | #F59E0B | Pending, caution |
| Danger | #EF4444 | Errors, rejections |
| Neutral-900 | #111827 | Primary text |
| Neutral-600 | #4B5563 | Secondary text |
| Neutral-200 | #E5E7EB | Borders, dividers |
| Neutral-50 | #F9FAFB | Backgrounds |

### Typography
| Element | Font | Size | Weight |
|---------|------|------|--------|
| H1 | Inter | 36px | 700 |
| H2 | Inter | 30px | 600 |
| H3 | Inter | 24px | 600 |
| Body | Inter | 16px | 400 |
| Caption | Inter | 14px | 400 |
| Button | Inter | 16px | 500 |

### Spacing Scale
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

## 9.2 Key Screens

### Advertiser Flow
1. **Landing Page**: Hero section with search, featured billboards, how-it-works
2. **Map Discovery**: Full-screen map with filter sidebar, billboard cards on hover
3. **Billboard Detail**: Photo gallery, pricing, availability calendar, traffic data, reviews
4. **Campaign Planner**: Step wizard with budget slider, goal selection, recommendations
5. **Checkout**: Cart summary, price breakdown, payment integration
6. **Dashboard**: Active campaigns, artwork upload, status tracking, analytics
7. **Artwork Upload**: Drag-drop zone, validation progress, AI report

### Vendor Flow
1. **Vendor Dashboard**: Stats cards, pending approvals, revenue chart, recent bookings
2. **Inventory Management**: Map to drop pins, form for details, photo upload, pricing
3. **Approval Queue**: Artwork preview, approve/reject buttons, AI validation scores
4. **Team Management**: Add members, assign roles, permission matrix

### Installer Flow (Mobile PWA)
1. **Login**: Phone number + OTP
2. **Job List**: Today's jobs with map navigation
3. **Job Detail**: Billboard info, artwork reference, checklist
4. **Photo Capture**: Camera interface with GPS verification
5. **Confirmation**: Summary before submission

## 9.3 Responsive Breakpoints
| Breakpoint | Width | Target |
|------------|-------|--------|
| Mobile | < 640px | Installer PWA, vendor quick actions |
| Tablet | 640-1024px | Vendor dashboard, admin panels |
| Desktop | > 1024px | Full advertiser experience, analytics |

---

# 10. SECURITY REQUIREMENTS

## 10.1 Authentication Security
- Password hashing: bcrypt with salt rounds 12
- JWT: RS256 algorithm, 24-hour access token expiry
- Refresh tokens: 7-day expiry, single-use, stored hashed in DB
- Rate limiting: 5 login attempts per IP per minute
- Session invalidation on password change

## 10.2 Data Protection
- PII encryption at rest (email, phone, address)
- Artwork files: Watermarked preview versions for vendors before payment
- Database backups: Encrypted before upload to backup storage
- API keys: Stored in environment variables, never in code

## 10.3 File Upload Security
- File type validation: MIME type + magic bytes check
- File size limit: 500MB maximum
- Malware scanning: ClamAV integration (free, open-source)
- Storage: Files stored outside web root, served via signed URLs
- Virus scanning queue: Files quarantined until scan complete

## 10.4 API Security
- CORS: Whitelist allowed origins only
- Rate limiting: 100 requests/minute per user, 1000/minute per IP
- Input sanitization: All user inputs escaped/parameterized
- SQL injection prevention: ORM parameterized queries only
- XSS prevention: Content Security Policy headers

## 10.5 Compliance
- IT Act 2000 (India): Data protection, cyber security
- GST: HSN-coded invoicing, tax collection at source
- PCI-DSS: Payment data handled by Razorpay (compliant)
- Copyright: User confirms artwork rights before upload

---

# 11. COMPLIANCE & LEGAL REQUIREMENTS

## 11.1 Advertising Regulations (India)
- **Cigarettes and Other Tobacco Products Act (COTPA)**: No tobacco ads within 100m of schools
- **Food Safety and Standards Act**: Health claims on food products require FSSAI approval
- **ASCI Guidelines**: Self-regulatory code for advertising content
- **State Municipal Laws**: Each state has hoarding size, location, and illumination regulations

### Platform Implementation:
- Content filter: Auto-flag prohibited categories
- Location check: Verify no schools/hospitals within 100m for restricted categories
- Vendor responsibility: Vendor confirms compliance before approval
- Disclaimer: Platform not liable for content violations (terms of service)

## 11.2 Data Privacy
- **DPDP Act 2023 (India)**: Consent-based data collection
- Privacy policy: Clear disclosure of data usage
- Data retention: User data deleted 1 year after account closure
- Right to deletion: User can request complete data erasure

## 11.3 Financial Compliance
- **GST Registration**: Platform must register for GST (turnover > Rs.20 lakhs)
- **TDS**: 10% TDS on vendor payouts (Section 194C)
- **Invoicing**: GST-compliant invoices with QR code

## 11.4 Liability Framework
- **Platform Liability**: Limited to service facilitation; not responsible for billboard structural failures
- **Vendor Insurance**: Mandatory public liability insurance for vendors (Rs.10 lakh minimum)
- **Dispute Resolution**: Binding arbitration clause in Terms of Service

---

# 12. PHASE-WISE DEVELOPMENT ROADMAP

## 12.1 Phase 0: Foundation (Weeks 1-2)

### Deliverables
- [ ] Development environment setup (Docker, CI/CD)
- [ ] Database schema implementation
- [ ] Authentication system (register, login, JWT)
- [ ] Basic project structure and API boilerplate

### Tech Tasks
- Setup PostgreSQL + Redis with Docker Compose
- Implement RBAC with 4 roles
- Setup Swagger API documentation
- Configure ESLint, Prettier, Husky pre-commit hooks

### Success Criteria
- All team members can run project locally in < 10 minutes
- API docs accessible at /api-docs
- Unit tests passing for auth module

## 12.2 Phase 1: Core MVP (Weeks 3-8)

### Sprint 1: Discovery (Weeks 3-4)
- [ ] Billboard CRUD for vendors
- [ ] Interactive map with OpenStreetMap + MapLibre
- [ ] Search and filter (location, size, price, availability)
- [ ] Billboard detail page with photos and pricing

### Sprint 2: Booking Engine (Weeks 5-6)
- [ ] Date selection with availability calendar
- [ ] Cart and checkout flow
- [ ] Razorpay integration (test mode)
- [ ] Booking confirmation and email notifications
- [ ] Milestone-based escrow logic

### Sprint 3: Artwork & Approval (Weeks 7-8)
- [ ] Artwork upload with validation
- [ ] Basic AI validation (contrast, resolution)
- [ ] Vendor approval workflow
- [ ] Campaign status tracking dashboard

### Success Criteria
- Complete booking flow from search to payment in < 10 minutes
- Artwork upload and approval cycle < 24 hours
- 90% of bookings without manual intervention

## 12.3 Phase 2: Logistics Engine (Weeks 9-14)

### Sprint 4: Print Partner Network (Weeks 9-10)
- [ ] Print partner registration and verification
- [ ] Automated print job routing
- [ ] Print partner dashboard (jobs, queue, history)
- [ ] Print job status tracking

### Sprint 5: Installer Mobile App (Weeks 11-12)
- [ ] PWA for installers (React)
- [ ] GPS-verified photo capture
- [ ] Job assignment and scheduling
- [ ] Offline mode with sync

### Sprint 6: Payment Release & Escrow (Weeks 13-14)
- [ ] Milestone-based payment release
- [ ] Payout management for vendors
- [ ] GST-compliant invoicing
- [ ] Financial dashboard

### Success Criteria
- Print job assigned within 2 hours of artwork approval
- Installation proof uploaded within 24 hours of scheduled date
- Payment released within 48 hours of proof verification

## 12.4 Phase 3: Intelligence & Scale (Weeks 15-20)

### Sprint 7: AI Design Validation (Weeks 15-16)
- [ ] Advanced legibility simulation (speed-based)
- [ ] Night mode simulation
- [ ] Color blindness checks
- [ ] PDF report generation

### Sprint 8: Analytics & Attribution (Weeks 17-18)
- [ ] Impression estimation engine
- [ ] CPM calculator
- [ ] QR code generation per campaign
- [ ] Basic attribution tracking

### Sprint 9: Dynamic Pricing & Optimization (Weeks 19-20)
- [ ] Dynamic pricing engine
- [ ] Last-minute discount automation
- [ ] Demand-based pricing
- [ ] Revenue optimization for vendors

### Success Criteria
- AI validation catches 90% of artwork issues before vendor review
- Dynamic pricing increases fill rate by 15%
- Advertisers can measure campaign ROI

## 12.5 Phase 4: Ecosystem & DOOH (Weeks 21-26)

### Sprint 10: Template Marketplace (Weeks 21-22)
- [ ] 50+ billboard templates
- [ ] Drag-and-drop editor
- [ ] Industry-specific templates
- [ ] Export to print-ready PDF

### Sprint 11: DOOH Integration (Weeks 23-24)
- [ ] Digital screen inventory type
- [ ] Content scheduling
- [ ] Programmatic API hooks
- [ ] Unified static + digital cart

### Sprint 12: Advanced Features (Weeks 25-26)
- [ ] In-app messaging
- [ ] Dispute resolution workflow
- [ ] Subscription campaigns
- [ ] Multi-city expansion tools

---

# 13. RISK ANALYSIS & MITIGATION

## 13.1 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| AI validation false positives | Medium | Medium | Allow override by vendor; collect feedback to improve model |
| GPS spoofing for fake proofs | Low | High | EXIF metadata verification + AI image analysis for tampering |
| Database performance at scale | Medium | High | Proper indexing, read replicas, query optimization from day 1 |
| File storage costs | Medium | Medium | Compress images, delete old versions, use MinIO self-hosted |
| Payment gateway downtime | Low | High | Retry logic, queue failed payments, manual fallback process |

## 13.2 Business Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Vendor onboarding slow | High | High | Personal visits, onboarding incentives, dedicated vendor success manager |
| Advertiser trust low initially | High | High | Money-back guarantee for first campaign, escrow protection |
| Municipal permit issues | Medium | High | Mandatory permit verification, legal advisory in terms |
| Competition from established players | Medium | Medium | Focus on Tier-2 cities first, superior UX, full logistics loop |
| Cash flow issues | Medium | High | Keep 3-month operational runway, milestone-based vendor payouts |

## 13.3 Operational Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Installer no-shows | Medium | High | Backup installer network, penalty clauses, real-time tracking |
| Print quality issues | Medium | Medium | Print partner rating system, sample approval before full run |
| Artwork rejection after print | Low | High | AI validation gate, vendor pre-approval before printing |
| Billboard damage post-install | Low | Medium | Vendor insurance requirement, damage clause in terms |

---

# 14. APPENDICES

## Appendix A: Glossary

| Term | Definition |
|------|-----------|
| OOH | Out-of-Home advertising |
| DOOH | Digital Out-of-Home |
| CPM | Cost Per Thousand Impressions |
| DSP | Demand-Side Platform |
| SSP | Supply-Side Platform |
| PWA | Progressive Web App |
| RBAC | Role-Based Access Control |
| JWT | JSON Web Token |
| KYC | Know Your Customer |
| GST | Goods and Services Tax |
| TDS | Tax Deducted at Source |
| HSN | Harmonized System of Nomenclature |
| SLA | Service Level Agreement |
| RPO | Recovery Point Objective |
| RTO | Recovery Time Objective |

## Appendix B: Free Resource Links

### Development Tools
- **Node.js**: https://nodejs.org/
- **React**: https://react.dev/
- **Vite**: https://vitejs.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **Prisma ORM**: https://www.prisma.io/
- **PostgreSQL**: https://www.postgresql.org/
- **Redis**: https://redis.io/
- **MinIO**: https://min.io/
- **Nginx**: https://nginx.org/
- **Docker**: https://www.docker.com/

### Cloud Free Tiers
- **Oracle Cloud Free Tier**: https://www.oracle.com/cloud/free/
- **AWS Free Tier**: https://aws.amazon.com/free/
- **Google Cloud Free Tier**: https://cloud.google.com/free/
- **Cloudflare Free Plan**: https://www.cloudflare.com/plans/

### AI/ML Libraries
- **TensorFlow.js**: https://www.tensorflow.org/js
- **OpenCV**: https://opencv.org/
- **Tesseract.js**: https://tesseract.projectnaptha.com/
- **Sharp**: https://sharp.pixelplumbing.com/

### Communication
- **SendGrid Free**: https://sendgrid.com/free/
- **Twilio Trial**: https://www.twilio.com/try-twilio
- **Firebase FCM**: https://firebase.google.com/docs/cloud-messaging

### Monitoring
- **Prometheus**: https://prometheus.io/
- **Grafana**: https://grafana.com/
- **Loki**: https://grafana.com/oss/loki/

## Appendix C: Sample Terms of Service Clauses

### 1. Platform Role
"AdSpace acts solely as a technology platform connecting advertisers with billboard vendors, print partners, and installation partners. AdSpace is not a party to the actual advertising transaction and assumes no liability for the quality, accuracy, or legality of any advertisement displayed."

### 2. Escrow Terms
"All payments are held in escrow until the campaign milestone is verified. Advertiser funds are released to vendors only upon upload of geo-tagged installation proof and expiration of the 48-hour dispute window."

### 3. Content Liability
"Advertisers warrant that they own or have licensed all intellectual property rights in submitted artwork. Advertisers are solely responsible for ensuring compliance with all applicable advertising regulations, including but not limited to COTPA, FSSAI guidelines, and ASCI codes."

### 4. Vendor Obligations
"Vendors warrant that all listed billboards are legally permitted, structurally sound, and maintained in display-ready condition. Vendors must maintain valid municipal permits and public liability insurance of at least Rs.10,00,000."

## Appendix D: Cost-Free Infrastructure Setup Guide

### Step 1: Oracle Cloud Free Tier Setup
1. Sign up at https://www.oracle.com/cloud/free/
2. Create an Always Free ARM instance (4 cores, 24GB RAM)
3. Install Ubuntu 22.04
4. Configure firewall (ports 22, 80, 443, 3000, 5432, 6379)

### Step 2: Docker Compose Stack
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/adspace
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

  db:
    image: postgres:15-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=adspace
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

  minio:
    image: minio/minio
    command: server /data --console-address ":9001"
    volumes:
      - minio_data:/data
    environment:
      - MINIO_ROOT_USER=admin
      - MINIO_ROOT_PASSWORD=password

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    depends_on:
      - app

volumes:
  postgres_data:
  redis_data:
  minio_data:
```

### Step 3: SSL with Let's Encrypt
```bash
# Install certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d adspace.in -d www.adspace.in

# Auto-renewal
sudo systemctl enable certbot.timer
```

### Step 4: Monitoring Stack
```yaml
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    volumes:
      - grafana_data:/var/lib/grafana
```

---

# END OF DOCUMENT

**Document prepared for internal use. All specifications subject to change based on market feedback and technical feasibility.**
