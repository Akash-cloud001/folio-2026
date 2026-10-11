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
    background: 'background',
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

function BrandLogo({ src }: { src: string }) {
    return (
        <img
            src={src}
            alt=""
            aria-hidden
            className="size-4 shrink-0 rounded-[3px] object-contain"
        />
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
                    <File
                        value="background"
                        fileIcon={
                            <WindowEntryIcon
                                fileValue="background"
                                openWindowIds={openWindowIds}
                            />
                        }
                        onClick={() => onSelect('background')}
                    >
                        <p>Background.sys</p>
                    </File>
                </Folder>
                <Folder value="case-studies" element="case-studies">
                    <File
                        value="case-study-nexetro"
                        fileIcon={<BrandLogo src="/logos/nexetro.svg" />}
                        onClick={() => router.push('/case-studies/nexetro')}
                    >
                        <p>nexetro.md</p>
                        <span className="rounded-full border border-white/20 bg-white/10 px-1.5 py-px font-geist-mono text-[9px] uppercase tracking-wider text-zinc-300">
                            Coming soon
                        </span>
                    </File>
                    <File
                        value="case-study-tradzu"
                        fileIcon={<BrandLogo src="/logos/tradzu.svg" />}
                        onClick={() => router.push('/case-studies/tradzu')}
                    >
                        <p>tradzu.md</p>
                    </File>
                    <File
                        value="case-study-my-forex-firms"
                        fileIcon={<BrandLogo src="/logos/myforexfirms.png" />}
                        onClick={() => router.push('/case-studies/my-forex-firms')}
                    >
                        <p>my-forex-firms.md</p>
                    </File>
                    <File
                        value="case-study-ktech-store"
                        fileIcon={<BrandLogo src="/logos/ktech.png" />}
                        onClick={() => router.push('/case-studies/ktech-store')}
                    >
                        <p>ktech-store.md</p>
                    </File>
                    <File
                        value="case-study-folio-2026"
                        fileIcon={<BrandLogo src="/logos/folio2026.svg" />}
                        onClick={() => router.push('/case-studies/folio-2026')}
                    >
                        <p>folio-2026.md</p>
                    </File>
                    <File
                        value="case-study-nestingo"
                        fileIcon={<BrandLogo src="/logos/nestingo.svg" />}
                        onClick={() => router.push('/case-studies/nestingo')}
                    >
                        <p>nestingo.md</p>
                    </File>
                </Folder>
                <File
                    value="resume"
                    fileIcon={<FileIcon className="size-4 shrink-0 text-white/80" aria-hidden />}
                    onClick={() =>
                        window.open('/Akash_Parmar_FDE_Resume-1.pdf', '_blank', 'noopener,noreferrer')
                    }
                >
                    <p>Resume.pdf</p>
                </File>
            </Tree>
        </motion.div>
    );
}
