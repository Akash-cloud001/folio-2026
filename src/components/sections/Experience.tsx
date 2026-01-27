'use client';

import React from 'react';

const experience = [
    {
        role: 'Senior Frontend Engineer',
        company: 'TechCorp',
        period: '2023 - PRESENT',
        description: 'Leading the frontend team in building scalable web applications using Next.js and React. implemented a new design system reducing development time by 30%.'
    },
    {
        role: 'Full Stack Developer',
        company: 'Creative Agency',
        period: '2021 - 2023',
        description: 'Developed immersive digital experiences for high-profile clients. Worked with WebGL, Three.js and GSAP for complex animations.'
    },
    {
        role: 'Junior Developer',
        company: 'StartUp Inc',
        period: '2019 - 2021',
        description: 'Collaborated with designers to implement pixel-perfect UIs. Optimized website performance achieving 90+ Lighthouse scores.'
    }
];

export function Experience() {
    return (
        <div className="p-6 text-white">
            <h2 className="text-xl font-bold border-b border-white/10 pb-2 mb-6">EXPERIENCE</h2>

            <div className="space-y-8">
                {experience.map((job, index) => (
                    <div key={index} className="group relative border-l border-white/10 pl-6 hover:border-white/50 transition-colors">
                        <div className="absolute -left-[3px] top-0 w-[5px] h-[5px] bg-white rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />

                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                            <h3 className="text-lg font-bold group-hover:text-white transition-colors text-white/90">{job.role}</h3>
                            <span className="text-xs font-mono text-gray-500">{job.period}</span>
                        </div>

                        <div className="text-sm font-mono text-gray-400 mb-3">{job.company}</div>
                        <p className="text-sm text-gray-400/80 leading-relaxed max-w-2xl">
                            {job.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
