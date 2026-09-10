'use client';

import { Billboard, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef, useState, type ReactNode } from 'react';
import * as THREE from 'three';
import {
    LOD_FAR,
    LOD_NEAR,
    modelToPreviewUrl,
} from '@/data/akash-city/bounds';
import { playerWorldPos } from '@/components/akash-city/cityStore';

function PreviewBillboard({
    url,
    height,
    position,
}: {
    url: string;
    height: number;
    position: [number, number, number];
}) {
    const map = useTexture(url);
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 4;

    const aspect = useMemo(() => {
        const img = map.image as { width?: number; height?: number } | undefined;
        if (img?.width && img?.height && img.height > 0) {
            return img.width / img.height;
        }
        return 0.85;
    }, [map]);

    const width = height * aspect;
    // Kenney previews have empty margin under the subject — sink the plane
    // so painted feet sit closer to the ground.
    const centerY = height * 0.38;

    return (
        <Billboard
            position={[position[0], 0, position[2]]}
            follow
            lockX
            lockZ
        >
            <mesh position={[0, centerY, 0]}>
                <planeGeometry args={[width, height]} />
                <meshBasicMaterial
                    map={map}
                    transparent
                    alphaTest={0.2}
                    depthWrite={false}
                    side={THREE.DoubleSide}
                    toneMapped={false}
                />
            </mesh>
        </Billboard>
    );
}

type DistanceLodProps = {
    x: number;
    z: number;
    modelUrl: string;
    scale?: number;
    children: ReactNode;
};

/**
 * Forest-only LOD: far trees use preview images; nearby trees load GLBs.
 * City buildings / houses / poles always use full models (not this wrapper).
 */
export function DistanceLod({
    x,
    z,
    modelUrl,
    scale = 1,
    children,
}: DistanceLodProps) {
    const [near, setNear] = useState(false);
    const nearRef = useRef(false);
    const previewUrl = modelToPreviewUrl(modelUrl);
    const height = Math.max(1.2, scale * 2.2);

    useFrame(() => {
        const dx = x - playerWorldPos.x;
        const dz = z - playerWorldPos.z;
        const d2 = dx * dx + dz * dz;
        const nearLimit = LOD_NEAR * LOD_NEAR;
        const farLimit = LOD_FAR * LOD_FAR;

        let next = nearRef.current;
        if (nearRef.current && d2 > farLimit) next = false;
        if (!nearRef.current && d2 < nearLimit) next = true;

        if (next !== nearRef.current) {
            nearRef.current = next;
            setNear(next);
        }
    });

    if (near) {
        return (
            <Suspense
                fallback={
                    previewUrl ? (
                        <PreviewBillboard
                            url={previewUrl}
                            height={height}
                            position={[x, 0, z]}
                        />
                    ) : null
                }
            >
                {children}
            </Suspense>
        );
    }

    if (!previewUrl) return null;

    return (
        <Suspense fallback={null}>
            <PreviewBillboard
                url={previewUrl}
                height={height}
                position={[x, 0, z]}
            />
        </Suspense>
    );
}
