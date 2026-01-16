<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	const addon = tv({
		base: [
			// Layout
			"flex items-center flex-none whitespace-nowrap",
			// Border
			"border border-solid rounded-(--radii-l1)",
			// Background - light: gray-50, dark: gray-900
			"bg-bg-subtle",
			// Border color
			"border-border-default",
			// Text color
			"text-fg-default",
			// Typography
			"antialiased",
			// Focus
			"focus-visible:z-1",
		],
		variants: {
			size: {
				xs: "h-6 px-2 text-(length:--font-sizes-xs) leading-(--line-heights-xs)",
				sm: "h-7 px-2.5 text-(length:--font-sizes-sm) leading-(--line-heights-sm)",
				md: "h-8 px-3 text-(length:--font-sizes-sm) leading-(--line-heights-sm)",
				lg: "h-10 px-4 text-(length:--font-sizes-sm) leading-(--line-heights-sm)",
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
