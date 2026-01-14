<script lang="ts">
	import type { HTMLLabelAttributes } from "svelte/elements";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	interface Props extends HTMLLabelAttributes {
		/**
		 * The ID of the form control this label is for.
		 */
		for?: string;
		/**
		 * Additional CSS classes to apply to the label.
		 */
		class?: string;
	}

	let {
		for: htmlFor,
		class: className,
		children,
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

	const fieldId = $derived(htmlFor || $fieldContext.id);
	const isDisabled = $derived($fieldContext.disabled);
</script>

<label
	for={fieldId}
	class={`flex items-center gap-(--spacing-1) select-none text-sm font-medium leading-5 antialiased ${isDisabled ? "opacity-50" : ""} ${className || ""}`}
	{...restProps}
>
	{@render children?.()}
</label>
