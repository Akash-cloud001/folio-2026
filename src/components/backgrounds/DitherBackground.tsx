'use client';

import { Suspense, useRef, useEffect, forwardRef } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { EffectComposer, wrapEffect } from '@react-three/postprocessing';
import { Effect } from 'postprocessing';
import * as THREE from 'three';

const vertexShader = `
precision highp float;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

/** Photo layer: object-cover sampling + mouse scatter (particles push away from cursor). */
const photoFragmentShader = `
precision highp float;
uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform vec2 uImageSize;
uniform vec2 uMouse;
uniform int uEnableMouse;
uniform float uMouseRadius;
uniform float uDistortStrength;

varying vec2 vUv;

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

vec2 coverUv(vec2 uv, vec2 res, vec2 img) {
  float screenAspect = res.x / res.y;
  float imageAspect = img.x / img.y;
  vec2 centered = uv - 0.5;
  if (screenAspect > imageAspect) {
    centered.y *= imageAspect / screenAspect;
  } else {
    centered.x *= screenAspect / imageAspect;
  }
  return centered + 0.5;
}

vec2 scatterUv(vec2 texUv, vec2 screenUv, vec2 mouseScreen, float influence) {
  vec2 delta = screenUv - mouseScreen;
  vec2 dir = normalize(delta + 0.0001);

  // Subtle radial push — pixels drift outward near cursor
  texUv += dir * influence * uDistortStrength * 0.028;

  // Light particle jitter on dither clusters
  vec2 cell = floor(screenUv * 280.0);
  float h = hash21(cell);
  texUv += (vec2(h, fract(h * 1.37)) - 0.5) * influence * 0.012 * uDistortStrength;

  return texUv;
}

void main() {
  vec2 screenUv = vUv;
  vec2 texUv = coverUv(screenUv, uResolution, uImageSize);
  float influence = 0.0;

  if (uEnableMouse == 1) {
    vec2 mouseScreen = uMouse / uResolution;
    mouseScreen.y = 1.0 - mouseScreen.y;
    float dist = length(screenUv - mouseScreen);
    influence = 1.0 - smoothstep(0.0, uMouseRadius, dist);
    texUv = scatterUv(texUv, screenUv, mouseScreen, influence);
  }

  texUv = clamp(texUv, 0.0, 1.0);
  vec3 col = texture2D(uTexture, texUv).rgb;
  float luma = dot(col, vec3(0.299, 0.587, 0.114));
  luma = clamp((luma - 0.08) * 1.12, 0.0, 1.0);

  // Soft clear zone near cursor (original wave dither feel, toned down)
  luma -= influence * 0.18 * uDistortStrength;
  luma = clamp(luma, 0.0, 1.0);

  gl_FragColor = vec4(vec3(luma), 1.0);
}
`;

const ditherFragmentShader = `
precision highp float;
uniform float colorNum;
uniform float pixelSize;
uniform float ditherBias;
const float bayerMatrix8x8[64] = float[64](
  0.0/64.0, 48.0/64.0, 12.0/64.0, 60.0/64.0,  3.0/64.0, 51.0/64.0, 15.0/64.0, 63.0/64.0,
  32.0/64.0,16.0/64.0, 44.0/64.0, 28.0/64.0, 35.0/64.0,19.0/64.0, 47.0/64.0, 31.0/64.0,
  8.0/64.0, 56.0/64.0,  4.0/64.0, 52.0/64.0, 11.0/64.0,59.0/64.0,  7.0/64.0, 55.0/64.0,
  40.0/64.0,24.0/64.0, 36.0/64.0, 20.0/64.0, 43.0/64.0,27.0/64.0, 39.0/64.0, 23.0/64.0,
  2.0/64.0, 50.0/64.0, 14.0/64.0, 62.0/64.0,  1.0/64.0,49.0/64.0, 13.0/64.0, 61.0/64.0,
  34.0/64.0,18.0/64.0, 46.0/64.0, 30.0/64.0, 33.0/64.0,17.0/64.0, 45.0/64.0, 29.0/64.0,
  10.0/64.0,58.0/64.0,  6.0/64.0, 54.0/64.0,  9.0/64.0,57.0/64.0,  5.0/64.0, 53.0/64.0,
  42.0/64.0,26.0/64.0, 38.0/64.0, 22.0/64.0, 41.0/64.0,25.0/64.0, 37.0/64.0, 21.0/64.0
);

