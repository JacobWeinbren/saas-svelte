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
		// Typography
		"break-words text-(length:--font-sizes-md) font-semibold leading-(--line-heights-md)",
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
