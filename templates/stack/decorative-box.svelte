<script lang="ts">
	import { twMerge } from "tailwind-merge";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		class?: string;
	}

	let { class: className, ...restProps }: Props = $props();
</script>

<div
	class={twMerge(
		"flex items-center justify-center rounded-md border",
		// Light Mode
		"bg-gray-100 border-gray-200 text-gray-400",
		// Dark Mode
		"dark:bg-zinc-800/50 dark:border-zinc-700 dark:text-zinc-500",
		// Striped Pattern Effect
		"bg-[linear-gradient(45deg,rgba(0,0,0,0.02)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.02)_50%,rgba(0,0,0,0.02)_75%,transparent_75%,transparent)] bg-size-[8px_8px]",
		"dark:bg-[linear-gradient(45deg,rgba(255,255,255,0.02)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.02)_50%,rgba(255,255,255,0.02)_75%,transparent_75%,transparent)]",
		"min-h-12 w-full",
		className,
	)}
	{...restProps}
></div>
