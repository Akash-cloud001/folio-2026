'use client';

import type { ReactNode } from 'react';

function KeyCap({
    label,
    wide,
}: {
    label: string;
    wide?: boolean;
}) {
    return (
        <span
            className={`inline-flex h-7 items-center justify-center rounded-md border border-amber-500/35 bg-zinc-800/90 font-geist-mono text-[10px] font-semibold uppercase tracking-wide text-amber-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_0_0_#27272a] ${
                wide ? 'min-w-[3.75rem] px-2.5' : 'w-7'
            }`}
        >
            {label}
        </span>
    );
}

function KeyCluster({
    label,
    children,
}: {
    label: string;
    children: ReactNode;
}) {
    return (
        <div className="flex flex-col items-center gap-1">
            {children}
            <span className="font-geist-mono text-[8px] uppercase tracking-[0.18em] text-zinc-400">
                {label}
            </span>
        </div>
    );
}

export function ControlsHint() {
    return (
        <div className="pointer-events-none absolute bottom-4 right-4 z-20 sm:bottom-5 sm:right-5">
            <div className="flex items-end gap-3 rounded-xl border border-white/10 bg-zinc-950/75 px-3 py-2.5 shadow-lg backdrop-blur-md">
                <KeyCluster label="Drive">
                    <div className="flex flex-col items-center gap-1">
                        <KeyCap label="W" />
                        <div className="flex gap-1">
                            <KeyCap label="A" />
                            <KeyCap label="S" />
                            <KeyCap label="D" />
                        </div>
                    </div>
                </KeyCluster>

                <KeyCluster label="Brake">
                    <KeyCap label="Space" wide />
                </KeyCluster>

                <KeyCluster label="Camera">
                    <KeyCap label="C" />
                </KeyCluster>
            </div>
        </div>
    );
}
