/**
 * Outside the city core: forest densifies with distance; camps, stones,
 * and one archery range sit in the ring. Trails stay walkable.
 */

import type { Vec3 } from '@/data/akash-city/layout';
import { CITY_CENTER, CITY_CORE, FENCE_EDGE } from '@/data/akash-city/bounds';

const FOREST = '/forest/Models/GLB%20format';

export type OutsidePiece = {
    id: string;
    model: string;
    position: Vec3;
    rotationY?: number;
    scale: number;
};

export { FENCE_EDGE, CITY_CORE, CITY_CENTER };

/** NW archery clearing — trees stay out so the range is walkable */
export const ARCHERY_CLEARING = {
    x: -10.2,
    z: 7.35,
    radius: 3.4,
} as const;

function forestProp(
    name: string,
    x: number,
    z: number,
    scale: number,
    rotationY = 0,
): OutsidePiece {
    return {
        id: `out-${name}-${x.toFixed(1)}-${z.toFixed(1)}-${rotationY.toFixed(2)}`,
        model: `${FOREST}/${name}.glb`,
        position: [x, 0, z],
        rotationY,
        scale,
    };
}

function distFromCity(x: number, z: number): number {
    return Math.hypot(x - CITY_CENTER.x, z - CITY_CENTER.z);
}

function insideCore(x: number, z: number, pad = 1.2): boolean {
    return (
        x >= CITY_CORE.minX - pad &&
        x <= CITY_CORE.maxX + pad &&
        z >= CITY_CORE.minZ - pad &&
        z <= CITY_CORE.maxZ + pad
    );
}

function insideFence(x: number, z: number, pad = 1.5): boolean {
    return (
        x >= FENCE_EDGE.minX + pad &&
        x <= FENCE_EDGE.maxX - pad &&
        z >= FENCE_EDGE.minZ + pad &&
        z <= FENCE_EDGE.maxZ - pad
    );
}

function inArcheryClearing(x: number, z: number, pad = 0): boolean {
    return (
        Math.hypot(x - ARCHERY_CLEARING.x, z - ARCHERY_CLEARING.z) <=
        ARCHERY_CLEARING.radius + pad
    );
}

/**
 * Walkable forest corridors — keep these clear of trees.
 * North spine leaves the back road; side trails loop the ring.
 */
const FOREST_PATHS: Array<{
    axis: 'x' | 'z';
    center: number;
    halfWidth: number;
    min: number;
    max: number;
}> = [
    { axis: 'x', center: 8.0, halfWidth: 1.45, min: 0.4, max: FENCE_EDGE.maxZ },
    { axis: 'x', center: -12.2, halfWidth: 1.15, min: FENCE_EDGE.minZ, max: FENCE_EDGE.maxZ },
    { axis: 'x', center: 27.6, halfWidth: 1.15, min: FENCE_EDGE.minZ, max: FENCE_EDGE.maxZ },
    { axis: 'x', center: 8.0, halfWidth: 1.35, min: FENCE_EDGE.minZ, max: -17.5 },
    { axis: 'z', center: 4.8, halfWidth: 1.15, min: FENCE_EDGE.minX, max: FENCE_EDGE.maxX },
];

function onForestPath(x: number, z: number): boolean {
    for (const path of FOREST_PATHS) {
        if (path.axis === 'x') {
            if (Math.abs(x - path.center) <= path.halfWidth && z >= path.min && z <= path.max) {
                return true;
            }
        } else if (Math.abs(z - path.center) <= path.halfWidth && x >= path.min && x <= path.max) {
            return true;
        }
    }
    return false;
}

function blockedForTrees(x: number, z: number): boolean {
    return onForestPath(x, z) || inArcheryClearing(x, z, 0.4);
}

/** Light grass tufts in the forest ring only. */
function buildOuterGrass(): OutsidePiece[] {
    const pieces: OutsidePiece[] = [];
    const step = 4.0;

    for (let x = FENCE_EDGE.minX + 2; x <= FENCE_EDGE.maxX - 2; x += step) {
        for (let z = FENCE_EDGE.minZ + 2; z <= FENCE_EDGE.maxZ - 2; z += step) {
            if (insideCore(x, z, 2.0)) continue;
            if (!insideFence(x, z, 1.8)) continue;
            if (blockedForTrees(x, z)) continue;

            const d = distFromCity(x, z);
            if (d < 14) continue;

            const hash = Math.abs(Math.sin(x * 12.9898 + z * 78.233) * 43758.5453);
            const roll = hash - Math.floor(hash);
            if (roll > 0.48) continue;

            pieces.push(
                forestProp(
                    'patch-grass',
                    x + (roll - 0.5) * 0.7,
                    z + (roll - 0.5) * 0.7,
                    1.85 + roll * 0.5,
                    roll * Math.PI * 2,
                ),
            );
        }
    }

    return pieces;
}

