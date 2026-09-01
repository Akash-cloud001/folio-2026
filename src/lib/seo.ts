import type { Metadata } from 'next';
import { SITE_URL, siteConfig } from '@/lib/site';

export function absoluteUrl(path: string): string {
    const normalized = path.startsWith('/') ? path : `/${path}`;
    return `${SITE_URL}${normalized}`;
}

type PageMetadataInput = {
    title: string;
    description: string;
    path: string;
    keywords?: string[];
    ogImage?: string;
    ogImageAlt?: string;
    ogType?: 'website' | 'article';
};

export function buildPageMetadata({
    title,
    description,
    path,
    keywords,
    ogImage = siteConfig.ogImagePath,
    ogImageAlt = siteConfig.ogImageAlt,
    ogType = 'website',
}: PageMetadataInput): Metadata {
    const url = absoluteUrl(path);

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: url,
        },
        openGraph: {
            type: ogType,
            locale: siteConfig.locale,
            url,
            siteName: siteConfig.name,
            title,
            description,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: ogImageAlt,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            creator: siteConfig.twitterHandle,
            images: [ogImage],
        },
    };
}

type CaseStudyMetadataInput = {
    slug: string;
    title: string;
    description: string;
    keywords?: string[];
    coverImage: string;
    coverImageAlt?: string;
};

export function buildCaseStudyMetadata({
    slug,
    title,
    description,
    keywords,
    coverImage,
    coverImageAlt,
}: CaseStudyMetadataInput): Metadata {
    return buildPageMetadata({
        title,
        description,
        path: `/case-studies/${slug}`,
        keywords,
        ogImage: coverImage,
        ogImageAlt: coverImageAlt ?? `${title} — case study cover`,
        ogType: 'article',
    });
}
