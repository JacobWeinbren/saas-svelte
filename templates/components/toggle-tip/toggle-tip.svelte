<script module lang="ts">
	import { type VariantProps } from "tailwind-variants";
	import {
		popoverContentStyles,
		type PopoverContentVariants,
	} from "$saas/components/shared/popover-content.svelte";

	export type ToggleTipVariants = {
		size?: "xs" | "sm" | "md" | "lg";
	};
</script>

<script lang="ts">
	import { Popover as ArkPopover } from "@ark-ui/svelte";
	import type { PopoverRootProps } from "@ark-ui/svelte/popover";
	import type { Snippet } from "svelte";

	interface Props extends Omit<PopoverRootProps, "id"> {
		/**
		 * The unique identifier for the toggle tip.
		 * If not provided, a unique ID will be auto-generated.
		 */
		id?: string;
		/**
		 * The content to display in the toggle tip.
		 */
		content?: string | Snippet;
		/**
		 * The trigger element.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Additional CSS classes to apply to the trigger.
		 */
		triggerClass?: string;
		/**
		 * Accessible label for the trigger button.
		 */
		triggerAriaLabel?: string;
		/**
		 * The size of the toggle tip.
		 * @default "md"
		 */
		size?: ToggleTipVariants["size"];
		/**
		 * Whether to automatically set focus on the first focusable content within the popover when opened.
		 * @default true
		 */
		autoFocus?: boolean;
		/**
		 * Whether to close the popover when the escape key is pressed.
		 * @default true
		 */
		closeOnEscape?: boolean;
		/**
		 * Whether to close the popover when the user clicks outside of the popover.
		 * @default true
		 */
		closeOnInteractOutside?: boolean;
		/**
		 * Whether the popover should be modal.
		 * @default false
		 */
		modal?: boolean;
		/**
		 * Whether the popover is portalled.
		 * @default true
		 */
		portalled?: boolean;
		/**
		 * The positioning options for the toggle tip.
		 */
		positioning?: PopoverRootProps["positioning"];
	}

	let {
		id,
		content,
		children,
		class: className,
		triggerClass,
		triggerAriaLabel,
		size = "md",
		autoFocus = true,
		closeOnEscape = true,
		closeOnInteractOutside = true,
		modal = false,
		portalled = true,
		positioning = { placement: "top", gutter: 8, strategy: "absolute" },
		...rest
	}: Props = $props();

	const uniqueId = $derived(
		id || `toggle-tip-${Math.random().toString(36).substring(2, 9)}`,
	);

	const styles = $derived(
		popoverContentStyles({
			interactive: true,
			zIndex: 50,
			animation: "scale",
			fontWeight: "normal",
			padding: size === "lg" ? "md" : "sm",
		}),
	);

	const sizeClasses = {
		xs: "text-(length:--font-sizes-2xs) leading-(--line-heights-2xs) px-(--spacing-1_5) py-(--spacing-0_5)",
		sm: "text-(length:--font-sizes-xs) leading-(--line-heights-xs) px-(--spacing-2) py-(--spacing-1)",
		md: "text-(length:--font-sizes-sm) leading-(--line-heights-sm) px-(--spacing-2_5) py-(--spacing-1)",
		lg: "text-(length:--font-sizes-md) leading-(--line-heights-md) px-(--spacing-3) py-(--spacing-1_5)",
	} as const;

	const sizeClass = $derived(sizeClasses[size || "md"]);
</script>

<ArkPopover.Root
	id={uniqueId}
	{autoFocus}
	{closeOnEscape}
	{closeOnInteractOutside}
	{modal}
	{portalled}
	{positioning}
	{...rest}
>
	<ArkPopover.Trigger>
		{#snippet asChild(props)}
			{#if triggerClass}
				<button type="button" {...props()} class={triggerClass} aria-label={triggerAriaLabel}>
					{@render children()}
				</button>
			{:else}
				<span {...props()}>
					{@render children()}
				</span>
			{/if}
		{/snippet}
	</ArkPopover.Trigger>
	<ArkPopover.Positioner class={styles.positioner()} style="z-index: 50;">
		<ArkPopover.Content
			class={styles.content({ class: `${sizeClass} ${className || ""}` })}
		>
			{#if typeof content === "string"}
				{content}
			{:else if content}
				{@render content()}
			{/if}
		</ArkPopover.Content>
	</ArkPopover.Positioner>
</ArkPopover.Root>
