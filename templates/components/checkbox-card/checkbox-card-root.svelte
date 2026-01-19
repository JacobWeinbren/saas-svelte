<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const CHECKBOX_CARD_CTX = Symbol("CHECKBOX_CARD_CTX");

	export const checkboxCardRoot = tv({
		base: [
			"select-none flex-col flex-1 text-sm leading-5 flex relative rounded-md",
			"cursor-(--cursor-checkbox)",
			"antialiased",
			"has-focus-visible:outline-1 has-focus-visible:outline-offset-2 has-focus-visible:outline-(--c-focus-ring) has-focus-visible:outline-solid",
		],
		variants: {
			variant: {
				subtle: "bg-bg-subtle",
				surface: "border border-border-default",
				outline: "border border-border-default",
			},
			size: {
				sm: "",
				md: "",
				lg: "",
			},
			checked: {
				true: "",
				false: "",
			},
			disabled: {
				true: "opacity-80 cursor-(--cursor-disabled)",
				false: "",
			},
		},
		compoundVariants: [
			// Subtle - checked: darker colored background
			{
				variant: "subtle",
				checked: true,
				class: "text-(--c-fg) bg-(--c-muted)",
			},
			// Surface - checked: lighter colored background with colored border + inset shadow for 2px effect
			{
				variant: "surface",
				checked: true,
				class: "text-(--c-fg) bg-(--c-subtle) border-(--c-subtle) shadow-[inset_0_0_0_1px_var(--c-subtle)]",
			},
			// Outline - checked: just colored border, no background fill + inset shadow for 2px effect
			{
				variant: "outline",
				checked: true,
				class: "shadow-[inset_0_0_0_1px_var(--c-solid)] border-(--c-solid)",
			},
			// Disabled states
			{
				disabled: true,
				variant: "outline",
				class: "border-border-default",
			},
			{
				disabled: true,
				variant: "surface",
				class: "bg-bg-subtle border-border-default",
			},
		],
		defaultVariants: {
			variant: "outline",
			size: "md",
			checked: false,
			disabled: false,
		},
	});

	export type CheckboxCardVariants = VariantProps<typeof checkboxCardRoot>;
</script>

<script lang="ts">
	import type { HTMLLabelAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { setContext } from "svelte";
	import { type ColourName, getColourStyle } from "$saas/utils/colours";

	interface Props extends Omit<HTMLLabelAttributes, "class"> {
		/**
		 * The controlled checked state of the checkbox card.
		 * @default false
		 */
		checked?: boolean;
		/**
		 * The value of the checkbox card.
		 */
		value?: string;
		/**
		 * The visual style variant.
		 * @default "outline"
		 */
		variant?: CheckboxCardVariants["variant"];
		/**
		 * The size of the checkbox card.
		 * @default "md"
		 */
		size?: CheckboxCardVariants["size"];
		/**
		 * The colour palette of the checkbox card.
		 * @default "indigo"
		 */
		colour?: ColourName;
		/**
		 * Whether the checkbox card is disabled.
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * The content of the checkbox card.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Callback invoked when the checked state changes.
		 */
		onCheckedChange?: (details: { checked: boolean }) => void;
	}

	let {
		checked = $bindable(false),
		value,
		variant = "outline",
		size = "md",
		colour = "indigo",
		disabled = false,
		children,
		class: className,
		onCheckedChange,
		...restProps
	}: Props = $props();

	const colourVars = $derived(getColourStyle(colour || "indigo"));

	// Context state with getters for reactivity
	const contextState = $state({
		get checked() {
			return checked;
		},
		get variant() {
			return variant;
		},
		get size() {
			return size;
		},
		get disabled() {
			return disabled;
		},
		get colour() {
			return colour;
		},
	});

	// Update context when props change
	$effect(() => {
		contextState.checked;
		contextState.variant;
		contextState.size;
		contextState.disabled;
		contextState.colour;
	});

	setContext(CHECKBOX_CARD_CTX, contextState);

	function handleChange(e: Event) {
		if (disabled) return;
		const target = e.currentTarget as HTMLInputElement;
		checked = target.checked;
		onCheckedChange?.({ checked: target.checked });
	}

	const finalClass = $derived(
		checkboxCardRoot({
			variant,
			size,
			checked,
			disabled,
			class: className,
		}),
	);
</script>

<label class={finalClass} style={colourVars} {...restProps}>
	<input
		type="checkbox"
		class="sr-only peer"
		{checked}
		{value}
		{disabled}
		onchange={handleChange}
	/>
	{@render children()}
</label>
