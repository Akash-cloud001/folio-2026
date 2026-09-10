/**
 * Akash City layout — built from the hand-drawn 4×4 map:
 * - 4 corner checkpoints (portfolio districts)
 * - Showcase + Socials lots
 * - City-essentials ring (chimney / tower / power)
 * - Center 2×2 CITY PARK + HOME (Kenney Mini Forest)
 * - Green road grid carries lighting
 * - Outer fencing keeps the player inside
 */

import type { CityLocationId } from '@/data/akash-city/locations';
import { FENCE_EDGE } from '@/data/akash-city/bounds';

export const CITY_TILE = 1;

const ROADS = '/akash-roads/Models/GLB%20format';
const CITY = '/akash-3d-city/Models/GLB%20format';
const HOUSES = '/houses/Models/GLB%20format';
const FOREST = '/forest/Models/GLB%20format';

export type Vec3 = [number, number, number];

export type RoadPiece = {
    id: string;
    model: string;
    position: Vec3;
    rotationY?: number;
    /** Uniform scale — widens driveway tiles without new meshes */
    scale?: number;
};

export type BuildingPiece = {
    id: string;
    model: string;
    position: Vec3;
    districtId?: CityLocationId;
    rotationY?: number;
    scale: number;
    baseCollider: Vec3;
    collider: Vec3;
    colliderOffset?: Vec3;
    collidable?: boolean;
};

export type DistrictZone = {
    id: CityLocationId;
    position: Vec3;
    size: Vec3;
    approach: Vec3;
};

export const BUILDING_SCALE = 2.75;
export const PROP_SCALE = 1.85;
export const HOUSE_SCALE = 2.35;
export const FENCE_SCALE = 2.0;
export const STREET_PROP_SCALE = 1.6;
export const FOREST_SCALE = 1.25;
export const LIGHT_SCALE = 2.55;
export const POLE_SCALE = 3.35;
/** Widen road-driveway tiles a bit past the 1×1 grid cell */
export const ROAD_SCALE = 1.66;

/** Home lot between front road (z=-8) and back road (z=0) */
export const PARK_BOUNDS = {
    minX: 0.6,
    maxX: 15.4,
    minZ: -7.8,
    maxZ: -1.2,
};

/** Cols 1→4 left→right, rows 1→4 top→bottom (map space) */
export const LOT_COLS = [-4, 4, 12, 20] as const;
export const LOT_ROWS = [12, 4, -4, -12] as const;
export const ROAD_XS = [-8, 0, 8, 16, 24] as const;
export const ROAD_ZS = [16, 8, 0, -8, -16] as const;

function road(
    name: string,
    x: number,
    z: number,
    rotationY = 0,
): RoadPiece {
    return {
        id: `road-${name}-${x}-${z}-${rotationY.toFixed(2)}`,
        model: `${ROADS}/${name}.glb`,
        position: [x, 0, z],
        rotationY,
        scale: ROAD_SCALE,
    };
}

function pieceFrom(
    basePath: string,
    name: string,
    x: number,
    z: number,
    baseCollider: Vec3,
    scale: number,
    rotationY = 0,
    collidable = true,
): BuildingPiece {
    const collider: Vec3 = [
        baseCollider[0] * scale,
        baseCollider[1] * scale,
        baseCollider[2] * scale,
    ];
    return {
        id: `bldg-${name}-${x.toFixed(1)}-${z.toFixed(1)}`,
        model: `${basePath}/${name}.glb`,
        position: [x, 0, z],
        rotationY,
        scale,
        baseCollider,
        collider,
        colliderOffset: [0, collider[1], 0],
        collidable,
    };
}

function building(
    name: string,
    x: number,
    z: number,
    baseCollider: Vec3,
    scale = BUILDING_SCALE,
    rotationY = 0,
): BuildingPiece {
    return pieceFrom(CITY, name, x, z, baseCollider, scale, rotationY, true);
}

function landmark(
    districtId: CityLocationId,
    name: string,
    x: number,
    z: number,
    baseCollider: Vec3,
    scale = BUILDING_SCALE,
    rotationY = 0,
): BuildingPiece {
    return {
        ...building(name, x, z, baseCollider, scale, rotationY),
        districtId,
    };
}

function prop(
    name: string,
    x: number,
    z: number,
    baseCollider: Vec3,
    scale = PROP_SCALE,
    rotationY = 0,
    districtId?: CityLocationId,
): BuildingPiece {
    return {
        ...building(name, x, z, baseCollider, scale, rotationY),
        districtId,
    };
}

function house(
    name: string,
    x: number,
    z: number,
    scale = HOUSE_SCALE,
    rotationY = 0,
): BuildingPiece {
    return pieceFrom(HOUSES, name, x, z, [0.7, 0.75, 0.7], scale, rotationY, true);
}

function houseLandmark(
    districtId: CityLocationId,
    name: string,
    x: number,
    z: number,
    scale = HOUSE_SCALE,
    rotationY = 0,
): BuildingPiece {
    return {
        ...house(name, x, z, scale, rotationY),
        districtId,
    };
}

