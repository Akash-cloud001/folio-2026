'use client';

import React, { useState } from 'react';
import { Marquee } from '@/components/ui/marquee';

const projects = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
    },
    {
        id: 2,
        title: 'AI Chat Interface',
        image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80',
    },
    {
        id: 3,
        title: 'Financial Dashboard',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    },
    {
        id: 4,
        title: 'Portfolio v1',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80',
    },
    {
        id: 5,
        title: 'Crypto Wallet',
        image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&q=80',
    },
    {
        id: 6,
        title: 'SaaS Landing Page',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    },
];

export function Projects() {
    const [isPaused, setIsPaused] = useState(false);

    return (
        <div
            className="w-full h-full flex items-center overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <Marquee pauseOnHover={isPaused} className="[--duration:60s] p-0 !gap-4 w-full">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="relative w-[200px] h-[90px] shrink-0 rounded-md overflow-hidden border border-white/10 hover:border-white/50 transition-all hover:scale-105"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 grayscale hover:grayscale-0"
                            style={{ backgroundImage: `url(${project.image})` }}
                        />

                        <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white font-mono text-xs text-center px-2 font-bold tracking-wider uppercase pointer-events-none">{project.title}</span>
                        </div>
                    </div>
                ))}
            </Marquee>
        </div>
    );
}
