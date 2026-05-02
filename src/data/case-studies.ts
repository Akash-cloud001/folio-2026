export type CaseStudySummary = {
    slug: string;
    title: string;
    tagline: string;
    year: string;
    role: string;
};

export type CaseStudy = CaseStudySummary & {
    summary: string;
    highlights: string[];
};

export const CASE_STUDY_SLUGS = ['my-forex-firms', 'nestingo'] as const;

export type CaseStudySlug = (typeof CASE_STUDY_SLUGS)[number];

export const CASE_STUDIES: Record<string, CaseStudy> = {
    'my-forex-firms': {
        slug: 'my-forex-firms',
        title: 'My Forex Firms',
        tagline: 'Marketing and product surfaces for a forex prop ecosystem.',
        year: '2024',
        role: 'Frontend / UI',
        summary:
            'Built fast, credible landing and onboarding flows with a focus on conversion, trust signals, and responsive layouts across breakpoints.',
        highlights: [
            'Responsive marketing pages with consistent design system patterns',
            'Performance-conscious assets and layout for mobile-first traffic',
            'Collaboration with stakeholders to iterate copy and structure quickly',
        ],
    },
    nestingo: {
        slug: 'nestingo',
        title: 'Nestingo',
        tagline: 'Product UI for a modern web experience.',
        year: '2024',
        role: 'Frontend',
        summary:
            'Shipped interface work focused on clarity, accessibility-minded structure, and maintainable component boundaries.',
        highlights: [
            'Component-driven UI aligned with brand and content needs',
            'State and data boundaries kept predictable for future features',
            'Polished interactions without sacrificing load time',
        ],
    },
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
    return CASE_STUDIES[slug];
}

export function listCaseStudies(): CaseStudySummary[] {
    return CASE_STUDY_SLUGS.map((slug) => CASE_STUDIES[slug]);
}
