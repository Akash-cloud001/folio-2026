import type { Metadata } from 'next';
import type { CaseStudyContent } from '@/components/case-studies/types';
import { CaseStudyView } from '@/components/case-studies/detailed-case-study';

export const metadata: Metadata = {
    title: 'MyForexFirms — CTO & Engineering Case Study',
    description:
        'How MyForexFirms was built as a trust-first prop trading platform under CTO leadership — product architecture, full-stack development, and growth supported by dedicated SEO and backend partners.',
    keywords: [
        'CTO case study',
        'prop trading platform',
        'Next.js',
        'product engineering',
        'MyForexFirms',
        'frontend architecture',
    ],
};

const study: CaseStudyContent = {
    slug: 'my-forex-firms',
    title: 'My Forex Firms',
    tagline:
        'Leading product and engineering as CTO — building the platform, shipping core features, and scaling delivery with dedicated SEO and backend partners.',
    year: '2026',
    role: 'CTO · Lead Developer',
    client: 'MyForexFirms',
    duration: '6+ Months',
    categories: ['Product', 'Engineering', 'Frontend', 'Architecture', 'Team Leadership'],
    coverImage: '/projects/myforexfirms/product-design.png',
    sections: [
        {
            type: 'hero',
            badge: 'CTO · ENGINEERING',
            title: 'Building MyForexFirms as CTO & Lead Developer',
            subtitle: 'Product architecture · Core development · Accelerated delivery with specialist partners',
            description:
                'I served as CTO and hands-on developer on MyForexFirms — a prop trading intelligence platform built to bring transparency to firm reviews, trust scoring, and trader tooling. I owned the technical direction, shipped the product surface area, and structured the stack so SEO and backend specialists could move fast alongside me.',
            metrics: [
                { label: 'Impressions', value: '116K+', change: '+98%' },
                { label: 'Organic Users', value: '17K+', change: '+61%' },
                { label: 'Page Views', value: '51K+' },
                { label: 'Avg Position', value: '#7' },
            ],
            primaryCta: 'View Live Project',
            primaryCtaHref: 'https://myforexfirms.in',
        },
        {
            type: 'overview',
            title: 'My Role & How We Worked',
            content: [
                'As CTO, I set the product and engineering roadmap, made architecture decisions, and wrote a large share of the frontend and integration layer myself. My focus was shipping a credible, data-driven product — not running SEO campaigns personally.',
                'Organic growth was handled by an SEO partner I brought in as a service. I built the page systems, content models, and internal linking structure they needed so their work could scale without blocking engineering.',
                'To increase development pace, I hired a backend developer to own APIs, data pipelines, and server-side features in parallel — while I stayed focused on product UX, frontend quality, and technical leadership.',
            ],
            stats: [
                { label: 'My Focus', value: 'CTO + Dev' },
                { label: 'SEO', value: 'Partner (service)' },
                { label: 'Backend', value: 'Hired dev' },
                { label: 'Google Organic Users', value: '11K+' },
            ],
        },
        {
            type: 'challenge',
            title: 'Challenges',
            items: [
                {
                    title: 'Low Trust Industry',
                    description:
                        'The prop trading niche is filled with fake reviews, aggressive affiliates, and misleading payout claims — the product had to earn trust through data and UX, not marketing alone.',
                },
                {
                    title: 'Shipping Speed vs. Scope',
                    description:
                        'The roadmap covered reviews, scoring systems, dashboards, and growth pages. As a small core team, we needed parallel execution without sacrificing architecture quality.',
                },
                {
                    title: 'SEO at Scale Without Blocking Engineering',
                    description:
                        'Search growth required ongoing content and page expansion. That work needed a dedicated SEO operator, with engineering providing stable templates and CMS-ready structures.',
                },
            ],
        },
        {
            type: 'solution',
            title: 'What I Built & How the Team Scaled',
            items: [
                {
                    title: 'Product Architecture & Frontend (CTO / Developer)',
                    description:
                        'Designed and implemented the core application — review flows, firm listings, trust surfaces, and dashboard experiences — with a maintainable Next.js stack and clear component boundaries for long-term iteration.',
                    image: '/projects/myforexfirms/product-design.png',
                },
                {
                    title: 'PTI Score & Trust Systems',
                    description:
                        'Led development of the Performance Trust Index and related data presentation — turning complaints, payouts, and trust signals into differentiated product value competitors could not easily copy.',
                    image: '/projects/myforexfirms/pti-score.png',
                },
                {
                    title: 'MyPropJourney Trader Dashboard',
                    description:
                        'Shipped the trader analytics experience for tracking payouts, ROI, funded accounts, and challenge performance — improving retention and giving SEO landing pages a product hook beyond static content.',
                    image: '/projects/myforexfirms/dashboard.png',
                },
                {
                    title: 'SEO Partner (Hired Service)',
                    description:
                        'Engaged an SEO specialist as a service to own keyword strategy, content production, and ranking execution. I built programmatic page templates and linking patterns so their output could publish and index at scale without constant dev tickets.',
                },
                {
                    title: 'Backend Developer (Delivery Acceleration)',
                    description:
                        'Hired a backend developer to parallelize API work, database modeling, and server-side features — significantly increasing shipping pace while I kept ownership of architecture, frontend, and cross-team technical decisions.',
                },
            ],
        },
        {
            type: 'gallery',
            title: 'Product & Dashboard Screens',
            layout: 'grid',
            images: [
                {
                    title: 'Analytics Dashboard',
                    description: 'Performance overview with ROI, payouts, and account tracking.',
                    image: '/projects/myforexfirms/dashboard.png',
                },
                {
                    title: 'Accounts Management',
                    description: 'Challenge lifecycle tracking system.',
                    image: '/projects/myforexfirms/accounts.png',
                },
                {
                    title: 'Payout Tracking',
                    description: 'Payout management and financial visibility.',
                    image: '/projects/myforexfirms/payout.png',
                },
                {
                    title: 'Social Share Card',
                    description: 'Shareable trader performance cards for organic reach.',
                    image: '/projects/myforexfirms/social-card.png',
                },
            ],
        },
        {
            type: 'metrics',
            title: 'Growth Outcomes (SEO Partner)',
            metrics: [
                {
                    label: 'Google Impressions',
                    value: '116K+',
                    description:
                        'Visibility growth driven by the SEO service, supported by scalable page systems I built for publishing.',
                },
                {
                    label: 'Organic Clicks',
                    value: '823+',
                    description: 'High-intent review and comparison queries targeted by the SEO partner.',
                },
                {
                    label: 'Average Position',
                    value: '#7',
                    description: 'Multiple URLs reaching first-page rankings after content and template rollout.',
                },
                {
                    label: 'Non-Branded Traffic',
                    value: '74%',
                    description: 'Discovery-led traffic — a result of SEO execution on top of the product foundation.',
                },
            ],
        },
        {
            type: 'results',
            title: 'Results & Outcomes',
            items: [
                {
                    label: 'Platform Shipped',
                    value: 'End-to-end',
                    description:
                        'Core product, trust tooling, and trader dashboards delivered under CTO-led engineering.',
                },
                {
                    label: 'Faster Delivery',
                    value: 'Parallel backend',
                    description:
                        'Backend hire unblocked APIs and data work so frontend and SEO could keep moving.',
                },
                {
                    label: '116K+ Impressions',
                    value: '+98%',
                    description:
                        'Search visibility scaled with a dedicated SEO partner on infrastructure I designed for content velocity.',
                },
                {
                    label: '17K+ Users',
                    value: '+61%',
                    description: 'Strong organic acquisition combining product quality and SEO execution.',
                },
            ],
        },
        {
            type: 'quote',
            quote:
                'My job was to build the product and engineering foundation — SEO and backend specialists handled what I could not do alone at the pace we needed. That split is what let us ship and grow at the same time.',
            author: 'Akash Parmar',
            role: 'CTO & Lead Developer, MyForexFirms',
        },
        {
            type: 'cta',
            title: 'Need a CTO or lead developer on your product?',
            description:
                'I lead technical direction, ship production frontend, and scale delivery with the right partners — SEO, backend, or otherwise — without losing architecture quality.',
            primaryCta: 'Let’s Work Together',
            primaryCtaHref: 'mailto:hello@akashparmar.dev',
            secondaryCta: 'View More Projects',
            secondaryCtaHref: '/case-studies',
        },
    ],
};

export default function MyForexFirmsCaseStudyPage() {
    return <CaseStudyView study={study} />;
}
