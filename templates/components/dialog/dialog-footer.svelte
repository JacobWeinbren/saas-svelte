<script lang="ts">
	import type { Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";

	interface Props {
		children: Snippet;
		class?: string;
	}

	let { children, class: className }: Props = $props();
</script>

<div
	class={twMerge(
		// Layout
		"flex flex-row justify-end items-center",
		// Padding: pt-2 pb-4 px-6
		"px-(--spacing-6) pt-(--spacing-2) pb-(--spacing-4)",
		// Gap between buttons
		"gap-(--spacing-3)",
		className,
	)}
>
	{@render children()}
</div>
