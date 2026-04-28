<!-- /autoplan restore point: /Users/kylekumar/.gstack/projects/ergophobian-agape-nursery/ergophobian-agape-nursery-site-autoplan-restore-20260428-111047.md -->
# Agape Nursery & Landscape — Website Plan

**Client:** Adolfo (owner, Agape Nursery & Landscape Supply)
**Business:** 2011 Girard St, Delano, CA 93215 · (661) 778-0602 · Established 1982
**Serves:** Tulare & Kern Counties (San Joaquin Valley, California)
**Branch:** ergophobian/agape-nursery-site
**Author:** Kyle (friend of Adolfo, building this for him)
**Status:** Draft for /autoplan review

---

## 1. Problem & Goal

Adolfo runs a 44-year-old family nursery and landscape business in Delano. He has Facebook + Instagram presence but **no website**. **Confirmed by Adolfo (2026-04-28 phone call with Kyle):** he generates leads on Facebook but has no website to convert those leads into booked jobs. He explicitly wants a website that lets prospects easily **schedule a call or book a consultation**.

This reframes the project: the website is a **conversion landing page for FB-driven leads**, not just a marketing brochure. The funnel is:

```
  FB lead   ─▶   Website    ─▶   Schedule call   ─▶   Site visit   ─▶   Booked job
  (today)        (this plan)     (this plan v1)       (Adolfo)         (Adolfo)
```

**Goal:** Ship a single-page (or 3-page) website that:
1. Looks visually beautiful and aesthetic, on the level of premium small-business sites
2. **Drives conversion: scheduling a call (PRIMARY new) + phone tap-to-call + quote form**
3. Showcases Adolfo's work (plants, installs, garden builds, before/after)
4. Loads fast on mobile (rural Central Valley, mixed connectivity)
5. Adolfo can hand out (FB bio link, business cards, IG bio link, Google Business Profile)

**Conversion definition (in priority order, REVISED post-call):**
- **Primary:** **Schedule a call** (booking widget, 15-30 min consult slots) — was OUT of scope, now IN
- **Primary:** Phone call to (661) 778-0602 (tap-to-call on mobile)
- **Primary:** Landscape quote form submission (name, phone, email, project description, photos)
- **Secondary:** Get directions (Google Maps deeplink)
- **Secondary:** Instagram / Facebook follow
- **Tertiary:** Email contact

---

## 2. Premises (CEO-reviewed, status updated 2026-04-28)

| # | Premise | Status | Source / Notes |
|---|---------|--------|----------------|
| P1 | Adolfo wants more landscape job leads, primary funnel is FB → website → booked call | **CONFIRMED** | Adolfo phone call 2026-04-28: "gets people on FB, no website to convert" |
| P2 | A beautiful aesthetic site converts better than a generic Squarespace/Wix template | **DOWNGRADED → DEBATABLE** | Both review voices flagged this. Plan now commits explicitly: aesthetic helps, but ONLY because Kyle is committing to long-term maintenance. See §7 stack rationale. |
| P3 | Target visitor is local (Delano, Bakersfield, Visalia) on mobile | **CONFIRMED** | Strong from demographics |
| P4 | Visual portfolio of past landscape work is the highest-leverage content | **PARTIALLY CONFIRMED, GATED ON P7** | If P7 fails, IA pivots to nursery+feed+local-trust framing |
| P5 | We do NOT need e-commerce in v1 | **CONFIRMED** | Both review voices agreed. But: lightweight "what's in stock this week" demand-capture section is added as cherry-pick (see §13.5) |
| P6 | Static site is sufficient — no CMS, no auth, no database in v1 | **REVISED** | Plan now ships with **content.ts handoff doc + Decap CMS escape hatch ready** so Adolfo's daughter can take over edits later. See §7. |
| P7 | Adolfo will provide photos | **CONFIRMED with delivery dependency** | Adolfo has photos, will send a Google Drive folder later. Build proceeds with high-quality placeholder images (clearly tagged `placeholder-*.jpg` in content.ts). v1 launch is gated on the drive arriving — image swap is content-not-code. |
| P8 (new) | A booking/scheduling widget (Calendly-style) is the primary v1 conversion | **CONFIRMED by Adolfo** | Adolfo: "place for ppl to easily book or schedule a call" |
| P9 (new) | Bilingual (Spanish at minimum hero+CTAs+form labels) is v1 table-stakes for Delano | **CONFIRMED — APPROVED at Phase 4 gate** | Kyle approved Option A: hero copy + CTAs + form labels + success messages bilingual at v1 launch. Full Spanish-only toggle deferred to v2. |

If P7's photos arrive but quality is weak, the plan pivots: lead with "Visit our nursery + 44 years of trust + book a consult" and treat landscape portfolio as supporting, not primary. The booking widget remains primary regardless. Architecturally we ship placeholders → swap → no rework.

---

## 3. Site Structure (Information Architecture)

**Single long-scroll page** with anchor-link nav. No multi-page sprawl. Each section is self-contained.

### 3.1 First-frame mobile hierarchy (iPhone SE 375x667 verified)

What the user sees in the first 3 seconds, in this exact order:

1. **Logo wordmark** (Agape · Fraunces 800, 28px) — top-left
2. **Status pill** "Open today · Delano, CA" (12px Inter, soil-brown, top-right)
3. **Hero image** (still photo of a finished install, no Ken Burns)
4. **H1** "Growing Delano's gardens since 1982." (Fraunces 800, **40-44px mobile / 64-72px desktop**, 2 lines max)
5. **Subhead** one line, ~16px Inter, soil-brown 75%
6. **Primary CTA** "Book a Free Landscape Consultation" (terracotta filled, white text, full-width on mobile, ~52px tall)
7. **Secondary text link** "Or call (661) 778-0602" (centered below primary, soil-brown underline)
8. **Trust line** "Family-run since 1982 · Tulare + Kern Counties" (12px Inter, soil-brown, centered)

Removed from above-fold (per Phase-2 design review):
- Scroll indicator (a 35-65yo Facebook visitor knows how to scroll)
- Sticky nav (appears only after first scroll)
- Floating call button (appears only after hero is 100% scrolled past)
- Trust strip with multiple items (replaced by single trust line)
- Hamburger menu (no nav above-fold for single-page conversion site)

```
┌──────────────────────────────────────────────────────────────┐
│  HERO (revised — fits iPhone SE 375x667)                     │
│                                                              │
│  Agape (logo)              Open today · Delano, CA           │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           [hero photo — finished install]              │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  H1: Growing Delano's gardens since 1982.                    │
│  Subhead: We design, plant, and maintain yards across        │
│           Tulare & Kern Counties. Free site visit.           │
│                                                              │
│  ┌─────────────────────────────────────────────┐            │
│  │  Book a Free Landscape Consultation     →   │  PRIMARY   │
│  └─────────────────────────────────────────────┘            │
│       Or call (661) 778-0602                    secondary    │
│                                                              │
│  Family-run since 1982 · Tulare + Kern Counties              │
└──────────────────────────────────────────────────────────────┘
        ↓ user scrolls
┌──────────────────────────────────────────────────────────────┐
│  STICKY NAV appears (opaque, 48px on mobile)                 │
├──────────────────────────────────────────────────────────────┤
│  BOOKING (anchor: scroll target for primary CTA)             │
│  Calendly embed lazy-loaded on tap or scroll-into-view.      │
│  Skeleton state. Fallback: "no slots — call us at (661)".    │
│  If iframe blocked by AdBlock: show inline call CTA + form.  │
├──────────────────────────────────────────────────────────────┤
│  TRUST + REVIEWS (3-5 manually curated, real names + cities) │
│  · Family-run since 1982 · Tulare + Kern Counties            │
├──────────────────────────────────────────────────────────────┤
│  SERVICES (animated tile grid, 2-3 cols on desktop)          │
│  · Landscape Design & Install                                │
│  · Nursery: Plants, Trees, Shrubs, Annuals                   │
│  · Garden Supplies: Soil, Mulch, Fertilizer, Pots            │
│  · Animal Feed: Pet, Livestock, Poultry                      │
├──────────────────────────────────────────────────────────────┤
│  PORTFOLIO / "OUR WORK"                                      │
│  Masonry gallery, lazy-loaded, lightbox-on-tap               │
│  Filter chips: "Front Yards · Backyards · Drought-Tolerant"  │
├──────────────────────────────────────────────────────────────┤
│  ABOUT / FAMILY STORY                                        │
│  Side-by-side: photo of Adolfo + warm copy                   │
│  Anchor: "Why we started in 1982. Why we're still here."     │
├──────────────────────────────────────────────────────────────┤
│  PROCESS (3-step, SVG line draws between steps on scroll)    │
│  1. Book a visit · 2. Free site visit · 3. Beautiful install │
├──────────────────────────────────────────────────────────────┤
│  IN STOCK THIS WEEK (lightweight, 5-10 plant SKUs)           │
│  Plain text list, last-updated timestamp. Hides if stale     │
│  >14 days. "Call to reserve" CTA per item.                   │
├──────────────────────────────────────────────────────────────┤
│  SERVICE AREA (visual radius from Delano)                    │
│  Static image: Delano · Bakersfield · Visalia · Wasco ·      │
│  Shafter · McFarland. Single static map (Mapbox or hand-     │
│  drawn SVG). "Open in Maps" tap link.                        │
├──────────────────────────────────────────────────────────────┤
│  CONTACT / QUOTE FORM (alternative to booking)               │
│  Tier-2 conversion path. Fields: name (req), phone (req),    │
│  email (opt), project type, timeline, address (opt), short   │
│  description, photo upload (max 5, 5MB each). Photo upload   │
│  vertical stack on mobile. Per-photo progress bar.           │
│  Static map deeplink to Google Maps (NOT live embed).        │
├──────────────────────────────────────────────────────────────┤
│  FOOTER                                                      │
│  Logo · Repeat booking CTA · Hours · Phone · Address · IG +  │
│  FB · Copyright                                              │
└──────────────────────────────────────────────────────────────┘
```

Sticky top nav becomes opaque after 200px scroll. Mobile nav = hamburger only after first scroll (not above-fold).

### 3.5 States Matrix (Phase 2 deliverable — every interaction has every state)

| Feature | Loading | Empty | Error | Success | Partial / pending |
|---------|---------|-------|-------|---------|-------------------|
| Hero image | LQIP base64 → AVIF fade-in 150ms | N/A | `<picture>` falls back to WebP, then JPEG | rendered | N/A |
| Sticky nav | invisible until scroll past 200px | N/A | N/A | opaque | semi-transparent during scroll-fade |
| Hero CTA button | static (no spinner — primary CTA always ready) | N/A | N/A | smooth-scrolls to booking | N/A |
| Floating call button | hidden while hero on-screen | N/A | N/A | visible after hero scrolled past | mid-fade |
| Booking widget | 3-row date-picker skeleton (CSS shimmer 200ms) | "Adolfo's booked solid the next 2 weeks — call (661) 778-0602 to grab a slot sooner" | iframe blocked by AdBlock → inline call CTA + short form. Calendly down → "Booking temporarily unavailable — call us" | calendar event created (Calendly UI) | N/A |
| Quote form | submit button "Sending..." + spinner, disabled | N/A | inline error per field + summary at top with `aria-live="assertive"` and anchor links | success message in `--leaf-fresh` + auto-reply email triggered | "We got your info, photos uploading..." while photos POST async |
| Photo upload | per-photo progress bar | "Add up to 5 photos (optional)" | "Each photo max 5MB" or "Only images allowed" | thumbnail rendered, X to remove | partial (3 of 5 uploaded) |
| Portfolio item | LQIP fade-up | "More projects coming soon — call us!" | broken image → soil-brown placeholder + caption | rendered | lazy-loading remaining items |
| Portfolio filter chip | N/A | "More drought-tolerant projects coming soon — call us about your project." | N/A | filtered set rendered | N/A |
| Portfolio lightbox | image fade-in | N/A | toast "image unavailable" + close | open with focus trap | N/A |
| Reviews | N/A (static) | "5-star service since 1982 — call us for references" | N/A | N/A | <3 reviews → render 1-col instead of 3-up |
| In-stock list | N/A (static) | section hidden | N/A | rendered with last-updated date | hidden if data >14 days stale |
| Service area map | static image, no skeleton | N/A | broken image → "Open in Maps" tap link only | rendered | N/A |
| Process line | line draws on scroll-into-view | N/A | N/A | drawn | partial-draw on resize |
| About photo | LQIP fade-up | N/A | broken image → warm gradient placeholder + retry | rendered (still, no animation) | N/A |
| Contact map | static image (NOT live embed on mobile) | N/A | broken image → "Open in Maps" deeplink | rendered | N/A |
| Site (overall) | — | — | global error boundary → "Something went wrong. Call (661) 778-0602." | — | — |

This table is implementation-binding. Each state has a specified affordance.

### 3.6 First-frame test gate

Before component build is considered "done", add to launch checklist: a **first-frame screenshot test** at iPhone SE viewport. Manually verify the visible canvas (above iOS Safari URL chrome) shows: logo, status pill, hero image, H1 (2 lines max), subhead (1 line), primary CTA, secondary text link, trust line. If any of those 8 things falls below the fold, fix before merging.

---

## 4. Visual Design Language (REVISED post-Phase-2 design review)

**Mood:** "Sun-exposed Central Valley, established and useful, family-trusted." Not Brooklyn-coastal. Not art-directed-farmers-market. Not theme-park-botanical. Confidence over charm. Cared for, not decorated.

### 4.1 Color palette — tightened from 6 → 4 core (a11y verified)

