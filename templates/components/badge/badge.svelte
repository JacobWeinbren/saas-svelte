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
			"gap-y-1",
			"gap-x-1",
			"font-(--font-weights-medium)",
			"inline-flex",
			"rounded-full",
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
				xs: "min-h-4 text-(length:--font-sizes-xs) leading-(--line-heights-2xs) px-1",
				sm: "min-h-5 text-(length:--font-sizes-xs) leading-(--line-heights-xs) px-1.5",
				md: "min-h-6 text-(length:--font-sizes-sm) leading-(--line-heights-sm) px-2",
				lg: "min-h-7 text-(length:--font-sizes-sm) leading-(--line-heights-sm) px-2.5",
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
