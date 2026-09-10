'use client';

import { Billboard, Text, useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import {
    CapsuleCollider,
    CuboidCollider,
    RigidBody,
    type RapierRigidBody,
} from '@react-three/rapier';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { CITY_PET_BY_ID } from '@/data/akash-city/pets';
import {
    ALL_SKILL_PETS,
    CITY_ROAM_BOUNDS,
    CITY_SKILL_PETS,
    PADDOCK_SKILL_PETS,
    SKILLS_HOARDING,
    SKILLS_PADDOCK,
    type SkillPetDef,
} from '@/data/akash-city/skills-paddock';
import { FlexNamePlate } from '@/components/akash-city/FlexNamePlate';
import { useCityStore } from '@/components/akash-city/cityStore';
import { isPetKnockedBack } from '@/components/akash-city/collisionFx';

/** Capsule half-height + radius — body center so collider rests on y=0 */
const CAP_HALF = 0.1;
const CAP_RADIUS = 0.16;
const BODY_Y = CAP_HALF + CAP_RADIUS;
const PADDOCK_SPEED = 1.05;
const CITY_SPEED = 1.35;
const PATROL_SPEED = 1.55;

type Bounds = {
    minX: number;
    maxX: number;
    minZ: number;
    maxZ: number;
};

/** In-scene label: depth-tested + toneMapped off so names stay readable. */
function SkillTag({ label, height }: { label: string; height: number }) {
    const controlsEnabled = useCityStore((s) => s.controlsEnabled);
    const width = Math.max(0.62, label.length * 0.085);

    if (!controlsEnabled) return null;

    return (
        <Billboard position={[0, height, 0]} follow>
            <mesh position={[0, 0, -0.001]}>
                <planeGeometry args={[width, 0.24]} />
                <meshBasicMaterial
                    color="#0a0a0c"
                    transparent
                    opacity={0.94}
                    depthTest
                    depthWrite={false}
                    toneMapped={false}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <Text
                position={[0, 0, 0.01]}
                fontSize={0.11}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.04}
                outlineWidth={0.008}
                outlineColor="#0a0a0c"
                onSync={(troika) => {
                    const mat = troika.material as THREE.MeshBasicMaterial | undefined;
                    if (!mat) return;
                    mat.toneMapped = false;
                    mat.depthTest = true;
                    mat.depthWrite = false;
                    mat.transparent = true;
                }}
            >
                {label.toUpperCase()}
            </Text>
        </Billboard>
    );
}

function useSkillPetModel(petId: SkillPetDef['petId'], scale: number) {
    const pet = CITY_PET_BY_ID[petId];
    const { scene, animations } = useGLTF(pet.model);
    const model = useMemo(() => cloneSkinned(scene), [scene]);
    const { actions } = useAnimations(animations, model);

    /** Lift so mesh feet sit on local y=0 (ground). */
    const ySnap = useMemo(() => {
        const probe = model.clone(true);
        probe.position.set(0, 0, 0);
        probe.rotation.set(0, 0, 0);
        probe.scale.set(scale, scale, scale);
        probe.updateMatrixWorld(true);
        const box = new THREE.Box3().setFromObject(probe);
        return -box.min.y;
    }, [model, scale]);

    const tagHeight = useMemo(() => {
        const probe = model.clone(true);
        probe.position.set(0, ySnap, 0);
        probe.scale.set(scale, scale, scale);
        probe.updateMatrixWorld(true);
        const box = new THREE.Box3().setFromObject(probe);
        return box.max.y + 0.2;
    }, [model, scale, ySnap]);

    useEffect(() => {
        model.traverse((obj) => {
            const mesh = obj as THREE.Mesh;
            if (!mesh.isMesh) return;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
        });
    }, [model]);

    useEffect(() => {
        const walk = actions.walk;
        const idle = actions.static ?? actions.idle;
        idle?.reset().play();
        if (idle) idle.paused = true;
        walk?.reset().play();
        walk?.setEffectiveTimeScale(0.95);
        return () => {
            walk?.stop();
            idle?.stop();
        };
    }, [actions]);

    return { model, actions, scale, ySnap, tagHeight };
}

function pinBodyHeight(rigid: RapierRigidBody) {
    const t = rigid.translation();
    const v = rigid.linvel();
    if (Math.abs(t.y - BODY_Y) > 0.05 || Math.abs(v.y) > 0.01) {
        rigid.setTranslation({ x: t.x, y: BODY_Y, z: t.z }, true);
        rigid.setLinvel({ x: v.x, y: 0, z: v.z }, true);
    }
}

