'use client';

import React, { useState } from 'react';
import { Desktop } from '@/components/layout/Desktop';
import { Window } from '@/components/ui/Window';
import { FileTreeNav } from '@/components/layout/FileTreeNav';
import { Hero } from '@/components/sections/Hero';
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

export default function Home() {
  const [windows, setWindows] = useState<WindowState[]>([
    // {
    //   id: 'hero',
    //   title: 'WELCOME.exe',
    //   isOpen: true,
    //   zIndex: 1,
    //   component: <Hero />,
    //   defaultPosition: { x: 50, y: 50 }
    // },
    {
      id: 'about',
      title: 'ABOUT_ME.txt',
      isOpen: false,
      zIndex: 1,
      component: <About />,
      defaultPosition: { x: 250, y: 10 }
    },
    {
      id: 'experience',
      title: 'EXPERIENCE.log',
      isOpen: false,
      zIndex: 1,
      component: <Experience />,
      defaultPosition: { x: 250, y: 50 }
    },
    {
      id: 'projects',
      title: 'PROJECTS_DB',
      isOpen: true,
      zIndex: 1,
      component: <Projects />,
      defaultPosition: { x: 8, y: typeof window !== 'undefined' ? window.innerHeight - 150 : 600 }
    },
    {
      id: 'contact',
      title: 'CONTACT.msg',
      isOpen: false,
      zIndex: 1,
      component: <Contact />,
      defaultPosition: { x: 250, y: 250 }
    },
    {
      id: 'skills',
      title: 'SKILLS.txt',
      isOpen: false,
      zIndex: 1,
      component: <Skills />,
      defaultPosition: { x: 250, y: 250 }
    },
  ]);

  const bringToFront = (id: string) => {
    setWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex));
      return prev.map(w => w.id === id ? { ...w, zIndex: maxZ + 1 } : w);
    });
  };

  const openWindow = (id: string) => {
    setWindows(prev => {
      const window = prev.find(w => w.id === id);
      const maxZ = Math.max(...prev.map(w => w.zIndex));

      // If window exists, bring to front and ensure open
      if (window) {
        return prev.map(w => w.id === id ? { ...w, isOpen: true, zIndex: maxZ + 1 } : w);
      }
      return prev;
    });
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
  };

  return (
    <Desktop>
      <FileTreeNav onSelect={openWindow} />
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
          defaultPosition={win.defaultPosition}
        >
          {win.component}
        </Window>
      ))}
    </Desktop>
  );
}
