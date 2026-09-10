'use client';

import { useEffect, useState } from 'react';
import {
    EXPERIENCE_DIALOGUE,
    EXPERIENCE_ENTRIES,
} from '@/data/akash-city/experience';
import { useCityStore } from '@/components/akash-city/cityStore';

type Mode = 'pick' | 'narrate' | 'read';

export function ExperienceModal() {
    const open = useCityStore((s) => s.experienceOpen);
    const closeExperience = useCityStore((s) => s.closeExperience);
    const setControlsEnabled = useCityStore((s) => s.setControlsEnabled);
    const [mode, setMode] = useState<Mode>('pick');
    const [lineIndex, setLineIndex] = useState(0);
    const [typed, setTyped] = useState('');

    useEffect(() => {
        if (!open) {
            setMode('pick');
            setLineIndex(0);
            setTyped('');
            return;
        }
        setControlsEnabled(false);
        if (document.pointerLockElement) {
            document.exitPointerLock();
        }
        return () => {
            setControlsEnabled(true);
        };
    }, [open, setControlsEnabled]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.code === 'Escape') {
                e.preventDefault();
                closeExperience();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, closeExperience]);

    useEffect(() => {
        if (!open || mode !== 'narrate') return;
        const full = EXPERIENCE_DIALOGUE[lineIndex] ?? '';
        setTyped('');
        let i = 0;
        const id = window.setInterval(() => {
            i += 1;
            setTyped(full.slice(0, i));
            if (i >= full.length) {
                window.clearInterval(id);
            }
        }, 22);
        return () => window.clearInterval(id);
    }, [open, mode, lineIndex]);

    if (!open) return null;

    const lineDone =
        mode === 'narrate' &&
        typed.length >= (EXPERIENCE_DIALOGUE[lineIndex]?.length ?? 0);

    return (
        <div className="pointer-events-auto absolute inset-0 z-40 flex items-end justify-center bg-black/45 p-4 sm:items-center">
            <aside
                className="w-[min(94vw,32rem)] rounded-xl border border-white/10 bg-zinc-950/95 p-4 text-zinc-100 shadow-2xl backdrop-blur-md sm:p-5"
                role="dialog"
                aria-labelledby="experience-title"
            >
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="font-geist-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                            Experience pavilion
                        </p>
                        <h2
                            id="experience-title"
                            className="mt-1 text-lg font-semibold tracking-tight"
                        >
                            Ellie the Elephant
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={closeExperience}
                        className="rounded-md border border-white/10 px-2 py-1 text-xs text-zinc-400 hover:text-zinc-100"
                        aria-label="Close experience"
                    >
                        Esc
                    </button>
                </div>

                {mode === 'pick' ? (
                    <div className="mt-4 space-y-3">
                        <p className="text-sm text-zinc-400">
                            Hear Ellie narrate the career path, or read the full
                            timeline yourself.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setLineIndex(0);
                                    setMode('narrate');
                                }}
                                className="rounded-md bg-amber-400 px-3 py-2 text-sm font-medium text-zinc-950"
                            >
                                Narrate with Ellie
                            </button>
                            <button
                                type="button"
                                onClick={() => setMode('read')}
                                className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-zinc-100"
                            >
                                Read experience
                            </button>
                        </div>
                    </div>
                ) : null}

                {mode === 'narrate' ? (
                    <div className="mt-4 space-y-4">
                        <div className="min-h-[5.5rem] rounded-lg border border-amber-400/25 bg-amber-400/5 p-3">
                            <p className="font-geist-mono text-[10px] uppercase tracking-[0.2em] text-amber-200/80">
                                Ellie says
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-zinc-100">
                                {typed}
                                <span className="ml-0.5 inline-block h-3 w-1 animate-pulse bg-amber-300 align-middle" />
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="font-geist-mono text-[10px] text-zinc-500">
                                {lineIndex + 1} / {EXPERIENCE_DIALOGUE.length}
                            </p>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setMode('pick')}
                                    className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-zinc-400"
                                >
                                    Back
                                </button>
                                {lineIndex < EXPERIENCE_DIALOGUE.length - 1 ? (
                                    <button
                                        type="button"
                                        disabled={!lineDone}
                                        onClick={() =>
                                            setLineIndex((n) => n + 1)
                                        }
                                        className="rounded-md bg-white px-3 py-1.5 text-xs font-medium text-zinc-950 disabled:opacity-40"
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        disabled={!lineDone}
                                        onClick={() => setMode('read')}
                                        className="rounded-md bg-white px-3 py-1.5 text-xs font-medium text-zinc-950 disabled:opacity-40"
                                    >
                                        Read full timeline
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ) : null}

                {mode === 'read' ? (
                    <div className="mt-4 space-y-3">
                        <div className="max-h-[min(50vh,22rem)] space-y-2 overflow-y-auto pr-1">
                            {EXPERIENCE_ENTRIES.map((exp) => (
                                <article
                                    key={exp.id}
                                    className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
                                >
                                    <h3 className="text-sm font-semibold text-white">
                                        {exp.role}
                                    </h3>
                                    <p className="text-xs text-zinc-400">
                                        {exp.company} · {exp.type}
                                    </p>
                                    <p className="mt-1 text-[11px] text-zinc-500">
                                        {exp.period} · {exp.duration} ·{' '}
                                        {exp.location} · {exp.workMode}
                                    </p>
                                    <p className="mt-2 text-xs text-zinc-300">
                                        {exp.description}
                                    </p>
                                    <div className="mt-2 flex flex-wrap gap-1.5">
                                        {exp.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-zinc-400"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => setMode('pick')}
                            className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-zinc-400"
                        >
                            Back
                        </button>
                    </div>
                ) : null}
            </aside>
        </div>
    );
}