function forest(
    name: string,
    x: number,
    z: number,
    scale = FOREST_SCALE,
    rotationY = 0,
    collidable = false,
    baseCollider: Vec3 = [0.4, 0.8, 0.4],
): BuildingPiece {
    return pieceFrom(FOREST, name, x, z, baseCollider, scale, rotationY, collidable);
}

function streetProp(
    name: string,
    x: number,
    z: number,
    scale = STREET_PROP_SCALE,
    rotationY = 0,
): BuildingPiece {
    return pieceFrom(ROADS, name, x, z, [0.2, 0.9, 0.2], scale, rotationY, false);
}

function fencePiece(
    name: string,
    x: number,
    z: number,
    scale = FENCE_SCALE,
    rotationY = 0,
): BuildingPiece {
    return pieceFrom(HOUSES, name, x, z, [0.55, 0.45, 0.12], scale, rotationY, true);
}

function hRoad(
    row: number,
    xStart: number,
    xEnd: number,
    skipX: Set<number>,
): RoadPiece[] {
    const pieces: RoadPiece[] = [];
    for (let x = xStart; x <= xEnd; x += 1) {
        if (skipX.has(x)) continue;
        pieces.push(road('road-driveway-double', x, row, 0));
    }
    return pieces;
}

function vRoad(
    col: number,
    zStart: number,
    zEnd: number,
    skipZ: Set<number>,
): RoadPiece[] {
    const pieces: RoadPiece[] = [];
    for (let z = zStart; z <= zEnd; z += 1) {
        if (skipZ.has(z)) continue;
        pieces.push(road('road-driveway-double', col, z, Math.PI / 2));
    }
    return pieces;
}

function buildRoads(): RoadPiece[] {
    const pieces: RoadPiece[] = [];
    const crossCols = new Set<number>(ROAD_XS);
    const crossRows = new Set<number>(ROAD_ZS);
    const minX = -8;
    const maxX = 24;
    const minZ = -16;
    // Front road z=-8, back-of-home road z=0 — nothing further north
    const maxZ = 0;

    // Keep vertical clear through the home lot (between front z=-8 and back z=0)
    const skipHomeVertical = new Set<number>();
    for (let z = -7; z <= -1; z += 1) skipHomeVertical.add(z);
    const skipShowcaseVertical = new Set<number>();
    for (let z = -15; z <= -9; z += 1) skipShowcaseVertical.add(z);

    for (const row of ROAD_ZS) {
        if (row > maxZ) continue;
        const skipX = new Set<number>(crossCols);
        // Full horizontal at z=0 (back of house) and z=-8 (front)
        pieces.push(...hRoad(row, minX, maxX, skipX));
    }
    for (const col of ROAD_XS) {
        const skipZ = new Set<number>(crossRows);
        if (col === 8) {
            for (const z of skipHomeVertical) skipZ.add(z);
        }
        if (col === 0) {
            for (const z of skipShowcaseVertical) skipZ.add(z);
        }
        for (let z = 1; z <= 16; z += 1) skipZ.add(z);
        pieces.push(...vRoad(col, minZ, maxZ, skipZ));
    }
    for (const x of ROAD_XS) {
        for (const z of ROAD_ZS) {
            if (z > maxZ) continue;
            // Same driveway tile at junctions — one GLB keeps the city lighter
            pieces.push(road('road-driveway-double', x, z, Math.PI / 2));
        }
    }

    const tiles: Array<[number, number]> = [
        [-5, -14],
        [-3, -14],
        [19, -14],
        [21, -14],
        [-5, -4],
        [5, -14],
        [11, -14],
    ];
    for (const [x, z] of tiles) {
        pieces.push({
            id: `tile-${x}-${z}`,
            model: `${ROADS}/tile-low.glb`,
            position: [x, 0, z],
        });
    }

    return pieces;
}

/** Map lots → content (row/col are 0-indexed from top-left of the diagram) */
function buildMapLots(): BuildingPiece[] {
    const pieces: BuildingPiece[] = [];

    // —— Corner checkpoints ——
    // IDEAS + CODE lots cleared (open lawn toward the north forest)
    // BL — Project showcase (hoardings via ProjectHoardings)

    // BR BUSINESS
    pieces.push(
        landmark('business', 'building-l', 21.3, -12.0, [0.95, 1.05, 0.95], 2.85),
    );

    // —— Showcase diamonds ——
    // PRODUCTS lot + east industrial cluster cleared (open lawn / back forest)

    // —— Experience pavilion ——
    pieces.push(
        houseLandmark('people', 'building-type-l', -4.7, -4.4, 2.65, 0),
    );

    // —— City essentials (south near projects only) ——
    pieces.push(
        prop('detail-tank-large', 12.0, -13.4, [0.55, 0.7, 0.55], 2.0),
        building('building-p', 13.5, -11.2, [0.8, 0.85, 0.8], 2.35),
    );

    return pieces;
}

