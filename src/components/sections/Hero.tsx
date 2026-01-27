'use client';

import React from 'react';

export function Hero() {
    return (
        <div className="p-6 space-y-6 text-white min-h-[300px] flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                AKASH<br />PARMAR
            </h1>
            <div className="h-px w-full bg-white/20" />
            <p className="text-lg md:text-xl font-mono text-gray-400">
                FULL_STACK_DEVELOPER<br />
                BASED_IN_INDIA
            </p>
            <p className="text-sm text-gray-500 max-w-md">
                Crafting digital experiences with a focus on motion, interactivity, and brutalist aesthetics.
            </p>

            <div className="pt-4 flex gap-4">
                <button className="px-4 py-2 border border-white/20 hover:bg-white hover:text-black transition-colors font-mono text-sm">
                    VIEW_PROJECTS
                </button>
                <button className="px-4 py-2 border border-white/20 hover:bg-white hover:text-black transition-colors font-mono text-sm">
                    CONTACT_ME
                </button>
            </div>
        </div>
    );
}
