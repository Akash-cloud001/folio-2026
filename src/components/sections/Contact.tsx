'use client';

import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { contactMailto, siteConfig } from '@/lib/site';

export function Contact() {
    return (
        <div className="p-6 text-white space-y-8">
            <div>
                <h2 className="text-xl font-bold border-b border-white/10 pb-2 mb-4">CONTACT_ME</h2>
                <p className="text-gray-300 font-sans mb-6">
                    I&apos;m currently available for freelance work and open to full-time opportunities.
                    If you have a project that needs some creative direction, I&apos;d love to hear from you.
                </p>

                <a
                    href={contactMailto}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-mono text-sm hover:bg-gray-200 transition-colors"
                >
                    <Mail size={14} />
                    {siteConfig.email.toUpperCase()}
                </a>
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-mono text-gray-500 uppercase">Socials</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                        href={siteConfig.social.x}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all group"
                    >
                        <span className="font-mono text-sm text-gray-400 group-hover:text-white">TWITTER</span>
                        <ArrowUpRight size={14} className="text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <a
                        href={siteConfig.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all group"
                    >
                        <span className="font-mono text-sm text-gray-400 group-hover:text-white">LINKEDIN</span>
                        <ArrowUpRight size={14} className="text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <a
                        href={siteConfig.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all group"
                    >
                        <span className="font-mono text-sm text-gray-400 group-hover:text-white">GITHUB</span>
                        <ArrowUpRight size={14} className="text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <a href="#" className="flex items-center justify-between p-3 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all group">
                        <span className="font-mono text-sm text-gray-400 group-hover:text-white">INSTAGRAM</span>
                        <ArrowUpRight size={14} className="text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </div>
            </div>
        </div>
    );
}
