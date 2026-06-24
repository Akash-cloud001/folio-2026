'use client';

import React, { useEffect, useSyncExternalStore } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import { useGitHubStore } from '@/stores/github.store';
import { RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/site';
import GithubIcon from '@/components/svgs/Github';
import LinkedInIcon from '@/components/svgs/LinkedIn';
import XIcon from '@/components/svgs/X';

function useNarrowCalendar() {
    return useSyncExternalStore(
        (onStoreChange) => {
            if (typeof window === 'undefined') return () => {};
            const mq = window.matchMedia('(max-width: 639px)');
            mq.addEventListener('change', onStoreChange);
            return () => mq.removeEventListener('change', onStoreChange);
        },
        () =>
            typeof window !== 'undefined' &&
            window.matchMedia('(max-width: 639px)').matches,
        () => false
    );
}

export function About() {
    const { user, contributions, loading, fetchGitHubData } = useGitHubStore();
    const [showGitHubAvatar, setShowGitHubAvatar] = React.useState(false);
    const narrowCalendar = useNarrowCalendar();

    useEffect(() => {
        fetchGitHubData();
    }, [fetchGitHubData]);

    const displayName = user?.name || 'Akash Parmar';
    const avatarUrl = user?.avatar_url || 'https://github.com/Akash-cloud001.png';
    const designation = 'Full Stack Developer';

    const toggleAvatar = () => {
        setShowGitHubAvatar((prev) => !prev);
    };

    const calendarBlockSize = narrowCalendar ? 8 : 12;
    const calendarBlockMargin = narrowCalendar ? 2 : 4;
    const calendarFontSize = narrowCalendar ? 8 : 10;

    return (
        <div className="w-full max-w-4xl space-y-4 text-white sm:space-y-5 md:space-y-6">
            {(loading || contributions.length > 0) && (
                <div
                    className={cn(
                        'relative w-full overflow-x-auto overflow-y-hidden',
                        narrowCalendar && '-mx-1 px-1 sm:mx-0 sm:px-0'
                    )}
                >
                    <ActivityCalendar
                        data={contributions}
                        loading={loading}
                        theme={{
                            light: ['hsl(0, 0%, 92%)', 'firebrick'],
                            dark: ['#333', 'rgba(255, 255, 255, 1)'],
                        }}
                        blockSize={calendarBlockSize}
                        blockMargin={calendarBlockMargin}
                        fontSize={calendarFontSize}
                        showTotalCount={false}
                    />
                </div>
            )}

            <div className="mt-0 flex w-full flex-col items-center gap-5 sm:-mt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                {/** sm:w-auto so this column does not stretch full width — keeps stats on the right (justify-between). */}
                <div className="flex w-full max-w-md flex-col items-center gap-3 text-center sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:gap-4 sm:text-left">
                    <div className="relative h-16 w-16 shrink-0">
                        <AnimatePresence mode="wait">
                            {showGitHubAvatar ? (
                                <motion.img
                                    key="github-avatar"
                                    src={avatarUrl}
                                    alt={displayName}
                                    className="absolute inset-0 h-16 w-16 rounded-full border-4 border-white/10 object-cover shadow-xl grayscale transition-all duration-300 hover:grayscale-0"
                                    initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                />
                            ) : (
                                <motion.img
                                    key="local-avatar"
                                    src="/akash.png"
                                    alt={displayName}
                                    className="absolute inset-0 h-16 w-16 rounded-full border-4 border-white/10 object-cover shadow-xl grayscale transition-all duration-300 hover:grayscale-0"
                                    initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                />
                            )}
                        </AnimatePresence>
                        <button
                            type="button"
                            title="Toggle avatar source"
                            aria-label="Toggle between local and GitHub profile photo"
                            onClick={toggleAvatar}
                            className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full border-4 border-black bg-zinc-800 touch-manipulation"
                        >
                            <RefreshCw className="h-3.5 w-3.5 text-white" aria-hidden />
                        </button>
                    </div>

                    <div className="min-w-0 sm:max-w-md md:max-w-lg">
                        <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
                            {displayName}
                        </h2>
                        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                            {designation}
                        </p>
                        <p className="mt-2 max-w-prose font-mono text-sm leading-relaxed text-zinc-400 sm:text-xs sm:uppercase sm:leading-normal sm:tracking-normal">
                            I like working with people who care about what they build.
                        </p>
                    </div>
                </div>

                {user && (
                    <div className="grid w-full max-w-xs shrink-0 grid-cols-3 gap-2 pt-1 text-sm sm:flex sm:w-auto sm:max-w-none sm:justify-end sm:gap-8 sm:pt-0">
                        <div className="text-center">
                            <div className="font-bold text-white">{user.public_repos}</div>
                            <div className="text-xs text-gray-500">
                                <span className="sm:hidden">Repos</span>
                                <span className="hidden sm:inline">Repositories</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-white">{user.followers}</div>
                            <div className="text-xs text-gray-500">Followers</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-white">{user.following}</div>
                            <div className="text-xs text-gray-500">Following</div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-center gap-5 pb-1 sm:justify-start sm:gap-4 sm:pb-0">
                    <a
                        href={siteConfig.social.x}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 min-w-11 items-center justify-center touch-manipulation sm:min-h-0 sm:min-w-0 sm:p-1"
                        aria-label="X (Twitter)"
                    >
                    <XIcon className="h-6 w-6 text-white/80 transition-colors hover:text-white" />
                </a>
                <a
                        href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 min-w-11 items-center justify-center touch-manipulation sm:min-h-0 sm:min-w-0 sm:p-1"
                    aria-label="GitHub"
                >
                    <GithubIcon className="h-6 w-6 text-white/80 transition-colors hover:text-white" />
                </a>
                <a
                        href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 min-w-11 items-center justify-center touch-manipulation sm:min-h-0 sm:min-w-0 sm:p-1"
                    aria-label="LinkedIn"
                >
                    <LinkedInIcon className="h-6 w-6 text-white/80 transition-colors hover:text-white" />
                </a>
            </div>
        </div>
    );
}
