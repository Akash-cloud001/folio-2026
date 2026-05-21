import Link from 'next/link';

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-dvh max-h-dvh flex-col overflow-y-auto bg-black text-white">
            <header className="z-10 shrink-0 border-b border-white/10 bg-black/90 backdrop-blur-sm">
                <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
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
            <main className="mx-auto min-h-0 w-full max-w-5xl flex-1  px-4 py-8 sm:px-6 sm:py-10">
                {children}
            </main>
        </div>
    );
}
