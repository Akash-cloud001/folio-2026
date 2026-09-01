import { CASE_STUDY_SLUGS, SITE_URL, siteConfig } from '@/lib/site';
import { getFaqGraphNode } from '@/lib/ai-seo';

export function getSiteJsonLd() {
    const personId = `${SITE_URL}/#person`;
    const websiteId = `${SITE_URL}/#website`;

    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Person',
                '@id': personId,
                name: siteConfig.name,
                jobTitle: siteConfig.jobTitle,
                url: SITE_URL,
                email: siteConfig.email,
                image: `${SITE_URL}${siteConfig.ogImagePath}`,
                sameAs: [...siteConfig.sameAs],
                knowsAbout: [
                    'Next.js',
                    'React',
                    'TypeScript',
                    'Node.js',
                    'MongoDB',
                    'Full Stack Development',
                    'WebGL',
                    'Three.js',
                    'Product Architecture',
                    'Fintech',
                ],
                description: siteConfig.description,
            },
            {
                '@type': 'WebSite',
                '@id': websiteId,
                name: siteConfig.title,
                url: SITE_URL,
                description: siteConfig.description,
                inLanguage: 'en',
                publisher: { '@id': personId },
            },
            {
                '@type': 'ProfilePage',
                '@id': `${SITE_URL}/#profile`,
                url: SITE_URL,
                name: siteConfig.title,
                description: siteConfig.description,
                isPartOf: { '@id': websiteId },
                about: { '@id': personId },
                primaryImageOfPage: {
                    '@type': 'ImageObject',
                    url: `${SITE_URL}${siteConfig.ogImagePath}`,
                },
            },
            {
                '@type': 'CollectionPage',
                '@id': `${SITE_URL}/case-studies#collection`,
                url: `${SITE_URL}/case-studies`,
                name: 'Case studies — Akash Parmar',
                description:
                    'Selected project case studies — Folio 2026, Tradzu, My Forex Firms, Nestingo.',
                isPartOf: { '@id': websiteId },
                hasPart: CASE_STUDY_SLUGS.map((slug) => ({
                    '@type': 'WebPage',
                    url: `${SITE_URL}/case-studies/${slug}`,
                })),
            },
            getFaqGraphNode(),
        ],
    };
}
