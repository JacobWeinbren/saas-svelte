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
		// Layout - flex-[0] to not grow
		"flex flex-0",
		// Padding: pt-4 pb-2 px-6
		"px-6 pt-4 pb-2",
		// Text alignment
		"text-left",
		className,
	)}
>
	{@render children()}
</div>
