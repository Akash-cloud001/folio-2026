'use client';

import { Clone, useGLTF } from '@react-three/drei';
import { folder, useControls } from 'leva';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useMemo } from 'react';
import * as THREE from 'three';
import {
    CITY_BOUNDARY_WALLS,
    CITY_BUILDINGS,
    CITY_DISTRICTS,
    CITY_ROADS,
    getCityAssetUrls,
    type BuildingPiece,
    type RoadPiece,
    type Vec3,
} from '@/data/akash-city/layout';
import {
    CITY_LOCATION_BY_ID,
    CITY_LOCATIONS,
} from '@/data/akash-city/locations';
import { useCityStore } from '@/components/akash-city/cityStore';
import { ProjectHoardings } from '@/components/akash-city/ProjectHoardings';
import { DistrictFlexPlates } from '@/components/akash-city/FlexNamePlate';
import { ExperienceElephant } from '@/components/akash-city/ExperienceElephant';
import { AboutPenguin } from '@/components/akash-city/AboutPenguin';
import { SkillsPaddock } from '@/components/akash-city/SkillsPaddock';
import { FENCE_EDGE } from '@/data/akash-city/bounds';

type BuildingDebugControls = Record<string, number>;
type LevaNumberInput = {
    value: number;
    min: number;
    max: number;
    step: number;
    label: string;
};

function modelSlug(piece: BuildingPiece): string {
    return piece.model.split('/').pop()?.replace('.glb', '') ?? piece.id;
}

function isLevaEditable(piece: BuildingPiece): boolean {
    const slug = modelSlug(piece);
    if (slug.startsWith('patch-')) return false;
    if (slug === 'plant' || slug === 'stones' || slug === 'flag' || slug === 'ladder') {
        return false;
    }
    if (slug.startsWith('fence')) return false;
    if (slug.startsWith('electricity') || slug.startsWith('light-')) return false;
    return true;
}

function levaFolderName(piece: BuildingPiece): string {
    if (piece.districtId) {
        return CITY_LOCATION_BY_ID[piece.districtId].name;
    }
    const slug = modelSlug(piece);
    if (slug.startsWith('building-type-')) return 'Houses';
    if (
        slug.startsWith('building-structure') ||
        slug.startsWith('building-roof') ||
        slug.startsWith('building-platform') ||
        slug === 'tent' ||
        slug === 'bridge' ||
        slug === 'platform' ||
        slug.startsWith('tree') ||
        slug.startsWith('rocks')
    ) {
        return 'Park & HOME';
    }
    if (
        slug.startsWith('chimney') ||
        slug.startsWith('detail-tank') ||
        slug.startsWith('water-tower') ||
        slug.startsWith('solar') ||
        slug.startsWith('windmill') ||
        slug.startsWith('shipping')
    ) {
        return 'City Essentials';
    }
    if (slug.startsWith('building-')) return 'Other Buildings';
    return 'Props';
}

function displayName(piece: BuildingPiece): string {
    const slug = modelSlug(piece);
    const [x, , z] = piece.position;
    if (piece.districtId && isDistrictLandmark(piece)) {
        return `${CITY_LOCATION_BY_ID[piece.districtId].shortLabel} · ${slug}`;
    }
    if (piece.districtId) {
        return `${CITY_LOCATION_BY_ID[piece.districtId].shortLabel} · ${slug}`;
    }
    return `${slug} (${x.toFixed(1)}, ${z.toFixed(1)})`;
}

function pieceControlSchema(piece: BuildingPiece, labelPrefix: string) {
    return {
        [`${piece.id}__x`]: {
            value: piece.position[0],
            min: -12,
            max: 28,
            step: 0.05,
            label: `${labelPrefix} · x`,
        } satisfies LevaNumberInput,
        [`${piece.id}__z`]: {
            value: piece.position[2],
            min: -20,
            max: 20,
            step: 0.05,
            label: `${labelPrefix} · z`,
        } satisfies LevaNumberInput,
        [`${piece.id}__scale`]: {
            value: piece.scale,
            min: 0.3,
            max: 5,
            step: 0.05,
            label: `${labelPrefix} · scale`,
        } satisfies LevaNumberInput,
    };
}

