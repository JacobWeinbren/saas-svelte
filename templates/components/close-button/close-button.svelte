<script module lang="ts">
	import { button, type ButtonVariants } from "$saas/components/button/button.svelte";

	export type CloseButtonVariants = ButtonVariants;
</script>

<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { getColourStyle, type ColourName } from "$saas/utils/colours";
	import X from "phosphor-svelte/lib/X";

	interface Props extends HTMLButtonAttributes {
		/**
		 * The visual style of the close button.
		 * @default "ghost"
		 */
		variant?: CloseButtonVariants["variant"];
		/**
		 * The size of the close button.
		 * @default "md"
		 */
		size?: CloseButtonVariants["size"];
		/**
		 * The colour palette of the close button.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * Custom icon or content for the close button.
		 */
		children?: Snippet;
	}

	let {
		variant = "ghost",
		size = "md",
		colour = "gray",
		class: className,
		children,
		style,
		"aria-label": ariaLabel = "Close",
		...restProps
	}: Props = $props();

	const colourStyle = $derived(getColourStyle(colour || "gray"));
	const finalStyle = $derived(
		[colourStyle, style].filter(Boolean).join("; "),
	);

	const finalClass = $derived(
		button({
			variant,
			size,
			icon: true,
			class: `${className || ""}${variant === "glass" ? " group" : ""}`,
		}),
	);
</script>

<button
	type="button"
	class={finalClass}
	style={finalStyle}
	aria-label={ariaLabel}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<X weight="bold" />
	{/if}
</button>
