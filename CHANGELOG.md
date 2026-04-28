# Changelog

All notable changes to the Agape Nursery & Landscape website ship here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) ·
Versioning: 4-digit `MAJOR.MINOR.PATCH.MICRO`.

## [0.1.0.0] - 2026-04-28

### Added
- First v0 preview of the marketing site, runnable on localhost.
- Comprehensive `PLAN.md` (1,626 lines) authored via `/autoplan` — six independent
  reviewer voices across CEO, design, and engineering phases. 62 findings auto-decided
  and folded in; 3 user challenges resolved (bilingual at v1, custom Astro stack,
  hero CTA wording).
- Twelve scene components per the planned IA: Nav, Hero, Booking, TrustReviews,
  Services, Portfolio, About, Process, InStock, ServiceArea, Contact, Footer, plus
  a FloatingCallButton.
- Bilingual content authored in `src/content/site.ts` — hero, CTAs, form labels,
  success/error messages, and primary section H2s render English-on-top with Spanish
  underneath at 0.86em italic.
- Single-primary-CTA hero ("Book a Free Landscape Consultation") with secondary
  tap-to-call link, sized to fit iPhone SE 375x667 above the fold.
- Booking section with Calendly placeholder iframe, animated skeleton state, and
  postMessage + 4-second timeout fallback per PLAN.md §3.5 States Matrix.
- Design system: 4 core colors (olive, cream, soil-brown, terracotta-darkened to
  WCAG-AA at #A85638) plus 2 state-only accents (leaf-fresh, marigold/cempasúchil).
  All contrast ratios verified ≥ 4.65:1 on cream.
- Typography: Fraunces (display, opsz-locked) + Inter (body) via Google Fonts CDN.
  Caveat removed per design review consensus.
- Four motion moments wired via Intersection Observer: hero load with word stagger,
  service tile hover lift + scroll-in stagger, portfolio fade-in, process SVG line
  draw on scroll. Global reduced-motion rule defenses every animation.
- Schema.org LandscapingBusiness JSON-LD baked into the layout for local SEO.

### Notes
- v0 is static-only output. Cloudflare Pages Functions backend (Resend, R2,
  Turnstile, KV audit log) is the next ship per PLAN.md §7.1.
- Photo placeholders are tagged "Placeholder · Drive coming" — Adolfo's photo Drive
  swaps in via content-only changes.
- Calendly URL is a placeholder. Swap for Adolfo's real booking link before launch.
- Form submission is a UI-only stub (simulated success after 900ms). Real backend
  wiring is the next ship.
- Test framework bootstrap deferred to next ship per PLAN.md §16 (26-test CI suite
  defined in `.context/autoplan/phase3-test-plan.md`).
