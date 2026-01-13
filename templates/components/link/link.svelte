<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { type ColorName, generateColorVars } from "$saas/utils/colours";

	export const link = tv({
		base: [
			"cursor-pointer outline-0 items-center gap-x-1.5 gap-y-1.5 inline-flex rounded",
			"focus:outline-offset-2 focus:outline-1 focus:outline-solid focus:outline-(--c-600)",
			// Base text colors and size
			"text-md leading-5 text-(--c-700) dark:text-(--c-300)",
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
			color: {},
		},
		defaultVariants: {
			variant: "plain",
			color: "gray" as any,
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
		 * The color palette of the link.
		 * @default "gray"
		 */
		color?: ColorName;
		/**
		 * Content to render inside the link.
		 */
		children?: Snippet;
	}

	let {
		variant = "plain",
		color = "gray",
		class: className,
		children,
		style,
		...rest
	}: Props = $props();

	const colorVars = $derived(generateColorVars(color || "gray"));

	const finalClass = $derived(link({ variant, class: className as string }));

	const finalStyle = $derived([colorVars, style].filter(Boolean).join("; "));
</script>

<a class={finalClass} style={finalStyle} {...rest}>
	{@render children?.()}
</a>
