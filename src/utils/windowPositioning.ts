/**
 * Window Positioning Utilities
 * 
 * Provides viewport-aware positioning for draggable windows.
 * Ensures windows stay within viewport bounds and provides responsive mobile layouts.
 */

interface RandomPositionParams {
    windowWidth?: number;
    windowHeight?: number;
    padding?: number;
}

interface Position {
    x: number;
    y: number;
}

/**
 * Detects if the current viewport is mobile-sized
 * Mobile breakpoint: < 768px width
 */
export function isMobile(): boolean {
    if (typeof window === 'undefined') {
        return false;
    }
    return window.innerWidth < 768;
}

/**
 * Generates a random position within safe viewport bounds
 * 
 * @param windowWidth - Width of the window to position (default: 420)
 * @param windowHeight - Height of the window to position (default: 300)
 * @param padding - Minimum distance from viewport edges (default: 16)
 * @returns Position object with x and y coordinates in pixels
 * 
 * @example
 * const pos = getRandomPosition({ windowWidth: 480, windowHeight: 340 });
 * // Returns something like { x: 234, y: 156 }
 */
export function getRandomPosition({
    windowWidth = 420,
    windowHeight = 300,
    padding = 16,
}: RandomPositionParams = {}): Position {
    // SSR safety - return default position
    if (typeof window === 'undefined') {
        return { x: padding, y: padding };
    }

    // Calculate maximum safe positions
    const maxX = Math.max(padding, window.innerWidth - windowWidth - padding);
    const maxY = Math.max(padding, window.innerHeight - windowHeight - padding);

    // Generate random position within bounds
    return {
        x: Math.max(padding, Math.floor(Math.random() * maxX)),
        y: Math.max(padding, Math.floor(Math.random() * maxY)),
    };
}

/**
 * Generates a random position while attempting to avoid overlapping with existing windows
 * 
 * @param params - Window dimensions and padding
 * @param existingPositions - Array of existing window positions to avoid
 * @param minDistance - Minimum distance between windows (default: 80)
 * @param maxAttempts - Maximum positioning attempts before fallback (default: 10)
 * @returns Position object that minimizes overlap
 * 
 * @example
 * const positions = [{ x: 100, y: 100 }, { x: 200, y: 150 }];
 * const pos = getSmartRandomPosition({ windowWidth: 480 }, positions);
 */
export function getSmartRandomPosition(
    params: RandomPositionParams = {},
    existingPositions: Position[] = [],
    minDistance: number = 80,
    maxAttempts: number = 10
): Position {
    let pos: Position;
    let attempts = 0;

    // Try to find a non-overlapping position
    do {
        pos = getRandomPosition(params);
        attempts++;

        // Check if position overlaps with existing windows
        const hasOverlap = existingPositions.some(
            (existing) =>
                Math.abs(existing.x - pos.x) < minDistance &&
                Math.abs(existing.y - pos.y) < minDistance
        );

        // If no overlap or max attempts reached, use this position
        if (!hasOverlap || attempts >= maxAttempts) {
            break;
        }
    } while (attempts < maxAttempts);

    return pos;
}

/**
 * Converts percentage-based coordinates to pixel coordinates
 * Useful for percentage-based layouts (advanced use case)
 * 
 * @param xPercent - X position as percentage (0-100)
 * @param yPercent - Y position as percentage (0-100)
 * @returns Position in pixels
 * 
 * @example
 * const pos = percentToPx(50, 25);
 * // Returns center-left position: { x: viewportWidth/2, y: viewportHeight/4 }
 */
export function percentToPx(xPercent: number, yPercent: number): Position {
    if (typeof window === 'undefined') {
        return { x: 0, y: 0 };
    }

    return {
        x: Math.floor((xPercent / 100) * window.innerWidth),
        y: Math.floor((yPercent / 100) * window.innerHeight),
    };
}
