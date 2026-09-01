import type { CaseStudyContent } from '@/components/case-studies/types';
import { absoluteUrl } from '@/lib/seo';
import { SITE_URL, siteConfig } from '@/lib/site';

type CaseStudyJsonLdProps = {
    study: CaseStudyContent;
};

export function CaseStudyJsonLd({ study }: CaseStudyJsonLdProps) {
    const url = absoluteUrl(`/case-studies/${study.slug}`);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: study.title,
        description: study.tagline,
        image: [absoluteUrl(study.coverImage)],
        author: {
            '@type': 'Person',
            name: siteConfig.name,
            url: SITE_URL,
            jobTitle: study.role ?? siteConfig.jobTitle,
        },
        publisher: {
            '@type': 'Person',
            name: siteConfig.name,
            url: SITE_URL,
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
        },
        url,
        ...(study.year
            ? {
                  datePublished: `${study.year}-01-01`,
              }
            : {}),
        keywords: study.categories?.join(', '),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