vec3 dither(vec2 uv, vec3 color) {
  float luma = dot(color, vec3(0.299, 0.587, 0.114));
  vec2 scaledCoord = floor(uv * resolution / pixelSize);
  int x = int(mod(scaledCoord.x, 8.0));
  int y = int(mod(scaledCoord.y, 8.0));
  float threshold = bayerMatrix8x8[y * 8 + x] - 0.25;
  float step = 1.0 / (colorNum - 1.0);
  luma += threshold * step;
  luma = clamp(luma - ditherBias, 0.0, 1.0);
  float quantized = floor(luma * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
  return vec3(quantized);
}

void mainImage(in vec4 inputColor, in vec2 uv, out vec4 outputColor) {
  vec2 normalizedPixelSize = pixelSize / resolution;
  vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
  vec4 color = texture2D(inputBuffer, uvPixel);
  color.rgb = dither(uv, color.rgb);
  outputColor = color;
}
`;

class RetroEffectImpl extends Effect {
    public uniforms: Map<string, THREE.Uniform<number>>;

    constructor() {
        const uniforms = new Map<string, THREE.Uniform<number>>([
            ['colorNum', new THREE.Uniform(4.0)],
            ['pixelSize', new THREE.Uniform(3.0)],
            ['ditherBias', new THREE.Uniform(0.2)],
        ]);
        super('RetroEffect', ditherFragmentShader, { uniforms });
        this.uniforms = uniforms;
    }

    set colorNum(value: number) {
        this.uniforms.get('colorNum')!.value = value;
    }

    get colorNum(): number {
        return this.uniforms.get('colorNum')!.value;
    }

    set pixelSize(value: number) {
        this.uniforms.get('pixelSize')!.value = value;
    }

    get pixelSize(): number {
        return this.uniforms.get('pixelSize')!.value;
    }

    set ditherBias(value: number) {
        this.uniforms.get('ditherBias')!.value = value;
    }

    get ditherBias(): number {
        return this.uniforms.get('ditherBias')!.value;
    }
}

const WrappedRetroEffect = wrapEffect(RetroEffectImpl);

const RetroEffect = forwardRef<
    RetroEffectImpl,
    { colorNum: number; pixelSize: number; ditherBias: number }
>((props, ref) => {
    const { colorNum, pixelSize, ditherBias } = props;
    return (
        <WrappedRetroEffect
            ref={ref}
            colorNum={colorNum}
            pixelSize={pixelSize}
            ditherBias={ditherBias}
        />
    );
});

RetroEffect.displayName = 'RetroEffect';

class PortraitTextureLoader extends THREE.TextureLoader {
    load(
        url: string,
        onLoad?: (data: THREE.Texture<HTMLImageElement>) => void,
        onProgress?: (event: ProgressEvent<EventTarget>) => void,
        onError?: (err: unknown) => void
    ): THREE.Texture<HTMLImageElement> {
        return super.load(
            url,
            (texture) => {
                texture.colorSpace = THREE.SRGBColorSpace;
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                texture.wrapS = THREE.ClampToEdgeWrapping;
                texture.wrapT = THREE.ClampToEdgeWrapping;
                onLoad?.(texture);
            },
            onProgress,
            onError
        );
    }
}

interface PhotoUniforms {
    [key: string]: THREE.Uniform<unknown>;
    uTexture: THREE.Uniform<THREE.Texture>;
    uResolution: THREE.Uniform<THREE.Vector2>;
    uImageSize: THREE.Uniform<THREE.Vector2>;
    uMouse: THREE.Uniform<THREE.Vector2>;
    uEnableMouse: THREE.Uniform<number>;
    uMouseRadius: THREE.Uniform<number>;
    uDistortStrength: THREE.Uniform<number>;
}

interface DitheredPhotoProps {
    imageUrl: string;
    colorNum: number;
    pixelSize: number;
    ditherBias: number;
    enableMouseInteraction: boolean;
    mouseRadius: number;
    distortStrength: number;
}

function DitheredPhoto({
    imageUrl,
    colorNum,
    pixelSize,
    ditherBias,
    enableMouseInteraction,
    mouseRadius,
    distortStrength,
}: DitheredPhotoProps) {
    const mesh = useRef<THREE.Mesh>(null);
    const mouseRef = useRef(new THREE.Vector2());
    const texture = useLoader(PortraitTextureLoader, imageUrl);

    const { viewport, size, gl } = useThree();

    // R3F shader uniforms are mutated per-frame — not React state.
    const uniformsRef = useRef<PhotoUniforms>({
        uTexture: new THREE.Uniform(texture),
        uResolution: new THREE.Uniform(new THREE.Vector2(1, 1)),
        uImageSize: new THREE.Uniform(
            new THREE.Vector2(texture.image?.width ?? 1, texture.image?.height ?? 1)
        ),
        uMouse: new THREE.Uniform(new THREE.Vector2(0, 0)),
        uEnableMouse: new THREE.Uniform(enableMouseInteraction ? 1 : 0),
        uMouseRadius: new THREE.Uniform(mouseRadius),
        uDistortStrength: new THREE.Uniform(distortStrength),
    });

    useEffect(() => {
        const uniforms = uniformsRef.current;
        uniforms.uTexture.value = texture;
        uniforms.uImageSize.value.set(texture.image?.width ?? 1, texture.image?.height ?? 1);
    }, [texture]);

    useEffect(() => {
        const dpr = gl.getPixelRatio();
        uniformsRef.current.uResolution.value.set(
            Math.floor(size.width * dpr),
            Math.floor(size.height * dpr)
        );
    }, [size, gl]);

    useEffect(() => {
        if (!enableMouseInteraction) return;

        const onPointerMove = (e: PointerEvent) => {
            const rect = gl.domElement.getBoundingClientRect();
            const dpr = gl.getPixelRatio();
            mouseRef.current.set((e.clientX - rect.left) * dpr, (e.clientY - rect.top) * dpr);
        };

        window.addEventListener('pointermove', onPointerMove, { passive: true });
        return () => window.removeEventListener('pointermove', onPointerMove);
    }, [enableMouseInteraction, gl]);

    useFrame(() => {
        const uniforms = uniformsRef.current;
        uniforms.uEnableMouse.value = enableMouseInteraction ? 1 : 0;
        uniforms.uMouseRadius.value = mouseRadius;
        uniforms.uDistortStrength.value = distortStrength;

        if (enableMouseInteraction) {
            uniforms.uMouse.value.copy(mouseRef.current);
        }
    });

    return (
        <>
            <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
                <planeGeometry args={[1, 1]} />
                <shaderMaterial
                    vertexShader={vertexShader}
                    fragmentShader={photoFragmentShader}
                    // eslint-disable-next-line react-hooks/refs -- stable R3F uniform bag
                    uniforms={uniformsRef.current}
                />
            </mesh>

            <EffectComposer>
                <RetroEffect
                    colorNum={colorNum}
                    pixelSize={pixelSize}
                    ditherBias={ditherBias}
                />
            </EffectComposer>
        </>
    );
}

interface DitherBackgroundProps {
    className?: string;
    /** Portrait / photo source — object-cover + dither. */
    imageUrl?: string;
    colorNum?: number;
    pixelSize?: number;
    ditherBias?: number;
    enableMouseInteraction?: boolean;
    mouseRadius?: number;
    distortStrength?: number;
}

export function DitherBackground({
    className,
    imageUrl = '/dither-image.png',
    colorNum = 4,
    pixelSize = 3,
    ditherBias = 0.2,
    enableMouseInteraction = true,
    mouseRadius = 0.22,
    distortStrength = 0.35,
}: DitherBackgroundProps) {
    return (
        <div
            className={`pointer-events-none fixed inset-0 z-0 bg-black ${className ?? ''}`}
        >
            <Canvas
                className="h-full w-full"
                camera={{ position: [0, 0, 6] }}
                dpr={1}
                gl={{ antialias: true, preserveDrawingBuffer: true }}
            >
                <Suspense fallback={null}>
                    <DitheredPhoto
                        imageUrl={imageUrl}
                        colorNum={colorNum}
                        pixelSize={pixelSize}
                        ditherBias={ditherBias}
                        enableMouseInteraction={enableMouseInteraction}
                        mouseRadius={mouseRadius}
                        distortStrength={distortStrength}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
