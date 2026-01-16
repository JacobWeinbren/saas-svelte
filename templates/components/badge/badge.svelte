<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";
	import { type ColourName, generateColourVars } from "$saas/utils/colours";

	export const badge = tv({
		base: [
			"tabular-nums",
			"whitespace-nowrap",
			"select-none",
			"items-center",
			"gap-y-(--spacing-1)",
			"gap-x-(--spacing-1)",
			"font-(--font-weights-medium)",
			"inline-flex",
			"rounded-(--radius-full)",
		],
		variants: {
			variant: {
				subtle: "bg-(--c-muted) text-(--c-fg)",
				solid: "bg-(--c-solid) text-(--c-contrast)",
				outline:
					"text-(--c-fg) ring-1 ring-inset ring-(--c-subtle)",
				surface:
					"bg-(--c-muted)/50 text-(--c-fg) ring-1 ring-inset ring-(--c-subtle)",
			},
			size: {
				xs: "min-h-(--sizes-4) text-(length:--font-sizes-xs) leading-(--line-heights-2xs) px-(--spacing-1)",
				sm: "min-h-(--sizes-5) text-(length:--font-sizes-xs) leading-(--line-heights-xs) px-(--spacing-1_5)",
				md: "min-h-(--sizes-6) text-(length:--font-sizes-sm) leading-(--line-heights-sm) px-(--spacing-2)",
				lg: "min-h-(--sizes-7) text-(length:--font-sizes-sm) leading-(--line-heights-sm) px-(--spacing-2_5)",
			},
			colour: {},
		},
		defaultVariants: {
			variant: "subtle",
			size: "sm",
			colour: "gray" as any,
		},
	});

	export type BadgeVariants = VariantProps<typeof badge>;
</script>

<script lang="ts">
	import type { Snippet } from "svelte";

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

	const colourVars = $derived(generateColourVars(colour || "gray"));

	const finalClass = $derived(badge({ variant, size, class: className }));

	const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<span class={finalClass} style={finalStyle} {...restProps}>
	{@render children()}
</span>
