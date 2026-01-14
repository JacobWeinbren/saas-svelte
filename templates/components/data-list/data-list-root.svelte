<script lang="ts">
	import { setContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { tv, type VariantProps } from "tailwind-variants";
	import { type ColourName, generateColourVars } from "$saas/utils/colours";

	const dataList = tv({
		slots: {
			root: "flex flex-col",
			item: "inline-flex items-center grow",
			label: "flex items-center text-(--color-fg-muted)",
			value: "flex flex-1 text-(--color-fg-default)",
		},
		variants: {
			size: {
				sm: {
					root: "gap-y-(--spacing-3) gap-x-(--spacing-3)",
					item: "gap-y-(--spacing-4) gap-x-(--spacing-4) text-xs leading-4",
					label: "gap-y-(--spacing-1) gap-x-(--spacing-1) min-w-(--spacing-32)",
				},
				md: {
					root: "gap-y-(--spacing-4) gap-x-(--spacing-4)",
					item: "gap-y-(--spacing-4) gap-x-(--spacing-4) text-sm leading-5",
					label: "gap-y-(--spacing-1) gap-x-(--spacing-1) min-w-(--spacing-32)",
				},
				lg: {
					root: "gap-y-(--spacing-5) gap-x-(--spacing-5)",
					item: "gap-y-(--spacing-4) gap-x-(--spacing-4) text-sm leading-5",
					label: "gap-y-(--spacing-1) gap-x-(--spacing-1) min-w-(--spacing-32)",
				},
			},
			orientation: {
				horizontal: {
					// Items stacked vertically, but label-value are horizontal (side-by-side)
					root: "flex-col",
					item: "flex-row items-center",
					value: "flex-1",
				},
				vertical: {
					// Items stacked vertically, label-value are vertical (stacked)
					root: "flex-col",
					item: "flex-col items-start",
					value: "w-full",
				},
			},
			divider: {
				true: {
					item: "not-first:border-t not-first:border-(--color-border-default) not-first:pt-(--spacing-4)",
				},
			},
		},
		defaultVariants: {
			size: "md",
			orientation: "horizontal",
			divider: false,
		},
	});

	type DataListVariants = VariantProps<typeof dataList>;

	interface Props {
		/**
		 * The content of the data list.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply to the root element.
		 */
		class?: string;
		/**
		 * The size of the data list.
		 * @default "md"
		 */
		size?: DataListVariants["size"];
		/**
		 * The orientation of the data list.
		 * @default "horizontal"
		 */
		orientation?: DataListVariants["orientation"];
		/**
		 * The colour palette of the data list.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * Whether to show dividers between items.
		 * @default false
		 */
		divider?: boolean;
		/**
		 * Inline styles to apply to the root element.
		 */
		style?: string;
		[key: string]: any;
	}

	let {
		children,
		class: className,
		size = "md",
		orientation = "horizontal",
		colour = "gray",
		divider = false,
		style,
		...restProps
	}: Props = $props();

	const classes = $derived(dataList({ size, orientation, divider }));
	const colourVars = $derived(generateColourVars(colour));
	const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));

	setContext("data-list-styles", {
		get current() {
			return classes;
		},
	});
</script>

<dl
	data-orientation={orientation}
	class={twMerge(
		"text-(--color-fg-default) leading-normal antialiased",
		classes.root(),
		className,
	)}
	style={finalStyle}
	{...restProps}
>
	{@render children()}
</dl>
