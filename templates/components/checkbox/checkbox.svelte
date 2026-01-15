<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import Check from "phosphor-svelte/lib/Check";
	import Minus from "phosphor-svelte/lib/Minus";
	import { type ColourName, generateColourVars } from "$saas/utils/colours";
	import { tv, type VariantProps } from "tailwind-variants";
	import { twMerge } from "tailwind-merge";
	import { getContext, hasContext } from "svelte";

	const checkboxControl = tv({
		base: [
			"flex items-center justify-center border shrink-0 p-(--spacing-0_5)",
			"rounded",
			"peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--c-600) peer-focus-visible:outline-solid",
			"antialiased",
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
				sm: "size-(--spacing-3_5)",
				md: "size-(--spacing-4)",
				lg: "size-(--spacing-5)",
			},
			checked: {
				true: "",
				false: "",
				indeterminate: "",
			},
			disabled: {
				true: "cursor-(--cursor-disabled) opacity-50",
			},
			invalid: {
				true: "border-(--color-border-error)! peer-focus-visible:outline-(--color-border-error)!",
			},
		},
		compoundVariants: [
			// SOLID - unchecked: gray border, white/transparent icon
			{
				variant: "solid",
				checked: false,
				class: "border-(--color-border-emphasized) text-(--c-contrast)",
			},
			// SOLID - checked: colored background and border, contrast text
			{
				variant: "solid",
				checked: [true, "indeterminate"],
				class: "bg-(--c-solid) border-(--c-solid) text-(--c-contrast)",
			},
			// SUBTLE - unchecked: light bg, light border, hidden icon
			{
				variant: "subtle",
				checked: false,
				class: "bg-(--c-50) border-(--c-300) text-(--c-contrast) dark:bg-(--c-950) dark:border-(--c-800)",
			},
			// SUBTLE - checked: light bg, light border, colored icon
			{
				variant: "subtle",
				checked: [true, "indeterminate"],
				class: "bg-(--c-50) border-(--c-300) text-(--c-700) dark:bg-(--c-950) dark:border-(--c-800) dark:text-(--c-300)",
			},
			// OUTLINE - unchecked: gray border, transparent bg
			{
				variant: "outline",
				checked: false,
				class: "border-(--color-border-emphasized) text-(--c-contrast)",
			},
			// OUTLINE - checked: colored border, colored icon
			{
				variant: "outline",
				checked: [true, "indeterminate"],
				class: "border-(--c-600) text-(--c-700) dark:text-(--c-300)",
			},
			// Invalid state when checked
			{
				invalid: true,
				checked: [true, "indeterminate"],
				class: "bg-(--color-border-error)! border-(--color-border-error)! text-(--color-fg-inverted)!",
			},
		],
		defaultVariants: {
			size: "md",
			checked: false,
			variant: "solid",
		},
	});

	const container = tv({
		base: "group inline-flex items-center gap-(--spacing-2_5) cursor-(--cursor-checkbox) select-none",
		variants: {
			disabled: {
				true: "cursor-(--cursor-disabled) opacity-60",
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
	const groupContext = getContext<any>("checkbox-group");

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

	const colourVars = $derived(generateColourVars(colour || "indigo"));

	const isChecked = $derived(
		checkedState === true || checkedState === "indeterminate",
	);

	const variantState = $derived(
		checkedState === "indeterminate" ? "indeterminate" : isChecked,
	);

	const iconSizeClass = {
		sm: "size-(--spacing-2_5)",
		md: "size-(--spacing-3)",
		lg: "size-(--spacing-3_5)",
	} as const;

	const iconClass = $derived(`${iconSizeClass[size || "md"]}`);

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
		container({ disabled: effectiveDisabled ? true : undefined }),
		className,
	)}
	style={colourVars}
>
	<div class="flex items-center shrink-0">
		<input
			bind:this={inputRef}
			type="checkbox"
			class="peer sr-only"
			checked={isChecked}
			onchange={handleChange}
			{value}
			disabled={effectiveDisabled}
			name={effectiveName}
			aria-invalid={effectiveInvalid}
			{...rest}
		/>
		<div
			class={checkboxControl({
				size,
				variant,
				checked: variantState,
				disabled: effectiveDisabled ? true : undefined,
				invalid: effectiveInvalid,
			})}
			aria-hidden="true"
		>
			{#if icon}
				{@render icon()}
			{:else if checkedState === "indeterminate"}
				<Minus class={iconClass} weight="bold" />
			{:else}
				<Check
					class={iconClass}
					weight="bold"
					style="opacity: {isChecked ? 1 : 0}"
				/>
			{/if}
		</div>
	</div>

	{#if label || children || description}
		<div class="flex flex-col">
			{#if label}
				<span
					class="text-(length:--font-sizes-sm) font-medium leading-(--line-heights-sm) text-(--color-fg-default) select-none"
				>
					{label}
				</span>
			{/if}
			{#if children}
				<div
					class="text-(length:--font-sizes-sm) leading-(--line-heights-sm) text-(--color-fg-default) select-none"
				>
					{@render children()}
				</div>
			{/if}
			{#if description}
				<p
					class="mt-(--spacing-1) text-(length:--font-sizes-sm) font-normal leading-(--line-heights-sm) text-(--color-fg-muted)"
				>
					{description}
				</p>
			{/if}
		</div>
	{/if}
</label>
