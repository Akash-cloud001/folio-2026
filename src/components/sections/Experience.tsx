'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Calendar } from 'lucide-react';

const experiences = [
    {
        id: 1,
        role: 'Frontend Developer',
        company: 'Duple IT Solutions Pvt. Ltd.',
        type: 'Full-time',
        period: 'Sep 2025 - Present',
        duration: '5 mos',
        location: 'Mohali',
        workMode: 'On-site',
        skills: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel', 'Cursor', 'Antigravity'],
        description: 'Building scalable web applications with modern frontend technologies.'
    },
    {
        id: 2,
        role: 'UI Developer',
        company: 'EvoMorf',
        type: 'Full-time',
        period: 'Jan 2024 - May 2025',
        duration: '1 yr 5 mos',
        location: 'Mohali, India',
        workMode: 'On-site',
        skills: ['Front-End Development', 'UI/UX', 'React', 'JavaScript', 'Vue', 'Nuxt2/3', 'Tailwind', 'Next.js'],
        description: 'Developed user interfaces and implemented design systems for web applications.'
    },
    {
        id: 3,
        role: 'Cyber Security Intern',
        company: 'Accenture in India',
        type: 'Internship',
        period: 'Apr 2023 - Aug 2023',
        duration: '5 mos',
        location: 'Bengaluru, Karnataka, India',
        workMode: 'Remote',
        skills: ['Teamwork', 'Cyber Security', 'Problem Solving'],
        description: 'Worked on security protocols and vulnerability assessments.'
    }
];

export function Experience() {
    return (
        <div className="text-white w-full max-w-full md:max-w-[500px]">
            {/* Experience List */}
            <div className="flex flex-col gap-2">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="group relative border border-white/10 rounded-lg p-4 hover:border-white/30 transition-all hover:bg-white/5"
                    >
                        <div className="flex items-start gap-4">
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                {/* Header */}
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <div>
                                        <h3 className="text-base font-bold text-white group-hover:text-white transition-colors">
                                            {exp.role}
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            {exp.company} · {exp.type}
                                        </p>
                                    </div>
                                </div>

                                {/* Period & Location */}
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 mb-3">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        <span>{exp.period} · {exp.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        <span>{exp.location} · {exp.workMode}</span>
                                    </div>
                                </div>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-2">
                                    {exp.skills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded text-gray-400 hover:bg-white/10 transition-colors"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
