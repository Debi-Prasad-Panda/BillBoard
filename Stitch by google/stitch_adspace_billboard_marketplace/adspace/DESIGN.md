---
name: AdSpace
colors:
  surface: '#faf8ff'
  surface-dim: '#d9d9e5'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fe'
  surface-container: '#ededf9'
  surface-container-high: '#e7e7f3'
  surface-container-highest: '#e1e2ed'
  on-surface: '#191b23'
  on-surface-variant: '#434655'
  inverse-surface: '#2e3039'
  inverse-on-surface: '#f0f0fb'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#faf8ff'
  on-background: '#191b23'
  surface-variant: '#e1e2ed'
typography:
  display-lg:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

The design system is engineered to evoke high-level trust, exclusivity, and modern efficiency. It serves a dual audience of high-net-worth advertisers and premium inventory owners. The brand personality is authoritative yet innovative, utilizing a **Sleek Light Theme** heavily influenced by **Glassmorphism**. 

The visual narrative focuses on "transparency" and "clarity," mirroring the marketplace's commitment to verifiable OOH data. Surfaces should feel like high-end architectural glass—lightweight but structurally sound. Generous whitespace is non-negotiable, ensuring that high-value billboard imagery remains the focal point without visual clutter.

## Colors

The palette is anchored by **Deep Royal Blue (#2563EB)** for all primary actions and brand touchpoints, symbolizing stability and corporate strength. **Emerald Green (#10B981)** is reserved strictly for "Available" statuses and success states, providing a high-contrast signal of opportunity.

Neutrals leverage a crisp, cool-toned gray scale. Backgrounds utilize a very light off-white (#F8FAFC) to allow white glass panels to "pop" via subtle contrast. Text hierarchy is maintained through deep slate for headlines and medium grays for supporting metadata, ensuring legibility without sacrificing the airy aesthetic.

## Typography

This design system employs a dual-font strategy. **Outfit** is used for headlines to provide a geometric, modern, and slightly "high-fashion" tech feel. **Inter** is used for all body copy, data points, and labels to ensure maximum readability and a systematic, functional appearance.

Key headers should use tighter letter spacing to maintain a premium, editorial look. Labels and small metadata should occasionally use all-caps with increased tracking for clear categorization in dense data environments like billboard specification lists.

## Layout & Spacing

The layout follows a **Fixed Grid** model for desktop (12 columns) to maintain a centered, premium feel on wide monitors. For mobile and tablet, it transitions to a **Fluid Grid** (4 and 8 columns respectively).

Spacing is built on an 8px rhythmic scale. However, the design system prioritizes "Generous Whitespace," meaning section vertical margins should frequently reach 80px to 120px to allow the glass panels to breathe. Components within cards should use a standard 16px or 24px internal padding.

## Elevation & Depth

Depth is achieved through **Glassmorphism** rather than traditional heavy shadows.
- **Glass Panels:** Background-blur (20px to 32px) combined with a 60% opaque white fill. Each glass element must have a 1px solid white border at 40% opacity to define its edges against the light background.
- **Shadows:** Use "Ambient Shadows"—extremely soft, large radius (30px+), and low opacity (5-8%) using a blue-tinted neutral. Shadows should only appear on the lowest layer of floating cards to provide a subtle "lift."
- **Stacking:** Interactive elements (like map pins or hovered cards) increase in blur intensity and shadow spread, creating a tactile sense of the element moving toward the user.

## Shapes

The shape language is sophisticated and friendly. A base radius of **12px** is used for standard components (inputs, small cards), while larger structural panels and billboard preview cards use **16px**. 

Buttons and "Available" badges utilize a **Full-Pill** (999px) radius to contrast against the more structural rectangular grid, making them instantly identifiable as interactive or status-driven elements.

## Components

- **Pill-Shaped Buttons:** Primary buttons use a solid Deep Royal Blue fill with white text. Secondary buttons use a transparent glass background with a blue border and blue text. All buttons have a full-pill radius.
- **Glassmorphic Cards:** Main containers for billboard listings. They feature a 24px blur, white semi-transparent fill, and a subtle 1px inner border.
- **Premium Interactive Map Pins:** These should be custom-designed. A circular blue pin with a white border, featuring a small "billboard" icon. When active, the pin expands into a mini-glassmorphic preview of the ad space.
- **Availability Badges:** Small, pill-shaped chips with an Emerald Green background (10% opacity) and solid Emerald Green text to denote "Available Now."
- **Input Fields:** Minimalist design with a 1px light gray border that turns Blue on focus. Use a subtle inner-shadow to give a slightly recessed feel, contrasting with the elevated glass panels.