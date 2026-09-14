'use client';

import { Clone, useGLTF } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { folder, useControls } from 'leva';
import { useMemo } from 'react';
import * as THREE from 'three';
import { LEVA_ENABLED } from '@/components/akash-city/levaEnabled';

const FOREST = '/forest/Models/GLB%20format';
const ARROW_URL = `${FOREST}/weapon-arrow.glb`;
const TARGET_URL = `${FOREST}/target.glb`;
const DIRT_URL = `${FOREST}/patch-dirt.glb`;
const PLATFORM_URL = `${FOREST}/platform.glb`;
const FLAG_URL = `${FOREST}/flag.glb`;
const PLANT_URL = `${FOREST}/plant.glb`;
const STONES_URL = `${FOREST}/stones.glb`;

type Pose = {
    x: number;
    y: number;
    z: number;
    rotX: number;
    rotY: number;
    rotZ: number;
    scale: number;
};

function deg(n: number) {
    return (n * Math.PI) / 180;
}

function poseFolder(name: string, defaults: Pose, collapsed = true) {
    const p = (key: keyof Pose, label: string, min: number, max: number, step: number) => ({
        [`${name}_${key}`]: {
            value: defaults[key],
            min,
            max,
            step,
            label,
        },
    });
    return folder(
        {
            ...p('x', 'x', -8, 8, 0.05),
            ...p('y', 'y', -1, 3, 0.05),
            ...p('z', 'z', -8, 8, 0.05),
            ...p('rotX', 'rotX°', -180, 180, 1),
            ...p('rotY', 'rotY°', -180, 180, 1),
            ...p('rotZ', 'rotZ°', -180, 180, 1),
            ...p('scale', 'scale', 0.2, 4, 0.05),
        },
        { collapsed },
    );
}

function readPose(flat: Record<string, number>, name: string, fallback: Pose): Pose {
    return {
        x: flat[`${name}_x`] ?? fallback.x,
        y: flat[`${name}_y`] ?? fallback.y,
        z: flat[`${name}_z`] ?? fallback.z,
        rotX: flat[`${name}_rotX`] ?? fallback.rotX,
        rotY: flat[`${name}_rotY`] ?? fallback.rotY,
        rotZ: flat[`${name}_rotZ`] ?? fallback.rotZ,
        scale: flat[`${name}_scale`] ?? fallback.scale,
    };
}

function flattenLeva(raw: Record<string, unknown>): Record<string, number> {
    const flat: Record<string, number> = {};
    for (const [key, value] of Object.entries(raw)) {
        if (typeof value === 'number') {
            flat[key] = value;
        } else if (value && typeof value === 'object') {
            for (const [nestedKey, nested] of Object.entries(
                value as Record<string, unknown>,
            )) {
                if (typeof nested === 'number') flat[nestedKey] = nested;
            }
        }
    }
    return flat;
}

function ySnapFor(scene: THREE.Object3D, scale: number): number {
    const probe = scene.clone(true);
    probe.position.set(0, 0, 0);
    probe.rotation.set(0, 0, 0);
    probe.scale.set(1, 1, 1);
    probe.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(probe);
    return -box.min.y * scale;
}

function PoseClone({
    url,
    pose,
    grounded = true,
}: {
    url: string;
    pose: Pose;
    grounded?: boolean;
}) {
    const { scene } = useGLTF(url);
    const ySnap = useMemo(
        () => (grounded ? ySnapFor(scene, pose.scale) : 0),
        [scene, pose.scale, grounded],
    );
    return (
        <group
            position={[pose.x, pose.y, pose.z]}
            rotation={[deg(pose.rotX), deg(pose.rotY), deg(pose.rotZ)]}
        >
            <Clone
                object={scene}
                scale={pose.scale}
                position={[0, ySnap, 0]}
                dispose={null}
            />
        </group>
    );
}

/** Tuned via Leva — archer / bow / hand arrow removed. */
const DEFAULTS = {
    originX: -9.5,
    originZ: 5.2,
    dirt: { x: 0.3, y: -0.1, z: 0, rotX: 0, rotY: 45, rotZ: 0, scale: 1.95 } satisfies Pose,
    platform: { x: -0.1, y: 0, z: -0.1, rotX: 0, rotY: 45, rotZ: 0, scale: 1.25 } satisfies Pose,
    targetL: { x: 1.4, y: 0, z: 2.4, rotX: 0, rotY: 225, rotZ: 0, scale: 1.3 } satisfies Pose,
    targetR: { x: 2.6, y: 0, z: 1.5, rotX: 0, rotY: 225, rotZ: 0, scale: 1.3 } satisfies Pose,
    arrowL: { x: 2.35, y: 0.52, z: 1.15, rotX: 2, rotY: 7, rotZ: 5, scale: 0.95 } satisfies Pose,
    arrowR: { x: 0.95, y: 0.42, z: 2.1, rotX: 2, rotY: 7, rotZ: -26, scale: 0.95 } satisfies Pose,
    flag: { x: 2.4, y: 0, z: 2.6, rotX: 0, rotY: 45, rotZ: 0, scale: 1.15 } satisfies Pose,
    plant1: { x: -1.4, y: 0, z: 1.5, rotX: 0, rotY: 20, rotZ: 0, scale: 1.1 } satisfies Pose,
    plant2: { x: 1.6, y: 0, z: -0.8, rotX: 0, rotY: -30, rotZ: 0, scale: 1.05 } satisfies Pose,
    stones: { x: -1.0, y: 0, z: -0.9, rotX: 0, rotY: 40, rotZ: 0, scale: 1.15 } satisfies Pose,
};

