<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLInputAttributes } from "svelte/elements";
	import { Check, Minus } from "@lucide/svelte";
	import { type ColorName, generateColorVars } from "$saas/utils/colours";
	import type { Snippet } from "svelte";

	const checkboxControl = tv({
		base: [
			"flex items-center justify-center border shrink-0",
			"rounded", // Removed p-0.5 to allow precise icon sizing
			"peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--c-600) peer-focus-visible:outline-solid",
			"dark:peer-focus-visible:outline-(--c-500)",
			"bg-white border-gray-300 text-white",
			"dark:bg-zinc-950 dark:border-zinc-700",
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
				md: "size-4", // 16px
				lg: "size-5",
			},
			checked: {
				true: "",
				false: "group-hover:border-(--c-500) dark:group-hover:border-(--c-500)",
				indeterminate: "",
			},
			disabled: {
				true: "cursor-not-allowed opacity-50 bg-gray-100 border-gray-200 dark:bg-zinc-800 dark:border-zinc-700!",
			},
			invalid: {
				true: "border-red-500! peer-focus-visible:outline-red-600! dark:border-red-500!",
			},
		},
		compoundVariants: [
			// Solid: Default styling
			{
				variant: "solid",
				checked: [true, "indeterminate"],
				class: "bg-(--c-600) border-(--c-600) dark:bg-(--c-600) dark:border-(--c-600) text-white",
			},
			// Subtle: Background persists even when unchecked
			{
				variant: "subtle",
				checked: false,
				class: [
					"bg-(--c-50) border-(--c-200) text-transparent",
					"dark:bg-(--c-900)/50 dark:border-(--c-800)",
				],
			},
			{
				variant: "subtle",
				checked: [true, "indeterminate"],
				class: [
					"bg-(--c-50) border-(--c-200) text-(--c-700)",
					"dark:bg-(--c-950) dark:border-(--c-800) dark:text-(--c-300)",
				],
			},
			// Outline: Transparent background
			{
				variant: "outline",
				checked: [true, "indeterminate"],
				class: [
					"bg-transparent border-(--c-600) text-(--c-700)",
					"dark:border-(--c-500) dark:text-(--c-300)",
				],
			},
			// Invalid + Checked: Must be Red, not theme color
			{
				invalid: true,
				checked: [true, "indeterminate"],
				class: "bg-red-600! border-red-600! text-white! dark:bg-red-600! dark:border-red-600!",
			},
		],
		defaultVariants: {
			size: "md",
			checked: false,
			variant: "solid",
		},
	});

	const container = tv({
		base: "group inline-flex items-start gap-2.5 cursor-pointer select-none align-top",
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
		 * Group context value.
		 */
		group?: string[];
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
		 * The color palette of the checkbox.
		 * @default "indigo"
		 */
		color?: ColorName;
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
	}

	let {
		checked = $bindable(false),
		group = $bindable(),
		value,
		size = "md",
		variant = "solid",
		color = "indigo",
		label,
		description,
		class: className,
		children,
		disabled,
		invalid = false,
		style,
		icon,
		...rest
	}: Props = $props();

	const colorVars = $derived(generateColorVars(color || "indigo"));
	const finalStyle = $derived([colorVars, style].filter(Boolean).join("; "));

	let inputRef: HTMLInputElement | undefined = $state();

	$effect(() => {
		if (inputRef) {
			inputRef.indeterminate = checked === "indeterminate";
		}
	});

	let isChecked = $derived.by(() => {
		if (group && value) {
			return group.includes(value);
		}
		return checked === true || checked === "indeterminate";
	});

	const variantState = $derived(
		checked === "indeterminate" ? "indeterminate" : isChecked,
	);

	// Map icon sizes:
	// sm: 10px (size-2.5)
	// md: 12px (size-3) -> This matches 16px container - 2px padding
	// lg: 16px (size-4)
	const iconSizes = {
		sm: "size-2.5 stroke-[3px]",
		md: "size-3 stroke-[4px]",
		lg: "size-4 stroke-[4px]",
	} as const;

	const iconBaseClass = $derived(
		`${iconSizes[size || "md"]} pointer-events-none`,
	);

	const checkIconClass = $derived(
		`${iconBaseClass} transition-opacity duration-200 ${isChecked ? "opacity-100" : "opacity-0"}`,
	);

	function handleChange(e: Event) {
		const target = e.currentTarget as HTMLInputElement;

		if (group && value) {
			if (target.checked) {
				group = [...group, value];
			} else {
				group = group.filter((v) => v !== value);
			}
		} else {
			checked = target.checked;
		}
	}
</script>

<label
	class={container({
		disabled: disabled ?? undefined,
		class: className as string,
	})}
	style={finalStyle}
>
	<div class="flex items-center mt-0.5 shrink-0">
		<input
			bind:this={inputRef}
			type="checkbox"
			class="peer sr-only"
			checked={isChecked}
			onchange={handleChange}
			{value}
			{disabled}
			aria-invalid={invalid}
			{...rest}
		/>
		<div
			class={checkboxControl({
				size,
				variant,
				checked: variantState,
				disabled: disabled ?? undefined,
				invalid,
			})}
			aria-hidden="true"
		>
			{#if icon}
				{@render icon()}
			{:else if checked === "indeterminate"}
				<Minus class={iconBaseClass} />
			{:else}
				<Check class={checkIconClass} />
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
