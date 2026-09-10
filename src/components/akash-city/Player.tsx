'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import {
    CuboidCollider,
    RigidBody,
    type RapierRigidBody,
} from '@react-three/rapier';
import {
    Suspense,
    useEffect,
    useMemo,
    useRef,
    type MutableRefObject,
} from 'react';
import * as THREE from 'three';
import {
    CITY_SPAWN,
    CITY_WORLD_BOUNDS,
    type Vec3,
} from '@/data/akash-city/layout';
import {
    CITY_KART_BY_ID,
    DEFAULT_KART_ID,
    KART_MODEL_SCALE,
    type KartId,
} from '@/data/akash-city/karts';
import {
    playerWorldPos,
    useCityStore,
} from '@/components/akash-city/cityStore';
import { useKartAudio } from '@/components/akash-city/useKartAudio';
import {
    markPetKnockback,
    spawnExhaustSmoke,
} from '@/components/akash-city/collisionFx';

const MAX_SPEED = 6.5;
const ACCEL = 9;
const BRAKE = 18;
const REVERSE_MAX = 2.8;
const STEER_RATE = 2.1;
const DRAG = 2.8;
const LOOK_SENS = 0.0028;
const TPP_DISTANCE = 5.2;
const TPP_PIVOT_HEIGHT = 1.15;
const TPP_LOOK_AHEAD = 8;
const TPP_DEFAULT_PITCH = -0.18;
const TPP_PITCH_MAX = 0.12;
const TPP_PITCH_MIN = -0.48;
const TPP_MIN_CAM_Y = 0.55;
const FPP_HEIGHT = 0.95;
const BODY_Y = 0.24;

type Keys = Record<string, boolean>;

function KartMesh({
    kartId,
    yawRef,
}: {
    kartId: KartId;
    yawRef: MutableRefObject<number>;
}) {
    const kart = CITY_KART_BY_ID[kartId];
    const { scene } = useGLTF(kart.model);
    const root = useRef<THREE.Group>(null);
    const model = useMemo(() => scene.clone(true), [scene]);

    const ySnap = useMemo(() => {
        const probe = model.clone(true);
        probe.position.set(0, 0, 0);
        probe.rotation.set(0, 0, 0);
        probe.scale.set(KART_MODEL_SCALE, KART_MODEL_SCALE, KART_MODEL_SCALE);
        probe.updateMatrixWorld(true);
        const box = new THREE.Box3().setFromObject(probe);
        return -box.min.y;
    }, [model]);

    useEffect(() => {
        model.traverse((obj) => {
            const mesh = obj as THREE.Mesh;
            if (!mesh.isMesh) return;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
        });
    }, [model]);

    useFrame(() => {
        if (root.current) root.current.rotation.y = yawRef.current;
    });

    return (
        <group ref={root} position={[0, -BODY_Y, 0]}>
            <primitive
                object={model}
                scale={KART_MODEL_SCALE}
                position={[0, ySnap, 0]}
            />
        </group>
    );
}

