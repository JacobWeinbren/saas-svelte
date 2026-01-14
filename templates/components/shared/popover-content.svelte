<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	/**
	 * Shared popover content styles for Tooltip, ToggleTip, and similar components
	 */
	export const popoverContentStyles = tv({
		slots: {
			positioner: ["absolute", "isolate", "min-w-max"],
			content: [
				"flex flex-col relative",
				"rounded",
				"data-[side=bottom]:origin-top data-[side=left]:origin-right data-[side=right]:origin-left data-[side=top]:origin-bottom",

				// Light/Dark mode using semantic tokens
				"bg-(--color-bg-panel) backdrop-blur-md",
				"text-(--color-fg-default)",

				"text-xs font-normal leading-4 antialiased",
				"max-w-xs",
				"border-0",

				// Shadow
				"shadow-(--shadow-overlay)",

				"outline-none",
			],
			arrow: [
				"[--arrow-size:8px]",
				"[--arrow-background:var(--color-bg-panel)]",
			],
			arrowTip: ["border-l border-t", "border-(--color-border-subtle)"],
		},
		variants: {
			variant: {
				default: {},
				inverted: {
					content: [
						"bg-(--color-bg-inverted)",
						"text-(--color-fg-inverted)",
					],
					arrow: ["[--arrow-background:var(--color-bg-inverted)]"],
					arrowTip: ["border-(--color-border-inverted)"],
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
			zIndex: {
				10: {
					positioner: "z-(--z-indices-popup)",
				},
				50: {
					positioner: "z-(--z-indices-popover)",
				},
			},
			animation: {
				scale: {
					content:
						"transition-opacity duration-(--durations-moderate) data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
				},
				zoom: {
					content:
						"transition-[opacity,transform] duration-(--durations-moderate) data-[state=open]:scale-100 data-[state=open]:opacity-100 data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
				},
			},
			fontWeight: {
				normal: {
					content: "font-normal",
				},
				medium: {
					content: "font-medium",
				},
			},
			padding: {
				sm: {
					content: "px-(--spacing-2) py-(--spacing-1)",
				},
				md: {
					content: "px-(--spacing-2_5) py-(--spacing-1)",
				},
			},
		},
		defaultVariants: {
			variant: "default",
			interactive: false,
			zIndex: 50,
			animation: "scale",
			fontWeight: "normal",
			padding: "sm",
		},
	});

	export type PopoverContentVariants = VariantProps<
		typeof popoverContentStyles
	>;
</script>

<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		/**
		 * Content to display in the popover.
		 */
		content?: string | Snippet;
		/**
		 * Additional CSS classes for the content.
		 */
		class?: string;
		/**
		 * Additional CSS classes for the positioner.
		 */
		positionerClass?: string;
		/**
		 * Whether the content is interactive (can receive pointer events).
		 * @default false
		 */
		interactive?: PopoverContentVariants["interactive"];
		/**
		 * Z-index level for the popover.
		 * @default 50
		 */
		zIndex?: PopoverContentVariants["zIndex"];
		/**
		 * Animation style.
		 * @default "scale"
		 */
		animation?: PopoverContentVariants["animation"];
		/**
		 * Font weight.
		 * @default "normal"
		 */
		fontWeight?: PopoverContentVariants["fontWeight"];
		/**
		 * Padding size.
		 * @default "sm"
		 */
		padding?: PopoverContentVariants["padding"];
		/**
		 * Arrow snippet for rendering arrow.
		 */
		arrow?: Snippet;
		/**
		 * Slot for children content.
		 */
		children?: Snippet;
	}

	let {
		content,
		class: className,
		positionerClass,
		interactive = false,
		zIndex = 50,
		animation = "scale",
		fontWeight = "normal",
		padding = "sm",
		arrow,
		children,
	}: Props = $props();

	const styles = $derived(
		popoverContentStyles({
			interactive,
			zIndex,
			animation,
			fontWeight,
			padding,
		}),
	);
</script>

<div class={styles.positioner({ class: positionerClass })}>
	<div class={styles.content({ class: className })}>
		{#if arrow}
			{@render arrow()}
		{/if}
		{#if typeof content === "string"}
			{content}
		{:else if content}
			{@render content()}
		{:else if children}
			{@render children()}
		{/if}
	</div>
</div>
