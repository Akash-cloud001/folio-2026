'use client';

import { create } from 'zustand';
import type { CityLocationId } from '@/data/akash-city/locations';
import type { Vec3 } from '@/data/akash-city/layout';
import type { KartId } from '@/data/akash-city/karts';

/** Mutable pose for LOD / chase systems — avoids per-frame React subscriptions */
export const playerWorldPos = { x: 8, y: 0.6, z: -8 };

type CityStore = {
    activeDistrict: CityLocationId | null;
    panelOpen: boolean;
    navigateTarget: Vec3 | null;
    mobileStick: { x: number; y: number };
    cameraMode: 'fpp' | 'tpp';
    controlsEnabled: boolean;
    selectedKartId: KartId | null;
    experienceOpen: boolean;
    experienceNear: boolean;
    aboutOpen: boolean;
    aboutNear: boolean;
    setActiveDistrict: (id: CityLocationId | null) => void;
    openPanel: (id: CityLocationId) => void;
    closePanel: () => void;
    requestNavigate: (target: Vec3) => void;
    clearNavigate: () => void;
    setMobileStick: (x: number, y: number) => void;
    toggleCameraMode: () => void;
    setControlsEnabled: (enabled: boolean) => void;
    setSelectedKartId: (id: KartId) => void;
    openExperience: () => void;
    closeExperience: () => void;
    setExperienceNear: (near: boolean) => void;
    openAbout: () => void;
    closeAbout: () => void;
    setAboutNear: (near: boolean) => void;
};

export const useCityStore = create<CityStore>((set) => ({
    activeDistrict: null,
    panelOpen: false,
    navigateTarget: null,
    mobileStick: { x: 0, y: 0 },
    cameraMode: 'tpp',
    controlsEnabled: false,
    selectedKartId: null,
    experienceOpen: false,
    experienceNear: false,
    aboutOpen: false,
    aboutNear: false,
    setActiveDistrict: (id) => set({ activeDistrict: id }),
    openPanel: (id) => set({ activeDistrict: id, panelOpen: true }),
    closePanel: () => set({ panelOpen: false }),
    requestNavigate: (target) => set({ navigateTarget: target }),
    clearNavigate: () => set({ navigateTarget: null }),
    setMobileStick: (x, y) => set({ mobileStick: { x, y } }),
    toggleCameraMode: () =>
        set((state) => ({
            cameraMode: state.cameraMode === 'fpp' ? 'tpp' : 'fpp',
        })),
    setControlsEnabled: (enabled) => set({ controlsEnabled: enabled }),
    setSelectedKartId: (id) => set({ selectedKartId: id }),
    openExperience: () =>
        set({ experienceOpen: true, aboutOpen: false, panelOpen: false }),
    closeExperience: () =>
        set({ experienceOpen: false, controlsEnabled: true }),
    setExperienceNear: (near) => set({ experienceNear: near }),
    openAbout: () =>
        set({ aboutOpen: true, experienceOpen: false, panelOpen: false }),
    closeAbout: () => set({ aboutOpen: false, controlsEnabled: true }),
    setAboutNear: (near) => set({ aboutNear: near }),
}));
