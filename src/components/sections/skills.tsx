'use client';

import React, { forwardRef, useRef } from 'react';
import Image from 'next/image';
import { Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedBeam } from '@/components/ui/animated-beam';

// Circle component for skill icons and brain
const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                'z-10 flex items-center justify-center rounded-full border-2 border-white/10 bg-white p-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]',
                className
            )}
        >
            {children}
        </div>
    );
});
Circle.displayName = 'Circle';

export function Skills() {
    const containerRef = useRef<HTMLDivElement>(null);
    const div1Ref = useRef<HTMLDivElement>(null);
    const div2Ref = useRef<HTMLDivElement>(null);
    const div3Ref = useRef<HTMLDivElement>(null);
    const div4Ref = useRef<HTMLDivElement>(null); // Brain
    const div5Ref = useRef<HTMLDivElement>(null);
    const div6Ref = useRef<HTMLDivElement>(null);
    const div7Ref = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={containerRef}
            className="relative flex h-full w-full items-center justify-center overflow-hidden px-10 pb-11 pt-2"
        >
            <div className="flex size-full max-h-[200px] max-w-lg flex-col items-stretch justify-between gap-10">
                {/* Row 1 - Top */}
                <div className="flex flex-row items-center justify-between">
                    <Circle ref={div1Ref} className="size-12">
                        <Image src="/skills/react.png" alt="React" width={32} height={32} className="object-contain" />
                    </Circle>
                    <Circle ref={div5Ref} className="size-12">
                        <Image src="/skills/tailwind.png" alt="Tailwind" width={32} height={32} className="object-contain" />
                    </Circle>
                </div>

                {/* Row 2 - Middle (with Brain) */}
                <div className="flex flex-row items-center justify-between">
                    <Circle ref={div2Ref} className="size-12">
                        <Image src="/skills/nextjs.png" alt="Next.js" width={32} height={32} className="object-contain" />
                    </Circle>
                    <Circle ref={div4Ref} className="size-16 bg-black border-white/20">
                        <Brain className="w-full h-full text-white" />
                    </Circle>
                    <Circle ref={div6Ref} className="size-12">
                        <Image src="/skills/threejs.png" alt="Three.js" width={32} height={32} className="object-contain" />
                    </Circle>
                </div>

                {/* Row 3 - Bottom */}
                <div className="flex flex-row items-center justify-between">
                    <Circle ref={div3Ref} className="size-12">
                        <Image src="/skills/typescript.png" alt="TypeScript" width={32} height={32} className="object-contain" />
                    </Circle>
                    <Circle ref={div7Ref} className="size-12">
                        <Image src="/skills/figma.png" alt="Figma" width={32} height={32} className="object-contain" />
                    </Circle>
                </div>
            </div>

            {/* Animated Beams - Left Side */}
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div1Ref}
                toRef={div4Ref}
                curvature={-75}
                endYOffset={-10}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div2Ref}
                toRef={div4Ref}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div3Ref}
                toRef={div4Ref}
                curvature={75}
                endYOffset={10}
            />

            {/* Animated Beams - Right Side */}
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div5Ref}
                toRef={div4Ref}
                curvature={-75}
                endYOffset={-10}
                reverse
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div6Ref}
                toRef={div4Ref}
                reverse
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div3Ref}
                toRef={div4Ref}
                curvature={75}
                endYOffset={10}
                reverse
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div7Ref}
                toRef={div4Ref}
                curvature={75}
                endYOffset={10}
                reverse
            />
        </div>
    );
}

