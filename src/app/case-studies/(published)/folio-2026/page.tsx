import type { Metadata } from 'next';
import type { CaseStudyContent } from '@/components/case-studies/types';
import { CaseStudyView } from '@/components/case-studies/detailed-case-study';
import { buildCaseStudyMetadata } from '@/lib/seo';
import { contactMailto } from '@/lib/site';

export const metadata: Metadata = buildCaseStudyMetadata({
    slug: 'folio-2026',
    title: 'Folio 2026 — Interactive Developer Portfolio Case Study',
    description:
        'Building a desktop-inspired developer portfolio with Next.js 16, draggable windows, WebGL backgrounds, file-tree navigation, and a scalable case-study system.',
    keywords: [
        'developer portfolio',
        'Next.js portfolio',
        'React Three Fiber',
        'interactive portfolio',
        'case study',
        'folio 2026',
    ],
    coverImage: '/projects/folio-2026/landng-page.png',
    coverImageAlt: 'Folio 2026 — interactive developer portfolio desktop UI',
});

const study: CaseStudyContent = {
    slug: 'folio-2026',
    title: 'Folio 2026',
    tagline:
        'A desktop-inspired developer portfolio — draggable windows, IDE-style navigation, live GitHub data, and a page-driven case study engine.',
    year: '2026',
    role: 'Design · Frontend · Architecture',
    client: 'Personal',
    duration: 'In progress',
    categories: [
        'Next.js',
        'React 19',
        'WebGL',
        'UX Engineering',
        'Case Study System',
    ],
    coverImage: '/projects/folio-2026/landng-page.png',
    sections: [
        {
            type: 'hero',
            badge: 'PORTFOLIO · IN PROGRESS',
            title: 'Folio 2026 — An OS-Style Developer Portfolio',
            subtitle: 'Windows · file tree · WebGL desktop · case studies as routes',
            description:
                'This is the portfolio you are viewing — rebuilt from scratch as an interactive desktop experience instead of a linear scroll site. The goal was to combine engineering credibility, project depth, and personality in one cohesive environment that feels like opening a developer’s machine, not reading another template landing page.',
            metrics: [
                { label: 'Framework', value: 'Next.js 16' },
                { label: 'UI model', value: 'Desktop OS' },
                { label: '3D layer', value: 'R3F + shaders' },
                { label: 'Case studies', value: 'Page-driven' },
            ],
            primaryCta: 'Explore the desktop',
            primaryCtaHref: '/',
            secondaryCta: 'View case studies',
            secondaryCtaHref: '/case-studies',
        },
        {
            type: 'overview',
            title: 'Vision & Product Goals',
            content: [
                'Traditional portfolios repeat the same hero → about → projects → contact stack. Folio 2026 treats the site as a workspace: sections open in windows, navigation mirrors a file explorer, and deep project write-ups live on dedicated routes you can jump to from the tree.',
                'The experience targets recruiters, founders, and technical collaborators who want signal fast — live GitHub activity, a scrolling project reel, skills and experience in focused panels — without losing the option to read long-form CTO case studies when they want depth.',
                'Everything is built for iteration: new case studies are added as standalone pages under `/case-studies/<slug>`, not buried in a monolithic JSON file.',
            ],
            stats: [
                { label: 'Shell', value: 'Desktop UI' },
                { label: 'Nav', value: 'File tree' },
                { label: 'Data', value: 'JSON + GitHub API' },
                { label: 'Depth', value: 'Case routes' },
            ],
        },
        {
            type: 'challenge',
            title: 'Design & Technical Challenges',
            items: [
                {
                    title: 'Desktop UX without breaking mobile',
                    description:
                        'Draggable windows and absolute positioning work on large screens, but mobile needs safe areas, full-width panels, and disabled drag — solved with responsive window chrome and `useSyncExternalStore` for media queries without hydration mismatch.',
                },
                {
                    title: 'Layering & focus management',
                    description:
                        'Multiple open windows require z-index stacking, focus on click, and a file tree that stays above the stack — capped window z-index below the tree so navigation never disappears behind panels.',
                },
                {
                    title: 'Performance vs. atmosphere',
                    description:
                        'A full-screen WebGL dither shader adds identity but must not block interaction — the canvas sits behind content with controlled intensity and pointer-safe layout.',
                },
                {
                    title: 'Scalable case study authoring',
                    description:
                        'Long CTO write-ups (Tradzu, My Forex Firms, Nestingo) need rich sections, galleries, and SEO metadata without copy-pasting layout code — solved with typed section blocks and a shared `CaseStudyView` renderer.',
                },
            ],
        },
        {
            type: 'solution',
            title: 'Core Experience — The Desktop Shell',
            items: [
                {
                    title: 'Draggable window manager',
                    description:
                        'Each section (About, Experience, Projects, Skills, Contact) runs inside a `Window` component with title bar, close/minimize, Framer Motion drag controls, and desktop-bound constraints. State lives in the home page with explicit z-index promotion on focus.',
                },
                {
                    title: 'IDE-style file tree navigation',
                    description:
                        'A floating, draggable `FileTreeNav` maps folders and files to window IDs or Next.js routes — `src/` opens portfolio panels; `case-studies/` deep-links to full case study pages like markdown files in a repo.',
                },
                {
                    title: 'Dither WebGL background',
                    description:
                        'Custom shader background via React Three Fiber and postprocessing — animated noise waves with optional mouse interaction, giving the desktop a tactile, developer-tool aesthetic without a heavy 3D scene graph.',
                },
            ],
        },
        {
            type: 'solution',
            title: 'Content Panels & Data Layer',
            items: [
                {
                    title: 'About — live GitHub integration',
                    description:
                        'Zustand store + GitHub service fetch profile and contribution calendar; responsive activity grid, social links, and avatar toggle — proof of work beyond static copy.',
                },
                {
                    title: 'Projects — infinite marquee',
                    description:
                        'Projects load from `public/projects.json` through a store/service pattern; cards auto-scroll in a masked horizontal reel with hover pause and external links to shipped products.',
                },
                {
                    title: 'Experience, skills & contact',
                    description:
                        'Modular section components inside windows — monospace-forward typography, consistent borders, and scroll areas for dense content on smaller viewports.',
                },
            ],
        },
        {
            type: 'solution',
            title: 'Case Study System',
            items: [
                {
                    title: 'Page-per-project authoring',
                    description:
                        'Each case study lives in `src/app/case-studies/<slug>/page.tsx` with `export const metadata` for SEO and a typed `sections` array — no central CMS JSON, easy to paste new content page by page.',
                },
                {
                    title: 'Composable section renderer',
                    description:
                        'Shared `CaseStudyView` supports hero, overview, challenges, solutions (with optional screenshots), metrics, card grids, results, quotes, CTAs, and shadcn Embla carousels for product galleries.',
                },
                {
                    title: 'Dedicated case study layout',
                    description:
                        'Separate route layout with sticky header, viewport-height scroll container, and back navigation — case studies read like articles while the main site stays a fixed desktop shell.',
                },
            ],
        },
        {
            type: 'cards',
            title: 'Architecture Highlights',
            cards: [
                {
                    title: 'App Router',
                    description: 'Next.js 16 with static case study routes and client islands only where interaction is required.',
                    stats: ['RSC shell', 'Static CS pages', 'Client windows'],
                },
                {
                    title: 'State boundaries',
                    description: 'Zustand for GitHub and projects; local React state for window manager — no over-globalized UI store.',
                    stats: ['github.store', 'projects.store'],
                },
                {
                    title: 'Design system',
                    description: 'Tailwind v4, Geist fonts, shadcn primitives (carousel, button, scroll-area), CVA variants.',
                    stats: ['Dark theme', 'Tokens', 'shadcn'],
                },
                {
                    title: 'Content ops',
                    description: 'Add a case study → new folder + index card + file-tree entry + optional projects.json row.',
                    stats: ['4-step add', 'Typed sections'],
                },
            ],
        },
        {
            type: 'metrics',
            title: 'Stack & Tooling',
            metrics: [
                {
                    label: 'Core',
                    value: 'Next.js 16',
                    description: 'App Router, TypeScript, React 19.',
                },
                {
                    label: 'Motion',
                    value: 'Framer Motion',
                    description: 'Window drag, enter/exit, file tree panel.',
                },
                {
                    label: '3D',
                    value: 'R3F + Three',
                    description: 'Shader background with postprocessing pipeline.',
                },
                {
                    label: 'UI',
                    value: 'Tailwind 4',
                    description: 'Utility-first styling with CSS variables and dark scheme.',
                },
            ],
        },
        {
            type: 'results',
            title: 'Outcomes & What This Demonstrates',
            items: [
                {
                    label: 'Product thinking',
                    value: 'OS metaphor',
                    description:
                        'Shows ability to ship a cohesive product concept, not only individual components.',
                },
                {
                    label: 'Engineering depth',
                    value: 'Full stack UI',
                    description:
                        'Windowing, WebGL, API data, routing, and long-form content systems in one codebase.',
                },
                {
                    label: 'CTO narratives',
                    value: 'Linked work',
                    description:
                        'Case studies document Tradzu, My Forex Firms, and Nestingo with the same rigor as production platforms.',
                },
                {
                    label: 'Maintainability',
                    value: 'Page-driven',
                    description:
                        'Future case studies and portfolio tweaks slot in without restructuring the whole site.',
                },
            ],
        },
        {
            type: 'quote',
            quote:
                'The portfolio is itself a product — a small operating system for how I want people to explore my work, not a single scrolling résumé.',
            author: 'Akash Parmar',
            role: 'Builder, Folio 2026',
        },
        {
            type: 'cta',
            title: 'Want this level of product craft on your team?',
            description:
                'I design and build distinctive frontend systems — from gamified fintech to desktop-grade portfolios and scalable case study infrastructure.',
            primaryCta: 'Get in touch',
            primaryCtaHref: contactMailto,
            secondaryCta: 'Back to desktop',
            secondaryCtaHref: '/',
        },
    ],
};

export default function Folio2026CaseStudyPage() {
    return <CaseStudyView study={study} />;
}
