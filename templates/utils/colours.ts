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

/**
 * Generates CSS custom properties for dynamic color theming.
 * Maps --c-{shade} to Tailwind/Saas UI color CSS variables.
 *
 * Usage in components:
 * - Set style={generateColourVars(colour)} on the element
 * - Use classes like bg-(--c-500), text-(--c-700), border-(--c-200)
 *
 * Also provides semantic tokens:
 * - --c-contrast: text color for solid backgrounds (from --colors-{name}-contrast)
 * - --c-solid: solid background color (from --colors-{name}-solid)
 * - --c-focus-ring: focus ring color (from --color-{name}-focus-ring)
 */
export function generateColourVars(colourName: string): string {
    if (!colourName) return "";

    const shades = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"] as const;

    const shadeVars = shades
        .map((shade) => `--c-${shade}: var(--color-${colourName}-${shade})`)
        .join("; ");

    // Use the Saas UI preset's semantic tokens (--colors- has light-dark() values)
    const extras = [
        `--c-contrast: var(--colors-${colourName}-contrast)`,
        `--c-solid: var(--colors-${colourName}-solid)`,
        `--c-focus-ring: var(--colors-${colourName}-focus-ring)`,
    ].join("; ");

    return `${shadeVars}; ${extras}`;
}

/**
 * Semantic color tokens available from the Saas UI preset.
 * These can be used directly in Tailwind classes without generateColourVars().
 *
 * Examples:
 * - bg-(--colors-bg), bg-(--colors-bg-panel), bg-(--colors-bg-overlay)
 * - text-(--colors-fg), text-(--colors-fg-muted), text-(--colors-fg-subtle)
 * - border-(--colors-border), border-(--colors-border-muted)
 * - bg-(--colors-accent-solid), text-(--colors-accent-fg)
 * - bg-(--colors-gray-solid), text-(--colors-gray-fg), etc.
 */
export const semanticTokens = {
    bg: {
        default: "--colors-bg",
        muted: "--colors-bg-muted",
        subtle: "--colors-bg-subtle",
        emphasized: "--colors-bg-emphasized",
        inverted: "--colors-bg-inverted",
        panel: "--colors-bg-panel",
        overlay: "--colors-bg-overlay",
    },
    fg: {
        default: "--colors-fg",
        muted: "--colors-fg-muted",
        subtle: "--colors-fg-subtle",
        emphasized: "--colors-fg-emphasized",
        inverted: "--colors-fg-inverted",
    },
    border: {
        default: "--colors-border",
        muted: "--colors-border-muted",
        subtle: "--colors-border-subtle",
        emphasized: "--colors-border-emphasized",
    },
} as const;