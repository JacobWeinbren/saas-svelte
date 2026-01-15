<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		/**
		 * Additional CSS classes to apply to the error text.
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

	const errorId = $derived(`${$fieldContext.id}-error-text`);
</script>

<span
	id={errorId}
	aria-live="polite"
	class={[
		// Layout
		"inline-flex items-center gap-(--spacing-1)",
		// Text color - error color (red-500 light, red-400 dark)
		"text-(--color-fg-error)",
		// Typography
		"text-(length:--font-sizes-xs) font-medium leading-(--line-heights-xs)",
		// Rendering
		"antialiased",
		className,
	]
		.filter(Boolean)
		.join(" ")}
	{...restProps}
>
	{@render children?.()}
</span>
