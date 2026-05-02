'use client';

import React, { useRef } from 'react';
import { DitherBackground } from '@/components/backgrounds/DitherBackground';

interface DesktopProps {
    children: React.ReactNode;
    className?: string;
    bottomBar?: React.ReactNode;
}

export function Desktop({ children, className, bottomBar }: DesktopProps) {
    const constraintsRef = useRef(null);

    return (
        <div
            ref={constraintsRef}
            className={`relative flex h-full min-h-0 w-full max-h-full flex-col overflow-hidden ${className}`}
        >
            <DitherBackground colorIntensity={1} />

            <div className="flex-1 relative w-full h-full">
                {children}
            </div>

            {bottomBar && (
                <div className="relative z-40 w-full shrink-0">
                    {bottomBar}
                </div>
            )}
        </div>
    );
}
