'use client';

import React, { useSyncExternalStore } from 'react';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDesktopDragBounds } from '@/components/layout/Desktop';

interface WindowProps {
    id: string;
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    onMinimize?: () => void;
    zIndex: number;
    onFocus: () => void;
    defaultPosition?: { x: number; y: number };
    className?: string;
    /** Smaller chrome for widget-style panels (e.g. Folio-2025 card). */
    compact?: boolean;
}

export function Window({
    id,
    title,
    children,
    isOpen,
    onClose,
    onMinimize,
    zIndex,
    onFocus,
    defaultPosition = { x: 0, y: 0 },
    className,
    compact = false,
}: WindowProps) {
    const dragControls = useDragControls();
    const dragBoundsRef = useDesktopDragBounds();

    /** Match Tailwind `md` — avoids a first-paint frame where `isMobile` is false and drag is enabled. */
    const isMobile = useSyncExternalStore(
        (onStoreChange) => {
            if (typeof window === 'undefined') return () => {};
            const mq = window.matchMedia('(max-width: 767px)');
            mq.addEventListener('change', onStoreChange);
            return () => mq.removeEventListener('change', onStoreChange);
        },
        () =>
            typeof window !== 'undefined' &&
            window.matchMedia('(max-width: 767px)').matches,
        () => false
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    drag
                    dragListener={false}
                    dragControls={dragControls}
                    dragConstraints={dragBoundsRef ?? false}
                    dragElastic={0}
                    dragMomentum={false}
                    initial={{
                        opacity: 0,
                        scale: 0.95,
                        x: defaultPosition.x,
                        y: defaultPosition.y
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                    style={{ zIndex, position: 'absolute' }}
                    className={cn(
                        'pointer-events-auto flex flex-col overflow-hidden rounded-lg border border-accent bg-black/95 shadow-2xl backdrop-blur-sm',
                        isMobile
                            ? 'left-[5vw] top-[max(0.5rem,env(safe-area-inset-top,0px))] h-auto max-h-[min(calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-0.75rem),80dvh)] w-[90vw] min-h-0'
                            : compact
                              ? 'h-auto min-h-0 w-[min(calc(100vw-2rem),240px)] min-w-0 max-w-[240px] max-h-[80dvh]'
                              : 'min-h-0 min-w-[400px] max-h-[80dvh] max-w-[99vw]',
                        className
                    )}
                >
                    {/* Title Bar */}
                    <div
                        onPointerDown={(e) => {
                            onFocus();
                            dragControls.start(e);
                        }}
                        className="flex w-full cursor-grab touch-none select-none items-center justify-between border-b border-accent bg-accent/10 px-3 py-2 active:cursor-grabbing"
                    >
                        <p className="text-xs text-gray-400 uppercase tracking-wider w-full font-geist-mono">{title}</p>
                        <div className="w-4 h-4 rounded-full bg-white/10 border border-white/50 flex items-center justify-center group mr-1" onClick={onClose}>
                            <X size={8} className="text-white" />
                        </div>
                    </div>

                    {/* Content — desktop: flex-1 fills the pane; mobile: height follows content up to max-h */}
                    <div
                        className={cn(
                            'relative min-h-0 p-2 custom-scrollbar',
                            isMobile
                                ? 'max-h-[calc(80dvh-3.25rem)] overflow-y-auto overflow-x-hidden'
                                : compact
                                  ? 'overflow-hidden p-0'
                                  : 'flex-1 overflow-auto'
                        )}
                    >
                        {/* Scanline effect overlay (optional, low opacity) */}
                        <div className="pointer-events-none absolute inset-0 bg-repeat bg-[length:100%_4px] opacity-[0.03] z-10"
                            style={{ backgroundImage: 'linear-gradient(to bottom, transparent 50%, #000 50%)' }} />
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