/**
 * Forest ring around the city in all directions.
 * Trails + archery clearing stay open.
 */
function buildOuterTrees(): OutsidePiece[] {
    const pieces: OutsidePiece[] = [];
    const step = 2.2;

    for (let x = FENCE_EDGE.minX + 1.8; x <= FENCE_EDGE.maxX - 1.8; x += step) {
        for (let z = FENCE_EDGE.minZ + 1.8; z <= FENCE_EDGE.maxZ - 1.8; z += step) {
            if (insideCore(x, z, 1.6)) continue;
            if (!insideFence(x, z, 1.6)) continue;

            const hash = Math.abs(Math.sin(x * 91.17 + z * 47.31) * 24634.187);
            const roll = hash - Math.floor(hash);
            const jx = x + (roll - 0.5) * 0.95;
            const jz = z + Math.sin(roll * 20) * 0.45;

            if (insideCore(jx, jz, 1.35)) continue;
            if (!insideFence(jx, jz, 1.45)) continue;
            if (blockedForTrees(jx, jz)) continue;

            const d = distFromCity(jx, jz);
            // Fill the ring evenly — denser toward the outer fence
            const keepChance = Math.min(0.88, Math.max(0.38, (d - 7.5) * 0.09));
            if (roll > keepChance) continue;

            const high = roll > 0.42;
            const name = high ? 'tree-high' : 'tree';
            const scale = high ? 1.1 + roll * 0.75 : 0.8 + roll * 0.55;

            pieces.push(forestProp(name, jx, jz, scale, roll * 6.2));
        }
    }

    // Dense edge belts — north / south / east / west
    const belts: Array<{
        x0: number;
        x1: number;
        z0: number;
        z1: number;
        step: number;
    }> = [
        // North
        {
            x0: FENCE_EDGE.minX + 1.4,
            x1: FENCE_EDGE.maxX - 1.4,
            z0: 1.2,
            z1: FENCE_EDGE.maxZ - 1.1,
            step: 1.35,
        },
        // South
        {
            x0: FENCE_EDGE.minX + 1.4,
            x1: FENCE_EDGE.maxX - 1.4,
            z0: FENCE_EDGE.minZ + 1.1,
            z1: CITY_CORE.minZ - 1.0,
            step: 1.45,
        },
        // West
        {
            x0: FENCE_EDGE.minX + 1.1,
            x1: CITY_CORE.minX - 1.0,
            z0: FENCE_EDGE.minZ + 1.4,
            z1: FENCE_EDGE.maxZ - 1.4,
            step: 1.45,
        },
        // East
        {
            x0: CITY_CORE.maxX + 1.0,
            x1: FENCE_EDGE.maxX - 1.1,
            z0: FENCE_EDGE.minZ + 1.4,
            z1: FENCE_EDGE.maxZ - 1.4,
            step: 1.45,
        },
    ];

    for (const belt of belts) {
        for (let x = belt.x0; x <= belt.x1; x += belt.step) {
            for (let z = belt.z0; z <= belt.z1; z += belt.step) {
                if (!insideFence(x, z, 1.25)) continue;
                if (insideCore(x, z, 1.1)) continue;

                const hash = Math.abs(Math.sin(x * 53.1 + z * 19.7) * 91234.21);
                const roll = hash - Math.floor(hash);
                const sizeRoll = Math.abs(Math.sin(x * 7.3 + z * 11.1) * 1000);
                const sizeFrac = sizeRoll - Math.floor(sizeRoll);
                const jx = x + (roll - 0.5) * 0.9;
                const jz = z + (sizeFrac - 0.5) * 0.75;

                if (!insideFence(jx, jz, 1.15)) continue;
                if (insideCore(jx, jz, 1.0)) continue;
                if (blockedForTrees(jx, jz)) continue;

                if (roll > 0.72) continue;

                const high = sizeFrac > 0.4;
                const name = high ? 'tree-high' : 'tree';
                const scale = high
                    ? 0.95 + sizeFrac * 1.15
                    : 0.65 + sizeFrac * 0.9;

                pieces.push(forestProp(name, jx, jz, scale, roll * 5.5 + sizeFrac));
            }
        }
    }

    return pieces;
}

