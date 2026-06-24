'use client';

import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { formatVisitorCount } from '@/lib/analytics';
import { useAnalyticsStore } from '@/stores/analytics.store';
import { cn } from '@/lib/utils';

export function VisitorCountBadge({ className }: { className?: string }) {
    const { visitors, loading, fetchVisitors } = useAnalyticsStore();
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        fetchVisitors();
    }, [fetchVisitors]);

    if (!loading && visitors === null) {
        return null;
    }

    const displayCount =
        loading ? '…' : visitors !== null ? formatVisitorCount(visitors) : '—';
    const isReady = !loading && visitors !== null;

    return (
        <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.45, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
                'pointer-events-auto absolute right-3 z-2 sm:right-4',
                'top-[max(0.75rem,env(safe-area-inset-top,0px))]',
                className
            )}
            aria-live="polite"
            aria-label={
                isReady
                    ? `${formatVisitorCount(visitors!)} people visited this portfolio`
                    : 'Loading visitor count'
            }
        >
            <div
                className={cn(
                    'group relative overflow-hidden rounded-lg border border-white/15 bg-black/75 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl',
                    'before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.07)_0%,transparent_42%,rgba(244,63,94,0.04)_100%)]',
                    'after:pointer-events-none after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-linear-to-r after:from-transparent after:via-white/25 after:to-transparent'
                )}
            >
                {/* status strip */}
                <div className="flex items-center justify-between gap-3 border-b border-white/8 px-2.5 py-1">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500">
                        sys.visitors
                    </span>
                   
                </div>

                <div className="flex items-center gap-3 px-3 py-2.5 sm:px-3.5 sm:py-3">
                    <div className="relative flex size-9 shrink-0 items-center justify-center">
                        {!prefersReducedMotion && isReady && (
                            <motion.span
                                className="absolute inset-0 rounded-full bg-rose-500/15"
                                animate={{ scale: [1, 1.55, 1], opacity: [0.45, 0, 0.45] }}
                                transition={{
                                    duration: 2.4,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                aria-hidden
                            />
                        )}
                        <motion.div
                            animate={
                                prefersReducedMotion || !isReady
                                    ? undefined
                                    : { scale: [1, 1.08, 1] }
                            }
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            <Heart
                                className={cn(
                                    'size-4 transition-colors duration-300',
                                    isReady
                                        ? 'fill-rose-500 text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.55)] group-hover:fill-rose-400 group-hover:text-rose-400'
                                        : 'fill-zinc-700 text-zinc-600'
                                )}
                                strokeWidth={1.75}
                                aria-hidden
                            />
                        </motion.div>
                    </div>

                    <div className="min-w-13">
                        <div className="font-mono text-base font-bold leading-none tabular-nums tracking-tight text-white sm:text-lg">
                            {displayCount}
                        </div>
                        <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500">
                            visitors
                        </div>
                    </div>
                </div>

                {/* corner ticks */}
                <span
                    className="pointer-events-none absolute bottom-1.5 left-1.5 size-2 border-b border-l border-white/20"
                    aria-hidden
                />
                <span
                    className="pointer-events-none absolute bottom-1.5 right-1.5 size-2 border-b border-r border-white/20"
                    aria-hidden
                />
            </div>
        </motion.div>
    );
}