/** While knocked back, allow a short hop then settle to ground. */
function settleKnockback(rigid: RapierRigidBody) {
    const t = rigid.translation();
    const v = rigid.linvel();
    if (t.y < BODY_Y) {
        rigid.setTranslation({ x: t.x, y: BODY_Y, z: t.z }, true);
        rigid.setLinvel({ x: v.x * 0.92, y: 0, z: v.z * 0.92 }, true);
        return;
    }
    if (t.y > BODY_Y + 1.6) {
        rigid.setLinvel({ x: v.x, y: Math.min(v.y, -0.5), z: v.z }, true);
    }
}

function setYaw(rigid: RapierRigidBody, yaw: number, quat: THREE.Quaternion, up: THREE.Vector3) {
    quat.setFromAxisAngle(up, yaw);
    rigid.setRotation({ x: quat.x, y: quat.y, z: quat.z, w: quat.w }, true);
}

function clampToBounds(
    rigid: RapierRigidBody,
    bounds: Bounds,
    pad: number,
): boolean {
    const t = rigid.translation();
    let nx = t.x;
    let nz = t.z;
    let clamped = false;
    if (nx < bounds.minX + pad) {
        nx = bounds.minX + pad;
        clamped = true;
    } else if (nx > bounds.maxX - pad) {
        nx = bounds.maxX - pad;
        clamped = true;
    }
    if (nz < bounds.minZ + pad) {
        nz = bounds.minZ + pad;
        clamped = true;
    } else if (nz > bounds.maxZ - pad) {
        nz = bounds.maxZ - pad;
        clamped = true;
    }
    if (clamped) {
        rigid.setTranslation({ x: nx, y: BODY_Y, z: nz }, true);
    }
    return clamped;
}

/** Free / paddock wanderer with rigid-body collisions. */
function FreeRoamer({
    def,
    bounds,
    speed,
}: {
    def: SkillPetDef;
    bounds: Bounds;
    speed: number;
}) {
    const { model, actions, scale, ySnap, tagHeight } = useSkillPetModel(
        def.petId,
        def.scale,
    );
    const body = useRef<RapierRigidBody>(null);
    const yaw = useRef(Math.random() * Math.PI * 2);
    const turnTimer = useRef(1.5 + Math.random() * 2.5);
    const pauseTimer = useRef(0);
    const stuckTimer = useRef(0);
    const quat = useMemo(() => new THREE.Quaternion(), []);
    const up = useMemo(() => new THREE.Vector3(0, 1, 0), []);
    const pad = def.mode === 'paddock' ? 0.7 : 1.1;

    useFrame((_, delta) => {
        const rigid = body.current;
        if (!rigid) return;

        if (isPetKnockedBack(rigid.handle)) {
            settleKnockback(rigid);
            const walk = actions.walk;
            if (walk) walk.paused = true;
            return;
        }

        pinBodyHeight(rigid);

        const t = rigid.translation();
        const walk = actions.walk;
        const idle = actions.static ?? actions.idle;

        if (pauseTimer.current > 0) {
            pauseTimer.current -= delta;
            stuckTimer.current = 0;
            rigid.setLinvel({ x: 0, y: 0, z: 0 }, true);
            if (walk) walk.paused = true;
            if (idle) {
                idle.paused = false;
                idle.play();
            }
            setYaw(rigid, yaw.current, quat, up);
            return;
        }

        if (idle) idle.paused = true;
        if (walk) {
            walk.paused = false;
            walk.play();
        }

        // Read velocity from last physics step (before we overwrite it)
        const prev = rigid.linvel();
        const speedPrev = Math.hypot(prev.x, prev.z);
        if (speedPrev < 0.25) {
            stuckTimer.current += delta;
            if (stuckTimer.current > 0.4) {
                yaw.current += Math.PI * 0.7 + (Math.random() - 0.5) * 0.9;
                turnTimer.current = 0.5;
                stuckTimer.current = 0;
                rigid.applyImpulse(
                    {
                        x: Math.sin(yaw.current) * 0.4,
                        y: 0,
                        z: Math.cos(yaw.current) * 0.4,
                    },
                    true,
                );
            }
        } else {
            stuckTimer.current = 0;
        }

        turnTimer.current -= delta;
        if (turnTimer.current <= 0) {
            yaw.current += (Math.random() - 0.5) * 1.6;
            turnTimer.current = 1.8 + Math.random() * 3.2;
            if (Math.random() < 0.16) {
                pauseTimer.current = 0.6 + Math.random() * 1.4;
            }
        }

        if (t.x < bounds.minX + pad + 0.5) yaw.current = Math.PI * 0.5;
        else if (t.x > bounds.maxX - pad - 0.5) yaw.current = -Math.PI * 0.5;
        if (t.z < bounds.minZ + pad + 0.5) yaw.current = 0;
        else if (t.z > bounds.maxZ - pad - 0.5) yaw.current = Math.PI;

        // Soft avoid paddock interior for city free-roamers
        if (def.mode === 'free') {
            const { minX, maxX, minZ, maxZ } = SKILLS_PADDOCK;
            if (t.x > minX - 0.8 && t.x < maxX + 0.8 && t.z > minZ - 0.8 && t.z < maxZ + 0.8) {
                const cx = (minX + maxX) / 2;
                const cz = (minZ + maxZ) / 2;
                yaw.current = Math.atan2(t.x - cx, t.z - cz);
            }
        }

        rigid.setLinvel(
            {
                x: Math.sin(yaw.current) * speed,
                y: 0,
                z: Math.cos(yaw.current) * speed,
            },
            true,
        );

        if (clampToBounds(rigid, bounds, pad)) turnTimer.current = 0.45;

        setYaw(rigid, yaw.current, quat, up);
    });

    return (
        <RigidBody
            ref={body}
            name="skill-pet"
            position={[def.start[0], BODY_Y, def.start[1]]}
            colliders={false}
            lockRotations
            linearDamping={2.2}
            angularDamping={12}
            friction={0.45}
            restitution={0.55}
            density={0.85}
            canSleep={false}
            ccd
            gravityScale={1.35}
        >
            <CapsuleCollider args={[CAP_HALF, CAP_RADIUS]} position={[0, 0, 0]} />
            {/* Body center is BODY_Y above ground; snap mesh feet to y=0 */}
            <group position={[0, -BODY_Y, 0]}>
                <primitive object={model} scale={scale} position={[0, ySnap, 0]} />
                <SkillTag label={def.skill} height={tagHeight} />
            </group>
        </RigidBody>
    );
}

