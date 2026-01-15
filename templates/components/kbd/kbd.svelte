<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";

	export const kbd = tv({
		base: [
			// Layout
			"inline-flex items-center shrink-0",
			// Typography
			"font-medium font-sans antialiased",
			// Selection & spacing
			"select-none whitespace-nowrap [word-spacing:-0.5em]",
			// Border radius & padding
			"rounded px-(--spacing-1)",
		],
		variants: {
			variant: {
				// Raised: 3D effect with border-t, border-b-2, border-x
				raised: [
					"border-t border-b-2 border-x",
					"border-(--color-border-default)",
					"bg-(--color-bg-muted)",
					"text-(--color-fg-emphasized)",
				],
				// Outline: simple border
				outline: [
					"border",
					"border-(--color-border-default)",
					"text-(--color-fg-emphasized)",
				],
				// Subtle: background only
				subtle: [
					"bg-(--color-bg-subtle)",
					"text-(--color-fg-emphasized)",
				],
				// Plain: text only
				plain: ["text-(--color-fg-emphasized)"],
			},
			size: {
				sm: "h-(--spacing-4) text-(length:--font-sizes-2xs) font-medium leading-(--line-heights-2xs)",
				md: "h-(--spacing-5) text-(length:--font-sizes-xs) font-medium leading-(--line-heights-xs)",
				lg: "h-(--spacing-6) text-(length:--font-sizes-sm) font-medium leading-(--line-heights-sm)",
			},
		},
		defaultVariants: {
			variant: "subtle",
			size: "md",
		},
	});

	export type KbdVariants = VariantProps<typeof kbd>;
</script>

<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props extends HTMLAttributes<HTMLElement> {
		/**
		 * The visual style of the component.
		 * @default "subtle"
		 */
		variant?: KbdVariants["variant"];
		/**
		 * The size of the component.
		 * @default "md"
		 */
		size?: KbdVariants["size"];
		/**
		 * Content to render inside the kbd.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let {
		variant = "subtle",
		size = "md",
		class: className,
		children,
		...restProps
	}: Props = $props();

	const finalClass = $derived(
		kbd({
			variant,
			size,
			class: className,
		}),
	);
</script>

<kbd class={finalClass} {...restProps}>
	{@render children?.()}
</kbd>
