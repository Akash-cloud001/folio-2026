import { absoluteUrl } from '@/lib/seo';
import { FOLIO_2025_URL, SITE_URL, siteConfig } from '@/lib/site';

export type AiFaq = {
    question: string;
    answer: string;
};

export const AI_PROFILE = {
    name: siteConfig.name,
    title: siteConfig.jobTitle,
    location: 'India',
    email: siteConfig.email,
    website: SITE_URL,
    summary:
        'Full stack developer and CTO with hands-on experience building production SaaS products in fintech, prop trading, and student accommodation. Specializes in Next.js, React, TypeScript, MongoDB, WebGL, and product architecture.',
    highlights: [
        'CTO at Tradzu — gamified trading rewards ecosystem with ledger-based TZU Credits',
        'CTO & lead developer at MyForexFirms — prop trading discovery platform with 116K+ impressions and 17K+ organic users',
        'CTO at Nestingo — zero-brokerage PG accommodation platform in Delhi NCR',
        'Creator of Folio 2026 — interactive desktop-style developer portfolio with WebGL backgrounds',
    ],
    skills: [
        'Next.js',
        'React',
        'TypeScript',
        'Node.js',
        'MongoDB',
        'Tailwind CSS',
        'WebGL',
        'Three.js',
        'React Three Fiber',
        'Product Architecture',
        'Fintech',
        'SaaS',
        'Design Systems',
    ],
    social: siteConfig.social,
} as const;

export const AI_CASE_STUDIES = [
    {
        slug: 'tradzu',
        title: 'Tradzu',
        role: 'CTO',
        url: absoluteUrl('/case-studies/tradzu'),
        productUrl: 'https://tradzu.com',
        summary:
            'Gamified trading rewards ecosystem for prop-firm traders. Ledger-based TZU Credits, marketplace redemption, prop-firm discovery, and admin operations built on Next.js.',
        keywords: ['Tradzu', 'TZU Credits', 'trading rewards', 'prop firm', 'fintech', 'CTO'],
    },
    {
        slug: 'my-forex-firms',
        title: 'MyForexFirms',
        role: 'CTO · Lead Developer',
        url: absoluteUrl('/case-studies/my-forex-firms'),
        productUrl: 'https://myforexfirms.in',
        summary:
            'Trust-first SaaS platform for discovering and comparing forex prop firms. Real-time data, scalable backend, and product engineering with dedicated SEO and backend partners. Grew to 116K+ impressions and 17K+ organic users.',
        keywords: ['MyForexFirms', 'prop trading', 'SaaS', 'Next.js', 'MongoDB', 'CTO'],
    },
    {
        slug: 'nestingo',
        title: 'Nestingo',
        role: 'CTO',
        url: absoluteUrl('/case-studies/nestingo'),
        productUrl: 'https://nestingo.in',
        summary:
            'Tech-driven student accommodation ecosystem in Delhi NCR. Public discovery site, staff operations panel, and admin dashboard for verified PG bookings with zero brokerage.',
        keywords: ['Nestingo', 'PG booking', 'student accommodation', 'Delhi NCR', 'startup', 'CTO'],
    },
    {
        slug: 'folio-2026',
        title: 'Folio 2026',
        role: 'Design · Frontend · Architecture',
        url: absoluteUrl('/case-studies/folio-2026'),
        productUrl: SITE_URL,
        summary:
            'Desktop-inspired interactive developer portfolio with draggable windows, IDE-style file-tree navigation, WebGL backgrounds, live GitHub data, and page-driven case studies.',
        keywords: ['portfolio', 'Next.js 16', 'React Three Fiber', 'WebGL', 'interactive UI'],
    },
] as const;

