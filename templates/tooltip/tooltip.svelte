<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const tooltipObj = tv({
		base: [
			"z-50 overflow-hidden rounded-lg border px-3 py-1.5 shadow-md",
			"animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
			"data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
			"bg-white dark:bg-gray-950",
			"text-gray-900 dark:text-gray-100",
			"border-gray-200 dark:border-gray-800",
			"text-[13px] leading-none",
			"select-none",
		],
		variants: {},
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
	}

	let {
		id,
		content,
		children,
		class: className,
		openDelay = 0,
		closeDelay = 0,
		positioning = { placement: "top", strategy: "fixed" },
		...rest
	}: Props = $props();

	// Generate a robust fallback ID to satisfy the 'string' requirement
	const uniqueId = $derived(
		id || `tooltip-${Math.random().toString(36).substring(2, 9)}`,
	);

	const styles = $derived(tooltipObj({ class: className }));
</script>

<ArkTooltip.Root id={uniqueId} {openDelay} {closeDelay} {positioning} {...rest}>
	<ArkTooltip.Trigger>
		{#snippet asChild(props)}
			<div {...props()}>
				{@render children()}
			</div>
		{/snippet}
	</ArkTooltip.Trigger>
	<ArkTooltip.Positioner>
		<ArkTooltip.Content class={styles}>
			{#if typeof content === "string"}
				{content}
			{:else if content}
				{@render content()}
			{/if}
		</ArkTooltip.Content>
	</ArkTooltip.Positioner>
</ArkTooltip.Root>