function RoadModel({ piece }: { piece: RoadPiece }) {
    const { scene } = useGLTF(piece.model);
    const scale = piece.scale ?? 1;
    return (
        <group
            position={piece.position}
            rotation={[0, piece.rotationY ?? 0, 0]}
            scale={scale}
        >
            <Clone object={scene} dispose={null} />
        </group>
    );
}

function isDistrictLandmark(piece: BuildingPiece): boolean {
    const slug = modelSlug(piece);
    return Boolean(
        piece.districtId &&
            slug.startsWith('building-') &&
            !slug.startsWith('building-type-'),
    );
}

function BuildingModel({
    piece,
    position,
    scale,
}: {
    piece: BuildingPiece;
    position: [number, number, number];
    scale: number;
}) {
    const { scene } = useGLTF(piece.model);
    const collidable = piece.collidable !== false;

    const { half, offset, ySnap } = useMemo(() => {
        const probe = scene.clone(true);
        probe.position.set(0, 0, 0);
        probe.rotation.set(0, 0, 0);
        probe.scale.set(1, 1, 1);
        probe.updateMatrixWorld(true);

        const box = new THREE.Box3().setFromObject(probe);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const snapY = -box.min.y * scale;

        if (!collidable) {
            return {
                half: [0.1, 0.1, 0.1] as Vec3,
                offset: [0, 0.1, 0] as Vec3,
                ySnap: snapY,
            };
        }

        const halfExtents: Vec3 = [
            Math.max(0.15, (size.x * scale) / 2),
            Math.max(0.15, (size.y * scale) / 2),
            Math.max(0.15, (size.z * scale) / 2),
        ];
        const colliderOffset: Vec3 = [
            center.x * scale,
            center.y * scale + snapY,
            center.z * scale,
        ];
        return { half: halfExtents, offset: colliderOffset, ySnap: snapY };
    }, [scene, scale, collidable]);

    if (!collidable) {
        return (
            <group
                position={position}
                rotation={[0, piece.rotationY ?? 0, 0]}
            >
                <Clone
                    object={scene}
                    scale={scale}
                    position={[0, ySnap, 0]}
                    dispose={null}
                />
            </group>
        );
    }

    const bodyKey = `${piece.id}-${position[0].toFixed(2)}-${position[2].toFixed(2)}-${scale.toFixed(2)}`;

    return (
        <RigidBody
            key={bodyKey}
            type="fixed"
            colliders={false}
            position={position}
            friction={1.2}
            restitution={0}
        >
            <group rotation={[0, piece.rotationY ?? 0, 0]}>
                <Clone
                    object={scene}
                    scale={scale}
                    position={[0, ySnap, 0]}
                    dispose={null}
                />
            </group>
            <CuboidCollider args={half} position={offset} />
        </RigidBody>
    );
}

function DistrictSensors({
    landmarkPositions,
}: {
    landmarkPositions: Record<string, [number, number, number]>;
}) {
    return (
        <>
            {CITY_DISTRICTS.map((zone) => (
                <RigidBody
                    key={zone.id}
                    type="fixed"
                    colliders={false}
                    position={landmarkPositions[zone.id] ?? zone.position}
                >
                    <CuboidCollider
                        args={zone.size}
                        sensor
                        onIntersectionEnter={() => {
                            useCityStore.getState().setActiveDistrict(zone.id);
                        }}
                        onIntersectionExit={() => {
                            const { activeDistrict, setActiveDistrict } =
                                useCityStore.getState();
                            if (activeDistrict === zone.id) {
                                setActiveDistrict(null);
                            }
                        }}
                    />
                </RigidBody>
            ))}
        </>
    );
}