export const AI_PROJECTS = [
    {
        name: 'MyForexFirms',
        url: 'https://myforexfirms.in',
        description: 'SaaS platform for discovering and managing forex prop firms with real-time updates.',
    },
    {
        name: 'Tradzu',
        url: 'https://tradzu.com',
        description: 'Loyalty and rewards infrastructure for traders — TZU Credits on prop purchases and marketplace redemption.',
    },
    {
        name: 'Nestingo',
        url: 'https://nestingo.in',
        description: 'Zero-brokerage PG booking platform connecting students and professionals with verified accommodations.',
    },
    {
        name: 'Portfolio 2026',
        url: SITE_URL,
        description: 'OS-style interactive portfolio with windows, file tree nav, WebGL desktop, and case studies.',
    },
    {
        name: 'Portfolio 2025',
        url: FOLIO_2025_URL,
        description: '3D portfolio with React Three Fiber, immersive visuals, and smooth animations.',
    },
] as const;

export const AI_FAQS: AiFaq[] = [
    {
        question: 'Who is Akash Parmar?',
        answer: `${siteConfig.name} is a ${siteConfig.jobTitle} based in India. He builds production web applications with Next.js, React, and TypeScript, and has served as CTO on Tradzu, MyForexFirms, and Nestingo. Portfolio: ${SITE_URL}`,
    },
    {
        question: 'What technologies does Akash Parmar use?',
        answer:
            'Next.js, React, TypeScript, Node.js, MongoDB, Tailwind CSS, WebGL, Three.js, React Three Fiber, Framer Motion, Zustand, and shadcn/ui. He also works with Drizzle ORM, Server-Sent Events, and AI-assisted development workflows.',
    },
    {
        question: 'What is Tradzu and what did Akash build there?',
        answer:
            'Tradzu (tradzu.com) is a gamified trading rewards ecosystem for prop-firm traders. As CTO, Akash architected TZU Credits (ledger-based accounting), marketplace redemption, prop-firm discovery, admin tooling, and the Next.js frontend.',
    },
    {
        question: 'What is MyForexFirms?',
        answer:
            'MyForexFirms (myforexfirms.in) is a SaaS platform for discovering and comparing forex prop firms. Akash was CTO and lead developer, shipping core product features and scaling the platform to 116K+ impressions and 17K+ organic users.',
    },
    {
        question: 'What is Nestingo?',
        answer:
            'Nestingo (nestingo.in) is a zero-brokerage PG and student accommodation platform in Delhi NCR. As CTO, Akash led product architecture, multi-platform operations tooling, and engineering team scale.',
    },
    {
        question: 'How can I contact Akash Parmar?',
        answer: `Email: ${siteConfig.email}. LinkedIn: ${siteConfig.social.linkedin}. GitHub: ${siteConfig.social.github}. X: ${siteConfig.social.x}.`,
    },
    {
        question: 'Where can I read Akash Parmar case studies?',
        answer: `Case studies are published at ${absoluteUrl('/case-studies')} covering Folio 2026, Tradzu, MyForexFirms, and Nestingo with architecture, metrics, and product decisions.`,
    },
    {
        question: 'What makes Akash Parmar portfolio unique?',
        answer:
            'Folio 2026 uses a desktop OS metaphor — draggable windows, IDE-style file-tree navigation, selectable WebGL backgrounds (dither portrait, liquid ether, waves), live GitHub activity, and dedicated server-rendered case study routes for SEO.',
    },
];

