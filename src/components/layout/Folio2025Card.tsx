'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const AKASH_CITY = {
    title: 'Akash City',
    href: '/akash-city',
    imgUrl: '/projects/akash-city.png',
};

/** Window body content — drag/focus handled by parent `Window`. */
export function Folio2025Card() {
    return (
        <Link
            href={AKASH_CITY.href}
            className="hidden md:flex flex-col overflow-hidden transition-colors hover:bg-white/5"
        >
            <div className="relative aspect-[16/10] w-full bg-zinc-900/80">
                <Image
                    src={AKASH_CITY.imgUrl}
                    alt={`${AKASH_CITY.title} preview`}
                    fill
                    sizes="240px"
                    className="object-cover object-center"
                    priority
                />
            </div>
            <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                    <p className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
                        {AKASH_CITY.title}
                    </p>
                    <ArrowUpRight className="size-3.5 shrink-0 text-zinc-400" aria-hidden />
                </div>
            </div>
        </Link>
    );
}
