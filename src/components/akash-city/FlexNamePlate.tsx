'use client';

import { Text } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

export type FlexNamePlateDef = {
    id: string;
    /** Engraved / printed name on the board */
    label: string;
    position: [number, number, number];
    /** Yaw in radians — 0 faces +Z */
    rotationY?: number;
    /** Board width in world units */
    width?: number;
};

const FRAME = '#e8e2d6';
const FACE = '#2a2c30';
const LETTER = '#f2ebe0';
const DEFAULT_WIDTH = 2.1;
const ASPECT = 3.2;
const FRAME_T = 0.07;
const DEPTH = 0.12;

/**
 * Reusable wall / freestanding flex name board for district buildings.
 * Cream frame + dark face + light lettering (matches city hoarding language).
 */
export function FlexNamePlate({ def }: { def: FlexNamePlateDef }) {
    const width = def.width ?? DEFAULT_WIDTH;
    const height = width / ASPECT;
    const innerW = width - FRAME_T * 2.2;
    const innerH = height - FRAME_T * 2.2;

    const frameMat = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: FRAME,
                roughness: 0.78,
                metalness: 0.04,
            }),
        [],
    );

    const railY = height / 2 - FRAME_T / 2;
    const railX = width / 2 - FRAME_T / 2;
    const fontSize = Math.min(0.22, width * 0.095);

    return (
        <group position={def.position} rotation={[0, def.rotationY ?? 0, 0]}>
            {/* Frame */}
            <mesh position={[0, railY, 0]} material={frameMat} castShadow>
                <boxGeometry args={[width, FRAME_T, DEPTH]} />
            </mesh>
            <mesh position={[0, -railY, 0]} material={frameMat} castShadow>
                <boxGeometry args={[width, FRAME_T, DEPTH]} />
            </mesh>
            <mesh position={[-railX, 0, 0]} material={frameMat} castShadow>
                <boxGeometry args={[FRAME_T, height, DEPTH]} />
            </mesh>
            <mesh position={[railX, 0, 0]} material={frameMat} castShadow>
                <boxGeometry args={[FRAME_T, height, DEPTH]} />
            </mesh>

            {/* Face */}
            <mesh position={[0, 0, DEPTH * 0.1]} castShadow receiveShadow>
                <boxGeometry args={[innerW, innerH, DEPTH * 0.35]} />
                <meshStandardMaterial
                    color={FACE}
                    roughness={0.88}
                    metalness={0.02}
                />
            </mesh>

            <Text
                position={[0, 0, DEPTH * 0.32]}
                fontSize={fontSize}
                color={LETTER}
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.08}
                maxWidth={innerW * 0.92}
                textAlign="center"
            >
                {def.label}
            </Text>

            {/* Short mount pegs under the board */}
            <mesh
                position={[-width * 0.28, -height / 2 - 0.12, 0]}
                material={frameMat}
                castShadow
            >
                <boxGeometry args={[0.08, 0.24, 0.08]} />
            </mesh>
            <mesh
                position={[width * 0.28, -height / 2 - 0.12, 0]}
                material={frameMat}
                castShadow
            >
                <boxGeometry args={[0.08, 0.24, 0.08]} />
            </mesh>
        </group>
    );
}

/** District flex boards mounted on / in front of landmark buildings. */
export const DISTRICT_FLEX_PLATES: FlexNamePlateDef[] = [
    {
        id: 'flex-experience',
        label: 'EXPERIENCE',
        // Ground plate at SW / left entrance of the Experience block
        position: [-6.45, 0.36, -6.95],
        rotationY: Math.PI,
        width: 1.35,
    },
    {
        id: 'flex-business',
        label: 'BUSINESS',
        position: [21.3, 2.4, -13.35],
        rotationY: Math.PI,
        width: 2.35,
    },
    {
        id: 'flex-projects',
        label: 'PROJECTS',
        position: [0.0, 2.15, -15.55],
        rotationY: Math.PI,
        width: 2.4,
    },
];

export function DistrictFlexPlates() {
    return (
        <group>
            {DISTRICT_FLEX_PLATES.map((def) => (
                <FlexNamePlate key={def.id} def={def} />
            ))}
        </group>
    );
}