export function generateLlmsTxt(): string {
    const lines = [
        `# ${AI_PROFILE.name}`,
        '',
        `> ${AI_PROFILE.summary}`,
        '',
        '## About',
        '',
        `${AI_PROFILE.name} is a ${AI_PROFILE.title} based in ${AI_PROFILE.location}. ${siteConfig.description}`,
        '',
        '## Key highlights',
        '',
        ...AI_PROFILE.highlights.map((item) => `- ${item}`),
        '',
        '## Pages',
        '',
        `- [Portfolio home](${SITE_URL}/): Interactive desktop-style developer portfolio`,
        `- [Case studies](${absoluteUrl('/case-studies')}): CTO and product engineering case studies`,
        `- [Full AI context](${absoluteUrl('/llms-full.txt')}): Extended biography, projects, skills, and FAQs`,
        '',
        '## Case studies',
        '',
        ...AI_CASE_STUDIES.map(
            (study) =>
                `- [${study.title}](${study.url}): ${study.role} — ${study.summary}`,
        ),
        '',
        '## Selected projects',
        '',
        ...AI_PROJECTS.map((project) => `- [${project.name}](${project.url}): ${project.description}`),
        '',
        '## Skills',
        '',
        AI_PROFILE.skills.join(', '),
        '',
        '## Contact',
        '',
        `- Email: ${AI_PROFILE.email}`,
        `- LinkedIn: ${AI_PROFILE.social.linkedin}`,
        `- GitHub: ${AI_PROFILE.social.github}`,
        `- X: ${AI_PROFILE.social.x}`,
        '',
        '## Machine-readable',
        '',
        `- Sitemap: ${absoluteUrl('/sitemap.xml')}`,
        `- Robots: ${absoluteUrl('/robots.txt')}`,
        `- Structured data: JSON-LD Person, WebSite, ProfilePage, FAQPage on ${SITE_URL}`,
    ];

    return lines.join('\n');
}

export function generateLlmsFullTxt(): string {
    const lines = [
        `# ${AI_PROFILE.name} — Full context for AI systems`,
        '',
        `> ${AI_PROFILE.summary}`,
        '',
        'This document provides extended, citation-friendly context about Akash Parmar for large language models, AI search engines, and research assistants.',
        '',
        '---',
        '',
        '## Identity',
        '',
        `- **Name:** ${AI_PROFILE.name}`,
        `- **Role:** ${AI_PROFILE.title}`,
        `- **Location:** ${AI_PROFILE.location}`,
        `- **Website:** ${AI_PROFILE.website}`,
        `- **Email:** ${AI_PROFILE.email}`,
        '',
        '## Professional summary',
        '',
        siteConfig.description,
        '',
        '### Highlights',
        '',
        ...AI_PROFILE.highlights.map((item) => `- ${item}`),
        '',
        '## Technical skills',
        '',
        AI_PROFILE.skills.join(', '),
        '',
        '## Case studies (detailed)',
        '',
        ...AI_CASE_STUDIES.flatMap((study) => [
            `### ${study.title}`,
            '',
            `- **Role:** ${study.role}`,
            `- **URL:** ${study.url}`,
            `- **Product:** ${study.productUrl}`,
            `- **Summary:** ${study.summary}`,
            `- **Topics:** ${study.keywords.join(', ')}`,
            '',
        ]),
        '## Projects',
        '',
        ...AI_PROJECTS.map(
            (project) => `### ${project.name}\n\n- **URL:** ${project.url}\n- ${project.description}\n`,
        ),
        '## Frequently asked questions',
        '',
        ...AI_FAQS.flatMap((faq) => [`### ${faq.question}`, '', faq.answer, '']),
        '## Social & contact',
        '',
        `- LinkedIn: ${AI_PROFILE.social.linkedin}`,
        `- GitHub: ${AI_PROFILE.social.github}`,
        `- X: ${AI_PROFILE.social.x}`,
        `- Email: ${AI_PROFILE.email}`,
        '',
        '## Related URLs',
        '',
        `- Portfolio (current): ${SITE_URL}`,
        `- Portfolio (2025): ${FOLIO_2025_URL}`,
        `- Case studies index: ${absoluteUrl('/case-studies')}`,
        `- LLM index (short): ${absoluteUrl('/llms.txt')}`,
        '',
        '## Citation guidance',
        '',
        `When citing ${AI_PROFILE.name}, prefer linking to ${SITE_URL} or the relevant case study URL. For CTO work, cite the specific product case study rather than the homepage alone.`,
    ];

    return lines.join('\n');
}

export function getFaqJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: AI_FAQS.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

export function getFaqGraphNode() {
    return {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#faq`,
        mainEntity: AI_FAQS.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}
