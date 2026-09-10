'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { CITY_KARTS, type KartId } from '@/data/akash-city/karts';

type OnboardingOverlayProps = {
    gameReady: boolean;
    selectedId: KartId | null;
    onSelectKart: (id: KartId) => void;
    onEnter: (kartId: KartId) => void;
};

export function OnboardingOverlay({
    gameReady,
    selectedId,
    onSelectKart,
    onEnter,
}: OnboardingOverlayProps) {
    useEffect(() => {
        if (!gameReady || !selectedId) return;
        onEnter(selectedId);
    }, [gameReady, selectedId, onEnter]);

    return (
        <div className="absolute inset-0 z-40 flex items-center justify-center overflow-y-auto px-4 py-6">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 backdrop-blur-[10px]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1a2218]/55 via-[#2a3824]/40 to-[#1a2218]/60"
            />

            <div className="relative z-10 my-auto flex w-full max-w-2xl flex-col items-center gap-4">
                <p className="font-geist-mono text-3xl uppercase tracking-widest text-white/75">
                    Akash City
                </p>
                <p className="max-w-md text-center text-sm text-white/85">
                    Pick a kart to enter the city.
                </p>

                <div className="w-full rounded-xl border border-white/15 bg-black/45 p-3 shadow-xl backdrop-blur-md sm:p-4">
                    <p className="mb-3 font-geist-mono text-[9px] uppercase tracking-[0.25em] text-white/60">
                        Choose your kart
                    </p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                        {CITY_KARTS.map((kart) => {
                            const selected = selectedId === kart.id;
                            return (
                                <button
                                    key={kart.id}
                                    type="button"
                                    onClick={() => onSelectKart(kart.id)}
                                    className={`group flex flex-col items-center gap-1.5 rounded-lg border p-2 transition ${
                                        selected
                                            ? 'border-amber-300 bg-amber-400/20 ring-2 ring-amber-300/60'
                                            : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                                    }`}
                                >
                                    <div className="relative aspect-square w-full overflow-hidden rounded-md bg-[#121612]">
                                        <Image
                                            src={kart.preview}
                                            alt={kart.label}
                                            fill
                                            sizes="120px"
                                            className="object-contain p-1"
                                        />
                                    </div>
                                    <span className="font-geist-mono text-[9px] uppercase tracking-wider text-white/85">
                                        {kart.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <Link
                    href="/"
                    className="text-xs text-white/70 hover:text-white hover:underline"
                >
                    ← Back to Portfolio
                </Link>

                {!gameReady ? (
                    <p className="font-geist-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
                        Loading world…
                    </p>
                ) : null}
            </div>
        </div>
    );
}
