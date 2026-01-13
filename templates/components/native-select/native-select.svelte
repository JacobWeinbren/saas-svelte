<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const nativeSelect = tv({
		base: [
			// Core Layout
			"appearance-none outline-0 w-full relative",
			"rounded border select-none",

			// Text & Placeholder
			"text-sm leading-5 antialiased",

			// Disabled
			"disabled:opacity-50 disabled:cursor-not-allowed",

			// Focus (Global)
			"focus-visible:outline-solid focus-visible:outline-zinc-600 focus-visible:border-zinc-600",
			"dark:focus-visible:outline-zinc-500 dark:focus-visible:border-zinc-500",
		],
		variants: {
			variant: {
				outline: [
					"bg-transparent",
					// Light
					"border-gray-200",
					"enabled:hover:border-gray-300",
					"enabled:hover:focus-visible:border-zinc-600",

					// Dark
					"dark:border-gray-800 dark:text-gray-50",
					"dark:enabled:hover:border-zinc-700",
				],
				subtle: [
					"border-transparent",
					// Light
					"bg-gray-50",
					// Dark
					"dark:bg-gray-950 dark:text-gray-50",
				],
				plain: [
					"border-0 bg-transparent",
					// Light
					"text-zinc-950",
					// Dark
					"dark:text-zinc-50",
					"focus-visible:outline-2",
				],
			},
			size: {
				xs: "h-6 pl-2 pr-6 text-xs leading-4",
				sm: "h-8 pl-2.5 pr-8 text-sm leading-5",
				md: "h-10 pl-3 pr-8 text-sm leading-5",
				lg: "h-11 pl-4 pr-8 text-sm leading-5",
				xl: "h-12 pl-5 pr-10 text-sm leading-5",
			},
			invalid: {
				true: [
					"border-red-500 focus-visible:border-red-500 focus-visible:outline-red-500 hover:border-gray-300",
					"dark:border-red-400 dark:focus-visible:border-red-400 dark:hover:border-zinc-700",
				],
			},
		},
		defaultVariants: {
			variant: "outline",
			size: "md",
		},
	});

	export type NativeSelectVariants = VariantProps<typeof nativeSelect>;
</script>

<script lang="ts">
	import type { HTMLSelectAttributes } from "svelte/elements";
	import type { ClassNameValue } from "tailwind-merge";
	import type { Snippet } from "svelte";

	interface Props extends Omit<HTMLSelectAttributes, "size" | "class"> {
		/**
		 * The visual style of the select.
		 * @default "outline"
		 */
		variant?: NativeSelectVariants["variant"];
		/**
		 * The size of the select.
		 * @default "md"
		 */
		size?: NativeSelectVariants["size"];
		/**
		 * Whether the select is in an invalid state.
		 * @default false
		 */
		invalid?: boolean;
		/**
		 * Whether the select is disabled.
		 */
		disabled?: boolean;
		/**
		 * The selected value.
		 */
		value?: any;
		/**
		 * Content to render inside the select (options).
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: ClassNameValue;
	}

	let {
		variant = "outline",
		size = "md",
		class: className,
		invalid = false,
		value = $bindable(),
		children,
		...restProps
	}: Props = $props();

	const classes = $derived(
		nativeSelect({ variant, size, invalid, class: className }) as string,
	);
</script>

<select class={classes} bind:value {...restProps}>
	{@render children?.()}
</select>

<style>
	select option {
		background: inherit;
	}
</style>
