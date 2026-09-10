/**
 * Shared world extents for Akash City.
 * Fence sits on the outer grass plane edge; city core stays inset.
 */

export const CITY_CENTER = { x: 8, z: 0 } as const;

/** Inner city footprint (roads / lots) — for vegetation density falloff */
export const CITY_CORE = {
    minX: -9.2,
    maxX: 25.2,
    minZ: -17.2,
    /** Ends at the back road — forest starts immediately north of z=0 */
    maxZ: 0.2,
} as const;

/**
 * Outer fence = edge of the grass plane.
 * Player can roam the forest ring between CITY_CORE and this fence.
 * Sized tighter around the remaining city footprint.
 */
export const FENCE_EDGE = {
    minX: -15,
    maxX: 31,
    minZ: -22,
    /** North edge pulled in — back forest is half the previous depth */
    maxZ: 9,
} as const;

export const LOD_NEAR = 20;
export const LOD_FAR = 28;

/** Map a GLB model URL to its Kenney preview PNG when possible */
export function modelToPreviewUrl(model: string): string | null {
    const match = model.match(
        /^(\/[^/?#]+)\/Models\/GLB(?:%20| )format\/([^/]+)\.glb$/i,
    );
    if (!match) return null;
    const pack = match[1];
    const name = match[2];
    return `${pack}/Previews/${name}.png`;
}

export function dist2FromPlayer(
    x: number,
    z: number,
    px: number,
    pz: number,
): number {
    const dx = x - px;
    const dz = z - pz;
    return dx * dx + dz * dz;
}
