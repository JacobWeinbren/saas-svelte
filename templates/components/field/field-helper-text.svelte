<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { getContext } from "svelte";
	import type { FieldContext } from "./types";

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		/**
		 * Additional CSS classes to apply to the helper text.
		 */
		class?: string;
	}

	let { class: className, children, ...restProps }: Props = $props();

	const fieldContext = getContext<FieldContext>("field");
	const helperId = $derived(`${$fieldContext.id}-helper-text`);
</script>

<span
	id={helperId}
	class={[
		// Text color - muted for helper text (zinc-500)
		"text-fg-muted",
		// Typography
		"text-(length:--font-sizes-xs) leading-(--line-heights-xs)",
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
