<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { type ColourName, getColourStyle } from "$saas/utils/colours";

	export const link = tv({
		base: [
			// Layout
			"cursor-(--cursor-button) outline-0 items-center gap-x-(--spacing-1_5) gap-y-(--spacing-1_5) inline-flex rounded-(--radii-l1)",
			// Focus - uses colour focus ring
			"focus:outline-offset-2 focus:outline-1 focus:outline-solid focus:outline-(--c-focus-ring)",
			// Typography - inherits font size from parent
			"text-(--c-fg) antialiased",
		],
		variants: {
			variant: {
				underline: [
					"underline underline-offset-[3px]",
					"decoration-[color-mix(in_srgb,currentColor_20%,transparent)]",
				],
				plain: [
					"hover:underline hover:underline-offset-[3px]",
					"hover:decoration-[color-mix(in_srgb,currentColor_20%,transparent)]",
				],
			},
			colour: {},
		},
		defaultVariants: {
			variant: "plain",
			colour: "gray" as any,
		},
	});

	export type LinkVariants = VariantProps<typeof link>;
</script>

<script lang="ts">
	interface Props extends HTMLAnchorAttributes {
		/**
		 * The visual style of the link.
		 * @default "plain"
		 */
		variant?: LinkVariants["variant"];
		/**
		 * The colour palette of the link.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * Content to render inside the link.
		 */
		children?: Snippet;
	}

	let {
		variant = "plain",
		colour = "gray",
		class: className,
		children,
		style,
		...rest
	}: Props = $props();

	const colourVars = $derived(getColourStyle(colour || "gray"));

	const finalClass = $derived(link({ variant, class: className as string }));

	const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<a class={finalClass} style={finalStyle} {...rest}>
	{@render children?.()}
</a>
