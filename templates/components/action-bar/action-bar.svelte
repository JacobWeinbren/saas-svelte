<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const actionBar = tv({
		slots: {
			root: [
				"fixed bottom-(--spacing-4) left-0 right-0",
				"z-(--z-indices-popover)",
				"flex justify-center",
				"px-(--spacing-2)",
				"pointer-events-none",
			],
			content: [
				"pointer-events-auto",
				"inline-flex items-center gap-x-(--spacing-3) gap-y-(--spacing-3)",
				"px-(--spacing-3) py-(--spacing-2_5)",
				"rounded-(--radii-l2)",
				"shadow-(--shadows-md)",
				"bg-bg-panel text-fg-default",
				"border border-border-subtle",
				"whitespace-nowrap",
				"overflow-x-auto",
				"max-w-full",
			],
			selectionTrigger: [
				"appearance-auto self-stretch items-center gap-(--spacing-2)",
				"text-(length:--font-sizes-sm) leading-(--line-heights-sm)",
				"inline-flex px-(--spacing-4) py-(--spacing-1)",
				"rounded-(--radii-l1) border border-dashed border-border-default",
				"text-fg-default",
				"cursor-(--cursor-button)",
				"transition-[color,background-color] duration-(--durations-moderate)",
				"hover:bg-bg-subtle",
				"focus-visible:outline-offset-2 focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-border-emphasized",
			],
			separator: ["bg-border-default w-px h-(--sizes-5) self-stretch"],
			closeButton: [
				"appearance-none select-none whitespace-nowrap align-middle",
				"cursor-(--cursor-button) isolate",
				"shrink-0 justify-center items-center gap-(--spacing-2)",
				"min-w-(--spacing-7) h-(--spacing-7)",
				"text-(length:--font-sizes-sm) font-(--font-weights-medium) leading-(--line-heights-sm)",
				"inline-flex rounded-(--radii-l1)",
				"text-fg-muted outline-0",
				"transition-[color,background-color] duration-(--durations-moderate)",
				"focus-visible:outline-offset-2 focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-border-emphasized",
				"disabled:opacity-50 disabled:cursor-not-allowed",
				"hover:bg-bg-subtle hover:text-fg-default",
			],
		},
	});

	export type ActionBarVariants = VariantProps<typeof actionBar>;
</script>

<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { fly, fade } from "svelte/transition";
	import { twMerge } from "tailwind-merge";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * Whether the action bar is open/visible.
		 * @default false
		 */
		open?: boolean;
		/**
		 * Callback fired when the open state changes.
		 */
		onOpenChange?: (details: { open: boolean }) => void;
		/**
		 * Whether to close the action bar when clicking outside.
		 * @default false
		 */
		closeOnInteractOutside?: boolean;
		/**
		 * Content to render inside the action bar.
		 */
		children?: Snippet;
	}

	let {
		open = false,
		onOpenChange,
		closeOnInteractOutside = false,
		children,
		class: className,
		...restProps
	}: Props = $props();

	const styles = actionBar();

	function handleClickOutside(event: MouseEvent) {
		if (!closeOnInteractOutside || !open) return;
		const target = event.target as HTMLElement;
		if (!target.closest('[data-part="action-bar-content"]')) {
			onOpenChange?.({ open: false });
		}
	}
</script>

<svelte:window onclick={handleClickOutside} />

{#if open}
	<div
		class={twMerge(styles.root() as string, className as string)}
		data-part="action-bar-root"
		data-state="open"
		role="toolbar"
		aria-label="Bulk actions"
		in:fly={{ y: 32, duration: 200 }}
		out:fly={{ y: 32, duration: 150 }}
		{...restProps}
	>
		<div
			class={twMerge(styles.content() as string)}
			data-part="action-bar-content"
			in:fade={{ duration: 200 }}
			out:fade={{ duration: 150 }}
		>
			{@render children?.()}
		</div>
	</div>
{/if}
