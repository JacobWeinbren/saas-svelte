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
		// Updated to font-semibold and lighter text color for dark mode
		"text-base font-semibold text-gray-900 dark:text-gray-50 antialiased",
		className,
	)}
	{...rest}
>
	{@render children()}
</Dialog.Title>
