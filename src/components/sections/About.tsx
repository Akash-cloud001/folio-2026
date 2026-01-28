'use client';

import React, { useEffect } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import { useGitHubStore } from '@/stores/github.store';
import { RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
                            Where Strong Code Meets Smart Design to Drive Growth
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
        </div>
    );
}
