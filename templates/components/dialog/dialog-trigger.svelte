<script lang="ts">
	import { Dialog } from "@ark-ui/svelte";
	import { button, type ButtonVariants } from "../button/button.svelte";
	import type { Snippet } from "svelte";
	import { type ColorName, generateColorVars } from "$saas/utils/colours";

	interface Props {
		children: Snippet;
		class?: string;
		asChild?: boolean;
		variant?: ButtonVariants["variant"];
		size?: ButtonVariants["size"];
		color?: ColorName; // Added color prop
		style?: string;
		[key: string]: any;
	}

	let {
		children,
		class: className,
		asChild = false,
		variant = "outline",
		size = "md",
		color = "gray", // Default to gray to matches button defaults
		style,
		...rest
	}: Props = $props();

	// Generate CSS variables for the chosen color (fixes undefined --c-300)
	const colorVars = $derived(generateColorVars(color));
	const finalStyle = $derived([colorVars, style].filter(Boolean).join("; "));
</script>

<Dialog.Trigger
	class={button({ variant, size, className })}
	style={finalStyle}
	asChild={asChild ? children : undefined}
	{...rest}
>
	{#if !asChild}
		{@render children()}
	{/if}
</Dialog.Trigger>
