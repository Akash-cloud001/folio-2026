'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import styles from './Loader.module.css';

type TaskStatus = 'pending' | 'running' | 'done';

interface Task {
    label: string;
    weight: number;
}

export interface LoaderProps {
    onComplete?: () => void;
    /** Skip install animation (simple view / low bandwidth). */
    onSkip?: () => void;
    duration?: number;
    autoDismissAfter?: number;
    title?: string;
    subtitle?: string;
    experienceName?: string;
}

const TASKS: Task[] = [
    { label: 'Indexed 12 / 18 projects', weight: 6 },
    { label: 'Loading experience.log', weight: 4 },
    { label: 'Compiling frontend systems', weight: 7 },
    { label: 'Preloading textures', weight: 9 },
    { label: 'Loading case-studies database', weight: 8 },
    { label: 'Mounting design system', weight: 5 },
    { label: 'Finalizing experience', weight: 5 },
];

const TOTAL_BLOCKS = 50;

export function Loader({
    onComplete,
    onSkip,
    duration = 4200,
    autoDismissAfter = 0,
    title = 'AKASHPARMAR.dev 2026',
    subtitle = 'Professional Portfolio Setup',
    experienceName = 'AKASH PARMAR',
}: LoaderProps) {
    const prefersReducedMotion = useReducedMotion();
    const [progress, setProgress] = useState(0);
    const [dismissed, setDismissed] = useState(false);

    const dismiss = () => {
        setDismissed(true);
        onComplete?.();
    };

    useEffect(() => {
        if (prefersReducedMotion) {
            setProgress(100);
            return;
        }

        const start = performance.now();
        let raf: number;

        const tick = (now: number) => {
            const elapsed = now - start;
            const t = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setProgress(Math.round(eased * 100));
            if (t < 1) raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [duration, prefersReducedMotion]);

    const taskStates = useMemo(() => {
        const totalWeight = TASKS.reduce((sum, t) => sum + t.weight, 0);
        let cumulative = 0;
        return TASKS.map((task) => {
            const taskStart = (cumulative / totalWeight) * 100;
            const taskEnd = ((cumulative + task.weight) / totalWeight) * 100;
            cumulative += task.weight;

            let status: TaskStatus;
            let percent = 0;
            if (progress >= taskEnd) {
                status = 'done';
                percent = 100;
            } else if (progress >= taskStart) {
                status = 'running';
                percent = Math.round(((progress - taskStart) / (taskEnd - taskStart)) * 100);
            } else {
                status = 'pending';
            }
            return { ...task, status, percent };
        });
    }, [progress]);

    useEffect(() => {
        if (progress < 100) return;

        if (autoDismissAfter > 0) {
            const id = setTimeout(() => dismiss(), autoDismissAfter);
            return () => clearTimeout(id);
        }

        const handler = () => dismiss();
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [progress, autoDismissAfter]);

    const handleRootClick = () => {
        if (progress >= 100) dismiss();
    };

    const filledBlocks = Math.round((progress / 100) * TOTAL_BLOCKS);

    const handleSkip = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        onSkip?.();
        dismiss();
    };

    return (
        <AnimatePresence mode="wait">
            {!dismissed && (
                <motion.div
                    key="loader"
                    className={styles.root}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: 'brightness(3)', scale: 1.02 }}
                    transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                    role="dialog"
                    aria-label="Portfolio loading screen"
                    aria-busy={progress < 100}
                    onClick={handleRootClick}
                    onKeyDown={(e) => {
                        if (progress >= 100 && e.key.length === 1) dismiss();
                    }}
                >
                    <div className={styles.scanlines} aria-hidden />
                    <div className={styles.vignette} aria-hidden />
                    <div className={styles.noise} aria-hidden />

                    <motion.div
                        className={styles.terminal}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <header className={styles.header}>
                            <motion.h1
                                className={styles.title}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                {title}
                            </motion.h1>
                            <motion.h2
                                className={styles.subtitle}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.32 }}
                            >
                                {subtitle}
                            </motion.h2>
                            <div className={styles.rule} aria-hidden>
                                ────────────────────────────────
                            </div>
                        </header>

                        <motion.section
                            className={styles.intro}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <p>
                                Please wait while setup copies files
                                <br />
                                to the <strong>{experienceName}</strong> experience.
                            </p>
                            <p>This may take a minute to complete.</p>
                        </motion.section>

                        <motion.section
                            className={styles.progressSection}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            <p className={styles.copyingLabel}>Setup is copying files...</p>

                            <div
                                className={styles.barFrame}
                                role="progressbar"
                                aria-valuenow={progress}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            >
                                <div className={styles.bar}>
                                    {Array.from({ length: TOTAL_BLOCKS }).map((_, i) => (
                                        <motion.span
                                            key={i}
                                            className={styles.block}
                                            initial={false}
                                            animate={{
                                                opacity: i < filledBlocks ? 1 : 0.08,
                                                scaleY: i < filledBlocks ? 1 : 0.85,
                                            }}
                                            transition={{ duration: 0.12, ease: 'easeOut' }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <motion.p
                                className={styles.percent}
                                key={progress}
                                initial={{ opacity: 0.7 }}
                                animate={{ opacity: 1 }}
                            >
                                {progress}%
                            </motion.p>
                        </motion.section>

                        <motion.section
                            className={styles.taskBox}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.85 }}
                            aria-label="Setup tasks"
                        >
                            <ul className={styles.taskList}>
                                {taskStates.map((task, idx) => (
                                    <TaskRow
                                        key={task.label}
                                        label={task.label}
                                        status={task.status}
                                        percent={task.percent}
                                        index={idx}
                                    />
                                ))}
                            </ul>
                        </motion.section>

                        <motion.footer
                            className={styles.footer}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.05 }}
                        >
                            <p className={styles.continueLine}>
                                {progress < 100 ? (
                                    <span className={styles.dim}>preparing...</span>
                                ) : (
                                    <>Press any key to continue&nbsp;.&nbsp;.&nbsp;.&nbsp;</>
                                )}
                                <motion.span
                                    className={styles.cursor}
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{
                                        duration: 1.05,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    }}
                                    aria-hidden
                                />
                            </p>
                        </motion.footer>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

interface TaskRowProps {
    label: string;
    status: TaskStatus;
    percent: number;
    index: number;
}

function TaskRow({ label, status, percent, index }: TaskRowProps) {
    const statusText =
        status === 'done' ? 'OK' : status === 'running' ? `${percent}%` : '...';

    return (
        <motion.li
            className={styles.taskRow}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + index * 0.05, duration: 0.25 }}
        >
            <span className={styles.bullet} aria-hidden>
                •
            </span>
            <span className={styles.taskLabel}>{label}</span>
            <span className={styles.leader} aria-hidden />
            <span
                className={`${styles.status} ${
                    status === 'done'
                        ? styles.statusOk
                        : status === 'running'
                          ? styles.statusRunning
                          : styles.statusPending
                }`}
            >
                [ {statusText.padEnd(3, ' ')} ]
            </span>
        </motion.li>
    );
}
