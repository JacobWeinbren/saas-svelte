<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";
	import type { ColourName } from "$saas/utils/colours";

	export const badge = tv({
		base: [
			"tabular-nums",
			"whitespace-nowrap",
			"select-none",
			"items-center",
			"gap-(--spacing-1)",
			"font-(--font-weights-medium)",
			"inline-flex",
			"rounded-(--radius-full)",
		],
		variants: {
			variant: {
				subtle: "bg-(--c-muted) [color:var(--c-fg)]",
				solid: "bg-(--c-solid) [color:var(--c-contrast)]",
				outline: "[color:var(--c-fg)] ring-1 ring-inset ring-(--c-subtle)",
				surface: "bg-(--c-muted)/50 [color:var(--c-fg)] ring-1 ring-inset ring-(--c-subtle)",
			},
			size: {
				xs: "min-h-(--spacing-4) text-(length:--font-sizes-xs) leading-(--line-heights-2xs) px-(--spacing-1)",
				sm: "min-h-(--spacing-5) text-(length:--font-sizes-xs) leading-(--line-heights-xs) px-(--spacing-1_5)",
				md: "min-h-(--spacing-6) text-(length:--font-sizes-sm) leading-(--line-heights-sm) px-(--spacing-2)",
				lg: "min-h-(--spacing-7) text-(length:--font-sizes-sm) leading-(--line-heights-sm) px-(--spacing-2_5)",
			},
		},
		defaultVariants: {
			variant: "subtle",
			size: "sm",
		},
	});

	export type BadgeVariants = VariantProps<typeof badge>;
</script>

<script lang="ts">
	import type { Snippet } from "svelte";
	import { getColourStyle } from "$saas/utils/colours";

	type BadgeVariants = VariantProps<typeof badge>;

	interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
		/**
		 * The badge content.
		 */
		children: Snippet;
		/**
		 * The visual style of the badge.
		 * @default "subtle"
		 */
		variant?: BadgeVariants["variant"];
		/**
		 * The size of the badge.
		 * @default "sm"
		 */
		size?: BadgeVariants["size"];
		/**
		 * The colour palette of the badge.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let {
		children,
		variant = "subtle",
		size = "sm",
		colour = "gray",
		class: className,
		style,
		...restProps
	}: Props = $props();

	const colourStyle = $derived(getColourStyle(colour || "gray"));
	const finalStyle = $derived([colourStyle, style].filter(Boolean).join("; "));

	const finalClass = $derived(badge({ variant, size, class: className }));
</script>

<span class={finalClass} style={finalStyle} {...restProps}>
	{@render children()}
</span>
