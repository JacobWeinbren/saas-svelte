<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	interface Props extends HTMLAttributes<HTMLSpanElement> {}

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

	const errorId = $derived(`${$fieldContext.id}-error-text`);
</script>

<span
	id={errorId}
	aria-live="polite"
	class={`inline-flex items-center gap-1 text-xs font-medium leading-4 text-red-500 dark:text-red-400 antialiased ${className || ""}`}
	{...restProps}
>
	{@render children?.()}
</span>
