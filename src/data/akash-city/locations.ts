/**
 * District copy + portfolio links for 3D Akash City.
 */

export type CityLocationId =
    | 'ideas'
    | 'products'
    | 'code'
    | 'ai'
    | 'people'
    | 'business';

export type CityLocation = {
    id: CityLocationId;
    name: string;
    shortLabel: string;
    description: string;
    href: string;
    ctaLabel: string;
};

export const CITY_LOCATIONS: CityLocation[] = [
    {
        id: 'ideas',
        name: 'IDEAS',
        shortLabel: 'Ideas',
        description: 'Explore ideas, experiments and curiosity.',
        href: '/case-studies',
        ctaLabel: 'Explore case studies',
    },
    {
        id: 'products',
        name: 'PRODUCTS',
        shortLabel: 'Products',
        description: 'Turn ideas into real products.',
        href: '/case-studies',
        ctaLabel: 'View products',
    },
    {
        id: 'code',
        name: 'CODE',
        shortLabel: 'Code',
        description: 'Engineering the impossible.',
        href: '/case-studies/folio-2026',
        ctaLabel: 'See engineering',
    },
    {
        id: 'ai',
        name: 'PROJECTS',
        shortLabel: 'Projects',
        description:
            'Project showcase — Tradzu, MyForexFirms, Nexetro (coming soon), Nestingo, Portfolio, Akash City.',
        href: '/case-studies',
        ctaLabel: 'View projects',
    },
    {
        id: 'people',
        name: 'EXPERIENCE',
        shortLabel: 'Experience',
        description:
            'Career pavilion — talk to Ellie the Elephant or read the full timeline.',
        href: '/',
        ctaLabel: 'View experience',
    },
    {
        id: 'business',
        name: 'BUSINESS',
        shortLabel: 'Business',
        description: 'Create impact. Work together.',
        href: '/',
        ctaLabel: 'Get in touch',
    },
];

export const CITY_LOCATION_BY_ID = Object.fromEntries(
    CITY_LOCATIONS.map((location) => [location.id, location]),
) as Record<CityLocationId, CityLocation>;
