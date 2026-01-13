<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import { generateColourVars, type ColourName } from "$saas/utils/colours";

	export const input = tv({
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
				xs: "min-w-6 h-6 px-2 text-xs leading-4",
				sm: "min-w-7 h-7 px-2.5 text-sm leading-5",
				md: "min-w-8 h-8 px-3 text-sm leading-5",
				lg: "min-w-10 h-10 px-5 text-sm leading-5 rounded-md",
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

	const fieldState = $derived(
		fieldContext
			? $fieldContext
			: {
					id: undefined,
					disabled: false,
					invalid: false,
					required: false,
					readOnly: false,
				},
	);

	const colourVars = $derived(generateColourVars(colour));

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
