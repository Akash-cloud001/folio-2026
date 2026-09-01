'use client';

import type { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { DitherBackground } from '@/components/backgrounds/DitherBackground';
import type { BackgroundId } from '@/lib/backgrounds';
import { cn } from '@/lib/utils';

const LiquidEther = dynamic(() => import('@/components/backgrounds/LiquidEther'), {
    ssr: false,
});
const FloatingLines = dynamic(() => import('@/components/backgrounds/FloatingLines'), {
    ssr: false,
});
const GradientBlinds = dynamic(() => import('@/components/backgrounds/GradientBlinds'), {
    ssr: false,
});
const Waves = dynamic(() => import('@/components/backgrounds/Waves'), {
    ssr: false,
});

/** Palette aligned with `globals.css` — black / white / zinc, no purple defaults. */
const BG = {
    liquid: ['#ffffff', '#a1a1aa', '#52525b'] as string[],
    floating: ['#ffffff', '#a1a1aa', '#71717a', '#3f3f46'] as string[],
    blinds: ['#fafafa', '#71717a'] as string[],
    wavesLine: 'rgba(255, 255, 255, 0.45)',
    wavesBg: 'transparent',
};

function Shell({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                'pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background',
                className
            )}
            aria-hidden
        >
            {children}
        </div>
    );
}

export function DesktopBackground({ id }: { id: BackgroundId }) {
    switch (id) {
        case 'liquid':
            return (
                <Shell className="opacity-90">
                    <LiquidEther
                        className="h-full w-full"
                        colors={BG.liquid}
                        mouseForce={18}
                        cursorSize={90}
                        isViscous
                        viscous={28}
                        iterationsViscous={24}
                        iterationsPoisson={24}
                        resolution={0.45}
                        isBounce={false}
                        autoDemo
                        autoSpeed={0.45}
                        autoIntensity={2}
                        takeoverDuration={0.25}
                        autoResumeDelay={3000}
                        autoRampDuration={0.6}
                    />
                </Shell>
            );
        case 'floating':
            return (
                <Shell className="opacity-85">
                    <FloatingLines
                        linesGradient={BG.floating}
                        enabledWaves={['top', 'middle', 'bottom']}
                        lineCount={7}
                        lineDistance={91}
                        bendRadius={8}
                        bendStrength={-2}
                        interactive
                        parallax
                        animationSpeed={0.85}
                        mixBlendMode="normal"
                    />
                </Shell>
            );
        case 'blinds':
            return (
                <Shell className="opacity-80">
                    <GradientBlinds
                        className="h-full w-full"
                        gradientColors={BG.blinds}
                        angle={18}
                        noise={0.35}
                        blindCount={14}
                        blindMinWidth={60}
                        spotlightRadius={0.45}
                        spotlightSoftness={1}
                        spotlightOpacity={0.85}
                        mouseDampening={0.15}
                        distortAmount={0}
                        shineDirection="left"
                        mixBlendMode="normal"
                    />
                </Shell>
            );
        case 'waves':
            return (
                <Shell className="opacity-90">
                    <Waves
                        className="!relative h-full w-full"
                        lineColor={BG.wavesLine}
                        backgroundColor={BG.wavesBg}
                        waveSpeedX={0.0125}
                        waveSpeedY={0.01}
                        waveAmpX={36}
                        waveAmpY={18}
                        friction={0.9}
                        tension={0.01}
                        maxCursorMove={120}
                        xGap={14}
                        yGap={36}
                    />
                </Shell>
            );
        case 'dither':
        default:
            return (
                <DitherBackground
                    imageUrl="/dither-image.png"
                    colorNum={4}
                    pixelSize={3}
                    ditherBias={0.2}
                    enableMouseInteraction
                    mouseRadius={0.22}
                    distortStrength={0.35}
                />
            );
    }
}
