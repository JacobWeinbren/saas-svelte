<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	const addon = tv({
		base: [
			"flex items-center whitespace-nowrap border",
			// Light Mode
			"bg-gray-50 border-gray-200 text-gray-600",
			// Dark Mode
			"dark:bg-gray-950 dark:border-gray-800 dark:text-gray-400",
		],
		variants: {
			size: {
				xs: "h-6 px-2 text-xs",
				sm: "h-7 px-2.5 text-sm",
				md: "h-8 px-3 text-sm",
				lg: "h-10 px-4 text-base",
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
