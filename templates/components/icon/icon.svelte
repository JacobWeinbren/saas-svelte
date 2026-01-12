<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { Component, Snippet } from "svelte";
	import type { SVGAttributes } from "svelte/elements";
	import { type ColorName } from "$saas/utils/colours";
	import tailwindColors from "tailwindcss/colors";

	const iconStyles = tv({
		base: "inline-block shrink-0 leading-none align-middle antialiased",
		variants: {
			size: {
				xs: "size-3",
				sm: "size-4",
				md: "size-5", // 20px
				lg: "size-6",
				xl: "size-7",
				"2xl": "size-8",
			},
		},
		defaultVariants: {
			size: "md",
		},
	});

	type IconVariants = VariantProps<typeof iconStyles>;

	interface Props extends SVGAttributes<SVGElement> {
		as?: Component<any>;
		size?: IconVariants["size"];
		color?: ColorName;
		strokeWidth?: number | string;
		children?: Snippet;
	}

	let {
		as: IconComponent,
		size = "md",
		color,
		class: className,
		style,
		children,
		...rest
	}: Props = $props();

	function getColorHex(colorName: string, shade: string = "600"): string {
		const allColors = (tailwindColors as any).default || tailwindColors;
		const palette = allColors[colorName];
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

	const strokeColor = $derived(color ? getColorHex(color) : undefined);

	const finalStyle = $derived(
		[strokeColor ? `color: ${strokeColor}` : undefined, style]
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
		color={strokeColor || "currentColor"}
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
