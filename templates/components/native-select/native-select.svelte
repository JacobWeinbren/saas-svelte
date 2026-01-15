<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import { generateColourVars, type ColourName } from "$saas/utils/colours";

	export const nativeSelect = tv({
		base: [
			// Core Layout
			"appearance-none outline-0 w-full relative",
			"rounded border select-none",
			"[&_option]:bg-inherit",

			// Text
			"antialiased",

			// Disabled
			"disabled:opacity-50 disabled:cursor-(--cursor-disabled)",

			// Focus - uses colour focus ring
			"focus-visible:outline-solid focus-visible:outline-(--c-focus-ring) focus-visible:border-(--c-focus-ring)",
		],
		variants: {
			variant: {
				outline: [
					"bg-transparent",
					"border-(--color-border-default)",
					"enabled:hover:border-(--color-border-emphasized)",
					"enabled:hover:focus-visible:border-(--c-focus-ring)",
				],
				subtle: [
					"border-transparent",
					"bg-(--color-bg-subtle)",
				],
				plain: [
					"border-0 bg-transparent",
					"text-(--color-fg-default)",
					"focus-visible:outline-2",
				],
			},
			size: {
				xs: "h-(--spacing-6) pl-(--spacing-2) pr-(--spacing-6) text-(length:--font-sizes-xs) leading-(--line-heights-xs)",
				sm: "h-(--spacing-8) pl-(--spacing-2_5) pr-(--spacing-8) text-(length:--font-sizes-sm) leading-(--line-heights-sm)",
				md: "h-(--spacing-10) pl-(--spacing-3) pr-(--spacing-8) text-(length:--font-sizes-sm) leading-(--line-heights-sm)",
				lg: "h-(--spacing-11) pl-(--spacing-4) pr-(--spacing-8) text-(length:--font-sizes-sm) leading-(--line-heights-sm)",
				xl: "h-(--spacing-12) pl-(--spacing-5) pr-(--spacing-10) text-(length:--font-sizes-sm) leading-(--line-heights-sm)",
			},
			invalid: {
				true: [
					"border-(--color-border-error)!",
					"focus-visible:border-(--color-border-error)! focus-visible:outline-(--color-border-error)!",
					"enabled:hover:border-(--color-border-emphasized)",
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
