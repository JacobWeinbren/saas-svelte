<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const textarea = tv({
		base: [
			// Core Layout
			"appearance-none outline-0 w-full relative",
			"rounded border",

			// Text & Placeholder
			"text-sm leading-5 antialiased",
			"placeholder:text-zinc-500/90 placeholder:select-none",

			// Disabled
			"disabled:opacity-50 disabled:cursor-not-allowed",

			// Focus (Global)
			"focus-visible:outline-solid focus-visible:outline-zinc-600 focus-visible:border-zinc-600",
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
				flushed: [
					"rounded-none border-t-0 border-x-0 border-b",
					"bg-transparent shadow-none px-0",
					// Light
					"border-gray-200",
					// Dark
					"dark:border-gray-800 dark:text-gray-50",

					"focus-visible:outline-0 focus-visible:border-zinc-600",
				],
			},
			size: {
				xs: "px-2 py-1 text-xs leading-4 scroll-pb-1",
				sm: "px-2.5 py-1.5 text-sm leading-5 scroll-pb-1.5",
				md: "px-3 py-1.5 text-sm leading-5 scroll-pb-1.5",
				lg: "px-4 py-2 text-sm leading-5 scroll-pb-2 rounded-md",
				xl: "px-5 py-3.5 text-sm leading-5 scroll-pb-3.5 rounded-md",
			},
			invalid: {
				true: [
					"border-red-500 focus-visible:border-red-500 focus-visible:outline-red-500 hover:border-red-500",
					"dark:border-red-400 dark:focus-visible:border-red-400 dark:hover:border-red-400",
				],
			},
		},
		defaultVariants: {
			variant: "outline",
			size: "md",
		},
	});

	export type TextareaVariants = VariantProps<typeof textarea>;
</script>

<script lang="ts">
	import type { HTMLTextareaAttributes } from "svelte/elements";
	import type { ClassNameValue } from "tailwind-merge";

	interface Props extends Omit<HTMLTextareaAttributes, "class"> {
		/**
		 * The visual style of the textarea.
		 * @default "outline"
		 */
		variant?: TextareaVariants["variant"];
		/**
		 * The size of the textarea.
		 * @default "md"
		 */
		size?: TextareaVariants["size"];
		/**
		 * Whether the textarea is in an invalid state.
		 * @default false
		 */
		invalid?: boolean;
		/**
		 * Whether the textarea is disabled.
		 */
		disabled?: boolean;
		/**
		 * Placeholder text for the textarea.
		 */
		placeholder?: string;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: ClassNameValue;
		/**
		 * The resize behavior of the textarea.
		 */
		resize?: "none" | "vertical" | "horizontal" | "both";
	}

	let {
		variant = "outline",
		size = "md",
		class: className,
		invalid = false,
		value = $bindable(),
		resize,
		...restProps
	}: Props = $props();

	const classes = $derived(
		textarea({ variant, size, invalid, class: className }) as string,
	);

	const resizeClass = $derived(resize ? `resize-${resize}` : "");
</script>

<textarea class={`${classes} ${resizeClass}`} bind:value {...restProps}
></textarea>
