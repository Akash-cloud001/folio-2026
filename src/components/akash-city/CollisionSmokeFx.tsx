'use client';

import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { takeSmokeQueue } from '@/components/akash-city/collisionFx';

const LIFE = 0.7;
const MAX_PUFFS = 3;

type Puff = {
    sprite: THREE.Sprite;
    vx: number;
    vy: number;
    vz: number;
    age: number;
    life: number;
    baseScale: number;
};

/** Billboard exhaust / smoke using `/fx/smoke.png`. */
export function CollisionSmokeFx() {
    const root = useRef<THREE.Group>(null);
    const puffs = useRef<Puff[]>([]);
    const texture = useTexture('/fx/smoke.png');

    useEffect(() => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.needsUpdate = true;
    }, [texture]);

    useFrame((_, delta) => {
        const group = root.current;
        if (!group) return;
        const dt = Math.min(delta, 0.05);

        for (const req of takeSmokeQueue()) {
            const count = Math.min(MAX_PUFFS, 1 + Math.round(req.intensity * 1.25));
            const backX = req.yaw != null ? -Math.sin(req.yaw) : 0;
            const backZ = req.yaw != null ? -Math.cos(req.yaw) : 0;

            for (let i = 0; i < count; i += 1) {
                const mat = new THREE.SpriteMaterial({
                    map: texture,
                    transparent: true,
                    opacity: 0.28,
                    depthWrite: false,
                    color: new THREE.Color('#ebe6de'),
                    fog: true,
                });
                const sprite = new THREE.Sprite(mat);
                const side = (Math.random() - 0.5) * 0.18;
                sprite.position.set(
                    req.x + backX * Math.random() * 0.12 + side * Math.cos(req.yaw ?? 0),
                    req.y + Math.random() * 0.1,
                    req.z + backZ * Math.random() * 0.12 + side * Math.sin(req.yaw ?? 0),
                );
                const baseScale = 0.14 + Math.random() * 0.18 * req.intensity;
                sprite.scale.set(baseScale, baseScale, 1);
                group.add(sprite);
                puffs.current.push({
                    sprite,
                    vx: backX * (0.45 + Math.random() * 0.55) + (Math.random() - 0.5) * 0.25,
                    vy: 0.25 + Math.random() * 0.35,
                    vz: backZ * (0.45 + Math.random() * 0.55) + (Math.random() - 0.5) * 0.25,
                    age: 0,
                    life: LIFE * (0.7 + Math.random() * 0.4),
                    baseScale,
                });
            }
        }

        const live: Puff[] = [];
        for (const puff of puffs.current) {
            puff.age += dt;
            const t = puff.age / puff.life;
            if (t >= 1) {
                group.remove(puff.sprite);
                puff.sprite.material.dispose();
                continue;
            }
            const fade = t < 0.12 ? t / 0.12 : 1 - (t - 0.12) / 0.88;
            const grow = 1 + t * 1.6;
            puff.sprite.position.x += puff.vx * dt;
            puff.sprite.position.y += puff.vy * dt;
            puff.sprite.position.z += puff.vz * dt;
            puff.vy *= Math.exp(-1.4 * dt);
            const s = puff.baseScale * grow;
            puff.sprite.scale.set(s, s, 1);
            puff.sprite.material.opacity = Math.max(0, fade * 0.28);
            live.push(puff);
        }
        puffs.current = live;
    });

    return <group ref={root} />;
}

useTexture.preload('/fx/smoke.png');
