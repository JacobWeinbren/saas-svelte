<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLInputAttributes } from "svelte/elements";
	import { Check, Minus } from "@lucide/svelte";
	import { type ColorName, generateColorVars } from "$saas/utils/colours";

	const checkboxControl = tv({
		base: [
			"flex items-center justify-center border shrink-0",
			"rounded p-0.5",
			"focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-(--c-600) focus-visible:outline-solid",
			"dark:focus-visible:outline-(--c-500)",
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
				true: "cursor-not-allowed opacity-50 bg-gray-100 border-gray-200 dark:bg-zinc-800 dark:border-zinc-700",
			},
			invalid: {
				true: "border-red-500! focus-visible:outline-red-600! dark:border-red-500!",
			},
		},
		compoundVariants: [
			{
				variant: "solid",
				checked: [true, "indeterminate"],
				class: "bg-(--c-600) border-(--c-600) dark:bg-(--c-600) dark:border-(--c-600) text-white",
			},
			{
				variant: "subtle",
				checked: [true, "indeterminate"],
				class: [
					"bg-(--c-50) border-(--c-200) text-(--c-700)",
					"dark:bg-(--c-950) dark:border-(--c-800) dark:text-(--c-300)",
				],
			},
			{
				variant: "outline",
				checked: [true, "indeterminate"],
				class: [
					"bg-transparent border-(--c-600) text-(--c-700)",
					"dark:border-(--c-500) dark:text-(--c-300)",
				],
			},
		],
		defaultVariants: {
			size: "md",
			checked: false,
			variant: "solid",
		},
	});

	const container = tv({
		base: "group inline-flex items-start gap-2.5 cursor-pointer select-none",
		variants: {
			disabled: {
				true: "cursor-not-allowed opacity-60",
			},
		},
	});

	type CheckboxVariants = VariantProps<typeof checkboxControl>;

	interface Props
		extends Omit<HTMLInputAttributes, "size" | "checked" | "value"> {
		checked?: boolean | "indeterminate";
		group?: string[];
		value?: string;
		size?: CheckboxVariants["size"];
		variant?: CheckboxVariants["variant"];
		color?: ColorName;
		label?: string;
		description?: string;
		invalid?: boolean;
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

	const iconBaseClass = "w-full h-full pointer-events-none stroke-[4px]";

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
	<input
		bind:this={inputRef}
		type="checkbox"
		class="sr-only"
		checked={isChecked}
		onchange={handleChange}
		{value}
		{disabled}
		{...rest}
	/>

	<div class="flex items-center mt-px shrink-0">
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
			{#if checked === "indeterminate"}
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
					class="font-medium text-[13px] leading-[1.4] text-gray-900 dark:text-gray-50"
				>
					{label}
				</span>
			{/if}
			{#if children}
				<div
					class="text-[13px] leading-[1.4] text-gray-900 dark:text-gray-50"
				>
					{@render children()}
				</div>
			{/if}
			{#if description}
				<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
					{description}
				</p>
			{/if}
		</div>
	{/if}
</label>