export function Player() {
    const body = useRef<RapierRigidBody>(null);
    const keys = useRef<Keys>({});
    const yaw = useRef(0);
    const camYawOffset = useRef(0);
    const pitch = useRef(TPP_DEFAULT_PITCH);
    const speed = useRef(0);
    const pointerDown = useRef(false);
    const { camera, gl } = useThree();
    const cameraMode = useCityStore((s) => s.cameraMode);
    const selectedKartId = useCityStore((s) => s.selectedKartId);
    const controlsEnabled = useCityStore((s) => s.controlsEnabled);
    const kartId = selectedKartId ?? DEFAULT_KART_ID;
    const { updateDrive, playImpact } = useKartAudio(controlsEnabled);
    const reducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (
                event.target instanceof HTMLInputElement ||
                event.target instanceof HTMLTextAreaElement
            ) {
                return;
            }
            keys.current[event.code] = true;
            if (!useCityStore.getState().controlsEnabled) return;
            if (event.code === 'Escape') {
                const store = useCityStore.getState();
                if (store.aboutOpen) {
                    store.closeAbout();
                } else if (store.experienceOpen) {
                    store.closeExperience();
                } else {
                    store.closePanel();
                }
            }
            if (event.code === 'KeyC' && !event.repeat) {
                useCityStore.getState().toggleCameraMode();
            }
            if (event.code === 'Space') {
                event.preventDefault();
            }
        };
        const onKeyUp = (event: KeyboardEvent) => {
            keys.current[event.code] = false;
        };
        const onBlur = () => {
            keys.current = {};
        };

        const onPointerDown = () => {
            if (!useCityStore.getState().controlsEnabled) return;
            pointerDown.current = true;
            if (document.pointerLockElement !== gl.domElement) {
                void gl.domElement.requestPointerLock?.();
            }
        };
        const onPointerUp = () => {
            pointerDown.current = false;
        };
        const onPointerMove = (event: PointerEvent) => {
            if (
                !pointerDown.current &&
                document.pointerLockElement !== gl.domElement
            ) {
                return;
            }
            camYawOffset.current -= event.movementX * LOOK_SENS;
            camYawOffset.current = THREE.MathUtils.clamp(
                camYawOffset.current,
                -Math.PI * 0.55,
                Math.PI * 0.55,
            );
            const mode = useCityStore.getState().cameraMode;
            const minPitch = mode === 'tpp' ? TPP_PITCH_MIN : -0.4;
            const maxPitch = mode === 'tpp' ? TPP_PITCH_MAX : 0.35;
            pitch.current = THREE.MathUtils.clamp(
                pitch.current - event.movementY * LOOK_SENS,
                minPitch,
                maxPitch,
            );
        };

        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
        window.addEventListener('blur', onBlur);
        gl.domElement.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointermove', onPointerMove);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
            window.removeEventListener('blur', onBlur);
            gl.domElement.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('pointermove', onPointerMove);
        };
    }, [gl]);

    useFrame((_, delta) => {
        const rigid = body.current;
        if (!rigid) return;

        const dt = Math.min(delta, 0.05);
        const controlsOn = useCityStore.getState().controlsEnabled;

        if (controlsOn) {
            const navigateTarget = useCityStore.getState().navigateTarget;
            if (navigateTarget) {
                const t = rigid.translation();
                const dx = navigateTarget[0] - t.x;
                const dz = navigateTarget[2] - t.z;
                const dist = Math.hypot(dx, dz);
                if (dist < 0.55) {
                    useCityStore.getState().clearNavigate();
                    speed.current = 0;
                } else {
                    const nx = dx / dist;
                    const nz = dz / dist;
                    yaw.current = Math.atan2(nx, nz);
                    speed.current = Math.min(MAX_SPEED * 0.85, dist * 2.2);
                    rigid.setLinvel(
                        {
                            x: nx * speed.current,
                            y: rigid.linvel().y,
                            z: nz * speed.current,
                        },
                        true,
                    );
                }
            } else {
                const stick = useCityStore.getState().mobileStick;
                let throttle = 0;
                let steer = 0;
                if (keys.current.KeyW || keys.current.ArrowUp) throttle += 1;
                if (keys.current.KeyS || keys.current.ArrowDown) throttle -= 1;
                if (keys.current.KeyA || keys.current.ArrowLeft) steer += 1;
                if (keys.current.KeyD || keys.current.ArrowRight) steer -= 1;
                throttle += -stick.y;
                steer += -stick.x;
                throttle = THREE.MathUtils.clamp(throttle, -1, 1);
                steer = THREE.MathUtils.clamp(steer, -1, 1);

                const handbrake = Boolean(keys.current.Space);

                if (throttle > 0) {
                    speed.current += throttle * ACCEL * dt;
                } else if (throttle < 0) {
                    if (speed.current > 0.4) {
                        speed.current += throttle * BRAKE * dt;
                    } else {
                        speed.current += throttle * ACCEL * 0.55 * dt;
                    }
                } else {
                    const drag = handbrake ? DRAG * 3.2 : DRAG;
                    speed.current *= Math.exp(-drag * dt);
                    if (Math.abs(speed.current) < 0.05) speed.current = 0;
                }

                speed.current = THREE.MathUtils.clamp(
                    speed.current,
                    -REVERSE_MAX,
                    MAX_SPEED,
                );

                const speedAbs = Math.abs(speed.current);
                const steerScale =
                    0.25 + Math.min(1, speedAbs / (MAX_SPEED * 0.65)) * 0.75;
                const turn =
                    steer *
                    STEER_RATE *
                    steerScale *
                    (speed.current >= 0 ? 1 : -1) *
                    (handbrake ? 1.55 : 1) *
                    dt;
                yaw.current += turn;

                rigid.setLinvel(
                    {
                        x: Math.sin(yaw.current) * speed.current,
                        y: rigid.linvel().y,
                        z: Math.cos(yaw.current) * speed.current,
                    },
                    true,
                );

                updateDrive(
                    speedAbs,
                    MAX_SPEED,
                    Math.abs(steer) > 0.55 && speedAbs > MAX_SPEED * 0.35,
                    throttle > 0.05 && !handbrake,
                );

                // Exhaust from rear bumper while moving
                if (speedAbs > 0.45) {
                    const t = rigid.translation();
                    const rear = 0.47;
                    spawnExhaustSmoke(
                        t.x - Math.sin(yaw.current) * rear,
                        0.12,
                        t.z - Math.cos(yaw.current) * rear,
                        (0.35 + (speedAbs / MAX_SPEED) * 0.9) * 0.5,
                        yaw.current,
                    );
                }
            }

            const t = rigid.translation();
            const clamped: Vec3 = [
                THREE.MathUtils.clamp(
                    t.x,
                    CITY_WORLD_BOUNDS.minX,
                    CITY_WORLD_BOUNDS.maxX,
                ),
                t.y,
                THREE.MathUtils.clamp(
                    t.z,
                    CITY_WORLD_BOUNDS.minZ,
                    CITY_WORLD_BOUNDS.maxZ,
                ),
            ];
            if (clamped[0] !== t.x || clamped[2] !== t.z) {
                rigid.setTranslation(
                    { x: clamped[0], y: clamped[1], z: clamped[2] },
                    true,
                );
                speed.current *= 0.4;
            }
        } else {
            speed.current = 0;
            rigid.setLinvel({ x: 0, y: rigid.linvel().y, z: 0 }, true);
            yaw.current += dt * 0.12;
            camYawOffset.current = 0;
            updateDrive(0, MAX_SPEED, false);
        }

        // Ease camera yaw back behind the kart while driving
        if (controlsOn && Math.abs(speed.current) > 1.2) {
            camYawOffset.current = THREE.MathUtils.damp(
                camYawOffset.current,
                0,
                1.8,
                dt,
            );
        }

        const pos = rigid.translation();
        playerWorldPos.x = pos.x;
        playerWorldPos.y = pos.y;
        playerWorldPos.z = pos.z;

        const lookYaw = yaw.current + camYawOffset.current;
        const lookDir = new THREE.Vector3(
            Math.sin(lookYaw) * Math.cos(pitch.current),
            Math.sin(pitch.current),
            Math.cos(lookYaw) * Math.cos(pitch.current),
        );
        const pivot = new THREE.Vector3(
            pos.x,
            pos.y + TPP_PIVOT_HEIGHT,
            pos.z,
        );

        let desiredCamPos: THREE.Vector3;
        let camTarget: THREE.Vector3;

        if (cameraMode === 'fpp') {
            desiredCamPos = new THREE.Vector3(
                pos.x,
                pos.y + FPP_HEIGHT,
                pos.z,
            ).addScaledVector(
                new THREE.Vector3(Math.sin(lookYaw), 0, Math.cos(lookYaw)),
                0.35,
            );
            camTarget = desiredCamPos
                .clone()
                .add(lookDir.clone().multiplyScalar(12));
        } else {
            pitch.current = THREE.MathUtils.clamp(
                pitch.current,
                TPP_PITCH_MIN,
                TPP_PITCH_MAX,
            );
            const tppLook = new THREE.Vector3(
                Math.sin(lookYaw) * Math.cos(pitch.current),
                Math.sin(pitch.current),
                Math.cos(lookYaw) * Math.cos(pitch.current),
            );
            desiredCamPos = pivot
                .clone()
                .addScaledVector(tppLook, -TPP_DISTANCE);
            if (desiredCamPos.y < TPP_MIN_CAM_Y) {
                desiredCamPos.y = TPP_MIN_CAM_Y;
            }
            camTarget = pivot.clone().addScaledVector(tppLook, TPP_LOOK_AHEAD);
        }

        const lerp = reducedMotion ? 1 : 1 - Math.exp(-9 * dt);
        camera.position.lerp(desiredCamPos, lerp);
        if (cameraMode === 'tpp' && camera.position.y < TPP_MIN_CAM_Y) {
            camera.position.y = TPP_MIN_CAM_Y;
        }
        camera.lookAt(camTarget);
    });

    return (
        <RigidBody
            ref={body}
            position={[CITY_SPAWN[0], BODY_Y, CITY_SPAWN[2]]}
            colliders={false}
            type="dynamic"
            enabledRotations={[false, false, false]}
            lockRotations
            linearDamping={0.2}
            angularDamping={1}
            friction={1.1}
            restitution={0.05}
            ccd
            canSleep={false}
            name="player-kart"
            onCollisionEnter={(payload) => {
                if (!useCityStore.getState().controlsEnabled) return;
                const rigid = body.current;
                if (!rigid) return;

                const otherBody = payload.other.rigidBody;
                const isPet =
                    payload.other.rigidBodyObject?.name === 'skill-pet';
                if (!isPet || !otherBody) {
                    // Soft bump into world — only slow the kart a bit
                    const hitSpeed = Math.abs(speed.current);
                    if (hitSpeed > 1.2) {
                        speed.current *= 0.55;
                        playImpact(hitSpeed * 0.85);
                    }
                    return;
                }

                const hitSpeed = Math.max(
                    Math.abs(speed.current),
                    Math.hypot(rigid.linvel().x, rigid.linvel().z),
                );
                if (hitSpeed < 0.7) return;

                const kt = rigid.translation();
                const pt = otherBody.translation();
                let dx = pt.x - kt.x;
                let dz = pt.z - kt.z;
                let len = Math.hypot(dx, dz);
                if (len < 0.05) {
                    // Fallback: throw along kart forward
                    dx = Math.sin(yaw.current);
                    dz = Math.cos(yaw.current);
                    len = 1;
                } else {
                    dx /= len;
                    dz /= len;
                }

                // Blend push-away with kart travel direction for a real hit feel
                const fx = Math.sin(yaw.current) * Math.sign(speed.current || 1);
                const fz = Math.cos(yaw.current) * Math.sign(speed.current || 1);
                const nx = dx * 0.55 + fx * 0.45;
                const nz = dz * 0.55 + fz * 0.45;
                const nLen = Math.hypot(nx, nz) || 1;
                const kx = nx / nLen;
                const kz = nz / nLen;

                const throwSpeed = 3.2 + hitSpeed * 2.4;
                const lift = 0.85 + hitSpeed * 0.35;
                otherBody.setLinvel(
                    {
                        x: kx * throwSpeed,
                        y: Math.min(4.2, lift),
                        z: kz * throwSpeed,
                    },
                    true,
                );
                otherBody.applyImpulse(
                    {
                        x: kx * throwSpeed * 0.45,
                        y: lift * 0.35,
                        z: kz * throwSpeed * 0.45,
                    },
                    true,
                );
                markPetKnockback(otherBody.handle, 700 + hitSpeed * 80);

                playImpact(2.5 + hitSpeed * 1.4);
                speed.current *= 0.72;
            }}
            onContactForce={(payload) => {
                // World hits (walls / props) — force-scaled impact SFX
                if (!useCityStore.getState().controlsEnabled) return;
                if (payload.other.rigidBodyObject?.name === 'skill-pet') return;
                const force = payload.totalForceMagnitude;
                if (force < 14) return;
                playImpact(Math.min(16, force / 14));
            }}
        >
            <CuboidCollider args={[0.36, 0.24, 0.47]} position={[0, 0, 0]} />
            {selectedKartId ? (
                <Suspense fallback={null}>
                    <KartMesh
                        kartId={kartId}
                        yawRef={yaw}
                    />                </Suspense>
            ) : (
                <mesh castShadow position={[0, 0.15, 0]}>
                    <boxGeometry args={[0.7, 0.35, 1.05]} />
                    <meshStandardMaterial color="#f59e0b" roughness={0.45} />
                </mesh>
            )}
        </RigidBody>
    );
}

for (const def of Object.values(CITY_KART_BY_ID)) {
    useGLTF.preload(def.model);
}
