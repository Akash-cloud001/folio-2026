'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import { EXPERIENCE_ENTRIES } from '@/data/akash-city/experience';

export function Experience() {
    return (
        <div className="text-white w-full max-w-full md:max-w-[500px]">
            <div className="flex flex-col gap-2">
                {EXPERIENCE_ENTRIES.map((exp, index) => (
                    <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="group relative border border-white/10 rounded-lg p-4 hover:border-white/30 transition-all hover:bg-white/5"
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex-1 min-w-0">
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

                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 mb-3">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        <span>
                                            {exp.period} · {exp.duration}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        <span>
                                            {exp.location} · {exp.workMode}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {exp.skills.map((skill) => (
                                        <span
                                            key={skill}
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
