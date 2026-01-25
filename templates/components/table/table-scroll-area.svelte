<script lang="ts">
	import type { Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";

	interface Props {
		/**
		 * Maximum width of the scroll area.
		 */
		maxW?: string;
		/**
		 * Height of the scroll area.
		 */
		height?: string;
		/**
		 * Border width for the scroll area.
		 */
		borderWidth?: string;
		/**
		 * Border radius for the scroll area.
		 */
		rounded?: string;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Scroll area content.
		 */
		children?: Snippet;
	}

	let {
		maxW,
		height,
		borderWidth,
		rounded,
		class: className,
		children,
	}: Props = $props();

	const style = $derived(
		[
			maxW && `max-width: ${maxW}`,
			height && `height: ${height}`,
			borderWidth && `border-width: ${borderWidth}`,
		]
			.filter(Boolean)
			.join("; ")
	);
</script>

<div
	class={twMerge(
		"block whitespace-nowrap overflow-x-auto overflow-y-auto",
		borderWidth && "border border-border-default",
		rounded && `rounded-${rounded}`,
		className
	)}
	style={style || undefined}
>
	{#if children}
		{@render children()}
	{/if}
</div>
