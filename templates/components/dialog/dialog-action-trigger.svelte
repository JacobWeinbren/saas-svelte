<script lang="ts">
	import { Dialog } from "@ark-ui/svelte";
	import { button, type ButtonVariants } from "../button/button.svelte";
	import type { Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { type ColorName, generateColorVars } from "$saas/utils/colours";

	interface Props {
		children: Snippet;
		class?: string;
		asChild?: boolean;
		variant?: ButtonVariants["variant"];
		size?: ButtonVariants["size"];
		color?: ColorName;
		style?: string;
		[key: string]: any;
	}

	let {
		children,
		class: className,
		asChild = false,
		variant = "surface",
		size = "md",
		color = "gray",
		style,
		...rest
	}: Props = $props();

	const colorVars = $derived(generateColorVars(color));
	const finalStyle = $derived([colorVars, style].filter(Boolean).join("; "));
</script>

<Dialog.CloseTrigger
	class={twMerge(
		button({ variant, size, className }),
		// Custom footer focus ring override
		"focus-visible:outline-gray-950 dark:focus-visible:outline-gray-100",
	)}
	style={finalStyle}
	asChild={asChild ? children : undefined}
	{...rest}
>
	{#if !asChild}
		{@render children()}
	{/if}
</Dialog.CloseTrigger>
