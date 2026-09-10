'use client';

import Link from 'next/link';
import { CITY_LOCATION_BY_ID, type CityLocationId } from '@/data/akash-city/locations';
import { useCityStore } from '@/components/akash-city/cityStore';

type DistrictPanelProps = {
    districtId: CityLocationId;
};

export function DistrictPanel({ districtId }: DistrictPanelProps) {
    const closePanel = useCityStore((s) => s.closePanel);
    const location = CITY_LOCATION_BY_ID[districtId];

    return (
        <aside
            className="pointer-events-auto absolute bottom-24 left-1/2 z-30 w-[min(92vw,22rem)] -translate-x-1/2 rounded-xl border border-white/10 bg-zinc-950/90 p-4 text-zinc-100 shadow-xl backdrop-blur-md sm:bottom-28"
            role="dialog"
            aria-labelledby="district-title"
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="font-geist-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                        District
                    </p>
                    <h2
                        id="district-title"
                        className="mt-1 text-lg font-semibold tracking-tight"
                    >
                        {location.name}
                    </h2>
                </div>
                <button
                    type="button"
                    onClick={closePanel}
                    className="rounded-md border border-white/10 px-2 py-1 text-xs text-zinc-400 hover:text-zinc-100"
                    aria-label="Close district panel"
                >
                    Esc
                </button>
            </div>
            <p className="mt-2 text-sm text-zinc-400">{location.description}</p>
            <Link
                href={location.href}
                className="mt-4 inline-flex rounded-md bg-white px-3 py-2 text-sm font-medium text-zinc-950"
            >
                {location.ctaLabel}
            </Link>
        </aside>
    );
}
