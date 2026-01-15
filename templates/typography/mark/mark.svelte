<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { ColourName, generateColourVars } from "$saas/utils/colours";

	export const mark = tv({
		base: "whitespace-nowrap",
		variants: {
			variant: {
				subtle: "bg-(--c-muted)",
				solid: "text-(--c-contrast) bg-(--c-solid)",
				text: "bg-transparent font-(--font-weights-semibold)",
				plain: "bg-transparent",
			},
		},
		defaultVariants: {
			variant: "subtle",
		},
	});

	export type MarkVariants = VariantProps<typeof mark>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { generateColourVars as genColourVars } from "$saas/utils/colours";

	interface Props extends Omit<HTMLAttributes<HTMLElement>, "class"> {
		/**
		 * The visual style variant.
		 * @default "subtle"
		 */
		variant?: MarkVariants["variant"];
		/**
		 * The colour palette to use.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let {
		variant = "subtle",
		colour = "gray",
		class: className,
		children,
		style,
		...restProps
	}: Props = $props();

	const colourVars = $derived(genColourVars(colour || "gray"));

	const finalClass = $derived(
		mark({
			variant,
			class: className,
		}),
	);

	const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<mark class={finalClass} style={finalStyle} {...restProps}>
	{@render children?.()}
</mark>
