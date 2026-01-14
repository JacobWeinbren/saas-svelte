<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import { generateColourVars, type ColourName } from "$saas/utils/colours";

	export const textarea = tv({
		base: [
			// Core Layout
			"appearance-none outline-0 w-full relative",
			"rounded border",

			// Text & Placeholder
			"text-sm leading-5 antialiased",
			"placeholder:text-(--color-fg-muted) placeholder:select-none",

			// Disabled
			"disabled:opacity-50 disabled:cursor-(--cursor-disabled)",

			// Focus (Global)
			"focus-visible:outline-solid focus-visible:outline-(--c-600) focus-visible:border-(--c-600)",
		],
		variants: {
			variant: {
				outline: [
					"bg-transparent",
					// Light
					"border-(--color-border-default)",
					"enabled:hover:border-(--color-border-emphasized)",
					"enabled:hover:focus-visible:border-(--c-600)",

					// Dark
					"dark:border-(--color-border-default) dark:text-(--color-fg-default)",
					"dark:enabled:hover:border-(--color-border-emphasized)",
				],
				subtle: [
					"border-transparent",
					// Light
					"bg-(--color-bg-subtle)",
					// Dark
					"dark:bg-(--color-bg-subtle) dark:text-(--color-fg-default)",
				],
				flushed: [
					"rounded-none border-t-0 border-x-0 border-b",
					"bg-transparent shadow-none px-0",
					// Light
					"border-(--color-border-default)",
					// Dark
					"dark:border-(--color-border-default) dark:text-(--color-fg-default)",

					"focus-visible:outline-0 focus-visible:border-(--c-600)",
				],
			},
			size: {
				xs: "px-(--spacing-2) py-(--spacing-1) text-xs leading-4 scroll-pb-(--spacing-1)",
				sm: "px-(--spacing-2_5) py-(--spacing-1_5) text-sm leading-5 scroll-pb-(--spacing-1_5)",
				md: "px-(--spacing-3) py-(--spacing-1_5) text-sm leading-5 scroll-pb-(--spacing-1_5)",
				lg: "px-(--spacing-4) py-(--spacing-2) text-sm leading-5 scroll-pb-(--spacing-2) rounded-(--radius-md)",
				xl: "px-(--spacing-5) py-(--spacing-3_5) text-sm leading-5 scroll-pb-(--spacing-3_5) rounded-(--radius-md)",
			},
			invalid: {
				true: [
					"border-(--color-border-error) focus-visible:border-(--color-border-error) focus-visible:outline-(--color-border-error) hover:border-(--color-border-error)",
					"dark:border-(--color-border-error) dark:focus-visible:border-(--color-border-error) dark:hover:border-(--color-border-error)",
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
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

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
		 * The colour theme of the textarea.
		 * @default "gray"
		 */
		colour?: ColourName;
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
		colour = "gray",
		class: className,
		invalid = false,
		disabled = false,
		value = $bindable(),
		resize,
		style,
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
		textarea({
			variant,
			size,
			invalid: isInvalid,
			class: className,
		}) as string,
	);

	const resizeClass = $derived(resize ? `resize-${resize}` : "");
	const styles = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<textarea
	{id}
	disabled={isDisabled}
	required={isRequired}
	readonly={isReadOnly}
	class={`${classes} ${resizeClass}`}
	style={styles}
	bind:value
	{...restProps}
></textarea>
