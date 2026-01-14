<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";

	export const kbd = tv({
		base: [
			"inline-flex items-center justify-center shrink-0 select-none whitespace-nowrap [word-spacing:-0.5em]",
			"font-medium rounded-(--radius-sm) px-(--spacing-1)",
			"antialiased font-sans",
		],
		variants: {
			variant: {
				raised: "border-t border-b-2 border-x border-(--color-border-muted) bg-(--color-bg-subtle) text-(--color-fg-emphasized) dark:border-(--color-border-muted) dark:bg-(--color-bg-subtle) dark:text-(--color-fg-emphasized)",
				outline:
					"border border-(--color-border-default) text-(--color-fg-emphasized) dark:border-(--color-border-default) dark:text-(--color-fg-emphasized)",
				subtle: "bg-(--color-bg-subtle) text-(--color-fg-emphasized) dark:bg-(--color-bg-subtle) dark:text-(--color-fg-emphasized)",
				plain: "text-(--color-fg-emphasized) dark:text-(--color-fg-emphasized)",
			},
			size: {
				sm: "h-(--spacing-4) text-[10px] leading-3",
				md: "h-(--spacing-5) text-xs leading-4",
				lg: "h-(--spacing-6) text-sm leading-5 px-(--spacing-1_5)",
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
