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
		"flex",
		"flex-0",
		"ps-6",
		"pe-6",
		"pt-4",
		"pb-2",
		"antialiased",
		className,
	)}
>
	{@render children()}
</div>
