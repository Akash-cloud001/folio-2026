/** Canonical URL for this site (Folio 2026) — override with NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://akash-codes.in'
).replace(/\/$/, '');

/** Last year's portfolio — desktop `FOLIO-2025.url` window & projects carousel. */
export const FOLIO_2025_URL = 'https://2025.akash-codes.in';

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
    email: 'akashparmar6561@gmail.com',
    jobTitle: 'Full Stack Developer',
    locale: 'en_IN',
    twitterHandle: '@AkashDev001',
    social: {
        x: 'https://x.com/AkashDev001',
        linkedin: 'https://www.linkedin.com/in/akash-parmar-/',
        github: 'https://github.com/Akash-cloud001',
    },
    sameAs: [
        'https://github.com/Akash-cloud001',
        'https://www.linkedin.com/in/akash-parmar-/',
        'https://x.com/AkashDev001',
        FOLIO_2025_URL,
    ],
} as const;

export const contactMailto = `mailto:${siteConfig.email}`;

/** Google Analytics 4 — override with NEXT_PUBLIC_GA_MEASUREMENT_ID */
export const GA_MEASUREMENT_ID =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-ETPND6JE72';
