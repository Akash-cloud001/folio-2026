'use client';

import { Canvas } from '@react-three/fiber';
import {
    ContactShadows,
    Environment,
    Sky,
} from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Suspense, useEffect } from 'react';
import { OutsideWorld } from '@/components/akash-city/OutsideWorld';
import { Player } from '@/components/akash-city/Player';
import { World } from '@/components/akash-city/World';
import { CollisionSmokeFx } from '@/components/akash-city/CollisionSmokeFx';

type CityCanvasProps = {
    onReady?: () => void;
    onError?: (message: string) => void;
};

function ReadySignal({ onReady }: { onReady?: () => void }) {
    useEffect(() => {
        onReady?.();
    }, [onReady]);
    return null;
}

export function CityCanvas({ onReady, onError }: CityCanvasProps) {
    useEffect(() => {
        return () => {
            // allow remount to signal ready again
            void onError;
        };
    }, [onError]);

    return (
        <Canvas
            className="absolute inset-0 touch-none"
            shadows
            camera={{ position: [8, 3.2, 4], fov: 72, near: 0.1, far: 320 }}
            gl={{ antialias: true, powerPreference: 'high-performance' }}
            onCreated={() => {
                onReady?.();
            }}
        >
            <color attach="background" args={['#1a2218']} />
            <Sky
                distance={450000}
                sunPosition={[48, 10, 36]}
                inclination={0.48}
                azimuth={0.2}
                mieCoefficient={0.012}
                mieDirectionalG={0.8}
                rayleigh={0.7}
                turbidity={8}
            />
            <ambientLight intensity={0.55} />
            <hemisphereLight
                intensity={0.4}
                color="#d5dfd0"
                groundColor="#3d4538"
            />
            <directionalLight
                castShadow
                intensity={1.1}
                position={[18, 28, 10]}
                shadow-mapSize={[2048, 2048]}
                shadow-camera-far={110}
                shadow-camera-left={-50}
                shadow-camera-right={50}
                shadow-camera-top={50}
                shadow-camera-bottom={-50}
            />
            <Suspense fallback={null}>
                <Physics timeStep={1 / 60} gravity={[0, -18, 0]}>
                    <World />
                    <OutsideWorld />
                    <Player />
                    <CollisionSmokeFx />
                </Physics>
                <ContactShadows
                    position={[0, 0.01, 0]}
                    opacity={0.32}
                    scale={110}
                    blur={2.4}
                    far={16}
                />
                <Environment preset="city" environmentIntensity={0.22} />
                <ReadySignal onReady={onReady} />
            </Suspense>
        </Canvas>
    );
}
