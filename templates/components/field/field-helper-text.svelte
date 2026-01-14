<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		/**
		 * Additional CSS classes to apply to the helper text.
		 */
		class?: string;
	}

	let { class: className, children, ...restProps }: Props = $props();

	const fieldContext = getContext<
		Writable<{
			id: string;
			disabled: boolean;
			invalid: boolean;
			required: boolean;
			readOnly: boolean;
		}>
	>("field");

	const helperId = $derived(`${$fieldContext.id}-helper-text`);
</script>

<span
	id={helperId}
	class={`text-(--color-fg-muted) text-xs leading-4 antialiased ${className || ""}`}
	{...restProps}
>
	{@render children?.()}
</span>
