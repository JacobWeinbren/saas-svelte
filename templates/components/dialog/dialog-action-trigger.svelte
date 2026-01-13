<script lang="ts">
	import { Dialog } from "@ark-ui/svelte";
	import { button, type ButtonVariants } from "../button/button.svelte";
	import type { Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { type ColourName, generateColourVars } from "$saas/utils/colours";

	interface Props {
		children: Snippet;
		class?: string;
		asChild?: boolean;
		variant?: ButtonVariants["variant"];
		size?: ButtonVariants["size"];
		colour?: ColourName;
		style?: string;
		[key: string]: any;
	}

	let {
		children,
		class: className,
		asChild = false,
		variant = "surface",
		size = "md",
		colour = "gray",
		style,
		...rest
	}: Props = $props();

	const colourVars = $derived(generateColourVars(colour));
	const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));
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
