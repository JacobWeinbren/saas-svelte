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
		// Fixed alignment: Removed responsive "text-center sm:text-left"
		// Now consistently left-aligned on all screens.
		"flex flex-col space-y-(--spacing-1_5) px-(--spacing-6) pt-(--spacing-4) pb-(--spacing-2) text-left",
		className,
	)}
>
	{@render children()}
</div>
