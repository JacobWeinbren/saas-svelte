<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { ColourName } from "$saas/utils/colours";

	export const mark = tv({
		base: "whitespace-nowrap text-inherit",
		variants: {
			variant: {
				subtle: "bg-(--c-muted) text-(--c-fg)",
				solid: "text-(--c-contrast) bg-(--c-solid)",
				text: "bg-transparent text-(--c-fg) font-(--font-weights-medium)",
				plain: "bg-transparent font-(--font-weights-semibold)",
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
	import { getColourStyle } from "$saas/utils/colours";

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

	const colourVars = $derived(getColourStyle(colour || "gray"));

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
