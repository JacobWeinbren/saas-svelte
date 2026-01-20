<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import { twMerge } from "tailwind-merge";
	import type { Snippet } from "svelte";
	import Check from "phosphor-svelte/lib/Check";
	import Minus from "phosphor-svelte/lib/Minus";
	import { setContext } from "svelte";
	import { type ColourName, getColourStyle } from "$saas/utils/colours";

	const checkboxGroup = tv({
		base: "flex antialiased",
		variants: {
			orientation: {
				horizontal: "flex-row gap-6",
				vertical: "flex-col gap-1.5",
			},
		},
		defaultVariants: {
			orientation: "vertical",
		},
	});

	type Variants = VariantProps<typeof checkboxGroup>;

	interface Props {
		/**
		 * The layout orientation of the group.
		 * @default "vertical"
		 */
		orientation?: Variants["orientation"];
		/**
		 * The label displayed above the group.
		 */
		label?: string;
		/**
		 * The controlled value of the checkbox group.
		 */
		value?: string[];
		/**
		 * The default value of the checkbox group when uncontrolled.
		 */
		defaultValue?: string[];
		/**
		 * All possible values for select-all functionality.
		 * When provided with selectAllLabel, enables an indeterminate parent checkbox.
		 */
		allValues?: string[];
		/**
		 * Label for the select-all checkbox.
		 * When provided with allValues, displays a parent checkbox that controls all children.
		 */
		selectAllLabel?: string;
		/**
		 * The name of the input fields in the checkbox group (Useful for form submission).
		 */
		name?: string;
		/**
		 * Whether the checkbox group is disabled.
		 */
		disabled?: boolean;
		/**
		 * Whether the checkbox group is read-only.
		 */
		readOnly?: boolean;
		/**
		 * Whether the checkbox group is invalid.
		 */
		invalid?: boolean;
		/**
		 * The colour palette for the select-all checkbox.
		 * @default "indigo"
		 */
		colour?: ColourName;
		/**
		 * Callback invoked when the value changes.
		 */
		onValueChange?: (value: string[]) => void;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Content to render inside the group.
		 */
		children?: Snippet;
	}

	let {
		orientation = "vertical",
		label,
		value = $bindable([]),
		defaultValue,
		allValues,
		selectAllLabel,
		name,
		disabled,
		readOnly,
		invalid,
		colour = "indigo",
		onValueChange,
		class: className,
		children,
		...rest
	}: Props = $props();

	const colourVars = $derived(getColourStyle(colour || "indigo"));

	// Initialize value with defaultValue if provided
	if (defaultValue && value.length === 0) {
		value = [...defaultValue];
	}

	const allChecked = $derived(
		allValues && value && value.length === allValues.length,
	);
	const isIndeterminate = $derived(
		allValues &&
			value &&
			value.length > 0 &&
			value.length < allValues.length,
	);

	function toggleValue(checkboxValue: string) {
		if (readOnly || disabled) return;

		const newValue = value.includes(checkboxValue)
			? value.filter((v) => v !== checkboxValue)
			: [...value, checkboxValue];

		value = newValue;
		onValueChange?.(newValue);
	}

	setContext("checkbox-group", {
		get value() {
			return value;
		},
		get name() {
			return name;
		},
		get disabled() {
			return disabled;
		},
		get invalid() {
			return invalid;
		},
		toggleValue,
	});

	function handleSelectAll() {
		if (readOnly || disabled || !allValues) return;
		const newValue = allChecked ? [] : [...allValues];
		value = newValue;
		onValueChange?.(newValue);
	}
</script>

{#if selectAllLabel && allValues}
	<div class="flex flex-col gap-2" style={colourVars}>
		<div
			role="button"
			tabindex="0"
			class="group inline-flex items-center gap-2.5 cursor-default select-none"
			onclick={handleSelectAll}
			onkeydown={(e) => {
				if (e.key === " " || e.key === "Enter") {
					e.preventDefault();
					handleSelectAll();
				}
			}}
		>
			<div class="flex items-center shrink-0">
				<div
					class="flex items-center justify-center border shrink-0 p-0.5 rounded-l1 size-4 {isIndeterminate ||
					allChecked
						? 'bg-(--c-solid) border-(--c-solid) text-(--c-contrast)'
						: 'border-border-emphasized text-(--c-contrast)'}"
				>
					{#if isIndeterminate}
						<Minus
							class="size-3"
							weight="bold"
							aria-hidden="true"
						/>
					{:else if allChecked}
						<Check
							class="size-3"
							weight="bold"
							aria-hidden="true"
						/>
					{/if}
				</div>
			</div>
			<span
				class="text-sm font-medium leading-sm text-fg-default"
			>
				{selectAllLabel}
			</span>
		</div>
		<div
			class={twMerge(checkboxGroup({ orientation }), "ps-6", className)}
			{...rest}
		>
			{#if label}
				<span
					class="mb-2 text-sm font-medium leading-sm text-fg-default"
				>
					{label}
				</span>
			{/if}
			{@render children?.()}
		</div>
	</div>
{:else}
	<div class={twMerge(checkboxGroup({ orientation }), className)} {...rest}>
		{#if label}
			<span
				class="mb-2 text-sm font-medium leading-sm text-fg-default"
			>
				{label}
			</span>
		{/if}
		{@render children?.()}
	</div>
{/if}
