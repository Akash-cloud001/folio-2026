export const BACKGROUND_IDS = [
    'dither',
    'liquid',
    'floating',
    'blinds',
    'waves',
] as const;

export type BackgroundId = (typeof BACKGROUND_IDS)[number];

export const DEFAULT_BACKGROUND: BackgroundId = 'dither';

export const BACKGROUND_STORAGE_KEY = 'folio-2026-desktop-bg';

export const BACKGROUND_OPTIONS: {
    id: BackgroundId;
    label: string;
    hint: string;
}[] = [
    { id: 'dither', label: 'Dither', hint: 'Default WebGL grain' },
    { id: 'liquid', label: 'Liquid Ether', hint: 'Fluid simulation' },
    { id: 'floating', label: 'Floating Lines', hint: 'Wave line field' },
    { id: 'blinds', label: 'Gradient Blinds', hint: 'Spotlight blinds' },
    { id: 'waves', label: 'Waves', hint: 'Interactive mesh' },
];

export function isBackgroundId(value: string): value is BackgroundId {
    return (BACKGROUND_IDS as readonly string[]).includes(value);
}
