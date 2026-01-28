'use client';

import React, { useEffect } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import { useGitHubStore } from '@/stores/github.store';
import { File, FileBadge, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GithubIcon from '@/components/svgs/Github';
import LinkedInIcon from '@/components/svgs/LinkedIn';
import XIcon from '@/components/svgs/X';
export function About() {
    // Get state and actions from Zustand store
    const { user, contributions, loading, fetchGitHubData } = useGitHubStore();

    // Toggle state for avatar image
    const [showGitHubAvatar, setShowGitHubAvatar] = React.useState(false);

    // Fetch data on component mount
    useEffect(() => {
        fetchGitHubData();
    }, [fetchGitHubData]);

    // Fallback data
    const displayName = user?.name || 'Akash Parmar';
    const avatarUrl = user?.avatar_url || 'https://github.com/Akash-cloud001.png';
    const designation = 'Full Stack Developer';

    // Toggle avatar handler
    const toggleAvatar = () => {
        setShowGitHubAvatar(prev => !prev);
    };

    return (
        <div className="text-white space-y-6 w-full max-w-4xl">
            {/* GitHub Activity Heatmap */}
            {(loading || contributions.length > 0) && (
                <div className="w-full overflow-hidden relative">
                    <ActivityCalendar
                        data={contributions}
                        loading={loading}
                        theme={{
                            light: ['hsl(0, 0%, 92%)', 'firebrick'],
                            dark: ['#333', 'rgba(255, 255, 255, 1)'],
                        }}
                        blockSize={12}
                        blockMargin={4}
                        fontSize={10}
                        showTotalCount={false}
                    />
                </div>
            )}
            {/* Profile Section */}
            <div className="flex flex-col space-y-3 sm:space-y-0 -mt-6 sm:flex-row w-full justify-between items-center">
                <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="relative w-16 h-16">
                        <AnimatePresence mode="wait">
                            {showGitHubAvatar ? (
                                <motion.img
                                    key="github-avatar"
                                    src={avatarUrl}
                                    alt={displayName}
                                    className="absolute inset-0 w-16 h-16 rounded-full border-4 border-white/10 shadow-xl grayscale hover:grayscale-0 transition-all duration-300 object-cover"
                                    initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                />
                            ) : (
                                <motion.img
                                    key="local-avatar"
                                    src="/akash.png"
                                    alt={displayName}
                                    className="absolute inset-0 w-16 h-16 rounded-full border-4 border-white/10 shadow-xl grayscale hover:grayscale-0 transition-all duration-300 object-cover"
                                    initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                />
                            )}
                        </AnimatePresence>
                        <div
                            className="absolute bottom-0.5 right-0.5 rounded-full border-4 border-black cursor-pointer"
                            title="Toggle avatar"
                            onClick={toggleAvatar}
                        >
                            <RefreshCw className='h-3 w-3 text-white' />
                        </div>
                    </div>

                    <div>
                        {/* Name */}
                        <h2 className="text-xl font-bold text-white tracking-tight">
                            {displayName}
                        </h2>

                        {/* Designation */}
                        <p className="text-xs font-mono text-gray-400 uppercase tracking-normal">
                            {/* {designation} */}
                            {/* Where Strong Code Meets Smart Design to Drive Growth */}
                            I like working with people who care about what they build.

                        </p>
                    </div>
                </div>

                {/* Stats */}
                {user && (
                    <div className="flex gap-6 pt-4 text-sm">
                        <div className="text-center">
                            <div className="font-bold text-white">{user.public_repos}</div>
                            <div className="text-gray-500 text-xs">Repositories</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-white">{user.followers}</div>
                            <div className="text-gray-500 text-xs">Followers</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-white">{user.following}</div>
                            <div className="text-gray-500 text-xs">Following</div>
                        </div>
                    </div>
                )}

            </div>
            {/* CTA */}
            <div className='flex flex-col sm:flex-row w-full items-start justify-between px-2 pb-1'>
                <div className='flex gap-3'>
                    <a href="https://x.com/Akash_cloud001" target="_blank" rel="noopener noreferrer">
                        <XIcon className='h-6 w-6 text-white/80 hover:text-white transition-color ' />
                    </a>
                    <a href="https://github.com/Akash-cloud001" target="_blank" rel="noopener noreferrer">
                        <GithubIcon className='h-6 w-6 text-white/80 hover:text-white transition-color ' />
                    </a>
                    <a href="https://www.linkedin.com/in/akash-parmar-/" target="_blank" rel="noopener noreferrer">
                        <LinkedInIcon className='h-6 w-6 text-white/80 hover:text-white transition-color ' />
                    </a>
                    {/* <p className='font-mono text-xs text-white/50'> </p> */}
                </div>
                <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white px-4 py-1 rounded-md flex items-center gap-2 text-black text-sm font-mono"
                >
                    <FileBadge className="h-4 w-4 text-black transition-colors" />
                    Resume / CV
                </a>

            </div>
        </div>
    );
}
