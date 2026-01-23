<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import Check from "phosphor-svelte/lib/Check";
	import Minus from "phosphor-svelte/lib/Minus";
	import { type ColourName, getColourStyle } from "$saas/utils/colours";
	import { tv, type VariantProps } from "tailwind-variants";
	import { twMerge } from "tailwind-merge";
	import { getContext } from "svelte";
	import {
		CHECKBOX_GROUP_CTX,
		type CheckboxGroupContext,
	} from "./checkbox-group.svelte";

	const checkboxControl = tv({
		base: [
			"shrink-0",
			"justify-center",
			"items-center",
			"inline-flex",
			"p-0.5",
			"rounded",
			"border",
			"disabled:opacity-50",
		],
		variants: {
			variant: {
				// SOLID: Filled background when checked, uses contrast text
				solid: "",
				// SUBTLE: Light background with border
				subtle: "",
				// OUTLINE: Border only, transparent background
				outline: "",
			},
			size: {
				sm: "w-3.5 h-3.5",
				md: "w-4 h-4",
				lg: "w-5 h-5",
			},
			checked: {
				true: "",
				false: "",
				indeterminate: "",
			},
			disabled: {
				true: "opacity-50",
			},
			invalid: {
				true: "border-border-error! focus-visible:outline-border-error!",
			},
		},
		compoundVariants: [
			// SOLID - unchecked: gray border, white text (hidden)
			{
				variant: "solid",
				checked: false,
				class: "text-white border-border-default",
			},
			// SOLID - checked: colored background and border, white text
			{
				variant: "solid",
				checked: [true, "indeterminate"],
				class: "text-white bg-(--c-solid) border-(--c-solid)",
			},
			// SUBTLE - unchecked: gray border (same as solid unchecked)
			{
				variant: "subtle",
				checked: false,
				class: "text-white border-border-default",
			},
			// SUBTLE - checked: light bg, light border, colored text
			{
				variant: "subtle",
				checked: [true, "indeterminate"],
				class: "bg-(--c-subtle) border-(--c-muted) text-(--c-fg)",
			},
			// OUTLINE - unchecked: gray border
			{
				variant: "outline",
				checked: false,
				class: "text-white border-border-default",
			},
			// OUTLINE - checked: colored border, colored text
			{
				variant: "outline",
				checked: [true, "indeterminate"],
				class: "border-(--c-solid) text-(--c-fg)",
			},
			// Invalid state when checked
			{
				invalid: true,
				checked: [true, "indeterminate"],
				class: "bg-border-error! border-border-error! text-fg-inverted!",
			},
		],
		defaultVariants: {
			size: "md",
			checked: false,
			variant: "solid",
		},
	});

	const container = tv({
		base: "align-top items-center gap-y-2.5 gap-x-2.5 inline-flex relative",
		variants: {
			disabled: {
				true: "opacity-50",
			},
		},
	});

	type CheckboxVariants = VariantProps<typeof checkboxControl>;

	interface Props
		extends Omit<HTMLInputAttributes, "size" | "checked" | "value"> {
		/**
		 * The controlled checked state of the checkbox.
		 * @default false
		 */
		checked?: boolean | "indeterminate";
		/**
		 * The value of the checkbox.
		 */
		value?: string;
		/**
		 * The size of the checkbox.
		 * @default "md"
		 */
		size?: CheckboxVariants["size"];
		/**
		 * The visual style of the checkbox.
		 * @default "solid"
		 */
		variant?: CheckboxVariants["variant"];
		/**
		 * The colour palette of the checkbox.
		 * @default "indigo"
		 */
		colour?: ColourName;
		/**
		 * The label text displayed next to the checkbox.
		 */
		label?: string;
		/**
		 * Additional description text displayed below the label.
		 */
		description?: string;
		/**
		 * Whether the checkbox is in an invalid state.
		 * @default false
		 */
		invalid?: boolean;
		/**
		 * Custom icon snippet to render when checked.
		 */
		icon?: Snippet;
		/**
		 * Content to render inside the checkbox label area.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Callback invoked when the checked state changes.
		 */
		onCheckedChange?: (details: {
			checked: boolean | "indeterminate";
		}) => void;
	}

	let {
		checked = $bindable(false),
		value,
		size = "md",
		variant = "solid",
		colour = "indigo",
		label,
		description,
		class: className,
		children,
		disabled,
		invalid = false,
		icon,
		onCheckedChange,
		name,
		...rest
	}: Props = $props();

	// Get checkbox group context if it exists
	const groupContext = getContext<CheckboxGroupContext>(CHECKBOX_GROUP_CTX);

	// Use group values if in a group, otherwise use props
	const effectiveDisabled = $derived(disabled || groupContext?.disabled);
	const effectiveInvalid = $derived(invalid || groupContext?.invalid);
	const effectiveName = $derived(name ?? groupContext?.name);

	// Derive checked state from group if in a group
	const isInGroup = $derived(!!groupContext && !!value);
	const checkedState = $derived.by(() => {
		if (isInGroup) {
			return groupContext.value.includes(value);
		}
		return checked;
	});

	const colourVars = $derived(getColourStyle(colour || "indigo"));

	const isChecked = $derived(
		checkedState === true || checkedState === "indeterminate",
	);

	const variantState = $derived(
		checkedState === "indeterminate" ? "indeterminate" : isChecked,
	);

	const iconSizeClass = {
		sm: "size-2.5",
		md: "size-3",
		lg: "size-3.5",
	} as const;

	const iconClass = $derived(iconSizeClass[size || "md"]);

	function handleChange(e: Event) {
		const target = e.currentTarget as HTMLInputElement;

		if (isInGroup) {
			// In a group, use the toggle function
			groupContext.toggleValue(value);
		} else {
			// Standalone checkbox
			// If it was indeterminate, clicking makes it checked
			const wasIndeterminate = checked === "indeterminate";
			if (wasIndeterminate) {
				checked = true;
				onCheckedChange?.({ checked: true });
			} else {
				checked = target.checked;
				onCheckedChange?.({ checked: target.checked });
			}
		}
	}

	let inputRef: HTMLInputElement | undefined = $state();

	$effect(() => {
		if (inputRef) {
			inputRef.indeterminate = checkedState === "indeterminate";
		}
	});
