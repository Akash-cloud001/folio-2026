'use client';

import { useRef } from 'react';
import { useCityStore } from '@/components/akash-city/cityStore';

/** Simple virtual stick for mobile WASD equivalent. */
export function MobileStick() {
    const setMobileStick = useCityStore((s) => s.setMobileStick);
    const origin = useRef<{ x: number; y: number } | null>(null);
    const active = useRef(false);

    const update = (clientX: number, clientY: number) => {
        if (!origin.current) return;
        const dx = clientX - origin.current.x;
        const dy = clientY - origin.current.y;
        const max = 48;
        const x = Math.max(-1, Math.min(1, dx / max));
        const y = Math.max(-1, Math.min(1, dy / max));
        setMobileStick(x, y);
    };

    const end = () => {
        active.current = false;
        origin.current = null;
        setMobileStick(0, 0);
    };

    return (
        <div
            className="pointer-events-auto absolute bottom-24 left-4 z-30 h-28 w-28 touch-none rounded-full border border-white/15 bg-zinc-950/50 [@media(pointer:fine)]:hidden"
            onPointerDown={(event) => {
                active.current = true;
                origin.current = { x: event.clientX, y: event.clientY };
                event.currentTarget.setPointerCapture(event.pointerId);
                setMobileStick(0, 0);
            }}
            onPointerMove={(event) => {
                if (!active.current) return;
                update(event.clientX, event.clientY);
            }}
            onPointerUp={end}
            onPointerCancel={end}
            aria-label="Drive stick"
            role="application"
        >
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-white/20" />
            </div>
        </div>
    );
}
