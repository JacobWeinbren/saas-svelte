<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const CHECKBOX_CTX = Symbol("CHECKBOX_CTX");

	export const checkbox = tv({
		slots: {
			root: "align-top items-center gap-x-2.5 inline-flex relative group",
			control: [
				"shrink-0",
				"justify-center",
				"items-center",
				"inline-flex",
				"p-0.5",
				"rounded",
				"border",
			],
			label: "select-none font-medium leading-5",
			indicator: "flex items-center justify-center",
		},
		variants: {
			size: {
				sm: {
					control: "w-3.5 h-3.5",
					label: "text-sm",
					indicator: "size-2.5",
				},
				md: {
					control: "w-4 h-4",
					label: "text-sm",
					indicator: "size-3",
				},
				lg: {
					control: "w-5 h-5",
					label: "text-sm",
					indicator: "size-3.5",
				},
			},
			variant: {
				solid: {},
				subtle: {},
				outline: {},
			},
			disabled: {
				true: {
					root: "opacity-50 cursor-not-allowed",
				},
			},
			invalid: {
				true: {
					control:
						"border-border-error! focus-visible:outline-border-error!",
				},
			},
		},
		defaultVariants: {
			size: "md",
			variant: "solid",
		},
	});

	export type CheckboxVariants = VariantProps<typeof checkbox>;

	export interface CheckboxContext {
		styles: ReturnType<typeof checkbox>;
		variant: CheckboxVariants["variant"];
		colour: string;
	}
</script>

<script lang="ts">
	import { Checkbox } from "@ark-ui/svelte/checkbox";
	import Check from "phosphor-svelte/lib/Check";
	import Minus from "phosphor-svelte/lib/Minus";
	import { type ColourName, getColourStyle } from "$saas/utils/colours";
	import { setContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";

	interface Props {
		/**
		 * Content to render inside the checkbox (composition API).
		 */
		children?: Snippet;
		/**
		 * The label text displayed next to the checkbox.
		 */
		label?: string;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
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
		 * The controlled checked state of the checkbox.
		 * @default false
		 */
		checked?: boolean | "indeterminate";
		/**
		 * The default checked state when uncontrolled.
		 */
		defaultChecked?: boolean;
		/**
		 * The value of the checkbox (used in groups).
		 */
		value?: string;
		/**
		 * The name of the input field.
		 */
		name?: string;
		/**
		 * Whether the checkbox is disabled.
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the checkbox is in an invalid state.
		 * @default false
		 */
		invalid?: boolean;
		/**
		 * Whether the checkbox is required.
		 * @default false
		 */
		required?: boolean;
		/**
		 * Custom icon snippet to render when checked.
		 */
		icon?: Snippet;
		/**
		 * Callback invoked when the checked state changes.
		 */
		onCheckedChange?: (details: {
			checked: boolean | "indeterminate";
		}) => void;
		[key: string]: any;
	}

	let {
		children,
		label,
		class: className,
		size = "md",
		variant = "solid",
		colour = "indigo",
		checked = $bindable(false),
		defaultChecked,
		value,
		name,
		disabled = false,
		invalid = false,
		required = false,
		icon,
		onCheckedChange,
		...restProps
	}: Props = $props();

	const classes = $derived(checkbox({ size, variant, disabled, invalid }));
	const colourVars = $derived(getColourStyle(colour || "indigo"));

	setContext<CheckboxContext>(CHECKBOX_CTX, {
		get styles() {
			return classes;
		},
		get variant() {
			return variant;
		},
		get colour() {
			return colour;
		},
	});

	function handleCheckedChange(details: {
		checked: boolean | "indeterminate";
	}) {
		checked = details.checked;
		onCheckedChange?.(details);
	}

	// Determine the control styling based on variant and checked state
	function getControlClasses(isChecked: boolean | "indeterminate") {
		const base = classes.control();
		const isActive = isChecked === true || isChecked === "indeterminate";

		if (invalid && isActive) {
			return twMerge(
				base,
				"bg-border-error! border-border-error! text-fg-inverted!",
			);
		}

		if (variant === "solid") {
			if (isActive) {
				return twMerge(
					base,
					"text-white bg-(--c-solid) border-(--c-solid)",
				);
			}
			return twMerge(base, "text-white border-border-emphasized");
		}

		if (variant === "subtle") {
			if (isActive) {
				return twMerge(
					base,
					"bg-(--c-subtle) border-(--c-muted) text-(--c-fg)",
				);
			}
			return twMerge(base, "text-white border-border-emphasized");
		}

		if (variant === "outline") {
			if (isActive) {
				return twMerge(base, "border-(--c-solid) text-(--c-fg)");
			}
			return twMerge(base, "text-white border-border-emphasized");
		}

		return base;
	}
</script>

<Checkbox.Root
	{checked}
	{defaultChecked}
	{value}
	{name}
	{disabled}
	{required}
	onCheckedChange={handleCheckedChange}
	class={twMerge(classes.root(), className)}
	style={colourVars}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<Checkbox.Control
			class="{getControlClasses(
				checked,
			)} group-has-data-focus:outline-offset-2 group-has-data-focus:outline-1 group-has-data-focus:outline-solid group-has-data-focus:outline-(--c-focus-ring)"
		>
			<Checkbox.Indicator class={classes.indicator()}>
				{#if icon}
					{@render icon()}
				{:else}
					<Check class="w-full h-full" weight="bold" />
				{/if}
			</Checkbox.Indicator>
			<Checkbox.Indicator indeterminate class={classes.indicator()}>
				<Minus class="w-full h-full" weight="bold" />
			</Checkbox.Indicator>
		</Checkbox.Control>
		{#if label}
			<Checkbox.Label class={classes.label()}>{label}</Checkbox.Label>
		{/if}
		<Checkbox.HiddenInput />
	{/if}
</Checkbox.Root>
