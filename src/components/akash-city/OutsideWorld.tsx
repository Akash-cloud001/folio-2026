'use client';

import { Clone, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { Suspense, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import {
    FENCE_EDGE,
    OUTSIDE_GRASS,
    OUTSIDE_ROCKS,
    OUTSIDE_TREES,
    type OutsidePiece,
} from '@/data/akash-city/outside';
import { playerWorldPos } from '@/components/akash-city/cityStore';
import { DistanceLod } from '@/components/akash-city/DistanceLod';
import { TiledGrassPlane } from '@/components/akash-city/TiledGrassPlane';

function OutsideProp({ piece }: { piece: OutsidePiece }) {
    const { scene } = useGLTF(piece.model);
    const ySnap = useMemo(() => {
        const probe = scene.clone(true);
        probe.position.set(0, 0, 0);
        probe.rotation.set(0, 0, 0);
        probe.scale.set(1, 1, 1);
        probe.updateMatrixWorld(true);
        const box = new THREE.Box3().setFromObject(probe);
        return -box.min.y * piece.scale;
    }, [scene, piece.scale]);

    return (
        <group
            position={[piece.position[0], 0, piece.position[2]]}
            rotation={[0, piece.rotationY ?? 0, 0]}
        >
            <Clone
                object={scene}
                scale={piece.scale}
                position={[0, ySnap, 0]}
                dispose={null}
            />
        </group>
    );
}

function pieceModelName(piece: OutsidePiece): string {
    const file = piece.model.split('/').pop() ?? '';
    return file.replace('.glb', '').replace('%20', ' ');
}

/**
 * Fixed colliders for forest solids — always active (even when LOD is billboard).
 * Skips decorative grass / dirt / thin props.
 */
function forestColliderFor(
    piece: OutsidePiece,
): { half: [number, number, number]; y: number } | null {
    const name = pieceModelName(piece);
    const s = piece.scale;

    if (name.startsWith('tree')) {
        return { half: [0.22 * s, 0.9 * s, 0.22 * s], y: 0.9 * s };
    }
    if (name.startsWith('rocks') || name === 'stones') {
        return { half: [0.42 * s, 0.28 * s, 0.42 * s], y: 0.28 * s };
    }
    if (name === 'tent') {
        return { half: [0.55 * s, 0.42 * s, 0.55 * s], y: 0.42 * s };
    }
    if (name === 'platform') {
        return { half: [0.7 * s, 0.12 * s, 0.7 * s], y: 0.12 * s };
    }
    if (name === 'target') {
        return { half: [0.28 * s, 0.55 * s, 0.12 * s], y: 0.55 * s };
    }
    if (name === 'fence') {
        return { half: [0.55 * s, 0.35 * s, 0.08 * s], y: 0.35 * s };
    }
    if (name.includes('character')) {
        return { half: [0.22 * s, 0.48 * s, 0.22 * s], y: 0.48 * s };
    }
    return null;
}

function ForestCollider({ piece }: { piece: OutsidePiece }) {
    const collider = forestColliderFor(piece);
    if (!collider) return null;

    return (
        <RigidBody
            type="fixed"
            colliders={false}
            position={[piece.position[0], 0, piece.position[2]]}
            rotation={[0, piece.rotationY ?? 0, 0]}
            friction={1.15}
            restitution={0.05}
        >
            <CuboidCollider
                args={collider.half}
                position={[0, collider.y, 0]}
            />
        </RigidBody>
    );
}

function OuterGrassPlane() {
    const cx = (FENCE_EDGE.minX + FENCE_EDGE.maxX) / 2;
    const cz = (FENCE_EDGE.minZ + FENCE_EDGE.maxZ) / 2;
    const width = FENCE_EDGE.maxX - FENCE_EDGE.minX;
    const depth = FENCE_EDGE.maxZ - FENCE_EDGE.minZ;

    return (
        <Suspense
            fallback={
                <mesh
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[cx, 0, cz]}
                    receiveShadow
                >
                    <planeGeometry args={[width, depth]} />
                    <meshStandardMaterial color="#4d6b3e" roughness={0.95} />
                </mesh>
            }
        >
            <TiledGrassPlane
                width={width}
                depth={depth}
                position={[cx, 0, cz]}
                tileSize={1.25}
            />
        </Suspense>
    );
}

/** One distance scan for many grass patches — hide far ones (plane covers them). */
function NearGrassPatches({ pieces }: { pieces: OutsidePiece[] }) {
    const [nearIds, setNearIds] = useState<Set<string>>(() => new Set());
    const frame = useRef(0);
    const nearRef = useRef<Set<string>>(new Set());

    useFrame(() => {
        frame.current += 1;
        if (frame.current % 8 !== 0) return;

        const next = new Set<string>();
        const px = playerWorldPos.x;
        const pz = playerWorldPos.z;
        const limit2 = 22 * 22;

        for (const piece of pieces) {
            const dx = piece.position[0] - px;
            const dz = piece.position[2] - pz;
            if (dx * dx + dz * dz < limit2) next.add(piece.id);
        }

        let changed = next.size !== nearRef.current.size;
        if (!changed) {
            for (const id of next) {
                if (!nearRef.current.has(id)) {
                    changed = true;
                    break;
                }
            }
        }
        if (changed) {
            nearRef.current = next;
            setNearIds(next);
        }
    });

    return (
        <>
            {pieces.map((piece) =>
                nearIds.has(piece.id) ? (
                    <Suspense key={piece.id} fallback={null}>
                        <OutsideProp piece={piece} />
                    </Suspense>
                ) : null,
            )}
        </>
    );
}

export function OutsideWorld() {
    return (
        <group>
            <OuterGrassPlane />
            <NearGrassPatches pieces={OUTSIDE_GRASS} />
            {OUTSIDE_TREES.map((piece) => (
                <group key={piece.id}>
                    <ForestCollider piece={piece} />
                    <DistanceLod
                        x={piece.position[0]}
                        z={piece.position[2]}
                        modelUrl={piece.model}
                        scale={piece.scale}
                    >
                        <OutsideProp piece={piece} />
                    </DistanceLod>
                </group>
            ))}
            {OUTSIDE_ROCKS.map((piece) => (
                <group key={piece.id}>
                    <ForestCollider piece={piece} />
                    <DistanceLod
                        x={piece.position[0]}
                        z={piece.position[2]}
                        modelUrl={piece.model}
                        scale={piece.scale}
                    >
                        <OutsideProp piece={piece} />
                    </DistanceLod>
                </group>
            ))}
        </group>
    );
}
