'use client';

import { useEffect, useRef } from 'react';

const IDLE_SRC = '/audio/vehicles/idle.wav';
const LOW_ON_SRC = '/audio/vehicles/low_on.wav';
const LOW_OFF_SRC = '/audio/vehicles/low_off.wav';
const MED_ON_SRC = '/audio/vehicles/med_on.wav';
const MED_OFF_SRC = '/audio/vehicles/med_off.wav';
const STARTUP_SRC = '/audio/vehicles/startup.wav';
const SKID_SRC = '/audio/vehicles/skid.ogg';
const IMPACT_SRC = '/audio/vehicles/impact.ogg';

/** Global vehicle mix — 30% quieter than authored peaks */
const MASTER_GAIN = 0.35;
const LOOP_SRCS = [
    IDLE_SRC,
    LOW_ON_SRC,
    LOW_OFF_SRC,
    MED_ON_SRC,
    MED_OFF_SRC,
] as const;

type LoopKey = 'idle' | 'lowOn' | 'lowOff' | 'medOn' | 'medOff';

function makeLoop(src: string) {
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0;
    return audio;
}

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

function clamp01(n: number) {
    return Math.max(0, Math.min(1, n));
}

/**
 * Layered kart engine: startup one-shot + idle / low / med on-off loops.
 * Mutes when the browser tab is hidden.
 */
