<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { ColorName, generateColorVars } from "$saas/utils/colours";

	export const code = tv({
		base: [
			// Core Layout
			"saas-code",
			"inline-flex items-center antialiased",
			"rounded",
			"font-mono",
			"[word-wrap:break-word]",
		],
		variants: {
			variant: {
				// SOLID: Zinc-50 text on colored background
				solid: "text-zinc-50 bg-(--c-600) dark:bg-(--c-500)",

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
				xs: "text-xs leading-3 px-1 min-h-4",
				sm: "text-xs leading-4 px-1.5 min-h-5",
				md: "text-sm leading-5 px-2 min-h-6",
				lg: "text-sm leading-5 px-2.5 min-h-7",
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
	import { generateColorVars as genColorVars } from "$saas/utils/colours";

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
		 * The color palette to use.
		 * @default "gray"
		 */
		color?: ColorName;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: ClassNameValue;
	}

	let {
		variant = "subtle",
		size = "sm",
		color = "gray",
		class: className,
		children,
		style,
		...restProps
	}: Props = $props();

	const colorVars = $derived(genColorVars(color || "gray"));

	const finalClass = $derived(
		code({
			variant,
			size,
			class: className,
		}),
	);

	const finalStyle = $derived([colorVars, style].filter(Boolean).join("; "));
</script>

<code class={finalClass} style={finalStyle} {...restProps}>
	{@render children?.()}
</code>
