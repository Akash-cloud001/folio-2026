/**
 * Leva layout tools are for local tuning only.
 * NODE_ENV is inlined at build time — production builds never register controls.
 */
export const LEVA_ENABLED = process.env.NODE_ENV !== 'production';