/** Back-and-forth along a straight path (roads). */
function PatrolRoamer({ def }: { def: SkillPetDef }) {
    const path = def.path;
    const { model, actions, scale, ySnap, tagHeight } = useSkillPetModel(
        def.petId,
        def.scale,
    );
    const body = useRef<RapierRigidBody>(null);
    const targetIndex = useRef(1);
    const pauseTimer = useRef(0);
    const stuckTimer = useRef(0);
    const quat = useMemo(() => new THREE.Quaternion(), []);
    const up = useMemo(() => new THREE.Vector3(0, 1, 0), []);

    useFrame((_, delta) => {
        const rigid = body.current;
        if (!rigid || !path) return;

        if (isPetKnockedBack(rigid.handle)) {
            settleKnockback(rigid);
            const walk = actions.walk;
            if (walk) walk.paused = true;
            return;
        }

        pinBodyHeight(rigid);

        const walk = actions.walk;
        const idle = actions.static ?? actions.idle;
        const t = rigid.translation();
        const target = path[targetIndex.current];
        const dx = target[0] - t.x;
        const dz = target[1] - t.z;
        const dist = Math.hypot(dx, dz);

        if (pauseTimer.current > 0) {
            pauseTimer.current -= delta;
            stuckTimer.current = 0;
            rigid.setLinvel({ x: 0, y: 0, z: 0 }, true);
            if (walk) walk.paused = true;
            if (idle) {
                idle.paused = false;
                idle.play();
            }
            return;
        }

        if (dist < 0.45) {
            targetIndex.current = targetIndex.current === 0 ? 1 : 0;
            pauseTimer.current = 0.25 + Math.random() * 0.45;
            stuckTimer.current = 0;
            rigid.setLinvel({ x: 0, y: 0, z: 0 }, true);
            return;
        }

        if (idle) idle.paused = true;
        if (walk) {
            walk.paused = false;
            walk.play();
        }

        const yaw = Math.atan2(dx, dz);
        const inv = 1 / dist;

        // Velocity from last physics step — detects head-on lock before setLinvel
        const prev = rigid.linvel();
        const speedPrev = Math.hypot(prev.x, prev.z);
        if (speedPrev < 0.25) {
            stuckTimer.current += delta;
            if (stuckTimer.current > 0.35) {
                targetIndex.current = targetIndex.current === 0 ? 1 : 0;
                stuckTimer.current = 0;
                pauseTimer.current = 0.12;
                const side = Math.random() > 0.5 ? 1 : -1;
                rigid.applyImpulse(
                    {
                        x: -dz * inv * 0.5 * side,
                        y: 0,
                        z: dx * inv * 0.5 * side,
                    },
                    true,
                );
                return;
            }
        } else {
            stuckTimer.current = 0;
        }

        rigid.setLinvel(
            {
                x: dx * inv * PATROL_SPEED,
                y: 0,
                z: dz * inv * PATROL_SPEED,
            },
            true,
        );

        setYaw(rigid, yaw, quat, up);
    });

    return (
        <RigidBody
            ref={body}
            name="skill-pet"
            position={[def.start[0], BODY_Y, def.start[1]]}
            colliders={false}
            lockRotations
            linearDamping={2}
            angularDamping={12}
            friction={0.4}
            restitution={0.55}
            density={0.85}
            canSleep={false}
            ccd
            gravityScale={1.35}
        >
            <CapsuleCollider args={[CAP_HALF, CAP_RADIUS]} position={[0, 0, 0]} />
            <group position={[0, -BODY_Y, 0]}>
                <primitive object={model} scale={scale} position={[0, ySnap, 0]} />
                <SkillTag label={def.skill} height={tagHeight} />
            </group>
        </RigidBody>
    );
}

