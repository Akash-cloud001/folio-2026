/** Exhaust smoke + skill knockback bookkeeping (imperative, no React). */

export type SmokeBurstRequest = {
    x: number;
    y: number;
    z: number;
    /** 0.3–2 — puff count / size */
    intensity: number;
    /** Kart facing — exhaust drifts opposite this yaw */
    yaw?: number;
};

const queue: SmokeBurstRequest[] = [];
let lastExhaustAt = 0;

/** Continuous exhaust from the kart rear while moving. */
export function spawnExhaustSmoke(
    x: number,
    y: number,
    z: number,
    intensity: number,
    yaw: number,
) {
    const now = performance.now();
    const gap = intensity > 0.35 ? 90 : 140;
    if (now - lastExhaustAt < gap) return;
    lastExhaustAt = now;
    queue.push({
        x,
        y,
        z,
        intensity: Math.min(0.8, Math.max(0.12, intensity)),
        yaw,
    });
}

export function takeSmokeQueue(): SmokeBurstRequest[] {
    if (queue.length === 0) return [];
    return queue.splice(0, queue.length);
}

/** Pets skip AI steering until this timestamp (ms). Key = Rapier body handle. */
export const petKnockbackUntil = new Map<number, number>();

export function markPetKnockback(handle: number, durationMs = 650) {
    petKnockbackUntil.set(handle, performance.now() + durationMs);
}

export function isPetKnockedBack(handle: number): boolean {
    const until = petKnockbackUntil.get(handle);
    if (until == null) return false;
    if (performance.now() >= until) {
        petKnockbackUntil.delete(handle);
        return false;
    }
    return true;
}
