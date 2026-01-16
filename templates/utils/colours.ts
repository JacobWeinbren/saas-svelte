/**
 * Colors available in the Saas UI Tailwind preset.
 * All standard Tailwind colors with OKLCH color space.
 * These map to --colors-{name}-{shade} CSS variables.
 */
export const availableColours = [
    // Grays
    "gray",
    "zinc",
    "neutral",
    "stone",
    "slate",
    // Colors
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
] as const;

export type ColourName = (typeof availableColours)[number] | (string & {});

// Pre-computed cache for colour style strings
const colourStyleCache = new Map<string, string>();

/**
 * Generates CSS custom properties for dynamic color theming.
 * Uses a cache to avoid string concatenation on repeated calls.
 *
 * Maps --c-* to the preset's --colors-{name}-* tokens which have
 * light-dark() values for automatic theme switching.
 *
 * Usage in components:
 * - Set style={getColourStyle(colour)} on the element
 * - Use semantic classes like bg-(--c-muted), bg-(--c-solid), [color:var(--c-fg)]
 *
 * Available semantic tokens:
 * - --c-contrast: text color for solid backgrounds
 * - --c-fg: foreground/text color
 * - --c-muted: muted background
 * - --c-subtle: subtle background
 * - --c-emphasized: emphasized background
 * - --c-solid: solid background color
 * - --c-focus-ring: focus ring color
 */
export function getColourStyle(colourName: string): string {
    if (!colourName) return "";

    // Check cache first
    const cached = colourStyleCache.get(colourName);
    if (cached) return cached;

    // Build the style string
    const style = `--c-contrast: var(--colors-${colourName}-contrast); --c-fg: var(--colors-${colourName}-fg); --c-muted: var(--colors-${colourName}-muted); --c-subtle: var(--colors-${colourName}-subtle); --c-emphasized: var(--colors-${colourName}-emphasized); --c-solid: var(--colors-${colourName}-solid); --c-focus-ring: var(--colors-${colourName}-focus-ring)`;

    // Cache for future use
    colourStyleCache.set(colourName, style);

    return style;
}

// Pre-populate cache for common colours
availableColours.forEach(getColourStyle);
