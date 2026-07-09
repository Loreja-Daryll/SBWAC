# Sorsogon Blue Waves — Website

A nonprofit aquatics mission for Sorsogon, built as a React + Vite + TypeScript + Tailwind CSS site.

## Run it locally

```
npm install
npm run dev
```

## Build for production

```
npm run build
```

Output goes to `/dist`. Deploy that folder anywhere static (Netlify, Vercel, Hostinger, etc).

## Brand colors

Sampled directly from the club's logo (`src/assets/logo.png`):

- `brand` (#0099D9) — the official SBWAC blue, from the logo
- `deep` (#063A5C) — a derived dark navy, not from the logo, used for contrast sections
- `foam` (#F7FBFD) — near-white background

All defined in `tailwind.config.js`, use as `bg-brand`, `text-deep-950`, etc.

## Positioning

This site is written as a nonprofit mission, not a business. Three pillars run through every section:
1. Developing local swimmers into real athletes
2. Protecting Sorsogon's ocean and coastline
3. Promoting responsible tourism to Sorsogon

## Structure

- `src/components/` — one component per section (Hero, Reality, Method, Programs, Involved, Story, Vision, FAQ, FinalCTA, Footer, Nav)
- `src/components/DepthGauge.tsx` — the scroll-tracking depth indicator on the right side (desktop only)
- `src/components/MobileDepthBar.tsx` — same idea, top progress bar on mobile
- `src/hooks/useReveal.ts` — scroll-reveal animation hook used across sections

## Known TODOs (flagged, not fixed, since the info wasn't available yet)

- All CTAs link to `facebook.com/SorsogonBlueWaves`. Swap to a real donation/booking link once one exists.
- No real testimonials or photos yet, sections use honest founder/coach story instead. Swap in real photos when available (recommend replacing the SVG illustrations in `Hero.tsx` first).
- No age brackets or pricing listed, kept general in FAQ.tsx.
- Nonprofit registration status is described generally ("being built as a nonprofit"), not as a confirmed legal status. Update wording once registration is finalized.
- Any future facility or pool timeline was intentionally left out of the copy since it wasn't confirmed. If/when there's a real, confirmed date, it can go back into Vision.tsx and the FAQ "Do you have your own pool yet?" answer.
