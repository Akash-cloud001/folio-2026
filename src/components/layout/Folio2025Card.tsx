'use client';

import { ArrowUpRight } from 'lucide-react';

const FOLIO_2025 = {
    title: 'Folio-2025',
    url: 'https://akash-codes.in',
    imgUrl: '/projects/pro-3.jpeg',
    smallDesc: '3D portfolio site with immersive visuals and smooth animations. Built using R3F & Drei.',
};

/** Window body content — drag/focus handled by parent `Window`. */
export function Folio2025Card() {
    return (
        <a
            href={FOLIO_2025.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex flex-col overflow-hidden transition-colors hover:bg-white/5"
        >
            <div className="relative aspect-[16/10] w-full bg-zinc-900/80">
                <video
                    src={'/folio-2025/vdo.mp4'}
                    poster={FOLIO_2025.imgUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={`${FOLIO_2025.title} preview`}
                    className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none"
                />
            </div>
            <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                    <p className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
                        {FOLIO_2025.title}
                    </p>
                    <ArrowUpRight className="size-3.5 shrink-0 text-zinc-400" aria-hidden />
                </div>
            </div>
        </a>
    );
}
