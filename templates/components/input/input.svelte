<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import { getColourStyle, type ColourName } from "$saas/utils/colours";

	export const input = tv({
		base: [
			// Core Layout
			"appearance-none outline-0 w-full relative",
			"rounded-(--radii-l1) border",

			// Text & Placeholder
			"antialiased",
			"text-fg-default",
			"placeholder:text-fg-muted placeholder:select-none",

			// Disabled
			"disabled:opacity-50 disabled:cursor-(--cursor-disabled)",

			// Focus - using colour prop (--c-focus-ring set via getColourStyle)
			"focus-visible:outline-solid focus-visible:outline-(--c-focus-ring) focus-visible:border-(--c-focus-ring)",
		],
		variants: {
			variant: {
				outline: [
					"bg-transparent",
					// Border - light: gray-200, dark: gray-800
					"border-border-default",
					// Hover - light: gray-300, dark: zinc-700
					"enabled:hover:border-border-emphasized",
					"enabled:hover:focus-visible:border-(--c-focus-ring)",
				],
				subtle: [
					"border-transparent",
					// Background - light: gray-50, dark: gray-950
					"bg-bg-subtle",
				],
				flushed: [
					"rounded-none border-t-0 border-x-0 border-b",
					"bg-transparent shadow-none px-0",
					// Border - light: gray-200, dark: gray-800
					"border-border-default",
					// Focus - shadow instead of outline
					"focus-visible:outline-0 focus-visible:shadow focus-visible:border-(--c-focus-ring)",
				],
			},
			size: {
				xs: "min-w-(--spacing-6) h-(--spacing-6) px-(--spacing-2) text-(length:--font-sizes-xs) leading-(--line-heights-xs)",
				sm: "min-w-(--spacing-7) h-(--spacing-7) px-(--spacing-2_5) text-(length:--font-sizes-sm) leading-(--line-heights-sm)",
				md: "min-w-(--spacing-8) h-(--spacing-8) px-(--spacing-3) text-(length:--font-sizes-sm) leading-(--line-heights-sm)",
				lg: "min-w-(--spacing-10) h-(--spacing-10) px-(--spacing-5) text-(length:--font-sizes-sm) leading-(--line-heights-sm) rounded-(--radius-md)",
			},
			invalid: {
				true: [
					// Invalid border and focus ring - red-500 light, red-400 dark
					"border-border-error!",
					"focus-visible:border-border-error! focus-visible:outline-border-error!",
					"enabled:hover:border-border-emphasized",
				],
			},
		},
		defaultVariants: {
			variant: "outline",
			size: "md",
		},
	});

	export type InputVariants = VariantProps<typeof input>;
</script>

<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import type { ClassNameValue } from "tailwind-merge";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	interface Props extends Omit<HTMLInputAttributes, "size" | "class"> {
		/**
		 * The visual style of the input.
		 * @default "outline"
		 */
		variant?: InputVariants["variant"];
		/**
		 * The size of the input.
		 * @default "md"
		 */
		size?: InputVariants["size"];
		/**
		 * The colour theme of the input.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * Whether the input is in an invalid state.
		 * @default false
		 */
		invalid?: boolean;
		/**
		 * Whether the input is disabled.
		 */
		disabled?: boolean;
		/**
		 * Placeholder text for the input.
		 */
		placeholder?: string;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: ClassNameValue;
	}

	let {
		variant = "outline",
		size = "md",
		colour = "gray",
		class: className,
		invalid = false,
		disabled = false,
		style,
		value = $bindable(),
		...restProps
	}: Props = $props();

	const fieldContext = getContext<
		Writable<{
			id: string;
			disabled: boolean;
			invalid: boolean;
			required: boolean;
			readOnly: boolean;
		}>
	>("field");

	const fieldState = $derived($fieldContext ?? {});

	const colourVars = $derived(getColourStyle(colour));

	const isInvalid = $derived(invalid || fieldState.invalid || false);
	const isDisabled = $derived(disabled || fieldState.disabled || false);
	const isRequired = $derived(
		restProps.required || fieldState.required || false,
	);
	const isReadOnly = $derived(
		restProps.readonly || fieldState.readOnly || false,
	);
	const id = $derived(restProps.id || fieldState.id);

	const classes = $derived(
		input({
			variant,
			size,
			invalid: isInvalid,
			class: className,
		}) as string,
	);

	const styles = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<input
	{id}
	disabled={isDisabled}
	required={isRequired}
	readonly={isReadOnly}
	class={classes}
	style={styles}
	bind:value
	{...restProps}
/>
