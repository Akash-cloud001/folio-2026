import Link from 'next/link';

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-dvh max-h-dvh flex-col overflow-hidden bg-black text-white">
            <header className="z-10 shrink-0 border-b border-white/10 bg-black/90 backdrop-blur-sm">
                <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
                    <Link
                        href="/"
                        className="font-geist-mono text-xs uppercase tracking-wider text-zinc-400 transition-colors hover:text-white"
                    >
                        ← Portfolio
                    </Link>
                    <Link
                        href="/case-studies"
                        className="font-geist-mono text-xs uppercase tracking-wider text-zinc-400 transition-colors hover:text-white"
                    >
                        Case studies
                    </Link>
                </div>
            </header>
            <div className="min-h-0 flex-1">{children}</div>
        </div>
    );
}
