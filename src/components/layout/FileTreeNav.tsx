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
                'absolute z-[1] w-fit min-w-[200px] cursor-grab rounded-lg border border-white/20 bg-black/80 p-4 shadow-2xl backdrop-blur-md active:cursor-grabbing touch-manipulation',
                className
            )}
        >
            <Tree
                className="h-full"
                initialExpandedItems={['src']}
            >
                <Folder value="src" element="src">
                    <File value="about-me" onClick={() => onSelect('about')}>
                        <p>About-me.txt</p>
                    </File>
                    <File value="experience" onClick={() => onSelect('experience')}>
                        <p>Experience.log</p>
                    </File>
                    <File value="my-work" onClick={() => onSelect('projects')}>
                        <p>Projects.db</p>
                    </File>
                    <File value="skills" onClick={() => onSelect('skills')}>
                        <p>Skills.txt</p>
                    </File>
                </Folder>
            </Tree>
        </motion.div>
    );
}
