<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";

	export const kbd = tv({
		base: [
			// Layout
			"inline-flex items-center shrink-0",
			// Typography
			"antialiased",
			// Selection & spacing
			"select-none whitespace-nowrap [word-spacing:-0.5em]",
			// Border radius & padding
			"rounded-l1 px-1",
		],
		variants: {
			variant: {
				// Raised: 3D effect with border-t, border-b-2, border-x
				raised: [
					"border-t border-b-2 border-x",
					"border-border-default",
					"bg-bg-muted",
					"text-fg-emphasized",
				],
				// Outline: simple border
				outline: [
					"border",
					"border-border-default",
					"text-fg-emphasized",
				],
				// Subtle: background only
				subtle: ["bg-bg-subtle", "text-fg-emphasized"],
				// Plain: text only
				plain: ["text-fg-emphasized"],
			},
			size: {
				sm: "h-4 text-2xs font-medium leading-2xs",
				md: "h-5 text-xs font-medium leading-xs",
				lg: "h-6 text-sm font-medium leading-sm",
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
