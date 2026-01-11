// 1. Use the default import for better compatibility with Vite/SvelteKit
import tailwindColors from "tailwindcss/colors";

// 2. Add 'as const' to prevent the 'never' type error
const restricted = [
    "inherit",
    "current",
    "transparent",
    "black",
    "white",
    "default",
] as const;

export type ColorName = keyof Omit<
    typeof tailwindColors,
    (typeof restricted)[number]
>;

/**
 * Generates CSS variables for a specific Tailwind color palette.
 * @param colorName - The name of the color (e.g., "blue", "rose")
 * @returns A string of CSS variables: "--c-50: #eff6ff; --c-100: ..."
 */
export function generateColorVars(colorName: string): string {
    if (!colorName) return "";

    // 3. Safety Check: Handle different import structures (ESM vs CJS interop)
    // Some bundlers put the colors inside a 'default' property.
    const allColors = (tailwindColors as any).default || tailwindColors;

    const palette = allColors[colorName];

    // Guard: If the palette is missing (typo?) or not an object (e.g. "black" is a string), return empty.
    // This prevents the "palette is undefined" crash.
    if (!palette || typeof palette !== "object") {
        return "";
    }

    const shades = [
        "50",
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900",
        "950",
    ] as const;

    return shades
        .map((shade) => {
            const val = palette[shade];
            // Return the raw value (Hex/OKLCH) for Tailwind 4 compatibility
            return val ? `--c-${shade}: ${val}` : null;
        })
        .filter(Boolean)
        .join("; ");
}