function PaddockBarrier() {
    const { minX, maxX, minZ, maxZ } = SKILLS_PADDOCK;
    const cx = (minX + maxX) / 2;
    const cz = (minZ + maxZ) / 2;
    const halfW = (maxX - minX) / 2;
    const halfD = (maxZ - minZ) / 2;
    const t = 0.18;
    const h = 0.7;

    return (
        <RigidBody type="fixed" colliders={false} position={[cx, h, cz]}>
            <CuboidCollider args={[halfW + t, h, t]} position={[0, 0, halfD]} />
            <CuboidCollider args={[halfW + t, h, t]} position={[0, 0, -halfD]} />
            <CuboidCollider args={[t, h, halfD]} position={[halfW, 0, 0]} />
            <CuboidCollider args={[t, h, halfD]} position={[-halfW, 0, 0]} />
        </RigidBody>
    );
}

function PaddockFloor() {
    const { minX, maxX, minZ, maxZ } = SKILLS_PADDOCK;
    const cx = (minX + maxX) / 2;
    const cz = (minZ + maxZ) / 2;
    const halfW = (maxX - minX) / 2 + 0.2;
    const halfD = (maxZ - minZ) / 2 + 0.2;

    return (
        <RigidBody type="fixed" colliders={false} position={[cx, -0.05, cz]}>
            <CuboidCollider args={[halfW, 0.05, halfD]} />
        </RigidBody>
    );
}

/** Skills block pets + city-wide skill roamers. */
export function SkillsPaddock() {
    return (
        <group>
            <PaddockFloor />
            <PaddockBarrier />

            {PADDOCK_SKILL_PETS.map((def) => (
                <Suspense key={def.id} fallback={null}>
                    <FreeRoamer def={def} bounds={SKILLS_PADDOCK} speed={PADDOCK_SPEED} />
                </Suspense>
            ))}

            {CITY_SKILL_PETS.map((def) => (
                <Suspense key={def.id} fallback={null}>
                    {def.mode === 'patrol' && def.path ? (
                        <PatrolRoamer def={def} />
                    ) : (
                        <FreeRoamer def={def} bounds={CITY_ROAM_BOUNDS} speed={CITY_SPEED} />
                    )}
                </Suspense>
            ))}

            <FlexNamePlate
                def={{
                    id: 'flex-skills',
                    label: SKILLS_HOARDING.label,
                    position: SKILLS_HOARDING.position,
                    rotationY: SKILLS_HOARDING.rotationY,
                    width: SKILLS_HOARDING.width,
                }}
            />
        </group>
    );
}

for (const def of ALL_SKILL_PETS) {
    useGLTF.preload(CITY_PET_BY_ID[def.petId].model);
}
