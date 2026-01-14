<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";
	import { type ColourName, generateColourVars } from "$saas/utils/colours";

	export const circle = tv({
		base: "shrink-0 flex items-center justify-center rounded-full bg-(--c-500) text-white",
		variants: {
			size: {
				xs: "size-5 text-xs",
				sm: "size-8 text-sm",
				md: "size-10 text-base",
				lg: "size-12 text-lg",
				xl: "size-16 text-xl",
			},
			variant: {
				solid: "bg-(--c-600) text-white",
				subtle: "bg-(--c-100) text-(--c-700) dark:bg-(--c-900) dark:text-(--c-300)",
				outline: "border border-(--c-200) text-(--c-700) dark:border-(--c-800) dark:text-(--c-300)",
				plain: "text-(--c-700) bg-transparent dark:text-(--c-300)",
			},
		},
		defaultVariants: {
			size: "md",
			variant: "solid",
		},
	});

	export type CircleVariants = VariantProps<typeof circle>;
</script>

<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = HTMLAttributes<HTMLElement> & {
		/**
		 * The colour palette of the component.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * The size of the circle.
		 * @default "md"
		 */
		size?: CircleVariants["size"];
		/**
		 * The variant of the circle.
		 * @default "solid"
		 */
		variant?: CircleVariants["variant"];
		children?: Snippet;
	};

	let {
		colour = "gray",
		size = "md",
		variant = "solid",
		children,
		class: className,
		style,
		...restProps
	}: Props = $props();

	const colourVars = $derived(generateColourVars(colour));
	const finalClass = $derived(circle({ size, variant, class: className }));
	const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<div class={finalClass} style={finalStyle} {...restProps}>
	{@render children?.()}
</div>
