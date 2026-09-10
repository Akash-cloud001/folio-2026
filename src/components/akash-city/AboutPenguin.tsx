'use client';

import { Html, useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { ABOUT_GUIDE } from '@/data/akash-city/about-guide';
import {
    playerWorldPos,
    useCityStore,
} from '@/components/akash-city/cityStore';

function PenguinModel({
    near,
    talking,
}: {
    near: boolean;
    talking: boolean;
}) {
    const { scene, animations } = useGLTF(ABOUT_GUIDE.model);
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
        prefer.setEffectiveTimeScale(near && !talking ? 1.2 : 0.9);
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

        group.position.y =
            Math.sin(t * (excited ? 5.0 : 2.0)) * (excited ? 0.08 : 0.03);
        group.rotation.z =
            Math.sin(t * (excited ? 3.0 : 1.3)) * (excited ? 0.07 : 0.03);

        const [gx, , gz] = ABOUT_GUIDE.position;
        const targetYaw = excited
            ? Math.atan2(playerWorldPos.x - gx, playerWorldPos.z - gz)
            : ABOUT_GUIDE.rotationY;
        const cur = group.rotation.y;
        let delta = targetYaw - cur;
        while (delta > Math.PI) delta -= Math.PI * 2;
        while (delta < -Math.PI) delta += Math.PI * 2;
        group.rotation.y = cur + delta * 0.09;
    });

    return (
        <group ref={root} rotation={[0, ABOUT_GUIDE.rotationY, 0]}>
            <primitive object={model} scale={ABOUT_GUIDE.scale} />
        </group>
    );
}

/** Center-home guide — opens About Me. Approach and press E / click. */
export function AboutPenguin() {
    const [near, setNear] = useState(false);
    const setAboutNear = useCityStore((s) => s.setAboutNear);
    const openAbout = useCityStore((s) => s.openAbout);
    const aboutOpen = useCityStore((s) => s.aboutOpen);
    const controlsEnabled = useCityStore((s) => s.controlsEnabled);

    useFrame(() => {
        const [gx, , gz] = ABOUT_GUIDE.position;
        const dist = Math.hypot(playerWorldPos.x - gx, playerWorldPos.z - gz);
        const next = dist <= ABOUT_GUIDE.interactRadius;
        if (next !== near) {
            setNear(next);
            setAboutNear(next);
        }
    });

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.code !== 'KeyE' || e.repeat) return;
            if (!useCityStore.getState().controlsEnabled) return;
            if (!useCityStore.getState().aboutNear) return;
            if (useCityStore.getState().aboutOpen) return;
            // Prefer experience guide if somehow overlapping
            if (useCityStore.getState().experienceNear) return;
            e.preventDefault();
            openAbout();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [openAbout]);

    useEffect(() => {
        return () => setAboutNear(false);
    }, [setAboutNear]);

    return (
        <group position={ABOUT_GUIDE.position}>
            <group
                onClick={(e) => {
                    e.stopPropagation();
                    if (!controlsEnabled || aboutOpen) return;
                    openAbout();
                }}
                onPointerOver={() => {
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                    document.body.style.cursor = 'auto';
                }}
            >
                <PenguinModel near={near} talking={aboutOpen} />
            </group>

            {near && controlsEnabled && !aboutOpen ? (
                <Html
                    position={[0, 1.45, 0]}
                    center
                    distanceFactor={8}
                    style={{ pointerEvents: 'none' }}
                >
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            openAbout();
                        }}
                        className="pointer-events-auto whitespace-nowrap rounded-md border border-sky-300/40 bg-zinc-950/90 px-3 py-1.5 font-geist-mono text-[10px] uppercase tracking-[0.18em] text-sky-100 shadow-lg backdrop-blur-sm"
                        style={{ pointerEvents: 'auto' }}
                    >
                        E · Talk to Pillo
                    </button>
                </Html>
            ) : null}
        </group>
    );
}

useGLTF.preload(ABOUT_GUIDE.model);
