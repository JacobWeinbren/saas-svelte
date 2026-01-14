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
		"flex flex-row justify-end items-center px-(--spacing-6) pt-(--spacing-2) pb-(--spacing-4) gap-(--spacing-3)",
		className,
	)}
>
	{@render children()}
</div>
