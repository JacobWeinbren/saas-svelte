<script lang="ts">
	import type { HTMLLabelAttributes } from "svelte/elements";
	import { getContext } from "svelte";
	import type { FieldContext } from "./types";

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

	const fieldContext = getContext<FieldContext>("field");
	const fieldId = $derived(htmlFor || $fieldContext.id);
	const isDisabled = $derived($fieldContext.disabled);
</script>

<label
	for={fieldId}
	class={[
		"select-none",
		"items-center",
		"gap-y-1",
		"gap-x-1",
		"text-sm",
		"font-medium",
		"leading-sm",
		"flex",
		"antialiased",
		isDisabled && "opacity-50",
		className,
	]
		.filter(Boolean)
		.join(" ")}
	{...restProps}
>
	{@render children?.()}
</label>
