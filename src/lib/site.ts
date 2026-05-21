/** Canonical site URL — override with NEXT_PUBLIC_SITE_URL in production. */
export const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://akash-codes.in/';

export const CASE_STUDY_SLUGS = [
    'folio-2026',
    'tradzu',
    'my-forex-firms',
    'nestingo',
] as const;

export type CaseStudySlug = (typeof CASE_STUDY_SLUGS)[number];

export const siteConfig = {
    name: 'Akash Parmar',
    title: 'Akash Parmar — Portfolio',
    description:
        'Full stack developer portfolio — interactive desktop UI, Next.js, React, WebGL, and CTO case studies for Tradzu, MyForexFirms, and Nestingo.',
    ogImagePath: '/og.png',
    ogImageAlt: 'Akash Parmar — Portfolio 2026',
    email: 'hello@akashparmar.dev',
    jobTitle: 'Full Stack Developer',
    locale: 'en_IN',
    twitterHandle: '@Akash_cloud001',
    sameAs: [
        'https://github.com/Akash-cloud001',
        'https://www.linkedin.com/in/akash-parmar-/',
        'https://x.com/Akash_cloud001',
    ],
} as const;
