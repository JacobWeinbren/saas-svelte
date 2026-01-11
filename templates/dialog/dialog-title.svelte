<script lang="ts">
	import { Dialog } from "@ark-ui/svelte";
	import type { Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";

	interface Props {
		children: Snippet;
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...rest }: Props = $props();
</script>

<Dialog.Title
	class={twMerge(
		// Updated styles:
		// 1. text-base (was text-lg) -> Smaller size
		// 2. font-medium (was font-semibold) -> Matches weight 500 from your dumps
		// 3. Removed tracking-tight & leading-none -> Matches letter-spacing: normal
		"text-base font-medium text-gray-900 dark:text-gray-100",
		className,
	)}
	{...rest}
>
	{@render children()}
</Dialog.Title>
