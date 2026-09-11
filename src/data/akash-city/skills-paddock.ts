/**
 * My Skills — core skills stay in the skills block;
 * all other skills roam the city (free wander or road patrols).
 */

import type { PetId } from '@/data/akash-city/pets';
import { ROAD_SCALE, type Vec3 } from '@/data/akash-city/layout';
import { FENCE_EDGE } from '@/data/akash-city/bounds';

/** Inner grass between roads x=16..24 and z=-8..0. */
export const SKILLS_PADDOCK = {
    minX: 17.25,
    maxX: 22.75,
    minZ: -6.35,
    maxZ: -1.65,
} as const;

/** Soft roam box for free city wanderers (inside the outer fence). */
export const CITY_ROAM_BOUNDS = {
    minX: FENCE_EDGE.minX + 2.2,
    maxX: FENCE_EDGE.maxX - 2.2,
    minZ: FENCE_EDGE.minZ + 2.2,
    maxZ: FENCE_EDGE.maxZ - 2.2,
} as const;

export type SkillPetMode = 'paddock' | 'free' | 'patrol';

export type SkillPetDef = {
    id: string;
    skill: string;
    petId: PetId;
    mode: SkillPetMode;
    start: [number, number];
    scale: number;
    /** Patrol endpoints — walk back and forth between these */
    path?: [[number, number], [number, number]];
};

