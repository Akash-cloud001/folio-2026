'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-react';
import { Tree, Folder, File } from '@/components/ui/file-tree';
import { cn } from '@/lib/utils';
import { useDesktopDragBounds } from '@/components/layout/Desktop';

/** File tree value → desktop window id */
const FILE_TO_WINDOW: Record<string, string> = {
    'about-me': 'about',
    experience: 'experience',
    'my-work': 'projects',
    skills: 'skills',
};

/** Folder open/close icons for desktop window entries only. */
function WindowEntryIcon({
    fileValue,
    openWindowIds,
}: {
    fileValue: string;
    openWindowIds: string[];
}) {
    const windowId = FILE_TO_WINDOW[fileValue];
    const isOpen = windowId !== undefined && openWindowIds.includes(windowId);

    return isOpen ? (
        <FolderOpenIcon className="size-4 shrink-0 text-white/90" aria-hidden />
    ) : (
        <FolderIcon className="size-4 shrink-0 text-white/70" aria-hidden />
    );
}

interface FileTreeNavProps {
    onSelect: (id: string) => void;
    openWindowIds?: string[];
    className?: string;
}

export function FileTreeNav({ onSelect, openWindowIds = [], className }: FileTreeNavProps) {
    const router = useRouter();
    const dragBoundsRef = useDesktopDragBounds();

    return (
        <motion.div
            drag
            dragConstraints={dragBoundsRef ?? false}
            dragElastic={0}
            dragMomentum={false}
            initial={{ x: 20, y: 20 }}
            className={cn(
                'pointer-events-auto absolute z-[1] w-fit min-w-[200px] cursor-grab rounded-lg border border-white/20 bg-black/80 p-4 shadow-2xl backdrop-blur-md active:cursor-grabbing touch-manipulation',
                className
            )}
        >
            <Tree
                className="h-full"
                initialExpandedItems={['src', 'case-studies']}
            >
                <Folder value="src" element="src">
                    <File
                        value="about-me"
                        fileIcon={
                            <WindowEntryIcon fileValue="about-me" openWindowIds={openWindowIds} />
                        }
                        onClick={() => onSelect('about')}
                    >
                        <p>About-me.txt</p>
                    </File>
                    <File
                        value="experience"
                        fileIcon={
                            <WindowEntryIcon fileValue="experience" openWindowIds={openWindowIds} />
                        }
                        onClick={() => onSelect('experience')}
                    >
                        <p>Experience.log</p>
                    </File>
                    <File
                        value="my-work"
                        fileIcon={
                            <WindowEntryIcon fileValue="my-work" openWindowIds={openWindowIds} />
                        }
                        onClick={() => onSelect('projects')}
                    >
                        <p>Projects.db</p>
                    </File>
                    <File
                        value="skills"
                        fileIcon={
                            <WindowEntryIcon fileValue="skills" openWindowIds={openWindowIds} />
                        }
                        onClick={() => onSelect('skills')}
                    >
                        <p>Skills.txt</p>
                    </File>
                </Folder>
                <Folder value="case-studies" element="case-studies">
                    
                    <File
                        value="case-study-tradzu"
                        fileIcon={<FileIcon className="size-4 shrink-0 text-white/80" aria-hidden />}
                        onClick={() => router.push('/case-studies/tradzu')}
                    >
                        <p>tradzu.md</p>
                    </File>
                    <File
                        value="case-study-my-forex-firms"
                        fileIcon={<FileIcon className="size-4 shrink-0 text-white/80" aria-hidden />}
                        onClick={() => router.push('/case-studies/my-forex-firms')}
                    >
                        <p>my-forex-firms.md</p>
                    </File>
                    <File
                        value="case-study-nestingo"
                        fileIcon={<FileIcon className="size-4 shrink-0 text-white/80" aria-hidden />}
                        onClick={() => router.push('/case-studies/nestingo')}
                    >
                        <p>nestingo.md</p>
                    </File>
                    <File
                        value="case-study-folio-2026"
                        fileIcon={<FileIcon className="size-4 shrink-0 text-white/80" aria-hidden />}
                        onClick={() => router.push('/case-studies/folio-2026')}
                    >
                        <p>folio-2026.md</p>
                    </File>
                </Folder>
            </Tree>
        </motion.div>
    );
}
