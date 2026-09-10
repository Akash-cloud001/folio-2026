/**
 * Shared career experience + city Elephant narration lines.
 */

export type ExperienceEntry = {
    id: number;
    role: string;
    company: string;
    type: string;
    period: string;
    duration: string;
    location: string;
    workMode: string;
    skills: string[];
    description: string;
};

export const EXPERIENCE_ENTRIES: ExperienceEntry[] = [
    {
        id: 1,
        role: 'Frontend Developer',
        company: 'Duple IT Solutions Pvt. Ltd.',
        type: 'Full-time',
        period: 'Sep 2025 - Sep 2026',
        duration: '1 yr',
        location: 'Mohali',
        workMode: 'On-site',
        skills: [
            'Next.js',
            'TypeScript',
            'Tailwind',
            'Vercel',
            'Cursor',
            'Antigravity',
        ],
        description:
            'Building scalable web applications with modern frontend technologies.',
    },
    {
        id: 2,
        role: 'UI Developer',
        company: 'EvoMorf',
        type: 'Full-time',
        period: 'Jan 2024 - May 2025',
        duration: '1 yr 5 mos',
        location: 'Mohali, India',
        workMode: 'On-site',
        skills: [
            'Front-End Development',
            'UI/UX',
            'React',
            'JavaScript',
            'Vue',
            'Nuxt2/3',
            'Tailwind',
            'Next.js',
        ],
        description:
            'Developed user interfaces and implemented design systems for web applications.',
    },
    {
        id: 3,
        role: 'Cyber Security Intern',
        company: 'Accenture in India',
        type: 'Internship',
        period: 'Apr 2023 - Aug 2023',
        duration: '5 mos',
        location: 'Bengaluru, Karnataka, India',
        workMode: 'Remote',
        skills: ['Teamwork', 'Cyber Security', 'Problem Solving'],
        description:
            'Worked on security protocols and vulnerability assessments.',
    },
];

/** Spoken / typed lines for the Experience Elephant guide. */
export const EXPERIENCE_DIALOGUE: string[] = [
    "Hey traveler — I'm Ellie, your Experience guide.",
    "Akash's path started with a Cyber Security internship at Accenture in Bengaluru — five months of teamwork, problem-solving, and security fundamentals.",
    'Then he moved into UI development at EvoMorf in Mohali — React, Vue, Nuxt, and design systems for real products.',
    "Today he's a Frontend Developer at Duple IT Solutions — shipping scalable apps with Next.js, TypeScript, and modern AI tooling.",
    'Walk the city for projects, or hit Read to see the full timeline yourself. Ready when you are!',
];

export const EXPERIENCE_GUIDE = {
    position: [-4.7, 0, -6.35] as [number, number, number],
    rotationY: Math.PI,
    interactRadius: 2.8,
    model: '/pets/Models/GLB%20format/animal-elephant.glb',
    scale: 0.55,
};
