'use client';

import { useTexture } from '@react-three/drei';
import { useLayoutEffect, useMemo } from 'react';
import * as THREE from 'three';

export const GRASS_TEXTURE_URL = '/akash-city-grass.png';

/** ~world units covered by one texture tile (smaller = denser repeats) */
const DEFAULT_TILE = 1.125;
export const GRASS_BLEND_COLOR = '#93BC9A';

type TiledGrassPlaneProps = {
    width: number;
    depth: number;
    position?: [number, number, number];
    tileSize?: number;
};

export function TiledGrassPlane({
    width,
    depth,
    position = [0, 0, 0],
    tileSize = DEFAULT_TILE,
}: TiledGrassPlaneProps) {
    const source = useTexture(GRASS_TEXTURE_URL);
    const map = useMemo(() => source.clone(), [source]);

    useLayoutEffect(() => {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.colorSpace = THREE.SRGBColorSpace;
        map.anisotropy = 8;
        map.repeat.set(
            Math.max(1, width / tileSize),
            Math.max(1, depth / tileSize),
        );
        map.needsUpdate = true;
        return () => {
            map.dispose();
        };
    }, [map, width, depth, tileSize]);

    return (
        <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={position}
            receiveShadow
        >
            <planeGeometry args={[width, depth]} />
            <meshStandardMaterial
                map={map}
                color={GRASS_BLEND_COLOR}
                roughness={0.95}
                metalness={0}
            />
        </mesh>
    );
}

useTexture.preload(GRASS_TEXTURE_URL);
