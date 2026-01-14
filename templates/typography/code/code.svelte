<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { ColourName, generateColourVars } from "$saas/utils/colours";

	export const code = tv({
		base: [
			// Core Layout
			"saas-code",
			"inline-flex items-center antialiased",
			"rounded-(--radius-sm)",
			"font-mono",
			"[word-wrap:break-word]",
		],
		variants: {
			variant: {
				// SOLID: Zinc-50 text on colored background
				solid: "text-(--color-fg-inverted) bg-(--c-600) dark:bg-(--c-500)",

				// OUTLINE: Colored text with border
				outline: [
					"text-(--c-700) dark:text-(--c-300)",
					"shadow-[inset_0_0_0_1px_var(--c-200)] dark:shadow-[inset_0_0_0_1px_var(--c-700)]",
				],

				// SUBTLE: Colored text with subtle background
				subtle: "text-(--c-700) dark:text-(--c-300) bg-(--c-100) dark:bg-(--c-900)",

				// SURFACE: Colored text with very subtle background + border
				surface: [
					"text-(--c-700) dark:text-(--c-300)",
					"shadow-[inset_0_0_0_1px_var(--c-200)] dark:shadow-[inset_0_0_0_1px_var(--c-700)]",
					"bg-(--c-50)/20 dark:bg-(--c-950)/20",
				],
			},
			size: {
				xs: "text-xs leading-3 px-(--spacing-1) min-h-(--spacing-4)",
				sm: "text-xs leading-4 px-(--spacing-1_5) min-h-(--spacing-5)",
				md: "text-sm leading-5 px-(--spacing-2) min-h-(--spacing-6)",
				lg: "text-sm leading-5 px-(--spacing-2_5) min-h-(--spacing-7)",
			},
		},
		defaultVariants: {
			variant: "subtle",
			size: "sm",
		},
	});

	export type CodeVariants = VariantProps<typeof code>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { ClassNameValue } from "tailwind-merge";
	import { generateColourVars as genColourVars } from "$saas/utils/colours";

	interface Props extends Omit<HTMLAttributes<HTMLElement>, "class"> {
		/**
		 * The visual style of the code element.
		 * @default "subtle"
		 */
		variant?: CodeVariants["variant"];
		/**
		 * The size of the code element.
		 * @default "sm"
		 */
		size?: CodeVariants["size"];
		/**
		 * The colour palette to use.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: ClassNameValue;
	}

	let {
		variant = "subtle",
		size = "sm",
		colour = "gray",
		class: className,
		children,
		style,
		...restProps
	}: Props = $props();

	const colourVars = $derived(genColourVars(colour || "gray"));

	const finalClass = $derived(
		code({
			variant,
			size,
			class: className,
		}),
	);

	const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<code class={finalClass} style={finalStyle} {...restProps}>
	{@render children?.()}
</code>
