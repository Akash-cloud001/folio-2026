'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WindowProps {
    id: string;
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    onMinimize?: () => void;
    zIndex: number;
    onFocus: () => void;
    defaultPosition?: { x: number; y: number };
    className?: string;
}

export function Window({
    id,
    title,
    children,
    isOpen,
    onClose,
    onMinimize,
    zIndex,
    onFocus,
    defaultPosition = { x: 0, y: 0 },
    className,
}: WindowProps) {
    const constraintsRef = useRef(null);
    const dragControls = useDragControls();

    // Basic mobile check - could be more robust
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    drag={!isMobile}
                    dragControls={dragControls}
                    dragMomentum={false}
                    initial={{
                        opacity: 0,
                        scale: 0.95,
                        x: defaultPosition.x,
                        y: defaultPosition.y
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        // We let drag handle x/y after mount, so we don't force animate them here 
                        // to allow free movement. 
                    }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                    onPointerDown={onFocus}
                    style={{ zIndex, position: 'absolute' }}
                    className={cn(
                        "flex flex-col rounded-lg border border-accent bg-black/95 shadow-2xl backdrop-blur-sm overflow-hidden",
                        isMobile ? "w-[90vw] h-[80vh] left-[5vw] top-[10vh] !transform-none" : "min-w-[400px] max-w-[99vw] max-h-[80vh]",
                        className
                    )}
                >
                    {/* Title Bar */}
                    <div
                        onPointerDown={(e) => {
                            dragControls.start(e);
                            onFocus();
                        }}
                        className="flex items-center w-full justify-between px-3 py-2 border-b border-accent bg-accent/10 cursor-grab active:cursor-grabbing select-none"
                    >
                        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider w-full">{title}</span>
                        <div className="w-4 h-4 rounded-full bg-white/10 border border-white/50 flex items-center justify-center group mr-1" onClick={onClose}>
                            <X size={8} className="text-white" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-auto p-2 custom-scrollbar relative">
                        {/* Scanline effect overlay (optional, low opacity) */}
                        <div className="pointer-events-none absolute inset-0 bg-repeat bg-[length:100%_4px] opacity-[0.03] z-10"
                            style={{ backgroundImage: 'linear-gradient(to bottom, transparent 50%, #000 50%)' }} />
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
