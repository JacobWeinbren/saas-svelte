<script lang="ts">
	import { HoverCard } from "@ark-ui/svelte/hover-card";
	import type { Snippet } from "svelte";
	import { type ColourName, getColourStyle } from "$saas/utils/colours";

	interface Props {
		/**
		 * The trigger element content.
		 */
		children: Snippet;
		/**
		 * The colour palette for the focus ring.
		 * @default "accent"
		 */
		colour?: ColourName;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Additional inline styles to apply.
		 */
		style?: string;
		[key: string]: unknown;
	}

	let { children, colour = "accent", class: className, style, ...rest }: Props = $props();

	const colourVars = $derived(getColourStyle(colour || "accent"));
	const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<HoverCard.Trigger
	as="span"
	class="inline rounded outline-none focus-within:outline-1 focus-within:outline-solid focus-within:outline-offset-2 focus-within:outline-(--c-focus-ring) {className}"
	style={finalStyle}
	{...rest}
>
	{@render children()}
</HoverCard.Trigger>
