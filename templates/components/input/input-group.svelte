<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { twMerge } from "tailwind-merge";
	import type { Snippet } from "svelte";

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class"> {
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * The content to be rendered inside the component.
		 */
		children?: Snippet;
	}

	let { children, class: className, ...restProps }: Props = $props();
</script>

<div
	class={twMerge(
		// Layout
		"relative inline-flex w-full",
		// Isolation for z-index stacking
		"isolate",
		// Gap and alignment
		"gap-(--spacing-2) items-center justify-start",
		className,
	)}
	{...restProps}
>
	{@render children?.()}
</div>
