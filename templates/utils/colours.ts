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
 * Uses only semantic tokens from the Saas UI preset since raw shade
 * variables (--color-{name}-{shade}) are not exposed as CSS custom properties
 * in Tailwind v4's @theme block.
 *
 * Usage in components:
 * - Set style={generateColourVars(colour)} on the element
 * - Use semantic classes like bg-(--c-muted), bg-(--c-solid), text-(--c-fg)
 *
 * Available semantic tokens:
 * - --c-contrast: text color for solid backgrounds
 * - --c-fg: foreground/text color
 * - --c-muted: muted background (light: 50, dark: 950)
 * - --c-subtle: subtle background
 * - --c-emphasized: emphasized background
 * - --c-solid: solid background color (500)
 * - --c-focus-ring: focus ring color
 */
export function generateColourVars(colourName: string): string {
    if (!colourName) return "";

    // Use the Saas UI preset's semantic tokens (--colors- has light-dark() values)
    // Raw shade variables like --color-neutral-50 are defined in @theme but NOT
    // exposed as CSS custom properties - only these semantic tokens are available
    const semanticVars = [
        `--c-contrast: var(--colors-${colourName}-contrast)`,
        `--c-fg: var(--colors-${colourName}-fg)`,
        `--c-muted: var(--colors-${colourName}-muted)`,
        `--c-subtle: var(--colors-${colourName}-subtle)`,
        `--c-emphasized: var(--colors-${colourName}-emphasized)`,
        `--c-solid: var(--colors-${colourName}-solid)`,
        `--c-focus-ring: var(--colors-${colourName}-focus-ring)`,
    ].join("; ");

    return semanticVars;
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