import type { Metadata } from 'next';
import type { CaseStudyContent } from '@/components/case-studies/types';
import { CaseStudyView } from '@/components/case-studies/detailed-case-study';
import { buildCaseStudyMetadata } from '@/lib/seo';

const COVER = '/projects/nexetro.png';

export const metadata: Metadata = buildCaseStudyMetadata({
    slug: 'nexetro',
    title: 'Nexetro — Coming soon',
    description:
        'Nexetro is a perpetual firm. Trade markets. Prove skills. Get Paid. Case study coming soon.',
    keywords: ['Nexetro', 'case study', 'Akash Parmar'],
    coverImage: COVER,
    coverImageAlt: 'Nexetro — case study coming soon',
});

const study: CaseStudyContent = {
    slug: 'nexetro',
    title: 'Nexetro',
    tagline: 'A perpetual firm. Trade markets. Prove skills. Get Paid.',
    year: '2026',
    role: 'Product · Engineering',
    client: 'Nexetro',
    duration: 'In progress',
    categories: ['Perpetual firm', 'Trading', 'Skills', 'Payouts'],
    coverImage: COVER,
    sections: [
        {
            type: 'hero',
            badge: 'PERPETUAL FIRM · IN PROGRESS',
            title: 'Nexetro — Trade markets. Prove skills. Get Paid.',
            subtitle: 'A perpetual firm for traders who earn by proving skill',
            description:
                'Nexetro is a perpetual firm. Traders take the market, show they can perform, and get paid for that skill. This write-up will cover how the firm evaluates traders, funds them, and pays out.',
            metrics: [
                { label: 'Firm', value: 'Perpetual' },
                { label: 'Markets', value: 'Trade' },
                { label: 'Proof', value: 'Skills' },
                { label: 'Outcome', value: 'Get Paid' },
            ],
            primaryCta: 'Visit Nexetro',
            primaryCtaHref: 'https://nexetro.com',
            secondaryCta: 'All case studies',
            secondaryCtaHref: '/case-studies',
        },
        {
            type: 'overview',
            title: 'Overview & Product Vision',
            content: [
                'Nexetro is a perpetual firm. The product loop is direct: trade markets, prove skills, get paid.',
                'Traders are not buying a one-off challenge and leaving. They stay in the firm, keep proving performance, and payouts follow the skill they demonstrate.',
                'Screens, rules, and payout design are still being written. The layout below is a preview of the case study.',
            ],
            stats: [
                { label: 'Type', value: 'Perpetual firm' },
                { label: 'Step 1', value: 'Trade markets' },
                { label: 'Step 2', value: 'Prove skills' },
                { label: 'Step 3', value: 'Get Paid' },
            ],
        },
        {
            type: 'challenge',
            title: 'The Problem',
            items: [
                {
                    title: 'Skill was hard to prove',
                    description:
                        'Most trading products stop at a purchase. Traders had no clear, ongoing way to show they could trade and keep getting paid for it.',
                },
                {
                    title: 'Payouts felt disconnected from performance',
                    description:
                        'Getting paid needed to follow demonstrated skill in the market, not a one-time fee or an opaque review.',
                },
                {
                    title: 'The firm had to stay perpetual',
                    description:
                        'A single challenge is a transaction. A perpetual firm needs a loop traders can stay in: trade, prove, get paid, trade again.',
                },
            ],
        },
        {
            type: 'solution',
            title: 'What This Write-up Will Cover',
            items: [
                {
                    title: 'Trade markets',
                    description:
                        'How traders enter the firm and take live market exposure inside a perpetual model rather than a one-off challenge.',
                    image: COVER,
                },
                {
                    title: 'Prove skills',
                    description:
                        'The rules and record that turn trading performance into proof a trader can be paid on.',
                },
                {
                    title: 'Get Paid',
                    description:
                        'How payouts follow demonstrated skill, and what the first version of that loop ships with.',
                },
            ],
        },
        {
            type: 'gallery',
            title: 'Product Screens',
            layout: 'carousel',
            images: [
                {
                    title: 'Trade markets',
                    description: 'Where traders take the market inside the firm.',
                    image: COVER,
                },
                {
                    title: 'Prove skills',
                    description: 'Performance that qualifies a trader to be paid.',
                    image: COVER,
                },
                {
                    title: 'Get Paid',
                    description: 'Payouts tied to demonstrated skill.',
                    image: COVER,
                },
            ],
        },
        {
            type: 'cards',
            title: 'Themes',
            cards: [
                {
                    title: 'Perpetual firm',
                    description: 'Traders stay in the firm instead of finishing a single purchase and leaving.',
                    stats: ['Ongoing', 'Not one-off'],
                },
                {
                    title: 'Trade markets',
                    description: 'The product starts in the market, not in a marketing funnel.',
                    stats: ['Markets', 'Execution'],
                },
                {
                    title: 'Prove skills',
                    description: 'Payout eligibility comes from demonstrated trading skill.',
                    stats: ['Performance', 'Proof'],
                },
                {
                    title: 'Get Paid',
                    description: 'Skill that holds up in the market turns into a payout.',
                    stats: ['Payouts', 'Merit'],
                },
            ],
        },
        {
            type: 'results',
            title: 'Early Signals',
            items: [
                {
                    label: 'Firm model',
                    value: 'Perpetual',
                    description: 'Built as an ongoing firm, not a single challenge checkout.',
                },
                {
                    label: 'Trader loop',
                    value: 'Trade → prove',
                    description: 'Markets first, then a clear record of skill.',
                },
                {
                    label: 'Payout',
                    value: 'Get Paid',
                    description: 'Payment follows the skill a trader proves.',
                },
                {
                    label: 'Write-up',
                    value: 'Next',
                    description: 'Screens and rules will land in this layout.',
                },
            ],
        },
        {
            type: 'cta',
            title: 'Full case study coming soon',
            description:
                'Nexetro is a perpetual firm — trade markets, prove skills, get paid. The full write-up will use this layout once the firm story is ready to publish.',
            primaryCta: 'Back to case studies',
            primaryCtaHref: '/case-studies',
            secondaryCta: 'Portfolio',
            secondaryCtaHref: '/',
        },
    ],
};

export default function NexetroCaseStudyPage() {
    return (
        <div className="relative h-full overflow-hidden">
            <div className="pointer-events-none absolute inset-0 select-none overflow-hidden blur-md" aria-hidden>
                <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
                    <CaseStudyView study={study} preview />
                </div>
            </div>
            <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
                <div className="max-w-lg text-center">
                    <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Nexetro</h1>
                    <p className="mt-3 text-base text-zinc-300 sm:text-lg">
                        Trade markets. Prove skills. Get Paid.
                    </p>
                    <p className="mt-6 font-geist-mono text-xs uppercase tracking-[0.28em] text-zinc-400">
                        Coming soon
                    </p>
                </div>
            </div>
        </div>
    );
}
