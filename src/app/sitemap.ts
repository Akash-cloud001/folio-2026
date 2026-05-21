import type { MetadataRoute } from 'next';
import { CASE_STUDY_SLUGS, SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    const caseStudyEntries: MetadataRoute.Sitemap = CASE_STUDY_SLUGS.map((slug) => ({
        url: `${SITE_URL}/case-studies/${slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    return [
        {
            url: SITE_URL,
            lastModified,
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${SITE_URL}/case-studies`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        ...caseStudyEntries,
    ];
}