function buildCityPark(): BuildingPiece[] {
    const pieces: BuildingPiece[] = [];

    // Center home — Leva-tuned placement
    pieces.push(house('building-type-n', 8.1, -4.2, 4.0, 0));

    // Framing trees beside the home lot
    const edgeTrees: Array<[number, number, number]> = [
        [4.4, -2.8, 1.3],
        [11.8, -2.6, 1.35],
        [4.6, -6.0, 1.25],
        [11.6, -5.8, 1.3],
    ];
    for (const [x, z, scale] of edgeTrees) {
        pieces.push(forest('tree-high', x, z, scale, x * 0.1, true, [0.28, 0.8, 0.28]));
    }

    // Soft accents around the home
    const accents: Array<[string, number, number, number, number, boolean]> = [
        ['plant', 5.5, -3.4, 1.2, 0, false],
        ['plant', 10.7, -3.2, 1.15, 1, false],
        ['plant', 5.7, -5.6, 1.2, 0.5, false],
        ['plant', 10.5, -5.4, 1.15, 2, false],
    ];
    for (const [name, x, z, scale, rot, solid] of accents) {
        pieces.push(
            forest(name, x, z, scale, rot, solid, solid ? [0.35, 0.4, 0.35] : [0.25, 0.3, 0.25]),
        );
    }

    return pieces;
}

function buildStreetFurniture(): BuildingPiece[] {
    // Electricity poles removed — open lawn / forest without pillar clutter
    return [];
}

function buildPerimeterFence(): BuildingPiece[] {
    const pieces: BuildingPiece[] = [];
    const { minX, maxX, minZ, maxZ } = FENCE_EDGE;
    const step = 1.35;
    const scale = 1.7;

    for (let x = minX; x <= maxX; x += step) {
        pieces.push(fencePiece('fence', x, maxZ, scale, 0));
        pieces.push(fencePiece('fence', x, minZ, scale, 0));
    }
    for (let z = minZ; z <= maxZ; z += step) {
        pieces.push(fencePiece('fence', minX, z, scale, Math.PI / 2));
        pieces.push(fencePiece('fence', maxX, z, scale, Math.PI / 2));
    }

    return pieces;
}

function buildBuildings(): BuildingPiece[] {
    return [
        ...buildMapLots(),
        ...buildCityPark(),
        ...buildStreetFurniture(),
        ...buildPerimeterFence(),
    ];
}

export const CITY_ROADS: RoadPiece[] = buildRoads();
export const CITY_BUILDINGS: BuildingPiece[] = buildBuildings();

export const CITY_DISTRICTS: DistrictZone[] = [
    {
        id: 'ai',
        position: [0.0, 2.5, -12.8],
        size: [8.5, 3, 5.2],
        approach: [0.0, 0.1, -16.0],
    },
    {
        id: 'people',
        position: [-4.7, 2.5, -4.4],
        size: [3.2, 3, 3.2],
        approach: [-0.8, 0.1, -4.4],
    },
    {
        id: 'business',
        position: [21.3, 2.5, -12.0],
        size: [3.2, 3, 3.2],
        approach: [21.3, 0.1, -15.2],
    },
];

/** Spawn south of the home approach road */
export const CITY_SPAWN: Vec3 = [8.1, 0.6, -9.5];

export const CITY_WORLD_BOUNDS = {
    minX: FENCE_EDGE.minX + 1.2,
    maxX: FENCE_EDGE.maxX - 1.2,
    minZ: FENCE_EDGE.minZ + 1.2,
    maxZ: FENCE_EDGE.maxZ - 1.2,
};

const CITY_CENTER_X = (FENCE_EDGE.minX + FENCE_EDGE.maxX) / 2;
const CITY_CENTER_Z = (FENCE_EDGE.minZ + FENCE_EDGE.maxZ) / 2;

/** Solid barrier on the outer fence line */
export const CITY_BOUNDARY_WALLS: Array<{
    id: string;
    position: Vec3;
    size: Vec3;
}> = [
    {
        id: 'wall-north',
        position: [CITY_CENTER_X, 1.8, FENCE_EDGE.maxZ],
        size: [(FENCE_EDGE.maxX - FENCE_EDGE.minX) / 2 + 0.5, 2.4, 0.5],
    },
    {
        id: 'wall-south',
        position: [CITY_CENTER_X, 1.8, FENCE_EDGE.minZ],
        size: [(FENCE_EDGE.maxX - FENCE_EDGE.minX) / 2 + 0.5, 2.4, 0.5],
    },
    {
        id: 'wall-west',
        position: [FENCE_EDGE.minX, 1.8, CITY_CENTER_Z],
        size: [0.5, 2.4, (FENCE_EDGE.maxZ - FENCE_EDGE.minZ) / 2 + 0.5],
    },
    {
        id: 'wall-east',
        position: [FENCE_EDGE.maxX, 1.8, CITY_CENTER_Z],
        size: [0.5, 2.4, (FENCE_EDGE.maxZ - FENCE_EDGE.minZ) / 2 + 0.5],
    },
];

export function getCityAssetUrls(): string[] {
    const urls = new Set<string>();
    for (const piece of CITY_ROADS) urls.add(piece.model);
    for (const piece of CITY_BUILDINGS) urls.add(piece.model);
    return [...urls];
}
