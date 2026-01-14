<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	const addon = tv({
		base: [
			"flex items-center whitespace-nowrap border antialiased",
			"bg-(--color-bg-muted) border-(--color-border-default) text-(--color-fg-subtle)",
		],
		variants: {
			size: {
				xs: "h-(--spacing-6) px-(--spacing-2) text-xs",
				sm: "h-(--spacing-7) px-(--spacing-2_5) text-sm",
				md: "h-(--spacing-8) px-(--spacing-3) text-sm",
				lg: "h-(--spacing-10) px-(--spacing-4) text-base",
			},
		},
		defaultVariants: {
			size: "md",
		},
	});

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class"> {
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * The size of the addon.
		 */
		size?: VariantProps<typeof addon>["size"];
		/**
		 * The content to be rendered inside the component.
		 */
		children?: Snippet;
	}

	let {
		children,
		class: className,
		size = "md",
		...restProps
	}: Props = $props();

	const classes = $derived(addon({ size, class: className }) as string);
</script>

<div class={classes} {...restProps}>
	{@render children?.()}
</div>
