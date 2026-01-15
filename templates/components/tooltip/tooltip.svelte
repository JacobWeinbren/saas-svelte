<script module lang="ts">
	import { popoverContentStyles } from "$saas/components/shared/popover-content.svelte";

	export type TooltipVariants = {
		variant?: "default" | "inverted";
	};
</script>

<script lang="ts">
	// Import from the main package to ensure Context compatibility
	import { Tooltip as ArkTooltip } from "@ark-ui/svelte";
	import type { TooltipRootProps } from "@ark-ui/svelte/tooltip";
	import type { Snippet } from "svelte";

	// Omit 'id' from the strict type so we can make it optional in our interface
	interface Props extends Omit<TooltipRootProps, "id"> {
		/**
		 * The unique identifier for the tooltip.
		 * If not provided, a unique ID will be auto-generated.
		 */
		id?: string;
		/**
		 * The text content of the tooltip.
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
		 * Whether to show an arrow pointing to the trigger element.
		 * @default false
		 */
		showArrow?: boolean;
		/**
		 * The variant of the tooltip.
		 * @default "default"
		 */
		variant?: TooltipVariants["variant"];
		/**
		 * The delay before the tooltip opens (in ms).
		 * @default 0
		 */
		openDelay?: number;
		/**
		 * The delay before the tooltip closes (in ms).
		 * @default 100
		 */
		closeDelay?: number;
		/**
		 * The positioning options for the tooltip.
		 * @default { placement: "bottom", strategy: "fixed" }
		 */
		positioning?: TooltipRootProps["positioning"];
		/**
		 * Whether the tooltip is interactive.
		 * @default false
		 */
		interactive?: boolean;
	}

	let {
		id,
		content,
		children,
		class: className,
		showArrow = false,
		variant = "default",
		openDelay = 0,
		closeDelay = 100,
		positioning = { placement: "bottom", strategy: "fixed" },
		interactive = false,
		...rest
	}: Props = $props();

	// Generate a robust fallback ID to satisfy the 'string' requirement
	const uniqueId = $derived(
		id || `tooltip-${Math.random().toString(36).substring(2, 9)}`,
	);

	const styles = $derived(
		popoverContentStyles({
			variant,
			interactive,
			zIndex: 50,
			animation: "scale",
			fontWeight: "medium",
			padding: "md",
		}),
	);
</script>

<ArkTooltip.Root
	id={uniqueId}
	{openDelay}
	{closeDelay}
	{positioning}
	{interactive}
	{...rest}
>
	<ArkTooltip.Trigger>
		{#snippet asChild(props)}
			<div {...props()}>
				{@render children()}
			</div>
		{/snippet}
	</ArkTooltip.Trigger>
	<ArkTooltip.Positioner class={styles.positioner()}>
		<ArkTooltip.Content class={styles.content()}>
			{#if showArrow}
				<ArkTooltip.Arrow class={styles.arrow()}>
					<ArkTooltip.ArrowTip class={styles.arrowTip()} />
				</ArkTooltip.Arrow>
			{/if}
			{#if typeof content === "string"}
				{content}
			{:else if content}
				{@render content()}
			{/if}
		</ArkTooltip.Content>
	</ArkTooltip.Positioner>
</ArkTooltip.Root>
