import type { Metadata } from 'next';
import { HomeClient } from '@/components/home/HomeClient';
import { HomeSeoContent } from '@/components/seo/HomeSeoContent';
import { buildPageMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
    title: siteConfig.title,
    description: siteConfig.description,
    path: '/',
    keywords: [
        'Akash Parmar',
        'full stack developer',
        'Next.js developer',
        'React developer',
        'TypeScript developer',
        'portfolio',
        'WebGL portfolio',
        'CTO case study',
        'India developer',
    ],
});

export default function HomePage() {
    return (
        <>
            <HomeSeoContent />
            <HomeClient />
        </>
    );
}