function useArcheryControls() {
    const raw = useControls('Archery Range', {
        originX: {
            value: DEFAULTS.originX,
            min: -20,
            max: 10,
            step: 0.05,
            label: 'Origin X',
        },
        originZ: {
            value: DEFAULTS.originZ,
            min: -5,
            max: 15,
            step: 0.05,
            label: 'Origin Z',
        },
        Dirt: poseFolder('dirt', DEFAULTS.dirt),
        Platform: poseFolder('platform', DEFAULTS.platform),
        TargetL: poseFolder('targetL', DEFAULTS.targetL, false),
        TargetR: poseFolder('targetR', DEFAULTS.targetR, false),
        ArrowInTargetL: poseFolder('arrowL', DEFAULTS.arrowL, false),
        ArrowInTargetR: poseFolder('arrowR', DEFAULTS.arrowR, false),
        Flag: poseFolder('flag', DEFAULTS.flag),
        Plant1: poseFolder('plant1', DEFAULTS.plant1),
        Plant2: poseFolder('plant2', DEFAULTS.plant2),
        Stones: poseFolder('stones', DEFAULTS.stones),
    });

    return useMemo(() => {
        const flat = flattenLeva(raw as Record<string, unknown>);
        return {
            originX: flat.originX ?? DEFAULTS.originX,
            originZ: flat.originZ ?? DEFAULTS.originZ,
            dirt: readPose(flat, 'dirt', DEFAULTS.dirt),
            platform: readPose(flat, 'platform', DEFAULTS.platform),
            targetL: readPose(flat, 'targetL', DEFAULTS.targetL),
            targetR: readPose(flat, 'targetR', DEFAULTS.targetR),
            arrowL: readPose(flat, 'arrowL', DEFAULTS.arrowL),
            arrowR: readPose(flat, 'arrowR', DEFAULTS.arrowR),
            flag: readPose(flat, 'flag', DEFAULTS.flag),
            plant1: readPose(flat, 'plant1', DEFAULTS.plant1),
            plant2: readPose(flat, 'plant2', DEFAULTS.plant2),
            stones: readPose(flat, 'stones', DEFAULTS.stones),
        };
    }, [raw]);
}

type ArcheryConfig = ReturnType<typeof useArcheryControls>;

const ARCHERY_DEFAULTS: ArcheryConfig = {
    originX: DEFAULTS.originX,
    originZ: DEFAULTS.originZ,
    dirt: DEFAULTS.dirt,
    platform: DEFAULTS.platform,
    targetL: DEFAULTS.targetL,
    targetR: DEFAULTS.targetR,
    arrowL: DEFAULTS.arrowL,
    arrowR: DEFAULTS.arrowR,
    flag: DEFAULTS.flag,
    plant1: DEFAULTS.plant1,
    plant2: DEFAULTS.plant2,
    stones: DEFAULTS.stones,
};

function ArcheryRangeScene({ c }: { c: ArcheryConfig }) {
    return (
        <group position={[c.originX, 0, c.originZ]}>
            <PoseClone url={DIRT_URL} pose={c.dirt} />
            <PoseClone url={PLATFORM_URL} pose={c.platform} />

            <PoseClone url={TARGET_URL} pose={c.targetL} />
            <PoseClone url={TARGET_URL} pose={c.targetR} />
            <PoseClone url={ARROW_URL} pose={c.arrowL} grounded={false} />
            <PoseClone url={ARROW_URL} pose={c.arrowR} grounded={false} />

            <RigidBody type="fixed" colliders={false} position={[c.targetL.x, 0, c.targetL.z]}>
                <CuboidCollider args={[0.35, 0.7, 0.12]} position={[0, 0.7, 0]} />
            </RigidBody>
            <RigidBody type="fixed" colliders={false} position={[c.targetR.x, 0, c.targetR.z]}>
                <CuboidCollider args={[0.35, 0.7, 0.12]} position={[0, 0.7, 0]} />
            </RigidBody>

            <PoseClone url={FLAG_URL} pose={c.flag} />
            <PoseClone url={PLANT_URL} pose={c.plant1} />
            <PoseClone url={PLANT_URL} pose={c.plant2} />
            <PoseClone url={STONES_URL} pose={c.stones} />
        </group>
    );
}

function ArcheryRangeWithLeva() {
    const c = useArcheryControls();
    return <ArcheryRangeScene c={c} />;
}

/** NW archery props — targets + lodged arrows (no archer / bow). */
export function ArcheryRange() {
    return LEVA_ENABLED ? (
        <ArcheryRangeWithLeva />
    ) : (
        <ArcheryRangeScene c={ARCHERY_DEFAULTS} />
    );
}

useGLTF.preload(ARROW_URL);
useGLTF.preload(TARGET_URL);
useGLTF.preload(DIRT_URL);
useGLTF.preload(PLATFORM_URL);
useGLTF.preload(FLAG_URL);
useGLTF.preload(PLANT_URL);
useGLTF.preload(STONES_URL);