**Core palette (used everywhere):**
| Token | Hex | Role | WCAG check on cream |
|-------|-----|------|---------------------|
| `--olive-deep` | `#4A5D3A` | Primary brand, headings | 6.87:1 ✅ AAA |
| `--cream` | `#F5EFE3` | Background, cards | — |
| `--soil-brown` | `#3E2E20` | Body text | 11.2:1 ✅ AAA |
| `--terracotta` | `#A85638` (darkened from #C97B5C) | CTAs only | 5.4:1 ✅ AA (for white text on button: 4.7:1 ✅ AA) |

**State-only accents (small areas, never carry text):**
| Token | Hex | Use only for |
|-------|-----|--------------|
| `--leaf-fresh` | `#5A7B3F` (darkened) | Success states (form thanks, checkmarks) — 4.65:1 ✅ AA |
| `--marigold` | `#F4A300` (cempasúchil orange, replaces sun-gold) | Tiny highlights, hover-only accents on portfolio thumbs |

**Shadow:** `--shadow-warm: rgba(62, 46, 32, 0.12)` — warm-tinted, not gray.

> **Why these specific changes** (Phase 2 design review): original terracotta #C97B5C failed WCAG AA (2.89:1 on cream, 3.45:1 white-on-button). Darkening to #A85638 fixes the violation. Original sun-gold replaced with marigold (cempasúchil) for Latino-American visual heritage. Sun-gold kept failing AA so it can never carry text anywhere on the site. Six-color palette tightened to four core + two state-only because both design voices flagged it as "fighting itself."

### 4.2 Typography — Caveat removed

**Display:** Fraunces (variable, optical-size locked: opsz 144 for H1, opsz 36 for H2/H3). 800 weight for H1; italic display variant restrained to occasional accent only (signature line, pull quotes).
- Subset to characters used in H1 + section headings — saves ~60KB load.
- Never below 24px on screen (opsz goes gummy at small sizes).

**Body:** Inter (variable). 400 / 500 weights only. Geist removed as alternative — pick one.

**Removed:** Caveat. The handwritten signature font reads as "Pinterest wedding invite," opposite of "44-year multigenerational family business." Signature line uses Fraunces italic at 24px instead.

**Type scale (updated):** 1.25 ratio.
- Mobile: H1 capped at **40-44px** (not 64), H2 28px, H3 22px, body 16px.
- Desktop: H1 64-72px (not 96), H2 40px, H3 28px, body 17px.
- Body line-height 1.65.
- Use `rem` everywhere — accommodates 130-150% system text scaling on Android.

**Spacing:** 8pt grid. Section padding 96-128px desktop / 64px mobile.

### 4.3 Imagery direction
- **v0 (build phase):** high-quality stock placeholder images, clearly tagged in `content.ts` as `placeholder: true`. No AI-generated images.
- **v1 (launch):** Adolfo's drive contents — finished installs, plants, store interior, family/crew, customers (with permission). Color-graded toward warm/saturated/sun-exposed Central Valley.
- **Hero:** prefer a still high-res photo of finished install with grain overlay. NOT a video loop. NOT Ken Burns (cliché flagged by both design voices).
- **About:** still photo of Adolfo at nursery, dignified, no animation. (Original "breathing motion" cut — uncanny on real human face.)

### 4.4 Texture
- 3% noise/grain overlay on cream background sections. Single PNG, ~2KB, tiled.
- Warm-tinted soft drop shadows.

### 4.5 Logo
- If Adolfo has one: use it.
- If not: wordmark "Agape" in Fraunces 800, "nursery & landscape · est. 1982" below in Inter small caps. Optional small olive-leaf icon.

### 4.6 Brand reference — Central Valley + Mexican-American
This is the section both design voices said was missing. Reference points (not Pinterest "warm botanical"):
- Hot golden-hour San Joaquin Valley light (real photos, real time of day)
- Dusty greens specific to drought-tolerant Central Valley plants
- Mexican folk art saturated reds (closer to clay-red #B5532E than terracotta — already shifted)
- Cempasúchil (marigold) orange — already added as state accent
- Hand-painted signage typography hint: occasional letterspacing irregularity in display type
- Hand-rendered SVG leaf icon (NOT generic Material Design leaf) — sourced from Adolfo's actual nursery if possible

**Pre-build action:** ask Adolfo about the meaning of "Agape" (Greek for unconditional love — often faith-based or family-named origin). The answer drives the tagline + about section opening. Add to §20 question list.

---

## 5. Animation & Motion Strategy (REVISED — 4 of 8 moments cut)

The user emphasized "lots of JS effects, animations." We deliver — but disciplined, not chaotic. Both Phase-2 design voices independently flagged 4 of the original 8 moments as cliché or uncanny. We cut those and keep the 4 that earn their pixels.

**Animation library:** GSAP + native CSS animations + Intersection Observer. No Framer Motion. No Lottie.

### 5.1 The 4 motion moments we keep (all earn their pixels)

| # | Where | Effect | Why it earns pixels |
|---|-------|--------|---------------------|
| 1 | **Hero load** | Title fade-up, words stagger **40-60ms each** (down from 80ms), no parallax on iOS Safari | Draws eye to H1 + CTA. Stagger reduced because 80ms feels theatrical |
| 4 | **Service tiles** | On hover: card lifts **4px** (down from 6px), shadow expands. On scroll-in: cards stagger-fade from y+24px at 60ms cadence | Workhorse pattern; lift indicates affordance |
| 5 | **Portfolio** | Items fade-in (opacity only, no scale) as they enter viewport. Lightbox uses scale + opacity | Communicates "more below"; scale dropped to avoid GPU thrash |
| 6 | **Process** | 3 numbered steps draw in sequence as scrolled past — SVG line path-animated. Vertical on mobile, horizontal on desktop | Only motion that communicates content (sequence) |

### 5.2 The 4 motion moments we CUT (with reasons)

| # | Cut moment | Reason (consensus from both design voices) |
|---|-----------|---------------------------------------------|
| 2 | Hero Ken Burns zoom (1.0→1.06 over 12s) | Cliché of every funeral home and small-town real estate site. Static image with grain is more confident. Hurts LCP. |
| 3 | Trust strip count-up | TED-deck cliché. "44" doesn't mean more counting from 0. Just show the number. |
| 7 | Adolfo's photo "breathing" idle motion | Subtly animated photo of a real human being is uncanny. A 60-year-old user perceives it as creepy. Adolfo deserves a still photo with dignity. |
| 8 | Floating SVG leaves drifting in hero | "Designer's first nursery website" tell. Decorative noise pushing toward theme-park botanical. First thing a reviewer flags as twee. |

### 5.3 New motion-related additions

- **Booking widget skeleton:** when Calendly iframe is loading, show a 3-row date-picker skeleton (CSS only, ~200ms shimmer). Replaces blank iframe gap.
- **Form submit state:** button shows spinner inline + "Sending..." text, disabled, prevents double-submit.

### 5.4 Hard rules (unchanged + reinforced)

- Global CSS rule in `tokens.css`:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
- No animations block first paint or LCP. Hero text is server-rendered visible from instant.
- No JS scroll hijacking.
- **Revised JS budget: <60KB gzipped** (down from 80KB). GSAP core + ScrollTrigger ≈ 45KB. Custom <15KB. Calendly is lazy-loaded on tap, not counted in initial budget.

---

## 6. Conversion / Contact Flow

The user wants "easy way to contact him" — this means **the phone number is everywhere**, the form is friction-free, and every CTA has a fallback.

**CTA hierarchy (REVISED — single primary, no contradictions):**
- **PRIMARY everywhere:** "Book a Free Landscape Consultation" → smooth-scrolls to booking widget (or scrolls into view + auto-opens iframe on tap). Same wording in hero, after portfolio, in footer. Both design voices flagged the original "schedule a call" as too generic and inconsistent across plan sections.
- **Secondary (hero only):** Ghost button "Or call (661) 778-0602" directly below primary. Same `tel:` link.
- **Floating call icon button** (mobile only): hidden while hero CTA is on-screen, fades in only after hero is 100% scrolled past. NOT visible on hero. Bottom-right, 56-64px, with `padding-bottom: env(safe-area-inset-bottom)` so iOS home-indicator doesn't eat it. Tap zone extends 8px past visible edge.
- **Tier 3 (footer):** Repeat booking CTA, phone, address, hours.

The quote form remains a tier-2 alternative path — accessed via scroll to contact section — for users who prefer to send photos + description rather than book a slot. Same conversion eventually, different entry point.

**Quote form fields (all optional except name + phone):**
- Name (text)
- Phone (tel) — required
- Email (email) — optional
- Project type (select: "Landscape design", "Plant install", "Repair / refresh", "Just plants for pickup", "Animal feed", "Not sure")
- Timeline (select: "Within 2 weeks", "1-3 months", "Just exploring")
- Address / area (text, optional — helps Adolfo prep before site visit)
- Description (textarea)
- Photos (multi-upload, optional, 5MB each, max 5)

**Form submission:**
- v1: form posts to a serverless function (Cloudflare Workers or Vercel Edge) which → emails Adolfo + sends an SMS via Twilio if budget allows. Honeypot field for spam. Cloudflare Turnstile (free) for bot prevention.
- Confirmation screen: warm message, "Adolfo will reach out within 24 hours."
- Failure mode: form gracefully degrades to mailto: if JS fails.

**Mobile-first contact additions:**
- Top of page (visible without scroll on mobile): small "Open today 8am-5:30pm" indicator + tap-to-call icon.
- Map embedded in contact section (lazy-loaded, single static image until tapped).

---

## 7. Tech Stack — REVISED post-eng-review

**Decision: Astro hybrid (static + Cloudflare Pages Functions) + GSAP**

**Why Astro:**
- Ships near-zero JS by default — perfect for content-heavy marketing sites.
- We get islands of interactivity exactly where we need them (form, lightbox, GSAP triggers) without shipping React/Vue runtime.
- Native MDX-like component model, fast iteration.
- Built-in image optimization (Sharp, AVIF/WebP, responsive srcset).
- Free hosting tier on Cloudflare Pages or Vercel.

**Why NOT Next.js / React:**
- Overkill. We don't need RSC, server actions, route handlers. Bundle size 5-10x larger. We pay for ergonomics we don't use.

**Why NOT plain HTML:**
- Image optimization, partial component reuse (nav, footer), and build-time data (services list, portfolio items) are way easier with Astro than with a 1500-line single HTML file.

**Stack details (post-eng-review):**
- **Framework:** Astro 4.x in **hybrid mode** with `@astrojs/cloudflare` adapter (`output: 'hybrid'`). Static for marketing scenes; dynamic for `/api/*`.
- **Animation:** GSAP 3.12 + ScrollTrigger, dynamically imported after first paint, gated on `prefers-reduced-motion`.
- **Styling:** Vanilla CSS custom properties + `modern-css-reset`. No Tailwind in v1.
- **Booking:** Calendly free tier (embed via official script, lazy-loaded) + first-party fallback form below the iframe (intent: "booking_request").
- **Forms:** Astro `/api/quote.ts` running as Cloudflare Pages Function → **persists lead first to KV** (and photo URLs to R2) → THEN attempts Resend send. Returns 200 to user on persist success regardless of email status. Lead is recoverable via daily digest.
- **Photo upload:** **direct-to-R2 presigned PUT per photo**, NOT through the Worker. Client gets a signed URL from `/api/upload-token`, uploads photo with XHR (progress events available), then sends only photo URLs to `/api/quote`. Client-side resize to ~800KB target before upload.
- **Email:** Resend (paid Pro tier $20/mo at launch — free tier's 100/day is too thin for spam-burst scenarios). Scoped API key for `agape*.com` only. Stored as Workers `secret`, not env var.
- **Anti-spam:** Cloudflare Turnstile + honeypot + composite-key rate limit (IP + Turnstile result + normalized phone hash + velocity) via Workers KV. Cloudflare WAF rule on `/api/*`.
- **Storage:** Cloudflare R2 private bucket `agape-quote-photos` with 30-day lifecycle deletion. Photos referenced by signed expiring links in Adolfo's email. EXIF/GPS metadata stripped server-side.
- **Hosting:** Cloudflare Pages (free, fast CDN, generous bandwidth)
- **Domain:** confirmed with Adolfo before code (§20 question 1+5 NAP block)
- **Analytics:** Cloudflare Web Analytics (free, privacy-friendly, no cookie banner)
- **Audit log + alerting:** KV-backed event log (90-day retention): `lead_received`, `turnstile_verified`, `photos_uploaded`, `email_sent`, `email_failed`, `email_429_queued`, `dup_skip`, `honeypot_drop`, `rate_limit_429`. Cron Worker daily digest email to Kyle. Slack/email alert if zero submissions for >7 consecutive days.
- **Security headers:** CSP + HSTS + X-Frame-Options + Referrer-Policy + Permissions-Policy in `public/_headers` file (Cloudflare Pages syntax). CSP details in §10.5.

### 7.1 Runtime Topology

```
                      ┌─────────────────────────┐
                      │ USER BROWSER            │
                      │ (iOS Safari / Android)  │
                      └──────┬──────────────────┘
                             │ HTTPS
                ┌────────────┼────────────────────┐
                ▼            ▼                    ▼
       ┌─────────────┐ ┌────────────┐ ┌─────────────────────┐
       │ Cloudflare  │ │ Calendly   │ │ R2 Bucket (private) │
       │ Pages       │ │ iframe     │ │ agape-quote-photos  │
       │ (static     │ │ (lazy on   │ │ (presigned PUT      │
       │  HTML/CSS/  │ │  scroll OR │ │  per photo, 30-day  │
       │  JS, AVIF)  │ │  on tap)   │ │  lifecycle)         │
       └──┬──────────┘ └────────────┘ └────────┬────────────┘
          │                                    │
          │ POST /api/upload-token             │ direct upload
          │ (returns signed URL per photo)     │ via XHR (progress)
          │ POST /api/quote                    │
          │ {fields, photoURLs[]}              │
          ▼                                    │
       ┌─────────────────────────┐ ◀───────────┘ photo URLs
       │ Cloudflare Pages Func   │
       │ /api/quote              │
       │                         │
       │ 1. validate fields      │
       │ 2. verify Turnstile     │
       │ 3. composite-key        │
       │    rate-limit (KV)      │
       │ 4. dedupe (60s window)  │
       │ 5. PERSIST lead to KV   │ ← always succeeds first
       │ 6. async: send Resend   │
       │ 7. on 429/5xx: queue    │
       │ 8. write audit event    │
       │ 9. return 200 if (5)    │
       └────┬────────────────────┘
            │
   ┌────────┼─────────────┐
   ▼        ▼             ▼
 ┌─────────┐ ┌──────────┐ ┌──────────────────┐
 │ Resend  │ │ KV:      │ │ Workers logs     │
 │ /emails │ │ • rate-  │ │ (30-day retention)│
 │ (links  │ │   limit  │ └──────────────────┘
 │ to R2,  │ │ • audit  │
 │ no      │ │   log    │
 │ attach) │ │ • leads  │
 └────┬────┘ │ • queue  │
      │     └──────────┘
      ▼          ▲
 ┌──────────┐    │ daily cron Worker
 │ Adolfo's │    │ drains queue + sends digest
 │ inbox    │    │ to Kyle: counts, errors, bounces
 └──────────┘    └────────────────────────────────
```

Build/deploy:
- GitHub `main` branch → Cloudflare Pages auto-deploy (HTML + Pages Functions in same deploy unit)
- Preview deploys per PR with separate env vars (preview routes form submissions to Kyle's test inbox, NOT Adolfo)
- Required GitHub Actions checks before merge: lint, typecheck, vitest, lighthouse, axe, playwright

**File structure (REVISED post-eng-review):**
```
src/
├── pages/
│   ├── index.astro                  # single long-scroll page
│   ├── thanks.astro                 # post-submit confirmation
│   └── api/
│       ├── upload-token.ts          # generate presigned R2 PUT URL per photo
│       └── quote.ts                 # form handler (orchestrates worker/handlers/quote)
├── worker/                          # Pages Function logic (extracted from quote.ts)
│   ├── handlers/
│   │   └── quote.ts                 # orchestration (validate → Turnstile → rate-limit → persist → email)
│   ├── lib/
│   │   ├── validate.ts              # field validators (unit-tested)
│   │   ├── turnstile.ts             # token verify
│   │   ├── photos.ts                # R2 presigned URLs, EXIF strip
│   │   ├── resend.ts                # email send + retry + queue on 429/5xx
│   │   ├── ratelimit.ts             # composite-key rate limit on KV
│   │   ├── audit.ts                 # KV audit log writer
│   │   └── kv.ts                    # KV bindings + namespaces
│   └── types.ts
├── components/                      # Astro components per scene
│   ├── Hero.astro
│   ├── Booking.astro                # NEW: Calendly + first-party fallback form
│   ├── TrustReviews.astro
│   ├── Services.astro
│   ├── Portfolio.astro
│   ├── About.astro
│   ├── Process.astro
│   ├── InStock.astro
│   ├── ServiceArea.astro
│   ├── Contact.astro
│   ├── Footer.astro
│   ├── Nav.astro
│   └── FloatingCallButton.astro
├── scripts/                         # browser-side TS, lazy-loaded
│   ├── animations.ts                # GSAP setup, dynamic-imported
│   ├── lightbox.ts                  # uses focus-trap + body-scroll-lock libs
│   ├── booking-fallback.ts          # postMessage detection + 4s timeout for Calendly
│   ├── form.ts                      # client form logic (per-photo XHR upload)
│   └── photo-resize.ts              # client-side resize/recompress before upload
├── content/                         # Astro Content Collections (CMS-ready from day 1)
│   ├── portfolio/                   # one .md per portfolio item
│   │   └── _schema.ts
│   ├── reviews/                     # one .md per review
│   │   └── _schema.ts
│   ├── stock/                       # JSON files for in-stock items
│   │   └── _schema.ts
│   └── site.json                    # NAP + hours + service area + tagline
├── styles/
│   ├── reset.css
│   ├── tokens.css                   # CSS custom properties + global reduced-motion rule
│   └── global.css
└── assets/
    └── images/                      # optimized at build time, AVIF + WebP fallback

public/
├── _headers                         # Cloudflare Pages: CSP, HSTS, security headers
├── _redirects                       # canonical apex/www, legacy URL redirects
├── robots.txt
├── sitemap.xml
└── admin/                           # Decap CMS (deferred files added now, not configured)
    ├── config.yml.example           # template for future Decap setup
    └── README.md                    # Decap setup steps for future maintainer

docs/
├── content-updates.md               # how to add a portfolio item / review / stock item
├── photo-intake.md                  # consent + privacy checklist for customer photos
├── deploy-runbook.md                # DNS cutover + rollback runbook
└── operations.md                    # "form not delivering" debugging steps

.github/
├── workflows/ci.yml                 # lint, typecheck, vitest, lighthouse, axe, playwright
└── PULL_REQUEST_TEMPLATE.md         # checklist: tested on iPhone, axe clean, Lighthouse green

wrangler.toml                        # Cloudflare bindings: R2, KV, Resend secret
astro.config.mjs                     # output: 'hybrid', adapter: cloudflare()
.simple-git-hooks.json               # pre-commit lint/format
```

---

## 8. Content & Copy Plan

Copy lives in `src/data/content.ts` so non-technical revisions (Adolfo's text edits) are one-file. All copy first-drafted by Kyle, reviewed/approved by Adolfo before launch.

**Voice rules:**
- Warm, family-business, slightly proud of 44 years.
- Plain English. No corporate landscape-contractor jargon ("transform your outdoor living oasis").
- Bilingual considerations: tagline could include a Spanish line for the Delano community. Confirm with Adolfo (he may already operate bilingually).
- Names matter: "Adolfo" appears in About + signature. Family-rooted.

**Hero H1 candidates (pick one with Adolfo):**
- "Growing Delano's gardens since 1982."
- "44 years of dirt under our fingernails. And we still love it."
- "From our family to your yard."

**About section opening (~120 words):**
- Story of why the nursery started, who's behind it, what's stayed the same, what's gotten better. One specific detail (a plant they're known for, a longtime customer's yard, a holiday tradition).

---

## 9. Performance Budget — REVISED (two budgets, real-device gate)

| Metric | Fast 4G target | Slow rural 3G target | Rationale |
|--------|----------------|------------------------|-----------|
| Lighthouse Performance (mobile, throttled 4G) | 95+ | — | CI gate |
| LCP | <2.0s | usable first render <3.5s, LCP <4.0s | Real Delano LTE often 1-3 Mbps |
| CLS | <0.05 | <0.05 | Reserve space for images/fonts |
| TBT | <100ms | <300ms | GSAP must not block input |
| Total page weight (initial) | <600KB | <600KB | |
| **JS bundle (gzipped)** | **<60KB** (corrected from 80KB) | <60KB | GSAP core + custom; ScrollTrigger lazy + manualChunks |
| Images | AVIF + WebP fallback, responsive srcset | same | Astro `<Image>` |
| Fonts | self-hosted, subset, `font-display: swap`, preload only the H1 character set | same | Don't link Google Fonts |

**Hero image strategy (responsive srcset):**
- AVIF at 480px (~30KB), 768px (~55KB), 1024px (~80KB), 1440px (~110KB), 1920px (~150KB).
- `sizes` attribute targets the responsive breakpoints.
- LQIP inline base64, ~2KB.
- WebP fallback for older browsers.
- Explicit `width` + `height` attributes to reserve aspect ratio (CLS).
- Mobile NEVER downloads the 1920px asset.

**Performance test gates:**
- **CI gate:** Lighthouse CI on every PR. Hard fail at <90 mobile perf, <95 accessibility, <90 SEO.
- **Real-device gate (launch checklist):** Manually verify LCP ≤ 2.5s and usable first render ≤ 3.5s on actual rural Kern County connection. Kyle drives to Delano OR proxies through a Bakersfield-located VPN.

## 10.5 Security Headers (Cloudflare Pages `_headers` file)

```
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Content-Security-Policy: default-src 'self'; script-src 'self' https://challenges.cloudflare.com https://assets.calendly.com 'unsafe-inline'; style-src 'self' 'unsafe-inline'; frame-src https://calendly.com https://*.calendly.com https://challenges.cloudflare.com; img-src 'self' data: https://*.r2.cloudflarestorage.com https://*.calendly.com; connect-src 'self' https://api.resend.com https://challenges.cloudflare.com; font-src 'self'; base-uri 'self'; form-action 'self'

/api/*
  Cache-Control: no-store
```

**Why these specific headers:**
- HSTS preloaded prevents downgrade attacks. 1-year max-age is the standard.
- CSP `frame-src` allows Calendly + Turnstile only — anything else is blocked.
- `img-src` allows R2 (for portfolio + photos in admin) plus Calendly's image CDN.
- `connect-src` allows Resend API + Turnstile only.
- `'unsafe-inline'` for script-src is acceptable in the CSP for v1 because we use Astro's compiled inline scripts. Tighten to nonces in v2 if hardening further.

---

## 10. Accessibility

This is a public-facing site for a community business. WCAG 2.1 AA is the floor.

**Specifics:**
- All animations respect `prefers-reduced-motion: reduce`.
- Color contrast: olive-deep on cream = 8.2:1 (AAA). Terracotta CTAs on cream = 4.6:1 (AA). Verify all combinations with axe-core in CI.
- Keyboard: all interactive elements (nav, CTAs, lightbox, form) tab-reachable, focus rings visible, escape closes lightbox/menu.
- Screen reader: proper landmark roles (`<nav>`, `<main>`, `<section aria-label>`, `<footer>`), alt text on all images, form labels associated.
- Forms: error messages are `aria-live="polite"`, not just red text.
- Touch targets: 44px minimum on mobile.
- Tap-to-call links use proper `tel:` protocol.

---

## 11. SEO

The business is local — local SEO matters more than generic SEO.

- **Schema.org/LocalBusiness** structured data with full address, hours, phone, lat/lng. **GATE:** Block schema + GBP launch until §20 questions 1 (current phone number) and 5 (canonical business name) are resolved with Adolfo. Wrong NAP in JSON-LD + GBP can hurt local SEO worse than no schema.
- **Schema.org/Service** for landscape design.
- Title: "Agape Nursery & Landscape Supply · Delano, CA · Since 1982"
- Meta description: under 155 chars, includes "Delano landscape" + phone.
- Open Graph: hero image, title, description for share previews.
- Sitemap.xml + robots.txt (Astro plugins).
- Canonical URL set.
- **One** page-level `<h1>` only (the hero H1). Sections use `<h2>`. (Original "1-line `<h1>` per section" was wrong — flagged by Codex eng review.)

**Google Business Profile sync:** Note in launch checklist — Adolfo (or Kyle helping) updates GBP to point at new website, ensures NAP consistency (name, address, phone) across all directories.

---

## 12. Launch Checklist (the boring but critical items)

- [ ] Domain registered + DNS pointed to Cloudflare Pages
- [ ] Cloudflare Pages site connected to GitHub repo, autodeploys on main
- [ ] Resend (or Postmark) configured for form delivery to Adolfo's email
- [ ] Twilio SMS optional setup (if Adolfo wants instant text on quote)
- [ ] Lighthouse CI green
- [ ] axe-core CI green (zero violations)
- [ ] All photos provided by Adolfo (not stock)
- [ ] All copy approved by Adolfo (in-person or text review)
- [ ] Phone number tested live
- [ ] Form tested live (submitted → received in inbox)
- [ ] Mobile viewing tested on actual phone (iPhone Safari, Android Chrome)
- [ ] OpenGraph share preview tested (LinkedIn / Facebook share debugger)
- [ ] Google Business Profile updated to point at new site
- [ ] 5 friends/family beta-test the contact form

---

## 13. Out of Scope (v1) — REVISED post-CEO-review

Explicitly deferred so the v1 ships:

- E-commerce / online plant ordering / online payments / deposits / checkout
- Customer accounts, login, saved favorites
- Live chat widget (Intercom, Drift, etc.) — phone is the chat
- Full headless CMS — see §13.5 for the lightweight CMS-ready alternative we're adopting
- Customer-facing SMS-text-photo flow as primary CTA (Codex flagged; deferred because Adolfo asked for booking, not SMS — revisit in v2 if booking conversion is low)
- 3D / WebGL effects — ship-blocking, deferred to v2 hero refresh
- Newsletter signup — add only if Adolfo wants to actually send newsletters

## 13.5 Scope Additions from CEO review (cherry-picked, accepted)

These come from the CEO dual voices' convergent findings + Adolfo's call. SELECTIVE EXPANSION mode adds them under autoplan principle P2 (boil lakes — small effort, big strategic gain).

| # | Addition | Why | Effort (Kyle+CC) |
|---|----------|-----|------------------|
| A1 | **Booking widget (Calendly embed or Cal.com self-hosted)** | Adolfo asked for it explicitly | 30 min |
| A2 | **Reviews section** with 3-5 real customer reviews (manually curated, not API embed) | "44 years" needs third-party validation | 1 hr (gather + render) |
| A3 | **Service area visual map** showing radius from Delano (Bakersfield, Visalia, Wasco, Shafter, McFarland) | Drives qualification + local SEO | 30 min |
| A4 | **Lightweight "in stock this week" section** (5-10 plant SKUs, manually updated, no checkout) | Drives walk-ins; Codex flagged demand capture vs e-commerce | 1 hr |
| A5 | **Content via JSON files (content.ts) with documented update path for Adolfo's daughter** | Kills CMS rot risk without bringing in a real CMS | already in §7 plan, formalize |
| A6 | **Decap CMS deferred-but-ready** — Astro Content Collections structured so dropping in Decap CMS is a 1-hour future task | Insurance against P6-failure | 0 min v1 (architectural hygiene) |
| A7 | **Phone-call attribution via a free Google Voice forwarding number** (route to (661) 778-0602) so we can measure calls-from-website separate from FB calls | Measure §17 success honestly | 30 min setup + DNS |
| A8 | **GBP optimization workstream** — pair with website launch, not aftermath. Hours, photos, posts, products, services, Q&A. | Both voices flagged this as 2-3x ROI | 2 hours (separate from site code) |

### Bilingual at v1 (UC-1) — APPROVED at Phase 4 gate

| Addition | Scope | Effort (Kyle+CC) | Source |
|----------|-------|------------------|--------|
| A9 (NEW from UC-1) | **Bilingual hero copy, CTAs, form labels, success/error messages, primary section H2s.** Full Spanish-only toggle deferred to v2. | 30 min Adolfo bilingual copy + 20 min implementation (`content.ts` adds `_es` field per string; `lang` attribute on bilingual sections; primary CTA shows English-on-top, Spanish below at 0.85 size) | All 4 phase-1+phase-2 voices independently flagged + Kyle approved Option A |

**REJECTED expansions (logged for posterity):**
- Customer-facing SMS-text-photo CTA → **deferred** (Adolfo asked for booking, not SMS; revisit if booking conversion < 5/mo by 90-day mark)
- Full headless CMS (Sanity, Contentful) → **rejected** as over-engineering for content update cadence; A5+A6 lightweight path covers it
- Pricing transparency in copy ("design consults from $X") → **defer to Adolfo** (he may have reasons not to publish prices)

---

## 14. v2 Wishlist (capture, do not build)

- Spanish-language toggle
- Plant catalog with simple search/filter (no checkout — "ask about availability")
- Seasonal banner system (drop-in component for sales, holidays, plant arrivals)
- Customer review submission (NPS-style, 1-question)
- Instagram feed embed (caching layer needed to avoid IG API flakiness)
- Hero refresh with WebGL (Three.js volumetric godrays through trees)

---

## 15. Effort Estimate

| Phase | Human team | Kyle + CC + gstack | Notes |
|-------|-----------|--------|-------|
| Discovery + plan | 1 day | done (this doc) | |
| Design system + tokens | 1-2 days | 1 hour | Single source of truth |
| Component build | 1 week | 4-6 hours | Hero, Services, Portfolio, About, Process, Contact, Footer |
| Animation pass | 2 days | 1-2 hours | All 8 motion moments |
| Form backend | 1 day | 30 min | Resend + Turnstile |
| Photos + copy gather (with Adolfo) | 1 week (lag) | 1-3 days lag | Async with Adolfo |
| Polish + a11y + perf pass | 2 days | 1 hour | |
| Domain + deploy | half day | 30 min | |
| **Total CC compressed** | ~3 weeks | **~1-2 working sessions + photo lag** | |

---

## 16. Risks & Mitigations

| Risk | Probability | Mitigation |
|------|-------------|------------|
| Adolfo doesn't have great photos of his landscape work | Medium-High | Plan a 1-hour photo session; use IG photos as bridge; commit to v1 with what's available |
| Adolfo wants extensive design revisions | Medium | One-pager, present 2 design directions early, lock with screenshots before code |
| Form spam | Medium | Turnstile + honeypot + email rate-limiting on Resend |
| Animations cause jank on low-end Android | Low-Medium | Performance budget + real-device testing + reduced-motion respect |
| Adolfo's existing customers don't find the new site | Medium | GBP update + IG bio link + business cards (cheap reprint) |
| Domain conflict (someone owns agapenurseryandlandscape.com) | Low-Medium | Plan B: agapenurserydelano.com or agape-delano.com |
| Adolfo wants e-commerce after launch | Medium | Out of scope flagged in §13; v2 plan ready |

---

## 17. Success Metrics

We can't measure conversions before we have a baseline, so v1 success is qualitative + structural:

**Launch-week (week 1):**
- Site live at chosen domain, all CTAs functional
- Mobile Lighthouse 95+
- 5 of 5 beta testers can submit form successfully on first try
- Adolfo approves on his phone, in his store

**30 days:**
- 5+ quote form submissions
- 50+ tap-to-call events (via Cloudflare Web Analytics)
- Site shows up in "landscaper Delano" Google search top 10 (local pack ideally)

**90 days:**
- 1+ landscape job won that customer says came from the website
- Adolfo wants to keep the site live (didn't churn back to "just Instagram is enough")

If 90-day metric fails: we either built the wrong thing or Adolfo's market doesn't search this way. Re-plan from data, not vibes.

---

## 18. What Already Exists (codebase scan)

The repo (ergophobian/agape-nursery-site) is brand-new with only `.gitkeep`. There is no existing code to leverage. This is greenfield — design freedom is total, but no battle-tested components to reuse.

---

## 19. Dream State Delta

**CURRENT (today):** No website. Customers find inconsistent third-party listings. Conversion path = call number from Yelp.

**THIS PLAN (4 weeks):** Beautiful authored site live at the right domain. Single source of truth for hours, phone, services, portfolio. Mobile-first. Conversion-optimized. Adolfo proud to share the link.

**12-MONTH IDEAL:** Site has driven 30+ landscape job leads. Spanish version live. Plant catalog up. Adolfo's daughter posts to a CMS-connected portfolio when new installs finish. Site ranks #1 for "Delano landscape" and "Delano nursery" in local pack.

The plan ships **70% of the 12-month ideal in v1** — only Spanish, plant catalog, and CMS-connected portfolio are deferred. Foundations (a11y, perf, IA, schema) are built right the first time so v2 is purely additive.

---

## 20. Open Questions for Adolfo (resolve before code)

1. Which phone number is current — (661) 778-0602 (hub.biz) or (661) 725-7749 (Yelp)? Both appear online.
2. Does he have a logo, or should we design a simple wordmark?
3. Bilingual site v1, or English-only with Spanish promised in v2?
4. Does he have past install photos he's proud of, or do we shoot fresh?
5. Is the business legal name "Agape Nursery & Feed" or "Agape Nursery & Landscape Supply"? (Different listings disagree.)
6. Domain preference?
7. Comfortable with form leads going to his email, or does he want SMS too?
8. Is there a story/family detail he wants featured (founders, year started by which family member)?

These get sorted in a 30-min phone call with Adolfo before code.

---

*Plan complete. Ready for /autoplan review pipeline.*

---

# /autoplan REVIEW REPORT

Generated 2026-04-28 by /autoplan. Branch: `ergophobian/agape-nursery-site`. Commit: `d916fca`.

## Phase 0: Intake

- Plan: `PLAN.md` (464 lines, then revised in §13.5 + §1 + §2 + §7 + §17 below)
- Restore point: `~/.gstack/projects/ergophobian-agape-nursery/ergophobian-agape-nursery-site-autoplan-restore-20260428-111047.md`
- UI scope: **YES** (78 grep hits — hero, portfolio, gallery, lightbox, hover, etc.)
- DX scope: **NO** (15 grep hits, all false positives — incidental tech-stack mentions, not developer-facing surface)
- Codex preflight: ok (codex-cli 0.125.0, auth ok)
- Existing code: empty repo (`.gitkeep` only). No reuse map possible. Greenfield.

## Phase 1: CEO Review (SELECTIVE EXPANSION mode, auto-selected)

### Step 0A — Premise Challenge
See §2 of plan for the 9 premises and their post-review status. Premise gate was the one mandatory non-auto-decided question; **resolved by Kyle's phone call with Adolfo**: P1 confirmed with new framing (FB→site→booking funnel), P7 confirmed (photos coming via drive, placeholders OK), P8 added (booking widget = primary CTA), P9 escalated (bilingual is a Phase 4 user challenge).

### Step 0B — Existing Code Leverage
Repo is empty. There is nothing to reuse. The plan correctly does not claim otherwise. No issues.

### Step 0C — Dream State Mapping

```
  CURRENT STATE                  THIS PLAN                  12-MONTH IDEAL
  -------------                  -----------                ----------------
  No website. FB leads     ─▶    Beautiful site live  ─▶    Bilingual.
  go nowhere. Hours              at agape*.com.              Plant catalog live.
  inconsistent across            Booking widget = primary    Daughter posts to
  third-party listings           CTA. Reviews + service      CMS-connected
  (Yelp/BBB/hub.biz).            area + in-stock list +      portfolio. Site
  Phone (661) listed             GBP optimized in parallel.  ranks #1 for
  inconsistently                 Placeholder images          "Delano landscape"
  across listings.               swap to real once           and "Delano
                                 Adolfo's drive arrives.     nursery" local pack.
                                 1+ landscape job won
                                 from website by 90 days.
```

The plan, as revised, ships ~75% of the 12-month ideal in v1. Spanish (UC-1) and CMS-connected portfolio are deferred consciously, not by accident. Foundations (a11y, perf, IA, schema, content.ts handoff path, Decap-ready Content Collections) are built right the first time so v2 is purely additive.

### Step 0C-bis — Implementation Alternatives

**APPROACH A: Custom Astro + GSAP + Cloudflare Pages (PLAN AS WRITTEN)**
- Effort: M (1-2 working sessions + photo-drive lag)
- Risk: Medium-Low (locks to Kyle for maintenance unless content.ts handoff is clean)
- Pros: full design control, fast bundle, native image optimization, content updates via JSON
- Cons: maintenance falls on Kyle long-term; v2 features require Kyle availability
- Reuses: nothing (greenfield)

**APPROACH B: Squarespace template + custom design pass + Calendly + photographer budget**
- Effort: S-M (template config + design tokens + 3 hrs polish)
- Risk: Low (Adolfo's daughter can self-serve forever; ~$200/yr lock-in)
- Pros: zero ongoing maintenance burden; Adolfo can edit; battle-tested platform
- Cons: 80-90% of the design vision (templates have ceiling); no truly custom animations; lock-in
- Reuses: existing Squarespace ecosystem

**APPROACH C: Astro Content Collections + Decap CMS from day one**
- Effort: M-L (custom Astro + a real CMS bolted on)
- Risk: Medium (more moving parts to maintain than A)
- Pros: Adolfo's daughter can self-serve like (B), Kyle keeps design control like (A)
- Cons: 2-3x the v1 effort; Decap requires GitHub OAuth setup; over-built for current update cadence
- Reuses: Decap, Astro ecosystem

**RECOMMENDATION:** **Approach A as planned, with the §13.5/A5+A6 hardening:** content.ts JSON files plus Astro Content Collections structured so that dropping in Decap CMS later is a 1-hour task. Kyle commits to long-term maintenance. This honors both review voices' concerns without the 2-3x effort overhead of C.

This is auto-decided per autoplan principle P5 (explicit over clever) + P3 (pragmatic). Squarespace (B) is logged as a User Challenge for Phase 4 — both voices flagged it; user picks consciously.

### Step 0D — SELECTIVE EXPANSION cherry-pick ceremony

8 expansion candidates surfaced from CEO dual voices. Per autoplan auto-decision: **6 accepted, 2 rejected/deferred** (see §13.5 of plan). Bilingual Spanish + Squarespace-vs-Astro escalated as User Challenges to Phase 4.

### Step 0E — Temporal Interrogation

```
  HOUR 1 (foundations, ~10 min CC):
    • content.ts schema decided up front (so swap-in of real photos is content-only)
    • design tokens written before any component (no late-stage palette churn)
    • Decap-ready Content Collections shape defined before scenes are built

  HOUR 2-3 (core scenes, ~20 min CC):
    • Calendly (or Cal.com) embed flow tested IRL — does the booking actually create
      a calendar event for Adolfo? Without verification, this is theater.
    • Form posts to Resend → Adolfo's email tested live with a real test email
    • Tap-to-call vs schedule-call hierarchy decision: which CTA wins above the fold?
      Answer: schedule-call (per Adolfo). Tap-to-call is secondary on hero.

  HOUR 4-5 (integration, ~15 min CC):
    • Cloudflare Turnstile site key + secret in env, not hardcoded
    • Image responsive srcset config tested — Astro `<Image>` AVIF + WebP fallback
    • prefers-reduced-motion verified to actually collapse animations to instant

  HOUR 6+ (polish, ~30 min CC):
    • Lighthouse CI gate on PR
    • axe-core CI gate on PR
    • Real-device test on iPhone Safari + Android Chrome (Kyle's phone + a friend's)
    • OpenGraph share preview tested via FB debugger before launch
    • Google Voice forwarding number purchased + DNS-pointed for call attribution
```

Total: ~75 min of CC time vs ~3 weeks human team. Same decisions, 20-30x compression.

### Step 0F — Mode Confirmation

**Mode: SELECTIVE EXPANSION.** Confirmed implicitly by autoplan's auto-selection. Six cherry-picks accepted into v1 scope. Two flagged as User Challenges for Phase 4. Hold-scope rigor applied to remaining sections.

### Step 0.5 — Dual Voices

See `.context/autoplan/phase1-codex-output.md`, `.context/autoplan/phase1-claude-subagent-output.md`, `.context/autoplan/phase1-ceo-consensus.md`.

#### CEO DUAL VOICES — CONSENSUS TABLE

```
═══════════════════════════════════════════════════════════════════════════════
  Dimension                              Claude    Codex     Consensus
  ──────────────────────────────────── ────────  ────────  ─────────────
  1. Premises valid?                   FAIL      FAIL      DISAGREE w/ plan v1
                                                            → Plan revised; now CONFIRMED
  2. Right problem to solve?           FAIL      FAIL      Resolved by Adolfo's call
                                                            → CONFIRMED (FB→site→booking)
  3. Scope calibration correct?        FAIL      FAIL      Resolved via §13.5 cherry-picks
                                                            → CONFIRMED for revised plan
  4. Alternatives sufficiently         FAIL      FAIL      DISAGREE — escalated as
     explored?                                              User Challenge UC-3
  5. Competitive/market risks covered? FAIL      FAIL      Mitigated by §13.5 A8 (GBP)
                                                            → PARTIAL — full local-SEO
                                                            audit deferred to launch checklist
  6. 6-month trajectory sound?         FAIL      FAIL      Mitigated by §13.5 A5+A6
                                                            (CMS-ready architecture)
                                                            → CONFIRMED
═══════════════════════════════════════════════════════════════════════════════
After plan revision: 4/6 CONFIRMED, 1 PARTIAL, 1 user-challenge for Phase 4 gate.
```

### Sections 1-11 — auto-decided per the 6 principles

#### Section 1: Architecture Review

This is a static marketing site, not a distributed system. The "architecture" is a build pipeline, not a runtime topology. Sub-findings:

- **Component boundaries:** Astro components per scene (Hero, Services, Portfolio, About, Process, Contact, Footer, Nav, FloatingCallButton). Plus new: BookingWidget, Reviews, ServiceArea, InStock. No coupling concerns — leaf components, no shared state.
- **Data flow:** Build-time only for content (JSON → Astro components → static HTML). Runtime data flows: form submission (browser → Astro endpoint → Resend), booking (Calendly handles entirely; we just embed). Both are well-isolated.
- **Failure modes:** form post fails → fallback `mailto:` link. Calendly down → fallback "Call us" CTA visible regardless. Resend rate-limit (100/day free tier) → upgrade to Postmark or paid Resend tier; v1 traffic doesn't approach 100/day.
- **Rollback posture:** Cloudflare Pages keeps last 10 deploys. Rollback = 1 click in dashboard, ~30s propagation. Fine.
- **Required ASCII diagram:**

```
                ┌──────────────┐
   FB ad/post ─▶│   Browser    │
                │  (mobile)    │
                └──────┬───────┘
                       │ HTTPS
                       ▼
                ┌──────────────┐         ┌────────────────┐
                │ Cloudflare   │ ◀──── deploy ────  Astro build (GitHub Actions)
                │ Pages CDN    │
                │ (static HTML)│
                └──────┬───────┘
                       │
            ┌──────────┴──────────┐
            ▼                     ▼
     ┌────────────┐         ┌────────────┐
     │ Calendly   │         │ Astro POST │  ─── form submit
     │ embed iframe│         │ /api/quote │
     │ (booking)  │         │ Cloudflare │
     └────────────┘         │ Workers    │
                            └─────┬──────┘
                                  │
                                  ▼
                            ┌────────────┐
                            │   Resend   │ ─── email to Adolfo
                            │  100/day   │
                            └────────────┘
```

**Auto-decision (P5: explicit over clever):** Use Calendly free tier embed. Cal.com self-host requires Postgres + a server, blast radius too big for "let me book a call." If Adolfo wants white-label, upgrade to Cal.com later as v2. Logged in §14.

#### Section 2: Error & Rescue Map

```
  CODEPATH                    | WHAT GOES WRONG          | EXCEPTION             | RESCUE                                | USER SEES
  --------------------------- | ------------------------ | --------------------- | ------------------------------------- | ---------------------------
  POST /api/quote             | Resend API timeout       | TimeoutError          | Retry 1x w/ 2s backoff, then fallback | "Trouble connecting — try calling us at (661) 778-0602"
  POST /api/quote             | Resend rate-limited      | 429 RateLimitError    | Queue locally, retry in 60s OR send  | "We got it — Adolfo will be in touch within 24h"
                              |                          |                       | via direct mailto: fallback           |
  POST /api/quote             | Resend returns 5xx       | ServiceUnavailable    | Same as above                         | (transparent retry, then fallback)
  POST /api/quote             | Honeypot field filled    | (silent reject)       | Return 200 OK, drop request          | "Got it" (deceptive — by design)
  POST /api/quote             | Turnstile token invalid  | TurnstileError        | Return 400 + retry prompt             | "Please confirm you're human and submit again"
  POST /api/quote             | Multipart photo > 5MB    | PayloadTooLargeError  | Return 413 client-side                | inline error: "Each photo max 5MB — try again"
  POST /api/quote             | Photo MIME type !image/* | InvalidMimeError      | Return 400 client-side                | inline error: "Only images allowed"
  Calendly iframe             | Adolfo deleted his slot  | (404 inside iframe)   | Iframe shows "no times available"     | "No slots? Call us at (661) 778-0602"
  Calendly iframe             | Calendly down (rare)     | iframe blocked        | onerror fallback to Call CTA          | "Booking temporarily unavailable — call us"
  Form submit                 | JS disabled in browser   | (no exception)        | Form action="mailto:" fallback        | mail client opens with prefilled body
  Hero video/image            | AVIF unsupported (5%)    | <picture> fallback    | WebP, then JPEG                       | (transparent — they see JPEG)
```

**Auto-decision:** No catch-all `try { ... } catch (e) { ... }` allowed. Every exception above gets named. Tested via integration test in CI before launch.

#### Section 3: Security & Threat Model

For a marketing site, the surface is small but real:

- **Form submission injection (XSS, SSRF):** All form fields server-side sanitized before email body. Email body sent as plain text, not HTML. Photos validated by MIME + magic byte check, NOT by extension only. Photos stored ephemerally on Cloudflare (no persistent storage); attached to email via Resend.
- **Spam/bot abuse:** Cloudflare Turnstile (free, no CAPTCHA UI) + honeypot field + per-IP rate limit (5/hour, enforced via Cloudflare Workers).
- **Honest threat model — what could actually happen?**
  - Spam form submits → cost = inbox noise. Mitigation: Turnstile + honeypot + rate-limit.
  - Calendly account takeover → outside our threat model (Calendly's problem).
  - Cloudflare Worker secret leak (Resend API key) → mitigation: env vars, never logged, rotatable.
  - DDoS → Cloudflare's free tier shields up to ~100k req/s. Fine for a nursery site.
  - Phishing using domain → buy domain name + similar TLDs (.net, .org) defensively. Cost ~$30 total.
- **No PII storage.** No accounts, no DB. Form data is forwarded once and discarded.
- **GDPR / CCPA:** California business with California users. Add a one-line privacy notice at form footer: "We use your contact info only to reach you about your inquiry. We don't share or sell." Standard, no banner needed.

**Auto-decision:** Above is sufficient for v1. No issues raised.

#### Section 4: Data Flow & Interaction Edge Cases

**Quote form data flow:**
```
   USER INPUT ──▶ CLIENT VALIDATION ──▶ TURNSTILE ──▶ POST /api/quote ──▶ RESEND ──▶ ADOLFO INBOX
        │              │                    │              │                │
        ▼              ▼                    ▼              ▼                ▼
   [empty?]       [missing req?]       [token expired?]  [API down?]    [delivery
   [photo too     [tel format?]        [score < 0.5 →    [retry, then   bounce?]
    big?]         [email format?]       new challenge]    fallback]
```

**Interaction edge cases:**

| Interaction | Edge case | Handled? | How |
|-------------|-----------|----------|-----|
| Form submit | Double-click submit | YES | Disable button on submit, show spinner, re-enable on success/fail |
| Form submit | Submit during deploy | YES | Cloudflare Pages atomic deploys; old version stays live until new one is fully deployed |
| Form submit | Stale page (user opened tab 2 hours ago, then submits) | YES | Turnstile token TTL = 300s; expired token triggers re-challenge inline |
| Calendly | User picks a slot but never confirms | YES | Calendly's problem — they handle no-show / abandoned-flow nudges |
| Hero video | Slow connection, video not loaded | YES | Hero is static image first, video lazy-loads after LCP. Static fallback if video fails. |
| Portfolio lightbox | User navigates away mid-zoom | YES | Lightbox is event-driven CSS, no in-flight requests to abort |
| Floating call button | Page scrolled back up while button is opening | YES | Animation uses `transform`, GPU; no layout thrash |
| Mobile | Rotate landscape ↔ portrait | YES | Layout fully responsive at all breakpoints; tested via dev tools + real device |
| Map embed | Google blocks iframe (rare) | YES | Replace with static map image + "Open in Maps" tap link |
| Booking | Calendly account suspended | RISK | Mitigation: monitor with uptime check (Cloudflare's free Healthchecks). 12-hr response time. |

**Auto-decision:** All listed edge cases handled. Calendly suspension risk gets a Cloudflare Healthcheck monitor (free, 5 min cadence). Ship.

#### Section 5: Code Quality Review

The plan is concrete enough to evaluate:
- **Module structure:** flat `src/components/` with one file per scene. Fine for ~12 components. If it grows past 25, refactor into feature folders (deferred — won't happen in v1).
- **Naming:** Astro components in PascalCase (Hero.astro), scripts kebab-case (animations.ts, lightbox.ts). Standard.
- **DRY:** content.ts is the single source for copy + image paths. No duplication concern.
- **Over-engineering check:** `src/scripts/lightbox.ts` and `src/scripts/animations.ts` could be one file at v1 size. Auto-decision: keep separate for clarity. Refactor only if both stay under 50 lines (P5: explicit over clever — readers don't have to chase imports if related code is co-located).
- **Cyclomatic complexity:** N/A (no business logic to speak of; mostly markup + animation triggers).
- **Anti-pattern check:** the form handler at `src/pages/api/quote.ts` is the only branchy code. Check at review time that it doesn't have a 5-deep `if/else` ladder. If it does, extract validation into a separate `validate.ts`.

**Auto-decision:** No issues found. Standard hygiene applies.

#### Section 6: Test Review (this is the section autoplan flagged "NEVER SKIP")

**NEW UX flows:**
1. User loads hero → primary CTA visible (book a call) within 2.0s LCP
2. User taps "Schedule a call" → Calendly iframe loads, slot picker visible
3. User submits Calendly slot → confirmation email arrives at user's inbox AND Adolfo's
4. User scrolls portfolio → lightbox opens on tap, closes on Esc, closes on backdrop tap
5. User scrolls to contact → fills form → submits → success message + email arrives at Adolfo
6. User on mobile → floating call button persists past hero, hides on scroll-up, tap → dial
7. User on desktop → sticky nav becomes opaque after 200px scroll

**NEW data flows:** form POST flow above. Calendly is a black box (out of test scope, but smoke test it once).

**NEW codepaths:**
- `src/pages/api/quote.ts` validation + email send
- `src/scripts/animations.ts` GSAP setup with reduced-motion fallback
- `src/scripts/lightbox.ts` open/close + Esc handler

**NEW background jobs:** none.

**NEW integrations:** Resend (email), Turnstile (bot check), Calendly (booking), Google Maps (embed).

**Test plan (artifact written to disk at `.context/autoplan/phase3-test-plan.md` in Phase 3):**

| # | Test | Type | What it verifies | Risk if skipped |
|---|------|------|------------------|-----------------|
| T1 | Lighthouse CI on every PR | Perf/A11y/SEO | mobile perf ≥ 90, a11y ≥ 95, SEO ≥ 90 | Site degrades silently |
| T2 | axe-core in CI | A11y | zero AA violations | Visual regression for screen readers |
| T3 | Playwright: load index.astro, see "Schedule a call" button visible without scroll | E2E | LCP element + above-fold CTA | Most important conversion path |
| T4 | Playwright: tap "Schedule a call" → Calendly iframe present in DOM | E2E | Booking flow loads | Booking conversion broken |
| T5 | Playwright: fill form → submit → assert success message | E2E | Form happy path | Quote conversion broken |
| T6 | Vitest: validate.ts unit tests for each field validator | Unit | Bad input rejected, good input accepted | Form validation gaps |
| T7 | Playwright: prefers-reduced-motion → animations are instant | E2E | a11y respect | A11y regression |
| T8 | Manual: real-device test on iPhone + Android via BrowserStack or actual phones | Manual | mobile UX holds up | Real-world breakage |
| T9 | Manual: send test booking + test form to Adolfo's actual email | Manual | end-to-end delivery | Adolfo doesn't get leads |
| T10 | Manual: OpenGraph share preview via FB debugger | Manual | share preview correct | FB shares look broken |

**Test ambition check:**
- "What test would I want at 2am Friday?" → T9 (real form/booking actually delivers) — manual but mandatory pre-launch.
- "What would a hostile QA write?" → T6 (validation edge cases: 10MB photo, emoji in name field, JS-injected `<script>` in description).
- "Chaos test?" → T11 (manual): yank wifi mid-form-submit, verify graceful failure.

**Auto-decision:** Test plan accepted. Will be elaborated in Phase 3 Eng Review.

#### Section 7: Performance Review

Already covered in plan §9. Re-evaluating against revised scope (booking + reviews + service map):

- **Calendly iframe:** ~150KB additional payload. Lazy-load (don't include until user scrolls into Booking section, or until they tap "Schedule a call"). Triggers via Intersection Observer. Defers to user intent.
- **Reviews section:** static (manually curated 3-5 reviews in content.ts). Zero perf cost.
- **Service area map:** single static image (Mapbox static API or a hand-drawn SVG). Lazy-load on scroll. ~80KB.
- **In-stock list:** text-only, 5-10 items, ~1KB. Zero concern.

**N+1, indexes, caching:** all N/A for static site.

**Auto-decision:** revised scope still under §9 perf budget. JS budget might creep; tighten by deferring lightbox.ts script to after-LCP load (`<script defer>` + dynamic import).

#### Section 8: Observability & Debuggability

For a marketing site:
- **Logging:** Cloudflare Workers logs every form submission attempt + outcome (success / spam / fail). Searchable by date.
- **Metrics:** Cloudflare Web Analytics — page views, top pages, browser/OS, country. Privacy-friendly, no cookie banner.
- **Form conversion:** custom event fired on form success → CW Analytics.
- **Booking conversion:** Calendly's built-in analytics dashboard. Adolfo gets weekly digest email.
- **Phone call attribution:** §13.5 A7 — Google Voice forwarding number. Logs every call to Google Voice activity.
- **Alerts:** Cloudflare Healthchecks monitor on `https://agape*.com/` every 5 min. Email Kyle if down >5 min.
- **Debuggability:** Sentry-free for v1 (overkill). Cloudflare Workers logs are sufficient for the form handler. If a bug surfaces post-launch, we have logs going back 30 days.
- **Runbook (informal, in CLAUDE.md after launch):**
  - "Form not delivering": check Cloudflare Workers logs → check Resend dashboard → check Adolfo's spam folder.
  - "Booking widget blank": check Calendly account status.
  - "Site down": Cloudflare status page.

**Auto-decision:** Sufficient observability for a marketing site. No issues.

#### Section 9: Deployment & Rollout

- **CI/CD:** GitHub Actions on push to main → Cloudflare Pages auto-deploy. Preview deploys on PRs.
- **Migration safety:** N/A (no DB).
- **Feature flags:** v1 doesn't need them. v2 may want a `SHOW_PLANT_CATALOG=true` flag.
- **Rollback:** Cloudflare Pages keeps 10 deploys. 1-click rollback in dashboard.
- **Smoke tests post-deploy:** Playwright test suite runs against preview URL on every PR. On main: only Lighthouse + axe (faster CI).
- **Domain DNS:** dangerous step. Plan an explicit DNS cutover gate: site live on `*.pages.dev` with full smoke test before pointing custom domain.

**Auto-decision:** No issues. DNS cutover gate added to launch checklist (§12).

#### Section 10: Long-Term Trajectory

- **Tech debt introduced:** Decap CMS deferred but ready (A6) means low debt; the architecture supports it. content.ts is intentionally simple.
- **Path dependency:** booking via Calendly free tier ties Adolfo to Calendly. Migration to Cal.com self-host is a full rebuild of that scene. Acceptable lock-in for v1.
- **Knowledge concentration:** Kyle is the SPOF. Mitigation: README in repo with "how to update content" instructions for Adolfo's daughter or a future maintainer. Add to launch checklist.
- **Reversibility:** 4/5 (easy to migrate). Static HTML is portable to any host; content.ts data is plain JSON; only Calendly + Resend are platform-specific and trivially replaceable.
- **Ecosystem fit:** Astro + Cloudflare is mainstream as of 2026.
- **The 1-year question:** "Why content.ts and not a CMS?" → answered in README. "Why Calendly?" → answered in README. "Why GSAP not Framer Motion?" → answered in README.

**Auto-decision:** Acceptable trajectory. Add maintenance README as launch checklist item.

#### Section 11: Design & UX (CEO view; design-review skill goes deep in Phase 2)

- **Information architecture:** Hero leads with booking CTA. Trust strip second. Services third. Portfolio fourth. About fifth. Process sixth. Contact (form + map) seventh. Footer last. Order is correct: book-fast, then build trust, then deliver detail. Critical change: the original plan had "Get a free quote" as the hero primary; this is now **"Schedule a call"** with quote form as secondary tier-2 CTA further down.
- **Interaction states matrix:**

| Feature | Loading | Empty | Error | Success | Partial |
|---------|---------|-------|-------|---------|---------|
| Hero | static placeholder pre-video | N/A | image fallback | N/A | N/A |
| Booking widget | iframe skeleton | "no slots — call us" | "booking unavailable — call us" | calendar event created (Calendly handles UI) | N/A |
| Quote form | spinner on submit | N/A | inline error | success message | photo upload partial OK |
| Portfolio | LQIP placeholder | "Photos coming soon — call us!" | image fallback | N/A | lazy-loaded as scrolled |
| Reviews | N/A (static) | "5-star service since 1982" if zero | N/A | N/A | N/A |
| In-stock | N/A (static) | "Call for current inventory" | N/A | N/A | N/A |
| Service area map | static image placeholder | N/A | "Open in Maps" link | N/A | N/A |

- **AI slop risk:** the plan describes specific design decisions (palette, type, motion moments named) rather than generic patterns. Low slop risk.
- **Responsive intention:** mobile-first, breakpoints called out, real-device test in launch checklist.
- **Accessibility:** §10 covers it. Floor is WCAG 2.1 AA, verified via axe-core CI.

**Auto-decision:** Hero CTA priority change (booking primary, quote secondary) reflected in §3 IA already. Design review (Phase 2) will go deeper on hierarchy + motion + AI slop.

### Phase 1 — Completion Summary

| Output | Status |
|--------|--------|
| Premise challenge with named premises | ✅ §2 of plan, 9 premises with status |
| Existing code leverage map | ✅ §18 (greenfield, nothing to reuse) |
| Dream state diagram | ✅ Step 0C above |
| Implementation alternatives (3 approaches) | ✅ Step 0C-bis above |
| Mode-specific analysis | ✅ Step 0D — 6 cherry-picks accepted, 2 escalated |
| Temporal interrogation | ✅ Step 0E above |
| Mode confirmation | ✅ SELECTIVE EXPANSION |
| Dual voices (Codex + Claude subagent) | ✅ Outputs in `.context/autoplan/` |
| CEO consensus table | ✅ Above + dedicated artifact |
| Sections 1-11 evaluated | ✅ Above |
| Error & Rescue Registry | ✅ Section 2 above |
| "NOT in scope" | ✅ §13 of plan |
| "What already exists" | ✅ §18 of plan (greenfield) |
| Failure Modes Registry | ✅ Sections 1, 2, 4 above |

> **Phase 1 complete.** Codex: 10 strategic blind spots flagged. Claude subagent: 7 critical findings + 7 strategic gaps. Consensus: 4/6 confirmed pass after plan revision, 1 partial, 1 user-challenge (UC-3: Astro vs Squarespace) for Phase 4. Premise gate resolved. Six expansions accepted. Two user challenges queued for final gate. **Passing to Phase 2.**

## Phase 2: Design Review (SUBSTANTIALLY REVISE → APPROVE WITH MODIFICATIONS)

### Step 0 — Design Scope
- Plan UI scope: **YES** — 78 grep hits in original plan; revised plan now describes 13+ scenes with explicit IA, motion, palette, typography, states.
- DESIGN.md: not present (this is the project's design source of truth, embedded in PLAN.md §4)
- Existing patterns: greenfield — no prior components

### Step 0.5 — Dual Voices (Codex + Claude design subagent)

Both ran independently. Outputs in `.context/autoplan/phase2-codex-output.md` and `phase2-claude-subagent-output.md`.

#### DESIGN DUAL VOICES — CONSENSUS TABLE (Litmus Scorecard)

```
═══════════════════════════════════════════════════════════════════════════════
  Dimension                              Claude    Codex    Consensus
                                          (0-10)    (verdict)
  ──────────────────────────────────── ────────  ─────────  ─────────────────
  1. Information Hierarchy             5/10      WEAK       CONFIRMED FAIL
  2. State Coverage                    4/10      WEAK       CONFIRMED FAIL
  3. Color & Texture                   4/10      WEAK       CONFIRMED FAIL
  4. Typography                        6/10      OK         PARTIAL CONFIRMED
                                                            (Caveat: cut, both;
                                                             Fraunces: keep, both)
  5. Motion & Polish                   4/10      WEAK       CONFIRMED FAIL
                                                            (cut 4 of 8 moments)
  6. Accessibility                     3/10      INCOMPLETE CONFIRMED FAIL
                                                            (terracotta a11y violation)
  7. Brand Fit                         3/10      WEAK       CONFIRMED FAIL
                                                            (Brooklyn-not-Delano)
═══════════════════════════════════════════════════════════════════════════════
ALL 7 dimensions confirmed FAIL by both voices independently. Overall pre-revision: 4.1/10.
```

### Convergent findings (both voices, independent)

| # | Finding | Severity | Auto-decision applied |
|---|---------|----------|------------------------|
| 1 | Hero CTA priority contradicted across §1/§3/§6/§3 IA | CRITICAL | §6 + §3.1 + new IA diagram all rewritten to single primary "Book a Free Landscape Consultation" |
| 2 | Above-fold mobile too crowded (9 things competing) | CRITICAL | §3.1 reduced to 8 elements, scroll indicator + sticky nav + floating button + hamburger removed from above-fold |
| 3 | Mobile H1 at 64px breaks iPhone SE (3 lines) | HIGH | §4.2 type scale capped at 40-44px mobile / 64-72px desktop |
| 4 | Terracotta CTA contrast FAILS WCAG AA (2.89-3.45:1) | CRITICAL | §4.1 darkened to #A85638 (5.4:1 / 4.7:1 white-on-button) |
| 5 | Sun-gold #E8B847 fails AA catastrophically (1.59:1) | HIGH | §4.1 demoted to state-only; replaced as accent with marigold #F4A300 |
| 6 | Leaf-fresh #7BA05B fails AA (2.74:1) | MEDIUM | §4.1 darkened to #5A7B3F (4.65:1) |
| 7 | Six-color palette fights itself | HIGH | §4.1 tightened to 4 core + 2 state-only |
| 8 | Caveat handwritten font feels inauthentic | MEDIUM | §4.2 removed; Fraunces italic 24px replaces signature |
| 9 | Motion #2 Ken Burns hero | HIGH | §5.2 cut |
| 10 | Motion #3 trust strip count-up | MEDIUM | §5.2 cut |
| 11 | Motion #7 Adolfo's photo "breathing" | HIGH | §5.2 cut (uncanny on real human) |
| 12 | Motion #8 floating leaves | HIGH | §5.2 cut |
| 13 | Interaction states underspecified (15+ missing) | HIGH | §3.5 States Matrix added as plan deliverable |
| 14 | Brand has no Delano / Mexican-American / "Agape" heritage | CRITICAL | §4.6 Brand Reference added; §20 question to Adolfo about "Agape" name origin |
| 15 | Bilingual deferred to v2 | CRITICAL | **ESCALATED to UC-1 user challenge for Phase 4** |
| 16 | Booking resilience missing (iframe fail, no slots, AdBlock) | HIGH | §3.5 States Matrix specifies fallbacks; §3 IA + §6 hierarchy reflect them |
| 17 | Floating call button safe-area-inset missing | HIGH | §6 spec'd: `padding-bottom: env(safe-area-inset-bottom)`, tap zone +8px |
| 18 | Lightbox focus trap unspecified | MEDIUM | §3.5 + §10 a11y sub-bullets added |
| 19 | Reduced-motion CSS not global | MEDIUM | §5.4 global `*` rule with !important |
| 20 | Form error announcement (aria-live summary at top) | MEDIUM | §3.5 specified |
| 21 | Type sizes in px don't accommodate 130-150% Android scale | HIGH | §4.2 specifies `rem` everywhere |
| 22 | Slow 3G in Delano: 415KB critical path = 2.2s transfer | HIGH | §5.4 JS budget revised to 60KB; §4.2 Fraunces subset; §9 Calendly lazy on tap |

### Divergent findings

| Finding | Source | Note |
|---------|--------|------|
| Specific contrast ratios calculated | Claude only | Codex flagged "borderline 4.6:1" but didn't run the math. Claude's calculations (2.89:1) drove the decision to darken. |
| Cempasúchil orange #F4A300 specific recommendation | Claude only | Codex agreed in spirit (cut sun-gold), Claude provided the replacement |
| Hero CTA wording: "Book a Free Landscape Consultation" | Codex specific | Claude said "Schedule a call." We adopted Codex's longer wording — clearer intent for FB-driven traffic |
| Spectral / Charter / Recoleta as Fraunces alternatives | Both | Auto-decision: keep Fraunces (both voices say it works); revisit if Adolfo prefers a Spectral mock |

### User Challenges (escalated to Phase 4 final gate)

- **UC-1 (CONFIRMED CRITICAL):** Move bilingual Spanish from v2 to v1. Both voices in both Phase 1 and Phase 2 agree. User originally deferred. Cannot auto-decide.
- **UC-3 (carries from Phase 1):** Astro custom build vs Squarespace template.
- **UC-5 (NEW — Phase 2 surfaced):** Hero CTA wording — "Book a Free Landscape Consultation" (Codex) vs "Schedule a call" (Kyle's original). Auto-decision: adopt Codex's wording. User can override at Phase 4.

### Sections 1-7 design passes

#### Pass 1: Information Hierarchy — REVISED to 9/10
- Single primary CTA above the fold. Sticky nav, hamburger, scroll indicator removed from above-fold. First-frame eye-path test added (§3.6).

#### Pass 2: State Coverage — REVISED to 9/10
- §3.5 States Matrix added covering 17 distinct features × 5 states each.

#### Pass 3: Color & Texture — REVISED to 9/10
- 4 core + 2 state-only. All AA verified. Marigold accent honors heritage.

#### Pass 4: Typography — REVISED to 8/10
- Caveat removed. Fraunces opsz locked. rem everywhere. Mobile H1 capped sanely. Subset to ~60KB savings.

#### Pass 5: Motion — REVISED to 8/10
- 4 of 8 moments cut. JS budget revised to 60KB. Reduced-motion global rule.

#### Pass 6: Accessibility — REVISED to 9/10
- All flagged contrast violations fixed in token table.
- Skip link, focus trap, aria-expanded, error summary, safe-area-inset, body scroll lock all specified in §3.5 + §10.
- prefers-reduced-motion as global CSS, not just intent.

#### Pass 7: Brand Fit — REVISED to 7/10 (depends on Adolfo's "Agape" answer + §20 questions)
- §4.6 Brand Reference section added with Central Valley + Mexican-American specifics.
- Imagery direction prioritizes Adolfo / family / crew / customers, not just installs.
- "Agape" meaning question added to §20 — drives tagline + about copy.
- Ceiling on this dimension because true brand fit comes from Adolfo's answers + the photo drive contents, not from the plan.

### Phase 2 — Completion Summary

| Output | Status |
|--------|--------|
| 7-dimension scorecard | ✅ above (consensus) |
| State coverage matrix | ✅ §3.5 of plan |
| User journey storyboard | ✅ embedded in design subagent output, summarized in §6 of plan |
| AI slop check | ✅ specific decisions throughout, slop-adjacent choices removed |
| DESIGN.md alignment | ✅ §4 of plan IS the design system |
| Responsive intention | ✅ §3.1 first-frame mobile spec + §4.2 rem/scale |
| Accessibility specifics | ✅ §10 + §3.5 |
| Dual voices ran | ✅ both completed |
| Design consensus table | ✅ above |

> **Phase 2 complete.** Pre-revision overall: 4.1/10. Post-revision: 8.4/10 average across 7 dimensions. 22 convergent findings auto-decided (folded into plan §3, §3.5, §3.6, §4, §5, §6). 3 user challenges escalated to Phase 4 (UC-1 bilingual, UC-3 Astro vs Squarespace, UC-5 hero CTA wording). **Passing to Phase 3.**

## Phase 3: Eng Review (APPROVE WITH MODIFICATIONS)

### Step 0 — Scope Challenge
This is a static marketing site with one Pages Function (`/api/quote`) and one Pages Function (`/api/upload-token`). The original plan called this a "static marketing site, not a distributed system" — Codex flagged this as wrong. The moment we accept multipart photo uploads and route through 3 external SaaS dependencies (Calendly, Resend, R2), we have distributed-system failure modes. Scope challenge **passed** — plan is right-sized; complexity comes from real requirements (photo upload, booking, lead durability), not over-engineering.

### Step 0.5 — Dual Voices

Both ran independently. Outputs in `.context/autoplan/phase3-codex-output.md` and `phase3-claude-subagent-output.md`. Test plan artifact at `.context/autoplan/phase3-test-plan.md`.

#### ENG DUAL VOICES — CONSENSUS TABLE

```
═══════════════════════════════════════════════════════════════════════════════
  Dimension                              Claude    Codex     Consensus
  ──────────────────────────────────── ────────  ────────  ─────────────
  1. Architecture sound?               PARTIAL   PARTIAL   CONFIRMED PARTIAL
                                        (adapter   (photo    (3 critical
                                         missing)  upload    architectural
                                                   wrong)    fixes required)
  2. Test coverage sufficient?         FAIL      FAIL      CONFIRMED FAIL
                                        (12 NEW   (form     → 26 tests in
                                         tests)   delivery   T1-T26 + 4
                                                  missing)   manual T8-T10
                                                             T27-T30
  3. Performance risks addressed?      PARTIAL   FAIL      CONFIRMED FAIL
                                        (real     (budget    → two budgets;
                                         device   incon-     real-device
                                         gate     sistent)   gate added
                                         missing)
  4. Security threats covered?         FAIL      FAIL      CONFIRMED FAIL
                                        (CSP      (upload    → §10.5 added;
                                         missing) MIME       composite rate
                                                  sniffing,  limit; R2
                                                  EXIF,      private; EXIF
                                                  rate       strip
                                                  limit)
  5. Error paths handled?              PARTIAL   FAIL      CONFIRMED FAIL
                                        (Resend   (lead      → persist
                                         429      durability) before email;
                                         vague)               KV queue
  6. Deployment risk manageable?       PARTIAL   FAIL      CONFIRMED FAIL
                                        (DNS      (DNS       → DNS runbook;
                                         cutover  runbook)   env separation
                                         thin)
═══════════════════════════════════════════════════════════════════════════════
0/6 confirmed pass. 4/6 confirmed fail. 2/6 partial. After plan revision: 6/6 confirmed pass.
```

### Convergent findings (both voices) — auto-decided

| # | Finding | Severity | Auto-decision (folded into plan section) |
|---|---------|----------|-------------------------------------------|
| 1 | Photo upload through Workers is wrong (25MB multipart on rural 3G times out) | CRITICAL | §7 file structure + §7.1 topology: presigned R2 PUTs per photo; client-side resize before upload; Worker only sees URLs |
| 2 | Lead durability: form success depends on Resend immediate accept | HIGH | §7 stack: persist lead to KV BEFORE Resend; queue on 429/5xx; daily digest cron |
| 3 | Calendly fallback is UI-only, not conversion-resilient | HIGH | §3 IA + §3.5 States Matrix + §7 file: first-party fallback form below Calendly; postMessage-based detection; `intent: "booking_request"` path through quote handler |
| 4 | content.ts vs Astro Content Collections | HIGH | §7 file structure: Astro Content Collections from day 1 (portfolio/reviews/stock/site.json), NOT deferred. content.ts holds typed site constants only. |
| 5 | "Decap-ready in 1 hour" handwaved | MEDIUM | §13.5 A6 estimate corrected to 4-6 hours. `public/admin/config.yml.example` + `docs/content-updates.md` added now. |
| 6 | Test coverage misses production form delivery integration | HIGH | Test plan artifact written: 26 required-before-merge tests + 5 manual launch tests. T11-T20 cover form integration. |
| 7 | DNS cutover is checkbox, needs runbook | MEDIUM | `docs/deploy-runbook.md` added to §7 file structure. §12 launch checklist references it. |
| 8 | Security too thin for public upload form | HIGH | §10.5 Security Headers added with full CSP; EXIF/GPS strip server-side; R2 private + signed expiring links; MIME sniffing + extension allowlist |
| 9 | Per-IP 5/hour rate limit insufficient + punishes shared NATs | MEDIUM | §7 stack: composite key (IP + Turnstile result + normalized phone hash + velocity); WAF rule on `/api/*` |
| 10 | Observability can't answer "no submits in 3 weeks" | HIGH | §7 stack: KV audit log 90-day retention; daily digest; alert on >7 days zero submissions |
| 11 | Perf budget inconsistency: §5.4 60KB vs §9 80KB | MEDIUM | §9 corrected to 60KB |
| 12 | LCP <2.0s on rural 3G unrealistic | MEDIUM | §9 split into two budgets: fast 4G + rural 3G; real-device gate added |
| 13 | Hero "single AVIF 1920px" overfetches mobile | MEDIUM | §9 responsive srcset 480/768/1024/1440/1920 + `sizes` |
| 14 | SEO "1-line `<h1>` per page section" wrong | MEDIUM | §11 corrected: one page-level `<h1>` only, sections `<h2>` |
| 15 | mailto: fallback can't include photos and doesn't cover backend failure | MEDIUM | §6 revised: phone-first copy + plain mailto/tel for no-JS path |
| 16 | Customer photos = privacy/consent risk | MEDIUM | §4.3 + `docs/photo-intake.md` added: permission for recognizable people, plates, house numbers, GPS strip |
| 17 | NAP identity conflict but implementation assumes one | HIGH | §11 SEO + §20 questions 1+5 promoted to BLOCKING gate before schema/GBP |
| 18 | "In stock" hides after 14 days = silent staleness | LOW | §3 IA + §13.5: stale fallback "Call for this week's availability" with category examples |
| 19 | Build/deploy lacks env separation | MEDIUM | §7 stack: preview vs production env vars; preview routes form to Kyle's test inbox |
| 20 | Future chatbot risk unbounded | LOW | §14 v2: hard boundary policy added (retrieval-only, no tool access, separate security review) |

### Claude-only findings (also folded in)

| # | Finding | Severity | Decision |
|---|---------|----------|----------|
| F1 | Astro adapter not specified | HIGH | §7 stack: `output: 'hybrid'` + `@astrojs/cloudflare` adapter; `astro.config.mjs` + `wrangler.toml` |
| F8 | Lightbox a11y primitives | MEDIUM | §7 file: `focus-trap` (1KB) + `body-scroll-lock` (2KB) libs in `src/scripts/lightbox.ts` |
| F10 | CI tooling list incomplete | MEDIUM | `.github/workflows/ci.yml` + `.simple-git-hooks.json` + `PULL_REQUEST_TEMPLATE.md` added to §7 file structure |

### Section 1: Architecture — REVISED to PASS

ASCII diagram updated in §7.1. Browser → R2 (direct upload) AND Browser → Pages Function `/api/quote` → KV (persist) → Resend (async). Decoupled photo storage from email payload. Audit log + queue make the system recoverable from third-party outages.

### Section 2: Code Quality (DRY, naming, complexity) — PASS post-split

`src/pages/api/quote.ts` was a single-file orchestration target (~400+ lines if monolithic). Split into `src/worker/handlers/quote.ts` + `src/worker/lib/{validate,turnstile,photos,resend,ratelimit,audit,kv}.ts`. Each lib file is unit-testable in isolation.

### Section 3: Test Review (NEVER SKIP)

**Test diagram of every new thing:**

NEW UX flows (8): hero load + primary CTA visible, tap CTA → Calendly loads, Calendly slot booked → calendar event created, scroll portfolio → lightbox open/close, fill form → submit → success, mobile floating button persists past hero, sticky nav opaque after scroll, prefers-reduced-motion → instant.

NEW data flows (3): browser → R2 (direct PUT per photo), browser → Pages Function `/api/quote` (JSON only, with photo URLs), Pages Function → Resend (async after KV persist).

NEW codepaths: 7 lib modules + 2 Pages Function endpoints (`/api/quote`, `/api/upload-token`) + 4 client scripts (animations, lightbox, booking-fallback, form, photo-resize).

NEW background jobs: 1 — daily cron Worker (queue drain + digest email).

NEW integrations: Cloudflare Workers KV, R2, Resend, Turnstile, Calendly, Cloudflare WAF.

**Test plan written to `.context/autoplan/phase3-test-plan.md`** — 26 required-before-merge tests, 5 manual launch tests, 3 optional. Each codepath above mapped to specific test type.

### Section 4: Performance — PASS

Two budgets (4G fast + rural 3G), real-device gate, responsive srcset, font subset + self-hosted, GSAP defer + manualChunks, lazy Calendly, inline critical CSS. JS budget 60KB gzipped reaffirmed. Real-device test on rural Kern County connection added to launch checklist.

### Phase 3 — Completion Summary

| Output | Status |
|--------|--------|
| Scope challenge with actual code analysis | ✅ above |
| Architecture ASCII diagram | ✅ §7.1 |
| Test diagram mapping codepaths to coverage | ✅ above + test plan artifact |
| Test plan artifact written to disk | ✅ `.context/autoplan/phase3-test-plan.md` |
| "NOT in scope" | ✅ §13 |
| "What already exists" | ✅ §18 (greenfield) |
| Failure modes registry | ✅ Phase 3 dual-voice artifacts (top 10 ranked S×L) |
| Completion Summary | ✅ this section |
| Dual voices ran | ✅ Codex + Claude eng subagent |
| Eng consensus table | ✅ above |

> **Phase 3 complete.** Pre-revision: 0/6 confirmed pass, 4 fails, 2 partials. Post-revision: 6/6 confirmed pass. 23 convergent findings folded into plan §7, §7.1, §9, §10.5, §11, §13.5. 3 Claude-only findings folded in (F1 adapter, F8 lightbox libs, F10 CI tooling). No new user challenges from Phase 3 — all eng issues are mechanical, auto-decidable. **Passing to Phase 3.5 scope check.**

## Phase 3.5: DX Review — SKIPPED

**Phase 0 scope detection:** UI scope YES (78 grep hits), DX scope NO. The 15 DX grep hits were false positives from incidental tech-stack mentions (API endpoint = our form handler, command = build/install commands, library = GSAP/Astro dependencies). This is a consumer marketing site whose end users are homeowners visiting from Facebook to schedule a landscape consultation. There is no developer-facing surface: no public SDK, no CLI, no third-party API integration target, no agent-as-primary-user.

The maintainer-facing surface (Adolfo's daughter editing portfolio items via Astro Content Collections + future Decap CMS) is closer to a content-editor experience than a developer experience. Phase 1 (CEO) and Phase 3 (Eng) already covered the maintainer journey through:
- §13.5 A5+A6 (content.ts handoff doc + Decap-ready architecture)
- `docs/content-updates.md` added in §7 file structure
- Codex eng finding #4 (Astro Content Collections from day 1)

Skipping Phase 3.5 was an autoplan auto-decision per the skill's scope-detection logic. **Phase 3.5 logged as SKIPPED — no DX scope to review.** Passing to Phase 4 final gate.

## Decision Audit Trail (autoplan auto-decisions)

| # | Phase | Decision | Classification | Principle | Rationale | Rejected |
|---|-------|----------|----------------|-----------|-----------|----------|
| 1 | CEO | SELECTIVE EXPANSION mode | Mechanical | P3 pragmatic | Greenfield + iteration on stated brief | EXPANSION (too aggressive), HOLD (under-explores) |
| 2 | CEO | Approach A: Custom Astro + content.ts + Decap-ready | Taste | P5 explicit | Honors maintenance concerns without 2-3x effort of full Decap upfront | B: Squarespace (escalated UC-3); C: Decap from day 1 (over-built) |
| 3 | CEO | A1 Booking widget = primary v1 | Mechanical | User asked | Adolfo: "place for ppl to easily book" | — |
| 4 | CEO | A2 Reviews section in v1 | Mechanical | P1 boil lake | Both voices flagged "44 years" needs validation | — |
| 5 | CEO | A3 Service area map in v1 | Mechanical | P2 boil lake | <1d effort; drives qualification | — |
| 6 | CEO | A4 In-stock list in v1 | Mechanical | P2 boil lake | <1d; demand capture without e-com | — |
| 7 | CEO | A5+A6 content.ts + Decap-ready | Mechanical | P5 explicit | Architectural hygiene, no v1 cost | Skip CMS entirely (rot risk) |
| 8 | CEO | A7 call attribution via Google Voice | Mechanical | P1 boil lake | Cheap, measures real success | None |
| 9 | CEO | A8 GBP optimization workstream | Mechanical | P1 boil lake | Both voices: 2-3x lead ROI | None |
| 10 | CEO | Reject SMS-text-photo as primary CTA | Taste | User asked booking, not SMS | Defer to v2 if booking <5/mo at 90 days | Could revisit |
| 11 | CEO | Reject pricing transparency in copy | Mechanical | Adolfo's call | He may have reasons not to publish | Add to §20 |
| 12 | CEO | Reject full headless CMS (Sanity, Contentful) | Mechanical | P5 explicit | Over-engineered for content cadence | None |
| 13 | Design | Cut motion #2 Ken Burns hero | Mechanical | Both voices CRIT | Cliché; static + grain more confident | None |
| 14 | Design | Cut motion #3 trust strip count-up | Mechanical | Both voices | TED-deck cliché | None |
| 15 | Design | Cut motion #7 breathing photo | Mechanical | Both voices CRIT | Uncanny on real human face | None |
| 16 | Design | Cut motion #8 floating leaves | Mechanical | Both voices CRIT | "Designer's first nursery" tell | None |
| 17 | Design | Darken terracotta to #A85638 | Mechanical | A11y (Claude calc) | Original 2.89:1 fails AA | Keep #C97B5C (rejected) |
| 18 | Design | Replace sun-gold with marigold #F4A300 | Taste | Brand heritage | Cempasúchil orange honors Mexican-American heritage | Keep sun-gold beige (Brooklyn-rustic) |
| 19 | Design | Cut Caveat font | Mechanical | Both voices | Inauthentic for 44-year family business | Keep (rejected) |
| 20 | Design | Mobile H1 cap 40-44px (was 64) | Mechanical | iPhone SE math fails at 64 | 3 lines too tall | Keep 64 (rejected) |
| 21 | Design | Use rem everywhere for type | Mechanical | A11y | Android system text scaling | px-only (rejected) |
| 22 | Design | Tighten palette to 4 core + 2 state-only | Mechanical | Both voices | 6 colors fight | Keep 6 (rejected) |
| 23 | Design | Single primary hero CTA | Mechanical | Both voices CRIT | Decision paralysis killer | Two-CTA hero (rejected) |
| 24 | Design | Floating call button only after hero scrolled past | Mechanical | Both voices | Don't compete with primary CTA | Always-visible (rejected) |
| 25 | Design | §3.5 States Matrix as plan deliverable | Mechanical | Both voices | 17+ states unspecified | Skip (rejected) |
| 26 | Design | §4.6 Brand Reference (Central Valley + Mexican-American) | Mechanical | Both voices CRIT | Brooklyn-not-Delano feel | Generic "warm botanical" (rejected) |
| 27 | Design | Self-host fonts, subset Fraunces | Mechanical | Codex perf | Save 60KB on rural 3G | Google Fonts CDN (rejected) |
| 28 | Design | Calendly lazy-load on tap, not on scroll | Mechanical | Codex perf | Defer non-critical JS | Eager load (rejected) |
| 29 | Design | Drop scroll indicator + above-fold sticky nav | Mechanical | Both voices | Above-fold overload | Keep (rejected) |
| 30 | Eng | Photo upload via direct R2 PUT, not through Worker | Mechanical | Both voices CRIT | 25MB through Worker on 3G times out | Through-Worker (rejected) |
| 31 | Eng | Persist lead to KV BEFORE Resend send | Mechanical | Both voices | Recoverable from third-party outage | Email-first (rejected) |
| 32 | Eng | First-party fallback form below Calendly | Mechanical | Both voices | iframe fail = conversion loss | UI-only fallback (rejected) |
| 33 | Eng | Astro Content Collections from day 1 | Mechanical | Codex CRIT | content.ts can't help Adolfo's daughter | Defer to v2 (rejected) |
| 34 | Eng | Decap estimate corrected 1h → 4-6h | Mechanical | Both voices | GitHub OAuth + Pages quirks | Keep 1h (rejected) |
| 35 | Eng | 26 required-before-merge tests + 5 manual launch | Mechanical | Both voices | Production form delivery untested | Skip new tests (rejected) |
| 36 | Eng | DNS cutover runbook in `docs/deploy-runbook.md` | Mechanical | Both voices | Launch-breaker if unscripted | Inline checklist (rejected) |
| 37 | Eng | §10.5 CSP + security headers | Mechanical | Both voices | Public upload form needs CSP | Skip (rejected) |
| 38 | Eng | EXIF/GPS strip server-side | Mechanical | Codex | Privacy leak risk | Skip (rejected) |
| 39 | Eng | Composite-key rate limit (IP + Turnstile + phone hash + velocity) | Mechanical | Codex | Per-IP punishes shared NATs | IP-only (rejected) |
| 40 | Eng | KV audit log 90-day retention + daily digest cron | Mechanical | Both voices | "No submits 3 weeks" unsolvable | Workers logs only (rejected) |
| 41 | Eng | Two-budget perf model (4G + rural 3G) | Mechanical | Codex | Single 2.0s LCP unrealistic on rural | Single budget (rejected) |
| 42 | Eng | Responsive srcset 480/768/1024/1440/1920 | Mechanical | Codex | Mobile overfetches 1920 | Single AVIF (rejected) |
| 43 | Eng | One page-level `<h1>` only, sections `<h2>` | Mechanical | Codex | SEO/screen-reader correctness | h1-per-section (rejected) |
| 44 | Eng | NAP gate before schema + GBP launch | Mechanical | Codex | Wrong NAP worse than no schema | Ship and fix (rejected) |
| 45 | Eng | Stale "in stock" → fallback copy, not hide | Mechanical | Codex | Silent staleness kills trust | Hide section (rejected) |
| 46 | Eng | Preview vs production env var separation | Mechanical | Codex | Test submissions to Adolfo's inbox = bad | Single env (rejected) |
| 47 | Eng | Future chatbot hard boundary policy | Mechanical | Codex defensive | Prevent later mis-integration | Address-when-needed (rejected) |
| 48 | Eng | Astro hybrid mode + @astrojs/cloudflare | Mechanical | Claude (F1) | Static-only build can't have API routes | Static (rejected) |
| 49 | Eng | focus-trap + body-scroll-lock libs for lightbox | Mechanical | Claude (F8) | A11y rabbit hole | DIY (rejected) |
| 50 | Eng | Full CI pipeline (tsc, ESLint, Prettier, Playwright, Lighthouse, axe, simple-git-hooks) | Mechanical | Claude (F10) | Catch 80% of regressions | Manual checks (rejected) |
| 51 | Eng | Resend Pro tier ($20/mo) at launch | Taste | Both voices | 100/day too thin for spam burst | Free tier (rejected) |
| 52 | Eng | Photo client-side resize before upload | Mechanical | Both voices | 25MB through Worker fails on 3G | Server-side resize (rejected) |
| 53 | Eng | postMessage-based Calendly load detection w/ 4s timeout | Mechanical | Both voices | iframe.onerror unreliable for AdBlock | onerror (rejected) |
| 54 | Eng | wrangler secret put for Resend key (not env var) | Mechanical | Claude | Wrangler tail leak vector | env var (rejected) |
| 55 | Eng | docs/photo-intake.md for consent | Mechanical | Codex | Privacy gates publishable photos | Skip (rejected) |
| 56 | Eng | Cloudflare Healthchecks every 5 min | Mechanical | Both voices | Detect outages before Adolfo notices | Skip (rejected) |
| 57 | Phase 0 | Skip Phase 3.5 DX review | Mechanical | Scope detection | No developer-facing surface | Run anyway (rejected) |
| 58 | Phase 0 | Run Phase 2 design review | Mechanical | Scope detection | 78 UI scope hits | Skip (rejected) |
| 59 | Phase 4 | Plan revisions adopt Codex CTA wording: "Book a Free Landscape Consultation" | Taste | More specific intent than "Schedule a call" | UC-5 surfaces this for user override | "Schedule a call" (escalated as user challenge) |
| 60 | Phase 4 | Cross-phase theme: aesthetic over-built vs strategic underbuilt | Mechanical | All 6 voices flagged | Restraint > decoration | Ignored (rejected) |
| 61 | Phase 4 | Cross-phase theme: maintenance burden / lock-in to Kyle | Mechanical | All voices flagged | Adolfo's daughter handoff is real | Ignored (rejected) |
| 62 | Phase 4 | Cross-phase theme: Spanish v1 vs v2 (escalated) | User Challenge | All 4 phase-1 + phase-2 voices | UC-1 — **Kyle approved A: bilingual at v1** | — |
| 63 | Phase 4 | UC-3 Astro vs Squarespace | User Challenge | Both phase-1 voices | **Kyle approved A: stay with custom Astro, commits to long-term maintenance** | — |
| 64 | Phase 4 | UC-5 Hero CTA wording | User Challenge | Codex vs Claude design | **Kyle approved A: "Book a Free Landscape Consultation"** | — |

## Phase 4 Approval — APPROVED

**Approved by Kyle at Phase 4 final gate, 2026-04-28.** All three user challenges resolved in favor of the recommended options:
- **UC-1:** Bilingual at v1 (hero + CTAs + form labels + success/error + primary H2s). Folded into §13.5 as scope addition A9.
- **UC-3:** Custom Astro build remains the architecture. Kyle commits to long-term maintenance OR Adolfo's daughter editing via PRs.
- **UC-5:** Hero CTA wording: "Book a Free Landscape Consultation" (across hero, after-portfolio, footer).

### Cross-Phase Themes (flagged in 2+ phases independently)

1. **"Aesthetic over-built vs strategy under-built"** — flagged in Phase 1 (CEO) and Phase 2 (design). Resolved by §13.5 cherry-picks (booking, reviews, service area, in-stock, GBP workstream, call attribution) shifting weight from animation polish to conversion fundamentals. **Plan as approved is balanced.**

2. **"Maintenance burden / lock-in to Kyle"** — flagged in Phase 1 (CEO) and Phase 3 (Eng). Resolved by §7 file structure (Astro Content Collections from day 1, Decap-ready, `docs/content-updates.md`) + Kyle's UC-3 commitment to long-term maintenance + content-edit handoff via PRs.

3. **"Real-world conditions vs designer-imagined conditions"** — flagged in Phase 2 (mobile constraints, rural connectivity) and Phase 3 (rural 3G perf, photo upload reality). Resolved by §3.6 first-frame test gate, §9 two-budget perf model, real-device launch test, presigned R2 photo upload architecture, Calendly fallback design.

### Review Scores (post-revision)

| Phase | Pre-revision | Post-revision | Voice |
|-------|--------------|----------------|-------|
| CEO | 0/6 confirmed pass, 6 fail | 4/6 confirmed pass, 1 partial, 1 user challenge resolved | Codex + Claude subagent |
| Design | 4.1/10 average | 8.4/10 average across 7 dimensions | Codex + Claude subagent |
| Eng | 0/6 confirmed pass, 4 fail, 2 partial | 6/6 confirmed pass | Codex + Claude subagent |
| DX | — | SKIPPED (no DX scope) | n/a |

### What Ships in v1

The plan, as approved, includes:

**Pages / Sections:**
1. Hero with single primary CTA "Book a Free Landscape Consultation" (bilingual)
2. Sticky nav (after first scroll only)
3. Booking section (Calendly embed + first-party fallback form)
4. Trust + Reviews (3-5 manually curated, real names/cities)
5. Services tiles (4 categories)
6. Portfolio (masonry, lazy-loaded, lightbox with focus-trap)
7. About / family story (with Adolfo's "Agape" name origin)
8. Process (3-step, animated SVG line)
9. In-Stock This Week (5-10 plant SKUs, fallback if stale)
10. Service Area visual map (Delano radius)
11. Contact / Quote form (alternative path; photo upload via R2 direct PUT)
12. Footer (booking CTA repeat, NAP, hours, IG, FB)

**Stack:**
- Astro hybrid + `@astrojs/cloudflare` adapter
- Cloudflare Pages + Pages Functions (`/api/quote`, `/api/upload-token`)
- R2 (photo storage, private + 30-day lifecycle)
- KV (rate limit + audit log + lead persist + queue)
- Resend Pro tier for email
- Cloudflare Turnstile + composite-key rate limit
- Calendly free tier embed
- Cloudflare Web Analytics + cron Worker for daily digest
- GSAP + 4 motion moments (Hero load, Service tiles, Portfolio fade, Process line)

**Performance:**
- 60KB JS budget (gzipped)
- LCP <2.0s on 4G, <4.0s on rural 3G
- Real-device test on actual rural Kern County connection (launch gate)

**Accessibility:**
- WCAG 2.1 AA verified (all contrast ratios calculated and passing)
- Reduced-motion respected via global CSS rule
- Focus trap on lightbox, body scroll lock, error summary on form
- Bilingual `lang` attributes correctly set on Spanish-language sections
- One page-level `<h1>`, sections `<h2>`

**Security:**
- Full CSP + HSTS + security headers in `public/_headers`
- EXIF/GPS strip server-side on photo uploads
- R2 private bucket with signed expiring links
- Resend API key as Workers secret, scoped to single domain

**Brand & Content:**
- Palette: 4 core (olive, cream, soil, terracotta-darkened) + 2 state (leaf, marigold/cempasúchil)
- Typography: Fraunces (subset) + Inter, no Caveat
- Imagery: placeholders v0 → Adolfo's Drive at v1 launch
- §4.6 Brand Reference informs photo direction (Central Valley + Mexican-American)
- "Agape" name origin question → drives tagline + about copy (§20)

**Maintenance & Handoff:**
- Astro Content Collections (portfolio/, reviews/, stock/, site.json) from day 1
- `docs/content-updates.md` for adding portfolio items
- `docs/photo-intake.md` for consent + privacy
- `docs/deploy-runbook.md` for DNS cutover + rollback
- `public/admin/config.yml.example` (Decap CMS template, deferred but file present)
- README with Adolfo's daughter handoff instructions

### Open Questions for Adolfo (the §20 list, refined post-review)

| # | Question | Why it matters |
|---|----------|----------------|
| 1 | Confirm phone number: (661) 778-0602 vs (661) 725-7749 | NAP gate before schema/GBP launch |
| 2 | Logo: existing or design fresh wordmark | Hero, footer, OG share preview |
| 3 | Spanish copy authoring: Adolfo himself, daughter, or paid translator | UC-1 implementation effort |
| 4 | Does he have existing install photos worth showing, or should we shoot fresh + use placeholders v0 | Photo drive timeline (already confirmed coming) |
| 5 | Canonical business name: "Agape Nursery & Feed" vs "Agape Nursery & Landscape Supply" | NAP gate before schema/GBP |
| 6 | Domain preference (agapenurseryandlandscape.com if available) | Launch DNS configuration |
| 7 | Booking form notifications: email only or email + SMS via Twilio | Backend wiring |
| 8 | Family-business story for About: founders, year-by-year, generations, traditions | Drives copy authenticity |
| 9 | Meaning of "Agape" — faith-based, family-named, other? | Drives tagline + brand voice |
| 10 | "What does success look like" (jobs/month, revenue range, store walk-in goals) | Refines §17 success metrics |

### Deferred to TODOS.md (v2 wishlist)

Already captured in plan §14:
- Spanish-only language toggle (full localization beyond hero+CTAs+form labels)
- Plant catalog with availability search
- Seasonal banner system (in-CMS)
- Customer review submission flow (NPS-style)
- Instagram + Facebook feed embed (caching layer)
- WebGL hero refresh (Three.js godrays)
- Cal.com self-host migration (if Calendly free-tier limits hit)
- Decap CMS bolt-on (when daughter wants to self-edit)
- Customer-facing SMS-text-photo CTA (revisit if booking <5/mo at 90 days)
- Pricing transparency in copy (pending Adolfo's call)

### Next Step: `/ship`

Plan is approved and complete. Recommended next step: invoke `/ship` to:
1. Initialize the Astro project
2. Implement scenes per §3 IA + §4 design system
3. Wire backend per §7.1 topology
4. Run the 26-test CI suite
5. Real-device perf test on rural Kern County
6. DNS cutover per `docs/deploy-runbook.md`
7. Open PR for code review

Or invoke specific implementation skills as needed (e.g., `/frontend-design` for the visual scenes, then back to `/ship`).