/** Camps (tents + flags) around the ring — kept off trail corridors. */
function buildCamps(): OutsidePiece[] {
    const camps: Array<[number, number, number, number]> = [
        // NW (beside archery, not on west trail)
        [-9.6, 7.9, 1.3, -0.5],
        // NE
        [25.2, 6.8, 1.35, 0.55],
        // East mid
        [29.0, -3.6, 1.3, 1.15],
        // SE
        [25.4, -15.2, 1.35, 1.05],
        // South
        [14.2, -19.5, 1.35, 0.25],
        [1.6, -19.4, 1.3, -0.7],
        // SW
        [-10.6, -15.0, 1.35, 2.0],
        // West mid
        [-13.6, -5.4, 1.3, 1.55],
    ];

    const pieces: OutsidePiece[] = [];
    for (const [x, z, scale, rot] of camps) {
        if (!insideFence(x, z, 1.15)) continue;
        if (onForestPath(x, z)) continue;
        if (inArcheryClearing(x, z, 0.6)) continue;
        pieces.push(forestProp('tent', x, z, scale, rot));
        const fx = x + Math.cos(rot) * 1.05;
        const fz = z + Math.sin(rot) * 1.05;
        if (
            insideFence(fx, fz, 1.0) &&
            !onForestPath(fx, fz) &&
            !inArcheryClearing(fx, fz)
        ) {
            pieces.push(forestProp('flag', fx, fz, 1.15, rot + 0.3));
        }
        pieces.push(forestProp('patch-dirt', x, z, 1.55, rot));
    }
    return pieces;
}

/** Stones / rocks scattered around the city ring. */
function buildStones(): OutsidePiece[] {
    const placements: Array<[string, number, number, number, number]> = [
        ['rocks-low', -12.6, 6.9, 1.45, 0.4],
        ['rocks-high', -13.2, 3.8, 1.5, 1.1],
        ['rocks-low', -12.8, -10.2, 1.35, 0.7],
        ['rocks-ramp', -11.5, -18.5, 1.3, Math.PI / 2],
        ['rocks-high', 4.2, 7.2, 1.5, 0.2],
        ['rocks-low', 26.4, 6.4, 1.35, 0.6],
        ['rocks-high', 28.0, 2.4, 1.45, 0.9],
        ['rocks-ramp', 27.2, -12.6, 1.35, Math.PI / 3],
        ['rocks-low', 24.0, -18.5, 1.4, 1.7],
        ['rocks-high', 10.5, -19.2, 1.45, 0.3],
        ['rocks-low', -2.6, -19.0, 1.35, 1.0],
        ['rocks-high', -13.4, 1.2, 1.4, 0.5],
        ['rocks-low', 27.6, -8.4, 1.3, 1.4],
        ['rocks-low', 18.4, -19.0, 1.35, 0.9],
        ['rocks-high', -8.2, -18.8, 1.4, 0.2],
        ['stones', -13.5, -2.0, 1.25, 0.5],
        ['stones', 28.5, -6.5, 1.2, 1.2],
        ['stones', 22.0, 7.0, 1.2, 0.8],
        ['stones', -10.8, -17.2, 1.25, 1.5],
        ['stones', 14.8, 6.8, 1.15, 0.3],
        ['stones', -4.5, 6.6, 1.2, 2.0],
        ['stones', 27.0, -17.5, 1.2, 0.6],
    ];

    return placements
        .filter(([, x, z]) => insideFence(x, z, 1.1) && !onForestPath(x, z) && !inArcheryClearing(x, z))
        .map(([name, x, z, scale, rot]) => forestProp(name, x, z, scale, rot));
}

/**
 * Archery scenery only — archer / targets / weapons live in ArcheryRange.tsx.
 * No fencing in the clearing.
 */
function buildArcheryRange(): OutsidePiece[] {
    return [];
}

function buildForestProps(): OutsidePiece[] {
    return [...buildCamps(), ...buildStones(), ...buildArcheryRange()];
}

export const OUTSIDE_GRASS: OutsidePiece[] = buildOuterGrass();
export const OUTSIDE_TREES: OutsidePiece[] = buildOuterTrees();
/** Camps, stones, archery — kept as OUTSIDE_ROCKS for OutsideWorld compatibility */
export const OUTSIDE_ROCKS: OutsidePiece[] = buildForestProps();

export function getOutsideAssetUrls(): string[] {
    const urls = new Set<string>();
    for (const piece of [
        ...OUTSIDE_GRASS,
        ...OUTSIDE_TREES,
        ...OUTSIDE_ROCKS,
    ]) {
        urls.add(piece.model);
    }
    return [...urls];
}