function idFor(skill: string): string {
    return `sk-${skill.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

/** Core skills that stay inside the skills block. */
export const PADDOCK_SKILL_PETS: SkillPetDef[] = [
    {
        id: idFor('HTML5'),
        skill: 'HTML5',
        petId: 'beaver',
        mode: 'paddock',
        start: [18.4, -5.0],
        scale: 0.42,
    },
    {
        id: idFor('CSS3'),
        skill: 'CSS3',
        petId: 'crab',
        mode: 'paddock',
        start: [20.0, -2.8],
        scale: 0.42,
    },
    {
        id: idFor('JavaScript'),
        skill: 'JavaScript',
        petId: 'lion',
        mode: 'paddock',
        start: [21.8, -5.2],
        scale: 0.42,
    },
    {
        id: idFor('Node.js'),
        skill: 'Node.js',
        petId: 'hog',
        mode: 'paddock',
        start: [18.6, -3.2],
        scale: 0.4,
    },
    {
        id: idFor('ChatGPT'),
        skill: 'ChatGPT',
        petId: 'penguin',
        mode: 'paddock',
        start: [21.4, -3.6],
        scale: 0.4,
    },
];

/**
 * Remaining portfolio skills roam the city.
 * `patrol` = back-and-forth on a road corridor; `free` = random wander.
 * Patrol lanes do not overlap so pets never deadlock head-on.
 */
export const CITY_SKILL_PETS: SkillPetDef[] = [
    // —— Road patrols (non-overlapping segments) ——
    {
        id: idFor('Next.js'),
        skill: 'Next.js',
        petId: 'deer',
        mode: 'patrol',
        start: [-4, -8],
        scale: 0.4,
        path: [
            [-6, -8],
            [7, -8],
        ],
    },
    {
        id: idFor('Tailwind'),
        skill: 'Tailwind',
        petId: 'bee',
        mode: 'patrol',
        start: [14, -8],
        scale: 0.38,
        path: [
            [9, -8],
            [22, -8],
        ],
    },
    {
        id: idFor('React'),
        skill: 'React',
        petId: 'fox',
        mode: 'patrol',
        start: [-2, 0],
        scale: 0.4,
        path: [
            [-6, 0],
            [7, 0],
        ],
    },
    {
        id: idFor('Figma'),
        skill: 'Figma',
        petId: 'parrot',
        mode: 'patrol',
        start: [14, 0],
        scale: 0.4,
        path: [
            [9, 0],
            [22, 0],
        ],
    },
    {
        id: idFor('TypeScript'),
        skill: 'TypeScript',
        petId: 'cat',
        mode: 'patrol',
        start: [0, -12],
        scale: 0.4,
        path: [
            [0, -15],
            [0, -1],
        ],
    },
    {
        id: idFor('Three.js'),
        skill: 'Three.js',
        petId: 'bunny',
        mode: 'patrol',
        start: [2, -16],
        scale: 0.4,
        path: [
            [-4, -16],
            [8, -16],
        ],
    },
    {
        id: idFor('Cursor'),
        skill: 'Cursor',
        petId: 'elephant',
        mode: 'patrol',
        start: [14, -16],
        scale: 0.4,
        path: [
            [10, -16],
            [20, -16],
        ],
    },
    {
        id: idFor('Vue'),
        skill: 'Vue',
        petId: 'koala',
        mode: 'patrol',
        start: [24, -6],
        scale: 0.4,
        path: [
            [24, -15],
            [24, -1],
        ],
    },
    {
        id: idFor('Nuxt'),
        skill: 'Nuxt',
        petId: 'panda',
        mode: 'patrol',
        start: [-8, -6],
        scale: 0.4,
        path: [
            [-8, -15],
            [-8, -1],
        ],
    },
    // —— Free roam ——
    {
        id: idFor('Bootstrap'),
        skill: 'Bootstrap',
        petId: 'pig',
        mode: 'free',
        start: [-10, 4],
        scale: 0.4,
    },
    {
        id: idFor('MUI'),
        skill: 'MUI',
        petId: 'monkey',
        mode: 'free',
        start: [26, 3],
        scale: 0.4,
    },
    {
        id: idFor('shadcn/ui'),
        skill: 'shadcn/ui',
        petId: 'caterpillar',
        mode: 'free',
        start: [4, 5],
        scale: 0.38,
    },
    {
        id: idFor('GSAP'),
        skill: 'GSAP',
        petId: 'fish',
        mode: 'free',
        start: [-11, -10],
        scale: 0.4,
    },
    {
        id: idFor('Motion'),
        skill: 'Motion',
        petId: 'giraffe',
        mode: 'free',
        start: [27, -10],
        scale: 0.4,
    },
    {
        id: idFor('Redux'),
        skill: 'Redux',
        petId: 'tiger',
        mode: 'free',
        start: [-8, -18],
        scale: 0.4,
    },
    {
        id: idFor('Zustand'),
        skill: 'Zustand',
        petId: 'polar',
        mode: 'free',
        start: [22, -18],
        scale: 0.4,
    },
    {
        id: idFor('Clerk'),
        skill: 'Clerk',
        petId: 'cow',
        mode: 'free',
        start: [10, 6],
        scale: 0.4,
    },
    {
        id: idFor('Analytics'),
        skill: 'Analytics',
        petId: 'chick',
        mode: 'free',
        start: [-12, -4],
        scale: 0.38,
    },
    {
        id: idFor('OpenAI'),
        skill: 'OpenAI',
        petId: 'dog',
        mode: 'free',
        start: [28, -2],
        scale: 0.4,
    },
    {
        id: idFor('Gemini'),
        skill: 'Gemini',
        petId: 'penguin',
        mode: 'free',
        start: [2, -18],
        scale: 0.4,
    },
];

export const ALL_SKILL_PETS: SkillPetDef[] = [
    ...PADDOCK_SKILL_PETS,
    ...CITY_SKILL_PETS,
];

export type SkillsFencePiece = {
    id: string;
    model: string;
    position: Vec3;
    rotationY: number;
    scale: number;
};

const FOREST = '/forest/Models/GLB%20format';

/** Skills lot is framed by roads at x=16/24 and z=-8/0. */
const SKILLS_ROAD = {
    westX: 16,
    eastX: 24,
    southZ: -8,
    northZ: 0,
} as const;

export type SkillsFenceSideNudge = {
    /** Move the whole side along X (N/S) or Z (E/W). */
    shift: number;
    /** Push the side inward (+) / outward (−) from the square edge. */
    inset: number;
};

export type SkillsFenceConfig = {
    /** Square center */
    centerX: number;
    centerZ: number;
    /** Full side length of the square ring */
    size: number;
    scale: number;
    step: number;
    north: SkillsFenceSideNudge;
    south: SkillsFenceSideNudge;
    east: SkillsFenceSideNudge;
    west: SkillsFenceSideNudge;
};

/** Tuned via Leva — keep in sync with Skills Fence panel defaults. */
export function getDefaultSkillsFenceConfig(): SkillsFenceConfig {
    return {
        centerX: 20.2,
        centerZ: -4.0,
        size: 5.18,
        scale: 1.25,
        step: 1.05,
        north: { shift: 0.5, inset: 0 },
        south: { shift: 0.4, inset: 0 },
        east: { shift: 0, inset: 0 },
        west: { shift: 0, inset: 0 },
    };
}

/**
 * Forest fence around the skills grass.
 * Pass a config (from Leva) to tune the square / each side independently.
 */
export function buildSkillsFence(
    config: SkillsFenceConfig = getDefaultSkillsFenceConfig(),
): SkillsFencePiece[] {
    const pieces: SkillsFencePiece[] = [];
    const { centerX, centerZ, size, scale, step, north, south, east, west } =
        config;
    const half = size / 2;

    const westX = centerX - half + west.inset;
    const eastX = centerX + half - east.inset;
    const southZ = centerZ - half + south.inset;
    const northZ = centerZ + half - north.inset;

    const roadHalf = ROAD_SCALE * 0.5;
    const onRoad = (x: number, z: number) =>
        x <= SKILLS_ROAD.westX + roadHalf ||
        x >= SKILLS_ROAD.eastX - roadHalf ||
        z <= SKILLS_ROAD.southZ + roadHalf ||
        z >= SKILLS_ROAD.northZ - roadHalf;

    const push = (
        id: string,
        x: number,
        z: number,
        rotationY: number,
    ) => {
        if (onRoad(x, z)) return;
        pieces.push({
            id,
            model: `${FOREST}/fence.glb`,
            position: [x, 0, z],
            rotationY,
            scale,
        });
    };

    // North / South — run along X
    for (let x = westX; x <= eastX + 0.01; x += step) {
        push(
            `skills-fence-n-${x.toFixed(2)}`,
            x + north.shift,
            northZ,
            0,
        );
        push(
            `skills-fence-s-${x.toFixed(2)}`,
            x + south.shift,
            southZ,
            0,
        );
    }
    // East / West — run along Z (skip corners already covered by N/S)
    for (let z = southZ + step; z < northZ - 0.01; z += step) {
        push(
            `skills-fence-w-${z.toFixed(2)}`,
            westX,
            z + west.shift,
            Math.PI / 2,
        );
        push(
            `skills-fence-e-${z.toFixed(2)}`,
            eastX,
            z + east.shift,
            Math.PI / 2,
        );
    }

    return pieces;
}
