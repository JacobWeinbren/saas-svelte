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

				// Light mode
				"bg-white backdrop-blur-md",
				"text-zinc-950",

				// Dark mode
				"dark:bg-[oklch(0.21_0.02_264.665)] dark:backdrop-blur-md",
				"dark:text-[oklch(0.985_0.002_247.839)]",

				"text-xs font-normal leading-4 antialiased",
				"max-w-xs",
				"border-0",

				// Light mode shadow
				"shadow-[0_8px_16px_0_rgba(20,24,34,0.05),0_0_4px_0_rgba(20,24,34,0.05),0_0_1px_0_rgba(109,114,123,0.8)]",

				// Dark mode shadow
				"dark:shadow-[0_8px_16px_0_rgba(0,0,0,0.2),0_0_3px_0_rgba(20,24,34,0.2),0_0_1px_0_rgba(243,244,246,0.8)]",

				"outline-none",
			],
			arrow: [
				"[--arrow-size:8px]",
				"[--arrow-background:rgb(255_255_255)] dark:[--arrow-background:oklch(0.21_0.02_264.665)]",
				],
			arrowTip: [
				"border-l border-t",
			"border-zinc-200/80 dark:border-zinc-700/80",
			],
		},
		variants: {
			variant: {
				default: {},
				inverted: {
					content: [
						"bg-zinc-950 dark:bg-zinc-50",
						"text-zinc-50 dark:text-zinc-950",
					],
					arrow: [
						"[--arrow-background:rgb(9_9_11)] dark:[--arrow-background:rgb(250_250_250)]",
					],
					arrowTip: ["border-zinc-950 dark:border-zinc-50"],
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
					positioner: "z-10",
				},
				50: {
					positioner: "z-50",
				},
			},
			animation: {
				scale: {
					content:
						"transition-opacity duration-200 data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
				},
				zoom: {
					content:
						"transition-[opacity,transform] duration-200 data-[state=open]:scale-100 data-[state=open]:opacity-100 data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
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
					content: "px-2 py-1",
				},
				md: {
					content: "px-2.5 py-1",
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

	export type PopoverContentVariants = VariantProps<typeof popoverContentStyles>;
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
