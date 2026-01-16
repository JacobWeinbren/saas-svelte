<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";
	import { type ColourName, getColourStyle } from "$saas/utils/colours";

	export const circle = tv({
		base: "shrink-0 flex items-center justify-center rounded-full bg-(--c-solid) text-(--c-contrast)",
		variants: {
			size: {
				xs: "size-5 text-(length:--font-sizes-xs)",
				sm: "size-8 text-(length:--font-sizes-sm)",
				md: "size-10 text-(length:--font-sizes-md)",
				lg: "size-12 text-(length:--font-sizes-lg)",
				xl: "size-16 text-(length:--font-sizes-xl)",
			},
			variant: {
				solid: "bg-(--c-solid) text-(--c-contrast)",
				subtle: "bg-(--c-muted) text-(--c-fg)",
				outline: "border border-(--c-subtle) text-(--c-fg)",
				plain: "text-(--c-fg) bg-transparent",
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

	const colourVars = $derived(getColourStyle(colour));
	const finalClass = $derived(circle({ size, variant, class: className }));
	const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<div class={finalClass} style={finalStyle} {...restProps}>
	{@render children?.()}
</div>
