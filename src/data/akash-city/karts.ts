export type KartId = 'oobi' | 'oodi' | 'ooli' | 'oopi' | 'oozi';

export type KartDef = {
    id: KartId;
    label: string;
    model: string;
    preview: string;
};

const GLB = '/cars/Models/GLB%20format';

export const CITY_KARTS: KartDef[] = [
    {
        id: 'oobi',
        label: 'Oobi',
        model: `${GLB}/kart-oobi.glb`,
        preview: '/cars/Previews/kart-oobi.png',
    },
    {
        id: 'oodi',
        label: 'Oodi',
        model: `${GLB}/kart-oodi.glb`,
        preview: '/cars/Previews/kart-oodi.png',
    },
    {
        id: 'ooli',
        label: 'Ooli',
        model: `${GLB}/kart-ooli.glb`,
        preview: '/cars/Previews/kart-ooli.png',
    },
    {
        id: 'oopi',
        label: 'Oopi',
        model: `${GLB}/kart-oopi.glb`,
        preview: '/cars/Previews/kart-oopi.png',
    },
    {
        id: 'oozi',
        label: 'Oozi',
        model: `${GLB}/kart-oozi.glb`,
        preview: '/cars/Previews/kart-oozi.png',
    },
];

export const CITY_KART_BY_ID: Record<KartId, KartDef> = Object.fromEntries(
    CITY_KARTS.map((k) => [k.id, k]),
) as Record<KartId, KartDef>;

export const DEFAULT_KART_ID: KartId = 'oobi';

/** Uniform scale so Kenney karts sit nicely on city roads */
export const KART_MODEL_SCALE = 0.72;
