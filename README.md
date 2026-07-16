# Vipul Dabaria — Portfolio

A premium, dark-mode personal portfolio built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and Framer Motion. The visual identity is graphite/titanium surfaces, warm-white type, a restrained brass accent, and an electric-blue used only for research/data contexts — built around a recurring circuit-trace and single-line-diagram motif rather than generic template patterns.

## Stack

- **Next.js 15** (App Router, React Server Components)
- **TypeScript** (strict mode)
- **Tailwind CSS** with a custom design-token system (`tailwind.config.ts`)
- **Framer Motion** for scroll reveals, page transitions, tilt interactions, and animated diagrams
- **react-hook-form** for the contact form
- **lucide-react** for icons

## Photography — dropping in your real images

Every page now has reserved, captioned photo slots (`FigureFrame`) instead of
generic dashed placeholders — they're already positioned, sized, and captioned
for real photographs. To drop your images in:

1. Add the image file to `public/images/` (e.g. `public/images/pgcil-switchyard.jpg`).
2. Find the matching `<FigureFrame>` in the relevant page (search by its caption
   text — e.g. `"220kV Air-Insulated Switchyard"` in `app/experience/page.tsx`).
3. Replace the placeholder body inside `components/ui/FigureFrame.tsx`'s
   "Photo pending" block with a real `next/image`, or — simpler — pass an
   `src` prop through and conditionally render `<Image>` vs. the placeholder
   (the component is intentionally small; this is a five-minute change once
   you have the actual files).

Where photos live right now, and what each is reserved for:

- **`/experience`** — three large split-screen sections (PGCIL switchyard, NTPC
  turbine hall, IIT Kharagpur research desk), each pairing a `FigureFrame` with
  narrative text pulled from `data/experience.ts`.
- **`/projects/urban-pulse`** — a build-documentation section plus a captioned
  bento gallery (prototype, PCB close-up, demo footage, jury round, dashboard).
- **`/research/pinn-inertia-estimation`** — a "research desk" split-screen up
  top, plus supporting `MediaPlaceholder` frames for plots/graphs further down.
- **`/achievements`** — an exhibition wall (`AchievementsExhibition`) pairing
  each award with a photo, and a certificate strip.
- **`/about`** — a portrait slot plus a three-photo "workshop moments" strip.
- **`/contact`** — a single workspace/desk photo leading the contact column.

## Design system

