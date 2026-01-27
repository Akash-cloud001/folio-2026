'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Tree, Folder, File } from '@/components/ui/file-tree';
import { cn } from '@/lib/utils';

interface FileTreeNavProps {
    onSelect: (id: string) => void;
    className?: string;
}

export function FileTreeNav({ onSelect, className }: FileTreeNavProps) {
    return (
        <motion.div
            drag
            dragMomentum={false}
            initial={{ x: 20, y: 20 }}
            className={cn(
                "absolute z-3 w-fit h-fit min-w-[200px] bg-black/80 backdrop-blur-md border border-white/20 rounded-lg shadow-2xl p-4 cursor-grab active:cursor-grabbing",
                className
            )}
        >
            <Tree
                className="h-full"
                initialExpandedItems={['src']}
            >
                <Folder value="src" element="src">
                    <File value="about-me" onClick={() => onSelect('about')}>
                        <p>about-me</p>
                    </File>
                    <File value="experience" onClick={() => onSelect('experience')}>
                        <p>experience</p>
                    </File>
                    <File value="my-work" onClick={() => onSelect('projects')}>
                        <p>my-work</p>
                    </File>
                    <File value="contact-me" onClick={() => onSelect('contact')}>
                        <p>contact-me</p>
                    </File>
                </Folder>
            </Tree>
        </motion.div>
    );
}
