'use client';

import { Text, useTexture } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useMemo } from 'react';
import * as THREE from 'three';

export type BoardingDef = {
    id: string;
    position: [number, number, number];
    /** Yaw only — boards stand fully upright. */
    rotationY?: number;
    /** Overall board width in world units. */
    width?: number;
    imageUrl: string;
    title: string;
    /** Text engraved on the ground plaque (matches map labels). */
    plaqueLabel: string;
    comingSoon?: boolean;
};

const FRAME_COLOR = '#e8e2d6';
const PLAQUE_STONE = '#3a3d42';
const PLAQUE_INSET = '#26282c';
const PLAQUE_ENGRAVE = '#c8b9a4';
const DEFAULT_WIDTH = 2.55;
const ASPECT = 16 / 10;
const FRAME_THICK = 0.1;
const FRAME_DEPTH = 0.22;
const LEG_W = 0.16;
const LEG_H = 0.38;
const LEG_D = 0.18;

/** 2×3 map: col spacing / row spacing in world units. */
const GRID_ORIGIN: [number, number] = [-4.2, -11.15];
const COL_STEP = 4.2;
const ROW_STEP = 3.35;

function gridPos(col: number, row: number): [number, number, number] {
    // row 0 = north (map top), row 1 = south (map bottom / visitor side)
    return [
        GRID_ORIGIN[0] + col * COL_STEP,
        0,
        GRID_ORIGIN[1] - row * ROW_STEP,
    ];
}

function BoardingScreen({
    url,
    comingSoon,
}: {
    url: string;
    comingSoon?: boolean;
}) {
    const map = useTexture(url, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 8;
        tex.flipY = true;
        tex.wrapS = THREE.ClampToEdgeWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.needsUpdate = true;
    });

    const mat = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                map,
                color: '#ffffff',
                roughness: 0.42,
                metalness: 0.02,
                side: THREE.FrontSide,
            }),
        [map],
    );

    const z = FRAME_DEPTH * 0.18;

    return (
        <>
            <mesh position={[0, 0, z]} material={mat} castShadow receiveShadow>
                <planeGeometry args={[1, 1]} />
            </mesh>
            {comingSoon ? (
                <group position={[0, 0.38, z + 0.004]}>
                    <ComingSoonBadge />
                </group>
            ) : null}

            <mesh
                position={[0, 0, -z]}
                rotation={[0, Math.PI, 0]}
                material={mat}
                castShadow
                receiveShadow
            >
                <planeGeometry args={[1, 1]} />
            </mesh>
            {comingSoon ? (
                <group
                    position={[0, 0.38, -z - 0.004]}
                    rotation={[0, Math.PI, 0]}
                >
                    <ComingSoonBadge />
                </group>
            ) : null}
        </>
    );
}

function ComingSoonBadge() {
    return (
        <>
            <mesh>
                <planeGeometry args={[0.42, 0.08]} />
                <meshBasicMaterial color="#1a0a2e" transparent opacity={0.92} />
            </mesh>
            <Text
                position={[0, 0, 0.002]}
                fontSize={0.038}
                color="#e9d5ff"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.06}
            >
                COMING SOON
            </Text>
        </>
    );
}

/** Ground plaque with inset engraved project name (map-style surface label). */
function EngravedNameplate({
    label,
    boardWidth,
}: {
    label: string;
    boardWidth: number;
}) {
    const plateW = Math.min(boardWidth * 0.92, 2.35);
    const plateD = 0.48;

    return (
        <group position={[0, 0.012, boardWidth * 0.48]}>
            <mesh receiveShadow castShadow position={[0, 0.02, 0]}>
                <boxGeometry args={[plateW, 0.04, plateD]} />
                <meshStandardMaterial
                    color={PLAQUE_STONE}
                    roughness={0.92}
                    metalness={0.05}
                />
            </mesh>
            <mesh position={[0, 0.042, 0]} receiveShadow>
                <boxGeometry args={[plateW * 0.9, 0.012, plateD * 0.52]} />
                <meshStandardMaterial
                    color={PLAQUE_INSET}
                    roughness={1}
                    metalness={0}
                />
            </mesh>
            {/* Flat on ground, 180° spin in-plane (no mirror) */}
            <Text
                position={[0, 0.05, 0]}
                rotation={[-Math.PI / 2, 0, Math.PI]}
                fontSize={0.105}
                color={PLAQUE_ENGRAVE}
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.05}
                outlineWidth={0.004}
                outlineColor="#1a1b1e"
            >
                {label}
            </Text>
        </group>
    );
}

