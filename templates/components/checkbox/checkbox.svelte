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
			"flex items-center justify-center border shrink-0 p-0.5",
			"rounded",
			"peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--c-600) peer-focus-visible:outline-solid",
			"text-zinc-50",
			"border-gray-300 dark:border-zinc-700",
			"antialiased",
		],
		variants: {
			variant: {
				solid: "",
				subtle: "",
				outline: "",
			},
			size: {
				sm: "size-3.5",
				md: "size-4",
				lg: "size-5",
			},
			checked: {
				true: "",
				false: "",
				indeterminate: "",
			},
			disabled: {
				true: "cursor-not-allowed opacity-50",
			},
			invalid: {
				true: "border-red-500! peer-focus-visible:outline-red-600! dark:border-red-500!",
			},
		},
		compoundVariants: [
			{
				variant: "solid",
				checked: [true, "indeterminate"],
				class: "bg-(--c-600) border-(--c-600) text-zinc-50 dark:bg-(--c-600) dark:border-(--c-600) dark:text-zinc-50",
			},
			{
				variant: "subtle",
				checked: false,
				class: "bg-(--c-50) border-(--c-200) text-zinc-50 dark:bg-(--c-950) dark:border-(--c-800) dark:text-zinc-50",
			},
			{
				variant: "subtle",
				checked: [true, "indeterminate"],
				class: "bg-(--c-50) border-(--c-200) text-(--c-700) dark:bg-(--c-950) dark:border-(--c-800) dark:text-(--c-300)",
			},
			{
				variant: "outline",
				checked: [true, "indeterminate"],
				class: "border-(--c-600) text-(--c-700) dark:border-(--c-600) dark:text-(--c-300)",
			},
			{
				invalid: true,
				checked: [true, "indeterminate"],
				class: "bg-red-600! border-red-600! text-zinc-50! dark:bg-red-600! dark:border-red-600! dark:text-zinc-50!",
			},
		],
		defaultVariants: {
			size: "md",
			checked: false,
			variant: "solid",
		},
	});

	const container = tv({
		base: "group inline-flex items-center gap-2.5 cursor-pointer select-none",
		variants: {
			disabled: {
				true: "cursor-not-allowed opacity-60",
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
		sm: "size-2.5",
		md: "size-3",
		lg: "size-3.5",
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
					class="text-sm font-medium leading-5 text-gray-900 select-none dark:text-gray-50"
				>
					{label}
				</span>
			{/if}
			{#if children}
				<div
					class="text-sm leading-5 text-gray-900 select-none dark:text-gray-50"
				>
					{@render children()}
				</div>
			{/if}
			{#if description}
				<p
					class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400"
				>
					{description}
				</p>
			{/if}
		</div>
	{/if}
</label>
