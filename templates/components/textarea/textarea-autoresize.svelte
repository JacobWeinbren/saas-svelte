<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const textareaAutoresize = tv({
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
				xs: "px-2 py-1 text-xs leading-4",
				sm: "px-2.5 py-1.5 text-sm leading-5",
				md: "px-3 py-1.5 text-sm leading-5",
				lg: "px-4 py-2 text-sm leading-5 rounded-md",
				xl: "px-5 py-3.5 text-sm leading-5 rounded-md",
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

	export type TextareaAutoresizeVariants = VariantProps<
		typeof textareaAutoresize
	>;
</script>

<script lang="ts">
	import type { HTMLTextareaAttributes } from "svelte/elements";
	import type { ClassNameValue } from "tailwind-merge";

	interface Props extends Omit<HTMLTextareaAttributes, "class"> {
		/**
		 * The visual style of the textarea.
		 * @default "outline"
		 */
		variant?: TextareaAutoresizeVariants["variant"];
		/**
		 * The size of the textarea.
		 * @default "md"
		 */
		size?: TextareaAutoresizeVariants["size"];
		/**
		 * Whether the textarea is in an invalid state.
		 * @default false
		 */
		invalid?: boolean;
		/**
		 * Minimum number of rows.
		 * @default 1
		 */
		minRows?: number;
		/**
		 * Maximum number of rows.
		 * @default 40
		 */
		maxRows?: number;
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
		minRows = 1,
		maxRows = 40,
		value = $bindable(""),
		...restProps
	}: Props = $props();

	const classes = $derived(
		textareaAutoresize({ variant, size, invalid, class: className }) as string,
	);

	const minHeight = $derived(`${1 + minRows * 1.2}em`);
	const maxHeight = $derived(maxRows ? `${1 + maxRows * 1.2}em` : `auto`);
</script>

<div class="relative grid">
	<pre
		aria-hidden="true"
		class={`${classes} invisible whitespace-pre-wrap break-words overflow-hidden [grid-area:1/1/2/2]`}
		style="min-height: {minHeight}; max-height: {maxHeight}">{value + "\n"}</pre>

	<textarea
		bind:value
		class={`${classes} resize-none overflow-hidden [grid-area:1/1/2/2]`}
		{...restProps}
	></textarea>
</div>
