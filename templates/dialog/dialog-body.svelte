<script lang="ts">
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { DIALOG_CTX } from "./dialog-root.svelte";

	interface Props {
		children: Snippet;
		class?: string;
	}

	let { children, class: className }: Props = $props();

	const ctx = getContext(DIALOG_CTX) as {
		scrollBehavior: "inside" | "outside";
	};
</script>

<div
	class={twMerge(
		"px-6 py-2 text-sm text-gray-500 dark:text-gray-400",
		ctx.scrollBehavior === "inside" && "overflow-y-auto",
		className,
	)}
>
	{@render children()}
</div>
