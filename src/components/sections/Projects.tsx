'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useProjectsStore } from '@/stores/projects.store';

export function Projects() {
    const { projects, loading, fetchProjects } = useProjectsStore();
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollerRef = useRef<HTMLUListElement>(null);
    const [start, setStart] = useState(false);

    // Fetch projects on component mount
    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    // Add animation by cloning items
    useEffect(() => {
        if (projects.length > 0 && containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            // Clone each item to create infinite effect
            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true) as HTMLElement;
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            setStart(true);
        }
    }, [projects]);

    // Show loading state if needed
    if (loading && projects.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <span className="text-white/50 font-mono text-sm">Loading projects...</span>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex items-center overflow-hidden">
            {/* Custom Infinite Scroll Container */}
            <div
                ref={containerRef}
                className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
            >
                <ul
                    ref={scrollerRef}
                    className={`flex min-w-full shrink-0 gap-4 w-max flex-nowrap ${start ? 'animate-scroll' : ''
                        } hover:[animation-play-state:paused]`}
                >
                    {projects.map((project) => (
                        <a
                            key={project.id}
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative w-[150px] h-[90px] shrink-0 rounded-md overflow-hidden border border-white/10 hover:border-white/50 transition-all"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 "
                                style={{ backgroundImage: `url(${project.imgUrl})` }}
                            />

                            <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white font-mono text-xs text-center px-2 font-bold tracking-wider uppercase pointer-events-none">
                                    {project.name}
                                </span>
                            </div>
                        </a>
                    ))}
                </ul>
            </div>

            <style jsx>{`
                @keyframes scroll {
                    to {
                        transform: translate(calc(-50% - 0.5rem));
                    }
                }
                .animate-scroll {
                    animation: scroll 120s linear infinite;
                }
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
}
