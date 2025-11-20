<script lang="ts">
	import { slide } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import { ChevronRight } from "@lucide/svelte";
	import { tv, type VariantProps } from "tailwind-variants";
	import type { Component } from "svelte";
	import type { SlideParams } from "svelte/transition";

	// --- Types ---
	interface AccordionItem {
		value: string;
		title: string;
		text: string;
		disabled?: boolean;
		icon?: Component<any, any>;
	}

	// --- Styling Configuration (Saas UI approach) ---
	const accordion = tv({
		slots: {
			root: "w-full",
			item: "border-b border-zinc-200 [overflow-anchor:none] last:border-b-0",
			trigger:
				"flex items-center w-full text-left outline-0 gap-x-3 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-900 transition-colors",
			content: "overflow-hidden text-zinc-600",
			icon: "shrink-0 text-zinc-400 transition-transform duration-200 ml-auto",
		},
		variants: {
			variant: {
				outline: {
					// Matches your original design exactly
					root: "px-6 sm:p-10",
					item: "border-b border-zinc-200",
					trigger: "hover:text-zinc-700",
				},
				subtle: {
					root: "px-4 py-4 space-y-1",
					item: "border-none rounded-md",
					trigger:
						"px-4 hover:bg-zinc-100 rounded-md text-zinc-700 font-medium",
					content: "px-4",
				},
				enclosed: {
					root: "px-4 py-4 space-y-3",
					item: "border border-zinc-200 rounded-lg bg-white px-4 shadow-sm",
					trigger: "hover:text-zinc-700",
					content: "", // padding handled by size
				},
				plain: {
					root: "px-4 py-4",
					item: "border-none",
					trigger: "hover:text-zinc-600",
					content: "",
				},
			},
			size: {
				sm: {
					trigger: "py-2 text-xs",
					content: "text-xs pb-3",
					icon: "w-3 h-3",
				},
				md: {
					trigger: "py-3 text-sm font-medium leading-5",
					content: "text-sm pb-4 pt-1",
					icon: "w-4 h-4",
				},
				lg: {
					trigger: "py-4 text-base",
					content: "text-base pb-5 pt-2",
					icon: "w-5 h-5",
				},
			},
			orientation: {
				vertical: {
					root: "flex flex-col",
				},
				horizontal: {
					root: "flex flex-row gap-4",
					item: "border-b-0 border-r last:border-r-0 flex-1",
				},
			},
		},
		defaultVariants: {
			variant: "outline",
			size: "md",
			orientation: "vertical",
		},
	});

	// --- Props ---
	type AccordionVariants = VariantProps<typeof accordion>;

	let {
		items,
		value = $bindable(),
		defaultValue,
		multiple = false,
		collapsible = true,
		disabled = false,
		lazyMount = false,
		unmountOnExit = false,
		variant = "outline",
		size = "md",
		orientation = "vertical",
		class: className,
	}: {
		items: AccordionItem[];
		value?: string | string[] | null;
		defaultValue?: string | string[] | null;
		multiple?: boolean;
		collapsible?: boolean;
		disabled?: boolean;
		lazyMount?: boolean;
		unmountOnExit?: boolean;
		variant?: AccordionVariants["variant"];
		size?: AccordionVariants["size"];
		orientation?: AccordionVariants["orientation"];
		class?: string;
	} = $props();

	// --- State Management ---
	// Initialize state from controlled value or default value
	let internalValue = $state<string | string[] | null>(
		value !== undefined ? value : (defaultValue ?? (multiple ? [] : null)),
	);

	// Track which items have been opened at least once (for lazyMount)
	let mountedItems = $state(new Set<string>());

	// Sync external value binding if it changes from outside
	$effect(() => {
		if (value !== undefined) {
			internalValue = value;
		}
	});

	// --- Helpers ---

	function isExpanded(itemValue: string): boolean {
		if (Array.isArray(internalValue)) {
			return internalValue.includes(itemValue);
		}
		return internalValue === itemValue;
	}

	function toggle(itemValue: string) {
		if (disabled) return;

		// Find item to check if specific item is disabled
		const item = items.find((i) => i.value === itemValue);
		if (item?.disabled) return;

		if (multiple) {
			// Handle Array Logic
			const current = Array.isArray(internalValue) ? internalValue : [];
			let next: string[];

			if (current.includes(itemValue)) {
				// If unchecking, and not collapsible (must have 1 open), verify length
				if (!collapsible && current.length <= 1) return;
				next = current.filter((v) => v !== itemValue);
			} else {
				next = [...current, itemValue];
			}
			internalValue = next;
		} else {
			// Handle Single Value Logic
			if (internalValue === itemValue) {
				if (collapsible) internalValue = null;
			} else {
				internalValue = itemValue;
			}
		}

		// Update binding
		if (value !== undefined) {
			value = internalValue;
		}
	}

	$effect(() => {
		// Update mounted items set whenever value changes
		if (lazyMount) {
			items.forEach((item) => {
				if (isExpanded(item.value)) {
					mountedItems.add(item.value);
				}
			});
			// Trigger reactivity
			mountedItems = new Set(mountedItems);
		}
	});

	// --- Custom Transition (Slide + Fast Fade) ---
	function slideFade(node: Element, params: SlideParams = {}) {
		const existing = slide(node, params);
		return {
			...existing,
			css: (t: number, u: number) => {
				const slideCss = existing.css ? existing.css(t, u) : "";
				// Fade in twice as fast as the slide
				const opacity = Math.min(1, t * 2);
				return `opacity: ${opacity}; ${slideCss}`;
			},
		};
	}

	// Generate Styles
	const styles = $derived(accordion({ variant, size, orientation }));
</script>

<div
	class={styles.root({ class: className })}
	dir="ltr"
	data-orientation={orientation}
>
	{#each items as item (item.value)}
		{@const expanded = isExpanded(item.value)}
		{@const itemDisabled = disabled || item.disabled}

		<div class={styles.item()}>
			<button
				type="button"
				onclick={() => toggle(item.value)}
				disabled={itemDisabled}
				aria-expanded={expanded}
				aria-controls={`accordion-content-${item.value}`}
				class={styles.trigger()}
			>
				{#if item.icon}
					{@const Icon = item.icon}
					<Icon
						class="shrink-0 size-[1.2em] mr-2 text-zinc-400 group-hover:text-zinc-600"
					/>
				{/if}

				{item.title}

				<div
					aria-hidden="true"
					class={styles.icon()}
					class:rotate-90={expanded}
				>
					<ChevronRight
						focusable="false"
						class="text-current fill-none stroke-current stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] size-full"
					/>
				</div>
			</button>

			{#if !lazyMount && !unmountOnExit}
				{#if expanded}
					<div
						id={`accordion-content-${item.value}`}
						role="region"
						transition:slideFade={{
							duration: 200,
							easing: cubicOut,
							axis: "y",
						}}
						class={styles.content()}
					>
						{item.text}
					</div>
				{/if}
			{:else if (lazyMount && mountedItems.has(item.value)) || (unmountOnExit && expanded) || (!unmountOnExit && !lazyMount)}
				{#if expanded}
					<div
						id={`accordion-content-${item.value}`}
						role="region"
						transition:slideFade={{
							duration: 200,
							easing: cubicOut,
							axis: "y",
						}}
						class={styles.content()}
					>
						{item.text}
					</div>
				{:else if !unmountOnExit}
					<div class="hidden" id={`accordion-content-${item.value}`}>
						<div class={styles.content()}>{item.text}</div>
					</div>
				{/if}
			{/if}
		</div>
	{/each}
</div>