export function useKartAudio(enabled: boolean) {
    const loopsRef = useRef<Record<LoopKey, HTMLAudioElement> | null>(null);
    const startupRef = useRef<HTMLAudioElement | null>(null);
    const skidRef = useRef<HTMLAudioElement | null>(null);
    const impactRef = useRef<HTMLAudioElement | null>(null);
    const volsRef = useRef<Record<LoopKey, number>>({
        idle: 0,
        lowOn: 0,
        lowOff: 0,
        medOn: 0,
        medOff: 0,
    });
    const unlocked = useRef(false);
    const startupPlayed = useRef(false);
    const lastImpactAt = useRef(0);
    const skidPlaying = useRef(false);
    const enabledRef = useRef(enabled);
    const tabVisible = useRef(
        typeof document === 'undefined' ? true : !document.hidden,
    );
    enabledRef.current = enabled;

    const silenceAll = () => {
        const loops = loopsRef.current;
        if (loops) {
            for (const key of Object.keys(loops) as LoopKey[]) {
                loops[key].volume = 0;
                loops[key].pause();
                volsRef.current[key] = 0;
            }
        }
        const skid = skidRef.current;
        if (skid) {
            skid.volume = 0;
            skid.pause();
            skidPlaying.current = false;
        }
        const impact = impactRef.current;
        if (impact) {
            impact.pause();
            impact.currentTime = 0;
        }
        const startup = startupRef.current;
        if (startup) {
            startup.pause();
            startup.currentTime = 0;
        }
    };

    const ensureLoopsPlaying = () => {
        if (!unlocked.current || !enabledRef.current || !tabVisible.current) {
            return;
        }
        const loops = loopsRef.current;
        if (!loops) return;
        for (const audio of Object.values(loops)) {
            if (audio.paused) void audio.play().catch(() => undefined);
        }
    };

    const playStartup = () => {
        if (startupPlayed.current || !tabVisible.current) return;
        const startup = startupRef.current;
        if (!startup) return;
        startupPlayed.current = true;
        startup.volume = 0.7 * MASTER_GAIN;
        startup.currentTime = 0;
        void startup.play().catch(() => undefined);
    };

    useEffect(() => {
        const loops: Record<LoopKey, HTMLAudioElement> = {
            idle: makeLoop(IDLE_SRC),
            lowOn: makeLoop(LOW_ON_SRC),
            lowOff: makeLoop(LOW_OFF_SRC),
            medOn: makeLoop(MED_ON_SRC),
            medOff: makeLoop(MED_OFF_SRC),
        };
        loopsRef.current = loops;

        const startup = new Audio(STARTUP_SRC);
        startup.preload = 'auto';
        startup.volume = 0.7 * MASTER_GAIN;
        startupRef.current = startup;

        const skid = new Audio(SKID_SRC);
        skid.preload = 'auto';
        skid.loop = true;
        skid.volume = 0;
        skidRef.current = skid;

        const impact = new Audio(IMPACT_SRC);
        impact.preload = 'auto';
        impact.volume = 0.55 * MASTER_GAIN;
        impactRef.current = impact;

        // Warm decode
        for (const src of LOOP_SRCS) {
            const warm = new Audio(src);
            warm.preload = 'auto';
        }

        const unlock = () => {
            if (unlocked.current) return;
            unlocked.current = true;
            if (tabVisible.current && enabledRef.current) {
                playStartup();
                ensureLoopsPlaying();
            }
        };

        const onVisibility = () => {
            tabVisible.current = !document.hidden;
            if (document.hidden) {
                silenceAll();
            } else if (enabledRef.current && unlocked.current) {
                ensureLoopsPlaying();
            }
        };

        window.addEventListener('pointerdown', unlock, { once: true });
        window.addEventListener('keydown', unlock, { once: true });
        document.addEventListener('visibilitychange', onVisibility);

        return () => {
            window.removeEventListener('pointerdown', unlock);
            window.removeEventListener('keydown', unlock);
            document.removeEventListener('visibilitychange', onVisibility);
            silenceAll();
            loopsRef.current = null;
            startupRef.current = null;
            skidRef.current = null;
            impactRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (enabled && tabVisible.current) {
            if (unlocked.current) {
                playStartup();
                ensureLoopsPlaying();
            }
            return;
        }
        silenceAll();
        if (!enabled) startupPlayed.current = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled]);

    const updateDrive = (
        speedAbs: number,
        maxSpeed: number,
        steeringHard: boolean,
        accelerating = false,
    ) => {
        if (!enabled || !unlocked.current || !tabVisible.current) {
            if (!tabVisible.current) silenceAll();
            return;
        }

        const loops = loopsRef.current;
        const skid = skidRef.current;
        if (!loops || !skid) return;

        ensureLoopsPlaying();

        const rpm = clamp01(speedAbs / Math.max(0.001, maxSpeed));
        const load = accelerating ? 1 : 0;

        // Band weights: idle → low → med across RPM
        const idleW = clamp01(1 - rpm / 0.22);
        const lowW = clamp01(1 - Math.abs(rpm - 0.32) / 0.32);
        const medW = clamp01((rpm - 0.28) / 0.45);

        const targets: Record<LoopKey, number> = {
            idle: idleW * 0.55 * MASTER_GAIN,
            lowOn: lowW * load * 0.7 * MASTER_GAIN,
            lowOff: lowW * (1 - load) * 0.55 * MASTER_GAIN,
            medOn: medW * load * 0.85 * MASTER_GAIN,
            medOff: medW * (1 - load) * 0.65 * MASTER_GAIN,
        };

        // Slight pitch lift with speed
        const rate = 0.92 + rpm * 0.28;
        const fade = 0.14;

        for (const key of Object.keys(targets) as LoopKey[]) {
            const cur = volsRef.current[key];
            const next = lerp(cur, targets[key], fade);
            volsRef.current[key] = next;
            loops[key].volume = next;
            loops[key].playbackRate = key === 'idle' ? 1 : rate;
        }

        const wantSkid = steeringHard && rpm > 0.35;
        if (wantSkid) {
            skid.volume = Math.min(0.5, 0.18 + rpm * 0.35) * MASTER_GAIN;
            if (!skidPlaying.current) {
                skidPlaying.current = true;
                skid.currentTime = 0;
                void skid.play().catch(() => undefined);
            }
        } else if (skidPlaying.current) {
            skid.volume = 0;
            skid.pause();
            skidPlaying.current = false;
        }
    };

    const playImpact = (impulse: number) => {
        if (!enabled || !unlocked.current || !tabVisible.current) return;
        const impact = impactRef.current;
        if (!impact) return;
        const now = performance.now();
        if (now - lastImpactAt.current < 280) return;
        if (impulse < 2.5) return;
        lastImpactAt.current = now;
        impact.volume = Math.min(0.75, 0.35 + impulse * 0.04) * MASTER_GAIN;
        impact.currentTime = 0;
        void impact.play().catch(() => undefined);
    };

    return { updateDrive, playImpact };
}
