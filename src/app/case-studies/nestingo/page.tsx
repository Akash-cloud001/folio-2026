import type { Metadata } from 'next';
import type { CaseStudyContent } from '@/components/case-studies/types';
import { CaseStudyView } from '@/components/case-studies/detailed-case-study';

export const metadata: Metadata = {
    title: 'Nestingo — CTO & Startup Technology Case Study',
    description:
        'Building a tech-driven student accommodation ecosystem in Delhi NCR — product architecture, multi-platform operations, and engineering team scale as CTO.',
    keywords: [
        'Nestingo',
        'CTO case study',
        'student accommodation',
        'PG booking platform',
        'Delhi NCR startup',
        'product architecture',
    ],
};

const study: CaseStudyContent = {
    slug: 'nestingo',
    title: 'Nestingo',
    tagline:
        'Building a tech-driven student accommodation ecosystem in Delhi NCR — from PG discovery to managed operations, staff tooling, and admin infrastructure.',
    year: '2024',
    role: 'CTO',
    client: 'Nestingo',
    duration: 'Multi-year build',
    categories: [
        'Product Architecture',
        'Engineering Leadership',
        'Operations',
        'Multi-platform Systems',
        'Startup Execution',
    ],
    coverImage: '/projects/nestingo.png',
    sections: [
        {
            type: 'hero',
            badge: 'CTO · STARTUP',
            title: 'Nestingo — A Managed Student Accommodation Ecosystem',
            subtitle: 'Technology-first PG & hostel platform · Delhi NCR · Operations + product',
            description:
                'Nestingo was built to fix the fragmented, trust-deficient PG and hostel market in Delhi NCR — helping students, professionals, parents, and migrating tenants find verified, broker-free accommodation with transparency and human support. As CTO, I led product architecture, technical execution, team scaling, and the systems that turned startup vision into operational software.',
            metrics: [
                { label: 'Platforms', value: '3+' },
                { label: 'Focus', value: 'Delhi NCR' },
                { label: 'Model', value: 'Zero brokerage' },
                { label: 'Team', value: 'CTO + devs' },
            ],
            primaryCta: 'Visit Nestingo',
            primaryCtaHref: 'https://nestingo.in/',
        },
        {
            type: 'overview',
            title: 'Introduction & Product Vision',
            content: [
                'Nestingo started as a PG discovery platform and evolved toward a managed accommodation network — positioning itself not as another listing site, but as an operator invested in resident experience, verification, and end-to-end support.',
                'The ecosystem included a public website for acquisition and discovery, a staff operations panel for visits and leads, and an admin dashboard for property inventory, bookings, CMS, and business operations — reducing daily dependency on engineering for routine tasks.',
                'Market opportunity was especially strong in Delhi NCR: massive student migration (including Delhi University), major corporate hubs, and PG infrastructure that remained largely unorganized and offline-first.',
            ],
            stats: [
                { label: 'Role', value: 'CTO' },
                { label: 'Region', value: 'Delhi NCR' },
                { label: 'Brokers', value: 'Zero fee' },
                { label: 'Long-term vision', value: 'GigVid' },
            ],
        },
        {
            type: 'challenge',
            title: 'Core Problems in the Market',
            items: [
                {
                    title: 'User trust & transparency',
                    description:
                        'Students and professionals faced fake listings, hidden brokerage, poor hygiene, unsafe stays, and no standardized booking — parents and tenants needed high trust before committing.',
                },
                {
                    title: 'Operator digitization gap',
                    description:
                        'PG owners struggled with low occupancy, weak digital presence, manual operations, and no structured lead management or marketing systems.',
                },
                {
                    title: 'Fragmented inventory',
                    description:
                        'Room availability changed constantly. Keeping listings, staff workflows, and booking state aligned across platforms was operationally difficult.',
                },
                {
                    title: 'Scaling operations',
                    description:
                        'Every property required custom onboarding, verification, and operational adaptation — staff coordination and internal tooling became critical infrastructure, not optional extras.',
                },
            ],
        },
        {
            type: 'solution',
            title: 'Product Ecosystem I Architected',
            items: [
                {
                    title: 'Public Website — Discovery & Conversion',
                    description:
                        'Built the primary acquisition engine: locality search, gender and sharing filters, property comparison, amenities, maps, standardized listing pages (galleries, pricing, house rules, food options), visit scheduling, inquiry flows, and mobile-first auth (phone OTP, Google sign-in) optimized for students.',
                    image: '/projects/nestingo/landing-2.png',
                },
                {
                    title: 'Mobile Authentication',
                    description:
                        'Phone OTP and Google sign-in flows designed for a student-first, mobile-heavy audience — low friction onboarding before search, saves, and visit requests.',
                    image: '/projects/nestingo/login-page.png',
                },
                {
                    title: 'Staff Operations Panel',
                    description:
                        'Operational backbone for PG visits, lead coordination, property verification, student onboarding, follow-ups, booking coordination, and query handling — enabling Nestingo to run as a process-driven service company, not a passive marketplace.',
                },
                {
                    title: 'Admin Dashboard',
                    description:
                        'Centralized property management (galleries, amenities, pricing, inventory), user and staff roles, lead and booking pipelines, visit scheduling, and CMS for homepage, FAQs, testimonials, and campaigns.',
                },
                {
                    title: 'PG Captain Model',
                    description:
                        'Hybrid tech + human operations: local guidance, visit assistance, and accommodation consulting at no extra charge — increasing trust, conversion, and retention versus broker-only or listing-only competitors.',
                },
                {
                    title: 'Engineering Team Expansion',
                    description:
                        'Hired two developers to parallelize frontend and backend work — reducing bottlenecks, accelerating admin and staff tooling, and improving iteration speed on the public product. A major inflection point for delivery and operational support.',
                },
            ],
        },
        {
            type: 'gallery',
            title: 'Product Screens',
            layout: 'grid',
            images: [
                {
                    title: 'Landing & Discovery',
                    description: 'Homepage and entry into locality-based PG search across Delhi NCR.',
                    image: '/projects/nestingo/landing-2.png',
                },
                {
                    title: 'Sign In & Onboarding',
                    description: 'Mobile-first authentication with OTP and Google sign-in.',
                    image: '/projects/nestingo/login-page.png',
                },
                {
                    title: 'Property Detail — Overview',
                    description: 'Standardized listing layout with galleries, pricing, and trust signals.',
                    image: '/projects/nestingo/pg-detail-1.png',
                },
                {
                    title: 'Property Detail — Amenities & Rules',
                    description: 'Structured amenities, food options, and house rules for transparent comparison.',
                    image: '/projects/nestingo/pg-detail-2.png',
                },
                {
                    title: 'Property Detail — Booking & Inquiry',
                    description: 'Visit scheduling and inquiry flows tied to operational follow-up.',
                    image: '/projects/nestingo/pg-detail-3.png',
                },
            ],
        },
        {
            type: 'cards',
            title: 'Technology vs. Traditional Market',
            cards: [
                {
                    title: 'Discovery',
                    description: 'Replaced offline brokers with searchable, filterable digital property discovery.',
                    stats: ['Locality search', 'Gender & sharing filters', 'Maps'],
                },
                {
                    title: 'Trust',
                    description: 'Verification workflows and structured listing data instead of fake or opaque postings.',
                    stats: ['Verified PGs', 'Guided visits', 'Standardized pages'],
                },
                {
                    title: 'Operations',
                    description: 'Lead management, visit booking, and staff dashboards for coordinated execution.',
                    stats: ['Inquiry pipeline', 'Visit scheduling', 'Staff panel'],
                },
                {
                    title: 'Inventory',
                    description: 'Admin-controlled room inventory and pricing visibility across the ecosystem.',
                    stats: ['Property CMS', 'Inventory sync', 'Role permissions'],
                },
            ],
        },
        {
            type: 'metrics',
            title: 'Business & Scale Vision',
            metrics: [
                {
                    label: 'Phase 1 target',
                    value: '150 beds',
                    description: 'Initial managed operations scale outlined in investor planning.',
                },
                {
                    label: 'Year 3 ambition',
                    value: '1,000+ beds',
                    description: 'Path toward a broader managed PG network beyond discovery-only.',
                },
                {
                    label: 'Break-even focus',
                    value: '~75% occupancy',
                    description: 'Operational discipline tied to profitability in managed accommodation.',
                },
                {
                    label: 'Positioning',
                    value: 'Operator-first',
                    description:
                        'Competed on operations, food, maintenance, and resident experience — not aggregation alone.',
                },
            ],
        },
        {
            type: 'results',
            title: 'CTO Outcomes & Learnings',
            items: [
                {
                    label: 'Technical leadership',
                    value: 'Team + delivery',
                    description:
                        'Hiring developers, managing execution, and converting vision into shippable multi-role systems.',
                },
                {
                    label: 'Product architecture',
                    value: '3 platforms',
                    description:
                        'Public site, staff ops, and admin infrastructure with booking and lead workflows end to end.',
                },
                {
                    label: 'Startup execution',
                    value: 'MVP → scale',
                    description:
                        'Lean build, operational software design, and adaptation to real-world PG market constraints.',
                },
                {
                    label: 'Strategic thinking',
                    value: 'Ecosystem vision',
                    description:
                        'Long-term GigVid direction — using stable accommodation cashflows to fund a video-first gig marketplace.',
                },
            ],
        },
        {
            type: 'quote',
            quote:
                'Nestingo was not just a listing platform — it was an attempt to own the resident experience through technology, verification, and operational systems working together.',
            author: 'Akash Parmar',
            role: 'CTO, Nestingo',
        },
        {
            type: 'cta',
            title: 'Building operational products as CTO?',
            description:
                'I architect multi-platform startups, scale engineering teams, and ship the internal tooling that offline industries need to run digitally.',
            primaryCta: 'Let’s Work Together',
            primaryCtaHref: 'mailto:hello@akashparmar.dev',
            secondaryCta: 'View More Projects',
            secondaryCtaHref: '/case-studies',
        },
    ],
};

export default function NestingoCaseStudyPage() {
    return <CaseStudyView study={study} />;
}
