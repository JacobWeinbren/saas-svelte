<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { Component, Snippet } from "svelte";
	import type { SVGAttributes } from "svelte/elements";
	import { type ColourName } from "$saas/utils/colours";
	import tailwindColors from "tailwindcss/colors";

	const iconStyles = tv({
		base: "inline-block shrink-0 leading-none align-middle antialiased",
		variants: {
			size: {
				xs: "size-(--spacing-3)",
				sm: "size-(--spacing-4)",
				md: "size-(--spacing-5)", // 20px
				lg: "size-(--spacing-6)",
				xl: "size-(--spacing-7)",
				"2xl": "size-(--spacing-8)",
			},
		},
		defaultVariants: {
			size: "md",
		},
	});

	type IconVariants = VariantProps<typeof iconStyles>;

	interface Props extends SVGAttributes<SVGElement> {
		/**
		 * The icon component to render (e.g. from phosphor-svelte or custom).
		 */
		as?: Component<any>;
		/**
		 * The size of the icon.
		 * @default "md"
		 */
		size?: IconVariants["size"];
		/**
		 * The colour theme of the icon.
		 * @default "currentColor"
		 */
		colour?: ColourName;
		/**
		 * The weight/style of the icon (for Phosphor icons).
		 * @default "regular"
		 */
		weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
		/**
		 * Whether to flip the icon horizontally (for Phosphor icons).
		 */
		mirrored?: boolean;
		/**
		 * SVG path elements for custom icons (if `as` is not provided).
		 */
		children?: Snippet;
	}

	let {
		as: IconComponent,
		size = "md",
		colour,
		weight = "regular",
		mirrored = false,
		class: className,
		style,
		children,
		...rest
	}: Props = $props();

	function getColourHex(colourName: string, shade: string = "600"): string {
		const allColours = (tailwindColors as any).default || tailwindColors;
		const palette = allColours[colourName];
		if (!palette || typeof palette !== "object") return "";
		return palette[shade] || "";
	}

	const sizeMap = {
		xs: 12,
		sm: 16,
		md: 20,
		lg: 24,
		xl: 28,
		"2xl": 32,
	} as const;

	const sizeInPixels = $derived(sizeMap[size]);

	const strokeColour = $derived(colour ? getColourHex(colour) : undefined);

	const finalStyle = $derived(
		[strokeColour ? `color: ${strokeColour}` : undefined, style]
			.filter(Boolean)
			.join("; "),
	);

	const computedClasses = $derived(
		iconStyles({ size, class: className as string }) as string,
	);
</script>

{#if IconComponent}
	<IconComponent
		size={sizeInPixels}
		color={strokeColour || "currentColor"}
		{weight}
		{mirrored}
		class={computedClasses}
		{...rest}
	/>
{:else}
	<svg
		width={sizeInPixels}
		height={sizeInPixels}
		class={computedClasses}
		style={finalStyle}
		stroke="currentColor"
		fill="none"
		focusable="false"
		aria-hidden="true"
		viewBox={rest.viewBox || "0 0 24 24"}
		{...rest}
	>
		{#if children}
			{@render children()}
		{/if}
	</svg>
{/if}
