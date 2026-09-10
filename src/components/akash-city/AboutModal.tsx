'use client';

import { useEffect } from 'react';
import { About } from '@/components/sections/About';
import { useCityStore } from '@/components/akash-city/cityStore';

export function AboutModal() {
    const open = useCityStore((s) => s.aboutOpen);
    const closeAbout = useCityStore((s) => s.closeAbout);
    const setControlsEnabled = useCityStore((s) => s.setControlsEnabled);

    useEffect(() => {
        if (!open) return;
        setControlsEnabled(false);
        if (document.pointerLockElement) {
            document.exitPointerLock();
        }
        return () => {
            setControlsEnabled(true);
        };
    }, [open, setControlsEnabled]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.code === 'Escape') {
                e.preventDefault();
                closeAbout();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, closeAbout]);

    if (!open) return null;

    return (
        <div className="pointer-events-auto absolute inset-0 z-40 flex items-end justify-center bg-black/45 p-4 sm:items-center">
            <aside
                className="flex max-h-[min(88vh,40rem)] w-[min(96vw,42rem)] flex-col overflow-hidden rounded-xl border border-white/10 bg-zinc-950/95 text-zinc-100 shadow-2xl backdrop-blur-md"
                role="dialog"
                aria-labelledby="about-title"
            >
                <div className="flex shrink-0 items-start justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
                    <div>
                        <p className="font-geist-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                            Home · Pillo the Penguin
                        </p>
                        <h2
                            id="about-title"
                            className="mt-1 text-lg font-semibold tracking-tight"
                        >
                            About me
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={closeAbout}
                        className="rounded-md border border-white/10 px-2 py-1 text-xs text-zinc-400 hover:text-zinc-100"
                        aria-label="Close about"
                    >
                        Esc
                    </button>
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
                    <About />
                </div>
            </aside>
        </div>
    );
}
