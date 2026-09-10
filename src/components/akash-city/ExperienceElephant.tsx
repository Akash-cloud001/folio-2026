'use client';

import { Html, useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { EXPERIENCE_GUIDE } from '@/data/akash-city/experience';
import {
    playerWorldPos,
    useCityStore,
} from '@/components/akash-city/cityStore';

function ElephantModel({
    near,
    talking,
}: {
    near: boolean;
    talking: boolean;
}) {
    const { scene, animations } = useGLTF(EXPERIENCE_GUIDE.model);
    const model = useMemo(() => cloneSkinned(scene), [scene]);
    const { actions } = useAnimations(animations, model);
    const root = useRef<THREE.Group>(null);
    const activeClip = useRef<string | null>(null);

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
        const prefer = near && !talking && walk ? walk : idle;
        if (!prefer) return;

        if (activeClip.current && activeClip.current !== prefer.getClip().name) {
            actions[activeClip.current]?.fadeOut(0.2);
        }
        prefer.reset().fadeIn(0.25).play();
        prefer.setEffectiveTimeScale(near && !talking ? 1.15 : 0.85);
        prefer.paused = false;
        activeClip.current = prefer.getClip().name;

        return () => {
            prefer.fadeOut(0.15);
            activeClip.current = null;
        };
    }, [actions, near, talking]);

    useFrame((state) => {
        const group = root.current;
        if (!group) return;
        const t = state.clock.elapsedTime;
        const excited = near && !talking;

        // Soft bob / bounce — livelier when the player is close
        group.position.y =
            Math.sin(t * (excited ? 4.2 : 1.8)) * (excited ? 0.07 : 0.028);
        group.rotation.z = Math.sin(t * (excited ? 2.6 : 1.2)) * (excited ? 0.06 : 0.03);

        // Ease yaw toward the player when nearby
        const [gx, , gz] = EXPERIENCE_GUIDE.position;
        const targetYaw = excited
            ? Math.atan2(playerWorldPos.x - gx, playerWorldPos.z - gz)
            : EXPERIENCE_GUIDE.rotationY;
        const cur = group.rotation.y;
        let delta = targetYaw - cur;
        while (delta > Math.PI) delta -= Math.PI * 2;
        while (delta < -Math.PI) delta += Math.PI * 2;
        group.rotation.y = cur + delta * 0.08;
    });

    return (
        <group ref={root} rotation={[0, EXPERIENCE_GUIDE.rotationY, 0]}>
            <primitive object={model} scale={EXPERIENCE_GUIDE.scale} />
        </group>
    );
}

/** Experience guide — animated Ellie; approach and press E / click to talk. */
export function ExperienceElephant() {
    const [near, setNear] = useState(false);
    const setExperienceNear = useCityStore((s) => s.setExperienceNear);
    const openExperience = useCityStore((s) => s.openExperience);
    const experienceOpen = useCityStore((s) => s.experienceOpen);
    const controlsEnabled = useCityStore((s) => s.controlsEnabled);

    useFrame(() => {
        const [gx, , gz] = EXPERIENCE_GUIDE.position;
        const dist = Math.hypot(
            playerWorldPos.x - gx,
            playerWorldPos.z - gz,
        );
        const next = dist <= EXPERIENCE_GUIDE.interactRadius;
        if (next !== near) {
            setNear(next);
            setExperienceNear(next);
        }
    });

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.code !== 'KeyE' || e.repeat) return;
            if (!useCityStore.getState().controlsEnabled) return;
            if (!useCityStore.getState().experienceNear) return;
            if (useCityStore.getState().experienceOpen) return;
            e.preventDefault();
            openExperience();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [openExperience]);

    useEffect(() => {
        return () => setExperienceNear(false);
    }, [setExperienceNear]);

    return (
        <group position={EXPERIENCE_GUIDE.position}>
            <group
                onClick={(e) => {
                    e.stopPropagation();
                    if (!controlsEnabled || experienceOpen) return;
                    openExperience();
                }}
                onPointerOver={() => {
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                    document.body.style.cursor = 'auto';
                }}
            >
                <ElephantModel near={near} talking={experienceOpen} />
            </group>

            {near && controlsEnabled && !experienceOpen ? (
                <Html
                    position={[0, 1.65, 0]}
                    center
                    distanceFactor={8}
                    style={{ pointerEvents: 'none' }}
                >
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            openExperience();
                        }}
                        className="pointer-events-auto whitespace-nowrap rounded-md border border-amber-300/40 bg-zinc-950/90 px-3 py-1.5 font-geist-mono text-[10px] uppercase tracking-[0.18em] text-amber-100 shadow-lg backdrop-blur-sm"
                        style={{ pointerEvents: 'auto' }}
                    >
                        E · Talk to Ellie
                    </button>
                </Html>
            ) : null}
        </group>
    );
}

useGLTF.preload(EXPERIENCE_GUIDE.model);