export function World() {
    const controlSchema = useMemo(() => {
        const editable = CITY_BUILDINGS.filter(isLevaEditable);
        const byFolder = new Map<string, BuildingPiece[]>();

        for (const piece of editable) {
            const folderName = levaFolderName(piece);
            const list = byFolder.get(folderName) ?? [];
            list.push(piece);
            byFolder.set(folderName, list);
        }

        // Stable folder order: districts first, then themed groups
        const folderOrder = [
            ...CITY_LOCATIONS.map((l) => l.name),
            'Park & HOME',
            'Houses',
            'City Essentials',
            'Other Buildings',
            'Props',
        ];

        const schema: Record<string, ReturnType<typeof folder>> = {};
        for (const folderName of folderOrder) {
            const pieces = byFolder.get(folderName);
            if (!pieces || pieces.length === 0) continue;

            const folderControls = pieces.reduce<
                Record<string, LevaNumberInput>
            >((controls, piece) => {
                return {
                    ...controls,
                    ...pieceControlSchema(piece, displayName(piece)),
                };
            }, {});

            schema[folderName] = folder(folderControls, { collapsed: true });
        }

        return schema;
    }, []);

    const rawControls = useControls('Akash City Layout', controlSchema) as unknown as Record<
        string,
        number | Record<string, number>
    >;

    const controls = useMemo(() => {
        const flat: BuildingDebugControls = {};
        for (const value of Object.values(rawControls)) {
            if (typeof value === 'number') {
                continue;
            }
            if (value && typeof value === 'object') {
                for (const [key, nested] of Object.entries(value)) {
                    if (typeof nested === 'number') {
                        flat[key] = nested;
                    }
                }
            }
        }
        // Also support flattened leaf values if Leva returns them at the top level.
        for (const [key, value] of Object.entries(rawControls)) {
            if (typeof value === 'number') {
                flat[key] = value;
            }
        }
        return flat;
    }, [rawControls]);

    const pieces = CITY_BUILDINGS.map((piece) => {
        const position: [number, number, number] = [
            controls[`${piece.id}__x`] ?? piece.position[0],
            piece.position[1],
            controls[`${piece.id}__z`] ?? piece.position[2],
        ];
        const scale = controls[`${piece.id}__scale`] ?? piece.scale;
        return { piece, position, scale };
    });

    const landmarkPositions = pieces.reduce<
        Record<string, [number, number, number]>
    >((acc, item) => {
        if (isDistrictLandmark(item.piece) && item.piece.districtId) {
            acc[item.piece.districtId] = [
                item.position[0],
                item.position[1] + item.scale * 0.9,
                item.position[2],
            ];
        }
        return acc;
    }, {});

    return (
        <group>
            <RigidBody
                type="fixed"
                colliders={false}
                position={[
                    (FENCE_EDGE.minX + FENCE_EDGE.maxX) / 2,
                    -0.05,
                    (FENCE_EDGE.minZ + FENCE_EDGE.maxZ) / 2,
                ]}
            >
                <CuboidCollider
                    args={[
                        (FENCE_EDGE.maxX - FENCE_EDGE.minX) / 2 + 4,
                        0.05,
                        (FENCE_EDGE.maxZ - FENCE_EDGE.minZ) / 2 + 4,
                    ]}
                />
                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                    <planeGeometry
                        args={[
                            FENCE_EDGE.maxX - FENCE_EDGE.minX + 2,
                            FENCE_EDGE.maxZ - FENCE_EDGE.minZ + 2,
                        ]}
                    />
                    <meshStandardMaterial color="#3a3d45" />
                </mesh>
            </RigidBody>

            {CITY_BOUNDARY_WALLS.map((wall) => (
                <RigidBody
                    key={wall.id}
                    type="fixed"
                    colliders={false}
                    position={wall.position}
                >
                    <CuboidCollider args={wall.size} />
                </RigidBody>
            ))}

            {CITY_ROADS.map((piece) => (
                <RoadModel key={piece.id} piece={piece} />
            ))}

            {pieces.map(({ piece, position, scale }) => (
                <BuildingModel
                    key={piece.id}
                    piece={piece}
                    position={position}
                    scale={scale}
                />
            ))}

            <ProjectHoardings />
            <DistrictFlexPlates />
            <SkillsPaddock />
            <ExperienceElephant />
            <AboutPenguin />

            <DistrictSensors landmarkPositions={landmarkPositions} />
        </group>
    );
}

for (const url of getCityAssetUrls()) {
    useGLTF.preload(url);
}
