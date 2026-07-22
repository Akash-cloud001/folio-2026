'use client';

import { useEffect, useState } from 'react';
import {
    BACKGROUND_STORAGE_KEY,
    DEFAULT_BACKGROUND,
    isBackgroundId,
    type BackgroundId,
} from '@/lib/backgrounds';

/** Hydration-safe background preference (localStorage). */
export function useDesktopBackground(): [BackgroundId, (id: BackgroundId) => void] {
    const [background, setBackground] = useState<BackgroundId>(DEFAULT_BACKGROUND);

    useEffect(() => {
        try {
            const stored = window.localStorage.getItem(BACKGROUND_STORAGE_KEY);
            if (stored && isBackgroundId(stored)) {
                setBackground(stored);
            }
        } catch {
            /* ignore */
        }
    }, []);

    const update = (id: BackgroundId) => {
        setBackground(id);
        try {
            window.localStorage.setItem(BACKGROUND_STORAGE_KEY, id);
        } catch {
            /* ignore */
        }
    };

    return [background, update];
}
