# Project Context: Folio 2026

**Status:** Pre-launch v1 — interactive desktop portfolio + case study routes. Ready for visual launch; SEO and global metadata need a pass before production indexing.

**Owner:** Akash Parmar — Full Stack Developer (India)

**Contact:** akashparmar6561@gmail.com · GitHub `Akash-cloud001` · LinkedIn / X linked from About

---

## Overview

Folio 2026 is an interactive developer portfolio that mimics a desktop operating system. Users explore work through a draggable IDE-style file tree and overlapping application windows on a WebGL dither background—not a traditional scroll-based landing page.

A parallel **case study** area uses standard Next.js App Router pages (article layout, server metadata, crawlable HTML) for long-form CTO/project write-ups.

**Prior portfolio:** Folio 2025 lives at [2025.akash-codes.in](https://2025.akash-codes.in/), surfaced on the desktop via `FOLIO-2025.url` (video preview window).

---

## Technology Stack

| Layer | Choice |
|--------|--------|
| Framework | React 19, Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4, `clsx`, `tailwind-merge`, CVA |
| Animation | `framer-motion` / `motion` |
| 3D / WebGL | `three`, `@react-three/fiber`, `@react-three/postprocessing` — `DitherBackground` |
| State | Zustand (`github.store`, `projects.store`) |
| UI primitives | Radix UI (accordion, scroll-area, slot), shadcn-style components |
| Icons | `lucide-react`, `tech-stack-icons`, custom SVGs |
| Fonts | Geist Sans + Geist Mono (`next/font`) |

**Scripts:** `npm run dev` · `npm run build` · `npm run start` · `npm run lint`

---

## Architecture

### Desktop OS metaphor (home `/`)

| Piece | Role |
|--------|------|
| `Desktop.tsx` | Full-viewport shell, WebGL background, drag bounds context |
| `FileTreeNav.tsx` | Primary nav — opens windows or `router.push` to case studies |
| `Window.tsx` | Draggable, focusable, z-indexed panels; mobile disables drag |
| `page.tsx` | Client-only orchestration: window state, open/close/focus |

**Window apps (sections):**

| Window ID | Title | Component | Default open |
|-----------|--------|-----------|--------------|
| `about` | `ABOUT_ME.txt` | `About` | No |
| `experience` | `EXPERIENCE.log` | `Experience` | No |
| `projects` | `PROJECTS.DB` | `Projects` | Yes |
| `folio-2025` | `FOLIO-2025.url` | `Folio2025Card` | Yes (hidden on `< md`) |
| `contact` | `CONTACT.msg` | `Contact` | No |
| `skills` | `SKILLS.txt` | `Skills` | No |

`Hero` (`WELCOME.exe`) exists but is **commented out** in `page.tsx`.

**Z-index:** Windows cap at `9990`; file tree uses high stacking so it stays tappable.

### Data flow (clean layering)

```
Component → Zustand store → Service → API / static JSON
```

- **GitHub:** `About` → `useGitHubStore` → `githubService` → GitHub REST + contributions API (`Akash-cloud001`)
- **Projects:** `Projects` → `useProjectsStore` → `projectsService` → `/public/projects.json`

### Case studies (`/case-studies/*`)

| Route | Page | Metadata |
|--------|------|----------|
| `/case-studies` | Index grid | Basic title + description |
| `/case-studies/folio-2026` | Self case study | Rich title, description, keywords |
| `/case-studies/tradzu` | Tradzu CTO write-up | Rich metadata |
| `/case-studies/my-forex-firms` | MyForexFirms | Rich metadata |
| `/case-studies/nestingo` | Nestingo | Rich metadata |

- **Layout:** `case-studies/layout.tsx` — scrollable article chrome, sticky header, back to `/` and index
- **Renderer:** `CaseStudyView` + typed `CaseStudySection` blocks in `detailed-case-study.tsx`
- **Content:** Co-located per slug in `page.tsx` (`export const metadata` + `CaseStudyContent` object)
- **Index data:** `CASE_STUDIES` array in `case-studies/page.tsx` (must stay in sync when adding slugs)

**File tree** links directly to each case study `.md` file entry under `case-studies/`.

---

## Routes summary

```
/                          → Desktop SPA (client)
/case-studies              → Case study index (server)
/case-studies/[slug]       → Individual case studies (server)
```

**Static assets:** `/public/projects/*`, `/public/skills/*`, `/public/projects.json`, `/public/folio-2025/vdo.mp4`, `/public/akash.png`

**Not in repo (referenced in UI):** `/resume.pdf`

**Anomaly:** `src/app/case-studies/folio-2025/vdo.mp4` duplicates video under `app/` — prefer `public/` only for static media.

---

## Content & projects data

`public/projects.json` — 12 works (SaaS, 3D sites, platforms). Portfolio 2026 entry points to `/case-studies/folio-2026`. Carousel in `Projects` uses CSS `background-image` (no `<img>` alt text).

Featured case studies align with flagship work: Folio 2026, Tradzu, My Forex Firms, Nestingo.

---

## Key files

```
src/app/layout.tsx              # Root layout — metadata still create-next-app defaults
src/app/page.tsx                # Desktop home
src/app/case-studies/           # Case study routes + layout
src/components/layout/          # Desktop, FileTreeNav, Folio2025Card
src/components/sections/        # About, Experience, Projects, Contact, Skills, Hero
src/components/case-studies/    # CaseStudyView, gallery, types
src/components/backgrounds/     # DitherBackground (R3F)
src/stores/                     # github.store, projects.store
src/services/                   # github.service, projects.service
src/lib/                        # github types, projects types, utils
public/projects.json            # Project carousel data
projectContext.md               # This file
docs/ai/                        # AI-generated reports (excluded from builds when configured)
```

---

## Launch readiness (v1)

### Strengths

- Distinctive OS UX and WebGL desktop
- Case studies are server components with per-page SEO fields (title, description, keywords)
- Semantic `h1` on case study pages; index uses heading hierarchy
- `next/image` on case study covers and galleries
- Internal links: file tree → case studies; case study header → home
- Social links in About are real URLs with `rel="noopener noreferrer"`

### Gaps before production SEO

- Root `layout.tsx` metadata is still **Create Next App** placeholder
- No `metadataBase`, Open Graph, Twitter cards, or JSON-LD
- No `robots.ts` / `sitemap.ts`
- Home route is **100% client** — limited crawlable text on `/`
- Contact window social links use `href="#"` placeholders
- `/resume.pdf` linked but file missing
- No `openGraph` images configured for sharing

See **`docs/ai/folio-2026-seo-optimization-report.md`** for prioritized fixes and implementation checklist.

---

## Deployment

- Target: Vercel (per README / Next defaults)
- Set production `metadataBase` to final domain (e.g. `https://akash-codes.in/` or chosen host)
- Run `npm run build` before deploy; verify case study routes and static assets

---

## Future scope (post-v1)

- Restore or replace `Hero` window with crawlable intro copy on `/`
- Unify Contact social URLs with About
- Add `sitemap` + `robots` + structured data (Person, CreativeWork)
- Optional CMS or MDX for case studies instead of large inline `page.tsx` objects
- Fix image filename typos (`landng-page`, `lading-page`) for consistency
- Move stray `app/` video to `public/` only

---

*Last updated: May 2026 — pre-launch v1 audit.*
