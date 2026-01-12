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

// Helper to handle ESM/CJS interop for tailwind colors
const allColors = (tailwindColors as any).default || tailwindColors;

export const availableColors = Object.keys(allColors).filter(
    (color) => !restricted.includes(color as any)
);

export type ColorName = keyof Omit<
    typeof tailwindColors,
    (typeof restricted)[number]
>;

export function generateColorVars(colorName: string): string {
    if (!colorName) return "";

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