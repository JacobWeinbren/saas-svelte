<script lang="ts">
	import { Menu } from "@ark-ui/svelte/menu";
	import type { MenuTriggerProps } from "@ark-ui/svelte/menu";
	import { button, type ButtonVariants } from "../button/button.svelte";
	import type { Snippet } from "svelte";
	import { type ColourName, getColourStyle } from "$saas/utils/colours";
	import CaretDown from "phosphor-svelte/lib/CaretDown";

	interface Props extends MenuTriggerProps {
		/**
		 * The button content.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * The visual style of the button.
		 * @default "outline"
		 */
		variant?: ButtonVariants["variant"] | "breadcrumb";
		/**
		 * The size of the button.
		 * @default "md"
		 */
		size?: ButtonVariants["size"];
		/**
		 * The colour palette of the button.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * Whether to show the dropdown indicator.
		 * @default true
		 */
		showIndicator?: boolean;
		/**
		 * Additional inline styles.
		 */
		style?: string;
	}

	let {
		children,
		class: className,
		asChild,
		variant = "outline",
		size = "md",
		colour = "gray",
		showIndicator = false,
		style,
		...rest
	}: Props = $props();

	const isBreadcrumb = $derived(variant === "breadcrumb");
	const buttonVariant = $derived(isBreadcrumb ? "ghost" : variant);
	const buttonSize = $derived(isBreadcrumb ? "xs" : size);
	const breadcrumbClasses =
		"h-auto min-h-0 text-fg-muted hover:text-fg-default hover:bg-transparent gap-1 px-0 [&]:focus-visible:outline-(--colors-neutral-focus-ring)";

	const colourVars = $derived(getColourStyle(colour));
	const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));
	const finalClassName = $derived(
		isBreadcrumb ? [breadcrumbClasses, className].filter(Boolean).join(" ") : className
	);
</script>

{#if asChild}
	<Menu.Trigger {asChild} {...rest}>
		{@render children()}
	</Menu.Trigger>
{:else}
	<Menu.Trigger
		class={button({ variant: buttonVariant, size: buttonSize, class: finalClassName })}
		style={finalStyle}
		{...rest}
	>
		{@render children()}
		{#if showIndicator || isBreadcrumb}
			<CaretDown class="w-3.5 h-3.5" />
		{/if}
	</Menu.Trigger>
{/if}
