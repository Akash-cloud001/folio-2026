'use client';

import React, { createContext, useContext, useRef } from 'react';
import { DitherBackground } from '@/components/backgrounds/DitherBackground';

const DesktopDragBoundsContext = createContext<React.RefObject<HTMLDivElement | null> | null>(
    null
);

export function useDesktopDragBounds() {
    return useContext(DesktopDragBoundsContext);
}

interface DesktopProps {
    children: React.ReactNode;
    className?: string;
    bottomBar?: React.ReactNode;
}

export function Desktop({ children, className, bottomBar }: DesktopProps) {
    const dragBoundsRef = useRef<HTMLDivElement>(null);

    return (
        <div
            className={`relative flex h-full min-h-0 w-full max-h-full flex-col overflow-hidden ${className}`}
        >
            <DitherBackground colorIntensity={1} />

            <DesktopDragBoundsContext.Provider value={dragBoundsRef}>
                <div
                    ref={dragBoundsRef}
                    className="pointer-events-none relative z-10 h-full min-h-0 w-full min-w-0 flex-1 overflow-hidden"
                >
                    {children}
                </div>
            </DesktopDragBoundsContext.Provider>

            {bottomBar && (
                <div className="relative z-40 w-full shrink-0">
                    {bottomBar}
                </div>
            )}
        </div>
    );
}
