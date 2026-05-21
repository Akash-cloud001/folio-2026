import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Tradzu — Case Study (Coming Soon)',
    description:
        'Tradzu CTO case study — gamified trading rewards ecosystem. Full write-up publishing soon.',
    robots: { index: false, follow: true },
};

export default function TradzuCaseStudyPage() {
    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
            <p className="font-geist-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                Case study
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Tradzu
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
                Coming soon — this case study is being finalized and will be published shortly.
            </p>
            <Link
                href="/case-studies"
                className="mt-8 inline-flex h-10 items-center justify-center rounded-md border border-white/20 bg-transparent px-6 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
                Back to case studies
            </Link>
        </div>
    );
}
