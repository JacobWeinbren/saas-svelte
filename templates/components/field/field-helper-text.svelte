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

	const helperId = $derived(`${$fieldContext.id}-helper-text`);
</script>

<span
	id={helperId}
	class={`text-zinc-500 dark:text-zinc-500 text-xs leading-4 antialiased ${className || ""}`}
	{...restProps}
>
	{@render children?.()}
</span>
