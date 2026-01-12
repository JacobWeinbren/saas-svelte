<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const tooltipObj = tv({
		slots: {
			content: [
				"z-50 rounded px-2.5 py-1 shadow-sm",
				"animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
				"data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
				"data-[side=bottom]:origin-top data-[side=left]:origin-right data-[side=right]:origin-left data-[side=top]:origin-bottom",
				"bg-white dark:bg-zinc-950",
				"text-zinc-950 dark:text-neutral-50",
				"text-xs font-medium leading-4",
				"max-w-xs",
				"select-none",
				"border border-zinc-200 dark:border-zinc-800",
			],
			arrow: [
				"[--arrow-size:8px]",
				"[--arrow-background:white] dark:[--arrow-background:rgb(9_9_11)]",
				"drop-shadow-none",
			],
			arrowTip: [
				"border-l border-t border-zinc-200 dark:border-zinc-800",
			],
		},
		variants: {
			variant: {
				default: {},
				inverted: {
					content: [
						"bg-zinc-950 dark:bg-white",
						"text-white dark:text-zinc-950",
						"border-zinc-950 dark:border-white",
					],
					arrow: [
						"[--arrow-background:rgb(9_9_11)] dark:[--arrow-background:white]",
					],
					arrowTip: ["border-zinc-950 dark:border-white"],
				},
			},
			interactive: {
				true: {
					content: "pointer-events-auto",
				},
				false: {
					content: "pointer-events-none",
				},
			},
		},
		defaultVariants: {
			variant: "default",
			interactive: false,
		},
	});

	export type TooltipVariants = VariantProps<typeof tooltipObj>;
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
		content?: string | Snippet;
		children: Snippet;
		class?: string;
		/**
		 * Whether to show an arrow pointing to the trigger element.
		 */
		showArrow?: boolean;
		/**
		 * The variant of the tooltip.
		 */
		variant?: TooltipVariants["variant"];
	}

	let {
		id,
		content,
		children,
		class: className,
		showArrow = false,
		variant = "default",
		openDelay = 100,
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
		tooltipObj({ variant, interactive, class: className }),
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
	<ArkTooltip.Positioner>
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
