'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export function About() {
    return (
        <div className="text-white space-y-6 max-w-2xl">
            <p className="text-gray-300 leading-relaxed font-sans">
                I'm a full-stack developer with a passion for building digital products that are not only functional but also visually stunning. I specialize in React, Next.js, and Node.js.
            </p>

            <div className="space-y-4">
                <h3 className="text-sm font-mono text-gray-500 uppercase">Experience</h3>
                <ul className="space-y-2">
                    <li className="flex justify-between items-center group">
                        <span className="text-sm font-bold group-hover:text-white transition-colors">Senior Developer @ TechCorp</span>
                        <span className="text-xs font-mono text-gray-500">2023 - PRESENT</span>
                    </li>
                    <li className="flex justify-between items-center group">
                        <span className="text-sm font-bold group-hover:text-white transition-colors">Frontend Dev @ StartupX</span>
                        <span className="text-xs font-mono text-gray-500">2021 - 2023</span>
                    </li>
                </ul>
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-mono text-gray-500 uppercase">Stack</h3>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-gray-400">
                    {['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'Tailwind CSS'].map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-white/5 border border-white/10 rounded-sm">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="text-sm font-mono text-gray-500 uppercase">Connect</h3>
                <div className="flex gap-4">
                    <a href="#" className="flex items-center gap-1 text-sm hover:text-white transition-colors text-gray-400 group">
                        GITHUB <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <a href="#" className="flex items-center gap-1 text-sm hover:text-white transition-colors text-gray-400 group">
                        TWITTER <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <a href="#" className="flex items-center gap-1 text-sm hover:text-white transition-colors text-gray-400 group">
                        LINKEDIN <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </div>
            </div>
        </div>
    );
}
