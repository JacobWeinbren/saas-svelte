<script lang="ts">
	import { setContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { tv, type VariantProps } from "tailwind-variants";
	import { type ColorName, generateColorVars } from "$saas/utils/colours";

	const dataList = tv({
		slots: {
			root: "flex flex-col",
			item: "inline-flex items-center",
			label: "flex items-center text-zinc-500 dark:text-zinc-400",
			value: "flex flex-1",
		},
		variants: {
			size: {
				sm: {
					root: "gap-y-3 gap-x-3",
					item: "gap-y-4 gap-x-4 text-xs leading-4",
					label: "gap-y-1 gap-x-1 min-w-32",
				},
				md: {
					root: "gap-y-4 gap-x-4",
					item: "gap-y-4 gap-x-4 text-sm leading-5",
					label: "gap-y-1 gap-x-1 min-w-32",
				},
				lg: {
					root: "gap-y-5 gap-x-5",
					item: "gap-y-4 gap-x-4 text-md leading-5",
					label: "gap-y-1 gap-x-1 min-w-32",
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
		},
		defaultVariants: {
			size: "md",
			orientation: "horizontal",
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
		 * The color palette of the data list.
		 * @default "gray"
		 */
		/**
		 * The color palette of the data list.
		 * @default "gray"
		 */
		color?: ColorName;
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
		color = "gray",
		style,
		...restProps
	}: Props = $props();

	const classes = $derived(dataList({ size, orientation }));
	const colorVars = $derived(generateColorVars(color));
	const finalStyle = $derived([colorVars, style].filter(Boolean).join("; "));

	setContext("data-list-styles", {
		get current() {
			return classes;
		},
	});
</script>

<dl
	data-orientation={orientation}
	class={twMerge(
		"text-zinc-950 dark:text-zinc-50 leading-normal antialiased",
		classes.root(),
		className,
	)}
	style={finalStyle}
	{...restProps}
>
	{@render children()}
</dl>
