import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Case studies',
    description: 'Selected project case studies — Tradzu, My Forex Firms, Nestingo, and more.',
};

/** Add an entry when you create `src/app/case-studies/<slug>/page.tsx`. */
const CASE_STUDIES = [
    {
        slug: 'tradzu',
        title: 'Tradzu',
        tagline:
            'CTO on a gamified trading rewards ecosystem — TZU Credits, ledger accounting, and marketplace retention.',
        year: '2025',
        role: 'CTO',
        coverImage: '/projects/tradzu/lading-page.png',
    },
    {
        slug: 'my-forex-firms',
        title: 'My Forex Firms',
        tagline:
            'CTO & lead developer on a trust-first prop trading platform — product engineering with SEO and backend partners.',
        year: '2026',
        role: 'CTO · Lead Developer',
        coverImage: '/projects/myforexfirms.png',
    },
    {
        slug: 'nestingo',
        title: 'Nestingo',
        tagline:
            'CTO on a tech-driven student accommodation ecosystem in Delhi NCR — discovery, operations, and admin infrastructure.',
        year: '2024',
        role: 'CTO',
        coverImage: '/projects/nestingo.png',
    },
] as const;

export default function CaseStudiesIndexPage() {
    return (
        <div>
            <h1 className="font-geist-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                Case studies
            </h1>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Selected work
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
                Deep dives into a few projects — stack, constraints, and what shipped. Click a title
                to open the full write-up.
            </p>

            <ul className="mt-10 flex flex-col gap-4">
                {CASE_STUDIES.map((project) => (
                    <li key={project.slug}>
                        <Link
                            href={`/case-studies/${project.slug}`}
                            className="group block overflow-hidden rounded-lg border border-white/10 bg-white/2 transition-colors hover:border-white/25 hover:bg-white/4"
                        >
                            <div className="relative aspect-[21/9] w-full bg-zinc-900/50">
                                <Image
                                    src={project.coverImage}
                                    alt={`${project.title} cover`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
                                    className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                                />
                            </div>
                            <div className="p-4">
                                <div className="flex flex-wrap items-baseline justify-between gap-2">
                                    <span className="text-lg font-semibold text-white group-hover:underline">
                                        {project.title}
                                    </span>
                                    <span className="font-geist-mono text-xs text-zinc-500">
                                        {project.year}
                                    </span>
                                </div>
                                <p className="mt-1 text-sm text-zinc-400">{project.tagline}</p>
                                <p className="mt-2 font-geist-mono text-[10px] uppercase tracking-wider text-zinc-500">
                                    {project.role}
                                </p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
