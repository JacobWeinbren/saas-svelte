<script lang="ts">
	import { HoverCard } from "@ark-ui/svelte/hover-card";
	import { getContext, type Snippet } from "svelte";
	import { HOVER_CARD_CTX, type HoverCardContext } from "./hover-card-root.svelte";
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

	const ctx = getContext<HoverCardContext>(HOVER_CARD_CTX);

	const colourVars = $derived(getColourStyle(colour || "accent"));
	const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			event.stopPropagation();
			ctx?.setOpen(!ctx.open);
		}
	}
</script>

<span
	role="button"
	tabindex="0"
	class="inline rounded outline-none focus:outline-1 focus:outline-solid focus:outline-offset-2 focus:outline-(--c-focus-ring) {className}"
	style={finalStyle}
	onkeydown={handleKeyDown}
	aria-expanded={ctx?.open}
>
	<HoverCard.Trigger {...rest}>
		{@render children()}
	</HoverCard.Trigger>
</span>
