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
		"flex-1 px-(--spacing-6) py-(--spacing-2) text-sm text-(--color-fg-muted) antialiased",
		ctx.scrollBehavior === "inside" && "overflow-y-auto",
		className,
	)}
>
	{@render children()}
</div>
