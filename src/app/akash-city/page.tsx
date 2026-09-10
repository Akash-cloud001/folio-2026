import type { Metadata } from 'next';
import { CityShell } from '@/components/akash-city/CityShell';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
    title: 'Akash City',
    description:
        'Walk a 3D industrial campus — projects, experience, and business around a central home.',
    path: '/akash-city',
    keywords: [
        'Akash City',
        '3D portfolio',
        'React Three Fiber',
        'Kenney',
        'interactive city',
    ],
});

export default function AkashCityPage() {
    return <CityShell />;
}
