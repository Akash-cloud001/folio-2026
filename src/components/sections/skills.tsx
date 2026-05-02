'use client';

import React from 'react';
import { motion } from 'framer-motion';
import StackIcon, { type IconName } from 'tech-stack-icons';

type SkillItem = {
    name: IconName;
    label: string;
};

type SkillGroup = {
    id: string;
    title: string;
    subtitle: string;
    items: SkillItem[];
};

const SKILL_GROUPS: SkillGroup[] = [
    {
        id: 'ui',
        title: 'UI, design & motion',
        subtitle: 'Layout systems, component libraries, and interaction',
        items: [
            { name: 'html5', label: 'HTML5' },
            { name: 'nextjs2', label: 'Next.js' },
            { name: 'css3', label: 'CSS3' },
            { name: 'bootstrap5', label: 'Bootstrap' },
            { name: 'materialui', label: 'MUI' },
            { name: 'tailwindcss', label: 'Tailwind' },
            { name: 'shadcnui', label: 'shadcn/ui' },
            { name: 'figma', label: 'Figma' },
            { name: 'gsap', label: 'GSAP' },
            { name: 'motion', label: 'Motion' },
        ],
    },
    {
        id: 'core',
        title: 'Languages & frameworks',
        subtitle: 'Runtime, typing, and UI stacks',
        items: [
            { name: 'js', label: 'JavaScript' },
            { name: 'jquery', label: 'jQuery' },
            { name: 'nodejs', label: 'Node.js' },
            { name: 'typescript', label: 'TypeScript' },
            { name: 'threejs', label: 'Three.js' },
            { name: 'vuejs', label: 'Vue' },
            { name: 'react', label: 'React' },
            { name: 'nuxtjs', label: 'Nuxt' },
        ],
    },
    {
        id: 'platform',
        title: 'State & platform',
        subtitle: 'Data layer, auth, and product analytics',
        items: [
            { name: 'redux', label: 'Redux' },
            { name: 'zustand', label: 'Zustand' },
            { name: 'clerk', label: 'Clerk' },
            { name: 'analytics', label: 'Analytics' },
        ],
    },
    {
        id: 'ai',
        title: 'AI & tooling',
        subtitle: 'Models and day-to-day dev workflow',
        items: [
            { name: 'openai', label: 'OpenAI' },
            { name: 'gemini', label: 'Gemini' },
            { name: 'cursor', label: 'Cursor' },
        ],
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.04, delayChildren: 0.06 },
    },
};

const itemFade = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export function Skills() {
    return (
        <div className="w-full max-w-xl text-white">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-6"
            >
                {SKILL_GROUPS.map((group) => (
                    <motion.section
                        key={group.id}
                        variants={itemFade}
                        className="rounded-lg  transition-colors hover:border-white/25 hover:bg-white/4"
                    >
                        <header className="mb-3">
                            <h3 className="text-sm font-semibold text-white">{group.title}</h3>
                            <p className="mt-0.5 text-xs text-zinc-500">{group.subtitle}</p>
                        </header>
                        <ul className="flex flex-wrap gap-2">
                            {group.items.map((skill) => (
                                <li key={skill.name}>
                                    <figure
                                        role="img"
                                        aria-label={skill.label}
                                        className="flex w-19 flex-col items-center gap-1.5 rounded-md border border-white/10 bg-black/40 px-2 py-2.5 transition-all hover:border-white/30 hover:bg-white/6"
                                    >
                                        <StackIcon
                                            name={skill.name}
                                            variant="dark"
                                            className="size-7 shrink-0"
                                        />
                                        <figcaption className="line-clamp-2 text-center font-geist-mono text-[9px] uppercase leading-tight tracking-wide text-zinc-400">
                                            {skill.label}
                                        </figcaption>
                                    </figure>
                                </li>
                            ))}
                        </ul>
                    </motion.section>
                ))}
            </motion.div>
        </div>
    );
}