- **Typography**: Instrument Sans for display, Inter for body, IBM Plex Mono for data/labels — loaded via `next/font/google` in `app/layout.tsx`.
- **Color**: a deep graphite/navy palette — never pure black. `ink-950` (`#090B10`) is the primary page background, cards (`ink-800`) step up in clear stages rather than blending into it, text is off-white (`paper`), the one deliberate accent is electric blue (`signal`, `#3B82F6`), a cool slate (`trace`) carries secondary/research context, and a warm gold (`gold`) is reserved *exclusively* for engineering-achievement moments (the Achievements page, Urban Pulse's award/patent callouts) — it does not appear anywhere else on the site. All defined in `tailwind.config.ts` — token *names* are unchanged across every design pass, only values, so components never needed touching.
- **Lighting, not color.** The body background is two soft ambient blue radial glows plus a gentle vignette — tuned to be felt rather than consciously noticed as "a gradient."
- **Depth**: every elevated surface (`shadow-soft` / `shadow-elevated` / `shadow-panel`) composes an ambient shadow, a tighter contact shadow, and an inset top-edge specular highlight together — not one flat drop-shadow standing in for "elevation."
- **Spatial UI**: `components/ui/SpatialPanel.tsx` renders the floating "instrument dashboard" panels — dense glass (`.glass-panel`) with a real ambient+contact shadow pair, idle vertical float, and whole-viewport pointer parallax capped at 1–3° of rotation (per spec: mouse movement should never produce more than a few degrees of tilt). Used in exactly three places: the Hero (PGCIL + NTPC readouts), the Urban Pulse case study (live sensor dashboard), and the PINN case study (training dashboard) — each panel's row labels match the exact engineering readouts specified for it.
- **Drafting marks**: `components/ui/DraftingMarks.tsx` — quiet corner registration marks borrowed from architectural/blueprint drawings, used on page headers only.
- **Micro-interactions**:
  - `components/ui/Magnetic.tsx` — primary/secondary buttons pull a few pixels toward the cursor, over-damped so there's no bounce or overshoot.
  - `components/ui/TiltCard.tsx` — pointer-tracked 3D tilt capped at 2.5° + specular glare, used on achievement cards and featured metrics.
  - `components/ui/SpotlightCard.tsx` — a genuinely cursor-reactive glass card: a soft radial highlight tracks the pointer within the card's own bounds (not just a whole-page glow), composed with a light tilt. Used on project cards, snippet cards, and Urban Pulse's capability cards — the "every card should feel alive" primitive.
  - `components/ui/SpatialPanel.tsx` — the floating instrument-dashboard panel. Now uses `.widget-light`, matching the macOS Notification Center widget material (Calendar/Weather-widget style: a genuinely light frosted card, not dark glass) as its default, with an optional hero-stat layout — the first row renders large like a Weather widget's temperature, the rest compact below.
  - `components/project/ProductTabs.tsx` / `CinematicFeature.tsx` — the Urban Pulse page is now structured like an Apple product page: a sticky pill tab bar (Overview / Architecture / Build Log / Gallery / Recognition) that tracks scroll position, plus a full-bleed "headline directly on the photo" feature section in the Apple marketing-page style.
  - `components/ui/FigureFrame.tsx` — the reserved-photo primitive: a captioned, corner-registration-marked frame ("Fig. 01 — ...") standing in for a real photograph until one is supplied. Used across Experience, Urban Pulse, Research, Achievements, About, and Contact.
  - `components/ui/SplitStory.tsx` — the alternating split-screen (photo one side, narrative the other) building block behind the Experience "field journal" and Urban Pulse's build documentation.
  - `components/sections/AchievementsExhibition.tsx` — an asymmetric exhibition-wall gallery (one featured, larger exhibit + supporting ones) replacing the plain achievement card list on the dedicated Achievements page. `AchievementsGrid` (the original compact card version) is kept for the homepage teaser, where a exhibition-scale layout wouldn't fit.
  - `components/ui/MeshGradient.tsx` — layered, independently-drifting soft color blobs (never a visible single gradient) used behind the Hero and the Urban Pulse / PINN page headers, each with its own palette variant.
  - `components/sections/SkillsConstellation.tsx` — replaces a static pill grid with a real node-and-line diagram per skill category; hovering a node highlights its connection and reveals the label below the diagram (kept out of the SVG itself deliberately, to avoid long skill names ever overlapping or clipping).
  - `components/research/EquationBlock.tsx` — styled physics/loss equations on the PINN case study, giving it real scientific-publication texture instead of placeholder graphics standing in for every visual.
  - `components/ui/FloatingParticles.tsx` — a barely-visible drifting particle field behind the hero.
  - `SchematicDivider`, `UrbanPulseArchitecture`, and `PinnArchitectureDiagram` carry a continuously animated signal-flow along their traces, plus hover/focus-driven detail panels on diagram nodes.
  - `.zoom-frame` gives media placeholders a slow, editorial hover-zoom.
  - `components/ui/ScrollCue.tsx` — a quiet "scroll" indicator at the base of the hero.
  - `components/ui/BackToTop.tsx` — a floating widget-material button that appears after scrolling past one viewport, given several pages (Experience, Urban Pulse, Achievements) are now considerably longer than a single screen.
  - Every animation respects `prefers-reduced-motion`; parallax/magnetic effects are gated to fine-pointer devices.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/                      Route segments (App Router)
  page.tsx                 Homepage
  about/                   About page
  experience/               Full experience timeline + leadership
  projects/                 Projects index
    urban-pulse/             Featured project deep-dive
  research/                  Research index
    pinn-inertia-estimation/  PINN research case study
  publications/              Publications placeholder
  achievements/               Achievements + certifications
  photography/                 Photo gallery
  thoughts/                     Micro-blog
  snippets/                      Code/insight snippets
  resume/                          Resume page
  contact/                          Contact page
  layout.tsx                Root layout: fonts, metadata, chrome
  template.tsx               Page-transition wrapper
  loading.tsx                 Route-level loading UI
  globals.css                  Design tokens, base styles, utilities
  sitemap.ts / robots.ts        SEO

components/
  layout/                   Navbar, Footer, ScrollProgress, CursorGlow
  ui/                        Reusable primitives (Button, Badge, Section, Reveal,
                              StatCounter, MediaPlaceholder, SchematicDivider,
                              PageHeader, DraftingMarks, TiltCard, Magnetic,
                              FloatingParticles, SpatialPanel)
  sections/                  Homepage/section-level building blocks, expandable
                              experience timeline
  project/                    Project + snippet cards, Urban Pulse architecture diagram
  research/                    PINN architecture diagram

data/                       All content lives here as typed TS objects —
                             edit these files to update copy without touching components.
```

## Content editing

Almost everything on the site is data-driven. To update copy, edit the files in `data/`:

- `site.ts` — name, tagline, bio, nav links, socials
- `experience.ts` — internships (with responsibilities, systems, technologies, and outcomes for each) + leadership role
- `projects.ts` — Urban Pulse + other projects
- `research.ts` — PINN case-study content, research interests
- `skills.ts` — skills, achievements, certifications, homepage stats
- `thoughts.ts` — micro-blog posts
- `snippets.ts` — code/insight snippets
- `photography.ts` — gallery captions

Each internship in `experience.ts` renders as an expandable "engineering brief" (`components/sections/ExperienceTimeline.tsx`) with four fields worth knowing:

- `responsibilities` — what you actually did, day to day
- `systems` — equipment/infrastructure you worked with or observed
- `technologies` — tools, software, and technical methods used
- `outcomes` — what you learned or produced, in outcome terms

## Replacing placeholders

- **Resume PDF**: add your file at `public/resume/vipul-dabaria-resume.pdf` — the `/resume` page already links to it.
- **Images/video**: every `<MediaPlaceholder />` is a dashed-border placeholder block. Swap it for a real `next/image` / `<video>` element once you have the asset.
- **Contact form**: `components/sections/ContactForm.tsx` currently just logs to console. Wire the `onSubmit` handler to an API route, Formspree, Resend, or similar before deploying.
- **GitHub links**: replace the placeholder `github.com/vipuldabaria/...` URLs in `data/projects.ts` and `data/snippets.ts` with real repo links.
- **Domain**: update `site.domain` in `data/site.ts` — it feeds `metadataBase`, the sitemap, and robots.txt.

## Deploying to Vercel

```bash
npm run build   # sanity check locally
```

Push to GitHub and import the repo in Vercel, or run `vercel` from the project root. No environment variables are required unless you wire up the contact form to a backend.

## Accessibility & performance notes

- Skip-to-content link, visible focus rings, and `prefers-reduced-motion` support are built in.
- All pages are statically generated.
- Cursor glow and floating particles are disabled on touch devices / reduced-motion, respectively.
- Diagram nodes are keyboard-focusable (`tabIndex`, `role="button"`, `aria-label`) so the interactive detail panels work without a mouse.

