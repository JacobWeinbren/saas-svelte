<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { getContext } from "svelte";
	import type { FieldContext } from "./types";

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		/**
		 * Additional CSS classes to apply to the error text.
		 */
		class?: string;
	}

	let { class: className, children, ...restProps }: Props = $props();

	const fieldContext = getContext<FieldContext>("field");
	const errorId = $derived(`${$fieldContext.id}-error-text`);
</script>

<span
	id={errorId}
	aria-live="polite"
	class={[
		// Layout
		"inline-flex items-center gap-1",
		// Text color - error color (red-500 light, red-400 dark)
		"text-fg-error",
		// Typography
		"text-xs font-medium leading-xs",
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
