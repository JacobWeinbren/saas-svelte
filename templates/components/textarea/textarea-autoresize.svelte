<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const textareaAutoresize = tv({
		base: [
			// Core Layout
			"appearance-none outline-0 w-full relative",
			"rounded-(--radii-l1) border",

			// Text & Placeholder
			"antialiased",
			"placeholder:text-(--color-fg-muted) placeholder:select-none",

			// Disabled
			"disabled:opacity-50 disabled:cursor-(--cursor-disabled)",

			// Focus (Global)
			"focus-visible:outline-solid focus-visible:outline-(--color-accent-focus-ring) focus-visible:border-(--color-accent-focus-ring)",
		],
		variants: {
			variant: {
				outline: [
					"bg-transparent",
					// Light/Dark using semantic tokens
					"border-(--color-border-default)",
					"enabled:hover:border-(--color-border-emphasized)",
					"enabled:hover:focus-visible:border-(--color-accent-focus-ring)",
					"text-(--color-fg-default)",
				],
				subtle: [
					"border-transparent",
					// Light/Dark using semantic tokens
					"bg-(--color-bg-muted)",
					"text-(--color-fg-default)",
				],
				flushed: [
					"rounded-none border-t-0 border-x-0 border-b",
					"bg-transparent shadow-none px-0",
					// Light/Dark using semantic tokens
					"border-(--color-border-default)",
					"text-(--color-fg-default)",

					"focus-visible:outline-0 focus-visible:border-(--color-accent-focus-ring)",
				],
			},
			size: {
				xs: "px-(--spacing-2) py-(--spacing-1) text-(length:--font-sizes-xs) leading-(--line-heights-xs)",
				sm: "px-(--spacing-2_5) py-(--spacing-1_5) text-(length:--font-sizes-sm) leading-(--line-heights-sm)",
				md: "px-(--spacing-3) py-(--spacing-1_5) text-(length:--font-sizes-sm) leading-(--line-heights-sm)",
				lg: "px-(--spacing-4) py-(--spacing-2) text-(length:--font-sizes-sm) leading-(--line-heights-sm) rounded-(--radius-md)",
				xl: "px-(--spacing-5) py-(--spacing-3_5) text-(length:--font-sizes-sm) leading-(--line-heights-sm) rounded-(--radius-md)",
			},
			invalid: {
				true: [
					"border-(--color-border-error) focus-visible:border-(--color-border-error) focus-visible:outline-(--color-border-error) hover:border-(--color-border-emphasized)",
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
		textareaAutoresize({
			variant,
			size,
			invalid,
			class: className,
		}) as string,
	);

	const minHeight = $derived(`${1 + minRows * 1.2}em`);
	const maxHeight = $derived(maxRows ? `${1 + maxRows * 1.2}em` : `auto`);
</script>

<div class="relative grid">
	<pre
		aria-hidden="true"
		class={`${classes} invisible whitespace-pre-wrap break-words overflow-hidden [grid-area:1/1/2/2]`}
		style="min-height: {minHeight}; max-height: {maxHeight}">{value +
			"\n"}</pre>

	<textarea
		bind:value
		class={`${classes} resize-none overflow-hidden [grid-area:1/1/2/2]`}
		{...restProps}
	></textarea>
</div>
