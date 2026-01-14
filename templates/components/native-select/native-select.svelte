<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import { generateColourVars, type ColourName } from "$saas/utils/colours";

	export const nativeSelect = tv({
		base: [
			// Core Layout
			"appearance-none outline-0 w-full relative",
			"rounded border select-none",
			"[&_option]:bg-inherit",

			// Text & Placeholder
			"text-sm leading-5 antialiased",

			// Disabled
			"disabled:opacity-50 disabled:cursor-(--cursor-disabled)",

			// Focus (Global)
			"focus-visible:outline-solid focus-visible:outline-(--c-600) focus-visible:border-(--c-600)",
			"dark:focus-visible:outline-(--c-500) dark:focus-visible:border-(--c-500)",
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
				plain: [
					"border-0 bg-transparent",
					// Light
					"text-(--color-fg-default)",
					// Dark
					"dark:text-(--color-fg-default)",
					"focus-visible:outline-2",
				],
			},
			size: {
				xs: "h-(--spacing-6) pl-(--spacing-2) pr-(--spacing-6) text-xs leading-4",
				sm: "h-(--spacing-8) pl-(--spacing-2_5) pr-(--spacing-8) text-sm leading-5",
				md: "h-(--spacing-10) pl-(--spacing-3) pr-(--spacing-8) text-sm leading-5",
				lg: "h-(--spacing-11) pl-(--spacing-4) pr-(--spacing-8) text-sm leading-5",
				xl: "h-(--spacing-12) pl-(--spacing-5) pr-(--spacing-10) text-sm leading-5",
			},
			invalid: {
				true: [
					"border-(--color-border-error) focus-visible:border-(--color-border-error) focus-visible:outline-(--color-border-error) hover:border-(--color-border-emphasized)",
					"dark:border-(--color-border-error) dark:focus-visible:border-(--color-border-error) dark:hover:border-(--color-border-emphasized)",
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
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

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
		 * The colour theme of the select.
		 * @default "gray"
		 */
		colour?: ColourName;
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
		colour = "gray",
		class: className,
		invalid = false,
		disabled = false,
		value = $bindable(),
		children,
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
	const id = $derived(restProps.id || fieldState.id);

	const classes = $derived(
		nativeSelect({
			variant,
			size,
			invalid: isInvalid,
			class: className,
		}) as string,
	);

	const styles = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<select
	{id}
	disabled={isDisabled}
	required={isRequired}
	class={classes}
	style={styles}
	bind:value
	{...restProps}
>
	{@render children?.()}
</select>
