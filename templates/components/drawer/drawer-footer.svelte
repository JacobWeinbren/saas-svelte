<script lang="ts">
	import type { Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";

	interface Props {
		/**
		 * The footer content.
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
		"flex",
		"items-center",
		"justify-end",
		"gap-y-3",
		"gap-x-3",
		"pb-4",
		"pt-2",
		"ps-6",
		"pe-6",
		"antialiased",
		className,
	)}
>
	{@render children()}
</div>
