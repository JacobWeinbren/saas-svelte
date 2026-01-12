<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const group = tv({
		base: "flex antialiased",
		variants: {
			attached: {
				true: [
					"isolate", // Creates a new stacking context for z-index management
					"-space-x-px", // Negative margin for horizontal overlap
					// First item styling
					"[&>*:first-child]:rounded-r-none",
					// Last item styling
					"[&>*:last-child]:rounded-l-none",
					// Middle items styling
					"[&>*:not(:first-child):not(:last-child)]:rounded-none",
					// Focus management: bring focused item to front so border sits on top
					"[&>*]:focus-visible:z-10",
					"[&>*]:focus-within:z-10",
				],
				false: "gap-2",
			},
			grow: {
				true: "w-full [&>*]:flex-1",
				false: "",
			},
			orientation: {
				horizontal: "flex-row",
				vertical: "flex-col",
			},
		},
		compoundVariants: [
			{
				attached: true,
				orientation: "vertical",
				class: [
					"-space-x-0 -space-y-px", // Reset x-space, set y-space
					"[&>*:first-child]:rounded-r-md [&>*:first-child]:rounded-bl-none",
					"[&>*:last-child]:rounded-l-md [&>*:last-child]:rounded-tr-none",
					"[&>*:not(:first-child):not(:last-child)]:rounded-none",
				],
			},
		],
		defaultVariants: {
			attached: false,
			grow: false,
			orientation: "horizontal",
		},
	});

	export type GroupVariants = VariantProps<typeof group>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class"> {
		class?: string;
		attached?: boolean;
		grow?: boolean;
		orientation?: GroupVariants["orientation"];
	}

	let {
		children,
		class: className,
		attached = false,
		grow = false,
		orientation = "horizontal",
		...restProps
	}: Props = $props();

	const classes = $derived(
		group({ attached, grow, orientation, class: className }) as string,
	);
</script>

<div class={classes} {...restProps}>
	{@render children?.()}
</div>
