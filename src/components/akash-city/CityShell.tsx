'use client';

import dynamic from 'next/dynamic';
import { Leva } from 'leva';
import Link from 'next/link';
import { Component, type ErrorInfo, type ReactNode, useCallback, useState } from 'react';
import type { KartId } from '@/data/akash-city/karts';
import { useCityStore } from '@/components/akash-city/cityStore';
import { ControlsHint } from '@/components/akash-city/ControlsHint';
import { ExperienceModal } from '@/components/akash-city/ExperienceModal';
import { AboutModal } from '@/components/akash-city/AboutModal';
import { MobileStick } from '@/components/akash-city/MobileStick';
import { OnboardingOverlay } from '@/components/akash-city/OnboardingOverlay';

const CityCanvas = dynamic(
    () =>
        import('@/components/akash-city/CityCanvas').then((m) => m.CityCanvas),
    {
        ssr: false,
        loading: () => (
            <div className="absolute inset-0 flex items-center justify-center bg-[#1a2218]">
                <p className="font-geist-mono text-xs uppercase tracking-[0.2em] text-zinc-300">
                    Loading Akash City…
                </p>
            </div>
        ),
    },
);

type ShellPhase = 'onboarding' | 'ready' | 'error';

class CityErrorBoundary extends Component<
    { children: ReactNode; onError: (message: string) => void },
    { hasError: boolean }
> {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        void info;
        this.props.onError(error.message || 'Failed to render Akash City.');
    }

    render() {
        if (this.state.hasError) return null;
        return this.props.children;
    }
}

export function CityShell() {
    const [phase, setPhase] = useState<ShellPhase>('onboarding');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [gameReady, setGameReady] = useState(false);
    const [draftKartId, setDraftKartId] = useState<KartId | null>(null);
    const activeDistrict = useCityStore((s) => s.activeDistrict);
    const setControlsEnabled = useCityStore((s) => s.setControlsEnabled);
    const setSelectedKartId = useCityStore((s) => s.setSelectedKartId);

    const selectKart = (kartId: KartId) => {
        setDraftKartId(kartId);
        setSelectedKartId(kartId);
    };

    const enterCity = useCallback((kartId: KartId) => {
        setSelectedKartId(kartId);
        setControlsEnabled(true);
        setPhase('ready');
    }, [setControlsEnabled, setSelectedKartId]);

    if (phase === 'error') {
        return (
            <div className="flex h-dvh w-full flex-col items-center justify-center gap-6 bg-zinc-950 px-6 text-center text-zinc-100">
                <p className="font-geist-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Akash City
                </p>
                <h1 className="max-w-md text-2xl font-semibold tracking-tight">
                    Akash City couldn&apos;t load.
                </h1>
                <p className="max-w-sm text-sm text-zinc-400">
                    {errorMessage ?? 'Something went wrong while starting the city.'}
                </p>
                <Link
                    href="/"
                    className="rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm"
                >
                    View Portfolio
                </Link>
            </div>
        );
    }

    return (
        <div className="relative h-dvh w-full overflow-hidden bg-[#1a2218] text-zinc-100">
            <CityErrorBoundary
                onError={(message) => {
                    setErrorMessage(message);
                    setPhase('error');
                }}
            >
                <CityCanvas
                    onReady={() => setGameReady(true)}
                    onError={(message) => {
                        setErrorMessage(message);
                        setPhase('error');
                    }}
                />
            </CityErrorBoundary>

            {phase === 'onboarding' ? (
                <OnboardingOverlay
                    gameReady={gameReady}
                    selectedId={draftKartId}
                    onSelectKart={selectKart}
                    onEnter={enterCity}
                />
            ) : null}

            {phase === 'ready' ? (
                <>
                    <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-between p-4 sm:p-5">
                        <div className="pointer-events-auto">
                            <p className="font-geist-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                                Akash City
                            </p>
                            {activeDistrict ? (
                                <p className="mt-1 text-xs text-zinc-400">
                                    Near{' '}
                                    {activeDistrict === 'people'
                                        ? 'EXPERIENCE'
                                        : activeDistrict === 'ai'
                                          ? 'PROJECTS'
                                          : activeDistrict.toUpperCase()}
                                </p>
                            ) : null}
                        </div>
                        <Link
                            href="/"
                            className="pointer-events-auto rounded-md border border-white/15 bg-zinc-950/70 px-3 py-1.5 text-xs backdrop-blur-sm"
                        >
                            ← Back to Portfolio
                        </Link>
                    </header>

                    <ExperienceModal />
                    <AboutModal />

                    <MobileStick />
                    <ControlsHint />

                    <p className="pointer-events-none absolute bottom-4 left-4 z-20 max-w-[10rem] font-geist-mono text-[9px] text-zinc-500">
                        Models: Kenney (CC0)
                    </p>

                    <Leva
                        collapsed
                        oneLineLabels
                        hideCopyButton
                        titleBar={{
                            title: 'Akash City Layout',
                            filter: false,
                        }}
                    />
                </>
            ) : null}
        </div>
    );
}
