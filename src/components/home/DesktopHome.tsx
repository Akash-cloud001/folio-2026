'use client';

import React, { useState, useSyncExternalStore } from 'react';
import { Desktop } from '@/components/layout/Desktop';
import { Window } from '@/components/ui/Window';
import { FileTreeNav } from '@/components/layout/FileTreeNav';
import { Folio2025Card } from '@/components/layout/Folio2025Card';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Contact } from '@/components/sections/Contact';
import { Skills } from '@/components/sections/skills';

interface WindowState {
    id: string;
    isOpen: boolean;
    zIndex: number;
    title: string;
    component: React.ReactNode;
    defaultPosition: { x: number; y: number };
}

/** Windows stack above file tree (`FileTreeNav` uses z-[1]). */
const MIN_WINDOW_Z = 10;
const MAX_WINDOW_Z = 9990;

function nextWindowZIndex(prev: WindowState[]): number {
    const maxZ = Math.max(MIN_WINDOW_Z, ...prev.map((w) => w.zIndex));
    return Math.min(maxZ + 1, MAX_WINDOW_Z);
}

/** Match Tailwind `md` (768px). */
function useIsMobile() {
    return useSyncExternalStore(
        (onStoreChange) => {
            if (typeof window === 'undefined') return () => {};
            const mq = window.matchMedia('(max-width: 767px)');
            mq.addEventListener('change', onStoreChange);
            return () => mq.removeEventListener('change', onStoreChange);
        },
        () =>
            typeof window !== 'undefined' &&
            window.matchMedia('(max-width: 767px)').matches,
        () => false
    );
}

const MOBILE_WINDOW_X = 8;

export function DesktopHome() {
    const isMobile = useIsMobile();
    const [windows, setWindows] = useState<WindowState[]>([
        {
            id: 'about',
            title: 'ABOUT_ME.txt',
            isOpen: false,
            zIndex: MIN_WINDOW_Z,
            component: <About />,
            defaultPosition: { x: 250, y: 10 },
        },
        {
            id: 'experience',
            title: 'EXPERIENCE.log',
            isOpen: false,
            zIndex: MIN_WINDOW_Z,
            component: <Experience />,
            defaultPosition: { x: 250, y: 50 },
        },
        {
            id: 'projects',
            title: 'PROJECTS.DB',
            isOpen: true,
            zIndex: MIN_WINDOW_Z + 1,
            component: <Projects />,
            defaultPosition: {
                x: 8,
                y: typeof window !== 'undefined' ? window.innerHeight - 150 : 600,
            },
        },
        {
            id: 'folio-2025',
            title: 'FOLIO-2025.url',
            isOpen: true,
            zIndex: MIN_WINDOW_Z + 2,
            component: <Folio2025Card />,
            defaultPosition: {
                x: typeof window !== 'undefined' ? Math.max(16, window.innerWidth - 248) : 16,
                y: typeof window !== 'undefined' ? Math.max(16, window.innerHeight - 390) : 400,
            },
        },
        {
            id: 'contact',
            title: 'CONTACT.msg',
            isOpen: false,
            zIndex: MIN_WINDOW_Z,
            component: <Contact />,
            defaultPosition: { x: 250, y: 250 },
        },
        {
            id: 'skills',
            title: 'SKILLS.txt',
            isOpen: false,
            zIndex: MIN_WINDOW_Z,
            component: <Skills />,
            defaultPosition: { x: 250, y: 250 },
        },
    ]);

    const bringToFront = (id: string) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, zIndex: nextWindowZIndex(prev) } : w))
        );
    };

    const openWindow = (id: string) => {
        setWindows((prev) => {
            const win = prev.find((w) => w.id === id);
            if (win) {
                const z = nextWindowZIndex(prev);
                return prev.map((w) => (w.id === id ? { ...w, isOpen: true, zIndex: z } : w));
            }
            return prev;
        });
    };

    const closeWindow = (id: string) => {
        setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w)));
    };

    return (
        <Desktop className="min-h-0 h-dvh max-h-dvh overflow-hidden">
            <FileTreeNav
                onSelect={openWindow}
                openWindowIds={windows.filter((w) => w.isOpen).map((w) => w.id)}
            />
            {windows.map((win) => (
                <Window
                    key={win.id}
                    id={win.id}
                    title={win.title}
                    isOpen={win.isOpen}
                    zIndex={win.zIndex}
                    onClose={() => closeWindow(win.id)}
                    onMinimize={() => closeWindow(win.id)}
                    onFocus={() => bringToFront(win.id)}
                    defaultPosition={{
                        x: isMobile ? MOBILE_WINDOW_X : win.defaultPosition.x,
                        y: win.defaultPosition.y,
                    }}
                    compact={win.id === 'folio-2025'}
                    className={win.id === 'folio-2025' ? 'hidden md:flex' : undefined}
                >
                    {win.component}
                </Window>
            ))}
        </Desktop>
    );
}