</script>

<label
	class={twMerge(
		"group",
		container({ disabled: effectiveDisabled ? true : undefined }),
		className,
	)}
	style={colourVars}
>
	<input
		bind:this={inputRef}
		type="checkbox"
		class="peer [clip:rect(0_0_0_0)] whitespace-nowrap [word-wrap:normal] w-px h-px absolute overflow-x-hidden overflow-y-hidden -m-px border-0"
		checked={isChecked}
		onchange={handleChange}
		{value}
		disabled={effectiveDisabled}
		name={effectiveName}
		aria-invalid={effectiveInvalid}
		{...rest}
	/>
	<div
		class="{checkboxControl({
			size,
			variant,
			checked: variantState,
			disabled: effectiveDisabled ? true : undefined,
			invalid: effectiveInvalid,
		})} group-has-focus-visible:outline-offset-2 group-has-focus-visible:outline-1 group-has-focus-visible:outline-solid group-has-focus-visible:outline-(--c-focus-ring)"
		aria-hidden="true"
	>
		{#if icon}
			{@render icon()}
		{:else if checkedState === "indeterminate"}
			<Minus class={iconClass} weight="bold" aria-hidden="true" />
		{:else}
			<Check
				class={iconClass}
				weight="bold"
				style="opacity: {isChecked ? 1 : 0};"
				aria-hidden="true"
			/>
		{/if}
	</div>

	{#if label || children}
		<span class="select-none text-sm font-medium leading-5 disabled:opacity-50">
			{#if label}
				{label}
			{/if}
			{#if children}
				{@render children()}
			{/if}
		</span>
	{/if}
	{#if description}
		<p class="text-sm font-normal leading-5 text-fg-muted">
			{description}
		</p>
	{/if}
</label>
