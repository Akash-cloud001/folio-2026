import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CASE_STUDY_SLUGS, getCaseStudy } from '@/data/case-studies';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const study = getCaseStudy(slug);
    if (!study) return { title: 'Case study' };
    return {
        title: `${study.title} — Case study`,
        description: study.tagline,
    };
}

export default async function CaseStudyPage({ params }: Props) {
    const { slug } = await params;
    const study = getCaseStudy(slug);
    if (!study) notFound();

    return (
        <article>
            <nav className="font-geist-mono text-xs text-zinc-500">
                <Link href="/case-studies" className="transition-colors hover:text-white">
                    Case studies
                </Link>
                <span className="mx-2 text-zinc-600">/</span>
                <span className="text-zinc-400">{study.title}</span>
            </nav>

            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {study.title}
            </h1>
            <p className="mt-3 text-lg text-zinc-400">{study.tagline}</p>

            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-y border-white/10 py-4 font-geist-mono text-xs uppercase tracking-wider text-zinc-500">
                <div>
                    <dt className="text-zinc-600">Year</dt>
                    <dd className="mt-0.5 text-zinc-300">{study.year}</dd>
                </div>
                <div>
                    <dt className="text-zinc-600">Role</dt>
                    <dd className="mt-0.5 text-zinc-300">{study.role}</dd>
                </div>
            </dl>

            <section className="mt-10">
                <h2 className="font-geist-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                    Overview
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">{study.summary}</p>
            </section>

            <section className="mt-10">
                <h2 className="font-geist-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                    Highlights
                </h2>
                <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-sm leading-relaxed text-zinc-300 sm:text-base">
                    {study.highlights.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </section>

            <p className="mt-12 border-t border-white/10 pt-8 text-sm text-zinc-500">
                This is a starter case study page. Replace copy and add imagery, metrics, and links as
                you flesh out each project.
            </p>
        </article>
    );
}
