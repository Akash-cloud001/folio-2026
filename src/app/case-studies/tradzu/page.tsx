import type { Metadata } from 'next';
import type { CaseStudyContent } from '@/components/case-studies/types';
import { CaseStudyView } from '@/components/case-studies/detailed-case-study';

export const metadata: Metadata = {
    title: 'Tradzu — CTO Case Study · Gamified Trading Rewards Ecosystem',
    description:
        'Architecting Tradzu as CTO — ledger-based TZU Credits, marketplace retention, audit-safe reward infrastructure, and a gamified fintech experience for prop traders.',
    keywords: [
        'Tradzu',
        'CTO case study',
        'trading rewards',
        'prop firm',
        'TZU Credits',
        'marketplace',
        'Next.js',
    ],
};

const study: CaseStudyContent = {
    slug: 'tradzu',
    title: 'Tradzu',
    tagline:
        'Building a gamified rewards ecosystem for traders — loyalty infrastructure, marketplace retention, and financial-grade accounting as CTO.',
    year: '2025',
    role: 'CTO',
    client: 'Tradzu',
    categories: [
        'Product Architecture',
        'Reward Systems',
        'Frontend Engineering',
        'Marketplace',
        'Fintech UX',
    ],
    coverImage: '/projects/tradzu/lading-page.png',
    sections: [
        {
            type: 'hero',
            badge: 'CTO · REWARDS ECOSYSTEM',
            title: 'Tradzu — A Loyalty Layer for the Trading Industry',
            subtitle: 'TZU Credits · Marketplace · Ledger accounting · Prop-firm discovery',
            description:
                'Tradzu is a next-generation trading rewards ecosystem for prop-firm traders and trading communities. As CTO, I architected the full technical foundation — reward infrastructure, marketplace systems, scalable frontend, admin tooling, and long-term platform scalability — not as a cashback site, but as engagement infrastructure for the trading industry.',
            metrics: [
                { label: 'Core currency', value: 'TZU Credits' },
                { label: 'Accounting', value: 'Ledger-based' },
                { label: 'Stack', value: 'Next.js' },
                { label: 'Identity', value: '#AFE607' },
            ],
            primaryCta: 'Visit Tradzu',
            primaryCtaHref: 'https://tradzu.com',
        },
        {
            type: 'overview',
            title: 'Overview & Product Vision',
            content: [
                'Most prop-trading platforms stop at affiliate links, coupon codes, or static reviews. The journey ended when a trader bought a challenge — with no retention, reward psychology, or long-term participation built in.',
                'Tradzu was designed as the operating system for trader rewards and discovery: prop-firm discovery, affiliate rewards, marketplace redemption, an internal TZU Credits economy, broker integrations, SEO acquisition, and community retention — combined into one ecosystem.',
                'The vision was explicit: build a loyalty and engagement infrastructure layer where purchases convert to rewards, rewards convert to marketplace value, and engagement compounds over time.',
            ],
            stats: [
                { label: 'Role', value: 'CTO' },
                { label: 'Currency', value: 'TZU Credits' },
                { label: 'Model', value: 'Non-crypto utility' },
                { label: 'UX', value: 'Dark · gamified' },
            ],
        },
        {
            type: 'challenge',
            title: 'The Problem',
            items: [
                {
                    title: 'No retention after purchase',
                    description:
                        'Affiliate and comparison sites monetized the first transaction but offered no ecosystem for ongoing trader engagement or compounded participation.',
                },
                {
                    title: 'Reward integrity at scale',
                    description:
                        'Any loyalty system needed accounting-grade consistency — not mutable balances, retroactive rule changes, or untraceable corrections.',
                },
                {
                    title: 'Trust before automation',
                    description:
                        'Early-stage reward issuance required human verification, approval pipelines, and audit trails without blocking future automation.',
                },
                {
                    title: 'Differentiated trader UX',
                    description:
                        'The experience had to feel like modern fintech and gaming culture — not legacy brokerage or generic affiliate dashboards.',
                },
            ],
        },
        {
            type: 'solution',
            title: 'Product Ecosystem Layers',
            items: [
                {
                    title: 'Public Discovery Layer',
                    description:
                        'SEO-first acquisition: prop-firm listings, broker discovery, comparison pages, marketplace previews, and editorial content for organic scale.',
                    image: '/projects/tradzu/lading-page.png',
                },
                {
                    title: 'User Dashboard',
                    description:
                        'Trader engagement hub — TZU wallet, reward tracking, purchase submissions, redemption flows, and synced trading accounts.',
                    image: '/projects/tradzu/dashboard.png',
                },
                {
                    title: 'Admin Operations Layer',
                    description:
                        'Approval workflows, reward configuration, ledger management, analytics, marketplace operations, and audit logging for platform operators.',
                },
                {
                    title: 'Content & CRM Layer',
                    description:
                        'Blog publishing, SEO workflows, content operations, and staff management for editorial scalability.',
                },
            ],
        },
        {
            type: 'solution',
            title: 'Core Systems I Architected',
            items: [
                {
                    title: 'Ledger-Based Reward Infrastructure',
                    description:
                        'Append-only ledger entries, immutable records, reversal-based corrections, and snapshot-driven calculations — inspired by financial accounting, not typical affiliate dashboards. Built for consistency, fraud traceability, and auditability.',
                    image: '/projects/tradzu/ledger.png',
                },
                {
                    title: 'Snapshot-Based Reward Calculations',
                    description:
                        'Reward percentages, challenge pricing, commission rules, and config values frozen at approval time — preventing retroactive corruption, recalculation drift, and historical accounting errors when business rules change.',
                },
                {
                    title: 'Manual-First Trust Architecture',
                    description:
                        'Purchase proof submissions, admin verification, approval pipelines, and audit logs before full automation — protecting affiliate relationships and reward integrity while keeping the architecture automation-ready.',
                },
                {
                    title: 'TZU Credits Economy',
                    description:
                        'Non-crypto, non-withdrawable, utility-focused internal currency — a loyalty layer earned through challenge purchases, ecosystem participation, and broker partnerships without regulatory token complexity.',
                },
                {
                    title: 'Marketplace Infrastructure',
                    description:
                        'Primary retention engine: Buy Challenge → Earn TZU → Redeem Rewards → Return to ecosystem. Country-aware pricing, FX normalization, margin systems, immutable redemption snapshots, and structured redemption workflows.',
                    image: '/projects/tradzu/redemption.png',
                },
            ],
        },
        {
            type: 'gallery',
            title: 'Product Screens',
            layout: 'grid',
            images: [
                {
                    title: 'Landing & Rewards Flow',
                    description: 'Buy · Earn · Unlock — TZU credits positioning for prop-firm purchases.',
                    image: '/projects/tradzu/lading-page.png',
                },
                {
                    title: 'Trader Dashboard',
                    description: 'Wallet, rewards, submissions, and account sync in one hub.',
                    image: '/projects/tradzu/dashboard.png',
                },
                {
                    title: 'Ledger & Accounting',
                    description: 'Append-only ledger and audit-safe reward records.',
                    image: '/projects/tradzu/ledger.png',
                },
                {
                    title: 'Marketplace Redemption',
                    description: 'Redeem TZU Credits for challenges, gift cards, and experiences.',
                    image: '/projects/tradzu/redemption.png',
                },
                {
                    title: 'Referral & Firm Discovery',
                    description: 'Prop-firm comparison, offers, and code TZU across the ecosystem.',
                    image: '/projects/tradzu/referral.png',
                },
            ],
        },
        {
            type: 'solution',
            title: 'Frontend, UI & Growth Systems',
            items: [
                {
                    title: 'Gamified Fintech Design System',
                    description:
                        'Dark-first UI with neon-fintech identity, matte layered surfaces, and lime-green (#AFE607) across rewards, active states, and marketplace — tokenized theming closer to gaming and trading culture than traditional brokerage sites.',
                },
                {
                    title: 'Scalable Frontend Architecture',
                    description:
                        'Reusable dashboard primitives, semantic design tokens, shared interaction systems, editorial rendering utilities, and marketplace components — engineered as a framework, not page-level one-offs.',
                },
                {
                    title: 'SEO & Content Infrastructure',
                    description:
                        'Comparison pages, prop-firm and broker discovery, editorial workflows, advanced blog rendering, media handling, and scalable publishing for long-term organic acquisition.',
                },
            ],
        },
        {
            type: 'cards',
            title: 'Key Challenges Solved',
            cards: [
                {
                    title: 'Trust in rewards',
                    description: 'Immutable ledgers, audit-safe accounting, and approval workflows.',
                    stats: ['Ledger entries', 'Audit logs', 'Approvals'],
                },
                {
                    title: 'Calculation integrity',
                    description: 'Snapshot-based rules frozen at approval with reversal-driven corrections.',
                    stats: ['Frozen snapshots', 'No retroactive drift'],
                },
                {
                    title: 'UI consistency',
                    description: 'Tokenized theming and shared primitives across dashboard and marketplace.',
                    stats: ['Design tokens', 'Reusable UI'],
                },
                {
                    title: 'Long-term retention',
                    description: 'Marketplace loop and reward psychology over one-time affiliate clicks.',
                    stats: ['TZU redemption', 'Ecosystem loop'],
                },
            ],
        },
        {
            type: 'metrics',
            title: 'Technical Foundation',
            metrics: [
                {
                    label: 'Framework',
                    value: 'Next.js',
                    description: 'App Router with TypeScript and modular service architecture.',
                },
                {
                    label: 'Accounting',
                    value: 'Ledger-first',
                    description: 'Financial-grade reward infrastructure from day one.',
                },
                {
                    label: 'Design',
                    value: 'Token-driven',
                    description: 'Semantic tokens and reusable systems for velocity and consistency.',
                },
                {
                    label: 'Principle',
                    value: 'Systems > features',
                    description: 'Every component strengthens the broader rewards ecosystem.',
                },
            ],
        },
        {
            type: 'results',
            title: 'Strategic Impact',
            items: [
                {
                    label: 'Reward economy',
                    value: 'Scalable',
                    description:
                        'Unified TZU Credits, marketplace, and discovery in one retention-focused architecture.',
                },
                {
                    label: 'Differentiation',
                    value: 'Ecosystem',
                    description:
                        'Moved beyond transactional affiliate into gamified, audit-safe engagement infrastructure.',
                },
                {
                    label: 'Engineering',
                    value: 'Audit-safe',
                    description:
                        'Trust before automation — built for long-term expansion into loyalty and community models.',
                },
                {
                    label: 'Long-term vision',
                    value: 'Global layer',
                    description:
                        'Architecture supports broker activity rewards, advanced marketplace, and community participation at scale.',
                },
            ],
        },
        {
            type: 'quote',
            quote:
                'Tradzu was engineered not just for transactions — but for long-term ecosystem engagement. Rewards were treated like financial infrastructure, not affiliate side effects.',
            author: 'Akash Parmar',
            role: 'CTO, Tradzu',
        },
        {
            type: 'cta',
            title: 'Building a rewards or fintech platform?',
            description:
                'I architect ledger-safe systems, gamified product experiences, and scalable multi-layer platforms as CTO — from discovery to marketplace to operations.',
            primaryCta: 'Let’s Work Together',
            primaryCtaHref: 'mailto:hello@akashparmar.dev',
            secondaryCta: 'View More Projects',
            secondaryCtaHref: '/case-studies',
        },
    ],
};

export default function TradzuCaseStudyPage() {
    return <CaseStudyView study={study} />;
}