function CustomBoarding({ def }: { def: BoardingDef }) {
    const width = def.width ?? DEFAULT_WIDTH;
    const height = width / ASPECT;
    const innerW = width - FRAME_THICK * 2.15;
    const innerH = height - FRAME_THICK * 2.15;

    const frameMat = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: FRAME_COLOR,
                roughness: 0.78,
                metalness: 0.03,
            }),
        [],
    );

    const railY = height / 2 - FRAME_THICK / 2;
    const railX = width / 2 - FRAME_THICK / 2;
    const legInsetX = width * 0.28;
    const legY = -height / 2 - LEG_H / 2 + 0.02;
    const totalH = height + LEG_H;
    const colliderDepth = Math.max(FRAME_DEPTH * 0.5 + 0.12, 0.28);

    return (
        <RigidBody
            type="fixed"
            colliders={false}
            position={def.position}
            friction={1.2}
            restitution={0}
        >
            <group rotation={[0, def.rotationY ?? 0, 0]}>
                <EngravedNameplate label={def.plaqueLabel} boardWidth={width} />

                <group position={[0, height / 2 + LEG_H, 0]}>
                    <mesh
                        position={[0, railY, 0]}
                        material={frameMat}
                        castShadow
                        receiveShadow
                    >
                        <boxGeometry args={[width, FRAME_THICK, FRAME_DEPTH]} />
                    </mesh>
                    <mesh
                        position={[0, -railY, 0]}
                        material={frameMat}
                        castShadow
                        receiveShadow
                    >
                        <boxGeometry args={[width, FRAME_THICK, FRAME_DEPTH]} />
                    </mesh>
                    <mesh
                        position={[-railX, 0, 0]}
                        material={frameMat}
                        castShadow
                        receiveShadow
                    >
                        <boxGeometry args={[FRAME_THICK, height, FRAME_DEPTH]} />
                    </mesh>
                    <mesh
                        position={[railX, 0, 0]}
                        material={frameMat}
                        castShadow
                        receiveShadow
                    >
                        <boxGeometry args={[FRAME_THICK, height, FRAME_DEPTH]} />
                    </mesh>

                    <mesh castShadow receiveShadow>
                        <boxGeometry
                            args={[
                                innerW + 0.02,
                                innerH + 0.02,
                                FRAME_DEPTH * 0.18,
                            ]}
                        />
                        <meshStandardMaterial
                            color="#1c1c20"
                            roughness={0.95}
                            metalness={0}
                        />
                    </mesh>

                    <group scale={[innerW, innerH, 1]}>
                        <BoardingScreen
                            url={def.imageUrl}
                            comingSoon={def.comingSoon}
                        />
                    </group>

                    <mesh
                        position={[-legInsetX, legY, 0]}
                        material={frameMat}
                        castShadow
                        receiveShadow
                    >
                        <boxGeometry args={[LEG_W, LEG_H, LEG_D]} />
                    </mesh>
                    <mesh
                        position={[legInsetX, legY, 0]}
                        material={frameMat}
                        castShadow
                        receiveShadow
                    >
                        <boxGeometry args={[LEG_W, LEG_H, LEG_D]} />
                    </mesh>
                </group>

                <CuboidCollider
                    args={[width * 0.5, totalH * 0.5, colliderDepth]}
                    position={[0, totalH * 0.5, 0]}
                />
            </group>
        </RigidBody>
    );
}

/**
 * 2×3 map layout (north → south), Tradzu ↔ nexetro swapped:
 *   nexetro | myforexfirms | Tradzu
 *   nestingo | Portfolio | Akash-city
 */
export const PROJECT_BOARDINGS: BoardingDef[] = [
    {
        id: 'board-nexetro',
        title: 'Nexetro',
        plaqueLabel: 'nexetro',
        imageUrl: '/projects/nexetro.png',
        position: gridPos(0, 0),
        width: DEFAULT_WIDTH,
        comingSoon: true,
    },
    {
        id: 'board-mff',
        title: 'MyForexFirms',
        plaqueLabel: 'myforexfirms',
        imageUrl: '/projects/myforexfirms.png',
        position: gridPos(1, 0),
        width: DEFAULT_WIDTH,
    },
    {
        id: 'board-tradzu',
        title: 'Tradzu',
        plaqueLabel: 'Tradzu',
        imageUrl: '/projects/tradzu/lading-page.png',
        position: gridPos(2, 0),
        width: DEFAULT_WIDTH,
    },
    {
        id: 'board-nestingo',
        title: 'Nestingo',
        plaqueLabel: 'nestingo',
        imageUrl: '/projects/nestingo.png',
        position: gridPos(0, 1),
        width: DEFAULT_WIDTH,
    },
    {
        id: 'board-folio',
        title: 'Portfolio',
        plaqueLabel: 'Portfolio',
        imageUrl: '/projects/folio-2026/landng-page.png',
        position: gridPos(1, 1),
        width: DEFAULT_WIDTH,
    },
    {
        id: 'board-akash-city',
        title: 'Akash City',
        plaqueLabel: 'Akash-city',
        imageUrl: '/projects/akash-city.png',
        position: gridPos(2, 1),
        width: DEFAULT_WIDTH,
    },
];

export function ProjectHoardings() {
    return (
        <group>
            {PROJECT_BOARDINGS.map((def) => (
                <CustomBoarding key={def.id} def={def} />
            ))}
        </group>
    );
}
