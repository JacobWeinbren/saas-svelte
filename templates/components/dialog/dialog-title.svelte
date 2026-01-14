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
		// Typography: text-base font-semibold leading-6
		"break-words text-base font-semibold leading-6",
		// Text color using semantic token
		"text-(--color-fg-default)",
		// Font and rendering
		"antialiased font-sans",
		className,
	)}
	{...rest}
>
	{@render children()}
</Dialog.Title>
