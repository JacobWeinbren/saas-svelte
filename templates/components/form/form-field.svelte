<script lang="ts">
	import type { Snippet } from "svelte";
	import { getContext } from "svelte";
	import {
		FieldRoot,
		FieldLabel,
		FieldHelperText,
		FieldErrorText,
	} from "../field";
	import { Input } from "../input";
	import { Textarea } from "../textarea";
	import { NativeSelect } from "../native-select";
	import { Checkbox } from "../checkbox";
	import { Radio } from "../radio";
	import { NumberInput } from "../number-input";
	import { PasswordInput } from "../password-input";
	import type { FormApi } from "./use-form.svelte";
	import type { FieldType, FieldOption } from "./types";
	import { FORM_CTX } from "./types";

	interface Props {
		name: string;
		type?: FieldType;
		label?: string;
		placeholder?: string;
		helperText?: string;
		required?: boolean;
		disabled?: boolean;
		options?: FieldOption[];
		min?: number;
		max?: number;
		step?: number;
		class?: string;
		children?: Snippet<
			[
				{
					value: unknown;
					error: string | undefined;
					onChange: (value: unknown) => void;
					onBlur: () => void;
				},
			]
		>;
	}

	let {
		name,
		type = "text",
		label,
		placeholder,
		helperText,
		required = false,
		disabled = false,
		options = [],
		min,
		max,
		step,
		class: className,
		children,
	}: Props = $props();

	const form = getContext<FormApi>(FORM_CTX);
	const value = $derived(form.getValue(name));
	const error = $derived(form.getError(name));

	const onChange = (v: unknown) => form.setValue(name, v);
	const onBlur = () => form.setTouched(name);
	const onInput = (e: Event) =>
		onChange(
			type === "number"
				? Number((e.target as HTMLInputElement).value)
				: (e.target as HTMLInputElement).value,
		);
</script>

<FieldRoot invalid={!!error} {required} {disabled} class={className}>
	{#if label && type !== "checkbox" && type !== "radio"}
		<FieldLabel
			>{label}{#if required}<span class="text-fg-error">*</span
				>{/if}</FieldLabel
		>
	{/if}

	{#if children}
		{@render children({ value, error, onChange, onBlur })}
	{:else if type === "textarea"}
		<Textarea
			value={value as string}
			{placeholder}
			{disabled}
			{required}
			invalid={!!error}
			oninput={onInput}
			onblur={onBlur}
		/>
	{:else if type === "select"}
		<NativeSelect
			value={value as string}
			{disabled}
			{required}
			invalid={!!error}
			onchange={(e) => onChange((e.target as HTMLSelectElement).value)}
			onblur={onBlur}
		>
			{#if placeholder}<option value="" disabled>{placeholder}</option
				>{/if}
			{#each options as opt}
				<option value={opt.value} disabled={opt.disabled}
					>{opt.label}</option
				>
			{/each}
		</NativeSelect>
	{:else if type === "checkbox"}
		<Checkbox.Root
			checked={value as boolean}
			{disabled}
			{required}
			invalid={!!error}
			onCheckedChange={(details) => onChange(details.checked)}
			{label}
		/>
	{:else if type === "radio"}
		<Radio.Group
			value={value as string}
			{disabled}
			invalid={!!error}
			onValueChange={(details) => onChange(details.value)}
		>
			{#if label}
				<Radio.Label
					>{label}{#if required}<span class="text-fg-error">*</span
						>{/if}</Radio.Label
				>
			{/if}
			{#each options as opt}
				<Radio.Item
					value={opt.value}
					label={opt.label}
					disabled={opt.disabled}
				/>
			{/each}
		</Radio.Group>
	{:else if type === "number-input"}
		<NumberInput
			value={value != null ? String(value) : undefined}
			{placeholder}
			{disabled}
			{required}
			{min}
			{max}
			{step}
			invalid={!!error}
			aria-label={label}
			onValueChange={(details) => onChange(details.valueAsNumber)}
		/>
	{:else if type === "password"}
		<PasswordInput
			value={value as string}
			{placeholder}
			{disabled}
			invalid={!!error}
			oninput={onInput}
			onblur={onBlur}
		/>
	{:else}
		<Input
			{type}
			value={value as string}
			{placeholder}
			{disabled}
			{required}
			invalid={!!error}
			oninput={onInput}
			onblur={onBlur}
		/>
	{/if}

	{#if error}
		<FieldErrorText>{error}</FieldErrorText>
	{:else if helperText}
		<FieldHelperText>{helperText}</FieldHelperText>
	{/if}
</FieldRoot>
