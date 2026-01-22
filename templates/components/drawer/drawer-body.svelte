<script lang="ts">
	import type { Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";

	interface Props {
		/**
		 * The body content.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let { children, class: className }: Props = $props();
</script>

<div
	class={twMerge(
		"flex-1",
		"ps-6",
		"pe-6",
		"py-2",
		"antialiased",
		"overflow-y-auto",
		className,
	)}
>
	{@render children()}
</div>
