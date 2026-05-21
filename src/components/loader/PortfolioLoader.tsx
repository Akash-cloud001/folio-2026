'use client';

import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { VT323 } from 'next/font/google';
import { siteConfig } from '@/lib/site';

const loaderFont = VT323({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-loader',
    display: 'swap',
});

const Loader = dynamic(() => import('./Loader').then((m) => m.Loader), {
    ssr: false,
});

const STORAGE_KEY = 'folio-2026-setup-complete';

type Phase = 'init' | 'loading' | 'ready';

interface PortfolioLoaderProps {
    children: React.ReactNode;
}

/**
 * First-visit DOS-style setup screen on `/`.
 * Desktop mounts only after dismiss so window animations run while visible.
 */
export function PortfolioLoader({ children }: PortfolioLoaderProps) {
    const [phase, setPhase] = useState<Phase>('init');

    useEffect(() => {
        try {
            const completed = sessionStorage.getItem(STORAGE_KEY) === '1';
            setPhase(completed ? 'ready' : 'loading');
        } catch {
            setPhase('ready');
        }
    }, []);

    const complete = useCallback(() => {
        try {
            sessionStorage.setItem(STORAGE_KEY, '1');
        } catch {
            /* private mode */
        }
        setPhase('ready');
    }, []);

    if (phase === 'init') {
        return (
            <div
                className={`${loaderFont.variable} fixed inset-0 z-99999 bg-[#050505]`}
                aria-hidden
            />
        );
    }

    return (
        <div className={`${loaderFont.variable} h-dvh min-h-0 w-full overflow-hidden`}>
            {phase === 'loading' && (
                <Loader
                    onComplete={complete}
                    onSkip={complete}
                    duration={4500}
                    title="AKASHPARMAR.dev 2026"
                    subtitle="Professional Portfolio Setup"
                    experienceName={siteConfig.name.toUpperCase()}
                />
            )}
            {phase === 'ready' ? (
                <div className="relative h-full min-h-0 w-full">{children}</div>
            ) : null}
        </div>
    );
}
