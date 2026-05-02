import Link from 'next/link';
import type { Metadata } from 'next';
import { listCaseStudies } from '@/data/case-studies';

export const metadata: Metadata = {
    title: 'Case studies',
    description: 'Selected project case studies — My Forex Firms, Nestingo, and more.',
};

export default function CaseStudiesIndexPage() {
    const studies = listCaseStudies();

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

            <ul className="mt-10 flex flex-col gap-3">
                {studies.map((project) => (
                    <li key={project.slug}>
                        <Link
                            href={`/case-studies/${project.slug}`}
                            className="group block rounded-lg border border-white/10 bg-white/2 p-4 transition-colors hover:border-white/25 hover:bg-white/4"
                        >
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                                <span className="text-lg font-semibold text-white group-hover:underline">
                                    {project.title}
                                </span>
                                <span className="font-geist-mono text-xs text-zinc-500">{project.year}</span>
                            </div>
                            <p className="mt-1 text-sm text-zinc-400">{project.tagline}</p>
                            <p className="mt-2 font-geist-mono text-[10px] uppercase tracking-wider text-zinc-500">
                                {project.role}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
